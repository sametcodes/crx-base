import React, { createContext, useContext } from 'react';

const RootContext = createContext<{ [key: string]: HTMLElement }>({});

export const useContainer = () => {
    return useContext(RootContext)
}

type ContextProps = {
    value: { [key: string]: HTMLElement },
    children: React.ReactNode
}

const Context = ({ children, value }: ContextProps) => {
    return (
        <RootContext.Provider value={value}>
            {children}
        </RootContext.Provider>
    )
}

export default Context;