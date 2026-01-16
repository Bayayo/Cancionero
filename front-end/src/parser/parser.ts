import type { Song, SongLine, LyricSegment } from '../types/song';

const CHORD_REGEX = /\[([A-G][#b]?(?:m|maj|min|dim|aug|sus|add)?\d*)\]/g;

export function parseSong(markdown: string): Song {
  const lines = markdown.split('\n');

  const song: Song = {
    title: '',
    author: '',
    lines: []
  };

  let contentStarted = false;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (!song.title && line.startsWith('# ')) {
      song.title = line.replace('# ', '').trim();
      continue;
    }

    if (!song.author && line.startsWith('#### ')) {
      song.author = line.replace('#### ', '').trim();
      continue;
    }

    if (line.trim() === '') continue;

    contentStarted = true;

    const segments: LyricSegment[] = [];
    let lastIndex = 0;
    let match;

    while ((match = CHORD_REGEX.exec(line)) !== null) {
      const chord = match[1];
      const index = match.index;

      if (index > lastIndex) {
        segments.push({
          text: line.slice(lastIndex, index),
          chord: null
        });
      }

      segments.push({
        text: '',
        chord
      });

      lastIndex = index + match[0].length;
    }

    if (lastIndex < line.length) {
      segments.push({
        text: line.slice(lastIndex),
        chord: null
      });
    }

    song.lines.push({ segments });
  }

  return song;
}
