import React from "react";

const DownArrow = ({
//   style = "",
  fill = "#1E201D",
  width = "100%",
  className = "bla",
  viewBox = "0 0 31.479 31.479",
  onClick = {}, 
  stroke = {}
}) => (
  <svg
    width={width}
    // style={style}
    height={width}
    viewBox={viewBox}
    onClick = {onClick}
    stroke={stroke}
    stroke-linecap="butt"
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill={fill}
      d="M26.485,21.206c0.429-0.444,0.429-1.143,0-1.587c-0.444-0.429-1.159-0.429-1.587,0l-8.047,8.047
      V1.111C16.851,0.492,16.359,0,15.74,0c-0.619,0-1.127,0.492-1.127,1.111v26.555l-8.031-8.047c-0.444-0.429-1.143-0.429-1.587,0
      c-0.429,0.444-0.429,1.143,0,1.587l9.952,9.952c0.429,0.429,1.143,0.429,1.587,0L26.485,21.206z"
    />
  </svg>
);

export default DownArrow;
