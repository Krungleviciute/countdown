
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const datePicker = document.getElementById('date-picker');

const countdownTitle = document.getElementById("countdown-title");
const countdownResetButton = document.getElementById("countdown-reset-button");
const countdownEl = document.getElementById('countdown');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById("complete");
const completeInfo = document.getElementById("complete-info");
const completeButton = document.getElementById("complete-button");

let countdownTitleText = "";
let countdownDate = "";
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Daate input minimum Today's date
const today = new Date().toISOString().split("T")[0];
datePicker.setAttribute('min', today);


//  Populate Countdown / CompleteUI
const updateDOM = () => {

    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        inputContainer.hidden = true;
        if(distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeInfo.textContent = `${countdownTitleText} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            countdownTitle.textContent = `${countdownTitleText}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second)
}


// Take Values from Form input
const updateCountdown = (event) => {
    event.preventDefault();
    
    countdownTitleText = event.srcElement[0].value;
    countdownDate = event.srcElement[1].value;

    savedCountdown = {
        title: countdownTitleText,
        date: countdownDate,
    };

    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    if(countdownDate === ""){
        alert("Please select a date for countdown value!")
    } else {
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

const resetCountDown = () => {
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);

    countdownTitleText = "";
    countdownDate = "";

    localStorage.removeItem('countdown')
}

const restorePrevCountdown = () => {
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'))
        countdownTitleText = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM()
    } 
}


// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownResetButton.addEventListener('click', resetCountDown);
completeButton.addEventListener('click', resetCountDown);

restorePrevCountdown()

