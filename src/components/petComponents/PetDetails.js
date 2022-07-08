import React, { useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import {
  savePet,
  removePet,
  sendMessageRequest,
} from '../../adapters/FirebaseAdapters';
import ContactDataModal from '../userComponents/ContactDataModal';
import FoundPetModal from './FoundPetModal';

export default function PetDetails() {
  const {
    userId,
    setUserData,
    userData,
    pets,
    setPets,
    filteredPets,
    setFilteredPets,
    handleContactDataModal,
    contactData,
    setContactData,
    showContactDataModal,
    setShowContactDataModal,
    showFoundPetModal,
    setShowFoundPetModal,
    handleFoundPetModal,
  } = useContext(UserContext);
  const location = useLocation();
  const [petStatus, setPetStatus] = useState({
    guardado: location.state.guardado,
    visto: location.state.visto,
    encontrado: location.state.encontrado,
  });
  console.log(location);

  function toggleSelected(attributeToChange) {
    setPetStatus((prevPetStatus) => {
      return {
        ...prevPetStatus,
        [attributeToChange]:
          attributeToChange === 'guardado'
            ? !prevPetStatus.guardado
            : attributeToChange === 'visto'
            ? !prevPetStatus.visto
            : !prevPetStatus.encontrado,
      };
    });
  }

  return (
    <Col xs="12" lg="8" style={{ margin: '0 auto' }} className="vh-100">
      <ContactDataModal
        showContactDataModal={showContactDataModal}
        handleContactDataModal={handleContactDataModal}
        contactData={contactData}
      />
      <FoundPetModal
        showFoundPetModal={showFoundPetModal}
        handleFoundPetModal={handleFoundPetModal}
      />
      <Row className="p-3 back-white m-3 shadow rounded">
        <Col xs="3">
          <div className="ratio ratio-1x1 rounded-circle overflow-hidden">
            <img
              src={location.state.imagen}
              className="img-fluid rounded-circle"
            />
          </div>
        </Col>
        <Col xs="9" className="color-primary">
          <h5>{location.state.nombre}</h5>
          <h6>{location.state.raza}</h6>
          <small>Extraviado el: {location.state.fechaExtravio}</small>
          <br />
          <small>Zona: {location.state.zona}</small>
          <p>Detalles: {location.state.detalles}</p>
          <Row className="d-flex justify-content-around align-items-center">
            <i
              title="Guardar"
              onClick={() => {
                toggleSelected('guardado'),
                  petStatus.guardado
                    ? removePet(
                        location.state.id,
                        userId,
                        ['guardadas', 'guardadaPor'],
                        userData,
                        setUserData,
                        pets,
                        setPets
                      )
                    : savePet(
                        location.state.id,
                        userId,
                        ['guardadas', 'guardadaPor'],
                        userData,
                        setUserData,
                        filteredPets,
                        setPets
                      );
              }}
              className={`fa-fw	fa fa-bookmark ${
                petStatus.guardado ? 'color-quaternary' : 'text-secondary'
              }`}
            >
              <small style={{ fontSize: '0.7rem', marginLeft: '10px' }}>
                {location.state.guardadaPor.length}
              </small>
            </i>
            <i
              title="Marcar como visto"
              onClick={() => {
                toggleSelected('visto'),
                  petStatus.visto
                    ? removePet(
                        location.state.id,
                        userId,
                        ['vistas', 'vistaPor'],
                        userData,
                        setUserData,
                        pets,
                        setPets
                      )
                    : savePet(
                        location.state.id,
                        userId,
                        ['vistas', 'vistaPor'],
                        userData,
                        setUserData,
                        filteredPets,
                        setPets
                      );
              }}
              className={`fa fa-fw fa-eye ${
                petStatus.visto ? 'color-quaternary' : 'text-secondary'
              }`}
            >
              <small style={{ fontSize: '0.7rem', marginLeft: '10px' }}>
                {location.state.vistaPor.length}
              </small>
            </i>
            <Link
              to="/encontrada"
              style={{
                margin: '0px',
                padding: '0px',
                width: 'auto',
                alignSelf: 'center',
              }}
              state={{
                id: location.state.id,
                nombre: location.state.nombre,
                nombreUsuarioCreador: location.state.nombreUsuarioCreador,
                fechaExtravio: location.state.fechaExtravio,
                zona: location.state.zona,
                raza: location.state.raza,
                imagen: location.state.imagen,
                detalles: location.state.detalles,
                guardado: petStatus.guardado,
                visto: petStatus.visto,
                encontrado: petStatus.encontrado,
                idCreador: location.state.idCreador,
              }}
            >
              <i
                title="Marcar como encontrado"
                className={`fa-fw	fa fa-check ${
                  petStatus.encontrado ? 'color-quaternary' : 'text-secondary'
                }`}
              ></i>
            </Link>
            <i
              className="fa-fw fa fa-comment text-secondary"
              title="Enviar mensaje"
              onClick={() => {
                if (
                  userData.usuariosAceptadosEnviados.filter(
                    (usuarioAceptado) =>
                      usuarioAceptado.idSolicitante === location.state.idCreador
                  ).length > 0
                ) {
                  handleContactDataModal(
                    location.state.idCreador,
                    location.state.nombreUsuarioCreador,
                    location.state.nombre
                  );
                } else {
                  sendMessageRequest(
                    userId,
                    location.state.idCreador,
                    location.state.id,
                    location.state.nombreUsuarioCreador,
                    location.state.nombre,
                    location.state.imagen,
                    setUserData,
                    userData
                  );
                }
              }}
            ></i>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
