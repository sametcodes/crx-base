import React from 'react';
import { createRoot } from 'react-dom/client';
import RootContext from '@/content/context';
import { onElementLoaded } from '@/content/utils';
import '@/components/globals.css'
import App from './App';

// no need to wait for element to be loaded, you can append the element to the root directly
onElementLoaded("#waiting_element_selector", async (element) => {
    element.style.position = "relative";

    const extensionContainer = document.createElement('div');
    extensionContainer.classList.add("root_extension");

    // or before, append, prepend etc.
    element.after(extensionContainer)

    createRoot(extensionContainer).render(
        <RootContext value={{ extensionContainer }}>
            <App />
        </RootContext>
    );
})