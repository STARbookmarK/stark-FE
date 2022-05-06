import Header from 'src/views/header/Header';
import Main from 'src/views/main/Main';
import Login from 'src/views/login/Login';
import Home from 'src/views/home/Home';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App(): React.ReactElement {
  const [name, setName] = useState<string | undefined>(undefined);
  const [menu, setMenu] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false); // 로그인 상태를 확인한 뒤 페이지를 렌더링하기 위함.

  const menuBtnClick = (e: any): void => {
    setMenu(!menu);
    e.stopPropagation();
  }

  const loginChk = (): void => {
    axios.get('/api/login', {
    })
    .then((res) => {
      setReady(true);
      setName(res.data.name);
    })
    .catch(() => {
      setReady(true);
      setName(undefined);
    })
  }

  useEffect(() => {
    loginChk();
  }, []);

  return (
    <div className="App">
      { ready &&
        <div
          onClick={() => setMenu(false)}
        >
          <Header name={name} menu={menu} menuBtnClick={menuBtnClick}/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login name={name}/>}/>
            <Route path='/main' element={<Main/>}/>
          </Routes>
        </div>
      }
    </div>
  );
}

export default App;