import * as createForm from "./apartadoDeRegistroSeptONE.js";
import { nextPageToRegister } from "./listaDeChequeo.js";
import { getAndEditDataBase } from "./ejecutarDataBase.js";
import { showTheStadisitc } from "./apartadoDeEstadisticas.js";

export function fristSeptRegister() {
  createForm.fristDataToRegist();
}

export function showStadistic() {
  showTheStadisitc();

}

export function actionButtonNext() {
  buttonNext.addEventListener("click", getDataToFirstRegister);
}

export function acctionKeepSelect() {
  const dropDown = createForm.getElementByID("dropDown");
  dropDown.addEventListener("click", getSelectionsAndKeep);
}

export let allSelections = [];
function getSelectionsAndKeep() {
  let valueDropDown = createForm.getElementByID("dropDown").value;

  if (allSelections.length === 0) {
    allSelections.push(valueDropDown);
  } else if (
    allSelections.every(
      (elemntsSelectioned) => elemntsSelectioned !== valueDropDown,
    )
  ) {
    allSelections.push(valueDropDown);
  } else {
    allSelections = allSelections.filter((select) => select !== valueDropDown);
  }

  createListToShowSelect();
  return allSelections;
}

function createListToShowSelect() {
  let divShowSelect = document.getElementById("divShowSelect");

  if (!divShowSelect) {
    divShowSelect = document.createElement("div");
    divShowSelect.id = "divShowSelect";
    document.body.appendChild(divShowSelect);
  }

  divShowSelect.innerHTML = "";

  let showSelect = document.createElement("div");
  showSelect.id = "showSelect";
  showSelect.innerHTML = "[" + allSelections + "]";

  divShowSelect.appendChild(showSelect);
}


function getDataToFirstRegister() {
  let valueInputNameRegister = createForm.getElementByID("inputNameRegister").value;
  let valueInputNameAAL = document.getElementById('inputNameAAL').value;
  let valueInputNameAA = document.getElementById('inputNameAA').value;
  let valueInputNameJob = document.getElementById("inputNameJob").value;
  let valueInputDate = createForm.getElementByID("getDate").value;
  let valueInputCompany = createForm.getElementByID("company").value;
  let valueInputInstalations = createForm.getElementByID("instalations").value;
  let valueInputWorkNumber = createForm.getElementByID("workNumber").value;
  let valueSelectList = allSelections;
  nextPageToRegister();


  getAndEditDataBase(valueInputNameRegister, valueInputNameAAL, valueInputNameAA, valueInputNameJob, valueInputDate, valueInputCompany, valueInputInstalations, valueInputWorkNumber, valueSelectList);
}
