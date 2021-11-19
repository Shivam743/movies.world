import axios from "axios";
import React, { useEffect } from "react";

export default function Genres(props) {
  console.log('props',props)
  const HandlAdd = (val, idx) => {
    console.log('SelectedGenres',props.SelectedGenres)
    props.setSelectedGenres([...props.SelectedGenres, val]);
    props.setPage(1);
    let temp = [...props.Genres];
    temp.splice(idx, 1);
    // console.log("temp", temp);
    // console.log(props.SelectedGenres);
    props.setGenres(temp);
  };

  const HendleRemove = (val, idx) => {
    props.setPage(1);
    let temp = [...props.SelectedGenres];
    const deletedval=temp.splice(idx, 1);
    console.log('deletedval',deletedval)
    console.log("Genres", props.Genres)
    console.log("temp", temp);
    props.setSelectedGenres(temp);
    props.setGenres(prev=>[...deletedval,...prev]);
  };

  const fetchGenres = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${props.type}/list?api_key=c75430675bfaac5554a02c34599115cc&language=en-US`
      );
      console.log(data);
      props.setGenres(data.genres);
    } catch (error) {
      console.log("error found");
    }
  };

  useEffect(() => {
    fetchGenres();
    return props.setGenres([]);
  }, []);
  return (
    <div className="chipOfGenres">
      <ul>
        {props?.SelectedGenres?.map((val, idx) => {
          console.log('val.id',val.id)
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
