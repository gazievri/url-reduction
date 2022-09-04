interface Props {
  pages: number;
  handleChangePage: (page: number) => void;
  currentPage: number;
}

enum SortStatus {
  UNSORTED = 'unsorted',
  SORTED_TO_DOWN = 'sorted_to_down',
  SORTED_TO_UP = 'sorted_to_up'
}

const Pagination: React.FC<Props> = ({ pages, handleChangePage, currentPage }) => {
  let pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }

  const handleClickPreviousePage = () => {
    handleChangePage(currentPage !== 1 ? currentPage - 1 : currentPage);
  }

  const handleClickNextPage = () => {
    handleChangePage(currentPage !== pagesArray.length ? currentPage + 1 : pagesArray.length);
  }

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? "disabled" : "waves-effect"}><a href="#!"><i className="material-icons" onClick={handleClickPreviousePage}>chevron_left</i></a></li>
      {
        pagesArray.map(pageNum => (<li key={pageNum} className={`${(pageNum === currentPage) ? "active" : "waves-effect"}`} ><a href="#!" onClick={() => handleChangePage(pageNum)}>{pageNum}</a></li>))
      }
      <li className={currentPage === pagesArray.length ? "disabled" : "waves-effect"}><a href="#!"><i className="material-icons" onClick={handleClickNextPage}>chevron_right</i></a></li>
    </ul>
  )
}

export { Pagination };
