const slogan = "With the players. For the players.";

for (const element of document.querySelectorAll('[data-slogan]')) {
  element.textContent = element.classList.contains('eyebrow') ? slogan.toUpperCase() : slogan;
}
