const table = document.querySelector(".table"); 
const selectors = document.querySelector(".size-container")
const tableWidth = table.getBoundingClientRect().width;
const tableHeight = table.getBoundingClientRect().height;
const clearButton = document.querySelector(".reset")
let dims = 10;
let etch = "stroke";
window.onload = ()=>{
    initializeTable();
    initializeSelector();
    initializeControls();
};

let mouseIsDown = false;

function initializeControls(){
    clearButton.addEventListener('click',clearTable)
}

function initializeTable(){
    for(let i = 1; i<=dims; i++){
        let row = document.createElement("div")
        row.classList.add("row");
        row.setAttribute("id", "row-" + i.toString())
        row.style.height = (100/dims).toString() + "%"
        row.style.width = "100%"
        table.appendChild(row);
        for(let j = 1; j<= dims;j++){
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add("empty");
            cell.style.width = dims + "%";
            cell.setAttribute("id", "cell-" + j.toString())
            row.appendChild(cell);
        }
    }  
    
    const cells = document.querySelectorAll(".cell")
    cells.forEach((c)=>{
        c.addEventListener('mouseover',()=>{
            if(c.classList.contains('empty')){
                c.classList.remove("empty")
                c.classList.add("full")
            }
        })
    })
}

function initializeSelector(){
    injectSlider();
    addSliderListeners();
}

function injectSlider(){
    for (let i = 1; i <= 64; i++){
        let sizeChoice = document.createElement("div")
        sizeChoice.setAttribute("id", i.toString())
        sizeChoice.setAttribute("class", "size-choice")
        sizeChoice.setAttribute("flex-shrink", "1")
        sizeChoice.setAttribute("border", "solid red")
        selectors.appendChild(sizeChoice);
    }
}

function addSliderListeners(){
    let selectorDivs = selectors.querySelectorAll("div");

    selectorDivs.forEach((s)=>{

        s.addEventListener("mousedown", ()=>{
            mouseIsDown = true;
            let size = parseInt(s.getAttribute("id"))
            dims = parseInt(size)
            updateSlider(size, selectorDivs);
            updateTable()
        })

        s.addEventListener("mouseup", ()=>{
            mouseIsDown = false;
        })

        s.addEventListener("mouseover", ()=>{
            if(mouseIsDown){
                let size = parseInt(s.getAttribute("id"))
                dims = parseInt(size)
                updateSlider(size, selectorDivs);
                updateTable()
            }
        })
    })
}

function updateSlider(size, selectorDivs){
    selectorDivs.forEach((s)=>{
        let divSize = parseInt(s.getAttribute("id"))
        if (divSize <= size){
            s.style.backgroundColor = "black"
            s.style.border = "solid black"
        }else{
            s.style.backgroundColor = "grey"
            s.style.border = "solid grey"
        }
    })
}

function updateTable(){
    clearTable();
    adjustDims();
}

function clearTable(){
    let rows = document.querySelectorAll(".row")
    rows.forEach((r)=>{
        let cells = r.querySelectorAll(".cell")
        cells.forEach((c)=>{
            if(c.classList.contains("full")){
                c.classList.add("empty")
                c.classList.remove("full")
            }
        })
    })
}

function adjustDims(){
    let oldDims = document.querySelectorAll('.row').length 
    if(oldDims > dims){
        for (let oldRow = oldDims; oldRow > dims; oldRow--){ //get rid of extraneous rows
            let row = table.querySelector("#row-" + oldRow)
            table.removeChild(row)
        }


        for (let rows = 1; rows <= dims; rows++){//resize old rows
            let row = table.querySelector("#row-"+rows)
            row.style.height = (100/dims).toString() + "%"
            for(let cells = 1; cells <= oldDims; cells++){
                let cell = row.querySelector("#cell-"+cells)
                if(cells <= dims){
                    cell.style.width = (100 / dims).toString() + "%"
                }
                else{
                    row.removeChild(cell)
                }
            }
        }
    }
    if(oldDims < dims){
        for(let newRow = oldDims + 1; newRow <= dims; newRow++){ //add new rows
            let row = document.createElement("div");
            row.setAttribute("id", "row-" + newRow.toString())
            row.classList.add("row")
            row.style.height = (100 / dims).toString() + "%"
            table.appendChild(row)
            for (let newCell = 1; newCell <= dims; newCell++){
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.classList.add("empty");
                cell.style.width = (100 / dims) + "%";
                cell.setAttribute("id", "cell-" + newCell.toString())
                row.appendChild(cell);
                cell.addEventListener('mouseover',()=>{
                    if(cell.classList.contains('empty')){
                        cell.classList.remove("empty")
                        cell.classList.add("full")
                    }
                })
            }
        }
        for (let rows = 1; rows <= oldDims; rows++){//resize old rows
            let row = table.querySelector("#row-"+rows)
            row.style.height = (100/dims).toString() + "%"
            for(let cells = 1; cells <= oldDims; cells++){ //resize old cells
                let cell = row.querySelector("#cell-" + cells)
                cell.style.width = (100/dims).toString() + "%"
            }
            for(let newCells = oldDims + 1; newCells <= dims; newCells++){ //inject new cells into old rows
                let cell = document.createElement("div")
                cell.classList.add("cell")
                cell.classList.add("empty")
                cell.style.width = (100 / dims) + "%";
                cell.setAttribute("id", "cell-" + newCells.toString())
                row.appendChild(cell)
                cell.addEventListener('mouseover',()=>{
                    if(cell.classList.contains('empty')){
                        cell.classList.remove("empty")
                        cell.classList.add("full")
                    }
                })
            }
        }
    }
}
