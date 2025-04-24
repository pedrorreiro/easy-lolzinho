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

Depending on which methods you plan to use, you may need to initialize the library with a [Riot API key](https://developer.riotgames.com/).

### 🔑 With API Key (Full Access)

```ts
import { ZhonyaClient } from "zhonya";

// Basic initialization (default region: BR1)
const client = ZhonyaClient.init({
  riotApiKey: "YOUR_RIOT_API_KEY",
});
```

### 🌍 Initialization with custom regions

```ts
const client = ZhonyaClient.init({
  riotApiKey: "YOUR_RIOT_API_KEY",
  regionalRouting: "europe", // Default: "americas"
  platformRouting: "euw1", // Default: "br1"
});
```

### 🔓 Without API Key (Limited Access)

```ts
import { ZhonyaClient } from "zhonya";

// Initialize without API key - only for methods that don't require authentication
const client = ZhonyaClient.init();
```

---

## 📘 Usage Examples

### 📋 Get all champions (no API key required)

```ts
import { ZhonyaClient } from "zhonya";

(async () => {
  const client = ZhonyaClient.init();

  // Using the new champions API
  const champions = await client.champions.getAll();
  console.log(champions);
})();
```

### 📋 Get summoner information (requires API key)

```ts
import { ZhonyaClient } from "zhonya";

(async () => {
  const client = ZhonyaClient.init({
    riotApiKey: "YOUR_RIOT_API_KEY",
  });

  // Using the summoner API
  const summoner = await client.summoner.getByName("summoner-name");
  console.log(summoner);
})();
```

### 📋 Get the weekly free rotation (requires API key)

```ts
import { ZhonyaClient } from "zhonya";

(async () => {
  const client = ZhonyaClient.init({
    riotApiKey: "YOUR_RIOT_API_KEY",
  });

  // Using the free week rotation API
  const freeWeek = await client.freeWeek.get();
  console.log(freeWeek);
})();
```

---

## 🧹 Available APIs

### `client.summoner` - Summoner API

Methods that **require** an API key:

- `getByName(summonerName: string): Promise<SummonerDTO>` - Get summoner information by name

### `client.freeWeek` - Free Week Rotation API

Methods that **require** an API key:

- `get(): Promise<FreeWeekDto>` - Get the weekly free champion rotation

### `client.champions` - Champions API

Methods that **do not require** an API key:

- `getAll(): Promise<ChampionsDto>` - Get all champions

> Note: The old methods (`client.getSummonerByName()`, `client.getFreeWeek()`, `client.getAllChampions()`) still work but are marked as deprecated and will be removed in future versions.

---

## 📦 Requirements

- Node.js >= 18
- A valid Riot API key: [developer.riotgames.com](https://developer.riotgames.com) (for authenticated methods)

---

## 📄 License

MIT
