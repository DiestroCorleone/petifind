import React, { useState, useEffect, useContext } from 'react';
import { nanoid } from 'nanoid';
import {
  fetchMapboxApi,
  selectSuggestion,
} from '../../adapters/MapboxAdapters';
import { handleSubmitPet } from '../../adapters/FirebaseAdapters';
import { UserContext } from '../../context/UserContext';
import { Button, Row, Col, Container, Form, ListGroup } from 'react-bootstrap';

export default function ReportPet() {
  const [chosenPlace, setChosenPlace] = useState({});
  const { userId, userData } = useContext(UserContext);
  const [lostPetData, setLostPetData] = useState({
    nombre: '',
    raza: '',
    esMestizo: false,
    fechaExtravio: '',
    zona: '',
    detalles: '',
    usuarioCreador: userId,
    nombreUsuarioCreador: userData.nombreUsuario,
  });
  const [searchPlace, setSearchPlace] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [writing, setWriting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInputKey, setFileInputKey] = useState('');
  const fetchApi = fetchMapboxApi;
  const suggestionSelection = selectSuggestion;

  const handleSearchCity = (event) => {
    setWriting(true);
    const value = event.target.value;
    setSearchPlace(value);
    fetchApi(setSearchResults, searchPlace);
  };

  const handleChange = (event) => {
    setLostPetData((prevLostPetData) => {
      return {
        ...prevLostPetData,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      };
    });
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    function setCity() {
      setLostPetData((prevLostPetData) => {
        return {
          ...prevLostPetData,
          zona: chosenPlace.chosenName,
        };
      });
    }

    setCity();
  }, [chosenPlace]);

  function clearForm() {
    setLostPetData({
      nombre: '',
      raza: '',
      esMestizo: false,
      fechaExtravio: '',
      zona: '',
      detalles: '',
      usuarioCreador: '',
      nombreUsuarioCreador: '',
    });
    setSearchPlace('');
    setSelectedFile(null);
    setFileInputKey(Date.now());
  }

  const renderSuggestions = searchResults.map((result) => {
    return (
      <ListGroup.Item
        key={nanoid()}
        className="pointer"
        onClick={() => {
          suggestionSelection(
            setChosenPlace,
            setSearchPlace,
            result.place_name,
            result.center[0],
            result.center[1]
          );
          setWriting(false);
        }}
      >
        {result.place_name}
      </ListGroup.Item>
    );
  });

  return (
    <Container className="h-auto">
      <br />
      <h3>Reportar mascota extraviada</h3>
      <br />
      <Form>
        <Form.Control
          type="text"
          placeholder="Nombre de tu mascota..."
          className="main-font"
          onChange={handleChange}
          value={lostPetData.nombre}
          name="nombre"
          required
        />
        <br />
        <Row>
          <Col xs="8">
            <Form.Control
              type="text"
              placeholder="Raza..."
              className="main-font"
              onChange={handleChange}
              value={lostPetData.raza}
              name="raza"
              required
            />
          </Col>
          <Col>
            <Form.Check
              type="checkbox"
              label="Mestizo"
              className="main-font"
              onChange={handleChange}
              checked={lostPetData.esMestizo}
              name="esMestizo"
            />
          </Col>
        </Row>
        <br />
        <Form.Control
          type="date"
          className="main-font"
          name="fechaExtravio"
          onChange={handleChange}
          value={lostPetData.fechaExtravio}
          required
        />
        <br />
        <Form.Control
          type="text"
          placeholder="Zona donde se extravió..."
          className="main-font"
          onChange={handleSearchCity}
          value={searchPlace}
          name={searchPlace}
          required
        />
        {writing ? (
          <div className="back-">
            <ListGroup>{renderSuggestions}</ListGroup>
          </div>
        ) : (
          ''
        )}
        <br />
        <Form.Group
          controlId="formFile"
          className="mb-3"
          className="main-font"
          aria-describedby="fotoHelp"
          required
        >
          <Form.Text size="sm" id="fotoHelp" className="main-font" muted>
            Foto de tu mascota:
          </Form.Text>
          <Form.Control
            type="file"
            onChange={handleFileSelect}
            accept=".jpg, .png"
            key={fileInputKey}
          />
        </Form.Group>
        <br />
        <Form.Control
          as="textarea"
          rows="10"
          placeholder="Detalles..."
          className="main-font"
          onChange={handleChange}
          value={lostPetData.detalles}
          name="detalles"
          required
        />
        <br />
        <div className="d-grid gap-2">
          <Button
            className="back-quaternary secondary-font fw-bold"
            size="lg"
            style={{ border: 'none' }}
            onClick={() =>
              handleSubmitPet(
                lostPetData.usuarioCreador,
                lostPetData.nombre,
                lostPetData.raza,
                lostPetData.esMestizo,
                lostPetData.fechaExtravio,
                lostPetData.zona,
                selectedFile,
                lostPetData.detalles,
                clearForm,
                lostPetData.nombreUsuarioCreador
              )
            }
          >
            Reportar mascota
          </Button>
        </div>
        <br />
      </Form>
    </Container>
  );
}
