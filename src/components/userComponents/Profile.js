import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { UserContext } from '../../context/UserContext';
import {
  getPets,
  updateProfilePhoto,
  updateUserData,
} from '../../adapters/FirebaseAdapters';
import RenderMyPets from '../petComponents/RenderMyPets';
import EditFieldModal from '../formComponents/EditFieldModal';
import InputUploadFileModal from '../formComponents/InputUploadFileModal';
import TextInput from '../formComponents/TextInput';
import LoadingSpinner from '../LoadingSpinner';

export default function Profile() {
  const { savedMarker, setUserData, userData, userId } =
    useContext(UserContext);
  const [myPets, setMyPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userDataToChange, setUserDataToChange] = useState({});

  useEffect(() => {
    getPets(setLoading, setMyPets, userId);
  }, [userId]);

  const renderPhones = userData.telefonos.map((tel) => {
    return <li key={tel}>{tel}</li>;
  });

  function handlePhotoModal() {
    setShowPhotoModal((prevShowPhotoModal) => !prevShowPhotoModal);
  }

  function handlePhoneModal() {
    setShowPhoneModal((prevShowPhoneModal) => !prevShowPhoneModal);
  }

  function handleUsernameModal() {
    setShowUsernameModal((prevShowUsernameModal) => !prevShowUsernameModal);
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDataInput = (event) => {
    setUserDataToChange((prevUserDataToChange) => ({
      ...prevUserDataToChange,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Row className="h-auto p-3 text-center">
      <EditFieldModal
        showModal={showPhotoModal}
        handleModal={handlePhotoModal}
        updateField={updateProfilePhoto}
        selectedField={selectedFile}
        id={userId}
        setUserData={setUserData}
        userData={userData}
        titulo="Actualizar imagen de perfil"
        zonaInput={
          <InputUploadFileModal
            idAyuda="fotoHelp"
            handleFileSelect={handleFileSelect}
            ayuda="Foto de perfil:"
          />
        }
      />
      <EditFieldModal
        showModal={showPhoneModal}
        handleModal={handlePhoneModal}
        updateField={updateUserData}
        selectedField={userDataToChange}
        id={userId}
        setUserData={setUserData}
        userData={userData}
        titulo="Agregá un número de teléfono"
        zonaInput={
          <TextInput
            placeholder="Ingresá un número de teléfono..."
            name="telefonos"
            value={Object.values(userDataToChange)[0] || ''}
            handleChange={handleDataInput}
          />
        }
      />
      <EditFieldModal
        showModal={showUsernameModal}
        handleModal={handleUsernameModal}
        updateField={updateUserData}
        selectedField={userDataToChange}
        id={userId}
        setUserData={setUserData}
        userData={userData}
        titulo="Actualizá tu nombre de usuario"
        zonaInput={
          <TextInput
            placeholder="Ingresá tu nuevo nombre de usuario..."
            name="nombreUsuario"
            value={Object.values(userDataToChange)[0] || ''}
            handleChange={handleDataInput}
          />
        }
      />
      <Col xs={12} lg={3} className="p-3">
        <div className="d-flex justify-content-center h-auto">
          {userData.imagenPerfil ? (
            <div
              style={{ width: '30%' }}
              className="ratio ratio-1x1 rounded-circle overflow-hidden"
            >
              <img src={userData.imagenPerfil} />
            </div>
          ) : (
            <i
              className="fa fa-fw fa fa-user-circle-o color-quaternary fa-5x"
              title="Cargar imagen de perfil"
              onClick={() => handlePhotoModal()}
            ></i>
          )}
        </div>
      </Col>
      <Col xs={12} lg={9}>
        <h3>
          {userData.nombreUsuario}
          <i
            title="Editar nombre de usuario"
            className="fa fa-fw fa-pencil color-quaternary"
            onClick={() => handleUsernameModal()}
          ></i>
        </h3>
        {userData.imagenPerfil && (
          <small onClick={() => handlePhotoModal()} className="pointer">
            Actualizar imagen de perifl
          </small>
        )}
        <br />
        <br />
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h6>
                Zona geográfica:
                <Link to="/buscar">
                  <i
                    title="Editar zona"
                    className="fa fa-fw fa-pencil color-quaternary"
                  ></i>
                </Link>
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              {savedMarker.place || 'Sin definir'}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h6>
                Medios de contacto:
                <i
                  title="Cargar teléfono de contacto"
                  className="fa fa-fw fa-pencil color-quaternary"
                  onClick={() => handlePhoneModal()}
                ></i>
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              <ul>
                {userData.telefonos[0] ? (
                  renderPhones
                ) : (
                  <li>Sin teléfonos cargados</li>
                )}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h6>
                Mascotas reportadas:
                <Link to="/reportar">
                  <i
                    title="Reportar mascota"
                    className="fa fa-fw fa-pencil color-quaternary"
                  ></i>
                </Link>
              </h6>
            </Accordion.Header>
            <Accordion.Body>
              {loading ? (
                <LoadingSpinner />
              ) : !myPets[0] ? (
                <p>Sin mascotas reportadas</p>
              ) : (
                <RenderMyPets pets={myPets} />
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  );
}
