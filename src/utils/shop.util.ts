export function getShopLogoUrlByName(name: string) {
    return {
        "carrefour.be":
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Carrefour_logo.svg/1200px-Carrefour_logo.svg.png",
        "aldi.be":
            "https://www.aldi.be/etc/designs/aldi/web/frontend/aldi/images/app/app-icon.svg.res/1638344259427/app-icon.svg",
        "lidl.be":
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lidl-Logo.svg/2048px-Lidl-Logo.svg.png",
        "ah.be":
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Albert_Heijn_Logo.svg/1000px-Albert_Heijn_Logo.svg.png",
    }[name.toLowerCase()];
}

export function getShopDominantColorByName(name: string) {
    return {
        "carrefour.be": "#004E9E",
        "aldi.be": "#00B5DD",
        "lidl.be": "#FFF000",
        "ah.be": "#00A0E2",
    }[name.toLowerCase()];
}

export function getShopNameFromDomain(domain: string) {
    return domain.split(".")[0];
}
