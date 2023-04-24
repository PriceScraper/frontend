const tokenKey = "WEB_TOKEN"

export function storeToken(val:string) {
    localStorage.setItem(tokenKey, val)
}

export function getToken() {
    return localStorage.getItem(tokenKey) ?? null
}

export function eraseToken() {
    if(getToken() !== null) localStorage.removeItem(tokenKey)
}
