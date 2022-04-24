import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

// header 에도 login 에도 중복해서 쓰는게 맞나
interface nameProps {
  name: string | undefined
}

const Login: React.FunctionComponent<nameProps> = (props) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [state, setState] = useState('');

  const navigate = useNavigate();
  const { name } = props;

  useEffect(() => {
    if(name) navigate('/');
  });

  const idChange = (e: any) => setId(e.target.value || '')
  const pwChange = (e: any) => setPw(e.target.value || '')

  const loginBtnClick = (): void => {
    if(id === '' || pw === ''){
      setState('아이디와 비밀번호를 모두 입력하세요.');
      return;
    }
    axios.post('/api/login', {
      id: id,
      pw: pw
    }, {})
    .then(() => {
      window.location.replace('/');
    })
    .catch((err) => {
      if(err.response.status === 401){
        setState('없는 아이디거나 비밀번호가 틀립니다.');
      }
    })
  }

  const enterKeyPress = (e: any) => {
    if(e.key === 'Enter') loginBtnClick();
  }

  return (
    <div id="loginForm">
      <div>
        <h3>로그인</h3>
        <input
          value={id}
          onChange={idChange}
          type="text"
          placeholder="아이디"
          onKeyPress={enterKeyPress}
        />
        <input
          value={pw}
          onChange={pwChange}
          type="password"
          placeholder="비밀번호"
          onKeyPress={enterKeyPress}
        />
        <div
          id="loginBtn"
          onClick={loginBtnClick}
        >
          <p>로그인</p>
        </div>
        <p id="loginState">{state}</p>
      </div>
    </div>
  );
}

export default Login;