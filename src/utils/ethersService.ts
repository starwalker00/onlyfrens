import { SignatureLike } from "@ethersproject/bytes";
import { ethers, utils } from "ethers";

export function truncateEthAddress(address: string): string {
    const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
};

export const splitSignature = (signature: SignatureLike): ethers.Signature => {
    return utils.splitSignature(signature);
};