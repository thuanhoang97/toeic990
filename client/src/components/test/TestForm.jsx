import React, { useState } from "react";
import PropTypes from "prop-types";
import "./test.scss";
import Popup from "../common/Popup";
import * as TestAPI from '../../api/TestAPI';
import * as TestUtils from '../../utils/test.utils';

const TestForm = ({ 
  isVisible,
  setVisible, 
  onCreateItem, 
  onUpdateItem, 
  loadItems, 
  ...props
}) => {
  const initItem = props.item || TestUtils.create();
  const [item, setItem] = useState(initItem);

  const canSubmit = () => item.name && TestUtils.compare(item, initItem) ;

  const handleChangeName = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const onError = (err) => {
    console.log(err);
    loadItems();
  };

  
  const createTest = () => {
    setVisible(false);
    onCreateItem(item);
    TestAPI.create(item)
      .catch(onError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit()) {
      createTest();
    }
  };

  return (
    <Popup setVisible={setVisible} isVisible={isVisible}>
      <form
        className="testForm form "
        onSubmit={handleSubmit}
      >
        <h2 className="form__title">
          { props.item ? 'Edit Test' : 'New Test' }
        </h2>
        <div className="form__group">
          <label htmlFor="testName" className="form__label">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChangeName}
            id="testName"
            className="form__input"
          />
        </div>
        <button 
          type="submit" 
          disabled={!canSubmit()}
          className="btn btn--primary"
        >
          { props.item ? 'Done' : 'Create' }
        </button>
        
      </form>
    </Popup>
  );
};

TestForm.propTypes = {
  item: PropTypes.object,
  setVisible: PropTypes.func.isRequired,
  // onCreateItem: PropTypes.func.isRequired,
  // onUpdateItem: PropTypes.func.isRequired,
  // loadItems: PropTypes.func.isRequired,
};

export default TestForm;
