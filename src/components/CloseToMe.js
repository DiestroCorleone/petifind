import React, { useState, useEffect, useContext } from 'react';
import { Container, Badge } from 'react-bootstrap';
import { getPetsByZone } from '../adapters/FirebaseAdapters';
import { UserContext } from '../context/UserContext';
import RenderPets from './petComponents/RenderPets';
import LoadingSpinner from './LoadingSpinner';
import ContactDataModal from './userComponents/ContactDataModal';
import FoundPetModal from './petComponents/FoundPetModal';

export default function CloseToMe() {
  // const [pets, setPets] = useState([]);
  // const [filteredPets, setFilteredPets] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    savedMarker,
    userId,
    userData,
    pets,
    setPets,
    filteredPets,
    setFilteredPets,
    contactData,
    setContactData,
    handleContactDataModal,
    showContactDataModal,
    setShowContactDataModal,
    showFoundPetModal,
    setShowFoundPetModal,
    handleFoundPetModal,
  } = useContext(UserContext);
  // const [showContactDataModal, setShowContactDataModal] = useState(false);
  // const [showFoundPetModal, setShowFoundPetModal] = useState(false);
  // const [contactData, setContactData] = useState({});
  const [title, setTitle] = useState('Cerca de mí');

  // function handleContactDataModal(idSolicitante, nombreUsuario, nombreMascota) {
  //   setContactData({
  //     idSolicitante: idSolicitante,
  //     nombreUsuario: nombreUsuario,
  //     nombreMascota: nombreMascota,
  //   });
  //   setShowContactDataModal(
  //     (prevShowContactDataModal) => !prevShowContactDataModal
  //   );
  // }

  useEffect(() => {
    getPetsByZone(setLoading, setPets, savedMarker.place);
  }, []);

  // function handleFoundPetModal() {
  //   setShowFoundPetModal((prevFoundPetModal) => !prevFoundPetModal);
  // }

  useEffect(() => {
    function updateFilteredPets() {
      const prevPets = pets;
      if (title === 'Vistas') {
        setFilteredPets(
          prevPets.filter(
            (pet) =>
              pet.data.vistaPor.includes(userId) &&
              pet.data.encontradaPor.length == 0
          )
        );
      } else if (title === 'Guardadas') {
        setFilteredPets(
          prevPets.filter(
            (pet) =>
              pet.data.guardadaPor.includes(userId) &&
              pet.data.encontradaPor.length == 0
          )
        );
      } else if (title === 'Encontradas') {
        setFilteredPets(
          prevPets.filter((pet) => pet.data.encontradaPor.length > 0)
        );
      } else if (title === 'Cerca de mí') {
        setFilteredPets(
          prevPets.filter((pet) => pet.data.encontradaPor.length == 0)
        );
      }
    }

    updateFilteredPets();
  }, [pets]);

  function filterSeenPets() {
    setTitle('Vistas');
    const prevPets = pets;
    setFilteredPets(
      prevPets.filter(
        (pet) =>
          pet.data.vistaPor.includes(userId) &&
          pet.data.encontradaPor.length == 0
      )
    );
  }

  function filterSavedPets() {
    setTitle('Guardadas');
    const prevPets = pets;
    setFilteredPets(
      prevPets.filter(
        (pet) =>
          pet.data.guardadaPor.includes(userId) &&
          pet.data.encontradaPor.length == 0
      )
    );
  }

  function filterFoundPets() {
    setTitle('Encontradas');
    const prevPets = pets;
    setFilteredPets(
      prevPets.filter((pet) => pet.data.encontradaPor.length > 0)
    );
  }

  function unfilterPets() {
    setTitle('Cerca de mí');
    setFilteredPets(null);
    getPetsByZone(setLoading, setPets, savedMarker.place);
  }

  function coso() {
    console.log(pets);
  }

  return (
    <Container
      fluid
      className="justify-content-center align-items-center h-auto"
      style={{ minHeight: '100vh' }}
    >
      <ContactDataModal
        showContactDataModal={showContactDataModal}
        handleContactDataModal={handleContactDataModal}
        contactData={contactData}
      />
      <FoundPetModal
        showFoundPetModal={showFoundPetModal}
        handleFoundPetModal={handleFoundPetModal}
      />
      <br />
      <div className="d-flex flex-row justify-content-between main-font">
        <Badge
          className="p-2 border-sm color-quaternary pointer"
          bg="back-secondary"
          onClick={() => unfilterPets()}
        >
          Cerca de mí <i className="fa-fw	fa fa-map-marker"></i>
        </Badge>
        <Badge
          className="p-2 border-sm color-quaternary pointer"
          bg="back-secondary"
          onClick={() => filterSeenPets()}
        >
          Vistas <i className="fa fa-fw fa-eye"></i>
        </Badge>
        <Badge
          className="p-2 border-sm color-quaternary pointer"
          bg="back-secondary"
          onClick={() => filterSavedPets()}
        >
          Guardadas <i className="fa-fw	fa fa-bookmark"></i>
        </Badge>
        <Badge
          className="p-2 border-sm color-quaternary pointer"
          bg="back-secondary"
          onClick={() => filterFoundPets()}
        >
          Encontradas <i className="fa-fw	fa fa-check"></i>
        </Badge>
        <Badge onClick={() => console.log(JSON.stringify(userData))}>
          Test
        </Badge>
      </div>
      <br />
      <h3>{title}</h3>
      <br />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <RenderPets
          pets={filteredPets || pets}
          prevPets={pets}
          // setPets={setFilteredPets}
          setPets={setPets}
          handleContactDataModal={handleContactDataModal}
          handleFoundPetModal={handleFoundPetModal}
        />
      )}
    </Container>
  );
}
