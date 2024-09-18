import { apiToken } from './config.js'
console.log(apiToken)

const input = document.querySelector("input")
const button = document.querySelector("button")
const theme = document.querySelector(".dark-light-theme")
const width = window.innerWidth;

const local = document.querySelector("#local")
const degrees = document.querySelector("#graus")
const img = document.querySelector("#img")
const imgContainer = document.querySelector(".img-container")
const imgDesc = document.querySelector(".desc-img")
const wind = document.querySelector("#vento")
const content = document.querySelector(".content")


const agora = new Date()
let hora = agora.getHours()
let minuto = agora.getMinutes()
const semana = agora.getDay()
const dia = agora.getDate()
const mes = agora.getMonth()

const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    
let day = document.querySelector(".day")
let hour = document.querySelector(".hour")
    
if (minuto < 10) minuto = ('0' + agora.getMinutes())
if (hora < 10) hora = ('0' + agora.getHours())


day.innerHTML = `${diasSemana[semana]}, ${dia} de ${meses[mes]}`
hour.innerHTML = `Atualizado às ${hora}:${minuto}`

theme.addEventListener("click", () => {
    switchTheme()
})

button.addEventListener("click", () => {
    if(!input.value) return
    
    getDataApi()
})

async function switchTheme() {
    let className = document.body.className;
    if (className == "light-theme") {
        content.style = "background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('images/praia_noite2.jpg') no-repeat; background-size: cover; background-position: center;"
    } else {
        content.style = "background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('images/praia.jpg') no-repeat; background-size: cover; background-position: center;"
    }
    document.body.classList.toggle('dark-theme')
    theme.classList.toggle('bxs-sun')
    
}

async function getDataApi() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}&units=metric&appid=${apiToken}`

    try {
        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data?.cod && data.cod === "404") {
                    return alert("Local não encontrado")
                }
    
                loadData(data)
            })
    } catch (error) {
        alert(error)
    }
}

function loadData(data) {
    local.innerHTML = `${data.name}, ${data.sys.country}`
    degrees.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}<sup>ºC</sup>`
    console.log(data.weather)
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    switch (data.weather[0].description) {
        case 'clear sky':
            imgDesc.innerHTML = "Céu limpo"
            break
        case 'few clouds':
            imgDesc.innerHTML = "Poucas nuvens"
            break
        case 'scattered clouds':
            imgDesc.innerHTML = "Nuvens dispersas"
            break
        case 'broken clouds':
            imgDesc.innerHTML = "Nuvens fragmentadas"
            break
        case 'overcast clouds':
            imgDesc.innerHTML = "Nuvens sobrecarregadas"
            break
        case 'rain':
            imgDesc.innerHTML = "Chuva"
            break
        case 'thunderstorm':
            imgDesc.innerHTML = "Tempestade"
            break
        case 'snow':
            imgDesc.innerHTML = "Neve"
            break
        case 'mist':
            imgDesc.innerHTML = "Névoa"
            break
        default:
            imgDesc.innerHTML = `Not found`
    }
    wind.innerHTML = `Vento: ${data.wind.speed} km/h`
    if (width > 1060) {
        imgContainer.style.display = "flex"
    }
}

function responsividade() {
    const width = window.innerWidth;

    if (width < 1060) {
        imgContainer.style.display = 'none';
    } else if (local.value) {
        imgContainer.style.display = 'flex'
    }
}

window.addEventListener('resize', responsividade);
