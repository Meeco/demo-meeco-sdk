import { AuthData, Environment, ItemService, UserService } from "@meeco/sdk";
// configureFetch(window.fetch);
function getConfig(
  vaultUrl: string,
  keystoreUrl: string,
  subscriptionKey: string
) {
  return new Environment({
    vault: {
      url: vaultUrl,
      subscription_key: subscriptionKey,
    },
    keystore: {
      url: keystoreUrl,
      subscription_key: subscriptionKey,
      provider_api_key: "",
    },
  });
}

async function getAuthData(
  config: Environment,
  passphrase: string,
  secret: string
) {
  return new UserService(config).getAuthData(passphrase, secret);
}

async function getItems(config: Environment, authData: AuthData) {
  try {
    const items = await new ItemService(config).listDecrypted(authData);

    type slot = {
      attribute: string;
      value: string;
      type: string;
    };

    type item = {
      label: string;
      slots: slot[];
    };

    const result: item[] = items.items.map((item) => {
      return {
        label: item.label,
        slots: item.slots.map((s) => {
          return {
            attribute: s.label,
            value: s.value || "",
            type: s.slot_type_name.toString(),
          };
        }),
      };
    });

    return result;
  } catch (error) {
    console.error(error);
  }
}

// configure and get items
const vaultUrl = "https://sandbox.meeco.me/vault";
const keystoreUrl = "https://sandbox.meeco.me/keystore";
const subscriptionKey = "--- add subscription key ---";
const config = getConfig(vaultUrl, keystoreUrl, subscriptionKey);

const passphrase = "--- add passphrase --";
const secret = "-- add secret ---";

getAuthData(config, passphrase, secret).then((authData) => {
  getItems(config, authData).then((result) => {
    console.log(JSON.stringify(result, null, 2));
  });
});
