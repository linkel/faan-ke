const tomato_display = document.querySelector(".tomato-display");

for (let i = 0; i <= 48; i++) {
    const tomato = document.createElement('img');
    tomato.classList.add('teeny-tomato');
    tomato.src = './tomato_counter.png';
    tomato_display.appendChild(tomato);
}

// Timer

// Grabbing current time and calculating 25 min into the future
const date = new Date();
const timestamp = date.getTime();
const TIMER_TIME = 25 // 25 minutes baby
const date_future = new Date(date.getTime() + TIMER_TIME*60000);

const timer_fn = setInterval(() => {
      // Get todays date and time
    const now = new Date().getTime();
    // Find the distance between now and the count down date
    const distance = date_future - now;
    console.log(distance);
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.querySelector(".display").textContent = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
}, 100);