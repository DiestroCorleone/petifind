import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { PetContext } from '../../context/PetContext';
import {
  savePet,
  removePet,
  sendMessageRequest,
} from '../../adapters/FirebaseAdapters';

export default function PetDetails() {
  const { userId, setUserData, userData } = useContext(UserContext);
  const { pets, setPets, filteredPets, setFilteredPets } =
    useContext(PetContext);
  const location = useLocation();
  const [petStatus, setPetStatus] = useState({
    guardado: location.state.guardado,
    visto: location.state.visto,
    encontrado: location.state.encontrado,
  });

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
          <Row className="d-flex justify-content-around">
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
            ></i>
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
            ></i>
            <i
              title="Marcar como encontrado"
              onClick={() => toggleSelected('encontrado')}
              className={`fa-fw	fa fa-check ${
                petStatus.encontrado ? 'color-quaternary' : 'text-secondary'
              }`}
            ></i>
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
