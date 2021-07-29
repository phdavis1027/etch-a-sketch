const table = document.querySelector(".table"); 
const selectors = document.querySelector(".size-container")
const tableWidth = table.getBoundingClientRect().width;
const tableHeight = table.getBoundingClientRect().height;
let dims = 10;
let etch = "stroke";
window.onload = ()=>{
    initializeTable();
    initializeSelector();
};

let mouseIsDown = false;

function initializeTable(){
    for(let i = 1; i<=dims; i++){
        let row = document.createElement("div")
        row.classList.add("row");
        table.appendChild(row);
        for(let j = 1; j<= dims;j++){
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add("empty");
            cell.style.width = dims + "%";
            cell.style.height = "100%";
            row.appendChild(cell);
        }
    }  
    
    const cells = document.querySelectorAll(".cell")
    cells.forEach((c)=>{
        c.addEventListener('mouseover',()=>{
            if(c.classList.contains('empty')){
                c.style.backgroundColor = "black";
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
}

function clearTable(){
    let rows = document.querySelectorAll(".row")
    rows.forEach((r)=>{
        let cells = r.querySelectorAll(".cell")
        cells.forEach((c)=>{
            c.style.backgroundColor="grey"
        })
    })

}