import type { Song } from '../types/song';
import '../assets/cancionero.css';

export function SongViewer({ song }: { song: Song }) {
  return (
    <div className="song">
      <h1>{song.title}</h1>
      <h4>{song.author}</h4>

      {song.lines.map((line, i) => (
        <div key={i} className="line">
          {line.segments.map((seg, j) => (
            <span key={j} className="segment">
              {seg.chord && <span className="chord">{seg.chord}</span>}
              <span className="lyric">{seg.text}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
