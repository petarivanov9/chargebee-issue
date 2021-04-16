import React from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";
import { Modal } from "react-bootstrap";

import CreatePaymentProfileForm from "./CreatePaymentProfileForm";

const CreatePaymentProfileDialog = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (data) => {
    console.log("... handleSubmit ...");
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      animation={false}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title as="h5">New Payment Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreatePaymentProfileForm
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      </Modal.Body>
    </Modal>
  );
};

CreatePaymentProfileDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

CreatePaymentProfileDialog.defaultProps = {
  isOpen: false,
  onClose: noop,
};

export default CreatePaymentProfileDialog;
