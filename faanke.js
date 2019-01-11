// Grab DOM elements

const start_button = document.querySelector("#start");
const stop_button = document.querySelector("#stop");
const reset_button = document.querySelector("#reset");
const clear_button = document.querySelector("#clear");

const pomodoro_button = document.querySelector("#pomodoro");
const short_break_button = document.querySelector("#short");
const long_break_button = document.querySelector("#long");

start_button.addEventListener("click", () => timer_start());
stop_button.addEventListener("click", () => timer_stop());
reset_button.addEventListener("click", () => timer_reset());
clear_button.addEventListener("click", () => clear_tomatoes());

pomodoro_button.addEventListener("click", () => set_pomodoro());
short_break_button.addEventListener("click", () => set_short());
long_break_button.addEventListener("click", () => set_long());

const tomato_display = document.querySelector(".tomato-display");
const timer_display = document.querySelector(".display");

const minutes_total = document.querySelector(".minutes-total");

let global_log;

// Create log table elements
const createTable = () => {
    const log_table = document.createElement("table");
    const first_row = document.createElement("tr")
    const first_header = document.createElement("th")
    first_header.textContent = "Start Time";
    const second_header = document.createElement("th")
    second_header.textContent = "End Time";
    first_row.appendChild(first_header);
    first_row.appendChild(second_header);
    log_table.appendChild(first_row);
    log_table.id = "log-table";
    console.log(log_table);
    const log_content = document.querySelector(".log-content");
    for (let i = 0; i < global_log.length; i++) {
        let table_data_1 = document.createElement("td");
        let table_data_2 = document.createElement("td");
        table_data_1.textContent = global_log[i].start_time;
        table_data_2.textContent = global_log[i].stop_time;
        let new_row = document.createElement("tr");
        new_row.appendChild(table_data_1);
        new_row.appendChild(table_data_2);
        log_table.appendChild(new_row);
    }
    if (log_content.children[1]) {
    log_content.replaceChild(log_table, log_content.children[1]);
    } else {
    log_content.appendChild(log_table);
    }
}

// Local Storage and Display Initialization

const minutes_productive = (integer) => {
    result = 25 * integer;
    result = result + " minutes";
    document.querySelector(".minutes-total").textContent = result;
}


const constructLog = () => {
    if ("log" in localStorage) {
        //do stuff with log
        const parsed_log = JSON.parse(localStorage.getItem('log'));
        console.log(parsed_log);
        return parsed_log
    } else {
        localStorage.setItem('log', JSON.stringify([]))
        console.log("no log in localStorage");
        const unparsed_log = [];
        return unparsed_log;
    }
}

const startup = () => {
    tomato_storage = localStorage.getItem('tomatoes');
    if (tomato_storage) {
        for (let i = 0; i < parseInt(tomato_storage); i++) {
            const tomato = document.createElement('img');
            tomato.classList.add('teeny-tomato');
            tomato.src = './tomato_counter.png';
            tomato_display.appendChild(tomato);
        }
    } else {
        localStorage.setItem('tomatoes', "0");
    }
    num_of_teeny_tomatoes = document.querySelectorAll(".teeny-tomato").length;
    minutes_productive(num_of_teeny_tomatoes);
    global_log = constructLog();
    createTable();
}

startup();

// Timer Logic

const POMODORO_LENGTH = 25;
let isRunning = false;
let timer_fn;
let timer_time = POMODORO_LENGTH
let time_remaining = 0;
let is_pomodoro = true;

