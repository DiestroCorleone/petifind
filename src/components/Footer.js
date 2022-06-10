import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';

export default function Footer() {
  const { setIsDark } = useContext(UserContext);

  return (
    <Row
      className="p-3 back-tertiary fw-bold color-secondary"
      style={{ marginBottom: '0' }}
    >
      <Col className="text-center">
        <small>
          Developed with &#9829; by{' '}
          <a
            href="https://diestrocorp.com.ar"
            target="_blank"
            title="DiestroCorp"
          >
            DiestroCorp
          </a>{' '}
          - <span>{new Date().getFullYear()}</span> -{' '}
          <i
            className="fa fa-fw fa-lightbulb-o"
            onClick={() => setIsDark((prevSetIsDark) => !prevSetIsDark)}
          ></i>
        </small>
      </Col>
    </Row>
  );
}
