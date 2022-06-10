import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Button, Container, Form } from 'react-bootstrap';
import { createUser, validateEmail } from '../../adapters/FirebaseAdapters';
import InputPassword from './InputPassword';

export default function CreateUser() {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    nombreUsuario: '',
    pass: '',
    confirmPass: '',
  });

  const navigate = useNavigate();

  const redirectAfterRegister = () => {
    navigate('/');
  }

  const handleChange = (event) => {
    const name = event.target.name,
    const value = event.target.value;
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })

    console.log(formData);
  }

  useEffect(() => {
    function checkFields() {
      if(validateEmail(formData.email)){
      if(formData.email !== '' && formData.nombreUsuario.length >= 6 && formData.pass === formData.confirmPass && formData.pass.length >= 6 && formData.confirmPass.length >= 6){
        setIsSubmitDisabled(false)
      }else{
        setIsSubmitDisabled(true);
      }
    }
    }

    checkFields();
  },[formData])

  return (
    <Container className="h-auto">
      <br />
      <h3>Crear usuario</h3>
      <h6>Todos los campos son obligatorios.</h6>
      <br />
      <Form>
        <Form.Control
          type="email"
          placeholder="Dirección de e-mail..."
          className="main-font"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        ></Form.Control>
        <br />
        <Form.Control
          type="text"
          placeholder="Nombre de usuario..."
          className="main-font"
          name="nombreUsuario"
          value={formData.nombreUsuario}
          onChange={handleChange}
          required
        ></Form.Control>
        <br />
        <InputPassword
          placeholder="Contraseña"
          described="passHelp"
          required
          value={formData.pass}
          onChange={handleChange}
          name="pass"
        />
        <InputPassword
          placeholder="Repetir Contraseña"
          required
          value={formData.confirmPass}
          onChange={handleChange}
          name="confirmPass"
        />
        <Form.Text size="sm" id="passHelp" className="main-font" muted>
          Al menos 6 caracteres.
        </Form.Text>
        <br />
        <br />
        <Button
          className="back-quaternary secondary-font fw-bold w-100"
          size="lg"
          style={{ border: 'none' }}
          disabled={isSubmitDisabled}
          onClick={() => createUser(formData.email, formData.pass, formData.nombreUsuario, redirectAfterRegister)}
        >
          Registrarse
        </Button>
      </Form>
      <br />
    </Container>
  );
}
