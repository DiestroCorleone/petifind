import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { nanoid } from 'nanoid';
import { db, storage, authentication as auth } from '../lib/init-firebase';

export const createUser = (email, password, usuario, redirectAfterRegister) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      setDoc(doc(db, 'usuarios', user.uid), {
        id: user.uid,
        nombreUsuario: usuario,
        lon: '',
        lat: '',
        zona: '',
        vistas: [],
        guardadas: [],
        mascotasCreadas: [],
        telefonos: [],
        imagenPerfil: '',
        usuariosSolicitados: [],
        usuariosPendientes: [],
        usuariosAceptadosEnviados: [],
        usuariosAceptadosRecibidos: [],
        encontradasEnviadas: [],
        encontradasEnviadasAprobadas: [],
        encontradasRecibidas: [],
        encontradasRecibidasAprobadas: [],
        encontradasPorMi: [],
        encontradasParaMi: [],
      })
        .then((response) => {
          alert('Usuario creado correctamente!');
          redirectAfterRegister();
        })
        .catch((e) => alert('Error creando usuario, intentá nuevamente: ' + e));
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Error de registro' + error.code + ' | ' + error.message);
    });
};

export const savePet = (
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
    [tipoDeCambio[0]]: arrayUnion(idMascota),
  })
    .then((res) => {
      const prevUserData = { ...userData };
      tipoDeCambio[0] === 'vistas'
        ? setUserData({
            ...prevUserData,
            vistas: [...prevUserData.vistas, idMascota],
          })
        : setUserData({
            ...prevUserData,
            guardadas: [...prevUserData.guardadas, idMascota],
          });
      updateDoc(petRef, {
        [tipoDeCambio[1]]: arrayUnion(idUsuario),
      }).then((res) => {
        const prevPets = [...pets];
        tipoDeCambio[0] === 'vistas'
          ? prevPets.map((pet) => {
              pet.data.idMascota === idMascota &&
                pet.data.vistaPor.push(idUsuario);
            })
          : prevPets.map((pet) => {
              pet.data.idMascota === idMascota &&
                pet.data.guardadaPor.push(idUsuario);
            });
        setPets([...prevPets]);
      });
    })
    .catch((e) =>
      alert('No se pudo guardar la mascota, intentá nuevamente! ' + e)
    );
};

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
      let prevPets = [...pets];
      if (tipoDeCambio[0] === 'vistas') {
        for (let pet in prevPets) {
          prevPets[pet].data.idMascota === idMascota &&
            prevPets[pet].data.vistaPor.splice(
              prevPets[pet].data.vistaPor.indexOf(idUsuario),
              1
            );
        }
      } else {
        if (tipoDeCambio[0] === 'guardadas') {
          for (let pet in prevPets) {
            prevPets[pet].data.idMascota === idMascota &&
              prevPets[pet].data.guardadaPor.splice(
                prevPets[pet].data.guardadaPor.indexOf(idUsuario),
                1
              );
          }
        } else {
          for (let pet in prevPets) {
            prevPets[pet].data.idMascota === idMascota &&
              prevPets[pet].data.vistaPor.splice(
                prevPets[pet].data.vistaPor.indexOf(idUsuario),
                1
              );
          }
        }
      }
      setPets([...prevPets]);
    })
    .catch((e) =>
      alert('No se pudo guardar la mascota, intentá nuevamente! ' + e)
    );
};

