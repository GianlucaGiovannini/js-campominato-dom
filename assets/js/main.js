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
let randomBomb = [];

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
        const cella = celle[i];
        cella.addEventListener('click', function() {

            if (this == bombe) {
                this.classList.add(class_active);
                console.log("ciao")
            } else {
                this.classList.add(class_bomb);
                console.log("abbalabba")
            }
        })
    }
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBomb(num_celle) {

    while (randomBomb.length !== 16) {
        const randomNumber = getRandomInteger(1, num_celle)
        if (!randomBomb.includes(randomNumber)) {
            randomBomb.push(randomNumber)
        }
    }
    return randomBomb;
}