# 🤙 @pedrorreiro/lolzinho

![npm (scoped)](https://img.shields.io/npm/v/@pedrorreiro/lolzinho)
.
![NPM Downloads](https://img.shields.io/npm/dm/%40pedrorreiro%2Flolzinho)

Um wrapper simples e direto para a API da Riot Games (League of Legends), feito com TypeScript.

---

## 🚀 Instalação

```bash
npm install @pedrorreiro/lolzinho
```

---

## 💠 Inicialização

Antes de usar qualquer método, você precisa **inicializar a biblioteca com a [chave da Riot](https://developer.riotgames.com/)**.

```ts
import { LolzinhoClient } from "@pedrorreiro/lolzinho";

// Inicialização básica (região padrão: BR1)
LolzinhoClient.init({
  riotApiKey: "SUA_CHAVE_API_RIOT",
});
```

### 🌍 Inicialização com regiões personalizadas

```ts
LolzinhoClient.init({
  riotApiKey: "SUA_CHAVE_API_RIOT",
  regionalRouting: "europe", // Padrão: "americas"
  platformRouting: "euw1", // Padrão: "br1"
});
```

---

## 📘 Exemplos de uso

### 🔍 Buscar invocador pelo nome

```ts
import { LolzinhoClient } from "@pedrorreiro/lolzinho";

(async () => {
  const summoner = await LolzinhoClient.getSummonerByName("Faker");
  console.log(summoner);
})();
```

---

## 🧹 Métodos disponíveis

- `getSummonerByName(summonerName: string): Promise<SummonerDTO>`

(mais métodos em breve...)

---

## 🧪 Testes

O projeto utiliza Jest para testes unitários. Para executar os testes:

```bash
# Executar todos os testes
npm test

# Executar testes com watch mode
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage
```

Para mais informações sobre os testes, consulte o arquivo [TESTING.md](TESTING.md).

---

## 📦 Requisitos

- Node.js >= 18
- Uma chave válida da API da Riot: [developer.riotgames.com](https://developer.riotgames.com)

---

## 📄 Licença

MIT
