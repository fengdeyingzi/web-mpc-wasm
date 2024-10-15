import { createContext, useContext } from "react";
import AppStore from "./stores/AppStore";

export const PageContext = createContext<AppStore>(null);

const pageStore = new AppStore();
export function AppProvider({ children }) {
    return (
        <PageContext.Provider value={pageStore}>
            {children}
        </PageContext.Provider>
    );
}

export function useApp() {
    return useContext(PageContext);
}

export function useFileSystem() {
    return useContext(PageContext).fileSystem;
}

export function useEditor() {
    return useContext(PageContext).editor;
}

export function useCurrentEditFile() {
    return useContext(PageContext).editor.currentFile;
}

export function useConsole() {
    return useContext(PageContext).console;
}
