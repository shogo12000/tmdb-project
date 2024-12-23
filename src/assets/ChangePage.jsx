import "./ChangePage.css";

const ChangePage = ({ page, setPage, totalPages, setLoading}) => {
  const handlePageChange = (direction) => {
    setLoading(true);
    if (direction === 1 && page < totalPages) {
      setPage(page + 1);
    } else if (direction === -1 && page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <nav className="pages" aria-label="Page navigation">
      <button 
        onClick={() => handlePageChange(-1)} 
        disabled={page === 1}
        aria-label="Go to previous page"
      >
        Back
      </button>
      <span className="page"aria-current="page">{page}</span>
      <button 
        onClick={() => handlePageChange(1)} 
        disabled={page === totalPages}
        aria-label="Go to next page"
      >
        Next 
      </button>
    </nav>
  );
};

export default ChangePage;
