const dims = 10; //testing out ideal way to get a grid up and running
const table = document.querySelector(".table"); 
const selectors = document.querySelector(".size-container")
let etch = "stroke";
window.onload = ()=>{
    initializeTable();
    initializeSelector();
};

function initializeTable(){
    let tableWidth = table.getBoundingClientRect().width;
    let tableHeight = table.getBoundingClientRect().height;
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
    let selectorDivs = selectors.querySelectorAll(".div");
    selectorDivs.forEach((s)=>{
        s.addEventListener("click", ()=>{
            console.log("event heard")
            let size = s.getAttribute("id")
            dims = parseInt(size)
            updateSlider(size, selectorDivs);
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