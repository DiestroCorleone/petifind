import React, { useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import {
  deleteMessageRequest,
  deleteSentMessageRequest,
  deleteApprovedMessageRequest,
  approveFoundPetRequest,
  testApproved,
} from '../../adapters/FirebaseAdapters';

export default function UserRequest(props) {
  const [showApprovalButtons, setShowApprovalButtons] = useState(
    props.mostrarBotones
  );
  const [isApproved, setIsApproved] = useState(props.isApproved || false);

  return (
    <Row className="p-3 back-white m-3 shadow rounded">
      <Col xs={3}>
        <div className="ratio ratio-1x1 rounded-circle overflow-hidden">
          <img src={props.imagenMascota} />
        </div>
      </Col>
      <Col xs={9}>
        <h5>{props.nombreUsuario || 'Usuario'}</h5>
        <h6>Contacto por: {props.nombreMascota}</h6>
      </Col>
      {props.detalles && (
        <Row>
          <p>{props.detalles}</p>
        </Row>
      )}
      {showApprovalButtons ? (
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={6} className="p-1">
            <Button
              className="back-quaternary secondary-font fw-bold"
              style={{ border: 'none' }}
              onClick={() => {
                props.detalles
                  ? props.approveMessageRequest(
                      props.userId,
                      props.idSolicitante,
                      props.nombreUsuario,
                      props.idMascota,
                      props.nombreMascota,
                      props.imagenMascota,
                      props.setUserData,
                      props.userData,
                      props.detalles
                    )
                  : props.approveMessageRequest(
                      props.userId,
                      props.idSolicitante,
                      props.nombreUsuario,
                      props.idMascota,
                      props.nombreMascota,
                      props.imagenMascota,
                      props.setUserData,
                      props.userData
                    );
              }}
            >
              Aceptar
            </Button>
          </Col>
          <Col xs={12} lg={6} className="p-1">
            <Button
              className="bg-secondary secondary-font fw-bold"
              style={{ border: 'none' }}
              onClick={() => {
                props.detalles
                  ? deleteMessageRequest(
                      props.userId,
                      props.idMascota,
                      props.idSolicitante,
                      props.nombreUsuario,
                      props.imagenMascota,
                      props.nombreMascota,
                      'encontradasRecibidas',
                      'encontradasEnviadas',
                      props.userData,
                      props.setUserData,
                      props.detalles
                    )
                  : deleteMessageRequest(
                      props.userId,
                      props.idMascota,
                      props.idSolicitante,
                      props.nombreUsuario,
                      props.imagenMascota,
                      props.nombreMascota,
                      'usuariosPendientes',
                      'usuariosSolicitados',
                      props.userData,
                      props.setUserData
                    );
              }}
            >
              Rechazar
            </Button>
          </Col>
        </Row>
      ) : !isApproved ? (
        <Button
          className="bg-secondary secondary-font fw-bold"
          style={{ border: 'none' }}
          onClick={() => {
            props.detalles
              ? deleteSentMessageRequest(
                  props.userId,
                  props.idMascota,
                  props.idSolicitante,
                  props.nombreUsuario,
                  props.imagenMascota,
                  props.nombreMascota,
                  props.arrayEmisor,
                  props.arrayReceptor,
                  props.userData,
                  props.setUserData,
                  props.detalles
                )
              : deleteSentMessageRequest(
                  props.userId,
                  props.idMascota,
                  props.idSolicitante,
                  props.nombreUsuario,
                  props.imagenMascota,
                  props.nombreMascota,
                  props.arrayEmisor,
                  props.arrayReceptor,
                  props.userData,
                  props.setUserData
                );
          }}
        >
          {' '}
          Cancelar solicitud{' '}
        </Button>
      ) : (
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={4} className="p-1">
            <Button
              className="back-quaternary secondary-font fw-bold"
              onClick={() =>
                props.handleContactDataModal(
                  props.idSolicitante,
                  props.nombreUsuario,
                  props.nombreMascota
                )
              }
              //getContactInfo(props.idSolicitante)}
            >
              Ver medios de contacto
            </Button>
          </Col>
          <Col xs={12} lg={4} className="p-1">
            <Button
              className="bg-secondary secondary-font fw-bold"
              style={{ border: 'none' }}
              onClick={() => {
                props.detalles
                  ? deleteApprovedMessageRequest(
                      props.userId,
                      props.idMascota,
                      props.idSolicitante,
                      props.nombreUsuario,
                      props.imagenMascota,
                      props.nombreMascota,
                      props.arrayEmisor,
                      props.arrayReceptor,
                      props.userData,
                      props.setUserData,
                      props.detalles
                    )
                  : deleteApprovedMessageRequest(
                      props.userId,
                      props.idMascota,
                      props.idSolicitante,
                      props.nombreUsuario,
                      props.imagenMascota,
                      props.nombreMascota,
                      props.arrayEmisor,
                      props.arrayReceptor,
                      props.userData,
                      props.setUserData
                    );
              }}
            >
              Cancelar solicitud
            </Button>
          </Col>
          {props.mostrarBotonEncontrada && (
            <Col xs={12} lg={4} className="p-1">
              <Button
                className="bg-success back-success secondary-font fw-bold"
                style={{ border: 'none' }}
                onClick={() =>
                  props.markPetAsFound(
                    props.userId,
                    props.idSolicitante,
                    props.nombreUsuario,
                    props.idMascota,
                    props.nombreMascota,
                    props.imagenMascota,
                    props.setUserData,
                    props.userData,
                    props.detalles
                  )
                }
              >
                Marcar como encontrada
              </Button>
            </Col>
          )}
        </Row>
      )}
    </Row>
  );
}
