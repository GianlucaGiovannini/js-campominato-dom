let playElement = document.getElementById("play");

playElement.addEventListener("click", difficultLevel)

function difficultLevel() {
    let valore = document.getElementById("difficult").value;
    console.log(valore);
    if (valore === "facile") {
        generateGrid('.celle', 'div', 'cella_facile', 100);
        activateCell('.cella_facile', 'active');
    } else if (valore === "media") {
        generateGrid('.celle', 'div', 'cella_media', 81);
        activateCell('.cella_media', 'active');
    } else {
        generateGrid('.celle', 'div', 'cella_difficile', 49);
        activateCell('.cella_difficile', 'active');
    }
}

function generateGrid(selector, element_name, class_name, number_of_cells) {
    const cellsElement = document.querySelector(selector)
    cellsElement.innerHTML = "";
    for (let i = 1; i <= number_of_cells; i++) {
        const cell = document.createElement(element_name)
        cell.classList.add(class_name)
        cellsElement.append(cell)
        cell.innerHTML = `<span>${i}</span>`;
    }
}

function selectCells(selector) {
    const cells = document.querySelectorAll(selector)
    return cells
}

function activateCell(selector, active_class) {
    const cells = selectCells(selector)

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        cell.addEventListener('click', function() {
            this.classList.toggle(active_class);
        })
    }
}