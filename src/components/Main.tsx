import { AddLink } from './AddLInk';
import { LinkList } from './LinkList';
import { Link } from '../types/Link'

interface Props {
  handleSqueeze: (link: string) => void,
  items: Link[]

}

const Main: React.FC<Props> = ({ handleSqueeze, items }) => {
  return(
    <div className='main'>
      <AddLink handleSqueeze={handleSqueeze} />
      <LinkList items={items} />
    </div>
  )
}

export { Main };

