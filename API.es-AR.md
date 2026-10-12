<p align="right">
  <a href="API.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="API.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="API.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# Referencia de API

| API | Entrada | Resultado y errores |
|---|---|---|
| `validarData(data)` | Cualquier valor; solo texto ISO exacto válido devuelve true. | boolean; no genera error por entrada inválida. |
| `compararDatas(a, b)` | Dos fechas YYYY-MM-DD válidas. | -1, 0 o 1; RangeError para una fecha inválida. |
| `diferencaDias(inicio, fim)` | Fechas válidas, incluidos años bisiestos. | Número con signo: fin menos inicio; no cuenta horas. |
| `adicionarDias(data, dias)` | Fecha válida y desplazamiento entero seguro. | Nueva fecha; RangeError fuera de 0001–9999 o si días no es entero. |
| `formatarDataBR(data)` | Fecha ISO estricta. | DD/MM/AAAA; RangeError para entrada inválida. |
| `dataNoFuso(instanteMs, fuso)` | Epoch finito en milisegundos y zona IANA explícita. | Fecha civil; TypeError sin zona, RangeError para instante/zona inválidos. |

## Receta de integración

Ejemplo sintético. Adaptá y probá el contrato consumidor antes de integrar:

```js
import { adicionarDias, diferencaDias, dataNoFuso } from './src/index.js';
const inicio = '2024-02-28';
const vencimiento = adicionarDias(inicio, 2); // '2024-03-01'
const dias = diferencaDias(inicio, vencimiento); // 2
const fechaLocal = dataNoFuso(Date.parse('2026-01-02T01:00:00Z'), 'America/Sao_Paulo'); // '2026-01-01'
```

## Detalles del contrato

No pases una marca de tiempo como fecha civil. La fecha del registro depende del contrato: UTC y la zona del usuario pueden producir días distintos. diferencaDias no calcula tiempo transcurrido; sumar un día civil no equivale a sumar 24 horas a un instante.

## Contratos TypeScript

El paquete incluye declaraciones .d.ts; el núcleo sigue siendo JavaScript ESM. Los ejemplos de tipos en test-types/consumer.mts se verificaron con un compilador existente, sin agregar dependencias. El CI ejecuta pruebas de ejecución y contenido; no instala un compilador TypeScript.

[Volver al proyecto](README.es-AR.md) · [Compatibilidad](COMPATIBILITY.es-AR.md)
