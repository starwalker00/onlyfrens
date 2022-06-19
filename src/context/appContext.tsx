import { useReducer, useContext, createContext, Dispatch } from 'react';
import { AppContext, AppContextAction } from 'src/custom-types/appContext';
// import { namedConsoleLog } from 'src/lib/helper';

const initialAppContext: AppContext = {
    contextAccount: ''
};

const AppStateContext = createContext<AppContext>({} as AppContext);
const AppDispatchContext = createContext<Dispatch<AppContextAction>>({} as Dispatch<AppContextAction>);

function reducer(state: AppContext, action: AppContextAction): AppContext {
    switch (action.type) {
        case 'set_contextAccount':
            // namedConsoleLog('state', state);
            // namedConsoleLog('action.payload', action.payload);
            return { ...state, contextAccount: action.payload }
        default:
            throw new Error(`Unknown action: ${action.type}`)
    }
}

export function AppContextProvider({ children }: any) {
    const [state, dispatch] = useReducer(reducer, initialAppContext);
    return (
        <AppDispatchContext.Provider value={dispatch}>
            <AppStateContext.Provider value={state}>
                {children}
            </AppStateContext.Provider>
        </AppDispatchContext.Provider>
    )
}

export const useAppContext = () => useContext(AppStateContext);
export const useDispatchAppContext = () => useContext(AppDispatchContext);
