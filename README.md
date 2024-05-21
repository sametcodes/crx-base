# crx-base

Build browser extensions in a modern way. No more vanilla JS, no more Webpack.

![alt text](assets/example.jpg)

- React, TypeScript
- [Rollup](https://github.com/rollup/rollup) with [some plugins](/rollup.config.js)
- [shadcn/ui](https://ui.shadcn.com/) components, including TailwindCSS

### Getting started

This code base aims to be a template for building browser extensions with React. It's not a boilerplate, but a starting point for your own project. The main goal is to provide a modern development environment without the need to configure Webpack or Babel. It uses Rollup to bundle the code and shadcn/ui for the UI components.

This codebase offers the key feature of using TailwindCSS and shadcn/ui components. It allows you to inject your content script into any document without having to worry about styling conflicts, thanks to [postcss-scope](https://github.com/jackall3n/postcss-scope).
