import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { getContactInfo } from '../../adapters/FirebaseAdapters';
import { Modal, ListGroup } from 'react-bootstrap';

export default function ContactDataModal(props) {
  const [phoneNumbers, setPhoneNumbers] = useState(null);

  useEffect(() => {
    props.contactData.idSolicitante &&
      setPhoneNumbers(
        getContactInfo(props.contactData.idSolicitante, setPhoneNumbers)
      );
  }, [props.contactData]);

  const renderPhoneNumbers =
    phoneNumbers &&
    phoneNumbers.map((phone) => {
      return (
        <ListGroup.Item key={nanoid()}>
          <a href={`tel:+${phone}`} title="Teléfono de contacto">
            {phone}
          </a>
        </ListGroup.Item>
      );
    });

  return (
    <Modal
      show={props.showContactDataModal}
      onHide={props.handleContactDataModal}
    >
      <Modal.Header>
        <Modal.Title>
          Contactá a {props.contactData.nombreUsuario} por{' '}
          {props.contactData.nombreMascota}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup as="ul">
          {phoneNumbers
            ? renderPhoneNumbers
            : 'Sin datos de contacto disponibles'}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
}
