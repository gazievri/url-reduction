import { range } from '../utils/arrForPagination';

interface Props {
  pages: number;
  handleChangePage: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<Props> = ({ pages, handleChangePage, currentPage }) => {
  let pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }

  // let pagesArray = range(currentPage, pages);

  const handleClickPreviousePage = () => {
    handleChangePage(currentPage !== 1 ? currentPage - 1 : currentPage);
  }

  const handleClickNextPage = () => {
    handleChangePage(currentPage !== pages ? currentPage + 1 : pages);
  }

  return (

    <>
    {
      pages === 0 ? '' :


      <ul className="pagination">
        <li className={currentPage === 1 ? "disabled" : "waves-effect"}><a href="#!"><i className="material-icons" onClick={handleClickPreviousePage}>chevron_left</i></a></li>
        {
          pagesArray.map(pageNum => (<li key={pageNum} className={`${(pageNum === currentPage) ? "active" : "waves-effect"}`} ><a href="#!" onClick={() => handleChangePage(pageNum)}>{pageNum}</a></li>))
        }
        <li className={currentPage === pages ? "disabled" : "waves-effect"}><a href="#!"><i className="material-icons" onClick={handleClickNextPage}>chevron_right</i></a></li>
      </ul>
}
    </>
  )
}

export { Pagination };
