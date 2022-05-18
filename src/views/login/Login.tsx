import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';

interface Props {
  name: string | undefined
}

const Login: React.FunctionComponent<Props> = (props) => {
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
      else if(err.response.state === 500){
        setState('서버에 문제가 발생했습니다.');
      }
    })
  }

  const enterKeyPress = (e: any) => {
    if(e.key === 'Enter') loginBtnClick();
  }

  // name 으로 conditional rendering 처리하기
  return (
    <div className='login_form_wrap'>
      <div className='login_form'>
        <h3>로그인</h3>
        <input
          value={id}
          onChange={idChange}
          type='text'
          placeholder='아이디'
          onKeyPress={enterKeyPress}
          className='login_input'
        />
        <input
          value={pw}
          onChange={pwChange}
          type='password'
          placeholder='비밀번호'
          onKeyPress={enterKeyPress}
          className='login_input'
        />
        <div
          className='login_btn'
          onClick={loginBtnClick}
        >
          <p>로그인</p>
        </div>
        <p className='login_state'>{state}</p>
        <label className='login_auto'>
          <input
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