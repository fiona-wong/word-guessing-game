import React from "react";
import PropTypes from "prop-types";

import "./modal.css";

const Modal = ({ handleSecondaryAction, handlePrimaryAction, modalText }) => {
    return (
        <div className="modal display-block">
            <section className="modal-main">
                <div className="main-content main-content_modal">
                    <p className="text-center text-normal">{modalText}</p>
                    <div>
                        <button className="modal-button modal-button_secondary" onClick={handleSecondaryAction}>
                            Close
                        </button>
                        <button className="modal-button modal-button_primary" onClick={handlePrimaryAction}>
                            Confirm
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

Modal.propTypes = {
    handleSecondaryAction: PropTypes.func,
    handlePrimaryAction: PropTypes.func,
    modalText: PropTypes.string
};

export default Modal;
