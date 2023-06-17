import React from 'react';
const Paginate = ({
  postsPerPage,
  totalPosts,
  paginate,
  previousPage,
  nextPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container p-20 flex justify-between">
      <div className="pagination flex gap-4 justify-between align-middle content-center self-center items-center">
        <button
          onClick={previousPage}
          className="page-number border-2 p-2 shadow-md rounded-sm px-10"
        >
          Prev
        </button>

        <button
          onClick={nextPage}
          className="page-number border-2 p-2 shadow-md rounded-sm px-10"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Paginate;
