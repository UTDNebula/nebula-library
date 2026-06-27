# Nebula Library

A library of components and more for Nebula Labs projects.

## Used In

- [Clubs](https://github.com/UTDNebula/utd-clubs/)?

## New Project

Steps to add the library to a new project.

1. Run `git submodule add https://github.com/UTDNebula/nebula-library.git src/nebula-library`.
2. Ignore `src/nebula-library` in your configs for ESLint, Prettier, Jest, and TypeScript.
3. Add `"nebula-library": "file:src/nebula-library"` under `dependencies` in your `package.json` and run `npm install`.
4. Add `submodules: recursive` in the "with" section of `actions/checkout` for any GitHub actions that need it.
5. Update your documentation to use `git clone --recurse-submodules` and explain submodule development.
6. Start importing!
