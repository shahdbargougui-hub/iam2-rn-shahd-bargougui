// 12.5 becomes "12,500 DT": three decimals, because one dinar is 1000 millimes.
export function formatAmount(amount: number): string {
  return `${amount.toFixed(3).replace('.', ',')} DT`;
}

// A timestamp in milliseconds becomes "09/10/2026".
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
}