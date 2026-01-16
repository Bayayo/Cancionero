function parseCancion(archivo) {

  const filas = archivo
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  const cancion = {
    titulo: '',
    autor: '',
    blocks: []
  };

  let i = 0;

  // Titulo
  if (filas[i].startsWith('# ')) {
    cancion.titulo = filas[i].replace('# ', '').trim();
    i++;
  }

  // Autor
  if (filas[i] && filas[i].startsWith('_') && filas[i].endsWith('_')) {
    cancion.autor = filas[i].replace(/_/g, '').trim();
    i++;
  }

  // Acordes + letra
  while (i < filas.length) {
    const acordeLetra = filas[i];
    const letraLinea = filas[i + 1];

    if (!acordeLetra || !letraLinea) break;

    if (acordeLetra.startsWith('[') && acordeLetra.endsWith(']')) {
      const acordes = acordeLetra
        .replace('[', '')
        .replace(']', '')
        .split(' ')
        .map(c => c.trim())
        .filter(Boolean);

      cancion.blocks.push({
        acordes,
        letra: letraLinea
      });

      i += 2;
    } else {
      i++;
    }
  }

  return cancion;
}

module.exports = { parsecancion };
