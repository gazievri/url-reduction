import { Link } from 'react-router-dom';

interface HeaderProps {
  loggedIn: boolean;
  user: string;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ loggedIn, user, handleLogout }) => {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="#!" className="brand-logo left">Logo</a>
        <ul id="nav-mobile" className="right">
          {loggedIn ? (
            <>
              <li><Link to="" >Name: {user}</Link></li>
              <li><Link to="" onClick={() => handleLogout()}>Sign out</Link></li>
            </>
          )
            :
            (
              <>
                <li><Link to="/signin">Sign in</Link></li>
                <li><Link to="/signup">Register</Link></li>
              </>
            )
          }
        </ul>
      </div>
    </nav>
  )
}

export { Header };
