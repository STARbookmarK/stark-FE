import Header from './views/header/Header';
import Main from './views/main/Main';
import Login from './views/login/Login';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';

const cookies = new Cookies();

function App(): React.ReactElement {
  const [name, setName] = useState<string | undefined>(undefined);
  const [ready, setReady] = useState<boolean>(false); // 로그인 상태를 확인한 뒤 페이지를 렌더링하기 위함.

  const islogin = (): void => {
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
    // 쿠키에 jwt 가 존재하면 로그인 정보 받아오기
    const jwt = cookies.get('jwt');
    if(jwt) islogin();
  }, []);

  return (
    <div className="App">
      { ready &&
        <div>
          <Header name={name}/>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/login' element={<Login name={name}/>}/>
          </Routes>
        </div>
      }
    </div>
  );
}

export default App;