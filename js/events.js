const events = [
  {
    name: 'HAT Challengers',
    date: '2026-12-12',
    venue: 'La Casa dei Giochi',
    address: "Via Sant'Uguzzone 8, Milano",
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+Sant%27Uguzzone+8%2C+Milano%2C+Italy',
    category: 'major'
  },
  {
    name: 'HAT Local',
    date: '2026-11-24',
    venue: 'Jamaican Card Store',
    address: 'Via Filippo Parlatore 24/A, Palermo',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+Filippo+Parlatore+24%2FA%2C+Palermo%2C+Italy',
    category: 'local'
  }
];

const eventButtons = document.querySelectorAll('.events-options button');
const eventRows = document.querySelector('#events-table tbody');
const eventDateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
});

function renderEvents(category) {
  const rows = events.filter(event => event.category === category).map(event => {
    const row = document.createElement('tr');
    const name = document.createElement('th');
    name.scope = 'row';
    name.textContent = event.name;
    row.append(name);

    const date = document.createElement('time');
    date.dateTime = event.date;
    date.textContent = eventDateFormat.format(new Date(event.date));
    row.insertCell().append(date);
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
