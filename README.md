# Nebula Library

A library of components and more for Nebula Labs projects.

## Used In

- [Clubs](https://github.com/UTDNebula/utd-clubs/)?

## New Project

Steps to add the library to a new project.

1. Run `git submodule add -b main https://github.com/UTDNebula/nebula-library.git src/nebula-library`
2. Ignore `src/nebula-library` in your configs for ESLint, Prettier, Jest, and TypeScript.
3. Add `"nebula-library": "file:src/nebula-library"` under `dependencies` in your `package.json`
4. Run `npm install` and start importing!
