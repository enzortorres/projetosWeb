apiToken = 'a22a775a6fd0850ee5cff76cb8643bf3'

const input = document.querySelector("input")
const button = document.querySelector("button")
const theme = document.querySelector(".dark-light-theme")
const width = window.innerWidth;
let loadedData = false;

const local = document.querySelector("#local")
const degrees = document.querySelector("#graus")
const humi = document.querySelector("#humidade")
const img = document.querySelector("#img")
const imgContainer = document.querySelector(".img-container")
const imgDesc = document.querySelector(".desc-img")
const wind = document.querySelector("#vento")
const content = document.querySelector(".content")


const now = new Date()
let hora = now.getHours()
let minuto = now.getMinutes()
const semana = now.getDay()
const dia = now.getDate()
const mes = now.getMonth()

const diasSemana = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const meses = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'Agoust', 'September', 'October', 'November', 'December']
    
let day = document.querySelector(".day")
let hour = document.querySelector(".hour")
    
if (minuto < 10) minuto = ('0' + now.getMinutes())
if (hora < 10) hora = ('0' + now.getHours())


day.innerHTML = `${diasSemana[semana]}, ${meses[mes]} ${dia}`
hour.innerHTML = `Updated at ${hora}:${minuto}`

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
                    return alert("Location not found")
                }
    
                loadData(data)
            })
    } catch (error) {
        alert(error)
    }
}

function loadData(data) {
    local.innerHTML = `${data.name}, ${data.sys.country}`
    degrees.innerHTML = `<img src="images/termometro.png" class="icon"/> ${Math.floor(data.main.temp)}<sup>ºC</sup>`
    humi.innerHTML = `<img src="images/humidity-icon.png" class="icon"/> ${data.main.humidity}%`
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    switch (data.weather[0].description) {
        case 'clear sky':
            imgDesc.innerHTML = "Clear Sky"
            break
        case 'few clouds':
            imgDesc.innerHTML = "Few Clouds"
            break
        case 'scattered clouds':
            imgDesc.innerHTML = "Scattered Clouds"
            break
        case 'broken clouds':
            imgDesc.innerHTML = "Broken Clouds"
            break
        case 'overcast clouds':
            imgDesc.innerHTML = "Overcast Clouds"
            break
        case 'rain':
            imgDesc.innerHTML = "Rain"
            break
        case 'thunderstorm':
            imgDesc.innerHTML = "Thunderstorm"
            break
        case 'snow':
            imgDesc.innerHTML = "Snow"
            break
        case 'mist':
            imgDesc.innerHTML = "Mist"
            break
        case 'moderate rain':
            imgDesc.innerHTML = "Moderate Rain"
            break
        default:
            imgDesc.innerHTML = `${data.weather[0].description}`
        
    }
    wind.innerHTML = `<img src="images/wind-icon.webp" class="icon"/>  ${data.wind.speed} km/h`
    if (width > 1060) {
        imgContainer.style.display = "flex"
    }
    loadedData = true
}

function responsividade() {
    const width = window.innerWidth;

    if (width < 1060) {
        imgContainer.style.display = 'none';
    } else if (loadedData) {
        imgContainer.style.display = 'flex'
    }
}

window.addEventListener('resize', responsividade);
