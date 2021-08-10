"use strict";

const table = document.querySelector(".table"); 
const selectors = document.querySelector(".size-container");
const tableWidth = table.getBoundingClientRect().width;
const tableHeight = table.getBoundingClientRect().height;
const clearButton = document.querySelector(".reset");
const wildCard = document.querySelector(".wildcard");
const body = document.querySelector("body");
const reset = document.querySelector(".reset");
const erase = document.querySelector(".erase");
const etch = document.querySelector(".etch")
const techno = document.querySelector(".techno")


const pointHandlerDotDrawer = function(){
    if(!isErasing){
        fillCell(this);
        this.removeEventListener('mousedown', pointHandlerDotDrawer)
    }
}

const strokeHandler = function(){

    if(!isErasing){
        if (mouseIsDown && this.classList.contains('empty')){
            fillCell(this)
            this.removeEventListener("mouseover", strokeHandler)
        }
    }
}

const eraseHandlerMouseDown = function(){
    clearCell(this)
    this.removeEventListener('mousedown', eraseHandlerMouseDown)
}
const eraseHandlerMouseOver = function(){
    clearCell(this)
    this.removeEventListener('mouseover', eraseHandlerMouseDown)
}

let isErasing = false;
let isCrazy = false;
let mouseIsDown = false;
let dims = 10;
let fillCell;
window.onload = ()=>{
    initializeTable();
    initializeSelector();
    initializeControls();
};


function initializeControls(){
    clearButton.addEventListener('click',clearTable);
    wildCard.addEventListener('click', goCrazy);
    erase.addEventListener('click',toggleErase);
}

let toggleErase = function(){
    if(!isErasing){
        for (let rows = 1; rows <= dims; rows++){
            let row = table.querySelector("#row-"+rows);
            for(let cells = 1; cells<=dims; cells++){
                let cell = row.querySelector("#cell-"+cells);
                cell.removeEventListener('mousedown', pointHandlerDotDrawer)
                cell.removeEventListener('mouseover', strokeHandler)
                if(cell.classList.contains("full")){

        

                    cell.addEventListener('mouseover', eraseHandlerMouseOver)
                    cell.addEventListener('mouseover', ()=>{
                        cell.removeEventListener('mousedown', eraseHandlerMouseDown)
                    })

                    cell.addEventListener('mousedown', eraseHandlerMouseDown) 
                    cell.addEventListener('mousedown', ()=>{
                        cell.removeEventListener('mouseover', eraseHandlerMouseOver)
                    })


                }
            }
        }
        erase.style.boxShadow = "inset 2px 2px 1px darkgray"
        isErasing = true;
        return
    }
    if(isErasing){
        for (let rows = 1; rows <= dims; rows++){
            let row = table.querySelector("#row-"+rows);
            for(let cells = 1; cells<=dims; cells++){
                let cell = row.querySelector("#cell-"+cells);
                cell.removeEventListener('mouseover', eraseHandlerMouseOver)
                cell.removeEventListener('mousedown', eraseHandlerMouseDown) 

                cell.addEventListener('mousedown', pointHandlerDotDrawer)
                cell.addEventListener('mouseover', strokeHandler)
            }
        }
        erase.style.boxShadow = '';
        isErasing = false;
    }
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
    let selectorDivs = selectors.querySelectorAll("div");
    updateSlider(dims, selectorDivs)
}

function injectSlider(){
    for (let i = 1; i <= 64; i++){
        let sizeChoice = document.createElement("div")
        sizeChoice.setAttribute("id", i.toString())
        sizeChoice.setAttribute("class", "size-choice")
        sizeChoice.setAttribute("flex-shrink", "1")
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
            if(!isCrazy){
                if (divSize <= size){
                    s.style.backgroundColor = "black"
                    s.style.border = "solid black"
                }else{
                    s.style.backgroundColor = "grey"
                    s.style.border = "solid grey"
                }
            }else{
                if(divSize <= size){
                    let r = getRandomInt(0, 255);
                    let g = getRandomInt(0, 255);
                    let b = getRandomInt(0, 255);
                    let a = 0.5;
                    s.style.backgroundColor = "rgba(" + r + "," + g + "," + b + "," + a + ")"; 
                    s.style.border = "solid rgba(" + r + "," + g + "," + b + "," + a + ")"; 
                    s.style.backgroundClip = "content-box";
                }else{
                    s.style.backgroundColor = "cadetblue"
                    s.style.border = "solid cadetblue"
                }
            }
        })
}

