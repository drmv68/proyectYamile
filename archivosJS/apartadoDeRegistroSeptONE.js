import { actionButtonNext, acctionKeepSelect } from './funciones.js'


export function fristDataToRegist(){
  document.body.innerHTML = '';

  let titleInputNameRegister = elementCreate('label');
  let inputNameRegister = elementCreate('input');
  let titleInputNameAAL = elementCreate('label');
  let inputNameAAL = elementCreate('input');
  let titleInputNameAA = elementCreate('label');
  let inputNameAA = elementCreate('input');
  let titleInputNameJob = elementCreate('label');
  let inputNameJob = elementCreate('input');
  let titleInputDate = elementCreate('label');
  let getDate = elementCreate('input');
  let titleInputCompany = elementCreate('label');
  let titleNameInstalations = elementCreate('label');
  let instalations = elementCreate('input');
  let tittlePermitWorkNumber = elementCreate('label');
  let permitWorkNumber = elementCreate('input');
  let button = elementCreate('button');

    titleInputNameRegister.id = 'titleInputNameRegister';
    inputNameRegister.id = 'inputNameRegister';
    titleInputNameAAL.id = 'titleInputNameAAL';
    inputNameAAL.id = 'inputNameAAL';
    titleInputNameAA.id = 'titleInputNameAA';
    inputNameAA.id = 'inputNameAA';
    titleInputNameJob.id = 'titleInputName';
    inputNameJob.id = 'inputNameJob';
    titleInputDate.id = 'date';
    getDate.id = 'getDate';
    getDate.type = 'date';
    titleInputCompany.id = 'titleCompany';
    titleNameInstalations.id = 'titleInstalations';
    instalations.id = 'instalations';
    tittlePermitWorkNumber.id = 'tittleWorkNumber';
    permitWorkNumber.id = 'workNumber';
    permitWorkNumber.type = 'number';
    button.id = 'buttonNext';

  titleInputNameRegister.innerHTML = 'Nombre del lider inspección'
  titleInputNameAAL.innerHTML = 'Nombre Autoridad area local(AAL)'; 
  titleInputNameAA.innerHTML = 'Nombre autoridad de area(AA)';
  titleInputNameJob.innerHTML = 'Nombre de la autoridad ejecutante (AE)';
  titleInputDate.innerHTML = 'Ingrese fecha';
  titleInputCompany.innerHTML = 'Ingrese nombre de la empresa';
  titleNameInstalations.innerHTML = 'Ingrese nombre de la instalacion';
  tittlePermitWorkNumber.innerHTML = 'Ingrese numero permiso de trabajo';
  button.innerHTML = 'siguiente';

  appendChilds(titleInputNameRegister);
  appendChilds(inputNameRegister);
  appendChilds(titleInputNameAAL);
  appendChilds(inputNameAAL);
  appendChilds(titleInputNameAA);
  appendChilds(inputNameAA);
  appendChilds(titleInputNameJob);
  appendChilds(inputNameJob);
  appendChilds(titleInputDate);
  appendChilds(getDate);
  appendChilds(titleInputCompany);
  makeListOfCompany()
  appendChilds(titleNameInstalations);
  makeListOfInstalations()
  appendChilds(tittlePermitWorkNumber);
  appendChilds(permitWorkNumber);
  makeListSelectInformacionPermisoDeTrabajo();
  appendChilds(button);
  
  actionButtonNext()
}

function elementCreate (elementType){
  let element = document.createElement(elementType);
  return element;
}

function appendChilds(nameToAdd){
    let nameToAppen = document.body.appendChild(nameToAdd);  
  return nameToAppen
}


export function getElementByID(idElement){
  let element = document.getElementById(idElement);
  return element;
}

function makeListSelectInformacionPermisoDeTrabajo(){
  let titleMultiSelect = elementCreate('label');
  let multiSelect = elementCreate('select');
  let options = ['trabajo en caliente', 'excavacion', 'radiaciones', 'trabajo en altura', 'izaje de cargas', 'aislamiento de energía', 'espacios confinados'];
  multiSelect.id = 'dropDown';
  titleMultiSelect.id = 'titleMultiSelect';
  multiSelect.multiple = true;
  titleMultiSelect.innerHTML = 'Relación de certificados de apoyo apicables';

  for (let i = 0; i < options.length; i++) {
    let option = document.createElement('option');
    option.value = options[i];
    option.text = options[i];
    multiSelect.appendChild(option);
  }
  
  appendChilds(titleMultiSelect);
  appendChilds(multiSelect);
  acctionKeepSelect();
}

function makeListOfCompany() {
  const companies = ['Stork', 'Ingesa', 'AVS', 'Proasem', 'Honor', 'Serviramirez', 'Meneses Ramirez', 'TWM', 'Insercor'];

  const companySelect = document.createElement('select');
  companySelect.id = 'company';

  companies.forEach(company => {
    const option = document.createElement('option');
    option.value = company;
    option.text = company;
    companySelect.appendChild(option);
  });

  const otherOption = document.createElement('option');
  otherOption.value = '';
  otherOption.text = 'Otra';
  companySelect.appendChild(otherOption);

  const inputForOther = document.createElement('input');
  inputForOther.id = 'otherCompanyInput';
  inputForOther.placeholder = 'Nombre de la empresa';
  inputForOther.style.display = 'none';

  companySelect.addEventListener('change', function () {
    inputForOther.style.display = this.value === '' ? 'block' : 'none';
  });

  inputForOther.addEventListener('input', function () {
    otherOption.text = inputForOther.value;
    otherOption.value = inputForOther.value;
  });

  document.body.appendChild(companySelect);
  document.body.appendChild(inputForOther);
}


function makeListOfInstalations() {
  const companies = ['E. Tenay', 'Des. babilla', 'Des. Lerida', 'E. Coyaima', 'T. Gualanday', 'T. Lerida', 'T. Dorada', 'OAM', 'La Hocha', 'La cañada', 'OLHM'];

  const companySelect = document.createElement('select');
  companySelect.id = 'instalations';

  companies.forEach(company => {
    const option = document.createElement('option');
    option.value = company;
    option.text = company;
    companySelect.appendChild(option);
  });

  const otherOption = document.createElement('option');
  otherOption.value = '';
  otherOption.text = 'Otra';
  companySelect.appendChild(otherOption);

  const inputForOther = document.createElement('input');
  inputForOther.id = 'otherCompanyInput';
  inputForOther.placeholder = 'Nombre de la instalacion';
  inputForOther.style.display = 'none';

  companySelect.addEventListener('change', function () {
    inputForOther.style.display = this.value === '' ? 'block' : 'none';
  });

  inputForOther.addEventListener('input', function () {
    otherOption.text = inputForOther.value;
    otherOption.value = inputForOther.value;
  });

  document.body.appendChild(companySelect);
  document.body.appendChild(inputForOther);
}
