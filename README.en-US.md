<p align="right">
  <a href="README.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="README.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="README.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# datas-civis

Gregorian civil dates, day differences and explicit timezones.

Validates YYYY-MM-DD and rejects impossible dates and timestamps. Adds days, compares due dates and formats DD/MM/YYYY. Converting an instant requires an explicit IANA timezone; civil day arithmetic is unaffected by daylight saving transitions.

Node.js 22 or later. Dependency-free ESM core, usable in modern browsers. Not published on npm: clone the repository or use a pinned Git revision. Preserve the license when copying the module.

## Usage

```bash
git clone https://github.com/Rdraim/datas-civis.git
cd datas-civis
npm test
npm run example
```

```js
import { adicionarDias, dataNoFuso } from './src/index.js';
adicionarDias('2024-02-28', 1); // '2024-02-29'
dataNoFuso(Date.parse('2026-01-02T01:00:00Z'), 'America/Sao_Paulo'); // '2026-01-01'
```

## Contract

```text
validarData(data) → boolean
compararDatas(a, b) → -1 | 0 | 1
diferencaDias(inicio, fim) → number
adicionarDias(data, dias) → YYYY-MM-DD
formatarDataBR(data) → DD/MM/YYYY
dataNoFuso(epochMilliseconds, ianaTimezone) → YYYY-MM-DD
```

## Limits

Years 0001–9999, Gregorian calendar. Does not calculate holidays, business days or elapsed hours. Invalid inputs throw, except validarData. Timezones depend on runtime Intl data.

## Verification

CI on Node 22 and 24, runnable examples, edge case tests and heuristic content/history checks. Automated checks do not replace human review.

## Contributing

Open an Issue with expected behavior and a synthetic example. Contributions need a PR with a regression test and synchronized documentation in all three languages. Do not submit real data, logs, configuration or credentials.

## Security

Use GitHub private vulnerability reporting when available. Do not post secrets or personal data in Issues. The core does not access networks, databases or files; validate contracts and limits in the consuming application.

## Changelog

1.0.0 — 2026-10-12: Initial release: independent contract, synthetic examples, tests and CI.

## License

[MIT](LICENSE) © Rodrigo Rodrigues
