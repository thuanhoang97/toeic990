import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AnimateList.scss';
import { useTransition, animated } from 'react-spring';
import * as easings from 'd3-ease';
import CircularProgress from '@material-ui/core/CircularProgress';

const AnimateList = ({
  items,
  loadItems,
  itemComponent: ItemComponent,
  onClickItem,
  noItemMessage,
  className,
}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    loadItems().then(() => setLoading(false));
  }, [loadItems]);

  // const transitions = useTransition(items, (item) => item._id, {
  //   from: { transform: 'translate3d(-200px, 0, 0)', opacity: 0 },
  //   enter: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
  //   config: { duration: 1000, easing: easings.easeBackInOut },
  //   trail: 100,
  //   reset: true,
  // });

  if (isLoading) return <CircularProgress />;
  if (!items.length) return <p className="info">{noItemMessage}</p>;

  return (
    <ul className={`animate-list ${className ? className : ''}`}>
      {items.map((item) => (
        <li
          className="animate-list__item item"
          key={item._id}
          onClick={() => onClickItem && onClickItem(item)}
        >
          <ItemComponent data={item} />
        </li>
      ))}

      {/* {transitions.map(({ item, props, key }) => (
        <animated.li
          key={key}
          style={props}
          className="animate-list__item item"
          onClick={() => onClickItem && onClickItem(item)}
        >
          <ItemComponent data={item} />
        </animated.li>
      ))} */}
    </ul>
  );
};

AnimateList.defaultProps = {
  noItemMessage: 'There are no items availables',
};

AnimateList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadItems: PropTypes.func.isRequired,
  itemComponent: PropTypes.elementType,
  onClickItem: PropTypes.func,
  noItemMessage: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AnimateList;
