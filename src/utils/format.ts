export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    notation: num > 999999 ? 'compact' : 'standard'
  }).format(num);
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
}