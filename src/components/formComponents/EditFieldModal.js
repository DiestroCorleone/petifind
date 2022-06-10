import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditFieldModal(props) {
  return (
    <Modal show={props.showModal} onHide={props.handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>{props.titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>{props.zonaInput}</Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="back-quaternary secondary-font fw-bold"
          style={{ border: 'none' }}
          onClick={() =>
            props.updateField(
              props.selectedField,
              props.id,
              props.handleModal,
              props.setUserData,
              props.userData
            )
          }
        >
          Subir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
