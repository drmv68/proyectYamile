import { calcularEstadisticas, calcularEstadisticasPorEmpresa, obtenerConteoRegistrosPorRegistrador, calcularEstadisticasPorFechas, showInputDateAndRunEstadistictDateWhitCompany, registradoresDeFechaAFecha } from './estadisticasEjecutarBD.js';

export async function showTheStadisitc() {
  try {
    const estadistictAllJobers = await calcularEstadisticas();

    mostrarEstadisticasEnHTML(estadistictAllJobers);
    bottonShowEstadisitcByDate()
    bottonShowTableCompany();
    bottonShowRegisters();
  } catch (error) {
    console.error('Error al calcular estadísticas: ', error);
  }
}


function mostrarEstadisticasEnHTML(statistics) {
  document.body.innerHTML = '';
  const containerTable = document.createElement('div');
  const table = document.createElement('table');
  const showTotalJobers = document.createElement('label');
  containerTable.id = 'containerTable';
  table.id = 'table';
  showTotalJobers.id = 'showTotalJobers';
  table.border = '1';
  
  const headerRow = table.insertRow();
  const headerCell = headerRow.insertCell();
  headerCell.textContent = 'Preguntas';
  headerCell.colSpan = 4;
  
  const headerRow2 = table.insertRow();
  const headerCell2 = headerRow2.insertCell();
  headerCell2.textContent = '-';
  const headerCell3 = headerRow2.insertCell();
  headerCell3.textContent = 'Si';
  const headerCell4 = headerRow2.insertCell();
  headerCell4.textContent = 'No';
  const headerCell5 = headerRow2.insertCell();
  headerCell5.textContent = 'NA';
  
  for (let i = 1; i <= 20; i++) {
    const itemKey = `item${i}`;

    const row = table.insertRow();
    const questionCell = row.insertCell();
    questionCell.textContent = getQuestionByItem(itemKey);
    
    if (statistics[itemKey]) {
      const siCell = row.insertCell();
      siCell.textContent = `${statistics[itemKey].si}`;
      
      const noCell = row.insertCell();
      noCell.textContent = `${statistics[itemKey].no}`;
      
      const naCell = row.insertCell();
      naCell.textContent = `${statistics[itemKey].na}`;
    } else {
      const emptyCell1 = row.insertCell();
      emptyCell1.textContent = "Datos no disponibles";
          
          const emptyCell2 = row.insertCell();
          emptyCell2.textContent = "Datos no disponibles";
          
          const emptyCell3 = row.insertCell();
          emptyCell3.textContent = "Datos no disponibles";
        }
      }
      
      containerTable.appendChild(table);
      showTotalJobers.textContent = `Numero total de inspecciones registrados: ${statistics.item1.total}`;
      document.body.appendChild(containerTable);  
      document.body.appendChild(showTotalJobers);  
    }
    
    function getQuestionByItem(itemKey) {
      switch (itemKey) {
        case 'item1':
        return '1) ¿Está el permiso de trabajo debidamente deligenciado y vigente?';
        case 'item2':
          return '2) ¿Corresponde el permiso con el trabajo a realizar?';
          case 'item3':
            return '3) ¿Está exhibido con el permiso de trabajo en el sitio?';
            case 'item4':
              return '4) ¿Se realizó el TIME OUT?';
              case 'item5':
                return '5) ¿Se realizó reunión preoperacional al inicio de la actividad?';
                case 'item6':
        return '6) ¿Las personas utilizan el EPP requerido para la actividad de desarrollan?';
      case 'item7':
        return '7) ¿Se identificaron todos los peligros y se valoró el peligro de la actividad?';
        case 'item8':
          return '8) ¿Estan relacionados los permisos y certificados correctamente?';
          case 'item9':
            return '9) ¿Se realizarón conversaciones y reflexiones sobre la actividad a ejecutar?';
      case 'item10':
        return '10) ¿Maquinaria, equipos y herramientas: se le realizó inspección previa y están operativos los equipos?';
        case 'item11':
          return '11) ¿Maquinaria, equipo y herramientas utilizadas son adecuadas?';
          case 'item12':
            return '12) Si se está interviniendo algún equipo o linea, ¿se aplicó el procedimiento de bloqueo y etiquetado?';
            case 'item13':
              return '13) ¿Esxiste algun procedimiento escrito para la actividad?';
              case 'item14':
        return '14) ¿El sitio de trabajo se encuentra en buenas condiciones de orden y aseo?';
      case 'item15':
        return '15) ¿El AST se encuentra firmado por los que participaron en su elaboracion y conocen los peligros a los que estan expuestos?';
        case 'item16':
          return '16) ¿Observa actos inseguros o condiciones inseguras?';
          case 'item17':
            return '17) ¿Cuentan con los equipos mínimos para atender una emergencia?';
            case 'item18':
              return '18) ¿El personal sabe que hacer en caso de un accidente y/o emergencia?';
              case 'item19':
                return '19) ¿Estan registradas las firmas de pruebas de atmosfera de acuerdo a la actividad?';
                case 'item20':
                  return '20) ¿El medidor de atmosfera se encuentra calibrado?';
                  default:
                    return `Question for ${itemKey}`;
                  }
                }
                

