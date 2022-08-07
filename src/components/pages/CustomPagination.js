import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function CustomPagination({ fn1, total_pages }) {
  const [PgNo, setPgNo] = useState(1);
  //   PgNo= page_number
  //   currPgNo = current_page_number
  return (
    <div className="CustomPagination">
      <ul>
        {PgNo > 2 ? (
          <li
            onClick={() => {
              let temp = 1;
               setPgNo(temp); fn1(temp); window.scroll(0, 0);
               return;
            }}
          >
            first page
          </li>
        ) : (
          ""
        )}
        {PgNo > 1 ? (
          <li
            onClick={() => {
              let temp = PgNo - 1;
              setPgNo(temp); fn1(temp); window.scroll(0, 0);
              
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </li>
        ) : (
          ""
        )}
        <li
          onClick={() => {
             fn1(PgNo);window.scroll(0, 0);
          }}
        >
          {PgNo}
        </li>
        {PgNo < total_pages ? (
          <li
            onClick={() => {
              let temp = PgNo + 1;
              setPgNo(temp);
              fn1(temp);
              window.scroll(0, 0);
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </li>
        ) : (
          ""
        )}

        {PgNo < total_pages-1 ? (
          <li
            onClick={() => {
              let temp = total_pages;
               setPgNo(temp);fn1(temp); window.scroll(0, 0);
            }}
          >
            last Page
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}
