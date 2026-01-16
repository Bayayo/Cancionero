import { useEffect, useState } from 'react';
import { parseSong } from './parser/parser'
import type { Song } from './types/song';
import { SongViewer } from './components/SongViewer';
import html2pdf from "html2pdf.js";



export default function App() {
  const [song, setSong] = useState<Song | null>(null);

  useEffect(() => {
    fetch('../canciones/Versos_Sueltos.md')
      .then(res => res.text())
      .then(text => setSong(parseSong(text)));
  }, []);

  const exportToPDF = () => {
    const element = document.getElementById('song-pdf');
    if (!element) return;

      html2pdf()
  .set({
      margin: [15, 15, 20, 15],
      filename: `${song?.title || 'cancion'}.pdf`,
      html2canvas: {
        scale: 2,
        letterRendering: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    })
    .from(element)
    .save();
    };

  if (!song) return <p>Cargando canción…</p>;

  return (
    <div style={{ padding: 20 }}>
      <button onClick={exportToPDF}>
        Exportar a PDF
      </button>

      <div id="song-pdf">
        <SongViewer song={song} />
      </div>
    </div>
  );
}