function mostrarEstadisticasPorEmpresaEnHTML(estadisticas) {
  document.body.innerHTML = '';
  bottonShowEstadisitcByDateAndCompany();
  const empresas = Object.keys(estadisticas);

  empresas.forEach(empresa => {
    const containerTable = document.createElement('div');
    const table = document.createElement('table');
    const showTotalJobers = document.createElement('label');
    containerTable.className = 'containerTable';
    table.className = 'table';
    showTotalJobers.className = 'showTotalJobers';
    table.border = '1';
    
    const headerRow = table.insertRow();
    const headerCell = headerRow.insertCell();
    headerCell.textContent = 'Preguntas';
    headerCell.colSpan = 4;
    
    const headerRow2 = table.insertRow();
    const headerCell2 = headerRow2.insertCell();
    headerCell2.textContent = empresa;
    const headerCell3 = headerRow2.insertCell();
    headerCell3.textContent = 'Si';
    const headerCell4 = headerRow2.insertCell();
    headerCell4.textContent = 'No';
    const headerCell5 = headerRow2.insertCell();
    headerCell5.textContent = 'NA';
    
    for (let i = 1; i <= 20; i++) {
      const itemKey = `item${i}`;

      const row = table.insertRow();
      const questionCell = row.insertCell();
      questionCell.textContent = getQuestionByItem(itemKey);
      
      if (estadisticas[empresa].items[itemKey]) {
        const siCell = row.insertCell();
        siCell.textContent = `${estadisticas[empresa].items[itemKey].si}`;

        const noCell = row.insertCell();
        noCell.textContent = `${estadisticas[empresa].items[itemKey].no}`;
        
        const naCell = row.insertCell();
        naCell.textContent = `${estadisticas[empresa].items[itemKey].na}`;
      } else {
        const emptyCell1 = row.insertCell();
        emptyCell1.textContent = "Datos no disponibles";
        
        const emptyCell2 = row.insertCell();
        emptyCell2.textContent = "Datos no disponibles";
        
        const emptyCell3 = row.insertCell();
        emptyCell3.textContent = "Datos no disponibles";
      }
    }
    
    containerTable.appendChild(table);
    showTotalJobers.textContent = `Numero total de inspecciones registradas en ${empresa}: ${estadisticas[empresa].totalDeRegistradosEnEstaEmpresa}`;
    document.body.appendChild(containerTable);
    document.body.appendChild(showTotalJobers);
  });

  buttonBackToShowAllStadistic();
}


