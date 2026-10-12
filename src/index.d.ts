/** Strict Gregorian civil dates, years 0001–9999. */
export function validarData(data: unknown): data is string;
/** Returns -1, 0 or 1; throws RangeError for invalid dates. */
export function compararDatas(a: string, b: string): -1 | 0 | 1;
/** Signed calendar day difference, fim minus inicio. */
export function diferencaDias(inicio: string, fim: string): number;
/** Integer calendar days; result must remain in years 0001–9999. */
export function adicionarDias(data: string, dias: number): string;
export function formatarDataBR(data: string): string;
/** Epoch milliseconds plus an explicit IANA timezone. */
export function dataNoFuso(instanteMs: number, fuso: string): string;
