import React from "react";

const Pagination = ({ page, pages, onClick, prevHandler, nextHandler }) => {
  return (
    <div>
      <ul className="pages-container">
        <li className="page-item" onClick={prevHandler}>
          Prev
        </li>

        {[...Array(Math.ceil(pages)).keys()].map((x, i) => {
          return (
            <li
              key={i}
              className={page - 1 === i ? "active page-item" : "page-item"}
              onClick={(e) => onClick(e.target.innerText)}
            >
              {x + 1}
            </li>
          );
        })}

        <li className="page-item" onClick={nextHandler}>
          Next
        </li>
      </ul>
    </div>
  );
};

export default Pagination;