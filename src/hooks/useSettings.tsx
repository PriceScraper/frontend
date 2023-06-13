import React, { createContext, useContext, useEffect, useState } from "react";

const availableShops = [
  { shopId: "carrefour", shopName: "carrefour" },
  { shopId: "ah", shopName: "ah" },
  { shopId: "q91pg5kgq322k", shopName: "Delhaize" },
];

interface ShopEntry {
  shopId: string;
  shopName: string;
}

interface Settings {
  whiteListedShops: ShopEntry[];
  availableShops: ShopEntry[];
}

interface MutableSettings extends Settings {
  addWhiteListedShop: (shop: ShopEntry) => void;
  deleteWhitelistedShop: (shop: string) => void;
}

const SettingsContext = createContext<MutableSettings>({
  availableShops: [],
  whiteListedShops: [],
  addWhiteListedShop: () => {},
  deleteWhitelistedShop: () => {},
});

const seperator = "|";
const whiteListedShopsKey = "whitelistedShops";

function updateWhiteListedShopsInLocalStorage(updatedShops: ShopEntry[]) {
  localStorage.setItem(
    whiteListedShopsKey,
    updatedShops.map((u) => JSON.stringify(u)).join(seperator)
  );
}

function getWhiteListedShopsFromLocalStorage() {
  const whiteListedShops: ShopEntry[] = [];
  localStorage
    .getItem(whiteListedShopsKey)
    ?.split(seperator)
    .forEach((s) => whiteListedShops.push(JSON.parse(s)));
  return whiteListedShops;
}

export function SettingsProvider(props: { children: React.ReactNode }) {
  useEffect(() => {
    if (localStorage.getItem(whiteListedShopsKey) === null)
      updateWhiteListedShopsInLocalStorage(availableShops);
  }, []);
  const [settings, setSettings] = useState<Settings>({
    availableShops: availableShops,
    whiteListedShops: getWhiteListedShopsFromLocalStorage() || availableShops,
  });

  function addWhiteListedShopHandler(shop: ShopEntry) {
    if (
      settings.whiteListedShops.map((ws) => ws.shopId).includes(shop.shopId) ||
      !availableShops.map((ws) => ws.shopId).includes(shop.shopId)
    )
      return;
    const newShops = settings.whiteListedShops.concat([shop]);
    updateWhiteListedShopsInLocalStorage(newShops);
    updateWhiteListedShops();
  }

  function deleteWhiteListedShopHandler(shopId: string) {
    if (
      !settings.whiteListedShops.map((ws) => ws.shopId).includes(shopId) ||
      !availableShops.map((ws) => ws.shopId).includes(shopId)
    )
      return;
    const newShops = settings.whiteListedShops.filter(
      (s) => s.shopId !== shopId
    );
    updateWhiteListedShopsInLocalStorage(newShops);
    updateWhiteListedShops();
  }

  function updateWhiteListedShops() {
    setSettings((prevState) => ({
      ...prevState,
      whiteListedShops: getWhiteListedShopsFromLocalStorage() || [],
    }));
  }

  return (
    <SettingsContext.Provider
      value={{
        availableShops: settings.availableShops,
        whiteListedShops: settings.whiteListedShops,
        addWhiteListedShop: addWhiteListedShopHandler,
        deleteWhitelistedShop: deleteWhiteListedShopHandler,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export default function useSettings() {
  return useContext(SettingsContext);
}
