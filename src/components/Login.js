import React from 'react';
import { Row, Col } from 'react-bootstrap';
import LoginScreen from './formComponents/LoginScreen';

export default function Login(props) {
  return (
    <Row className="vh-100 p-2">
      <Col
        xs={12}
        lg={6}
        className="d-flex justify-content-center align-items-center"
      >
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={6} lg={9} className="text-center">
            <h1 className="color-quaternary" style={{ fontSize: '2.7rem' }}>
              Petifind
            </h1>
          </Col>
          <Col
            xs={6}
            lg={3}
            className="d-flex justify-content-center align-items-center"
          >
            <img
              src="https://raw.githubusercontent.com/DiestroCorleone/petifind-assets/main/img/petifind-logo-md.png"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Col>
      <Col
        xs={12}
        lg={6}
        className="d-flex justify-content-center align-items-center"
      >
        <div>
          <p>
            Aloha! Bienvenid@ a Petifind, la app donde nos ayudamos entre tod@s
            a encontrar mascotas perdidas.
            <br />
            Reportá una mascota extraviada, o ayudá a una a volver a su hogar :)
          </p>
          <LoginScreen setIsUserLogged={props.setIsUserLogged} />
        </div>
      </Col>
    </Row>
  );
}
