import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { PetContext } from '../../context/PetContext';
import {
  formatDate,
  savePet,
  removePet,
  sendMessageRequest,
} from '../../adapters/FirebaseAdapters';

export default function Pet(props) {
  const {
    pets,
    setPets,
    filteredPets,
    setFilteredPets,
    handleContactDataModal,
  } = props;
  const { userId, setUserData, userData } = useContext(UserContext);
  const [petStatus, setPetStatus] = useState({
    guardado: props.guardadaPor.includes(userId) ? true : false,
    visto: props.vistaPor.includes(userId) ? true : false,
    encontrado: props.encontradaPor.includes(userId) ? true : false,
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
    // <PetContext.Provider
    //   value={{
    //     pets,
    //     setPets,
    //     filteredPets,
    //     setFilteredPets,
    //     handleContactDataModal,
    //   }}
    // >
    <Col xs="12" lg="8" style={{ margin: '0 auto' }}>
      <Row className="p-3 back-white m-3 shadow rounded">
        <Col xs="3">
          <div className="ratio ratio-1x1 rounded-circle overflow-hidden">
            <img src={props.imagen} />
          </div>
        </Col>
        <Col xs="9">
          <Link
            to="/detalles"
            state={{
              id: props.id,
              nombre: props.nombre,
              nombreUsuarioCreador: props.nombreUsuarioCreador,
              fechaExtravio: props.fechaExtravio,
              zona: props.zona,
              raza: props.raza,
              imagen: props.imagen,
              detalles: props.detalles,
              guardado: petStatus.guardado,
              guardadaPor: props.guardadaPor,
              visto: petStatus.visto,
              vistaPor: props.vistaPor,
              encontrado: petStatus.encontrado,
              idCreador: props.idCreador,
            }}
            style={{ textDecoration: 'none' }}
            className="color-primary"
          >
            <h5>{props.nombre}</h5>
            <h6>{props.raza}</h6>
            <small>
              Extraviado el: {formatDate(props.fechaExtravio).toString()}
            </small>
            <br />
            <small>Zona: {props.zona}</small>
            <br />
            <br />
          </Link>
          <Row className="d-flex justify-content-around align-items-center">
            <i
              title="Guardar"
              onClick={() => {
                toggleSelected('guardado'),
                  petStatus.guardado
                    ? removePet(
                        props.id,
                        userId,
                        ['guardadas', 'guardadaPor'],
                        userData,
                        setUserData,
                        props.prevPets,
                        props.setPets
                      )
                    : savePet(
                        props.id,
                        userId,
                        ['guardadas', 'guardadaPor'],
                        userData,
                        setUserData,
                        props.pets,
                        props.setPets
                      );
              }}
              className={`fa-fw	fa fa-bookmark ${
                petStatus.guardado ? 'color-quaternary' : 'text-secondary'
              }`}
            >
              <small style={{ fontSize: '0.7rem', marginLeft: '10px' }}>
                {props.guardadaPor.length}
              </small>
            </i>
            <i
              title="Marcar como visto"
              onClick={() => {
                toggleSelected('visto'),
                  petStatus.visto
                    ? removePet(
                        props.id,
                        userId,
                        ['vistas', 'vistaPor'],
                        userData,
                        setUserData,
                        props.prevPets,
                        props.setPets
                      )
                    : savePet(
                        props.id,
                        userId,
                        ['vistas', 'vistaPor'],
                        userData,
                        setUserData,
                        props.pets,
                        props.setPets
                      );
              }}
              className={`fa fa-fw fa-eye ${
                petStatus.visto ? 'color-quaternary' : 'text-secondary'
              }`}
            >
              <small style={{ fontSize: '0.7rem', marginLeft: '10px' }}>
                {props.vistaPor.length}
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
                id: props.id,
                nombre: props.nombre,
                nombreUsuarioCreador: props.nombreUsuarioCreador,
                fechaExtravio: props.fechaExtravio,
                zona: props.zona,
                raza: props.raza,
                imagen: props.imagen,
                detalles: props.detalles,
                guardado: petStatus.guardado,
                visto: petStatus.visto,
                encontrado: petStatus.encontrado,
                idCreador: props.idCreador,
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
              title="Enviar mensaje"
              onClick={() => {
                if (
                  userData.usuariosAceptadosEnviados.filter(
                    (usuarioAceptado) =>
                      usuarioAceptado.idSolicitante === props.idCreador
                  ).length > 0
                ) {
                  props.handleContactDataModal(
                    props.idCreador,
                    props.nombreUsuarioCreador,
                    props.nombre
                  );
                } else {
                  sendMessageRequest(
                    userId,
                    props.idCreador,
                    props.id,
                    props.nombreUsuarioCreador,
                    props.nombre,
                    props.imagen,
                    setUserData,
                    userData
                  );
                }
              }}
              className="fa-fw fa fa-comment text-secondary"
            ></i>
          </Row>
        </Col>
      </Row>
    </Col>
    // </PetContext.Provider>
  );
}
