// Created By: Ziv Refaeli

var root = document.documentElement
var wheel = document.getElementById("wheel")
var hold = document.getElementById("hold")
var totalDeg = 0, rotating = false

let random = (min, max) => {
    return value = Math.floor(Math.random() * (max - min + 1)) + min
}

wheel.addEventListener("animationend", () => {
    wheel.style.transform = `rotate(${totalDeg}deg)`
    wheel.style.animation = ""

    console.log("done, totalDeg:", totalDeg)
    rotating = false
    hold.style.cursor = "pointer"

    canRotate = false
    clicked = -1
    setQustion()
})

hold.addEventListener("click", () => {
    if (!rotating && canRotate) {
        rotating = true
        hold.style.cursor = "initial"

        let deg = random(120, 480)
        let time = random(2, 4)
        console.log("random deg:", deg)
        console.log("random time:", time)
        
        root.style.setProperty("--start_deg", totalDeg + "deg")
        root.style.setProperty("--stop_deg", (totalDeg + deg) + "deg")

        totalDeg = (totalDeg + deg) % 360
        wheel.style.animation = `spin ${time}s 1`
        
        hold.title = "ענו על השאלה"
    }
})
