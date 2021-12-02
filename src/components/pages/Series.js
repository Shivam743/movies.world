import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import Geners from "../geners/Genrs";
import UseGenres from "../useGenres/useGenres";
import CustomPagination from "./CustomPagination";

export default function Series() {
  const [Page, setPage] = useState(1);
  const [Content, setContent] = useState([]);
  const [TotalPage, setTotalPage] = useState(1);
  const [Genres, setGenres] = useState([]);
  const [SelectedGenres, setSelectedGenres] = useState([]);
  const GenreForUrl = UseGenres(SelectedGenres);

  const fatchMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=c75430675bfaac5554a02c34599115cc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${Page}&with_genres=${GenreForUrl}`
      );

      setContent(data.results);
      setTotalPage(data.total_pages);
    } catch (error) {
      console.log("page not found");
    }
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) fatchMovies();
    return () => {
      isMounted = false;
    };
  }, 
  // eslint-disable-next-line 
  [Page, GenreForUrl]);
  return (
    <>
      <h2 className="pageTittle">series</h2>
      <Geners
        type="movie"
        Genres={Genres}
        setGenres={(value) => setGenres(value)}
        setPage={setPage}
        SelectedGenres={SelectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <div className="trending">
        {Content?.map((c, index) => (
          <Card
            key={index}
            id={c.id}
            tittle={c.original_title || c.name}
            poster_path={c.poster_path}
            original_language={c.original_language}
            media_type="tv"
            release_date={c.release_date || c.first_air_date}
            rating={c.vote_average || ".."}
            vote_count={c.vote_count}
          />
        ))}
      </div>
      <CustomPagination fn1={setPage} total_pages={TotalPage} />
    </>
  );
}
