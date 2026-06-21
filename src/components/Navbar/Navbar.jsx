import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login', { replace: true });
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link className="navbar__brand" to="/">
          Go Business
        </Link>

        <nav className="navbar__nav" aria-label="Main navigation">
          <Link className="navbar__link" to="/">
            Home
          </Link>
          <button className="navbar__logout" type="button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
