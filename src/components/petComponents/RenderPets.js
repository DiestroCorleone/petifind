import React from 'react';
import Pet from './Pet';

export default function RenderPets(props) {
  const pets = props.pets;

  const renderPets = props.pets.map((pet) => {
    return (
      <Pet
        key={pet.data.idMascota}
        id={pet.data.idMascota}
        nombreUsuarioCreador={pet.data.nombreUsuarioCreador}
        nombre={pet.data.nombre}
        fechaExtravio={pet.data.fechaExtravio}
        zona={pet.data.zona}
        raza={pet.data.raza}
        imagen={pet.data.imagen}
        detalles={pet.data.detalles}
        guardadaPor={pet.data.guardadaPor}
        vistaPor={pet.data.vistaPor}
        idCreador={pet.data.idCreador}
        handleContactDataModal={props.handleContactDataModal}
        handleFoundPetModal={props.handleFoundPetModal}
        setPets={props.setPets}
        pets={pets}
        prevPets={props.prevPets}
        encontradaPor={pet.data.encontradaPor}
      />
    );
  });

  return <>{renderPets}</>;
}
