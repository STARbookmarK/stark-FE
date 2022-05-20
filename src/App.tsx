import Header from 'src/views/header/Header';
import MyList from 'src/views/mylist/MyList';
import Login from 'src/views/sign/SignIn';
import Register from 'src/views/sign/SignUp';
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
            <Route path='/mylist' element={<MyList/>}/>
            <Route path='/register' element={<Register name={name}/>}/>
          </Routes>
        </div>
      }
    </div>
  );
}

export default App;