import './Header.css';
import { Link } from 'react-router-dom';
import { MouseEventHandler } from 'react';
import axios from 'axios';

interface props {
  name: string | undefined
  menu: boolean
  menuBtnClick: MouseEventHandler
}

const Header: React.FunctionComponent<props> = (props) => {
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
    <div id="navbar">
      <div>
        <Link
          to="/"
          tabIndex={-1}
        >
          <p id="logo">STARK</p>
        </Link>
        { name
          ? <div id="login">
              <p>{name} 님, 안녕하세요.</p>
              <img
                src='img/dropdown.png'
                onClick={menuBtnClick}
              />
              { menu && 
                <div
                  id="menu"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ul>
                    <li onClick={logoutBtnClick}> 로그아웃 </li>
                  </ul>
                </div>
              }
            </div>
          : <Link
              id="login"
              to='/login'
              tabIndex={-1}
            >
              로그인
            </Link>
        }
      </div>
    </div>
  );
}

export default Header;