import Header from '@views/Header';
import MyList from '@views/MyList';
import Login from '@views/SignIn';
import Register from '@views/SignUp';
import Setting from '@views/Setting';
import Home from '@views/Home';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import authApi from './api/auth.js';
import httpStatus from 'http-status';

interface UserInfo {
  id: string | undefined,
  name: string | undefined
}

function App(): React.ReactElement {
  // 상태 값
  const [menu, setMenu] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false); // 로그인 상태를 확인한 뒤 페이지를 렌더링하기 위함.
  // 추적되지 않는 변수
  const user = useRef<UserInfo>({
    id: undefined,
    name: undefined
  });
  // 메뉴 버튼 클릭 시
  const menuBtnClick = (e: any): void => {
    setMenu(!menu);
    e.stopPropagation();
  }
  // 로그인 상태 확인 함수
  const loginChk = async () => {
    const res = await authApi.loginChk()
    if(res.status === httpStatus.OK){
      const { id, name } = res.data;
      user.current.id = id;
      user.current.name = name;
    }
    else if(res.status >= httpStatus.INTERNAL_SERVER_ERROR){
      user.current.id = undefined;
      user.current.name = undefined;
    }
    setReady(true);
  }
  useEffect(() => {
    loginChk();
  }, []);
  // render
  return (
    <div className="App">
      { ready &&
        <div onClick={() => setMenu(false)}>
          <Header name={user.current.name} menu={menu} menuBtnClick={menuBtnClick}/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login name={user.current.name}/>}/>
            <Route path='/mylist' element={<MyList/>}/>
            <Route path='/register' element={<Register name={user.current.name}/>}/>
            <Route path='/setting' element={<Setting id={user.current.id}/>}/>
          </Routes>
        </div>
      }
    </div>
  );
}

export default App;