import axios from "axios";
import React, { useEffect } from "react";

export default function Genres(props) {
  const HandlAdd = (val, idx) => {
    props.setSelectedGenres([...props.SelectedGenres, val]);
    props.setPage(1);
    let temp = [...props.Genres];
    let check = temp.splice(idx, 1);
    if (check) props.setGenres(temp);
  };

  const HendleRemove = (val, idx) => {
    props.setPage(1);
    let temp = [...props.SelectedGenres];
    const deletedval = temp.splice(idx, 1);
    if (deletedval) {
      props.setSelectedGenres(temp);
      props.setGenres((prev) => [...deletedval, ...prev]);
    }
  };

  const fetchGenres = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${props.type}/list?api_key=c75430675bfaac5554a02c34599115cc&language=en-US`
      );
      props.setGenres(data.genres);
    } catch (error) {
      console.log("error found");
    }
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchGenres();
    }
    return () => {
      isMounted = false;
    };
  },
  // eslint-disable-next-line 
  []);
  return (
    <div className="chipOfGenres">
      <ul>
        {props?.SelectedGenres?.map((val, idx) => {
          return (
            <li
              key={val.id}
              onClick={() => HendleRemove(val, idx)}
              style={{
                color: "#1b1b1b",
                backgroundColor: "white",
                boxShadow: "0px 0px 1px 1px rgb(2, 0, 0)",
                fontWeight: "900",
                textShadow: "0px 0px 1px #2e2e2e",
              }}
            >
              {val.name}
            </li>
          );
        })}
        {props?.Genres?.map((val, idx) => {
          return (
            <li key={val.id} onClick={() => HandlAdd(val, idx)}>
              {val.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
