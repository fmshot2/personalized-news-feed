
export default function dateFormatter (timestamp: string)  {
    if (!timestamp) return 'Published date unknown';
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      // minute: 'numeric',
      hour12: true,
    });
}
  