import { validarData, adicionarDias, diferencaDias, dataNoFuso, formatarDataBR } from '../src/index.js';
const inicio = '2024-02-28';
const vencimento = adicionarDias(inicio, 2);
console.log({ inicio, vencimento, dias: diferencaDias(inicio, vencimento), rotulo: formatarDataBR(vencimento) });
console.log({ dataImpossivelAceita: validarData('2026-02-30') });
const instante = Date.parse('2026-01-02T01:00:00Z');
console.log({ utc: dataNoFuso(instante, 'UTC'), saoPaulo: dataNoFuso(instante, 'America/Sao_Paulo') });
