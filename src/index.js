/** Gregorian civil dates, years 0001–9999. No implicit timezone conversion. */
export function validarData(data) {
  if (typeof data !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data)) return false;
  const [ano, mes, dia] = data.split('-').map(Number);
  const bissexto = ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0);
  const dias = [31, bissexto ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return ano >= 1 && mes >= 1 && mes <= 12 && dia >= 1 && dia <= dias[mes - 1];
}
function exigir(data) {
  if (!validarData(data)) throw new RangeError('Expected a valid YYYY-MM-DD date');
  return data;
}
function instante(data) {
  return Date.parse(`${exigir(data)}T00:00:00.000Z`);
}
export function compararDatas(a, b) {
  exigir(a); exigir(b);
  return a === b ? 0 : a < b ? -1 : 1;
}
/** Signed count of calendar days from inicio to fim. */
export function diferencaDias(inicio, fim) {
  return (instante(fim) - instante(inicio)) / 86400000;
}
export function adicionarDias(data, dias) {
  if (!Number.isSafeInteger(dias)) throw new RangeError('Expected an integer day offset');
  const valor = instante(data) + dias * 86400000;
  if (!Number.isFinite(valor) || valor < instante('0001-01-01') || valor > instante('9999-12-31')) {
    throw new RangeError('Date outside supported range');
  }
  return new Date(valor).toISOString().slice(0, 10);
}
export function formatarDataBR(data) {
  exigir(data);
  return `${data.slice(8, 10)}/${data.slice(5, 7)}/${data.slice(0, 4)}`;
}
/** Convert an instant to a civil date using an explicit IANA timezone. */
export function dataNoFuso(instanteMs, fuso) {
  if (typeof instanteMs !== 'number' || !Number.isFinite(instanteMs) || !Number.isFinite(new Date(instanteMs).getTime())) {
    throw new RangeError('Expected a valid epoch timestamp in milliseconds');
  }
  if (typeof fuso !== 'string' || !fuso.trim()) throw new TypeError('An explicit timezone is required');
  const partes = new Intl.DateTimeFormat('en-US-u-ca-gregory-nu-latn', {
    timeZone: fuso, year: 'numeric', month: '2-digit', day: '2-digit', era: 'short'
  }).formatToParts(instanteMs);
  const campos = Object.fromEntries(partes.map(p => [p.type, p.value]));
  if (campos.era !== 'AD') throw new RangeError('Date outside supported range');
  return exigir(`${campos.year.padStart(4, '0')}-${campos.month}-${campos.day}`);
}
