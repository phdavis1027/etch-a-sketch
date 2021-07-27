const dims = 10; //testing out ideal way to get a grid up and running

const table = document.querySelector(".table"); 
let etch;
window.onload = ()=>{
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
            cell.style.width = dims.toString() + "%";
            cell.style.height = "100%";
            row.appendChild(cell);
        }
    }  
    
    const cells = document.querySelectorAll(".cell");
    cells.forEach((c)=>{
        c.addEventListener('mouseover',()=>{
            if(c.classList.contains('empty')){
                c.style.backgroundColor = "blue";
                c.classList.remove('empty')
            }
        })
    })
};

