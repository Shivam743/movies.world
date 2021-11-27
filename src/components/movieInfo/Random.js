import { faTv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";
import "./random.css";

export default function Random() {
  const query = new URLSearchParams(window.location.search);
  const id = query.get("id");
  const media_type = query.get("mediaType");
  const [Content, setContent] = useState([]);
  const [video, setVideo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=c75430675bfaac5554a02c34599115cc&language=en-US`
        );
  
        setContent(data);
      } catch (error) {
        console.log("error found", error);
      }
    };
    const fetchvideo = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=c75430675bfaac5554a02c34599115cc&language=en-US`
        );
        setVideo(data?.results[0]?.key);
      } catch (error) {
        console.log("error found", error);
      }
    };
    fetchvideo();
    fetchData();
  }, [id,media_type]);

  const year = Content.release_date || Content.first_air_date;

  return (
    <div className="mainCard_syle">
      <div className="poster_info_page">
        <img
          src={
            Content.poster_path
              ? `https://image.tmdb.org/t/p/w300${Content.poster_path}`
              : "https://www.movienewz.com/wp-content/uploads/2014/07/poster-holder.jpg"
          }
          alt="Poster not found"
        />
      </div>
      <div className="movieDeatails">
        <ul className="ul">
          <li
            className="list"
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            <span className="movieName">
              {Content.title || Content.name}({year?.slice(0, 4)})
            </span>
          </li>
          <li className="list">
            <p>
              {Content.runtime}
              {Content.runtime ? "min|" : "|"}
              {Content?.genres?.map((obj, idx) => (
                <span key={idx}>
                  {idx < Content?.genres.length - 1 ? obj.name + "," : obj.name}
                </span>
              ))}
              |{Content.release_date || Content.first_air_date}
            </p>
          </li>
          <li className="list">
            {" "}
            <p>{Content.overview}</p>
          </li>
          <li className="list">
            languages:{" "}
            {Content?.spoken_languages?.map((c, idx) => (
              <span key={idx}>{idx > 0 ? " & " + c.name : c.name}</span>
            ))}
          </li>
          {media_type === "tv" ? (
            <>
              {" "}
              <li className="list">Season : {Content?.seasons?.length}</li>
              <li className="list">
                Total Episode :{" "}
                {Content?.seasons?.reduce(
                  (previousValue, currentValue) =>
                    previousValue + currentValue?.episode_count,
                  0
                )}
              </li>
            </>
          ) : (
            ""
          )}
          <li className="list">Raiting : {Content.vote_average}</li>
          <li className="list">Vote Count : {Content.vote_count}</li>

          <li className="list">
            <Carousel media_type={media_type} id={id} />
          </li>

          <li className="list" style={{ textAlign: "center" }}>
            <a href={Content.homepage}>offical page</a>
          </li>
          <br />
          <li
            className="list"
            style={{ textAlign: "center ", marginBottom: "30px" }}
          >
            <a
              href={`https://www.youtube.com/watch?v=${video}`}
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              <FontAwesomeIcon icon={faTv} /> watch trailer
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
