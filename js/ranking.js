import { players } from '../data/players.js';

const table = document.querySelector('.ranking-table');
const buttons = document.querySelectorAll('.ranking-options button');
const pointsHeaders = table.querySelectorAll('[data-points]');
const nameOrder = new Intl.Collator('en', { sensitivity: 'accent' });

function createAvatar({ name, nickname }) {
  const avatar = document.createElement('span');
  avatar.className = 'ranking-avatar';
  avatar.setAttribute('aria-hidden', 'true');

  const initials = document.createElement('span');
  initials.textContent = name.trim().split(/\s+/).slice(0, 2)
    .map(part => Array.from(part)[0]).join('').toUpperCase();

  const image = document.createElement('img');
  image.alt = '';
  image.hidden = true;
  image.addEventListener('load', () => {
    initials.hidden = true;
    image.hidden = false;
  }, { once: true });
  image.addEventListener('error', () => image.remove(), { once: true });
  image.src = new URL(`../assets/ranking/avatar_${encodeURIComponent(nickname)}.webp`, import.meta.url).href;

  avatar.append(initials, image);
  return avatar;
}

function renderRanking(pointsKey) {
  const sortedPlayers = [...players].sort((first, second) =>
    second[pointsKey] - first[pointsKey] || nameOrder.compare(first.name, second.name)
  );

  const rows = sortedPlayers.map((player, index) => {
    const row = document.createElement('tr');
    row.insertCell().append(createAvatar(player));
    row.insertCell().textContent = index + 1;
    const name = document.createElement('th');
    name.scope = 'row';
    name.textContent = player.name;
    row.append(name);
    row.insertCell().textContent = player.challengerPts;
    row.insertCell().textContent = player.localPts;
    return row;
  });

  for (const button of buttons) {
    button.setAttribute('aria-pressed', String(button.dataset.points === pointsKey));
  }

  for (const header of pointsHeaders) {
    header.removeAttribute('aria-sort');
    if (header.dataset.points === pointsKey) {
      header.setAttribute('aria-sort', 'descending');
    }
  }

  table.tBodies[0].replaceChildren(...rows);
}

for (const button of buttons) {
  button.addEventListener('click', () => renderRanking(button.dataset.points));
}

renderRanking('challengerPts');
