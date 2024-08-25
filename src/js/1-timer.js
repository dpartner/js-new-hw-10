// Описаний в документації
import flatpickr from 'flatpickr';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
const button = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const timer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate;

const dateOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      userSelectedDate = selectedDates[0];
      button.disabled = false;
    } else {
      button.setAttribute('disabled', '');
      iziToast.show({
        title: 'Hey',
        message: 'Please choose a date in the future',
        theme: 'dark',
        titleColor: 'black',
        messageColor: 'black',
        color: 'red',
        position: 'topRight',
      });
    }
  },
};

flatpickr(dateInput, dateOptions);

button.addEventListener('click', handleTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function handleTimer() {
  const intervalId = setInterval(() => {
    const time = userSelectedDate - Date.now();
    if (time > 0) {
      const timeLeft = convertMs(time);
      for (let key in timeLeft) {
        // console.log(timeLeft[key]);
        timer[key].textContent = addLeadingZero(timeLeft[key]);
        dateInput.setAttribute('disabled', '');
        button.setAttribute('disabled', '');
      }
    } else {
      clearInterval(intervalId);
      dateInput.removeAttribute('disabled');
    }
  }, 1000);
}

function addLeadingZero(value) {
  if (value.toString().length === 1) {
    return `0${value}`;
  }
  return value;
}
