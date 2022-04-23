import { Routes, Route } from 'react-router-dom';
import Header from './views/header/Header';
import Main from './views/main/Main';
import Login from './views/login/Login';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
