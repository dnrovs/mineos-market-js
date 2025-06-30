# mineos-market-js
> Inspired by/partially ported [MineOS-Market-Client](https://github.com/CoolCat467/MineOS-Market-Client) by [CoolCat467](https://github.com/CoolCat467) ([GNU GPL v3 licensed](https://github.com/CoolCat467/MineOS-Market-Client/blob/main/LICENSE))

![NPM Version](https://img.shields.io/npm/v/mineos-market-client?style=flat)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/dnrovs/mineos-market-js/ci-cd.yml?style=flat)
![NPM Last Update](https://img.shields.io/npm/last-update/mineos-market-client?style=flat)
![NPM Downloads](https://img.shields.io/npm/d18m/mineos-market-client?style=flat)

A TypeScript/JavaScript library to interact with MineOS App Market API.

## Installation
```
npm i mineos-market-client
```
## Usage
```javascript
import { Auth, Messages } from "mineos-market-client"

const user = await Auth.login({ email: "user@example.com", password: "prettypassword" })
const token = user.token

console.log(
    await Messages.getDialogs({ token })
)
```
## Configuration
All configuration parameters are optional.
```javascript
import { setConfig } from "mineos-market-client"

setConfig({
    hostUrl: "http://customapi.net/", // String for a custom host
    proxy: "http://corsproxy.io/?url=", // String for custom proxy. Useful for CORS bypassing
    userAgent: "Opera/9.80", // String for custom UA, null to exclude from headers
    headers: { 'Some-Header': 'value' } // Record<string, string> for additional headers
})
```