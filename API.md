<p align="right">
  <a href="API.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="API.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="API.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# Referência da API

| API | Entrada | Resultado e erros |
|---|---|---|
| `validarData(data)` | Qualquer valor; só texto ISO exato válido retorna true. | boolean; não lança por entrada inválida. |
| `compararDatas(a, b)` | Duas datas YYYY-MM-DD válidas. | -1, 0 ou 1; RangeError em data inválida. |
| `diferencaDias(inicio, fim)` | Datas válidas, incluindo anos bissextos. | Número com sinal: fim menos início; não conta horas. |
| `adicionarDias(data, dias)` | Data válida e deslocamento inteiro seguro. | Nova data; RangeError se fora de 0001–9999 ou se dias não é inteiro. |
| `formatarDataBR(data)` | Data ISO estrita. | DD/MM/AAAA; RangeError para entrada inválida. |
| `dataNoFuso(instanteMs, fuso)` | Epoch em milissegundos finito e fuso IANA explícito. | Data civil; TypeError sem fuso, RangeError em instante/fuso inválido. |

## Receita de integração

Exemplo sintético. Adapte e teste o contrato do consumidor antes de integrar:

```js
import { adicionarDias, diferencaDias, dataNoFuso } from './src/index.js';
const inicio = '2024-02-28';
const vencimento = adicionarDias(inicio, 2); // '2024-03-01'
const prazo = diferencaDias(inicio, vencimento); // 2
const dataLocal = dataNoFuso(Date.parse('2026-01-02T01:00:00Z'), 'America/Sao_Paulo'); // '2026-01-01'
```

## Detalhes do contrato

Não passe timestamp como data civil. A data do registro depende de seu contrato: UTC e fuso do usuário podem produzir dias diferentes. DiferencaDias não calcula tempo decorrido; somar um dia civil não significa somar 24 horas a um instante.

## Contratos TypeScript

Declarações .d.ts acompanham o pacote; o núcleo continua JavaScript ESM. Exemplos de tipos em test-types/consumer.mts foram verificados com o compilador já disponível, sem acrescentar dependências. O CI executa testes de runtime e conteúdo; não instala um compilador TypeScript.

[Voltar ao projeto](README.md) · [Compatibilidade](COMPATIBILITY.md)
