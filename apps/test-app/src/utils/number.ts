export function formatNumber(
  value: number,
  opts?: Intl.NumberFormatOptions,
): string {
  if (value === null || value === undefined) return ''

  // “de-DE” uses a period as the thousands separator and a comma as the decimal separator
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    ...opts,
  }).format(value)
}

/* ------- examples ------- */
formatNumber(100000) // "100.000"
formatNumber(1234567.89) // "1.234.567,89"
formatNumber(987654321, {
  // custom decimals if you wish
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
