import jwtDecode from "jwt-decode"
import type { authToken, Jwt } from "src/custom-types/types"

export const getAddress = (auth: authToken): string => {
    if (Boolean(auth?.accessToken)) {
        const { id } = jwtDecode<Jwt>(auth.accessToken);
        // console.log("localStorage accessToken address:" + id)
        return id;
    }
    else {
        return "";
    }
};