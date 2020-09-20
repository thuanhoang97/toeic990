import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './List.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

const AnimateList = ({
  items,
  itemProps,
  loadItems,
  itemComponent: ItemComponent,
  onClickItem,
  noItemMessage,
  className,
}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadItems().then(() => setLoading(false));
  }, [loadItems]);

  if (isLoading) return <CircularProgress />;
  if (!items.length) return <p className="info">{noItemMessage}</p>;

  return (
    <ul className={`list ${className ? className : ''}`}>
      {items.map((item) => (
        <li
          className="list__item item"
          key={item._id}
          onClick={() => onClickItem && onClickItem(item)}
        >
          <ItemComponent data={item} {...itemProps} />
        </li>
      ))}
    </ul>
  );
};

AnimateList.defaultProps = {
  noItemMessage: 'There are no items availables',
};

AnimateList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemProps: PropTypes.object,
  loadItems: PropTypes.func.isRequired,
  itemComponent: PropTypes.elementType,
  onClickItem: PropTypes.func,
  noItemMessage: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AnimateList;
