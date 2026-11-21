import { localEvents } from '../data/local_events.js';
import { majorEvents } from '../data/major_events.js';

const eventsByCategory = { major: majorEvents, local: localEvents };
const eventButtons = document.querySelectorAll('.events-options button');
const eventRows = document.querySelector('#events-table tbody');
const eventMonthOptions = {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
};
const eventMonthFormat = new Intl.DateTimeFormat('en-GB', eventMonthOptions);
const eventDateFormat = new Intl.DateTimeFormat('en-GB', { ...eventMonthOptions, day: 'numeric' });

function renderEvents(category) {
  const rows = eventsByCategory[category].map(event => {
    const row = document.createElement('tr');
    const name = document.createElement('th');
    name.scope = 'row';
    const eventlink = category === 'major' ? event.eventlink?.trim() : '';
    if (eventlink) {
      const link = document.createElement('a');
      link.href = eventlink;
      link.textContent = event.name;
      name.append(link);
    } else {
      name.textContent = event.name;
    }
    row.append(name);

    const date = document.createElement('time');
    date.dateTime = event.date.replace(/^(\d{2})-(\d{2})-(\d{4})$/, '$3-$2-$1');
    date.dateTime = date.dateTime.replace(/^(\d{2})-(\d{4})$/, '$2-$1');
    const format = /^\d{4}-\d{2}$/.test(date.dateTime) ? eventMonthFormat : eventDateFormat;
    date.textContent = format.format(new Date(date.dateTime));
    row.insertCell().append(date);

    const timeCell = row.insertCell();
    if (event.time) {
      const time = document.createElement('time');
      time.dateTime = event.time.replace('.', ':');
      time.textContent = time.dateTime;
      timeCell.append(time);
    } else {
      timeCell.textContent = '—';
    }

    row.insertCell().textContent = event.venue;

    const address = document.createElement('a');
    address.href = event.mapsUrl;
    address.target = '_blank';
    address.rel = 'noopener noreferrer';
    address.textContent = event.address;
    row.insertCell().append(address);
    return row;
  });

  eventRows.replaceChildren(...rows);
  for (const button of eventButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.category === category));
  }
}

for (const button of eventButtons) {
  button.addEventListener('click', () => renderEvents(button.dataset.category));
}

renderEvents('major');
