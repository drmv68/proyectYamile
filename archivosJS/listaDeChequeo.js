import { addChekListoToLastJober } from './ejecutarDataBase.js';

export function nextPageToRegister() {
    createNewForm();
}

function createNewForm() {
    document.body.innerHTML = '';

    const questions = [
        '¿Está el permiso de trabajo debidamente diligenciado y vigente?',
        '¿Corresponde el permiso con el trabajo a realizar?',
        '¿Está exhibido con el permiso de trabajo en el sitio?',
        '¿Se realizó el TIME OUT?',
        '¿Se realizó reunión preoperacional al inicio de la actividad?',
        '¿Las personas utilizan el EPP requerido para la actividad de desarrollan?',
        '¿Se identificaron todos los peligros y se valoró el peligro de la actividad?',
        '¿Estan relacionados los permisos y certificados correctamente?',
        '¿Se realizarón conversaciones y reflexiones sobre la actividad a ejecutar?',
        '¿Maquinaria, equipos y herramientas: se le realizó inspección previa y están operativos los equipos?',
        '¿Maquinaria, equipo y herramientas utilizadas son adecuadas?',
        'Si se está interviniendo algún equipo o linea, ¿se aplicó el procedimiento de bloqueo y etiquetado?',
        '¿Esxiste algun procedimiento escrito para la actividad?',
        '¿El sitio de trabajo se encuentra en buenas condiciones de orden y aseo?',
        '¿El AST se encuentra firmado por los que participaron en su elaboracion y conocen los peligros a los que estan expuestos?',
        '¿Observa actos inseguros o condiciones inseguras?',
        '¿Cuentan con los equipos mínimos para atender una emergencia?',
        '¿El personal sabe que hacer en caso de un accidente y/o emergencia?',
        '¿Estan registradas las firmas de pruebas de atmosfera de acuerdo a la actividad?',
        '¿El medidor de atmosfera se encuentra calibrado?'
    ];

    questions.forEach((question, index) => {
        createListWithIdAndLabel(question, index + 1);
    });

    finishForm();
}

function createListWithIdAndLabel(textToShow, questionNumber) {
    const container = elementCreate('div');
    const questionLabel = elementCreate('label');
    questionLabel.innerHTML = `${textToShow}`;
    const selectList = listYesOrNo(questionNumber);
    container.appendChild(questionLabel);
    container.appendChild(selectList);
    container.id = `container${questionNumber}`;
    appendChilds(container);
}

function elementCreate(elementType) {
    return document.createElement(elementType);
}

function appendChilds(nameToAdd) {
    document.body.appendChild(nameToAdd);
}

function listYesOrNo(questionNumber) {
    const multiSelect = elementCreate('select');
    multiSelect.id = `dropDown${questionNumber}`;
    const options = ['Si', 'No', 'NA'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        multiSelect.appendChild(option);
    });
    return multiSelect;
}

function finishForm() {
    const finishButton = elementCreate('button');
    finishButton.id = 'finishButton';
    finishButton.innerHTML = 'Finalizar registro de trabajador.';
    appendChilds(finishButton);

    const finishButtonReady = document.getElementById('finishButton');
    finishButtonReady.addEventListener('click', sendAllAndReload);
}

function sendAllAndReload() {
    const selectedValues = [];

    for (let i = 1; i <= 20; i++) {
        const dropDown = document.getElementById(`dropDown${i}`);
        const selectedOption = dropDown.options[dropDown.selectedIndex].value;
        selectedValues.push(selectedOption);
    }
    
    addChekListoToLastJober(selectedValues);
    window.location.reload();
}
