import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector("[data-start]");
const dateTimePicker = document.querySelector("#datetime-picker");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let countdownInterval = null;

// Функція оновлення стану кнопки
function updateButtonState(button, isDisabled) {
  if (isDisabled) {
    button.disabled = true;
    button.style.backgroundColor = "#f0f0f0";
    button.style.cursor = "not-allowed";
    button.style.color = "black";
  } else {
    button.disabled = false;
    button.style.backgroundColor = "#007bff";
    button.style.cursor = "pointer";
    button.style.color = "white";
  }
}

// Встановлення початкового стану кнопки
updateButtonState(startButton, true);

// Ініціалізація flatpickr
flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({ message: "Please choose a date in the future" });
      updateButtonState(startButton, true);
    } else {
      userSelectedDate = selectedDate;
      updateButtonState(startButton, false);
    }
  },
});

// Функція форматування часу
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

// Функція конвертації часу
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція оновлення таймера
function updateTimerUI({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// Старт таймера
startButton.addEventListener("click", () => {
  updateButtonState(startButton, true);
  dateTimePicker.disabled = true;

  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = userSelectedDate - now;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      dateTimePicker.disabled = false;
      iziToast.success({ message: "Countdown completed!" });
      return;
    }

    const time = convertMs(timeDifference);
    updateTimerUI(time);
  }, 1000);
});

// Загальні стилі для body
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.minHeight = "100vh";
document.body.style.margin = "0";
document.body.style.backgroundColor = "#f9f9f9";

// Динамічні стилі для кнопки
startButton.addEventListener("mouseover", () => {
  if (!startButton.disabled) {
    startButton.style.backgroundColor = "#0056b3";
  }
});
startButton.addEventListener("mouseout", () => {
  if (!startButton.disabled) {
    startButton.style.backgroundColor = "#007bff";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  // Інпут 
  const dateTimePicker = document.querySelector("#datetime-picker");
  dateTimePicker.style.padding = "10px";
  dateTimePicker.style.fontSize = "16px";
  dateTimePicker.style.border = "1px solid #ccc";
  dateTimePicker.style.borderRadius = "5px";
  dateTimePicker.style.marginBottom = "20px";
  dateTimePicker.style.width = "250px";
  dateTimePicker.style.textAlign = "center";

  // Кнопка Start
  const startButton = document.querySelector("[data-start]");
  startButton.style.padding = "10px 20px";
  startButton.style.fontSize = "16px";
  startButton.style.backgroundColor = "#f0f0f0";
  startButton.style.border = "1px solid #ccc";
  startButton.style.borderRadius = "5px";
  startButton.style.cursor = "not-allowed";
  startButton.style.color = "black";
});

// Таймер
const timer = document.querySelector(".timer");
timer.style.display = "flex";
timer.style.gap = "20px";
timer.style.marginTop = "20px";

const fields = document.querySelectorAll(".field");
fields.forEach((field) => {
  field.style.display = "flex";
  field.style.flexDirection = "column";
  field.style.alignItems = "center";
});

const values = document.querySelectorAll(".value");
values.forEach((value) => {
  value.style.fontSize = "48px";
  value.style.fontWeight = "bold";
  value.style.color = "#333";
});

const labels = document.querySelectorAll(".label");
labels.forEach((label) => {
  label.style.fontSize = "14px";
  label.style.color = "#777";
  label.style.textTransform = "uppercase";
});