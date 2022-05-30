import httpStatus from 'http-status';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../../api/user.js';
import authApi from '../../api/auth.js';
import './Setting.scss';

interface Props {
  id: string | undefined
}

interface UserProps {
  user_id: string,
  nickname: string,
  info: string,
  bookmarkshow: number,
  hashtagshow: number,
  hashtagcategory: number
}

const Setting: React.FunctionComponent<Props> = (props) => {
  // props
  const { id } = props;
  // 상태 변수
  const [ready, setReady] = useState<boolean>(false);
  const [pw, setPw] = useState<string>('');
  const [npw, setNpw] = useState<string>('');
  const [cpw, setCpw] = useState<string>('');
  const [info, setInfo] = useState<string>('')
  // 추적되지 않는 변수
  const userData = useRef<UserProps>({
    user_id: '',
    nickname: '',
    info: '',
    bookmarkshow: 0,
    hashtagshow: 0,
    hashtagcategory: 0 
  });
  const navigate = useNavigate();
  // 입력 값 변동 시
  const pwChange = (e: any) => setPw(e.target.value || '')
  const npwChange = (e: any) => setNpw(e.target.value || '')
  const cpwChange = (e: any) => setCpw(e.target.value || '')
  const infoChange = (e: any) => setInfo(e.target.value || '')
  // 비밀번호 변경 함수
  const changePasswordBtnClick = async () => {
    // 변경할 지 물어보는 팝업 필요
    if(npw !== cpw){
      alert('새로운 비밀번호가 일치하지 않습니다.');
      return;
    }
    const res = await userApi.changePassword({
      pw: pw,
      npw: npw
    });
    if(res.status === httpStatus.NO_CONTENT){
      alert('비밀번호 변경이 완료되었습니다. 바뀐 비밀번호로 재로그인 하세요.');
      await authApi.logout();
      window.location.replace('/login');
    }
    else if(res.status === httpStatus.BAD_REQUEST){
      alert('비밀번호가 일치하지 않습니다.');
      setPw('');
    }
    else if(res.status >= httpStatus.INTERNAL_SERVER_ERROR) alert('서버에 오류가 발생했습니다.');
  }
  // 상태 메세지 변경 함수
  const changeInfoBtnClick = async () => {
    await userApi.changeInfo(info);
    alert('상태 메세지가 변경되었습니다.');
  }
  // 페이지가 렌더링되면 로그인된 유저 정보 불러오기
  const init = async () => {
    if(!id) navigate('/login');
    const res = await userApi.getUserInfo();
    userData.current = res.data;
    setInfo(userData.current.info);
    setReady(true);
  }
  useEffect(() => {
    init();
  }, []);
  // render
  return (
    <div className='setting_wrap'>
    { ready && 
      <div className='setting'>
        <h2>설정</h2>
        <div className='setting_form'>
          <div className='setting_item'>
            <h3>기본 정보</h3>
            <table>
              <tbody>
                <tr>
                  <th>아이디</th>
                  <td>{id}</td>
                </tr>
                <tr>
                  <th>닉네임</th>
                  <td>{userData.current.nickname}</td>
                </tr>
                <tr>
                  <th>상태 메세지</th>
                  <td>
                    <input
                      type="text"
                      className='setting_input'
                      style={{ width: '100%' }}
                      value={info}
                      onChange={infoChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              style={{
                display: 'flex',
                justifyContent: 'right'
              }}
            >
              <div
                className='setting_btn'
                onClick={changeInfoBtnClick}
              >
                <p>수정</p>
              </div>
            </div>
          </div>
          <div className='setting_item'>
            <h3>비밀번호 변경</h3>
            <table>
              <tbody>
                <tr>
                  <th>아이디</th>
                  <td>{id}</td>
                </tr>
                <tr>
                  <th>비밀번호</th>
                  <td>
                    <input
                      value={pw}
                      onChange={pwChange}
                      type="password"
                      className='setting_input'
                    />
                  </td>
                </tr>
                <tr>
                  <th>새 비밀번호</th>
                  <td>
                    <input
                      value={npw}
                      onChange={npwChange}
                      type="password"
                      className='setting_input'
                    />
                  </td>
                </tr>
                <tr>
                  <th>새 비밀번호 확인</th>
                  <td>
                    <input
                      value={cpw}
                      onChange={cpwChange}
                      type="password"
                      className='setting_input'
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              style={{
                display: 'flex',
                justifyContent: 'right'
              }}
            >
              <div
                className='setting_btn'
                onClick={changePasswordBtnClick}
              >
                <p>수정</p>
              </div>
            </div>
          </div>
          <div className='setting_item'>
            <h3>보기</h3>
            <table>
              <tbody>
                <tr>
                  <th>북마크 출력 방식</th>
                  <td>
                    <label>
                      <input
                        type='radio'
                        name='show'
                      />
                      바둑형
                    </label>
                    <label><input type='radio' name="show"/>리스트형</label>
                  </td>
                </tr>
                <tr>
                  <th>즐겨찾기 해시태그</th>
                  <td></td>
                </tr>
                <tr>
                  <th>즐겨찾기 해시태그 카테고리화</th>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div
              style={{
                display: 'flex',
                justifyContent: 'right'
              }}
            >
              <div className='setting_btn'>
                <p>수정</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    </div>
  );
}

export default Setting;