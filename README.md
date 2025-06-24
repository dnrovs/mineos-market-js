# mineos-market-client
> [!NOTE]
> Inspired by/partially ported [MineOS-Market-Client](https://github.com/CoolCat467/MineOS-Market-Client) by [CoolCat467](https://github.com/CoolCat467) ([MIT licensed](https://github.com/CoolCat467/MineOS-Market-Client/blob/main/LICENSE))

A TypeScript/JavaScript library to interact with MineOS App Market API.

## Installation
```
npm i mineos-market-client
```
## Usage
```javascript
import * as market from "mineos-market-js"

const user = await market.login({ email: "user@example.com", password: "prettypassword" })
const token = user.token

console.log(
    await market.getDialogs({ token })
)
```