export const signIn = (
  email,
  password,
  setIsUserLogged,
  setUserId,
  setSavedMarker,
  redirectAfterLogin,
  setUserData
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      if (user) {
        setIsUserLogged(true);
        setUserId(user.uid);

        const userRef = doc(db, 'usuarios', user.uid);
        getDoc(userRef).then((res) => {
          setSavedMarker({
            lon: res.data().lon,
            lat: res.data().lat,
            place: res.data().zona,
          });
          setUserData({
            nombreUsuario: res.data().nombreUsuario,
            telefonos: res.data().telefonos,
            imagenPerfil: res.data().imagenPerfil,
            mascotasReportadas: res.data().mascotasCreadas,
            usuariosAceptadosEnviados: res.data().usuariosAceptadosEnviados,
            usuariosAceptadosRecibidos: res.data().usuariosAceptadosRecibidos,
            usuariosPendientes: res.data().usuariosPendientes,
            usuariosSolicitados: res.data().usuariosSolicitados,
            guardadas: res.data().guardadas,
            vistas: res.data().vistas,
            encontradasEnviadas: res.data().encontradasEnviadas,
            encontradasRecibidas: res.data().encontradasRecibidas,
            encontradasEnviadasAprobadas:
              res.data().encontradasEnviadasAprobadas,
            encontradasRecibidasAprobadas:
              res.data().encontradasRecibidasAprobadas,
            encontradasPorMi: res.data().encontradasPorMi,
            encontradasParaMi: res.data().encontradasParaMi,
          });
          redirectAfterLogin();
        });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(
        'Error de logueo' +
          error.code +
          ' | ' +
          error.message +
          '. Por favor intentá nuevamente'
      );
    });
};

export const signOutAccount = (setIsUserLogged, setUserId, setUserData) => {
  signOut(auth)
    .then(() => {
      setIsUserLogged(false);
      setUserId('');
      setUserData({});
      alert('Deslogueado correctamente.');
    })
    .catch((e) => console.log('Error ' + e));
};

export const getPets = (setLoading, setPets, id) => {
  const q = query(collection(db, 'mascotas'), where('idCreador', '==', id));
  try {
    const getMyPets = async () => {
      setLoading(true);
      const res = await getDocs(q);
      const allPets = res.docs.map((doc) => ({ ...doc.data() }));
      setPets(allPets);
      setLoading(false);
    };
    getMyPets();
  } catch (e) {
    console.log('Error en getMyPets: ' + e);
  }
};

export const getSinglePet = (id) => {
  const petRef = doc(db, 'mascotas', id);
  getDoc(petRef)
    .then((res) => console.log('Fetch en getSinglePet: ' + res.data().nombre))
    .catch((e) => console.log('Error firestore: ' + e));
};

export const getPetsByZone = (setLoading, setPets, selectedZone) => {
  setLoading(true);
  const petsRef = collection(db, 'mascotas');
  getDocs(petsRef)
    .then((res) => {
      const allPets = res.docs.map((pet) => ({
        data: pet.data(),
      }));
      setPets(allPets.filter((pet) => pet.data.zona === selectedZone));
      setLoading(false);
    })
    .catch((e) => console.error('Error: ' + e));
};

export const handleSelectZone = (
  id,
  selectedLon,
  selectedLat,
  selectedZone
) => {
  if (selectedZone !== '') {
    const userRef = doc(db, 'usuarios', id);
    updateDoc(userRef, {
      lon: selectedLon,
      lat: selectedLat,
      zona: selectedZone,
    }).then(
      alert(
        'Zona guardada! Verás mascotas extraviadas cerca de ' +
          selectedZone +
          '.'
      )
    );
  }
};

export const updateUserData = (
  field,
  id,
  handleModal,
  setUserData,
  userData
) => {
  if (!field) {
    alert('Ingresá el dato a actualizar');
  } else {
    const userRef = doc(db, 'usuarios', id);
    updateDoc(userRef, {
      [Object.keys(field)[0]]:
        Object.keys(field)[0] === 'telefonos'
          ? arrayUnion(Object.values(field)[0])
          : Object.values(field)[0],
    })
      .then((res) => {
        const prevUserData = { ...userData };
        if (Object.keys(field)[0] === 'telefonos') {
          setUserData({
            ...prevUserData,
            telefonos: [...prevUserData.telefonos, Object.values(field)[0]],
          });
        } else {
          setUserData({
            ...prevUserData,
            [Object.keys(field)[0]]: Object.values(field)[0],
          });
        }
        handleModal();
        alert(Object.keys(field)[0] + ' actualizado correctamente!');
      })
      .catch((e) =>
        alert(
          'No se pudo actualizar ' +
            Object.keys(field)[0] +
            ', intentá nuevamente.'
        )
      );
  }
};

