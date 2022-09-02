import { AddLink } from './AddLInk';
import { LinkList } from './LinkList';
import { Link } from '../types/Link'
import { Pagination } from './Pagination';

interface Props {
  handleSqueeze: (link: string) => void,
  items: Link[]
}

const Main: React.FC<Props> = ({ handleSqueeze, items }) => {
  return (
    <div className='main'>
      <AddLink handleSqueeze={handleSqueeze} />
      <LinkList items={items} />
      <Pagination />
    </div>
  )
}

export { Main };

