import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from 'src/api/user.js';
import './SignIn.scss';

interface Props {
  name: string | undefined
}

interface LoginInfo {
  id: string,
  pw: string,
  autoLogin: boolean
}

const Login: React.FunctionComponent<Props> = (props) => {
  // props
  const { name } = props;
  // 상태 값
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [autoLogin, setAutoLogin] = useState<boolean>(false);
  // 추적되지 않는 변수
  const navigate = useNavigate();
  // 로그인 상태면 홈으로 이동
  useEffect(() => {
    if(name) navigate('/');
  }, []);
  // 입력 값 변동 시
  const idChange = (e: any) => setId(e.target.value || '')
  const pwChange = (e: any) => setPw(e.target.value || '')
  const chkboxChange = () => setAutoLogin(!autoLogin);
  // 로그인 버튼 클릭
  const loginBtnClick = async () => {
    if(id === '' || pw === ''){
      setState('아이디와 비밀번호를 모두 입력하세요.');
      return;
    }
    const params: LoginInfo = {
      id: id,
      pw: pw,
      autoLogin: autoLogin
    }
    const res = await request.login(params);
    if(res.status === 201) window.location.replace('/');
    else if(res.status === 401) setState('없는 아이디거나 비밀번호가 틀립니다.');
    else if(res.status >= 500) setState('서버에 문제가 발생했습니다.');
  }
  // input 에서 enter 키 입력 시
  const enterKeyPress = (e: any) => {
    if(e.key === 'Enter') loginBtnClick();
  }
  // render
  return (
    <div className='sign_form_wrap'>
      <div className='sign_form'>
        <h3>로그인</h3>
        <div className='login_item'>
          <input
            value={id}
            onChange={idChange}
            type='text'
            placeholder='아이디'
            onKeyPress={enterKeyPress}
            className='sign_input'
          />
        </div>
        <div className='login_item'>
          <input
            value={pw}
            onChange={pwChange}
            type='password'
            placeholder='비밀번호'
            onKeyPress={enterKeyPress}
            className='sign_input'
          />
        </div>
        <div className='login_item'>
          <div
            className='sign_btn'
            onClick={loginBtnClick}
          >
            <p>로그인</p>
          </div>
        </div>
        <p className='sign_state'>{state}</p>
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