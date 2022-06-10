import React from 'react';
import { Form } from 'react-bootstrap';

export default function InputUploadFileModal(props) {
  return (
    <Form.Group
      controlId="formFile"
      className="mb-3"
      className="main-font"
      aria-describedby={props.idAyuda}
      required
    >
      <Form.Text size="sm" id={props.idAyuda} className="main-font" muted>
        {props.ayuda}
      </Form.Text>
      <Form.Control
        type="file"
        onChange={props.handleFileSelect}
        accept=".jpg, .png"
      />
    </Form.Group>
  );
}
