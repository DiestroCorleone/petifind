import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import TextInput from '../formComponents/TextInput';

export default function FoundPetModal(props) {
  return (
    <Modal show={props.showFoundPetModal} onHide={props.handleFoundPetModal}>
      <Modal.Header>
        <Modal.Title>
          <h3>Mensaje sobre mascota encontrada</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <TextInput placeholder="Incluí todos los detalles de la mascota encontrada..." />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="back-quaternary secondary-font fw-bold"
          style={{ border: 'none' }}
          onClick={() => props.foundPetRequest()}
        >
          Enviar mensaje y marcar como encontrada
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
