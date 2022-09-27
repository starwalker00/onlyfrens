import { makeVar, ReactiveVar, useReactiveVar } from '@apollo/client';

type GlobalUIStateType = {
    subNav: {
        enabled: boolean;
        open: boolean;
        touched: boolean;
    };
    // someOtherUINamespace: {...}
};

const initialState: GlobalUIStateType = {
    subNav: {
        enabled: false,
        open: false,
        touched: false,
    },
};

const globalUIVar: ReactiveVar<GlobalUIStateType> = makeVar(initialState);

const toggleSubNav = () => {
    return globalUIVar({
        ...globalUIVar(),
        subNav: {
            ...globalUIVar().subNav,
            open: !globalUIVar().subNav.open,
            touched: true,
        },
    });
};

const disableSubNav = () => {
    return globalUIVar({
        ...globalUIVar(),
        subNav: {
            ...globalUIVar().subNav,
            open: false,
            enabled: false,
        },
    });
};

const enableSubNav = () => {
    return globalUIVar({
        ...globalUIVar(),
        subNav: {
            ...globalUIVar().subNav,
            enabled: true,
            open: true,
        },
    });
};

export const useGlobalUI = () => {
    const GlobalUIState = useReactiveVar(globalUIVar);

    return {
        subNav: {
            open: GlobalUIState.subNav.open,
            enabled: GlobalUIState.subNav.enabled,
            toggle: toggleSubNav,
            disable: disableSubNav,
            enable: enableSubNav,
        },
    };
};