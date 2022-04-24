import './Header.css';
import { Link } from 'react-router-dom';

interface nameProps {
  name: string | undefined
}

const Header: React.FunctionComponent<nameProps> = (props) => {
  const { name } = props;

  return (
    <div id="navbar">
      <div>
        <Link to="/">
          <p id="logo">STARK</p>
        </Link>
        { name
          ? <p id="login">{name} 님, 안녕하세요.</p>
          : <Link id="login" to='/login'>로그인</Link>
        }
      </div>
    </div>
  );
}

export default Header;