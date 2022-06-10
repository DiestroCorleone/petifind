import React from 'react';
import Pet from './Pet';

export default function RenderPets(props) {
  const pets = props.pets;

  const renderPets = props.pets.map((pet) => {
    return (
      <Pet
        key={pet.idMascota}
        id={pet.idMascota}
        nombre={pet.nombre}
        fechaExtravio={pet.fechaExtravio}
        zona={pet.zona}
        raza={pet.raza}
        imagen={pet.imagen}
        detalles={pet.detalles}
        guardadaPor={pet.guardadaPor}
        vistaPor={pet.vistaPor}
        encontradaPor={pet.encontradaPor}
      />
    );
  });

  return <>{renderPets}</>;
}
