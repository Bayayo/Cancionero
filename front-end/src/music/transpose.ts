export type Note =
  | 'C' | 'C#' | 'Db'
  | 'D' | 'D#' | 'Eb'
  | 'E'
  | 'F' | 'F#' | 'Gb'
  | 'G' | 'G#' | 'Ab'
  | 'A' | 'A#' | 'Bb'
  | 'B';

export interface TransposeOptions {
  steps: number; // +1, -2, etc.
}

const NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTES_FLAT  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function splitChord(chord: string) {
  const match = chord.match(/^([A-G])([#b]?)(.*)$/);
  if (!match) return null;

  return {
    root: match[1] + (match[2] || ''),
    suffix: match[3] || ''
  };
}

export function transposeChord(chord: string, steps: number): string {
  const parsed = splitChord(chord);
  if (!parsed) return chord;

  const scale = parsed.root.includes('b') ? NOTES_FLAT : NOTES_SHARP;
  const index = scale.indexOf(parsed.root);
  if (index === -1) return chord;

  const newIndex = (index + steps + 12) % 12;
  return scale[newIndex] + parsed.suffix;
}