export const updateProfilePhoto = (
  file,
  id,
  handleModal,
  setUserData,
  userData
) => {
  if (file == null) {
    alert('Seleccioná una imagen para subir');
    return;
  } else {
    const fileName = file.name.replace(/\s/g, '');
    const completeName = `${id}${fileName}`;
    const imageRef = ref(storage, `imagenes-perfil/${completeName}`);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        const userRef = doc(db, 'usuarios', id);
        updateDoc(userRef, {
          imagenPerfil: downloadURL,
        })
          .then((res) => {
            const prevUserData = { ...userData };
            setUserData({
              ...prevUserData,
              imagenPerfil: downloadURL,
            });
            handleModal();
            alert('Imagen de perfil actualizada correctamente!');
          })
          .catch((e) =>
            alert(
              'No se pudo cargar la imagen de perfil, intentá nuevamente.' + e
            )
          );
      });
  }
};

export const handleSubmitPet = (
  usuarioCreador,
  nombreMascota,
  razaMascota,
  esMestizo,
  fechaExtravioMascota,
  zonaMascota,
  file,
  detallesMascota,
  clearForm,
  nombreUsuarioCreador
) => {
  if (file == null) {
    alert('Seleccioná una imagen para subir');
    return;
  } else {
    const fileName = file.name.replace(/\s/g, '');
    const imageRef = ref(storage, `imagenes-mascotas/${fileName}`);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        const id = nanoid();
        const fullRaza = `${razaMascota} ${esMestizo && 'mestiz@'}`;
        const nuevoIdMascota = id + '' + nombreMascota;
        setDoc(doc(db, 'mascotas', nuevoIdMascota), {
          idMascota: nuevoIdMascota,
          idCreador: usuarioCreador,
          nombreUsuarioCreador: nombreUsuarioCreador,
          nombre: nombreMascota,
          raza: fullRaza,
          fechaExtravio: fechaExtravioMascota,
          zona: zonaMascota,
          imagen: downloadURL,
          detalles: detallesMascota,
          vistaPor: [],
          guardadaPor: [],
          encontradaPor: [],
        })
          .then((response) => {
            const userRef = doc(db, 'usuarios', usuarioCreador);

            updateDoc(userRef, {
              mascotasCreadas: arrayUnion(nuevoIdMascota),
            });

            clearForm();
            alert('Mascota cargada correctamente!');
          })
          .catch((error) => {
            alert('Error cargando mascota: ' + error);
          });
      });
  }
};

export const formatDate = (date) => {
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  const dateToFormat = new Date(date);
  return [
    padTo2Digits(dateToFormat.getDate()),
    padTo2Digits(dateToFormat.getMonth() + 1),
    dateToFormat.getFullYear(),
  ].join('/');
};

export const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(email);
};

export const sendMessageRequest = (
  idEnvia,
  idRecibe,
  idMascota,
  nombreUsuarioCreador,
  nombreMascota,
  imagenMascota,
  setUserData,
  userData
) => {
  const senderUserRef = doc(db, 'usuarios', idEnvia);
  const receiverUserRef = doc(db, 'usuarios', idRecibe);

  updateDoc(senderUserRef, {
    usuariosSolicitados: arrayUnion({
      idSolicitante: idRecibe,
      nombreUsuario: nombreUsuarioCreador,
      idMascota: idMascota,
      nombreMascota: nombreMascota,
      imagenMascota: imagenMascota,
    }),
  })
    .then((res) => {
      updateDoc(receiverUserRef, {
        usuariosPendientes: arrayUnion({
          idSolicitante: idEnvia,
          nombreUsuario: userData.nombreUsuario,
          idMascota: idMascota,
          nombreMascota: nombreMascota,
          imagenMascota: imagenMascota,
        }),
      }).then((res) => {
        alert(
          'Se envió la solicitud de mensaje, recibirás una notificación cuando sea aceptada.'
        );
        const prevUserData = { ...userData };
        setUserData({
          ...prevUserData,
          usuariosSolicitados: [
            ...prevUserData.usuariosSolicitados,
            {
              idSolicitante: idRecibe,
              nombreUsuario: nombreUsuarioCreador,
              idMascota: idMascota,
              nombreMascota: nombreMascota,
              imagenMascota: imagenMascota,
            },
          ],
        });
      });
    })
    .catch((e) => alert('Error enviando solicitud de mensaje: ' + e));
};

