const testnet = {
    chain: {
        CHAIN_ID: 80001,
        CHAIN_NAME: "Polygon Mumbai Testnet",
        RPC_URL: "https://rpc-mumbai.maticvigil.com",
        EXPLORER_URL: "https://mumbai.polygonscan.com/",
    },
    contracts: {
        LENS_PERIPHERY_CONTRACT_ADDRESS: "0xD5037d72877808cdE7F669563e9389930AF404E8",
        LENS_HUB_CONTRACT_ADDRESS: "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82",
        WMATIC_ADDRESS: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
    },
    apollo: {
        APOLLO_URI: "https://api-mumbai.lens.dev/",
    },
};

const mainnet = {
    chain: {
        CHAIN_ID: 137,
        CHAIN_NAME: "Polygon Mainnet",
        RPC_URL: "https://rpc-mainnet.maticvigil.com",
        EXPLORER_URL: "https://polygonscan.com/",
    },
    contracts: {
        LENS_PERIPHERY_CONTRACT_ADDRESS: "0xeff187b4190E551FC25a7fA4dFC6cf7fDeF7194f",
        LENS_HUB_CONTRACT_ADDRESS: "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d",
        WMATIC_ADDRESS: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    },
    apollo: {
        APOLLO_URI: "https://api.lens.dev/",
    },
};

const config = {
    ...(process.env.NEXT_PUBLIC_APP_STAGE === "mainnet" ? mainnet : testnet),
    urls: {
        landing: "https://lens.xyz",
        github: "",
        claim: "https://claim.lens.xyz/",
    },
};

export default config;