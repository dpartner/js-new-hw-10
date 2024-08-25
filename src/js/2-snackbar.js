import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleAddPromise);

function handleAddPromise(ev) {
  ev.preventDefault();
  const delay = ev.target.elements.delay.value;
  const state = ev.target.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(state);
      }
      if (state === 'rejected') {
        reject(state);
      }
    }, delay);
  });

  promise
    .then(() => {
      iziToast.show({
        title: '✅ ',
        message: `Fulfilled promise in ${delay}ms`,
        theme: 'dark',
        titleColor: 'black',
        messageColor: 'black',
        color: 'green',
        position: 'topRight',
      });
    })
    .catch(() => {
      iziToast.show({
        title: '❌ ',
        message: `Rejected promise in ${delay}ms`,
        theme: 'dark',
        titleColor: 'black',
        messageColor: 'black',
        color: 'red',
        position: 'topRight',
      });
    });
}