export const approveMessageRequest = (
  idEnvia,
  idRecibe,
  nombreUsuario,
  idMascota,
  nombreMascota,
  imagenMascota,
  setUserData,
  userData
) => {
  const senderUserRef = doc(db, 'usuarios', idEnvia);
  const receiverUserRef = doc(db, 'usuarios', idRecibe);

  updateDoc(senderUserRef, {
    usuariosAceptadosRecibidos: arrayUnion({
      idSolicitante: idRecibe,
      nombreUsuario: nombreUsuario,
      idMascota: idMascota,
      nombreMascota: nombreMascota,
      imagenMascota: imagenMascota,
    }),
  })
    .then((res) => {
      updateDoc(receiverUserRef, {
        usuariosAceptadosEnviados: arrayUnion({
          idSolicitante: idEnvia,
          nombreUsuario: userData.nombreUsuario,
          idMascota: idMascota,
          nombreMascota: nombreMascota,
          imagenMascota: imagenMascota,
        }),
      }).then((res) => {
        alert(
          'Se aprobó la solicitud de mensaje, ahora el usuario podrá ponerse en contacto con vos.'
        );
        removeFromArray(
          idEnvia,
          idMascota,
          idRecibe,
          nombreUsuario,
          imagenMascota,
          nombreMascota,
          'usuariosPendientes'
        );
        removeFromArray(
          idRecibe,
          idMascota,
          idEnvia,
          userData.nombreUsuario,
          imagenMascota,
          nombreMascota,
          'usuariosSolicitados'
        );
        const prevUserData = { ...userData };

        let aceptado = prevUserData.usuariosPendientes.filter(
          (pendiente) => pendiente.idMascota === idMascota
        );

        setUserData({
          ...prevUserData,
          usuariosAceptadosRecibidos: [
            ...prevUserData.usuariosAceptadosRecibidos,
            aceptado[0],
          ],
          usuariosPendientes: prevUserData.usuariosPendientes.filter(
            (pendiente) => pendiente.idMascota !== idMascota
          ),
        });
      });
    })
    .catch((e) => alert('Error aprobando solicitud de mensaje: ' + e));
};

// Found Pet Functions

export const foundPetRequest = (
  idEnvia,
  idRecibe,
  idMascota,
  nombreUsuarioCreador,
  nombreMascota,
  imagenMascota,
  setUserData,
  userData,
  detalles
) => {
  if (imagenMascota == null) {
    alert('Seleccioná una imagen para subir');
    return;
  } else {
    const fileName = imagenMascota.name.replace(/\s/g, '');
    const imageRef = ref(storage, `imagenes-mascotas-encontradas/${fileName}`);
    uploadBytes(imageRef, imagenMascota)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        const senderUserRef = doc(db, 'usuarios', idEnvia);
        const receiverUserRef = doc(db, 'usuarios', idRecibe);

        updateDoc(senderUserRef, {
          encontradasEnviadas: arrayUnion({
            idSolicitante: idRecibe,
            nombreUsuario: nombreUsuarioCreador,
            idMascota: idMascota,
            nombreMascota: nombreMascota,
            imagenMascota: downloadURL,
            detalles: detalles,
          }),
        })
          .then((res) => {
            updateDoc(receiverUserRef, {
              encontradasRecibidas: arrayUnion({
                idSolicitante: idEnvia,
                nombreUsuario: userData.nombreUsuario,
                idMascota: idMascota,
                nombreMascota: nombreMascota,
                imagenMascota: downloadURL,
                detalles: detalles,
              }),
            }).then((res) => {
              alert(
                'Se envió la solicitud de mensaje por mascota encontrada, recibirás una notificación cuando sea aceptada.'
              );
              const prevUserData = { ...userData };
              setUserData({
                ...prevUserData,
                encontradasEnviadas: [
                  ...prevUserData.encontradasEnviadas,
                  {
                    idSolicitante: idRecibe,
                    nombreUsuario: nombreUsuarioCreador,
                    idMascota: idMascota,
                    nombreMascota: nombreMascota,
                    imagenMascota: downloadURL,
                    detalles: detalles,
                  },
                ],
              });
            });
          })
          .catch((e) => alert('Error enviando solicitud de mensaje: ' + e));
      });
  }
};

