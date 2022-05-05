import './Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

interface nameProps {
  name: string | undefined
}

const Header: React.FunctionComponent<nameProps> = (props) => {
  const { name } = props;

  const [menu, setMenu] = useState<boolean>(false);

  const menuBtnClick = (): void => setMenu(!menu);
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
                <div id="menu">
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