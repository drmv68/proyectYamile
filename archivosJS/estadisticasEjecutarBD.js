const dbName = 'trabajadores';
const storeName = 'trabajadoresYdatos';

export function calcularEstadisticas() {
    return new Promise((resolve, reject) => {
        const indexedDB = window.indexedDB;
        const request = indexedDB.open(dbName);

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction([storeName], 'readonly');
            const objectStore = transaction.objectStore(storeName);
            const requestGetAll = objectStore.getAll();

            requestGetAll.onsuccess = function (event) {
                const trabajadores = event.target.result;
                const totalTrabajadores = trabajadores.length;
                let estadisticas = {};

                for (let i = 1; i <= 20; i++) {
                    const itemKey = `item${i}`;
                    let siCount = 0;
                    let noCount = 0;
                    let naCount = 0;

                    trabajadores.forEach(trabajador => {
                        const listaDeChequeo = trabajador.listaDeChequeo;
                        const respuesta = listaDeChequeo[itemKey];

                        if (respuesta === 'Si') {
                            siCount++;
                        } else if (respuesta === 'No') {
                            noCount++;
                        } else if (respuesta === 'NA') {
                            naCount++;
                        }
                    });

                    estadisticas[itemKey] = {
                        si: siCount,
                        no: noCount,
                        na: naCount,
                        total: totalTrabajadores
                    };
                }

                resolve(estadisticas);
            };

            requestGetAll.onerror = function (event) {
                reject(event.target.error);
            };
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}


export async function calcularEstadisticasPorEmpresa() {
    try {
        const indexedDB = window.indexedDB;
        const request = indexedDB.open(dbName);

        return new Promise((resolve, reject) => {
            request.onsuccess = async (event) => {
                const db = event.target.result;
                const transaction = db.transaction([storeName], 'readonly');
                const objectStore = transaction.objectStore(storeName);
                const getRequest = objectStore.getAll();

                getRequest.onsuccess = async (event) => {
                    const trabajadores = event.target.result;
                    const empresas = Array.from(new Set(trabajadores.map(trabajador => trabajador.empresa)));
                    const estadisticas = {};

                    const procesarEmpresa = (empresa) => {
                        if (empresa !== 'other') {
                            const empresaStats = {
                                empresa: empresa,
                                items: {},
                                totalDeRegistradosEnEstaEmpresa: 0,
                                totalRegistrados: 0,
                            };

                            for (let i = 1; i <= 20; i++) {
                                const itemKey = `item${i}`;

                                empresaStats.items[itemKey] = {
                                    si: 0,
                                    no: 0,
                                    na: 0,
                                    total: 0
                                };

                                trabajadores.forEach(trabajador => {
                                    if (trabajador.empresa === empresa) {
                                        empresaStats.totalRegistrados++;
                                        const listaDeChequeo = trabajador.listaDeChequeo;
                                        const respuesta = listaDeChequeo[itemKey];

                                        if (respuesta === 'Si') {
                                            empresaStats.items[itemKey].si++;
                                        } else if (respuesta === 'No') {
                                            empresaStats.items[itemKey].no++;
                                        } else if (respuesta === 'NA') {
                                            empresaStats.items[itemKey].na++;
                                        }
                                        empresaStats.items[itemKey].total++;
                                    }
                                });

                                empresaStats.totalDeRegistradosEnEstaEmpresa = trabajadores.filter(trabajador => trabajador.empresa === empresa).length;
                            }

                            estadisticas[empresa] = empresaStats;
                        }
                    };

                    empresas.forEach(empresa => {
                        procesarEmpresa(empresa);
                    });

                    resolve(estadisticas);
                };

                getRequest.onerror = (event) => {
                    reject(event.target.error);
                };
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('Error al obtener datos desde IndexedDB:', error);
        return null;
    }
}


export async function obtenerConteoRegistrosPorRegistrador() {
    try {
      const request = indexedDB.open(dbName);
  
      return new Promise((resolve, reject) => {
        request.onsuccess = async (event) => {
          const db = event.target.result;
          const transaction = db.transaction([storeName], 'readonly');
          const objectStore = transaction.objectStore(storeName);
          const getRequest = objectStore.getAll();
  
          getRequest.onsuccess = (event) => {
            const datos = event.target.result;
            const registrosPorRegistrador = {};
  
            datos.forEach((registro) => {
              const registrador = registro.registrador;
  
              if (registrosPorRegistrador[registrador]) {
                registrosPorRegistrador[registrador]++;
              } else {
                registrosPorRegistrador[registrador] = 1;
              }
            });
  
            resolve(registrosPorRegistrador);
          };
  
          getRequest.onerror = (event) => {
            reject(event.target.error);
          };
        };
  
        request.onerror = (event) => {
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error('Error al obtener datos desde IndexedDB:', error);
      return null;
    }
  }


  export function calcularEstadisticasPorFechas(desde, hasta) {
    return new Promise((resolve, reject) => {
        const indexedDB = window.indexedDB;
        const request = indexedDB.open(dbName);

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction([storeName], 'readonly');
            const objectStore = transaction.objectStore(storeName);
            const requestGetAll = objectStore.getAll();

            requestGetAll.onsuccess = function (event) {
                const trabajadores = event.target.result.filter(trabajador => {
                    const fechaTrabajo = new Date(trabajador.fecha);
                    return fechaTrabajo >= desde && fechaTrabajo <= hasta;
                });

                const totalTrabajadores = trabajadores.length;
                let estadisticas = {};

                for (let i = 1; i <= 20; i++) {
                    const itemKey = `item${i}`;
                    let siCount = 0;
                    let noCount = 0;
                    let naCount = 0;

                    trabajadores.forEach(trabajador => {
                        const listaDeChequeo = trabajador.listaDeChequeo;
                        const respuesta = listaDeChequeo[itemKey];

                        if (respuesta === 'Si') {
                            siCount++;
                        } else if (respuesta === 'No') {
                            noCount++;
                        } else if (respuesta === 'NA') {
                            naCount++;
                        }
                    });

                    estadisticas[itemKey] = {
                        si: siCount,
                        no: noCount,
                        na: naCount,
                        total: totalTrabajadores
                    };
                }

                resolve(estadisticas);
            };

            requestGetAll.onerror = function (event) {
                reject(event.target.error);
            };
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
  }
  

  export async function showInputDateAndRunEstadistictDateWhitCompany(desde, hasta) {
    try {
      const db = await new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);
  
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
      });
  
      const transaction = db.transaction([storeName], "readonly");
      const objectStore = transaction.objectStore(storeName);
  
      const records = await new Promise((resolve, reject) => {
        const request = objectStore.getAll();
  
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
      });
  
      const fromDate = new Date(desde);
      const toDate = new Date(hasta);
  
      const filteredRecords = records.filter(record => {
        const fechaTrabajo = new Date(record.fecha);
        return fechaTrabajo >= fromDate && fechaTrabajo <= toDate;
      });
  
      const estadisticas = {};
  
      for (const registro of filteredRecords) {
        const empresa = registro.empresa;
  
        if (!estadisticas[empresa]) {
          estadisticas[empresa] = {
            empresa,
            items: {},
            totalDeRegistradosEnEstaEmpresa: 0,
          };
        }
  
        const items = registro.listaDeChequeo;
  
        for (const item in items) {
          const respuesta = items[item];
  
          if (!estadisticas[empresa].items[item]) {
            estadisticas[empresa].items[item] = {
              si: 0,
              no: 0,
              na: 0,
              total: 0,
            };
          }
  
          switch (respuesta) {
            case "Si":
              estadisticas[empresa].items[item].si++;
              break;
            case "No":
              estadisticas[empresa].items[item].no++;
              break;
            case "NA":
              estadisticas[empresa].items[item].na++;
              break;
            default:
              break;
          }
  
          estadisticas[empresa].items[item].total++;
        }
  
        estadisticas[empresa].totalDeRegistradosEnEstaEmpresa++;
      }

      return estadisticas;
    } catch (error) {
      console.error("Error en la función:", error);
      return null;
    }
  }


export async function registradoresDeFechaAFecha(fechaInicio, fechaFin){
  try {
    const indexedDB = window.indexedDB;
    const request = indexedDB.open(dbName);

    return new Promise((resolve, reject) => {
        request.onsuccess = async (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['trabajadoresYdatos'], 'readonly');
            const objectStore = transaction.objectStore('trabajadoresYdatos');
            const getRequest = objectStore.getAll();

            getRequest.onsuccess = async (event) => {
                const trabajadores = event.target.result;
                const trabajadoresEnFecha = trabajadores.filter((trabajador) => {
                    return trabajador.fecha >= fechaInicio && trabajador.fecha <= fechaFin;
                });

                const contadorRegistradores = {};
                trabajadoresEnFecha.forEach((trabajador) => {
                    const registrador = trabajador.registrador;
                    contadorRegistradores[registrador] = (contadorRegistradores[registrador] || 0) + 1;
                });

                console.log(contadorRegistradores)
                resolve(contadorRegistradores);
            };

            getRequest.onerror = (event) => {
                reject(event.target.error);
            };
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
  } catch (error) {
    console.error('Error al calcular estadísticas:', error);
  }
}