export const testApproved = (userData) => {
  console.log(userData);
};

export const approveFoundPetRequest = (
  idEnvia,
  idRecibe,
  nombreUsuario,
  idMascota,
  nombreMascota,
  imagenMascota,
  setUserData,
  userData,
  detalles
) => {
  const senderUserRef = doc(db, 'usuarios', idEnvia);
  const receiverUserRef = doc(db, 'usuarios', idRecibe);

  updateDoc(senderUserRef, {
    encontradasRecibidasAprobadas: arrayUnion({
      idSolicitante: idRecibe,
      nombreUsuario: nombreUsuario,
      idMascota: idMascota,
      nombreMascota: nombreMascota,
      imagenMascota: imagenMascota,
      detalles: detalles,
    }),
  })
    .then((res) => {
      updateDoc(receiverUserRef, {
        encontradasEnviadasAprobadas: arrayUnion({
          idSolicitante: idEnvia,
          nombreUsuario: userData.nombreUsuario,
          idMascota: idMascota,
          nombreMascota: nombreMascota,
          imagenMascota: imagenMascota,
          detalles: detalles,
        }),
      }).then((res) => {
        alert(
          'Se aprobó la solicitud de mensaje, ahora el usuario podrá ponerse en contacto con vos.'
        );
        removeFromArray(
          idEnvia,
          idMascota,
          idRecibe,
          nombreUsuario,
          imagenMascota,
          nombreMascota,
          'encontradasRecibidas',
          detalles
        );
        removeFromArray(
          idRecibe,
          idMascota,
          idEnvia,
          userData.nombreUsuario,
          imagenMascota,
          nombreMascota,
          'encontradasEnviadas',
          detalles
        );
        const prevUserData = { ...userData };

        let aceptado = prevUserData.encontradasRecibidas.filter(
          (recibida) => recibida.idMascota === idMascota
        );

        setUserData({
          ...prevUserData,
          encontradasRecibidasAprobadas: [
            ...prevUserData.encontradasRecibidasAprobadas,
            aceptado[0],
          ],
          encontradasRecibidas: prevUserData.encontradasRecibidas.filter(
            (pendiente) => pendiente.idMascota !== idMascota
          ),
        });
      });
    })
    .catch((e) =>
      alert('Error aprobando solicitud de mensaje de mascota encontrada: ' + e)
    );
};

export const markPetAsFound = (
  idEnvia,
  idRecibe,
  nombreUsuario,
  idMascota,
  nombreMascota,
  imagenMascota,
  setUserData,
  userData,
  detalles
) => {
  const senderUserRef = doc(db, 'usuarios', idEnvia);
  const receiverUserRef = doc(db, 'usuarios', idRecibe);
  const petRef = doc(db, 'mascotas', idMascota);

  updateDoc(senderUserRef, {
    encontradasParaMi: arrayUnion({
      idSolicitante: idRecibe,
      nombreUsuario: nombreUsuario,
      idMascota: idMascota,
      nombreMascota: nombreMascota,
      imagenMascota: imagenMascota,
      detalles: detalles,
    }),
  })
    .then((res) => {
      updateDoc(receiverUserRef, {
        encontradasPorMi: arrayUnion({
          idSolicitante: idEnvia,
          nombreUsuario: userData.nombreUsuario,
          idMascota: idMascota,
          nombreMascota: nombreMascota,
          imagenMascota: imagenMascota,
          detalles: detalles,
        }),
      }).then((res) => {
        updateDoc(petRef, {
          encontradaPor: idRecibe,
        });
        alert(
          'La mascota fue encontrada! Nos alegramos mucho de que haya vuelto con su familia :)'
        );
        removeFromArray(
          idEnvia,
          idMascota,
          idRecibe,
          nombreUsuario,
          imagenMascota,
          nombreMascota,
          'encontradasRecibidasAprobadas',
          detalles
        );
        removeFromArray(
          idRecibe,
          idMascota,
          idEnvia,
          userData.nombreUsuario,
          imagenMascota,
          nombreMascota,
          'encontradasEnviadasAprobadas',
          detalles
        );
        const prevUserData = { ...userData };

        let aceptado = prevUserData.encontradasRecibidasAprobadas.filter(
          (recibida) => recibida.idMascota === idMascota
        );

        setUserData({
          ...prevUserData,
          encontradasParaMi: [...prevUserData.encontradasParaMi, aceptado[0]],
          encontradasRecibidasAprobadas:
            prevUserData.encontradasRecibidasAprobadas.filter(
              (pendiente) => pendiente.idMascota !== idMascota
            ),
        });
      });
    })
    .catch((e) => alert('Error marcando mascota como encontrada: ' + e));
};

