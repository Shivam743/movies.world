import React, { useEffect, useState } from "react";
import "./MainNavbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faSearch,
  faTv,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

export default function MainNavbar() {
  const [Value, setValue] = useState(0);
  const history = useHistory();
  useEffect(() => {
    if (Value === 0) history.push("/");
  }, [Value, history]);
  return (
    <div className="navbar">
      <ul>
        <li className="navlinks">
          <FontAwesomeIcon
            onClick={() => {
              setValue(0);
              history.push("/");
            }}
            style={{ fontSize: "2rem" }}
            icon={faFire}
          />
          <h6>Trending</h6>
        </li>
        <li className="navlinks">
          <FontAwesomeIcon
            onClick={() => {
              setValue(1);
              history.push("/movies");
            }}
            style={{ fontSize: "2rem" }}
            icon={faVideo}
          />
          <h6>movies</h6>
        </li>
        <li className="navlinks">
          <FontAwesomeIcon
            onClick={() => {
              setValue(2);
              history.push("/series");
            }}
            style={{ fontSize: "2rem" }}
            icon={faTv}
          />
          <h6>tv shows</h6>
        </li>
        <li className="navlinks">
          <FontAwesomeIcon
            onClick={() => {
              setValue(3);
              history.push("/search");
            }}
            style={{ fontSize: "2rem" }}
            icon={faSearch}
          />
          <h6>search</h6>
        </li>
      </ul>
    </div>
  );
}
