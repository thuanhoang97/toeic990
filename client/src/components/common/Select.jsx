import React from 'react';
import PropTypes from 'prop-types';
import { Select as MuiSelect, MenuItem, makeStyles } from '@material-ui/core';

const Select = ({ options, value, onChange, placeholder, ...props }) => {
  const selectClasses = useSelectStyles();
  const menuClasses = useMenuStyles();

  const handleRenderValue = (value) => {
    if (value) {
      const curOpt = options.find(opt => opt.value === value);
      if (curOpt) {
        return curOpt.name;
      }
    }
    return placeholder;
  };

  return (
    <MuiSelect
      className={`${props.className ? props.className : ' '}`}
      classes={selectClasses}
      variant="outlined"
      value={value || ''}
      onChange={onChange}
      displayEmpty={value === undefined}
      renderValue={handleRenderValue}
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
        classes: menuClasses,
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

const useSelectStyles = makeStyles({
  root: {
    width: '100%',
    padding: 15,
  },
});

const useMenuStyles = makeStyles({
  paper: {
    maxHeight: 200,
  },
});

Select.defaultProps = {
  placeholder: '',
};

Select.prototype = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.oneOfType[(PropTypes.number, PropTypes.string)],
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
};

export default Select;