//General array functions

export const removeFromArray = (
  userId,
  idMascota,
  idSolicitante,
  nombreUsuario,
  imagenMascota,
  nombreMascota,
  nombreDelArray,
  detalles
) => {
  const userRef = doc(db, 'usuarios', userId);
  if (detalles) {
    updateDoc(userRef, {
      [nombreDelArray]: arrayRemove({
        idMascota: idMascota,
        idSolicitante: idSolicitante,
        nombreUsuario: nombreUsuario,
        imagenMascota: imagenMascota,
        nombreMascota: nombreMascota,
        detalles: detalles,
      }),
    })
      .then((res) =>
        console.log(
          `Solicitud elminada! ${nombreDelArray} | ${idMascota} | ${idSolicitante} | ${nombreUsuario} | ${nombreDelArray} | ${imagenMascota} | ${nombreMascota}| ${nombreUsuario}`
        )
      )
      .catch((e) =>
        console.log('Error eliminando solicitud, intentá nuevamente! ' + e)
      );
  } else {
    updateDoc(userRef, {
      [nombreDelArray]: arrayRemove({
        idMascota: idMascota,
        idSolicitante: idSolicitante,
        nombreUsuario: nombreUsuario,
        imagenMascota: imagenMascota,
        nombreMascota: nombreMascota,
      }),
    })
      .then((res) =>
        console.log(
          `Solicitud elminada! ${nombreDelArray} | ${idMascota} | ${idSolicitante} | ${nombreUsuario} | ${nombreDelArray} | ${imagenMascota} | ${nombreMascota}| ${nombreUsuario}`
        )
      )
      .catch((e) =>
        console.log('Error eliminando solicitud, intentá nuevamente! ' + e)
      );
  }
};

// export const removeFromArray = (
//   userId,
//   idMascota,
//   idSolicitante,
//   nombreUsuario,
//   imagenMascota,
//   nombreMascota,
//   nombreDelArray,
//   detalles
// ) => {
//   const userRef = doc(db, 'usuarios', userId);
//   updateDoc(userRef, {
//     [nombreDelArray]: arrayRemove({
//       idMascota: idMascota,
//       idSolicitante: idSolicitante,
//       nombreUsuario: nombreUsuario,
//       imagenMascota: imagenMascota,
//       nombreMascota: nombreMascota,
//     }),
//   })
//     .then((res) =>
//       console.log(
//         `Solicitud elminada! ${nombreDelArray} | ${idMascota} | ${idSolicitante} | ${nombreUsuario} | ${nombreDelArray} | ${imagenMascota} | ${nombreMascota}| ${nombreUsuario}`
//       )
//     )
//     .catch((e) =>
//       console.log('Error eliminando solicitud, intentá nuevamente! ' + e)
//     );
// };

// export const deleteMessageRequest = (
//   userId,
//   idMascota,
//   idSolicitante,
//   nombreUsuario,
//   imagenMascota,
//   nombreMascota,
//   nombreDelArrayEmisor,
//   nombreDelArrayReceptor,
//   userData,
//   setUserData
// ) => {
//   try {
//     //Eliminamos del emisor
//     removeFromArray(
//       userId,
//       idMascota,
//       idSolicitante,
//       nombreUsuario,
//       imagenMascota,
//       nombreMascota,
//       nombreDelArrayEmisor
//     );
//     //Eliminamos del repceptor
//     removeFromArray(
//       idSolicitante,
//       idMascota,
//       userId,
//       userData.nombreUsuario,
//       imagenMascota,
//       nombreMascota,
//       nombreDelArrayReceptor
//     );
//   } catch (e) {
//     alert('Error eliminando solicitud: ' + e);
//   } finally {
//     const prevUserData = { ...userData };

