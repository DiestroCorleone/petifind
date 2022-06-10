import React, { useState } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';

export default function InputPassword(props) {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder={props.placeholder}
        aria-label={props.placeholder}
        aria-describedby={props.described}
        className="main-font"
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        type={showPassword ? 'text' : 'password'}
        onKeyDown={props.handleKeyPress}
      />
      <Button
        className="back-quaternary secondary-font fw-bold"
        style={{ border: 'none' }}
        onClick={() => toggleShowPassword()}
      >
        <i
          className={showPassword ? 'fa-fw fa fa-eye-slash' : 'fa-fw fa fa-eye'}
        ></i>
      </Button>
    </InputGroup>
  );
}
