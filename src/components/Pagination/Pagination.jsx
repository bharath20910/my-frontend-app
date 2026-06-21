import './Pagination.css';

function Pagination({ currentPage, totalEntries, rowsPerPage, onPageChange }) {
  if (!totalEntries) {
    return null;
  }

  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const startEntry = (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, totalEntries);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      <p className="pagination__count">
        Showing {startEntry}–{endEntry} of {totalEntries} entries
      </p>

      <div className="pagination__actions" aria-label="Pagination">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            className={page === currentPage ? 'pagination__page--active' : ''}
            key={page}
            type="button"
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