function mostrarEstadisticasPorEmpresaYFechaEnHTML(estadisticas, desde, hasta) {
  document.body.innerHTML = '';
  const dateRangeLabel = document.createElement('label');
  dateRangeLabel.textContent = `Resultados desde ${desde} hasta ${hasta}`;
  document.body.appendChild(dateRangeLabel);
  const empresas = Object.keys(estadisticas);

  empresas.forEach(empresa => {
    const containerTable = document.createElement('div');
    const table = document.createElement('table');
    const showTotalJobers = document.createElement('label');
    containerTable.className = 'containerTable';
    table.className = 'table';
    showTotalJobers.className = 'showTotalJobers';
    table.border = '1';
    
    const headerRow = table.insertRow();
    const headerCell = headerRow.insertCell();
    headerCell.textContent = 'Preguntas';
    headerCell.colSpan = 4;
    
    const headerRow2 = table.insertRow();
    const headerCell2 = headerRow2.insertCell();
    headerCell2.textContent = empresa;
    const headerCell3 = headerRow2.insertCell();
    headerCell3.textContent = 'Si';
    const headerCell4 = headerRow2.insertCell();
    headerCell4.textContent = 'No';
    const headerCell5 = headerRow2.insertCell();
    headerCell5.textContent = 'NA';
    
    for (let i = 1; i <= 20; i++) {
      const itemKey = `item${i}`;

      const row = table.insertRow();
      const questionCell = row.insertCell();
      questionCell.textContent = getQuestionByItem(itemKey);
      
      if (estadisticas[empresa].items[itemKey]) {
        const siCell = row.insertCell();
        siCell.textContent = `${estadisticas[empresa].items[itemKey].si}`;

        const noCell = row.insertCell();
        noCell.textContent = `${estadisticas[empresa].items[itemKey].no}`;
        
        const naCell = row.insertCell();
        naCell.textContent = `${estadisticas[empresa].items[itemKey].na}`;
      } else {
        const emptyCell1 = row.insertCell();
        emptyCell1.textContent = "Datos no disponibles";
        
        const emptyCell2 = row.insertCell();
        emptyCell2.textContent = "Datos no disponibles";
        
        const emptyCell3 = row.insertCell();
        emptyCell3.textContent = "Datos no disponibles";
      }
    }
    
    containerTable.appendChild(table);
    showTotalJobers.textContent = `Numero total de inspecciones registradas en ${empresa}: ${estadisticas[empresa].totalDeRegistradosEnEstaEmpresa}`;
    document.body.appendChild(containerTable);
    document.body.appendChild(showTotalJobers);
  });

  buttonBackToShowAllStadistic();
}

async function bottonShowTableCompany() {
  const estadisticCompanys = await calcularEstadisticasPorEmpresa();
  const buttonId = "botonShowDataByCompany";
  let buttonText = "Mostrar estadisticas por empresa";

  let boton = document.createElement("button");
  boton.id = buttonId;
  boton.innerText = buttonText;
  document.body.appendChild(boton);
  const ejecutarImpresionDeTablas = () => mostrarEstadisticasPorEmpresaEnHTML(estadisticCompanys);

  boton.addEventListener("click", ejecutarImpresionDeTablas);
}

async function bottonShowRegisters() {
  const conteoRegistros = await obtenerConteoRegistrosPorRegistrador();
  const buttonId = "bottonShowRegisters";
  let buttonText = "Mostrar listado por lideres de inspeccion";

  let boton = document.createElement("button");
  boton.id = buttonId;
  boton.innerText = buttonText;
  document.body.appendChild(boton);
  const ejecutarImpresionDeRegistradores = () => imprimirConteoRegistrosPorRegistrador(conteoRegistros);

  boton.addEventListener("click", ejecutarImpresionDeRegistradores);
}

function bottonShowEstadisitcByDate() {
  const boton = document.createElement("button");
  const buttonId = "bottonShowRegisters";
  const buttonText = "Mostrar estadisticas por fechas";

  boton.id = buttonId;
  boton.innerText = buttonText;
  document.body.appendChild(boton);
  boton.addEventListener("click", showInputDateAndRunEstadistictDate);
}

