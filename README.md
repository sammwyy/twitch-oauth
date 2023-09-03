# Twitch OAuth

Authenticate users with Twitch.

## 💻 Getting started

```shell
# With npm:
npm install twitch-oauth

# With yarn:
yarn add twitch-oauth
```

## 📚 Usage

### As a ES Module

```typescript
import { TwitchOAuth } from 'twitch-oauth';

// Initialize client.
const client = new TwitchOAuth({
  clientId: '..............',
  clientSecret: '..........',
  redirectUri: '...........',
  scope: [
    "user:read:email",
    "......"
  ],
  // Optional, can be "token" or "code" (code is by default and recommended)
  method: "code"
});

// Get the auth redirect url.
client.authenticate(); // Returns https://id.twitch.tv/oauth2/authorize?....

// Get access and refresh token using the code that twitch sends the frontend.
client.verifyCodeResponse(access_token: string)
    .then(console.log);

// Check if access token still valid.
client.validate(access_token: string);
```

### As CJS Module

```javascript
// If uses require function you will need to use .default
// For import in typescript, this is not required
const { TwitchOAuth } = require('twitch-oauth').default;
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/sammwyy/twitch-oauth/issues).

## ❤️ Show your support

Give a ⭐️ if this project helped you!

Or buy me a coffeelatte 🙌🏾

[Ko-fi](https://ko-fi.com/sammwy) | [Patreon](https://patreon.com/sammwy)

## 📝 License

Copyright © 2022 [Sammwy](https://github.com/sammwyy).  
This project is [MIT](LICENSE) licensed.  
