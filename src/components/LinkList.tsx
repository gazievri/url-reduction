import { useEffect, useState } from 'react';
import { Link } from '../types/Link';
import { SHORT_URL } from '../utils/constants';

interface Props {
  items: Link[],
}

const LinkList: React.FC<Props> = ({ items }) => {
  const [sortedField, setSortedField] = useState('');

  let sortedProducts = [...items];
  if (sortedField !== '') {
    sortedProducts.sort((a, b) => {
      if (a[sortedField as keyof Link] > b[sortedField as keyof Link]) {
        return -1;
      }
      if (a[sortedField as keyof Link] < b[sortedField as keyof Link]) {
        return 1;
      }
      return 0;
    });
  }
  console.log(sortedProducts)
  console.log(sortedField)

  return (
    <table className='striped'>
      <thead>
        <tr>
          <th><button className='table-button' onClick={() => setSortedField('short')}>Short Link</button></th>
          <th><button className='table-button' onClick={() => setSortedField('target')}>Long Link</button></th>
          <th className='center'><button className='table-button' onClick={() => setSortedField('counter')}>Transition</button></th>
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
