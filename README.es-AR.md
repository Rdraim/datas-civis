<p align="right">
  <a href="README.md"><img src="assets/support/flag-pt-br.svg" width="36" height="24" alt="Português brasileiro" title="Português brasileiro"></a>
  <a href="README.en-US.md"><img src="assets/support/flag-en-us.svg" width="36" height="24" alt="English (United States)" title="English (United States)"></a>
  <a href="README.es-AR.md"><img src="assets/support/flag-es-ar.svg" width="36" height="24" alt="Español (Argentina)" title="Español (Argentina)"></a>
</p>

# datas-civis

Fechas civiles gregorianas, diferencias de días y zonas explícitas.

Valida YYYY-MM-DD y rechaza fechas imposibles y marcas de tiempo. Suma días, compara vencimientos y presenta DD/MM/AAAA. Convertir un instante requiere una zona IANA explícita; la aritmética civil no cambia con el horario de verano.

Node.js 22 o superior. Núcleo ESM sin dependencias, utilizable en navegadores modernos. No está publicado en npm: cloná el repositorio o usá una revisión Git fija. Conservá la licencia al copiar el módulo.

## Uso

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

## Contrato

```text
validarData(data) → boolean
compararDatas(a, b) → -1 | 0 | 1
diferencaDias(inicio, fim) → number
adicionarDias(data, dias) → YYYY-MM-DD
formatarDataBR(data) → DD/MM/YYYY
dataNoFuso(epochMilliseconds, ianaTimezone) → YYYY-MM-DD
```

## Límites

Años 0001–9999, calendario gregoriano. No calcula feriados, días hábiles ni horas transcurridas. Las entradas inválidas generan errores, salvo validarData. Las zonas dependen de los datos Intl del runtime.

## Verificación

CI en Node 22 y 24, ejemplos ejecutables, pruebas de bordes y revisión heurística de contenido/historial. La revisión automática no reemplaza la inspección humana.

## Contribuciones

Abrí una Issue con el comportamiento esperado y un ejemplo sintético. Enviá un PR con prueba de regresión y documentación sincronizada en los tres idiomas. No envíes datos reales, registros, configuración ni credenciales.

## Seguridad

Usá el reporte privado de vulnerabilidades de GitHub cuando esté disponible. No publiques secretos ni datos personales en Issues. El núcleo no accede a redes, bases ni archivos; validá contratos y límites en la aplicación consumidora.

## Historial

1.0.0 — 2026-10-12: Primera versión: contrato independiente, ejemplos sintéticos, pruebas y CI.

## Licencia

[MIT](LICENSE) © Rodrigo Rodrigues
