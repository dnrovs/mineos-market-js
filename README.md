# mineos-market-js

![NPM Version](https://img.shields.io/npm/v/mineos-market-client?style=flat)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/dnrovs/mineos-market-js/ci-cd.yml?style=flat)
![NPM Last Update](https://img.shields.io/npm/last-update/mineos-market-client?style=flat)
![NPM Downloads](https://img.shields.io/npm/d18m/mineos-market-client?style=flat)

A TypeScript/JavaScript client to interact with the MineOS App Market API.

**[Documentation](https://dnrovs.github.io/mineos-market-js) | [MineOS](https://github.com/IgorTimofeev/MineOS)**

## Installation
```shell
npm i mineos-market-client
```

## Importing
### ES Modules
```javascript
import { MarketClient } from 'mineos-market-client'
```
### CommonJS
```javascript
const { MarketClient } = require('mineos-market-client')
```
### Browser (CDN)
```html
<script src="https://cdn.jsdelivr.net/npm/mineos-market-client@3/dist/index.umd.min.js"></script>
```
In this case, use `MineOSMarket` browser global.
### Browser (module)
```html
<script type="importmap">
    {
        "imports": {
            "mineos-market-client": "https://cdn.jsdelivr.net/npm/mineos-market-client@3/dist/index.js",

            "camelcase-keys": "https://cdn.jsdelivr.net/npm/camelcase-keys@10.0.0/+esm",
            "lua-json": "https://cdn.jsdelivr.net/npm/lua-json@1.0.1/+esm",
            "zod": "https://cdn.jsdelivr.net/npm/zod@4.0.17/+esm"
        }
    }
</script>
```

## Usage
### First steps
To start using the client, you need to initialize an instance of the client and log in (optionally). To log in, use either username or e-mail.
```javascript
const client = new MarketClient()

// Authenticate and log the user's credentials.
// You still can access some endpoints without this step.
console.log(
    await client.login({
        userName: 'gooner',
        password: '••••••••'
    })
)
    
// Also, you can retrieve the user's credentials without logging in (using the Auth service):
// await client.auth.login({ userName: 'gooner', password: '••••••••' })

// Or you can manually set the token:
// client.useToken('87cf38207ffecd80eatmyass7aa8c85dd7ba5e677f7820c5cf')

// Log the current token
console.log(
    client.getToken()
)
```
### API Usage
All API methods are grouped into services.  
Each service corresponds to a set of related endpoints (for example: `statistics`, `publications`, `messages`, etc.).

You can find the full list of services and their methods in the [API reference](https://dnrovs.github.io/mineos-market-js/modules.html#:~:text=Services).
```javascript
// Log the statistics data
console.log(
    await client.statistics.getStatistic()
)
    
// Find and log 10 first publications with 'femboys' in the name
console.log(
    await client.publications.getPublications({ search: 'femboys', count: 10 })
)

// Send a message (this one requires auth)
await client.messages.sendMessage({ userName: 'dnrovs', text: 'you stink' })
```
### Configuration
You can configure some aspects of the client, such as changing the host URL or adding custom HTTP headers. Config type reference is [here](https://dnrovs.github.io/mineos-market-js/interfaces/Config.html).
```javascript
// Partially rewrite a default config
client.useConfig({
    hostUrl: 'https://custom-market-api.cc/',        // Custom host URL.
    proxyUrl: 'https://corsproxy.io/?url=',          // Proxy URL. Appends before the host URL, useful for CORS bypass.
    userAgent: 'Mozilla/1.4.88 (Linux, Android 10)', // Custom UA. Set to 'undefined' to remove it from the headers.
    headers: { Accept: 'image/*' }                   // Custom request headers.
})

// Log the current client config 
console.log(
    client.getConfig()
)
```

## Credits
- [MineOS-Market-Client](https://github.com/CoolCat467/MineOS-Market-Client) by [CoolCat467](https://github.com/CoolCat467)
