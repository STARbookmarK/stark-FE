import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../../api/user.js';
import './Setting.scss';

interface Props {
  id: string | undefined
}

interface UserProps {
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
  // 추적되지 않는 변수
  const userData = useRef<UserProps>({
    nickname: '',
    info: '',
    bookmarkshow: 0,
    hashtagshow: 0,
    hashtagcategory: 0 
  });
  const navigate = useNavigate();
  // 페이지가 렌더링되면 로그인된 유저 정보 불러오기
  const init = async () => {
    const res = await userApi.getUserInfo();
    userData.current = res.data;
    if(!id) navigate('/login');
    setReady(true);
    console.log(id);
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
                      value={userData.current.info}
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
              <div className='setting_btn'>
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
                      type="password"
                      className='setting_input'
                    />
                  </td>
                </tr>
                <tr>
                  <th>새 비밀번호</th>
                  <td>
                    <input
                      type="password"
                      className='setting_input'
                    />
                  </td>
                </tr>
                <tr>
                  <th>새 비밀번호 확인</th>
                  <td>
                    <input
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
              <div className='setting_btn'>
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