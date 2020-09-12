import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ArrowDropDown, ExitToApp } from '@material-ui/icons';

const MenuNavbarPC = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const showAccountMenu = (e) => setAnchorEl(e.currentTarget);
  const closeAccountMenu = () => setAnchorEl(null);

  const logout = () => {
    closeAccountMenu();
    onLogout();
  };

  return (
    <div className="menu">
      <div className="menu__links">
        <li className="item">
          <Link to="/tests" className="menu__link">
            Tests
          </Link>
        </li>
        <li className="item">
          <Link to="/records" className="menu__link">
            Records
          </Link>
        </li>
      </div>

      <div className="account">
        <div className="account__info" onClick={showAccountMenu}>
          <div className="account__name">{user.username}</div>
          <ArrowDropDown />
        </div>
        <Menu
          className="account__menu"
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: -10,
            horizontal: 'right',
          }}
          anchorEl={anchorEl}
          keepMounted
          open={!!anchorEl}
          onClose={closeAccountMenu}
        >
          <MenuItem onClick={logout} className="item">
            <ListItemIcon className="item__icon">
              <ExitToApp />
            </ListItemIcon>
            <ListItemText className="item__text" primary="Log out" />
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

MenuNavbarPC.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default MenuNavbarPC;
