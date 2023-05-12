const accessTokenKey = "WEB_TOKEN"
const refreshTokenKey = "REFRESH_WEB_TOKEN"

export function storeAccessToken(val: string) {
    localStorage.setItem(accessTokenKey, val)
}

export function storeRefreshToken(val: string) {
    localStorage.setItem(refreshTokenKey, val)
}

export function getAccessToken() {
    return localStorage.getItem(accessTokenKey) ?? null
}

export function getRefreshToken() {
    return localStorage.getItem(refreshTokenKey) ?? null
}

export function eraseTokens() {
    if (getAccessToken() !== null) localStorage.removeItem(accessTokenKey)
    if (getRefreshToken() !== null) localStorage.removeItem(refreshTokenKey)
}
