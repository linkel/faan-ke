const tomato_display = document.querySelector(".tomato-display");
const timer_display = document.querySelector(".display");

for (let i = 0; i <= 48; i++) {
    const tomato = document.createElement('img');
    tomato.classList.add('teeny-tomato');
    tomato.src = './tomato_counter.png';
    tomato_display.appendChild(tomato);
}

// Timer

let isRunning = false;
let timer_fn;
const TIMER_TIME = 25;
let time_remaining = 0;

const timer_start = () => {
    if (isRunning) {
        return
    } else {
        isRunning = true;
    }
    let date_future;
    // Grabbing current time and calculating 25 min into the future if there's no stored remaining time
    if (time_remaining === 0) {
        const date = new Date();
        date_future = new Date(date.getTime() + TIMER_TIME*60000);
    } else {
        const date= new Date();
        date_future = new Date(date.getTime() + time_remaining*60000);
    }

    timer_fn = setInterval(() => {
        const now = new Date().getTime();
        // Find the distance between now and the future date
        const distance = date_future - now;
        // Time remaining is used for the stop functionality to restart at where we left off
        time_remaining = (distance % (1000 * 60 * 60)) / (1000 * 60);
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        timer_display.textContent = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
        if (distance < 0) {
            clearInterval(timer_fn);
            timer_display.textContent = "00:00";
            isRunning = false;
          }
    }, 100);
}

const timer_stop = () => {
    if (isRunning) {
        clearInterval(timer_fn);
        isRunning = false;
    } else {
        return // won't do anything if the timer isn't running
    }
}

const timer_reset = () => {
    if (isRunning) {
        clearInterval(timer_fn);
        time_remaining = 0;
        isRunning = false;
        timer_display.textContent = "25:00";
    } else {
        time_remaining = 0;
        timer_display.textContent = "25:00";
    }
}

start_button = document.querySelector("#start");
stop_button = document.querySelector("#stop");
reset_button = document.querySelector("#reset");

start_button.addEventListener("click", () => timer_start());
stop_button.addEventListener("click", () => timer_stop());
reset_button.addEventListener("click", () => timer_reset());