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

Before using any method, you need to **initialize the library with the [Riot key](https://developer.riotgames.com/)**.

```ts
import { ZhonyaClient } from "zhonya";

// Basic initialization (default region: BR1)
ZhonyaClient.init({
  riotApiKey: "YOUR_RIOT_API_KEY",
});
```

### 🌍 Initialization with custom regions

```ts
ZhonyaClient.init({
  riotApiKey: "YOUR_RIOT_API_KEY",
  regionalRouting: "europe", // Default: "americas"
  platformRouting: "euw1", // Default: "br1"
});
```

---

## 📘 Usage examples

### 🔍 Find summoner by name

```ts
import { ZhonyaClient } from "zhonya";

(async () => {
  const summoner = await ZhonyaClient.getSummonerByName("Faker");
  console.log(summoner);
})();
```

---

## 🧹 Available methods

- `getSummonerByName(summonerName: string): Promise<SummonerDTO>`

- `getFreeWeek(): Promise<FreeWeekDto>`

- `getAllChampions(): Promise<ChampionsDto>`

(more methods coming soon...)

---

## 📦 Requirements

- Node.js >= 18
- A valid Riot API key: [developer.riotgames.com](https://developer.riotgames.com)

---

## 📄 License

MIT