function goCrazy(){
    if(!isCrazy){
        isCrazy = true;
        giveCrazyLook();
        techno.currentTime = 10;
        techno.play();
        document.querySelectorAll(".reset").forEach((s)=>{
            s.addEventListener("mousedown", ()=>{
                location = location
            });
        })
    }
}


let giveCrazyLook = function(){
    body.classList.add("bg-crazy");
    let controls = document.querySelector(".etch");
    controls.removeChild(document.querySelector(".stroke"));
    controls.removeChild(document.querySelector(".erase"));
    controls.removeChild(document.querySelector(".wildcard"))
    if(isErasing){
        toggleErase();
    }
    fillCell = function(cell){
        let r = getRandomInt(0, 255);
        let g = getRandomInt(0, 255);
        let b = getRandomInt(0, 255);
        let a = 0.5;
        cell.style.backgroundColor=  "rgba(" + r + "," + g + "," + b + "," + a + ")"; 
    }
    for (let rows = 1; rows <= dims; rows++){ //change all currently existing cells to the weird way of drawing
        let row = table.querySelector("#row-"+rows) //and make sure empty cells get filled with weird colors
      for (let cells = 1; cells <= dims; cells++){
        let cell = row.querySelector("#cell-"+cells)
        cell.classList.add("cell-crazy")
        if(cell.classList.contains("full")) {
            clearCell(cell);
            fillCell(cell);
        }
      }
    }

    let selectorDivs = selectors.querySelectorAll(".size-choice")
    selectorDivs.forEach((s)=>{
        let r = getRandomInt(0, 255);
        let g = getRandomInt(0, 255);
        let b = getRandomInt(0, 255);
        let a = 0.5;
        let divSize = parseInt(s.getAttribute("id"))
        if (divSize <= dims){
            s.style.backgroundColor = "rgba(" + r + "," + g + "," + b + "," + a + ")"; 
            s.style.border = "solid rgba(" + r + "," + g + "," + b + "," + a + ")"; 
            s.style.backgroundClip = "content-box";
        }else{
            s.style.backgroundColor = "cadetblue"
            s.style.border = "solid cadetblue"
        }
    })

    selectors.classList.add("ps-crazy")
    etch.classList.add("ps-crazy")
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

fillCell = function(cell){ // fills in color by reference to stylesheet
    cell.classList.remove('empty')
    cell.classList.add('full')
}

function makeCellResponsive(cell){ //adds the appropriate event listeners to each cell


    cell.addEventListener('mousedown',function pointHandlerMouseRegister(){
        mouseIsDown = true;
    })

    cell.addEventListener('mousedown', pointHandlerDotDrawer) //we want any event that fills in the cell to remove any other event
    cell.addEventListener('mousedown', ()=>{                  //event listener with an argument that that would also fill the cell
        cell.removeEventListener('mouseover', strokeHandler)
    })

    cell.addEventListener('mouseup',function mouseupHandler(){
        mouseIsDown = false
    })

    cell.addEventListener('mouseover', strokeHandler)
    cell.addEventListener('mouseover', ()=>{
        cell.removeEventListener('mousedown', pointHandlerDotDrawer)
    })
}



function clearCell(cell){
    if(cell.classList.contains("full")){
        cell.classList.remove("full")
        cell.classList.add("empty")
    }
    if(isCrazy){
        cell.style.backgroundColor = "cadetblue"
    }
}

function createAndConfigureCell(num, row){
    let cell = document.createElement("div");
    if(isCrazy){cell.classList.add("cell-crazy")}
    cell.classList.add("cell");
    cell.classList.add("empty");
    cell.style.width = (100 / dims) + "%";
    cell.setAttribute("id", "cell-" + num.toString())
    makeCellResponsive(cell);
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