//     setUserData({
//       ...prevUserData,
//       usuariosPendientes: prevUserData.usuariosPendientes.filter(
//         (pendiente) => pendiente.idMascota !== idMascota
//       ),
//     });

//     alert('Solicitud de contacto eliminada!');
//   }
// };

export const deleteMessageRequest = (
  userId,
  idMascota,
  idSolicitante,
  nombreUsuario,
  imagenMascota,
  nombreMascota,
  nombreDelArrayEmisor,
  nombreDelArrayReceptor,
  userData,
  setUserData,
  detalles
) => {
  try {
    if (detalles) {
      //Eliminamos del emisor
      removeFromArray(
        userId,
        idMascota,
        idSolicitante,
        nombreUsuario,
        imagenMascota,
        nombreMascota,
        nombreDelArrayEmisor,
        detalles
      );
      //Eliminamos del repceptor
      removeFromArray(
        idSolicitante,
        idMascota,
        userId,
        userData.nombreUsuario,
        imagenMascota,
        nombreMascota,
        nombreDelArrayReceptor,
        detalles
      );
    } else {
      //Eliminamos del emisor
      removeFromArray(
        userId,
        idMascota,
        idSolicitante,
        nombreUsuario,
        imagenMascota,
        nombreMascota,
        nombreDelArrayEmisor
      );
      //Eliminamos del repceptor
      removeFromArray(
        idSolicitante,
        idMascota,
        userId,
        userData.nombreUsuario,
        imagenMascota,
        nombreMascota,
        nombreDelArrayReceptor
      );
    }
  } catch (e) {
    alert('Error eliminando solicitud: ' + e);
  } finally {
    const prevUserData = { ...userData };
    if (detalles) {
      setUserData({
        ...prevUserData,
        encontradasRecibidas: prevUserData.encontradasRecibidas.filter(
          (pendiente) => pendiente.idMascota !== idMascota
        ),
      });
    } else {
      setUserData({
        ...prevUserData,
        usuariosPendientes: prevUserData.usuariosPendientes.filter(
          (pendiente) => pendiente.idMascota !== idMascota
        ),
      });
    }

    alert('Solicitud de contacto eliminada!');
  }
};

export const deleteSentMessageRequest = (
  userId,
  idMascota,
  idSolicitante,
  nombreUsuario,
  imagenMascota,
  nombreMascota,
  nombreDelArrayEmisor,
  nombreDelArrayReceptor,
  userData,
  setUserData,
  detalles
) => {
  try {
    if (detalles) {
      //Eliminamos del emisor
      removeFromArray(
        userId,
        idMascota,
        idSolicitante,
        nombreUsuario,
        imagenMascota,
        nombreMascota,
        nombreDelArrayReceptor,
        detalles
      );
      //Eliminamos del repceptor
      removeFromArray(
        idSolicitante,
        idMascota,
        userId,
        userData.nombreUsuario,
        imagenMascota,
        nombreMascota,
        nombreDelArrayEmisor,
        detalles
      );
    } else {
      //Eliminamos del emisor
      removeFromArray(
        userId,
        idMascota,
        idSolicitante,
        nombreUsuario,
        imagenMascota,
        nombreMascota,
        nombreDelArrayReceptor
      );
      //Eliminamos del repceptor
      removeFromArray(
        idSolicitante,
        idMascota,
        userId,
        userData.nombreUsuario,
        imagenMascota,
        nombreMascota,
        nombreDelArrayEmisor
      );
    }
  } catch (e) {
    alert('Error eliminando solicitud: ' + e);
  } finally {
    const prevUserData = { ...userData };
    if (detalles) {
      setUserData({
        ...prevUserData,
        encontradasEnviadas: prevUserData.encontradasEnviadas.filter(
          (pendiente) => pendiente.idMascota !== idMascota
        ),
      });
    } else {
      setUserData({
        ...prevUserData,
        usuariosSolicitados: prevUserData.usuariosSolicitados.filter(
          (pendiente) => pendiente.idMascota !== idMascota
        ),
      });
    }

    alert('Solicitud de contacto eliminada!');
  }
};

