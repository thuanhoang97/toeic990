import React from "react";
import { CSSTransition } from "react-transition-group";

import Notify from "./Notify";
import "./notify.scss";
import { useNotifyContext } from "../../common/hooks/notify";

const NotifyContainer = () => {
  const { notify, clearNotify } = useNotifyContext();

  const isVisible = notify !== null;

  const containerStyle = {};
  const notifyStyle = {};
  if (isVisible) {
    containerStyle.animation = 'fadeIn .1s ease-out both';
    notifyStyle.animation = 'fadeInDown .3s ease-out both .1s';
  }
 
  console.log("notify", notify);

  return (
    <div className="notifyContainer" style={containerStyle}>
    {isVisible && <Notify 
      variant="message"
      setVisible={clearNotify}
      data={notify}
      style={notifyStyle}
      textButton="OK"
    />}
  </div>
  );
};

export default NotifyContainer;
