import React from "react";
import PropTypes from "prop-types";

import "./modal.css";

const Modal = ({ handleCloseModal, handleRetryGame, gameOverText }) => {
    return (
        <div className="modal display-block">
            <section className="modal-main">
                <div className="main-content main-content_modal">
                    <p className="text-normal">{gameOverText}</p>
                    <div>
                        <button className="modal-button modal-button_secondary" onClick={handleCloseModal}>
                            Close
                        </button>
                        <button className="modal-button modal-button_primary" onClick={handleRetryGame}>
                            Confirm
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

Modal.propTypes = {
    handleCloseModal: PropTypes.func,
    handleRetryGame: PropTypes.func,
    gameOverText: PropTypes.string
};

export default Modal;
