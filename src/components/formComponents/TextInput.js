import React from 'react';
import { Form } from 'react-bootstrap';

export default function TextInput(props) {
  return (
    <Form.Control
      type="text"
      placeholder={props.placeholder}
      className="main-font"
      value={props.value}
      name={props.name}
      onChange={props.handleChange}
      required
    />
  );
}
