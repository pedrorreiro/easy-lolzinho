# Testes Unitários - Lolzinho API

Este documento descreve como executar e criar testes unitários para o projeto Lolzinho API.

## Configuração

O projeto utiliza Jest como framework de testes. A configuração está no arquivo `jest.config.js`.

## Executando os Testes

Para executar todos os testes unitários:

```bash
npm test
```

Para executar testes com observação de alterações (útil durante o desenvolvimento):

```bash
npm test -- --watch
```

Para executar um teste específico:

```bash
npm test -- -t 'nome do teste'
```

## Estrutura dos Testes

Os testes seguem a estrutura de diretórios do código-fonte:

- Os testes são colocados em diretórios `__tests__` próximos aos arquivos que estão sendo testados
- Os arquivos de teste têm o sufixo `.test.ts` ou `.spec.ts`

Exemplo:

```
src/
  resources/
    freeWeek/
      service.ts
      __tests__/
        service.test.ts
```

## Cobertura de Testes

A cobertura de testes é gerada automaticamente ao executar `npm test`. O relatório é exibido no terminal e também é gerado em HTML na pasta `coverage/`.

## Criando Novos Testes

### Exemplo de Teste para um Serviço

```typescript
// Importe as dependências e a classe a ser testada
import { SeuServico } from "../seuservico";
// Use mocks para APIs externas
jest.mock("axios");

describe("SeuServico", () => {
  let servico: SeuServico;

  beforeEach(() => {
    // Configuração para cada teste
    servico = new SeuServico();
  });

  it("deve fazer algo específico", () => {
    // Arrange (preparação)
    const parametro = "valor";

    // Act (ação)
    const resultado = servico.metodo(parametro);

    // Assert (verificação)
    expect(resultado).toBe("valor esperado");
  });
});
```

### Melhores Práticas

1. **Isole os testes**: Utilize mocks para APIs externas e outros serviços
2. **Nomenclatura clara**: Os nomes dos testes devem descrever o que está sendo testado
3. **AAA**: Siga o padrão Arrange-Act-Assert
4. **Teste os casos de erro**: Certifique-se de testar cenários de falha
5. **Mantenha os testes independentes**: Cada teste deve ser independente dos outros
