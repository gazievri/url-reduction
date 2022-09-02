import { Link } from 'react-router-dom';

interface HeaderProps {
  loggedIn: boolean
}

const Header: React.FC<HeaderProps> = ({ loggedIn }) => {
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="#!" className="brand-logo left">Logo</a>
                <ul id="nav-mobile" className="right">
                  { loggedIn ? (
                    <>
                      <li><Link to="">Name</Link></li>
                      <li><Link to="">Sign out</Link></li>
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
