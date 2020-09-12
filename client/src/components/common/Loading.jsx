import React from 'react';
import { CircularProgress, Backdrop, makeStyles } from '@material-ui/core';

const Loading = () => {
  const progessClasses = useProgresstyles();

  return (
    <Backdrop open={true}>
      <CircularProgress
        size={70}
        thickness={4}
        classes={progessClasses}
      />
    </Backdrop>
  );
};

const useProgresstyles = makeStyles({
  colorPrimary: {
    color: '#fff'
  }
});

export default Loading;
