import React from "react";
import PropTypes from "prop-types";

import "./modal.css";

const Modal = ({ show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">{children}</section>
        </div>
    );
};

Modal.propTypes = {
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Modal;