function buttonBackToShowAllStadistic(){
  const buttonId = "buttonBackToShowAllStadistic";
  let buttonText = "Atrás";

  let boton = document.createElement("button");
  boton.id = buttonId;
  boton.innerText = buttonText;
  document.body.appendChild(boton);
  const ejecutarReversa = () => showTheStadisitc();

  boton.addEventListener("click", ejecutarReversa);
}

function imprimirConteoRegistrosPorRegistrador(conteoRegistros) {
  try {
      document.body.innerHTML = '';
      if (conteoRegistros && typeof conteoRegistros === 'object') {
          const registrosOrdenados = Object.entries(conteoRegistros)
              .sort((a, b) => b[1] - a[1])
              .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

          const tablaConteo = document.createElement('table');
          tablaConteo.id = 'conteo-registradores-tabla';

          const filaTitulos = tablaConteo.insertRow(0);
          const celdaNombre = filaTitulos.insertCell(0);
          const celdaNumeroRegistros = filaTitulos.insertCell(1);

          celdaNombre.textContent = 'Nombre';
          celdaNumeroRegistros.textContent = 'Número de Registros';

          let rowIndex = 1;
          for (const registrador in registrosOrdenados) {
              const fila = tablaConteo.insertRow(rowIndex);
              const celdaNombre = fila.insertCell(0);
              const celdaNumeroRegistros = fila.insertCell(1);

              celdaNombre.textContent = registrador;
              celdaNumeroRegistros.textContent = registrosOrdenados[registrador];

              rowIndex++;
          }

          tablaConteo.classList.add('conteo-registradores-clase');

          document.body.appendChild(tablaConteo);

          //aquiiii

          bottonShowEstadisitcByDateAndRegister();
      } else {
          console.error('Datos de conteo no válidos para el conteo de registradores.');
      }

      buttonBackToShowAllStadistic();
  } catch (error) {
      console.error('Error al imprimir datos en pantalla:', error);
  }
}


function mostrarEstadisticasPorFechaEnHTML(statistics, desde, hasta) {
  document.body.innerHTML = '';
  const containerTable = document.createElement('div');
  const table = document.createElement('table');
  const showTotalJobers = document.createElement('label');
  containerTable.id = 'containerTable';
  table.id = 'table';
  showTotalJobers.id = 'showTotalJobers';
  table.border = '1';

  const headerRow = table.insertRow();
  const headerCell = headerRow.insertCell();
  headerCell.textContent = 'Preguntas';
  headerCell.colSpan = 4;

  const headerRow2 = table.insertRow();
  const headerCell2 = headerRow2.insertCell();
  headerCell2.textContent = '-';
  const headerCell3 = headerRow2.insertCell();
  headerCell3.textContent = 'Si';
  const headerCell4 = headerRow2.insertCell();
  headerCell4.textContent = 'No';
  const headerCell5 = headerRow2.insertCell();
  headerCell5.textContent = 'NA';

  for (let i = 1; i <= 20; i++) {
      const itemKey = `item${i}`;
      const question = getQuestionByItem(itemKey);

      const row = table.insertRow();
      const questionCell = row.insertCell();
      questionCell.textContent = question;

      if (statistics[itemKey]) {
          const siCell = row.insertCell();
          siCell.textContent = `${statistics[itemKey].si}`;

          const noCell = row.insertCell();
          noCell.textContent = `${statistics[itemKey].no}`;

          const naCell = row.insertCell();
          naCell.textContent = `${statistics[itemKey].na}`;
      } else {
          const emptyCell1 = row.insertCell();
          emptyCell1.textContent = "Datos no disponibles";

          const emptyCell2 = row.insertCell();
          emptyCell2.textContent = "Datos no disponibles";

          const emptyCell3 = row.insertCell();
          emptyCell3.textContent = "Datos no disponibles";
      }
  }

  containerTable.appendChild(table);
  showTotalJobers.textContent = `Número total de inspecciones registradas: ${statistics.item1 ? statistics.item1.total : 'Datos no disponibles'}`;
  
  const dateRangeLabel = document.createElement('label');
  dateRangeLabel.textContent = `Resultados desde ${desde} hasta ${hasta}`;
  document.body.appendChild(dateRangeLabel);

  document.body.appendChild(containerTable);
  document.body.appendChild(showTotalJobers);
  buttonBackToShowAllStadistic();
}


