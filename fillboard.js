document.querySelector(["h1"]).style.color = "green"
let time = 0
let startTime = false


    


function timeUp (){
    if(startTime === true){
    time++}
    document.getElementById("time").textContent = time
}

let timePassed = setInterval(timeUp, 100)



