import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { informError } from '../../adapters/FirebaseAdapters';

export default function InformError() {
  const [detalles, setDetalles] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInputKey, setFileInputKey] = useState('');

  const navigate = useNavigate();

  const redirectAfterLogin = () => {
    navigate('/cerca');
  };

  const handleChange = (event) => {
    setDetalles(event.target.value);
    console.log(detalles);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function clearForm() {
    setDetalles('');
    setSelectedFile(null);
    setFileInputKey(Date.now());
  }

  return (
    <Container className="h-auto">
      <br />
      <h2>Informar Error al Desarrollador</h2>
      <small>
        Si detectaste alguna falla en la aplicación, por favor informanos
        completando el siguiente formulario. El reporte es anónimo, no guardará
        información personal de ningún tipo.
      </small>
      <br />
      <br />
      <Form>
        <Form.Control
          as="textarea"
          rows="10"
          placeholder="Detalles error..."
          className="main-font"
          onChange={handleChange}
          value={detalles}
          name="detalles"
          required
        />
        <Form.Group
          controlId="formFile"
          className="mb-3"
          className="main-font"
          aria-describedby="fotoHelp"
          required
        >
          <Form.Text size="sm" id="fotoHelp" className="main-font" muted>
            Captura de pantalla (opcional):
          </Form.Text>
          <Form.Control
            type="file"
            onChange={handleFileSelect}
            accept=".jpg, .png"
            key={fileInputKey}
          />
        </Form.Group>
        <br />
        <div className="d-grid gap-2">
          <Button
            className="back-quaternary secondary-font fw-bold"
            size="lg"
            style={{ border: 'none' }}
            onClick={() =>
              // console.log(detalles, selectedFile)
              informError(detalles, selectedFile, clearForm, redirectAfterLogin)
            }
          >
            Informar error
          </Button>
        </div>
        <br />
      </Form>
    </Container>
  );
}