async function showInputDateAndRunEstadistictDate(){
  let inputDateDesde = document.createElement('input');
  let inputDateHasta = document.createElement('input');

  inputDateDesde.id = 'dateDesde';
  inputDateDesde.type = 'date';
  inputDateHasta.type = 'date';
  inputDateHasta.id = 'dateHasta';

  document.body.innerHTML = '';
  document.body.appendChild(inputDateDesde);
  document.body.appendChild(inputDateHasta);
  crearBotonBuscar();
}

async function crearBotonBuscar() {
  const botonInicarBusquedaPorFecha = document.createElement('button');
  botonInicarBusquedaPorFecha.id = 'botonInicarBusquedaPorFecha';
  botonInicarBusquedaPorFecha.textContent = 'Buscar Estadisticas por fecha';
  document.body.appendChild(botonInicarBusquedaPorFecha);

  botonInicarBusquedaPorFecha.addEventListener('click', async () => {
    const valueInputDateDesde = document.getElementById('dateDesde').value;
    const valueInputDateHasta = document.getElementById('dateHasta').value;

    try {
      const estadisticasPorFechas = await calcularEstadisticasPorFechas(
        new Date(valueInputDateDesde),
        new Date(valueInputDateHasta)
      );
      mostrarEstadisticasPorFechaEnHTML(
        estadisticasPorFechas,
        valueInputDateDesde,
        valueInputDateHasta
      );
    } catch (error) {
      console.error('Error al calcular estadísticas por fechas: ', error);
    }
  });
}


function bottonShowEstadisitcByDateAndCompany() {
  const boton = document.createElement("button");
  const buttonId = "bottonShowRegisters";
  const buttonClass = "bottonShowCompanyWhitDate";
  const buttonText = "Mostrar estadisticas por fechas";

  boton.id = buttonId;
  boton.className = buttonClass;
  boton.innerText = buttonText;
  document.body.appendChild(boton);
  boton.addEventListener("click", showInputDateAndRunEstadistictDateForCompany);
}

async function showInputDateAndRunEstadistictDateForCompany(){
  let inputDateDesde = document.createElement('input');
  let inputDateHasta = document.createElement('input');

  inputDateDesde.id = 'dateDesde';
  inputDateDesde.type = 'date';
  inputDateHasta.type = 'date';
  inputDateHasta.id = 'dateHasta';

  document.body.innerHTML = '';
  document.body.appendChild(inputDateDesde);
  document.body.appendChild(inputDateHasta);
  crearBotonBuscarPorCompanyYfecha();
  buttonBackToShowAllStadistic();
}

async function crearBotonBuscarPorCompanyYfecha() {
  const botonIniciarBusquedaPorFecha = document.createElement('button');
  botonIniciarBusquedaPorFecha.id = 'botonIniciarBusquedaPorFecha';
  botonIniciarBusquedaPorFecha.textContent = 'Buscar Estadísticas por fecha';
  document.body.appendChild(botonIniciarBusquedaPorFecha);

  botonIniciarBusquedaPorFecha.addEventListener('click', async () => {
    const valueInputDateDesde = document.getElementById('dateDesde').value;
    const valueInputDateHasta = document.getElementById('dateHasta').value;

    try {
      const estadisticasPorFechas = await showInputDateAndRunEstadistictDateWhitCompany(valueInputDateDesde, valueInputDateHasta);
      mostrarEstadisticasPorEmpresaYFechaEnHTML(estadisticasPorFechas, valueInputDateDesde, valueInputDateHasta);
     

    } catch (error) {
      console.error('Error al calcular estadísticas por fechas: ', error);
    }
  });
}


