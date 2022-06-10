import React, { useState, useContext } from 'react';
import { nanoid } from 'nanoid';
import { Row, Accordion } from 'react-bootstrap';
import {
  approveMessageRequest,
  approveFoundPetRequest,
  markPetAsFound,
} from '../../adapters/FirebaseAdapters';
import { UserContext } from '../../context/UserContext';
import UserRequest from './UserRequest';
import ContactDataModal from './ContactDataModal';

export default function ContactRequests() {
  const { userData, setUserData, userId } = useContext(UserContext);
  const [showContactDataModal, setShowContactDataModal] = useState(false);
  const [contactData, setContactData] = useState({});

  function handleContactDataModal(idSolicitante, nombreUsuario, nombreMascota) {
    setContactData({
      idSolicitante: idSolicitante,
      nombreUsuario: nombreUsuario,
      nombreMascota: nombreMascota,
    });
    setShowContactDataModal(
      (prevShowContactDataModal) => !prevShowContactDataModal
    );
  }

  // Mascotas encontradas

  const renderEncontradasRecibidas = userData.encontradasRecibidas.map(
    (encontradaRecibida) => {
      return (
        <UserRequest
          key={nanoid()}
          userData={userData}
          setUserData={setUserData}
          userId={userId}
          idSolicitante={encontradaRecibida.idSolicitante}
          idMascota={encontradaRecibida.idMascota}
          nombreUsuario={encontradaRecibida.nombreUsuario}
          nombreMascota={encontradaRecibida.nombreMascota}
          imagenMascota={encontradaRecibida.imagenMascota}
          imagenMascota={encontradaRecibida.imagenMascota}
          nombreMascota={encontradaRecibida.nombreMascota}
          imagenMascota={encontradaRecibida.imagenMascota}
          detalles={encontradaRecibida.detalles}
          arrayEmisor="encontradasEnviadas"
          arrayReceptor="encontradasRecibidas"
          mostrarBotones={true}
          approveMessageRequest={approveFoundPetRequest}
        />
      );
    }
  );

  const renderEncontradasEnviadas = userData.encontradasEnviadas.map(
    (encontradaEnviada) => {
      return (
        <UserRequest
          key={nanoid()}
          userData={userData}
          setUserData={setUserData}
          userId={userId}
          idSolicitante={encontradaEnviada.idSolicitante}
          idMascota={encontradaEnviada.idMascota}
          nombreUsuario={encontradaEnviada.nombreUsuario}
          nombreMascota={encontradaEnviada.nombreMascota}
          imagenMascota={encontradaEnviada.imagenMascota}
          imagenMascota={encontradaEnviada.imagenMascota}
          nombreMascota={encontradaEnviada.nombreMascota}
          imagenMascota={encontradaEnviada.imagenMascota}
          detalles={encontradaEnviada.detalles}
          arrayEmisor="encontradasRecibidas"
          arrayReceptor="encontradasEnviadas"
        />
      );
    }
  );

  const renderEncontradasRecibidasAprobadas =
    userData.encontradasRecibidasAprobadas.map((encontradaRecibidaAprobada) => {
      return (
        <UserRequest
          key={nanoid()}
          userData={userData}
          setUserData={setUserData}
          userId={userId}
          idSolicitante={encontradaRecibidaAprobada.idSolicitante}
          idMascota={encontradaRecibidaAprobada.idMascota}
          nombreUsuario={encontradaRecibidaAprobada.nombreUsuario}
          nombreMascota={encontradaRecibidaAprobada.nombreMascota}
          imagenMascota={encontradaRecibidaAprobada.imagenMascota}
          imagenMascota={encontradaRecibidaAprobada.imagenMascota}
          nombreMascota={encontradaRecibidaAprobada.nombreMascota}
          imagenMascota={encontradaRecibidaAprobada.imagenMascota}
          detalles={encontradaRecibidaAprobada.detalles}
          mostrarBotones={false}
          isApproved={true}
          arrayEmisor="encontradasEnviadasAprobadas"
          arrayReceptor="encontradasRecibidasAprobadas"
          handleContactDataModal={handleContactDataModal}
          mostrarBotonEncontrada={true}
          markPetAsFound={markPetAsFound}
        />
      );
    });

  const renderEncontradasEnviadasAprobadas =
    userData.encontradasEnviadasAprobadas.map((encontradaEnviadaAprobada) => {
      return (
        <UserRequest
          key={nanoid()}
          userData={userData}
          setUserData={setUserData}
          userId={userId}
          idSolicitante={encontradaEnviadaAprobada.idSolicitante}
          idMascota={encontradaEnviadaAprobada.idMascota}
          nombreUsuario={encontradaEnviadaAprobada.nombreUsuario}
          nombreMascota={encontradaEnviadaAprobada.nombreMascota}
          imagenMascota={encontradaEnviadaAprobada.imagenMascota}
          imagenMascota={encontradaEnviadaAprobada.imagenMascota}
          nombreMascota={encontradaEnviadaAprobada.nombreMascota}
          imagenMascota={encontradaEnviadaAprobada.imagenMascota}
          detalles={encontradaEnviadaAprobada.detalles}
          mostrarBotones={false}
          isApproved={true}
          arrayEmisor="encontradasRecibidasAprobadas"
          arrayReceptor="encontradasEnviadasAprobadas"
          handleContactDataModal={handleContactDataModal}
        />
      );
    });

  // Solicitudes de contacto

  const renderEnviadas = userData.usuariosSolicitados.map((enviada) => {
    return (
      <UserRequest
        key={nanoid()}
        userData={userData}
        setUserData={setUserData}
        userId={userId}
        idSolicitante={enviada.idSolicitante}
        idMascota={enviada.idMascota}
        nombreUsuario={enviada.nombreUsuario}
        nombreMascota={enviada.nombreMascota}
        imagenMascota={enviada.imagenMascota}
        imagenMascota={enviada.imagenMascota}
        nombreMascota={enviada.nombreMascota}
        imagenMascota={enviada.imagenMascota}
        arrayEmisor="usuariosPendientes"
        arrayReceptor="usuariosSolicitados"
      />
    );
  });

  const renderRecibidas = userData.usuariosPendientes.map((recibida) => {
    return (
      <UserRequest
        key={nanoid()}
        userData={userData}
        setUserData={setUserData}
        userId={userId}
        idSolicitante={recibida.idSolicitante}
        nombreUsuario={recibida.nombreUsuario}
        idMascota={recibida.idMascota}
        nombreMascota={recibida.nombreMascota}
        imagenMascota={recibida.imagenMascota}
        imagenMascota={recibida.imagenMascota}
        nombreMascota={recibida.nombreMascota}
        approveMessageRequest={approveMessageRequest}
        mostrarBotones={true}
      />
    );
  });

  // Solicitudes aceptadas

  const renderAceptadasEnviadas = userData.usuariosAceptadosEnviados.map(
    (aceptadaEnviada) => {
      return (
        <UserRequest
          key={nanoid()}
          userData={userData}
          setUserData={setUserData}
          userId={userId}
          idSolicitante={aceptadaEnviada.idSolicitante}
          idMascota={aceptadaEnviada.idMascota}
          nombreUsuario={aceptadaEnviada.nombreUsuario}
          nombreMascota={aceptadaEnviada.nombreMascota}
          imagenMascota={aceptadaEnviada.imagenMascota}
          imagenMascota={aceptadaEnviada.imagenMascota}
          nombreMascota={aceptadaEnviada.nombreMascota}
          mostrarBotones={false}
          isApproved={true}
          arrayEmisor="usuariosAceptadosRecibidos"
          arrayReceptor="usuariosAceptadosEnviados"
          handleContactDataModal={handleContactDataModal}
        />
      );
    }
  );

  const renderAceptadasRecibidas = userData.usuariosAceptadosRecibidos.map(
    (aceptadaRecibida) => {
      return (
        <UserRequest
          key={nanoid()}
          userData={userData}
          setUserData={setUserData}
          userId={userId}
          idSolicitante={aceptadaRecibida.idSolicitante}
          idMascota={aceptadaRecibida.idMascota}
          nombreUsuario={aceptadaRecibida.nombreUsuario}
          nombreMascota={aceptadaRecibida.nombreMascota}
          imagenMascota={aceptadaRecibida.imagenMascota}
          imagenMascota={aceptadaRecibida.imagenMascota}
          nombreMascota={aceptadaRecibida.nombreMascota}
          mostrarBotones={false}
          isApproved={true}
          arrayEmisor="usuariosAceptadosEnviados"
          arrayReceptor="usuariosAceptadosRecibidos"
          handleContactDataModal={handleContactDataModal}
        />
      );
    }
  );

  return (
    <Row className="p-3 h-auto" style={{ minHeight: '100vh' }}>
      <ContactDataModal
        showContactDataModal={showContactDataModal}
        handleContactDataModal={handleContactDataModal}
        contactData={contactData}
      />
      <br />
      <h4>Solicitudes de contacto</h4>
      <br />
      <br />
      {userData.encontradasRecibidasAprobadas.length > 0 && (
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Contactá a quien cree haber encontrado a tu mascota{' '}
              <i className="text-danger fa-fw fa fa-exclamation-circle"></i>
            </Accordion.Header>
            <Accordion.Body>
              {renderEncontradasRecibidasAprobadas}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
      {userData.encontradasEnviadasAprobadas.length > 0 && (
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Contactos por mascotas encontradas aprobados{' '}
              <i className="text-danger fa-fw fa fa-exclamation-circle"></i>
            </Accordion.Header>
            <Accordion.Body>
              {renderEncontradasEnviadasAprobadas}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
      {userData.encontradasRecibidas.length > 0 && (
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Alguien cree haber encontrado a tu mascota{' '}
              <i className="text-danger fa-fw fa fa-exclamation-circle"></i>
            </Accordion.Header>
            <Accordion.Body>{renderEncontradasRecibidas}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
      {userData.encontradasEnviadas.length > 0 && (
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Mascotas encontradas pendientes{' '}
              <i className="text-danger fa-fw fa fa-exclamation-circle"></i>
            </Accordion.Header>
            <Accordion.Body>{renderEncontradasEnviadas}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
      <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Enviadas</Accordion.Header>
          <Accordion.Body>
            {userData.usuariosSolicitados.length > 0
              ? renderEnviadas
              : 'No tenés solicitudes enviadas pendientes.'}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Recibidas</Accordion.Header>
          <Accordion.Body>
            {userData.usuariosPendientes.length > 0
              ? renderRecibidas
              : 'No tenés solicitudes recibidas pendientes.'}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Aceptadas Enviadas</Accordion.Header>
          <Accordion.Body>
            {userData.usuariosAceptadosEnviados.length > 0
              ? renderAceptadasEnviadas
              : 'No tenés solicitudes enviadas aceptadas.'}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Aceptadas Recibidas</Accordion.Header>
          <Accordion.Body>
            {renderAceptadasRecibidas.length > 0
              ? renderAceptadasRecibidas
              : 'No tenés solicitudes aceptadas recibidas.'}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Row>
  );
}
