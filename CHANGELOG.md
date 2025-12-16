# Changelog

## [3.1.0](https://github.com/dnrovs/mineos-market-js/compare/v3.0.3...v3.1.0) (2025-12-16)


### Features

* added config option to disable response schema validation ([6c7a8e8](https://github.com/dnrovs/mineos-market-js/commit/6c7a8e867a360ea8e36b787ffe0a12d31c707638))


### Bug Fixes

* fixed handling empty `dependenciesData` ([1913813](https://github.com/dnrovs/mineos-market-js/commit/1913813cc4c810cc6a57510b0a0179b23bda5b95))
* fixed incorrectly typed numeric values in object arrays ([5062d8b](https://github.com/dnrovs/mineos-market-js/commit/5062d8bca77d819087e826685cac0ccf8af5ed94))

## [3.0.3](https://github.com/dnrovs/mineos-market-js/compare/v3.0.2...v3.0.3) (2025-12-15)


### Bug Fixes

* fixed handling `dependenciesData` object in publication ([8f9b96d](https://github.com/dnrovs/mineos-market-js/commit/8f9b96d3ed5d6b80458af608973b376233ffa1c1))

## [3.0.2](https://github.com/dnrovs/mineos-market-js/compare/v3.0.1...v3.0.2) (2025-12-15)


### Bug Fixes

* fixed handling different types of lua tables and arrays ([26a2922](https://github.com/dnrovs/mineos-market-js/commit/26a2922a591f2af1d1b72f105e20f28e3a2fee98))

## [3.0.1](https://github.com/dnrovs/mineos-market-js/compare/v3.0.0...v3.0.1) (2025-10-15)


### Bug Fixes

* corrected schema for Publication ([cfc0d0f](https://github.com/dnrovs/mineos-market-js/commit/cfc0d0fc924fcdd267f660116999b413ccd04b2d))
* fixed handling of responses returning empty arrays ([7ee9c7f](https://github.com/dnrovs/mineos-market-js/commit/7ee9c7fe0fcd1a414b8bac68e72f70e59e035555))

## [3.0.0](https://github.com/dnrovs/mineos-market-js/compare/v2.1.3...v3.0.0) (2025-10-11)


### ⚠ BREAKING CHANGES

* Zod responses validation
* main class with service modules structure

### Features

* extended and adjusted enums ([415e28f](https://github.com/dnrovs/mineos-market-js/commit/415e28fafa67c1e40d9ddf0fb28e6652a354a6d8))
* main class with service modules structure ([0de8e81](https://github.com/dnrovs/mineos-market-js/commit/0de8e814e7c1bf6f1b3766b3b4a5e2f17bb9f5b5))
* rollup bundling (CJS, ESM, UMD) ([8895fd3](https://github.com/dnrovs/mineos-market-js/commit/8895fd3ec42488dd507bb18f7bd4fb28083def27))
* search publications by publisher's username ([0de8e81](https://github.com/dnrovs/mineos-market-js/commit/0de8e814e7c1bf6f1b3766b3b4a5e2f17bb9f5b5))
* Zod responses validation ([0de8e81](https://github.com/dnrovs/mineos-market-js/commit/0de8e814e7c1bf6f1b3766b3b4a5e2f17bb9f5b5))


### Bug Fixes

* fixed the missing first requested publication when querying by ID array ([8e7a7da](https://github.com/dnrovs/mineos-market-js/commit/8e7a7da55dbf8c0236349059312c4521d841a4c0))
* fixed uploading publication's dependencies ([0de8e81](https://github.com/dnrovs/mineos-market-js/commit/0de8e814e7c1bf6f1b3766b3b4a5e2f17bb9f5b5))

## [2.1.3](https://github.com/dnrovs/mineos-market-js/compare/v2.1.2...v2.1.3) (2025-07-14)


### Bug Fixes

* fixed config's import ([fee1526](https://github.com/dnrovs/mineos-market-js/commit/fee15260614a2e60e06a78a677a7ff497815f184))

## [2.1.2](https://github.com/dnrovs/mineos-market-js/compare/v2.1.1...v2.1.2) (2025-07-07)


### Bug Fixes

* fixed requests with array bodies ([9d771e8](https://github.com/dnrovs/mineos-market-js/commit/9d771e8b5b37c15c6adf127a2b52401de8f8a5f3))

## [2.1.1](https://github.com/dnrovs/mineos-market-js/compare/v2.0.0...v2.1.1) (2025-06-30)


### Features

* implemented configuration support ([226a2ad](https://github.com/dnrovs/mineos-market-js/commit/226a2ada4920a1a3013a8f76a9a5222812d0ede9))

## [2.0.0](https://github.com/dnrovs/mineos-market-js/compare/v1.0.0...v2.0.0) (2025-06-29)


### ⚠ BREAKING CHANGES

* modular structure and exported types

### Features

* modular structure and exported types ([e011a33](https://github.com/dnrovs/mineos-market-js/commit/e011a33763e28753c1c0bfda6d6439871e4d78e9))

## 1.0.0 (2025-06-24)


### Features

* initial release ([0fd45ba](https://github.com/dnrovs/mineos-market-js/commit/0fd45ba149126dd2579bfc63a7875ce35d9921ff))
