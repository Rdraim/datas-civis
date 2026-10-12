import { validarData, adicionarDias, compararDatas, dataNoFuso } from 'datas-civis';
const candidato: unknown = '2026-01-01';
if (validarData(candidato)) adicionarDias(candidato, 2);
const ordem: -1 | 0 | 1 = compararDatas('2026-01-01', '2026-01-02');
dataNoFuso(0, 'UTC');
// @ts-expect-error timezone is required
dataNoFuso(0);
// @ts-expect-error civil date is text
adicionarDias(1, 2);
void ordem;
