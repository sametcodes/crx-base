import React from 'react';
import { createRoot } from 'react-dom/client';

import { onElementLoaded } from '@/lib/crx-base' // this is the helper function to wait for element to be loaded
import RootContext from '@/lib/crx-base/context' // this is the context provider to pass appliation containers to the components
import App from './App' // this is the main application component

import '@/components/globals.css' // this required for tailwindcss stylings

onElementLoaded("#waiting_element_selector", (element) => {
    const extensionContainer = document.createElement('div');
    extensionContainer.classList.add("root_extension");

    // or before, append, prepend etc.
    element.before(extensionContainer) // or element.after(extensionContainer)

    // render the application to the container
    createRoot(extensionContainer).render(
        <RootContext value={{ extensionContainer }}>
            <App />
        </RootContext>
    );
})