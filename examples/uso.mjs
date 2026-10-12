import { adicionarDias, diferencaDias, dataNoFuso } from '../src/index.js';
console.log(adicionarDias('2024-02-28', 1)); // 2024-02-29
console.log(diferencaDias('2026-01-01', '2026-01-31')); // 30
console.log(dataNoFuso(Date.parse('2026-01-02T01:00:00Z'), 'America/Sao_Paulo')); // 2026-01-01
