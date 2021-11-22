const lightSwitch = document.getElementById("switch")
const lightdisplay = document.getElementById("display")

const body = document.getElementById("body")
const main = document.getElementById("main")
const listbody = document.getElementById("list-item")
const content = document.getElementById("content")

let allbtn = document.getElementById("all")
let activebtn = document.getElementById("active")
let completebtn = document.getElementById("complete")

let allbtnfl = document.getElementById("allfl")
let activebtnfl = document.getElementById("activefl")
let completebtnfl = document.getElementById("completefl")
let datas = [

]

const toggle = () => {
    if (lightSwitch.checked) {
        let lightComponents = document.querySelectorAll(".white-bg")
        let lightText = document.querySelectorAll(".ff-black")
        lightdisplay.setAttribute("src", "./images/icon-moon.svg")
        lightComponents.forEach(key => {
            key.classList.add("black-bg")
            key.classList.remove("white-bg")
        })
        lightText.forEach(key => {
            key.classList.add("ff-white")
            key.classList.remove("ff-black")
        })
        body.classList.add("body-dr")
        body.classList.remove("body-lg")
        main.classList.add("shadow-dr")
        main.classList.remove("shadow-lg")
    } else {
        let lightComponents = document.querySelectorAll(".black-bg")
        let lightText = document.querySelectorAll(".ff-white")
        lightdisplay.setAttribute("src", "./images/icon-sun.svg")
        lightComponents.forEach(key => {
            key.classList.remove("black-bg")
            key.classList.add("white-bg")
        })
        lightText.forEach(key => {
            key.classList.add("ff-black")
            key.classList.remove("ff-white")
        })
        body.classList.add("body-lg")
        body.classList.remove("body-dr")
        main.classList.remove("shadow-dr")
        main.classList.add("shadow-lg")
    }
}
const checkTask = (id) => {
    const label = document.getElementById(`text-${id}`);
    if (document.getElementById(id).checked) {
        label.classList.add("ff-line")
        label.classList.add("ff-opacity")
        datas.forEach(data => {
            if (id === data.id.toString()) {
                data.complete = true;
            }
        })
    } else {
        label.classList.remove("ff-line")
        label.classList.remove("ff-opacity")
        datas.forEach(data => {
            if (id === data.id.toString()) {
                data.complete = false;
            }
        })
    }
    console.log(datas)
    All()
    count()
}

const addlist = () => {
    const checkbox = document.getElementById("checkbox")
    let font = ""
    let bg = ""
    if (lightSwitch.checked) {
        font = "ff-white"
        bg = "black-bg"
    } else {
        font = "ff-black"
        bg = "white-bg"
    }
    checkbox.checked = false
    if (content.value !== "") {
        let div = document.createElement("div")
        let index = Math.floor(Math.random() * 1000);
        div.setAttribute("class", `flex ${bg} container task center`)
        div.setAttribute("id", `container-${index}`)
        div.setAttribute("style", `gap: 1.5rem;`)
        div.innerHTML =
            `
                <div class="round">
                    <input type="checkbox" id="${index}" onclick="checkTask('${index}')" />
                    <label for="${index}"></label>
                </div>
                <label class="fs-400 ${font}" for="${index}" id="text-${index}" onclick="checkTask('${index}')" style="margin-top: 0.5rem;">${content.value}</label>
                <a href="#" class="cross-btn" style="margin-top: 0.5rem;" onclick ="removeList('${index}')"><img src="images/icon-cross.svg"></a>
            `
        listbody.appendChild(div)
        datas.push({
            complete: false,
            id: index
        })
        content.value = ""
    }
    count()
}

const count = () => {
    let i = 0
    let countDisplay = document.getElementById("count")
    let count = document.getElementById("countfl")
    if (countDisplay === null) {

        datas.forEach(data => {
            if (data.complete == false) {
                i++
            }
        })

        count.innerText = `${i} item left`
    } else {
        datas.forEach(data => {
            if (data.complete == false) {
                i++
            }
        })

        countDisplay.innerText = `${i} item left`
    }
    count.innerText = `${i} item left`
}

const All = () => {
    document.querySelectorAll(".choice").forEach(data => {
        data.setAttribute("aria-checked", "false")
    })
    allbtn.setAttribute("aria-checked", "true")
    allbtnfl.setAttribute("aria-checked", "true")

    datas.forEach(data => {
        let card = document.getElementById(`container-${data.id.toString()}`)
        card.style.display = "flex"
    })
}

const active = () => {
    All()
    document.querySelectorAll(".choice").forEach(data => {
        data.setAttribute("aria-checked", "false")
    })
    activebtn.setAttribute("aria-checked", "true")
    activebtnfl.setAttribute("aria-checked", "true")

    datas.forEach(data => {
        if (data.complete === true) {
            let card = document.getElementById(`container-${data.id.toString()}`)
            card.style.display = "none"
        }
    })
}

const completed = () => {
    All()
    document.querySelectorAll(".choice").forEach(data => {
        data.setAttribute("aria-checked", "false")
    })
    completebtn.setAttribute("aria-checked", "true")
    completebtnfl.setAttribute("aria-checked", "true")

    datas.forEach(data => {
        if (data.complete === false) {
            let card = document.getElementById(`container-${data.id.toString()}`)
            card.style.display = "none"
        }
    })
}

const clearComplete = () => {
    datas.forEach(data => {
        if (data.complete === true) {
            removeList(data.id)
        }
    })
    datas = datas.filter(data => data.complete !== true)
}

const removeList = (id) => {
    listbody.removeChild(document.getElementById(`container-${id}`))
    datas = datas.filter(data => data.id.toString() !== id)
}




/* sortable */
const dragArea = document.querySelector(".list-item")
new Sortable(dragArea, {
    animation: 350
})