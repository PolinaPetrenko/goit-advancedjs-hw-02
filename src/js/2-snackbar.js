import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const delay = Number(formData.get("delay"));
  const state = formData.get("state");


  if (delay <= 0) {
    iziToast.error({
      title: "Error",
      message: "Please enter a positive delay value.",
    });
    return;
  }

  if (delay > 10000) {
    iziToast.warning({
      title: "Warning",
      message: "Delay is too long. Please enter a value less than 10000ms.",
    });
    return;
  }

  // Створюємо проміс
  createPromise(delay, state)
    .then((result) => {
      iziToast.success({
        title: "✅ Success",
        message: `Fulfilled promise in ${result}ms`,
      });
    })
    .catch((error) => {
      iziToast.error({
        title: "❌ Error",
        message: `Rejected promise in ${error}ms`,
      });
    });

  // Очищення форми
  form.reset();
});

// Функція створення промісу
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else if (state === "rejected") {
        reject(delay);
      }
    }, delay);
  });
}



document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.minHeight = "100vh";
document.body.style.margin = "0";
document.body.style.backgroundColor = "#f9f9f9";

// Стили для формы

form.style.border = "1px solid #ccc";
form.style.padding = "20px";
form.style.borderRadius = "8px";
form.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
form.style.width = "300px";
form.style.backgroundColor = "#f9f9f9";
form.style.margin = "20px auto";

// Стили для поля ввода (Delay)
const input = form.querySelector("input[type='number']");
input.style.width = "100%";
input.style.padding = "10px";
input.style.marginTop = "5px";
input.style.marginBottom = "20px";
input.style.border = "1px solid #ccc";
input.style.borderRadius = "4px";
input.style.fontSize = "14px";

// Стили для fieldset
const fieldset = form.querySelector("fieldset");
fieldset.style.border = "1px solid #ccc";
fieldset.style.borderRadius = "4px";
fieldset.style.padding = "10px";
fieldset.style.marginBottom = "20px";

// Стили для legend
const legend = fieldset.querySelector("legend");
legend.style.fontWeight = "bold";
legend.style.padding = "0 5px";

// Стили для радиокнопок
const radioLabels = fieldset.querySelectorAll("label");
radioLabels.forEach((label) => {
  label.style.display = "flex";
  label.style.alignItems = "center";
  label.style.marginBottom = "10px";
});

const radios = fieldset.querySelectorAll("input[type='radio']");
radios.forEach((radio) => {
  radio.style.marginRight = "10px";
});

// Стили для кнопки
const button = form.querySelector("button[type='submit']");
button.style.width = "100%";
button.style.padding = "10px";
button.style.fontSize = "16px";
button.style.fontWeight = "bold";
button.style.color = "#fff";
button.style.backgroundColor = "#007bff";
button.style.border = "none";
button.style.borderRadius = "4px";
button.style.cursor = "pointer";
button.style.transition = "background-color 0.3s ease";

// Стили при наведении на кнопку
button.addEventListener("mouseover", () => {
  button.style.backgroundColor = "#0056b3";
});

button.addEventListener("mouseout", () => {
  button.style.backgroundColor = "#007bff";
});
const startButton = document.querySelector('button');

// Функція активації кнопки
function enableButton() {
  startButton.disabled = false; // Увімкнути кнопку
  startButton.style.backgroundColor = '#4caf50';
  startButton.style.color = 'white';
  startButton.style.cursor = 'pointer';
}

// Функція деактивації кнопки
function disableButton() {
  startButton.disabled = true; // Вимкнути кнопку
  startButton.style.backgroundColor = '#ccc';
  startButton.style.color = '#666';
  startButton.style.cursor = 'not-allowed';
}

// Викликати функції для тесту
disableButton(); // Кнопка неактивна
setTimeout(enableButton, 3000); // Через 3 секунди активується