import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { ExitToApp, Menu as MenuIcon } from '@material-ui/icons';

const MenuNavbarSP = ({ user, onLogout }) => {
  const [isVisible, setVisible] = useState(false);

  const logout = () => {
    setVisible(false);
    onLogout();
  };

  const close = () => setVisible(false);

  const checkClose = (e) => {
    if (e.target === e.currentTarget) {
      setVisible(false);
    }
  };

  return (
    <div className={`menu ${isVisible ? 'show' : ''}`}>
      <IconButton
        color="inherit"
        className="btnMenu"
        onClick={() => setVisible(true)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <div className="menu__wrapper" onClick={checkClose}>
        <div className="menu__panel">
          <div className="account">
            <div className="account__name">{user.username}</div>
          </div>
          <ul className="menu__links">
            <li className="item">
              <Link to="/tests" className="link" onClick={close}>
                Tests
              </Link>
            </li>
            <li className="item">
              <Link to="/records" className="link" onClick={close}>
                Records
              </Link>
            </li>
          </ul>

          <div className="account-menu">
            <ul className="items">
              <li className="item">
                <button className="link" onClick={logout}>
                  <ExitToApp className="link__icon" />
                  <p>Logout</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

MenuNavbarSP.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default MenuNavbarSP;
