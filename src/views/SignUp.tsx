import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpStatus from 'http-status';
import authApi from '@api/auth.js';
import styles from '@styles/views/SignUp.module.scss';

interface Props {
  name: string | undefined
}

interface RegisterInfo {
  id: string,
  password: string,
  nickname: string,
  info: string
}

interface validInfo {
  id: boolean,
  nickname: boolean
}

const Register: React.FunctionComponent<Props> = (props) => {
  // props
  const { name } = props;
  // 상태 값
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [cpw, setCpw] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [idState, setIdState] = useState<string>('');
  const [nicknameState, setNicknameState] = useState<string>('');
  // 추적되지 않는 변수
  const valid = useRef<validInfo>({
    id: false,
    nickname: false
  })
  const navigate = useNavigate();
  // 로그인 상태면 홈으로 이동
  useEffect(() => {
    if(name) navigate('/');
  }, []);
  // 입력 값 변동 시
  const idChange = (e: any) => {
    setId(e.target.value || '');
    setIdState('');
  };
  const nicknameChange = (e: any) => {
    setNickname(e.target.value || '');
    setNicknameState('');
  };
  const pwChange = (e: any) => setPw(e.target.value || '')
  const cpwChange = (e: any) => setCpw(e.target.value || '')
  const messageChange = (e: any) => setMessage(e.target.value || '');
  // 회원가입 버튼 클릭
  const registerBtnClick = async () => {
    if(id === ''){
      setState('아이디를 입력해주세요.');
      return;
    }
    if(!valid.current.id){
      setState('아이디 중복 검사를 해주세요.');
      return;
    }
    if(pw === '' || cpw === ''){
      setState('비밀번호를 입력해주세요.');
      return;
    }
    if(pw !== cpw){
      setState('비밀번호가 일치하지 않습니다.');
      return;
    }
    if(nickname === ''){
      setState('닉네임을 입력해주세요.');
      return;
    }
    if(!valid.current.nickname){
      setState('닉네임 중복 검사를 해주세요.');
      return;
    }
    const params: RegisterInfo = {
      id: id,
      password: pw,
      nickname: nickname,
      info: message
    }
    const res = await authApi.register(params);
    if(res.status === httpStatus.CREATED) window.location.replace('/');
    else if(res.status >= httpStatus.INTERNAL_SERVER_ERROR) setState('서버에 문제가 발생했습니다.');
  }
  const chkUserIdClick = async () => {
    if(id === '') return;
    const res = await authApi.chkUserId(id);
    valid.current.id = res.data.valid;
    if(valid.current.id) setIdState('사용 가능한 아이디입니다.');
    else setIdState('사용할 수 없는 아이디입니다.');
  }
  const chkNicknameClick = async () => {
    if(nickname === '') return;
    const res = await authApi.chkNickname(nickname);
    valid.current.nickname = res.data.valid;
    if(valid.current.nickname) setNicknameState('사용 가능한 닉네임입니다.');
    else setNicknameState('사용할 수 없는 닉네임입니다.');
  }
  // render
  return (
    <div className={styles.sign_form_wrap}>
      <div className={styles.sign_form}>
        <h3>회원가입</h3>
        <p className={styles.register_title}>아이디</p>
        <div className={styles.register_item}>
          <input
            value={id}
            onChange={idChange}
            type='text'
            className={styles.sign_input}
          />
          <div
            className={`${styles.sign_btn} ${styles.chk_btn}`}
            onClick={chkUserIdClick}
          >
            확인
          </div>
        </div>
        <p
          className={styles.sign_state}
          style={{
            width: '100%',
            textAlign: 'right',
            color: `${valid.current.id ? 'blue' : 'red'}`
          }}
        >
          {idState}
        </p>
        <div className={styles.register_password}>
          <div className={styles.register_password_item}>
            <p className={styles.register_title}>비밀번호</p>
            <div className={styles.register_item}>
              <input
                value={pw}
                onChange={pwChange}
                type='password'
                className={styles.sign_input}
              />
            </div>
          </div>
          <div className={styles.register_password_item}>
            <p className={styles.register_title}>비밀번호 확인</p>
            <div className={styles.register_item}>
              <input
                value={cpw}
                onChange={cpwChange}
                type='password'
                className={styles.sign_input}
              />
            </div>
          </div>
        </div>
        <p className={styles.register_title}>닉네임</p>
        <div className={styles.register_item}>
          <input
            value={nickname}
            onChange={nicknameChange}
            type='text'
            className={styles.sign_input}
          />
          <div
            className={`${styles.sign_btn} ${styles.chk_btn}`}
            onClick={chkNicknameClick}
          >
            확인
          </div>
        </div>
        <p
          className={styles.sign_state}
          style={{
            width: '100%',
            textAlign: 'right',
            color: `${valid.current.nickname ? 'blue' : 'red'}`
          }}
        >
          {nicknameState}
        </p>
        <p className={styles.register_title}>상태 메시지</p>
        <div className={styles.register_item}>
          <input
            value={message}
            onChange={messageChange}
            type='text'
            className={styles.sign_input}
          />
        </div>
        <div className={styles.register_item}>
          <div
            style={{ marginTop: '10px' }}
            className={styles.sign_btn}
            onClick={registerBtnClick}
          >
            <p>가입 완료</p>
          </div>
        </div>
        <p className={styles.sign_state}>{state}</p>
      </div>
    </div>
  );
}

export default Register;