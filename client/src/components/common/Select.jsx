import React from 'react';
import PropTypes from 'prop-types';
import { Select as MuiSelect, MenuItem, makeStyles } from '@material-ui/core';

const Select = ({ options, value, onChange, ...props }) => {
  const classes = useStyles();

  return (
    <MuiSelect
      className={classes.root}
      variant="outlined"
      value={value}
      onChange={onChange}
      MenuProps={{
        getContentAnchorEl: null,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        classes: { paper: classes.menuPaper },
      }}
      {...props}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.name}
        </MenuItem>
      ))}
    </MuiSelect>
  );
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 10,
  },
  menuPaper: {
    maxHeight: 200,
  },
});

Select.prototype = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.oneOfType[(PropTypes.number, PropTypes.string)],
  onChange: PropTypes.func,
};

export default Select;
