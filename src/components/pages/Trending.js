import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../card/Card";
import CustomPagination from "./CustomPagination";

export default function Trending() {
  const [Page, setPage] = useState(1);
  const [Content, setContent] = useState([]);
  const [TotalPage, setTotalPage] = useState(1);

  const fatchTrending = async () => {
    // eslint-disable-next-line
    try {
      const { data } = await axios.get(`
          https://api.themoviedb.org/3/trending/all/week?api_key=c75430675bfaac5554a02c34599115cc&page=${Page}`);
      setContent(data.results);
      setTotalPage(data.total_pages);
    } catch (error) {
      console.log("page not found", error);
    }
  };
  useEffect(() => {
    let isMounted = true;

    if (isMounted) fatchTrending();
    return () => {
      isMounted = false;
    };
  },
  // eslint-disable-next-line 
  [Page]);
  return (
    <>
      <h2 className="pageTittle"> trending</h2>
      <div className="trending">
        {Content?.map((c, index) => (
          <Card
            key={index}
            id={c.id}
            media_type={c.media_type}
            tittle={c.original_title || c.name}
            poster_path={c.poster_path}
            original_language={c.original_language}
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
