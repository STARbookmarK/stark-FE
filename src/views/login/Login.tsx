import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

// header 에도 login 에도 중복해서 쓰는게 맞나
interface nameProps {
  name: string | undefined
}

const Login: React.FunctionComponent<nameProps> = (props) => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [autoLogin, setAutoLogin] = useState<boolean>(false);

  const navigate = useNavigate();
  const { name } = props;

  useEffect(() => {
    // 한번의 api 호출이 사라졌기 때문에 성능 향상
    if(name) navigate('/');
  }, []);

  const idChange = (e: any) => setId(e.target.value || '')
  const pwChange = (e: any) => setPw(e.target.value || '')
  const chkboxChange = () => setAutoLogin(!autoLogin);

  const loginBtnClick = (): void => {
    if(id === '' || pw === ''){
      setState('아이디와 비밀번호를 모두 입력하세요.');
      return;
    }
    axios.post('/api/login', {
      id: id,
      pw: pw,
      autoLogin: autoLogin
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

  // name 으로 conditional rendering 처리하기
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
        <label>
          <input
            style={{
              transform: 'scale(1.5)',
              fontSize: '12px',
              marginRight: '10px',
              accentColor: '#8AAAE5'
            }}
            type='checkbox'
            checked={autoLogin}
            onChange={chkboxChange}
          />
            자동 로그인
        </label>
      </div>
    </div>
  );
}

export default Login;