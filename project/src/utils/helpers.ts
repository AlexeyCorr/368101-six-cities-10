export function getRatingInPercent (rating: number): string {
  return `${rating * 100 / 5}%`;
}
