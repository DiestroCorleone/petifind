import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Row className="vh-100 p-3">
      <Col>
        <h3>Oopsie! Parece que la página que buscás no existe.</h3>
        <Link to="/">
          <Button
            className="back-quaternary secondary-font fw-bold"
            style={{ border: 'none', marginBottom: '10px', width: '100%' }}
          >
            Volver a inicio
          </Button>
        </Link>
      </Col>
    </Row>
  );
}
