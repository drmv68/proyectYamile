export function getAndEditDataBase(valueInputNameRegister,  valueInputNameAAL, valueInputNameAA, valueInputNameJob, valueInputDate, valueInputCompany, valueInputInstalations, valueInputWorkNumber, valueSelectList) {
  const indexedDB = window.indexedDB;
  let requireDataBase = indexedDB.open('trabajadores');

  requireDataBase.addEventListener("error", errorInRequire);
  requireDataBase.addEventListener("success", startRequireDataBase);
  requireDataBase.addEventListener("upgradeneeded", upGradeBaseData);

async function startRequireDataBase(event) {
    let baseData = event.target.result;
    console.log(`base de datos cargada: ${baseData}`); 

          function getLastIdDataBase(){
            const transaction = baseData.transaction(['trabajadoresYdatos'], 'readonly');
            const colectionObjets = transaction.objectStore('trabajadoresYdatos');
            
            const request = colectionObjets.openCursor(null, 'prev'); 
            
            return new Promise((resolve, reject) => {
              request.onsuccess = function(event) {
                const cursor = event.target.result;
                if (cursor) {
                  resolve(cursor.value.id + 1); 
                } else {
                  resolve(1); 
                }
              };
          
              request.onerror = function(event) {
                reject(event.target.error);
              };
            });
          }



    try {
      const lastId = await getLastIdDataBase();
      const jober = {
        id: lastId,
        registrador: valueInputNameRegister,
        fecha: valueInputDate,
        "nombre(AAL)":  valueInputNameAAL,
        "nombre(AA)":  valueInputNameAA,
        "nombre(AE)": valueInputNameJob,
        empresa: valueInputCompany,
        instalaciones: valueInputInstalations,
        numeroTrabajo: valueInputWorkNumber,
        certificados: valueSelectList,
      };
  
      addJoberInDataBase(baseData, jober);
    } catch (error) {
      console.error('Error al obtener el último ID:', error);
    }
  }
}


function errorInRequire(event) {
  document.body.innerHTML = "Error al cargar la base de datos, contactar a Daniel R.";
  console.log(`error: ${event.code} y ${event.message}, toca solucionarlo, es en la solicitud de la base de datos local, indexedDB`);
}

function upGradeBaseData(event) {
  let createBDInTrabajadores = event.target.result;
  console.log('base de datos creada Yamilin pinguin.');

  const jobersColections = createBDInTrabajadores.createObjectStore('trabajadoresYdatos', {
      keyPath: 'id'
  });
  console.log(jobersColections);
}

function addJoberInDataBase(baseData, info){
  const transaction = baseData.transaction(['trabajadoresYdatos'], 'readwrite');
  const colectionObjets = transaction.objectStore('trabajadoresYdatos');

  const conection = colectionObjets.add(info);
}

export function addChekListoToLastJober (arrayWhitChek){
let request = indexedDB.open('trabajadores');

  request.onsuccess = function (event) {
    let db = event.target.result;

    let transaction = db.transaction(['trabajadoresYdatos'], 'readwrite');
    let objectStore = transaction.objectStore('trabajadoresYdatos');

    
    let request = objectStore.openCursor(null, 'prev');

    
    request.onsuccess = function (event) {
      let cursor = event.target.result;

      if (cursor) {
        let ultimoTrabajador = cursor.value;
        console.log('Último trabajador registrado:', ultimoTrabajador);

        for (let index = 0; index < 20; index++) {
            let itemsWhitID = `item${index + 1}`;
            ultimoTrabajador.listaDeChequeo = {
                ...ultimoTrabajador.listaDeChequeo,
                [itemsWhitID]: arrayWhitChek[index]
            };
        }      
        cursor.update(ultimoTrabajador);

      } else {
        console.log('No hay trabajadores registrados');
        }
      }
    }
}