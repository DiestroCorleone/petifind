import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Button, Form } from 'react-bootstrap';
import { signIn, validateEmail } from '../../adapters/FirebaseAdapters';
import InputPassword from './InputPassword';
import { UserContext } from '../../context/UserContext';

export default function LoginScreen() {
  const { setIsUserLogged, setUserId, setSavedMarker, setUserData } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    pass: '',
  })
  
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const navigate = useNavigate();

  const redirectAfterLogin = () => {
    navigate('/cerca');
  }

  const handleKeyPress = (e) => {
(e.keyCode === 13 && !isSubmitDisabled) &&
      signIn(formData.email, formData.pass, setIsUserLogged, setUserId, setSavedMarker, redirectAfterLogin, setUserData)
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
  }

  useEffect(() => {
    function checkFields() {
      if(validateEmail(formData.email)){
      if(formData.email !== ''  && formData.pass.length >= 6){
        setIsSubmitDisabled(false)
      }else{
        setIsSubmitDisabled(true);
      }
    }
    }

    checkFields();
  },[formData])

  return (
    <Row>
      <Form>
        <Form.Control
        autoFocus
          type="email"
          placeholder="Dirección de e-mail..."
          className="main-font"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        ></Form.Control>
        <br />
        
      <InputPassword placeholder="Contraseña..."
          required
          value={formData.pass}
          onChange={handleChange}
          handleKeyPress={handleKeyPress}
          name="pass"/>
      <Button
        className="back-quaternary secondary-font fw-bold"
        style={{ border: 'none', marginBottom: '10px', width: "100%" }}
        disabled={isSubmitDisabled}
        onClick={() => signIn(formData.email, formData.pass, setIsUserLogged, setUserId, setSavedMarker, redirectAfterLogin, setUserData)}      
      >
        Iniciar sesión
      </Button>
      <br/>
      <p>
        No estás registrad@? <Link to="/crear-usuario">Creá una cuenta</Link>
      </p>
      </Form>

    </Row>
  );
}
