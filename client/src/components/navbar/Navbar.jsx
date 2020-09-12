import React from 'react';
import './Navbar.scss';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { logoutUser } from '../../actions/authActions';
import MenuNavbarPC from './MenuNavbarPC';
import MenuNavbarSP from './MenuNavbarSP';

const Navbar = ({ user, history, logoutUser }) => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('md'));

  const logout = () => {
    logoutUser();
    history.push('/login');
  };

  return (
    <nav className={`main-nav nav ${isLarge ? 'pc' : 'sp'} `}>
      <div className="row">
        <h1 className="branch">
          <Link to="/tests">TOEIC 990</Link>
        </h1>

        {isLarge ? (
          <MenuNavbarPC user={user} onLogout={logout} />
        ) : (
          <MenuNavbarSP user={user} onLogout={logout} />
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default connect(null, { logoutUser })(withRouter(Navbar));
