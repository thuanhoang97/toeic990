import React, { useState } from 'react';
import Modal from '../modal/Modal';
import {
  FormGroup,
  InputLabel,
  Input,
  Button,
  makeStyles,
} from '@material-ui/core';

const InputNameModal = (props) => {
  const classes = useStyles();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onHide(false, name);
  };

  const onChangeInput = (e) => {
    setName(e.target.value);
  };

  return (
    <Modal {...props}>
      <form action="" className="form" onSubmit={handleSubmit}>
        <FormGroup
          row
          classes={{
            root: classes.formGroup,
          }}
        >
          <InputLabel shrink>Test name:</InputLabel>
          <Input name="name" value={name} onChange={onChangeInput}></Input>
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          classes={{ root: classes.btnSubmit }}
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};

const useStyles = makeStyles({
  formGroup: {
    '&.MuiFormGroup-row': {
      width: '100%',
      alignItems: 'center',
    },
    '& .MuiInputLabel-root': {
      minWidth: 100,
      color: '#000',
      transform: 'none',
    },
    '& .MuiInputBase-root': {
      flex: 1,
    },
  },
  btnSubmit: {
    marginTop: 25,
  },
});

export default InputNameModal;
