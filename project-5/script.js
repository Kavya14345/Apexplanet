const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

// Show the navbar on bar click
if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

// Hide the navbar on close click
if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}
