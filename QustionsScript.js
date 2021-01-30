// Created By: Ziv Refaeli

var fileInput = document.getElementById("file")
var title = document.getElementById("title")
var qusTable = document.getElementById("qustions_table")
var counter = document.getElementById("counter")

var data, qustions = [], answers = [], correct = [], fileName = "Qustions.txt", counters = [0, 0]
var qustions_done = [], correct_answer = -1, clicked = -1, canRotate = false
var ansColor = "rgb(107, 105, 247)", onColor = "rgb(105, 182, 218)"

for (let i = 1; i <= 4; i++) {
    let element = document.getElementById("ans" + i)

    element.addEventListener("mouseover", () => {
        if (clicked != i) {
            element.style.backgroundColor = onColor
            element.style.cursor = "pointer"
        }
    })

    element.addEventListener("mouseout", () => {
        if (clicked != i) {
            element.style.backgroundColor = ansColor
            element.style.cursor = "pointer"
        }
    })

    element.addEventListener("click", () => {
        if (correct_answer != -1) {
            for (let j = 1; j <= 4; j++) {
                document.getElementById("ans" + j).style.backgroundColor = ansColor
            }
            element.style.backgroundColor = "gold"
            element.style.cursor = "initial"
            clicked = i
        }
    })
}

// load qustions file
fileInput.addEventListener("change", () => {
    let reader = new FileReader()
    try {
        reader.readAsText(fileInput.files[0])
    } catch {
        console.log("an error")
    }
    
    reader.onload = (event) => {
        if (fileInput.files[0].name == fileName) {

            data = event.target.result.split('\n')
            convertData(data)
            console.log("data loaded")

            fileInput.style.animation = title.style.animation = "disapper 1s 1 forwards"
        }
        else alert("הכניסו את קובץ השאלות הנכון")
    }

    reader.onerror = () => {
        console.log("an error")
    }
})

// after loading
fileInput.addEventListener("animationend", () => {
    fileInput.style.display = "none"
    document.getElementById("hold").title = ""
    title.style.display = "none"
    
    let ansCounter = document.getElementById("ansCounter")

    qusTable.style.visibility = ansCounter.style.visibility = "visible"
    qusTable.style.animation = ansCounter.style.animation = "show 1s 1 forwards"
    canRotate = true
})

// convert data to arrays
let convertData = (data) => {
    for (let i = 0; i < data.length; i++) {
        let row = data[i].split('|')
        let arr = []

        qustions.push(row[0])
        for (let j = 1; j <= 4; j++)
            arr.push(row[j])
        answers.push(arr)
        correct.push(parseInt(row[5]))
    }
}

// method that finds a [num] in [arr] 
let find = (arr, num) => {
    for (let i = 0; i < arr.length; i++)
        if (arr[i] == num)
            return true
    return false
}

// sets a random qustion on screen
let setQustion = () => {
    if (qustions_done.length != qustions.length) {
        let qusNum = random(0, qustions.length - 1)
        console.log("random qustion:", qusNum + 1)

        while (find(qustions_done, qusNum)){
            qusNum = random(0, qustions.length - 1)
        }
        qustions_done.push(qusNum)
        
        let qus = qustions[qusNum]
        let ans = answers[qusNum]
        correct_answer = correct[qusNum]

        document.getElementById("qustion").innerHTML = qus
        for (let i = 1; i <= 4; i++) {
            document.getElementById("ans" + i).innerHTML = ans[i - 1]
            document.getElementById("ans" + i).style.backgroundColor = ansColor
        }
    }
    else {
        alert("עניתם על כל השאלות!")
        let arr = ["הנדסת", "תוכנה", "<b style='font-size: 170%;'>ה</b>הבטחה", "להצלחה"]

        document.getElementById("qustion").innerHTML = "מגמת הנדסת תוכנה"
        for (let i = 1; i <= 4; i++) {
            document.getElementById("ans" + i).innerHTML = arr[i - 1]
            document.getElementById("ans" + i).style.backgroundColor = ansColor
        }
        hold.title = ""
        hold.style.cursor = "initial"
    }
}

let checkAnswer = () => {
    if (clicked != -1 && !canRotate) {
        counters[0]++
        if (clicked == correct_answer) {
            alert("תשובה נכונה!")
            counters[1]++
        }
        else {
            alert("תשובה לא נכונה!")
        }
        counter.innerHTML = `${counters[0]}/${counters[1]}`

        document.getElementById("ans" + clicked).style.backgroundColor = ansColor
        document.getElementById("ans" + correct_answer).style.backgroundColor = "green"

        clicked = correct_answer
        correct_answer = -1
        canRotate = true
        hold.title = ""
    }
}
