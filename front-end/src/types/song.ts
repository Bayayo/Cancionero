export interface LyricSegment {
  text: string;
  chord: string | null;
}

export interface SongLine {
  segments: LyricSegment[];
}

export interface Song {
  title: string;
  author: string;
  lines: SongLine[];
}
