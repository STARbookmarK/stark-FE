import './Header.scss';
import { Link } from 'react-router-dom';
import { MouseEventHandler } from 'react';
import axios from 'axios';

interface Props {
  name: string | undefined
  menu: boolean
  menuBtnClick: MouseEventHandler
}

const Header: React.FunctionComponent<Props> = (props) => {
  const { name, menu, menuBtnClick } = props;

  const logoutBtnClick = (): void => {
    axios.get('/api/logout', {
    })
    .then(() => {
      window.location.replace('/');
    })
    .catch((err) => {
    })
  }

  return (
    <div className='navbar_wrap' >
      <div className='navbar'>
        <Link
          to="/"
          tabIndex={-1}
          className='logo'
        >
          STARK
        </Link>
        { name
          ? <div className='login'>
              <Link to='/main' tabIndex={-1}>내 목록</Link>
              <div style={{flex: '1 0 0'}}/>
              <p>{name}</p>
              <img
                src='img/dropdown.png'
                onClick={menuBtnClick}
              />
              { menu && 
                <div
                  className='menu'
                  onClick={(e) => e.stopPropagation()}
                >
                  <ul>
                    <li onClick={logoutBtnClick}> 로그아웃 </li>
                  </ul>
                </div>
              }
            </div>
          : <div className='logout'>
              <div style={{flex: '1 0 0'}}/>
              <Link to='/login' tabIndex={-1}>로그인</Link>
            </div>
        }
      </div>
    </div>
  );
}

export default Header;