function bottonShowEstadisitcByDateAndRegister() {
  const boton = document.createElement("button");
  const buttonId = "bottonShowRegisters";
  const buttonText = "Mostrar estadisticas por fechas";
  
  boton.id = buttonId;
  boton.innerText = buttonText;
  document.body.appendChild(boton);
  boton.addEventListener("click", botonBuscaPorFechaRegistradores);
}

async function botonBuscaPorFechaRegistradores(){
    let inputDateDesde = document.createElement('input');
    let inputDateHasta = document.createElement('input');
  
    inputDateDesde.id = 'dateDesde';
    inputDateDesde.type = 'date';
    inputDateHasta.id = 'dateHasta';
    inputDateHasta.type = 'date';
  
    document.body.innerHTML = '';
    document.body.appendChild(inputDateDesde);
    document.body.appendChild(inputDateHasta);
    crearBotonBuscarPorRegistradoryYfecha();
    buttonBackToShowAllStadistic();
  }

async function crearBotonBuscarPorRegistradoryYfecha() {
  const botonIniciarBusquedaPorFecha = document.createElement('button');
  botonIniciarBusquedaPorFecha.id = 'botonIniciarBusquedaPorFecha';
  botonIniciarBusquedaPorFecha.textContent = 'Buscar Estadísticas por fecha';
  document.body.appendChild(botonIniciarBusquedaPorFecha);
  
  botonIniciarBusquedaPorFecha.addEventListener('click', async () => {
    const valueInputDateDesde = document.getElementById('dateDesde').value;
    const valueInputDateHasta = document.getElementById('dateHasta').value;
  
     try {
      const estadisticasPorFechas = await registradoresDeFechaAFecha(valueInputDateDesde, valueInputDateHasta);
      imprimirConteoFechaPorRegistrador(estadisticasPorFechas, valueInputDateDesde, valueInputDateHasta);
       
  
      } catch (error) {
        console.error('Error al calcular estadísticas por fechas: ', error);
      }
  });
}  


function imprimirConteoFechaPorRegistrador(conteoRegistros, desde, hasta) {
  try {
      document.body.innerHTML = '';
      const dateRangeLabel = document.createElement('label');
      dateRangeLabel.textContent = `Resultados desde ${desde} hasta ${hasta}`;
      document.body.appendChild(dateRangeLabel);
    
      if (conteoRegistros && typeof conteoRegistros === 'object') {
          const registrosOrdenados = Object.entries(conteoRegistros)
              .sort((a, b) => b[1] - a[1])
              .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

          const tablaConteo = document.createElement('table');
          tablaConteo.id = 'conteo-registradores-tabla';

          const filaTitulos = tablaConteo.insertRow(0);
          const celdaNombre = filaTitulos.insertCell(0);
          const celdaNumeroRegistros = filaTitulos.insertCell(1);

          celdaNombre.textContent = 'Nombre';
          celdaNumeroRegistros.textContent = 'Número de Registros';

          let rowIndex = 1;
          for (const registrador in registrosOrdenados) {
              const fila = tablaConteo.insertRow(rowIndex);
              const celdaNombre = fila.insertCell(0);
              const celdaNumeroRegistros = fila.insertCell(1);

              celdaNombre.textContent = registrador;
              celdaNumeroRegistros.textContent = registrosOrdenados[registrador];

              rowIndex++;
          }

          tablaConteo.classList.add('conteo-registradores-clase');

          document.body.appendChild(tablaConteo);
          buttonBackToShowAllStadistic();
      } else {
          console.error('Datos de conteo no válidos para el conteo de registradores.');
      }
  } catch (error) {
      console.error('Error al imprimir datos en pantalla:', error);
  }
}