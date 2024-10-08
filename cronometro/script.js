const timerText = document.querySelector('#timer')
let intervalId = 0
let timer = 0

const formatTime = (time) => {
    const hours = Math.floor(time / 360000)
    const minutes = Math.floor((time % 360000) / 6000)
    const seconds = Math.floor((time % 6000) / 100)
    const hundredths = time % 100

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`
}

const toggleTimer = () => {
    const button = document.querySelector('#power')
    const action = button.getAttribute('action')

    clearInterval(intervalId)

    if (action == 'start' || action == 'continue') {
        intervalId = setInterval(() => {
            timer += 1
            setTimer(timer)
        }, 10)
        button.setAttribute('action', 'pause')
        button.innerHTML = '<i class="bx bx-pause"></i>'
    } else if (action == 'pause') {
        button.setAttribute('action', 'continue')
        button.innerHTML = '<i class="bx bx-play"></i>'
    }
}

const resetTimer = () => {
    clearInterval(intervalId)
    timer = 0
    setTimer(timer)
    const button = document.querySelector('#power')
    button.setAttribute('action', 'start')
    button.innerHTML = '<i class="bx bx-play"></i>'
}

const setTimer = (time) => {
    timerText.innerText = formatTime(time)
}

document.querySelector('#power').addEventListener("click", toggleTimer)
document.querySelector('#reset').addEventListener("click", resetTimer)