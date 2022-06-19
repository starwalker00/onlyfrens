enum AppContextActionKind {
    setContextAccount = 'set_contextAccount'
};

export type AppContext = {
    contextAccount: string;
};

export type AppContextAction = {
    type: AppContextActionKind;
    payload: string;
};
