import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/custom-easytoast.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('.delay-label');
form.addEventListener('submit', handleSubmit);

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function handleSubmit(e) {
  e.preventDefault();

  const { delay, state } = e.currentTarget.elements;
  const delayValue = Number(delay.value);
  const stateValue = state.value;

  createPromise(delayValue, stateValue)
    .then(delay => {
      iziToast.success({
        icon: false,
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59A10D',
        titleColor: '#FFF',
        messageColor: '#FFF',
      });
    })
    .catch(delay => {
      iziToast.error({
        icon: false,
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#EF4040',
        titleColor: '#FFF',
        messageColor: '#FFF',
      });
    });

  e.currentTarget.reset();
}
