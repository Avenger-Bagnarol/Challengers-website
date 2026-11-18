// Navigation is visible by default, including when JavaScript is unavailable.
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobileViewport = window.matchMedia('(max-width: 760px)');

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  navigation.dataset.collapsed = String(!open);
}

function syncMenu() {
  toggle.hidden = !mobileViewport.matches;
  setMenu(!mobileViewport.matches);
}

toggle.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileViewport.matches && toggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});

mobileViewport.addEventListener('change', syncMenu);
syncMenu();
