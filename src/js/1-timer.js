import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/customize-libraries.css';
import pathErrorIcon from '../img/icon-error.svg';

const dateInput = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timeElements = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};
let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates.length === 0) {
      userSelectedDate = null;
      startBtn.disabled = true;
      return;
    }
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      showMessage();
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};

flatpickr(dateInput, options);

function showMessage() {
  iziToast.show({
    position: 'topRight',
    titleSize: '16px',
    titleLineHeight: '24px',
    titleColor: 'white',
    message: 'Please choose a date in the future',
    messageSize: '16px',
    messageLineHeight: '24px',
    messageColor: 'white',
    iconUrl: pathErrorIcon,
    backgroundColor: '#EF4040',
  });
}

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

startBtn.addEventListener('click', startTimer);

function updateClockItem(time) {
  timeElements.daysEl.textContent = addLeadingZero(time.days);
  timeElements.hoursEl.textContent = addLeadingZero(time.hours);
  timeElements.minutesEl.textContent = addLeadingZero(time.minutes);
  timeElements.secondsEl.textContent = addLeadingZero(time.seconds);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function startTimer() {
  startBtn.disabled = true;
  dateInput.disabled = true;
  let delta = userSelectedDate - new Date();
  const startTime = convertMs(delta);
  updateClockItem(startTime);

  const timerId = setInterval(() => {
    delta = userSelectedDate - new Date();
    if (delta <= 0) {
      clearInterval(timerId);
      updateClockItem({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      dateInput.disabled = false;
      return;
    }
    const time = convertMs(delta);
    updateClockItem(time);
  }, 1000);
}
