import { Link } from 'react-router-dom';
import { MouseEventHandler } from 'react';
import authApi from '../../api/auth.js';
import httpStatus from 'http-status';
import './Header.scss';

interface Props {
  name: string | undefined
  menu: boolean
  menuBtnClick: MouseEventHandler
}

const Header: React.FunctionComponent<Props> = (props) => {
  // props
  const { name, menu, menuBtnClick } = props;
  // 로그아웃 버튼 클릭 시
  const logoutBtnClick = async () => {
    const res = await authApi.logout();
    if(res.status === httpStatus.OK) window.location.replace('/');
    if(res.status >= httpStatus.INTERNAL_SERVER_ERROR) alert('서버 오류가 발생했습니다.'); // 서버 오류 팝업 구현 필요
  }
  // render
  return (
    <div className='navbar_wrap' >
      <div className='navbar'>
        <Link
          to='/'
          tabIndex={-1}
          className='logo'
        >
          STARK
        </Link>
        { name
          ? <div className='login'>
              <Link to='/' tabIndex={-1}>홈</Link>
              <div className='divider'/>
              <Link to='/mylist' tabIndex={-1}>북마크</Link>
              <div style={{flex: '1 0 0'}}/>
              <div
                className='login_user'
                onClick={menuBtnClick}
              >
                <p>{name}</p>
                <img src='img/dropdown.png'/>
              </div>
              { menu && 
                <div
                  className='menu'
                  onClick={(e) => e.stopPropagation()}
                >
                  <ul>
                    <li>
                      <Link
                        to='/setting'
                        tabIndex={-1}
                        onClick={menuBtnClick}
                      >
                        설정
                      </Link>
                    </li>
                    <li onClick={logoutBtnClick}> 로그아웃 </li>
                  </ul>
                </div>
              }
            </div>
          : <div className='logout'>
              <div style={{flex: '1 0 0'}}/>
              <ul>
                <li>
                  <Link to='/login' tabIndex={-1}>로그인</Link>
                </li>
                <li className='divider'></li>
                <li>
                  <Link to='/register' tabIndex={-1}>회원가입</Link>
                </li>
              </ul>
            </div>
        }
      </div>
    </div>
  );
}

export default Header;