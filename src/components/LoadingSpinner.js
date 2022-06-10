import React from 'react';
import { Row, Spinner } from 'react-bootstrap';

export default function LoadingSpinner() {
  return (
    <Row className="vh-100 d-flex align-items-center justify-content-center">
      <Spinner
        animation="border"
        role="status"
        className="color-quaternary text-center"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Row>
  );
}
