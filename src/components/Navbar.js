import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { UserContext } from '../context/UserContext';
import { signOutAccount } from '../adapters/FirebaseAdapters';

export default function NavBar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { setIsUserLogged, setUserId, setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const redirectAfterSignOut = () => {
    navigate('/');
  };

  function toggleNavbar() {
    setNavbarOpen(!navbarOpen);
  }

  return (
    <Navbar className="back-tertiary shadow fw-bold" expand="md" light>
      <NavbarBrand tag={Link} to="/cerca">
        <span className="secondary-font color-secondary">PetiFind</span>
      </NavbarBrand>
      <NavbarToggler onClick={() => toggleNavbar()} />
      <Collapse navbar isOpen={navbarOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink
              tag={Link}
              to="/cerca"
              className="color-secondary"
              onClick={() => toggleNavbar()}
              title="Cerca de mí"
            >
              Cerca de mí
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to="/buscar"
              className="color-secondary"
              onClick={() => toggleNavbar()}
              title="Buscar"
            >
              Buscar
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to="/reportar"
              className="color-secondary"
              onClick={() => toggleNavbar()}
              title="Reportar mascota extraviada"
            >
              Reportar mascota extraviada
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to="/perfil"
              className="color-secondary"
              title="Perfil"
              onClick={() => toggleNavbar()}
            >
              Perfil
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to="/solicitudes"
              className="color-secondary"
              title="Solicitudes de contacto"
              onClick={() => toggleNavbar()}
            >
              Solicitudes de contacto
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="color-secondary"
              onClick={() => {
                signOutAccount(setIsUserLogged, setUserId, setUserData),
                  redirectAfterSignOut();
              }}
              title="Cerrar sesión"
            >
              <i className="fa-fw	fa fa-sign-out"></i>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
