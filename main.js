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
        let row = createAndConfigureRow(i)
        for(let j = 1; j<= dims;j++){
           createAndConfigureCell(j, row)
        }
    }  
    
    const cells = document.querySelectorAll(".cell")
    cells.forEach((c)=>{
        c.addEventListener('mouseover',()=>{
            makeCellResponsive(c)
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
            console.log(dims)
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
        cells.forEach((c)=>{ clearCell(c)})
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
            resizeOldRow(row)
            removeOldCellsAndResizeCellsInRow(row, oldDims, dims)
        }
    }
    if(oldDims < dims){
        for(let newRows = oldDims + 1; newRows <= dims; newRows++){ //add new rows
            let row = createAndConfigureRow(newRows)
            for (let newCells = 1; newCells <= dims; newCells++){ 
                createAndConfigureCell(newCells, row)
            }
        }
        for (let rows = 1; rows <= oldDims; rows++){
            let row = table.querySelector("#row-"+rows)
            resizeOldRow(row)
            for(let newCells = 1; newCells <= dims; newCells++){ //inject new cells into old rows
                if (newCells > oldDims) createAndConfigureCell(newCells, row)
                else{
                    let cell = row.querySelector("#cell-"+newCells)
                    resizeCell(cell)
                }
            }
        }
    }
}

function makeCellResponsive(cell){ //adds the appropriate event listeners to each cell
    cell.addEventListener('mousedown',()=>{
        mouseIsDown = true
        fillCell(cell)
    })

    cell.addEventListener('mouseup',()=>{
        mouseIsDown = false
    })

    cell.addEventListener('mouseover',()=>{
        if (mouseIsDown && cell.classList.contains('empty')){
            fillCell(cell)
        }
    })
}

function fillCell(cell){ // fills in color by reference to stylesheet
        cell.classList.remove('empty')
        cell.classList.add('full')
}

function clearCell(cell){
    if(cell.classList.contains("full")){
        cell.classList.remove("full")
        cell.classList.add("empty")
    }
}

function createAndConfigureCell(num, row){
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add("empty");
    cell.style.width = (100 / dims) + "%";
    cell.setAttribute("id", "cell-" + num.toString())
    makeCellResponsive(cell)
    row.appendChild(cell);
}

function createAndConfigureRow(num){
    let row = document.createElement("div");
    row.setAttribute("id", "row-" + num.toString())
    row.classList.add("row")
    row.style.height = (100 / dims).toString() + "%"
    table.appendChild(row)
    return row
}

function resizeOldRow(row){
    row.style.height = (100/dims).toString() + "%"
}

function addNewCellsToOldRow(row, oldDim0s){
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

function removeOldCellsAndResizeCellsInRow(row,newDims){
    for (let cells = 1; cells <= newDims; cells++){
        let cell = row.querySelector("#cell-" + cells)
        if(cells > dims){
            row.removeChild(cell)
        }
        else{
            resizeCell(cell)
        }
    }
}

function resizeCell(cell){
    cell.style.width = (100 / dims) + "%"
}