import './Header.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const Header = () => {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const islogin = (): void => {
    axios.get('/api/login', {
    })
    .then((res) => {
      if(location.pathname === '/login') navigate('/'); // 효율이 떨어짐
      setName(res.data.name);
      setLogin(true);
    })
    .catch((err) => {
      setLogin(false);
    })
  }

  useEffect(() => {
    // 쿠키에 jwt 가 존재하면 로그인 정보 받아오기
    const jwt = cookies.get('jwt');
    if(jwt) islogin();
  }, []);
  
  return (
    <div id="navbar">
      <div>
        <Link to="/">
          <p id="logo">STARK</p>
        </Link>
        { login
          ? <p id="login">{name} 님, 안녕하세요.</p>
          : <Link id="login" to='/login'>로그인</Link>
        }
      </div>
    </div>
  );
}

export default Header;