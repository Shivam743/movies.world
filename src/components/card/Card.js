import React from "react";
import { useHistory } from "react-router";
import "./card.css";

export default function Card(props) {
  const history=useHistory();
  function clickHandler(){
    const mediaType=props.media_type;
    const id=props.id;
    history.push(`/random?mediaType=${mediaType}&id=${id}`)
  }
  return (
    <div className="card" onClick={clickHandler}>
      <span className={props.rating>=6?"badge":"badge-1"}>{props.rating}</span>
      <img
        className="poster"
        src={props.poster_path?`https://image.tmdb.org/t/p/w300${props.poster_path}`:"https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg"}
        alt="Poster not found"
      />
      <div className="subtittle">
        <h4>{props.tittle}</h4>
        <ul>
          <li>
            <h5>{props.media_type==="movie"?props.media_type:`${props.media_type} show`}</h5>
          </li>
          <li>
            <h5>{props.release_date?props.release_date:"........."}</h5>
          </li>
        </ul>
      </div>
    </div>
  );
}