const timer_start = () => {
    if (isRunning) {
        return
    } else {
        isRunning = true;
    }
    let date_future;
    let date;
    // Grabbing current time and calculating 25 min into the future if there's no stored remaining time
    if (time_remaining === 0) {
        date = new Date();
        date_future = new Date(date.getTime() + timer_time*60000);
    } else {
        date= new Date();
        date_future = new Date(date.getTime() + time_remaining*60000);
    }
    const date_readable = date.toString();
    const date_future_readable = date_future.toString();

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
            num_of_teeny_tomatoes = document.querySelectorAll(".teeny-tomato").length;
            if (is_pomodoro && num_of_teeny_tomatoes <= 58) {
                const tomato = document.createElement('img');
                tomato.classList.add('teeny-tomato');
                tomato.src = './tomato_counter.png';
                tomato_display.appendChild(tomato);
            }
            num_of_teeny_tomatoes = document.querySelectorAll(".teeny-tomato").length; // twice to update the number for following function
            minutes_productive(num_of_teeny_tomatoes);
            tomato_storage = localStorage.getItem('tomatoes');
            localStorage.setItem('tomatoes', (parseInt(tomato_storage) + 1).toString());
            console.log(global_log);
            global_log.push({start_time:date_readable, stop_time: date_future_readable});
            console.log(global_log);
            localStorage.setItem('log', JSON.stringify(global_log));
            createTable();
            time_remaining = 0;
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

// essentially identical to resetting timer
const set_pomodoro = () => {
    if (isRunning) {
        clearInterval(timer_fn);
        timer_time = POMODORO_LENGTH;
        time_remaining = 0;
        isRunning = false;
        timer_display.textContent = "25:00";
    } else {
        timer_time = POMODORO_LENGTH;
        time_remaining = 0;
        timer_display.textContent = "25:00";
    }
    pomodoro_button.classList.remove("top-button");
    pomodoro_button.classList.add("top-button-selected");
    short_break_button.classList.remove("top-button-selected");
    short_break_button.classList.add("top-button");
    long_break_button.classList.remove("top-button-selected");
    long_break_button.classList.add("top-button");
    is_pomodoro = true;
}

const set_short = () => {
    if (isRunning) {
        clearInterval(timer_fn);
        timer_time = 5;
        time_remaining = 0;
        isRunning = false;
        timer_display.textContent = "05:00";
    } else {
        timer_time = 5;
        time_remaining = 0;
        timer_display.textContent = "05:00";
    }
    pomodoro_button.classList.remove("top-button-selected");
    pomodoro_button.classList.add("top-button");
    short_break_button.classList.remove("top-button");
    short_break_button.classList.add("top-button-selected");
    long_break_button.classList.remove("top-button-selected");
    long_break_button.classList.add("top-button");
    is_pomodoro = false;
}

const set_long = () => {
    if (isRunning) {
        clearInterval(timer_fn);
        timer_time = 10;
        time_remaining = 0;
        isRunning = false;
        timer_display.textContent = "10:00";
    } else {
        timer_time = 10;
        time_remaining = 0;
        timer_display.textContent = "10:00";
    }
    pomodoro_button.classList.remove("top-button-selected");
    pomodoro_button.classList.add("top-button");
    short_break_button.classList.remove("top-button-selected");
    short_break_button.classList.add("top-button");
    long_break_button.classList.remove("top-button");
    long_break_button.classList.add("top-button-selected");
    is_pomodoro = false;
}

// Clear Pomodoros

const clear_tomatoes = () => {
    while (tomato_display.firstChild) {
        tomato_display.removeChild(tomato_display.firstChild);
    }
    localStorage.setItem('tomatoes', "0");
    minutes_productive(0);
}

// Menu Functionality

const openAbout = () => {
    mask.style.display = "block";
    about.style.display = "block";
}
  
const closeAbout = () => {
  if (mask.style.display == "block") {
    mask.style.display = "none";
  }
  if (about.style.display == "block") {
    about.style.display = "none";
  }
}

const openLog = () => {
    mask.style.display = "block";
    log_page.style.display = "block";
}

const closeLog = () => {
    if (mask.style.display == "block") {
        mask.style.display = "none";
    }
    if (log_page.style.display == "block") {
        log_page.style.display = "none";
    }
}

// Clear log

const clearPomodoroLog = () => {
    console.log("log cleared??");
    localStorage.setItem('log', JSON.stringify([]));
    global_log = [];
    createTable();
    clear_tomatoes();
}

const mask = document.querySelector(".mask");
const about_button = document.querySelector("#about");
const about = document.querySelector(".about-content")
const closeArea = document.querySelector(".mask");
const log_button = document.querySelector("#log");
const log_page = document.querySelector(".log-content")
const clear_log_button = document.querySelector("#clear-log");

// click handlers that call menu functions
about_button.addEventListener("click", openAbout);
closeArea.addEventListener("click", closeAbout);
log_button.addEventListener("click", openLog);
closeArea.addEventListener("click", closeLog);
clear_log_button.addEventListener("click", clearPomodoroLog);
