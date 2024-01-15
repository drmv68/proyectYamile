import * as functionsRegister from "./funciones.js";

document.addEventListener('DOMContentLoaded', selctOptionToStart);

function selctOptionToStart() {
    let buttonNewRegister = document.getElementById('newInspection');
    let buttonShowStadistic = document.getElementById('showStadistic');

        buttonNewRegister.addEventListener('click', functionsRegister.fristSeptRegister);
        buttonShowStadistic.addEventListener('click', functionsRegister.showStadistic);
    }