// export const deleteApprovedMessageRequest = (
//   userId,
//   idMascota,
//   idSolicitante,
//   nombreUsuario,
//   imagenMascota,
//   nombreMascota,
//   nombreDelArrayEmisor,
//   nombreDelArrayReceptor,
//   userData,
//   setUserData,
//   detalles
// ) => {
//   try {
//     //Eliminamos del emisor
//     removeFromArray(
//       userId,
//       idMascota,
//       idSolicitante,
//       nombreUsuario,
//       imagenMascota,
//       nombreMascota,
//       nombreDelArrayReceptor
//     );
//     //Eliminamos del repceptor
//     removeFromArray(
//       idSolicitante,
//       idMascota,
//       userId,
//       userData.nombreUsuario,
//       imagenMascota,
//       nombreMascota,
//       nombreDelArrayEmisor
//     );
//   } catch (e) {
//     alert('Error eliminando solicitud: ' + e);
//   } finally {
//     const prevUserData = { ...userData };

//     if (nombreDelArrayReceptor === 'usuariosAceptadosRecibidos') {
//       setUserData({
//         ...prevUserData,
//         usuariosAceptadosRecibidos:
//           prevUserData.usuariosAceptadosRecibidos.filter(
//             (pendiente) => pendiente.idMascota !== idMascota
//           ),
//       });
//     } else {
//       setUserData({
//         ...prevUserData,
//         usuariosAceptadosEnviados:
//           prevUserData.usuariosAceptadosEnviados.filter(
//             (pendiente) => pendiente.idMascota !== idMascota
//           ),
//       });
//     }

//     alert('Solicitud de contacto eliminada!');
//   }
// };

export const deleteApprovedMessageRequest = (
  userId,
  idMascota,
  idSolicitante,
  nombreUsuario,
  imagenMascota,
  nombreMascota,
  nombreDelArrayEmisor,
  nombreDelArrayReceptor,
  userData,
  setUserData,
  detalles
) => {
  try {
    if (detalles) {
      //Eliminamos del emisor
      removeFromArray(
        userId,
        idMascota,
        idSolicitante,
        nombreUsuario,
        imagenMascota,
        nombreMascota,
        nombreDelArrayReceptor,
        detalles
      );
      //Eliminamos del repceptor
      removeFromArray(
        idSolicitante,
        idMascota,
        userId,
        userData.nombreUsuario,
        imagenMascota,
        nombreMascota,
        nombreDelArrayEmisor,
        detalles
      );
    } else {
      //Eliminamos del emisor
      removeFromArray(
        userId,
        idMascota,
        idSolicitante,
        nombreUsuario,
        imagenMascota,
        nombreMascota,
        nombreDelArrayReceptor
      );
      //Eliminamos del repceptor
      removeFromArray(
        idSolicitante,
        idMascota,
        userId,
        userData.nombreUsuario,
        imagenMascota,
        nombreMascota,
        nombreDelArrayEmisor
      );
    }
  } catch (e) {
    alert('Error eliminando solicitud: ' + e);
  } finally {
    const prevUserData = { ...userData };

    if (detalles) {
      setUserData({
        ...prevUserData,
        encontradasRecibidasAprobadas:
          prevUserData.encontradasRecibidasAprobadas.filter(
            (pendiente) => pendiente.idMascota !== idMascota
          ),
      });
    } else {
      if (nombreDelArrayReceptor === 'usuariosAceptadosRecibidos') {
        setUserData({
          ...prevUserData,
          usuariosAceptadosRecibidos:
            prevUserData.usuariosAceptadosRecibidos.filter(
              (pendiente) => pendiente.idMascota !== idMascota
            ),
        });
      } else {
        setUserData({
          ...prevUserData,
          usuariosAceptadosEnviados:
            prevUserData.usuariosAceptadosEnviados.filter(
              (pendiente) => pendiente.idMascota !== idMascota
            ),
        });
      }
    }

    alert('Solicitud de contacto eliminada!');
  }
};

export const getContactInfo = (id, setPhoneNumbers) => {
  const userRef = doc(db, 'usuarios', id);
  getDoc(userRef)
    .then((res) => {
      setPhoneNumbers(res.data().telefonos);
    })
    .catch((e) => alert('Error obteniendo datos de contacto' + e));
};
