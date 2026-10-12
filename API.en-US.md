<p align="right">
  <a href="API.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="API.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="API.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# API reference

| API | Input | Result and errors |
|---|---|---|
| `validarData(data)` | Any value; only a valid exact ISO string returns true. | boolean; does not throw for invalid input. |
| `compararDatas(a, b)` | Two valid YYYY-MM-DD dates. | -1, 0 or 1; RangeError for an invalid date. |
| `diferencaDias(inicio, fim)` | Valid dates, including leap years. | Signed number: end minus start; does not count hours. |
| `adicionarDias(data, dias)` | Valid date and safe integer day offset. | New date; RangeError outside 0001–9999 or for a noninteger offset. |
| `formatarDataBR(data)` | Strict ISO date. | DD/MM/YYYY; RangeError for invalid input. |
| `dataNoFuso(instanteMs, fuso)` | Finite epoch milliseconds and explicit IANA timezone. | Civil date; TypeError without a timezone, RangeError for an invalid instant/timezone. |

## Integration recipe

Synthetic example. Adapt and test the consuming application contract before integrating:

```js
import { adicionarDias, diferencaDias, dataNoFuso } from './src/index.js';
const start = '2024-02-28';
const dueDate = adicionarDias(start, 2); // '2024-03-01'
const days = diferencaDias(start, dueDate); // 2
const localDate = dataNoFuso(Date.parse('2026-01-02T01:00:00Z'), 'America/Sao_Paulo'); // '2026-01-01'
```

## Contract details

Do not pass a timestamp as a civil date. The record date depends on the contract: UTC and the user timezone can produce different days. diferencaDias does not calculate elapsed time; adding a civil day is not adding 24 hours to an instant.

## TypeScript contracts

The package includes .d.ts declarations; the core remains JavaScript ESM. Type examples in test-types/consumer.mts were checked with an existing compiler, without adding dependencies. CI runs runtime and content tests; it does not install a TypeScript compiler.

[Back to project](README.en-US.md) · [Compatibility](COMPATIBILITY.en-US.md)
