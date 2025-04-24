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

## 📘 Usage examples

### 📋 Get all champions (no API key required)

```ts
import { ZhonyaClient } from "zhonya";

(async () => {
  const client = ZhonyaClient.init();

  const champions = await client.getAllChampions();
  console.log(champions);
})();
```

---

## 🧹 Available methods

### Methods that **require** an API key:

- `getSummonerByName(summonerName: string): Promise<SummonerDTO>`
- `getFreeWeek(): Promise<FreeWeekDto>`

### Methods that **do not require** an API key:

- `getAllChampions(): Promise<ChampionsDto>`

(more methods coming soon...)

---

## 📦 Requirements

- Node.js >= 18
- A valid Riot API key: [developer.riotgames.com](https://developer.riotgames.com) (for authenticated methods)

---

## 📄 License

MIT
