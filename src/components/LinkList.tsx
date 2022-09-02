import { Link } from '../types/Link';
import { SHORT_URL } from '../utils/constants';

interface Props {
  items: Link[],
}

const LinkList: React.FC<Props> = ({ items }) => {

  return (
    <table>
    <thead>
      <tr>
          <th>Short Link</th>
          <th>Long Link</th>
          <th>Transition</th>
      </tr>
    </thead>

    <tbody>
      {
        items.map(item => {return (
          <tr key={item.id}>
            <td onClick={() =>  navigator.clipboard.writeText(`${SHORT_URL}${item.short}`)}>{`${SHORT_URL}${item.short}`}</td>
            <td>{item.target}</td>
            <td>{item.counter}</td>
          </tr>
        )
        })
      }
    </tbody>
  </table>
  )
}

export { LinkList };
