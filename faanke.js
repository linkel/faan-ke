// Grab buttons

start_button = document.querySelector("#start");
stop_button = document.querySelector("#stop");
reset_button = document.querySelector("#reset");

pomodoro_button = document.querySelector("#pomodoro");
short_break_button = document.querySelector("#short");
long_break_button = document.querySelector("#long");

start_button.addEventListener("click", () => timer_start());
stop_button.addEventListener("click", () => timer_stop());
reset_button.addEventListener("click", () => timer_reset());

pomodoro_button.addEventListener("click", () => set_pomodoro());
short_break_button.addEventListener("click", () => set_short());
long_break_button.addEventListener("click", () => set_long());

// Temp generate tomatoes for testing image

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
let TIMER_TIME = 25;
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

// identical to resetting timer.
const set_pomodoro = () => {
    if (isRunning) {
        clearInterval(timer_fn);
        TIMER_TIME = 25;
        time_remaining = 0;
        isRunning = false;
        timer_display.textContent = "25:00";
    } else {
        TIMER_TIME = 25;
        time_remaining = 0;
        timer_display.textContent = "25:00";
    }
    pomodoro_button.classList.remove("top-button");
    pomodoro_button.classList.add("top-button-selected");
    short_break_button.classList.remove("top-button-selected");
    short_break_button.classList.add("top-button");
    long_break_button.classList.remove("top-button-selected");
    long_break_button.classList.add("top-button");
}

const set_short = () => {
    if (isRunning) {
        clearInterval(timer_fn);
        TIMER_TIME = 5;
        time_remaining = 0;
        isRunning = false;
        timer_display.textContent = "05:00";
    } else {
        TIMER_TIME = 5;
        time_remaining = 0;
        timer_display.textContent = "05:00";
    }
    pomodoro_button.classList.remove("top-button-selected");
    pomodoro_button.classList.add("top-button");
    short_break_button.classList.remove("top-button");
    short_break_button.classList.add("top-button-selected");
    long_break_button.classList.remove("top-button-selected");
    long_break_button.classList.add("top-button");
}

const set_long = () => {
    if (isRunning) {
        clearInterval(timer_fn);
        TIMER_TIME = 10;
        time_remaining = 0;
        isRunning = false;
        timer_display.textContent = "10:00";
    } else {
        TIMER_TIME = 10;
        time_remaining = 0;
        timer_display.textContent = "10:00";
    }
    pomodoro_button.classList.remove("top-button-selected");
    pomodoro_button.classList.add("top-button");
    short_break_button.classList.remove("top-button-selected");
    short_break_button.classList.add("top-button");
    long_break_button.classList.remove("top-button");
    long_break_button.classList.add("top-button-selected");
}