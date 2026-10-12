import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validarData, compararDatas, diferencaDias, adicionarDias, formatarDataBR, dataNoFuso } from '../src/index.js';
test('validates leap centuries and strict dates', () => {
  for (const data of ['2000-02-29', '2024-02-29', '0001-01-01', '9999-12-31']) assert.equal(validarData(data), true);
  for (const data of ['1900-02-29', '2026-02-29', '2026-04-31', '0000-01-01', '2026-1-01', '2026-01-01T00:00:00Z', null, '2026-00-10']) assert.equal(validarData(data), false);
});
test('calendar arithmetic is reversible and ignores DST', () => {
  assert.equal(diferencaDias('2024-03-09', '2024-03-11'), 2);
  assert.equal(diferencaDias('2024-03-11', '2024-03-09'), -2);
  assert.equal(adicionarDias('2024-02-28', 1), '2024-02-29');
  assert.equal(adicionarDias('0001-01-01', 365), '0002-01-01');
  for (let offset = -400; offset <= 400; offset++) assert.equal(diferencaDias('2024-06-01', adicionarDias('2024-06-01', offset)), offset);
});
test('rejects out-of-range results and invalid operands', () => {
  for (const [data, dias] of [['0001-01-01', -1], ['9999-12-31', 1], ['2026-01-01', 0.5], ['2026-01-01', Number.MAX_SAFE_INTEGER]]) assert.throws(() => adicionarDias(data, dias), RangeError);
  assert.throws(() => compararDatas('x', '2026-01-01'), RangeError);
  assert.equal(compararDatas('2026-01-01', '2026-01-02'), -1);
  assert.equal(formatarDataBR('0001-01-02'), '02/01/0001');
});
test('explicit timezone preserves the local day at UTC rollover', () => {
  const instante = Date.parse('2026-01-02T01:00:00Z');
  assert.equal(dataNoFuso(instante, 'America/Sao_Paulo'), '2026-01-01');
  assert.equal(dataNoFuso(instante, 'UTC'), '2026-01-02');
  assert.throws(() => dataNoFuso(instante), TypeError);
  assert.throws(() => dataNoFuso(NaN, 'UTC'), RangeError);
  assert.throws(() => dataNoFuso(instante, 'Invalid/Timezone'), RangeError);
  assert.throws(() => dataNoFuso(Date.parse('0000-01-01T00:00:00Z'), 'UTC'), RangeError);
});
