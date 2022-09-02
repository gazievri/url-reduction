import { Link } from '../types/Link';

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
            <td>{`http://79.143.31.216/s/${item.short}`}</td>
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
