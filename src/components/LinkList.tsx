import { Link } from '../types/Link';
import { SHORT_URL } from '../utils/constants';
import ReactTooltip from 'react-tooltip';

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
            <th className='center'>Transition</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map(item => {
              return (
                <tr key={item.id}>
                  <td className="td-s" onClick={() => navigator.clipboard.writeText(`${SHORT_URL}${item.short}`)}>{`${SHORT_URL}${item.short}`}</td>
                  <td className='td-l'>{item.target}</td>
                  <td className='td-c center'>{item.counter}</td>
                </tr>

              )
            })
          }
        </tbody>
      </table>



  )
}

export { LinkList };
