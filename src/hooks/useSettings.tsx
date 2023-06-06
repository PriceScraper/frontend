import React, {createContext, useContext, useEffect, useState} from "react";

const availableShops = ["carrefour", "ah"];

interface Settings {
    whiteListedShops: string[];
    availableShops: string[];
}

interface MutableSettings extends Settings {
    addWhiteListedShop: (shop: string) => void;
    deleteWhitelistedShop: (shop: string) => void;
}

const SettingsContext = createContext<MutableSettings>({
    availableShops: [],
    whiteListedShops: [],
    addWhiteListedShop: () => {
    },
    deleteWhitelistedShop: () => {
    },
});

const whiteListedShopsKey = "whitelistedShops";

function updateWhiteListedShopsInLocalStorage(updatedShops: string[]) {
    localStorage.setItem(whiteListedShopsKey, updatedShops.join(","));
}

function getWhiteListedShopsFromLocalStorage() {
    return localStorage.getItem(whiteListedShopsKey)?.split(",");
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

    function addWhiteListedShopHandler(shop: string) {
        if (
            settings.whiteListedShops.includes(shop) ||
            !availableShops.includes(shop)
        )
            return;
        const newShops = settings.whiteListedShops.concat([shop]);
        updateWhiteListedShopsInLocalStorage(newShops);
        updateWhiteListedShops();
    }

    function deleteWhiteListedShopHandler(shop: string) {
        if (
            !settings.whiteListedShops.includes(shop) ||
            !availableShops.includes(shop)
        )
            return;
        const newShops = settings.whiteListedShops.filter((s) => s !== shop);
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
