const UseGenres = (SelectedGenres) => {
  if (SelectedGenres.length < 1) return "";
 
  const GenresId = SelectedGenres.map((c) => c.id);
  return GenresId.reduce((acc, curr) => acc + "," + curr);
};
export default UseGenres;
