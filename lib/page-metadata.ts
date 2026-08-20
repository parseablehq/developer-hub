const MAX_DESCRIPTION_LENGTH = 160;

function finishSentence(value: string): string {
  return /[.!?]$/.test(value) ? value : `${value}.`;
}

function truncateAtWord(value: string): string {
  if (value.length <= MAX_DESCRIPTION_LENGTH) return value;

  const shortened = value.slice(0, MAX_DESCRIPTION_LENGTH - 1);
  const lastSpace = shortened.lastIndexOf(' ');
  return `${shortened.slice(0, lastSpace)}…`;
}

export function getPageDescription(
  title: string,
  description?: string,
): string {
  const current = description?.replace(/\s+/g, ' ').trim();

  if (current) {
    return truncateAtWord(current);
  }

  const context = `Learn about ${title} in Parseable, including core concepts, configuration steps, and practical guidance for building an effective observability workflow.`;

  return truncateAtWord(context);
}
