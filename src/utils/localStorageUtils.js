const TOKEN_KEY = "auth_token";

export function saveTokens(tokens) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}

export function getTokens() {
    const tokens = localStorage.getItem(TOKEN_KEY);
    if (tokens !== "undefined") {
        return JSON.parse(localStorage.getItem(TOKEN_KEY));
    } else {
        return null;
    }
}

export function deleteTokens() {
    localStorage.removeItem(TOKEN_KEY);
}