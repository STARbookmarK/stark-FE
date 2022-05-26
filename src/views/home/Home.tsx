import { ReactNode, useEffect, useState } from 'react';
import httpStatus from 'http-status';
import axios from 'axios';
import './Home.scss';

const Home = () => {
  const [view, setView] = useState<ReactNode>(<></>);
  useEffect(() => {
    axios.get('/api/monitor')
    .then((res) => {
      if(res.status === httpStatus.OK){
        const head: string[] = [];
        const body: Array<Array<string>> = [];
        const data = res.data.data;
        for(const key in data){
          const tmp: string[] = [];
          const value = data[key];
          for(const _key in value){
            const _value = value[_key];
            tmp.push(_value);
          }
          body.push(tmp);
          if(!head.length){
            for(const _key in value){
              head.push(_key);
            }
          }
        }
        // set view
        const newView = (): ReactNode => {
          const thead = head.map((el, i) => {
            return (
              <th key={'th' + i}>
                {el}
              </th>
            );
          });
          const tbody = body.map((el, i) => {
            const item = el.map((_el, i) => {
              return (
                <td key={'td' + i}>
                  {_el}
                </td>
              );
            });
            return (
              <tr key={'tr' + i}>
                {item}
              </tr>
            );
          });
          return (
            <table>
              <thead>
                <tr>
                  {thead}
                </tr>
              </thead>
              <tbody>
                {tbody}
              </tbody>
            </table>
          );
        }
        setView(newView);
      }
    })
  }, [])
  return (
    <div className='home_wrap'>
      {view}
    </div>
  );
}

export default Home;