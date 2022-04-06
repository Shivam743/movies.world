import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import CustomPagination from "./CustomPagination";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [TotalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(0);
  const [type, setType] = useState("select type");
  const [Content, setContent] = useState([]);

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type}?api_key=c75430675bfaac5554a02c34599115cc&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

      setTotalPage(data.total_pages);
      setContent(data.results);
    } catch (error) {
      console.log("ERR found", error);
    }
  };
  useEffect(
    () => {
      let isMounted = true;
      if (isMounted && searchText && page && type) {
        fetchSearch();
      }
      return () => {
        isMounted = false;
      };
    },
    // eslint-disable-next-line
    [page, type, searchText]
  );
  return (
    <>
      <select
        name="type"
        onChange={(e) => {
          setType(e.target.value);
        }}
        style={{
          boxSizing: "border-box",
          width: "90%",
          margin: "1vh 5% 3vh",
          textAlign: "center",
          textTransform: "uppercase",
          height: "30px",
        }}
        required
      >
        {type === "select type" ? (
          <option value="select type">select type</option>
        ) : (
          ""
        )}
        <option value="movie">movie</option>
        <option value="tv">tv show</option>
      </select>
      <div
        style={{
          display: "flex",
          //  height: "3rem"
        }}
      >
        <input
          type="text"
          name="Search"
          placeholder="(text area) search by name ex:-Shang-Chi And The Legend Of The Ten Rings  "
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ flex: "10", margin: "0px 2vw 0px 4vw", borderRadius: "5px" }}
        />
        <button
          onClick={() =>
            type !== "select type" ? setPage(1) : alert("select type")
          }
          style={{
            fontSize: "2rem",
            margin: "0px 3vw 0px 1vw",
            color: "black",
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
            // height: "3rem",
            flex: "1",
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <p
        style={{
          wordSpacing: "5px",
          textTransform: "capitalize",
          margin: "5%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <strong> Note: </strong>
        <i> step-1 SELECT TYPE first movie / tv shows</i>
        <i>step-2 write what you are locking for in text area</i>
      </p>
      <div className="trending">
        {searchText &&
          Content?.map((c, index) => (
            <Card
              key={index}
              id={c.id}
              tittle={c.original_title || c.name}
              poster_path={c.poster_path}
              original_language={c.original_language}
              media_type={type}
              release_date={c.release_date || c.first_air_date}
              rating={c.vote_average || ".."}
              vote_count={c.vote_count}
            />
          ))}
        {Content && TotalPage ? (
          ""
        ) : (
          <h2>
            {" "}
            {type} {type === "movie" ? "" : "show"} not found
          </h2>
        )}
      </div>
      {searchText && type && TotalPage && page ? (
        <CustomPagination fn1={setPage} total_pages={TotalPage} />
      ) : (
        ""
      )}
    </>
  );
}
