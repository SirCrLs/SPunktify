
function applyReverse(arr, reverse) {
  return reverse ? arr.slice().reverse() : arr;
}

//  Ordenar por título
export function sortByTitle(songs, reverse = false) {
  const ordered = [...songs].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  return applyReverse(ordered, reverse);
}

//  Ordenar por artista
export function sortByArtist(songs, reverse = false) {
  const ordered = [...songs].sort((a, b) =>
    a.artistName.localeCompare(b.artistName)
  );
  return applyReverse(ordered, reverse);
}


