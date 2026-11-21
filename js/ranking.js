import { players } from '../data/players.js';

const table = document.querySelector('.ranking-table');
const buttons = document.querySelectorAll('.ranking-options button');
const pointsHeaders = table.querySelectorAll('[data-points]');
const nameOrder = new Intl.Collator('en', { sensitivity: 'accent' });

function renderRanking(pointsKey) {
  const sortedPlayers = [...players].sort((first, second) =>
    second[pointsKey] - first[pointsKey] || nameOrder.compare(first.name, second.name)
  );

  const rows = sortedPlayers.map((player, index) => {
    const row = document.createElement('tr');
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
