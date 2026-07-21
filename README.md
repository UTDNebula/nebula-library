# Nebula Library

A library of components and more for Nebula Labs projects.

## Used In

- [Clubs](https://github.com/UTDNebula/utd-clubs/)?
- [Notebook](https://github.com/UTDNebula/utd-notebook/)?

## Standards

All components must use [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) for any passed in Tailwind class names so that default styles can be overridden.

## New Project

Steps to add the library to a new project.

1. Run `git submodule add https://github.com/UTDNebula/nebula-library.git src/nebula-library`.
2. Ignore `src/nebula-library` in your configs for ESLint, Prettier, Jest, and TypeScript.
3. Update your TypeScript config to resolve `@nebula-library/` imports then your ESLint config to require them and your Prettier config to sort them separately.
4. Add `"nebula-library": "file:src/nebula-library"` under `dependencies` in your `package.json` and run `npm install`.
5. Add `submodules: recursive` in the "with" section of `actions/checkout` for any GitHub actions that need it.
6. Update your documentation to use `git clone --recurse-submodules` and explain submodule development.
7. Start importing!
