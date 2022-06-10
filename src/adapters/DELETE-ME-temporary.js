export const removePet = (
  idMascota,
  idUsuario,
  tipoDeCambio,
  userData,
  setUserData,
  pets,
  setPets
) => {
  const userRef = doc(db, 'usuarios', idUsuario);
  const petRef = doc(db, 'mascotas', idMascota);
  updateDoc(userRef, {
    [tipoDeCambio[0]]: arrayRemove(idMascota),
  }).then((res) => {
    const prevUserData = { ...userData };
    let newArray = [];
    tipoDeCambio[0] === 'vistas'
      ? (newArray = prevUserData.vistas.filter((pet) => pet !== idMascota))
      : (newArray = prevUserData.guardadas.filter((pet) => pet !== idMascota));
    setUserData({
      ...prevUserData,
      [tipoDeCambio[0]]: [...newArray],
    });
  });
  updateDoc(petRef, {
    [tipoDeCambio[1]]: arrayRemove(idUsuario),
  })
    .then((res) => {
      const prevPets = [...pets];
      tipoDeCambio[0] === 'vistas'
        ? prevPets.map((pet) => {
            pet.data.idMascota === idMascota &&
              pet.data.vistaPor.splice(pet.data.vistaPor.indexOf(idUsuario), 1);
          })
        : prevPets.map((pet) => {
            pet.data.idMascota === idMascota &&
              pet.data.guardadaPor.splice(
                pet.data.guardadaPor.indexOf(idUsuario),
                1
              );
          });
      setPets([...prevPets]);
    })
    .catch((e) =>
      alert('No se pudo guardar la mascota, intentá nuevamente! ' + e)
    );
};

//Das neue

export const removePet = (
  idMascota,
  idUsuario,
  tipoDeCambio,
  userData,
  setUserData,
  pets,
  setPets
) => {
  const userRef = doc(db, 'usuarios', idUsuario);
  const petRef = doc(db, 'mascotas', idMascota);
  updateDoc(userRef, {
    [tipoDeCambio[0]]: arrayRemove(idMascota),
  }).then((res) => {
    const prevUserData = { ...userData };
    let newArray = [];
    tipoDeCambio[0] === 'vistas'
      ? (newArray = prevUserData.vistas.filter((pet) => pet !== idMascota))
      : (newArray = prevUserData.guardadas.filter((pet) => pet !== idMascota));
    setUserData({
      ...prevUserData,
      [tipoDeCambio[0]]: [...newArray],
    });
  });
  updateDoc(petRef, {
    [tipoDeCambio[1]]: arrayRemove(idUsuario),
  })
    .then((res) => {
      const prevPets = [...pets];
      tipoDeCambio[0] === 'vistas'
        ? prevPets
            .find((pet) => pet.data.idMascota === idMascota)
            .vistaPor.splice(pet.data.vistaPor.indexOf(idUsuario), 1)
        : prevPets
            .find((pet) => pet.data.idMascota === idMascota)
            .guardadaPor.splice(pet.data.vistaPor.indexOf(idUsuario), 1);
      setPets([...prevPets]);
    })
    .catch((e) =>
      alert('No se pudo guardar la mascota, intentá nuevamente! ' + e)
    );
};
