import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { UserContext } from './context/UserContext';
import { handleSelectZone } from './adapters/FirebaseAdapters';
import Login from './components/Login';
import CreateUser from './components/formComponents/CreateUser';
import Navbar from './components/Navbar';
import CloseToMe from './components/CloseToMe';
import PetDetails from './components/petComponents/PetDetails';
import SearchPets from './components/SearchPets';
import ReportPet from './components/formComponents/ReportPet';
import Profile from './components/userComponents/Profile';
import ContactRequests from './components/userComponents/ContactRequests';
import ReportFoundPet from './components/formComponents/ReportFoundPet';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import InformError from './components/formComponents/InformError';

export default function App() {
  const [savedMarker, setSavedMarker] = useState([]);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState({
    nombreUsuario: 'Sin definir',
    mascotasReportadas: [],
    telefonos: [],
    usuariosAceptadosEnviados: [],
    usuariosAceptadosRecibidos: [],
    usuariosPendientes: [],
    usuariosSolicitados: [],
    guardadas: [],
    vistas: [],
    encontradasEnviadas: [],
    encontradasRecibidas: [],
    encontradasEnviadasAprobadas: [],
    encontradasRecibidasAprobadas: [],
    encontradasPorMi: [],
    encontradasParaMi: [],
  });
  const [isDark, setIsDark] = useState(false);
  const [justLogged, setJustLogged] = useState(false);
  // Test
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState(null);
  const [contactData, setContactData] = useState({});
  const [showContactDataModal, setShowContactDataModal] = useState(false);
  const [showFoundPetModal, setShowFoundPetModal] = useState(false);

  useEffect(() => {
    function toggleDarkMode() {
      const body = document.body;
      body.classList.toggle('lite-mode');
    }

    toggleDarkMode();
  }, [isDark]);

  useEffect(() => {
    if (userId !== '' && justLogged) {
      handleSelectZone(
        userId,
        savedMarker.lon,
        savedMarker.lat,
        savedMarker.place
      );
    }
  }, [savedMarker]);

  function handleContactDataModal(idSolicitante, nombreUsuario, nombreMascota) {
    setContactData({
      idSolicitante: idSolicitante,
      nombreUsuario: nombreUsuario,
      nombreMascota: nombreMascota,
    });
    setShowContactDataModal(
      (prevShowContactDataModal) => !prevShowContactDataModal
    );
  }

  function handleFoundPetModal() {
    setShowFoundPetModal((prevFoundPetModal) => !prevFoundPetModal);
  }

  return (
    <>
      <UserContext.Provider
        value={{
          savedMarker,
          setSavedMarker,
          isUserLogged,
          setIsUserLogged,
          userId,
          setUserId,
          setIsDark,
          isDark,
          justLogged,
          setJustLogged,
          userData,
          setUserData,
          pets,
          setPets,
          filteredPets,
          setFilteredPets,
          handleContactDataModal,
          contactData,
          setContactData,
          showContactDataModal,
          setShowContactDataModal,
          showFoundPetModal,
          setShowFoundPetModal,
          handleFoundPetModal,
        }}
      >
        {isUserLogged && <Navbar />}
        <Container>
          <Routes>
            {isUserLogged ? (
              <>
                <Route path="/cerca" element={<CloseToMe />} />
                <Route path="/buscar" element={<SearchPets />} />
                <Route path="/detalles" element={<PetDetails />} />
                <Route path="/reportar" element={<ReportPet />} />
                <Route path="/encontrada" element={<ReportFoundPet />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/solicitudes" element={<ContactRequests />} />
                <Route path="/informar-error" element={<InformError />} />
              </>
            ) : (
              <>
                {/* Borrar cuando termines */}
                <Route path="/perfil" element={<Profile />} />
                <Route path="/solicitudes" element={<ContactRequests />} />
                <Route path="/cerca" element={<CloseToMe />} />
                <Route path="/encontrada" element={<ReportFoundPet />} />
                <Route path="/informar-error" element={<InformError />} />
                {/* Borrar cuando termines */}

                <Route
                  path="/"
                  exact
                  element={<Login setIsUserLogged={setIsUserLogged} />}
                />
                <Route path="/crear-usuario" exact element={<CreateUser />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </UserContext.Provider>
    </>
  );
}
