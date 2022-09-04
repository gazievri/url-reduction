import { useState, useMemo } from 'react';
import { Link } from '../types/Link';
import { SHORT_URL } from '../utils/constants';

interface Props {
  items: Link[],
}

interface SetConfig {
  key: string;
  direction: string;
}

const LinkList: React.FC<Props> = ({ items }) => {
  const [sortedConfig, setSortedConfig] = useState<SetConfig | null>(null);

  let sortedProducts = [...items];

  if (sortedConfig !== null) {
    sortedProducts.sort((a, b) => {
      if (a[sortedConfig.key as keyof Link] < b[sortedConfig.key as keyof Link]) {
        return sortedConfig.direction === 'ascending' ? 1 : -1;
      }
      if (a[sortedConfig.key as keyof Link] > b[sortedConfig.key as keyof Link]) {
        return sortedConfig.direction === 'ascending' ? -1 : 1;
      }
      return 0;
    });
  }

  const requestSort = (key: string) => {
    let direction = 'ascending';
    setSortedConfig({ key, direction });
    // @ts-ignore: Object is possibly 'null'.
    if (sortedConfig.key === key && sortedConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortedConfig({ key, direction });
  }




  return (
    <table className='striped'>
      <thead>
        <tr>
          <th><button className='table-button' onClick={() => requestSort('short')}>Short Link</button></th>
          <th><button className='table-button' onClick={() => requestSort('target')}>Long Link</button></th>
          <th className='center'><button className='table-button' onClick={() => requestSort('counter')}>Transition</button></th>
        </tr>
      </thead>
      <tbody>
        {
          sortedProducts.map(item => {
            return (
              <tr key={item.id}>
                <td className="td-s"
                  onClick={() => navigator.clipboard.writeText(`${SHORT_URL}${item.short}`)}>
                  {`${SHORT_URL}${item.short}`}
                </td>
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
