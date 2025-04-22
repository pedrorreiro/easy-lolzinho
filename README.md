# 🤙 @pedrorreiro/lolzinho

![npm (scoped)](https://img.shields.io/npm/v/@pedrorreiro/lolzinho)
.
![NPM Downloads](https://img.shields.io/npm/dm/%40pedrorreiro%2Flolzinho)

A simple and direct wrapper for the Riot Games API (League of Legends), built with TypeScript.

---

## 🚀 Installation

```bash
npm install @pedrorreiro/lolzinho
```

---

## 💠 Initialization

Before using any method, you need to **initialize the library with the [Riot key](https://developer.riotgames.com/)**.

```ts
import { LolzinhoClient } from "@pedrorreiro/lolzinho";

// Basic initialization (default region: BR1)
LolzinhoClient.init({
  riotApiKey: "YOUR_RIOT_API_KEY",
});
```

### 🌍 Initialization with custom regions

```ts
LolzinhoClient.init({
  riotApiKey: "YOUR_RIOT_API_KEY",
  regionalRouting: "europe", // Default: "americas"
  platformRouting: "euw1", // Default: "br1"
});
```

---

## 📘 Usage examples

### 🔍 Find summoner by name

```ts
import { LolzinhoClient } from "@pedrorreiro/lolzinho";

(async () => {
  const summoner = await LolzinhoClient.getSummonerByName("Faker");
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
