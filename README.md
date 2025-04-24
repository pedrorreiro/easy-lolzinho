# ⌛ Zhonya

![npm (scoped)](https://img.shields.io/npm/v/zhonya)
.
![NPM Downloads](https://img.shields.io/npm/dm/zhonya)

A simple and direct wrapper for the Riot Games API (League of Legends), built with TypeScript.

---

## 🚀 Installation

```bash
npm install zhonya
```

---

## 💠 Initialization

```ts
import { ZhonyaClient } from "zhonya";

// With API Key (Full Access)
const clientKey = ZhonyaClient.init({
  riotApiKey: "YOUR_RIOT_API_KEY",
  // Optional configuration
  regionalRouting: "europe", // Default: "americas"
  platformRouting: "euw1", // Default: "br1"
});

// Without API Key (Limited Access)
const clientNoKey = ZhonyaClient.init();
```

> **Note:** A [Riot API key](https://developer.riotgames.com/) is required for most endpoints, but some data can be accessed without authentication.

---

## 📘 Usage Examples

```ts
import { ZhonyaClient } from "zhonya";

// Client with API key - full access
const client = ZhonyaClient.init({
  riotApiKey: "YOUR_RIOT_API_KEY",
});

// Client without API key - limited access
const clientNoKey = ZhonyaClient.init();

// No API key required
await clientNoKey.champions.getAll();

// API key required - throws error if no API key is provided
await client.summoner.getByName("summoner-name");
```

---

## 🧹 Available APIs

- Champions API
- Free Week API
- Summoner API

For details on which methods require API keys, see:

- [Methods requiring API Key](api-key-required.md)
- [Methods not requiring API Key](api-key-not-required.md)

---

## 📦 Requirements

- Node.js >= 18
- A valid Riot API key: [developer.riotgames.com](https://developer.riotgames.com) (for authenticated methods)

---

## 📄 License

MIT
