// selezione bottone 
let playElement = document.getElementById("play");
// Evento al click del bottone per far partire le funzioni che generano la griglia e l'attivatore delle celle al click
playElement.addEventListener("click", difficultLevel);

function difficultLevel() {

    let valueInputElement = document.getElementById("difficult").value;

    if (valueInputElement === "facile") {
        generateGrid(100, "cella_facile")
        activateCell(".cella_facile", "active", "active_bomb", 100)

    } else if (valueInputElement === "media") {
        generateGrid(81, "cella_media")
        activateCell(".cella_media", "active", "active_bomb", 81)

    } else {
        generateGrid(49, "cella_difficile")
        activateCell(".cella_difficile", "active", "active_bomb", 49)

    }
}

/**
 * ## Generatore di celle automatico
 * @param {string} num_celle numero di celle che si vuole creare
 * @param {string} class_name nome classe da mettere nel tag interno all'elemento che si crea
 */
function generateGrid(num_celle, class_name) {
    let celleElement = document.querySelector(".celle")
    celleElement.innerHTML = "";

    for (let i = 1; i <= num_celle; i++) {
        let cellaContent = `<div class="${class_name}">${i}</div>`

        celleElement.insertAdjacentHTML("beforeend", cellaContent);
    }
}

/* se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba
la cella si colora di rosso e la partita termina, */



/**
 * ## Attivatore celle al click
 * @param {string} selector nome classe cella da attivare al click
 * @param {string} class_active nome classe per l'attivazione al click
 */
function activateCell(selector, class_active, class_bomb, num_celle) {
    const celle = document.querySelectorAll(selector)

    const bombe = generateBomb(num_celle)
    console.log(bombe)

    for (let i = 0; i < celle.length; i++) {
        let cella = celle[i];

        cella.addEventListener('click', checkCell.bind(cella, selector, bombe, num_celle))

    }
}


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBomb(num_celle) {
    let randomBomb = [];
    while (randomBomb.length !== 16) {
        const randomNumber = getRandomInteger(1, num_celle)
        if (!randomBomb.includes(randomNumber)) {
            randomBomb.push(randomNumber)
        }
    }
    return randomBomb;
}

function checkCell(selector, bombe) {

    let result = document.querySelector(".risultato")
    const celle = document.querySelectorAll(selector)
    const contatoreBombe = []
    const contatoreNonBombe = []
    if (bombe.includes(parseInt(this.innerHTML))) {

        for (let i = 0; i < celle.length; i++) {
            let cell = celle[i].textContent
            result.innerHTML = "Hai perso"
            if (bombe.includes(parseInt(cell))) {
                celle[i].classList.add(class_bomb);
                contatoreBombe.push(celle[i])
                endGame()
            }
        }
    } else {
        celle[i].classList.add(class_active);
        contatoreNonBombe.push(celle[i])
    }
}

function endGame(num_celle) {

    if (contatoreBombe.lenght == 16) {
        celle[i].removeEventListener('click', checkCell)
    } else if (contatoreNonBombe == num_celle - 16) {
        result.innerHTML = "Hai vinto"
        celle[i].removeEventListener('click', checkCell)
    }
}