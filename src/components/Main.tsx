import { AddLink } from './AddLInk';
import { LinkList } from './LinkList';
import { Link } from '../types/Link'
import { Pagination } from './Pagination';

interface Props {
  handleSqueeze: (link: string) => void;
  items: Link[];
  pages: number;
  handleChangePage: (page: number) => void;
  currentPage: number;
}

const Main: React.FC<Props> = ({ handleSqueeze, items, pages, handleChangePage, currentPage }) => {
  return (
    <div className='main'>
      <AddLink handleSqueeze={handleSqueeze} />
      <LinkList items={items} />
      <Pagination pages={pages} handleChangePage={handleChangePage} currentPage={currentPage} />
    </div>
  )
}

export { Main };

