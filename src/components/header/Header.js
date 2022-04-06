import React from "react";
import "./header.css";

export default function header() {
  return (
    <div>
      <header className="header">
        <h1 onClick={() => window.scroll(0, 0)}>Movies world</h1>
      </header>
    </div>
  );
}
