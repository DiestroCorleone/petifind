import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { foundPetRequest } from '../../adapters/FirebaseAdapters';
import { UserContext } from '../../context/UserContext';
import { Button, Container, Form } from 'react-bootstrap';

export default function ReportFoundPet(props) {
  const { userId, userData, setUserData } = useContext(UserContext);
  const location = useLocation();
  const [lostPetData, setLostPetData] = useState({
    nombre: location.state.nombre || 'Ninguna mascota seleccionada',
    detalles: '',
    usuarioEncuentra: userId,
    nombreUsuarioEncuentra: userData.nombreUsuario,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInputKey, setFileInputKey] = useState('');

  const handleChange = (event) => {
    setLostPetData((prevLostPetData) => {
      return {
        ...prevLostPetData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function clearForm() {
    setLostPetData({
      nombre: 'Ninguna mascota seleccionada',
      detalles: '',
      usuarioEncuentra: '',
      nombreUsuarioEncuentra: '',
    });
    setSelectedFile(null);
    setFileInputKey(Date.now());
  }

  console.log(lostPetData);

  return (
    <Container className="h-auto">
      <br />
      <h2>Reportar mascota encontrada</h2>
      <h6>
        <small>
          Por favor recordá solo usar esta opción si realmente creés que
          encontraste la mascota. Su familia la extraña mucho.
        </small>
        <br />
        <br />
        Esto enviará una solicitud de mensaje a la familia de la mascota,
        deberás esperar su aprobación.
      </h6>
      <br />
      <Form>
        <h3>{lostPetData.nombre}</h3>
        <br />
        <Form.Group
          controlId="formFile"
          className="mb-3"
          className="main-font"
          aria-describedby="fotoHelp"
          required
        >
          <Form.Text size="sm" id="fotoHelp" className="main-font" muted>
            Foto de la mascota encontrada:
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
              foundPetRequest(
                lostPetData.usuarioEncuentra,
                location.state.idCreador,
                location.state.id,
                location.state.nombreUsuarioCreador,
                lostPetData.nombre,
                selectedFile,
                setUserData,
                userData,
                lostPetData.detalles
                //clearForm
              )
            }
          >
            Reportar mascota encontrada
          </Button>
        </div>
        <br />
      </Form>
    </Container>
  );
}
