const teamMembers = [
  { name: 'Emilian Vama', role: 'Frontman, CEO and Head Judge', portrait: 'emilian.webp' },
  { name: 'Mirko Bagnarol', role: 'Commentator and Tech guy', portrait: 'mirko.webp' },
  { name: 'Leonardo Valvassori', role: 'Streaming setup and commentator', portrait: 'leo.webp' },
  { name: 'Valerio Costamante', role: 'Social Media manager', portrait: 'vale.webp' },
  { name: "Massimo dell'Ernia", role: 'Jolly', portrait: 'max.webp' }
];

const profileGrid = document.querySelector('.team-profiles');
const profileTemplate = document.querySelector('#team-profile-template');

for (const { name, role, portrait } of teamMembers) {
  const profile = profileTemplate.content.cloneNode(true);
  profile.querySelector('.team-portrait').src = `../assets/team/${portrait}`;
  profile.querySelector('h2').textContent = name;
  profile.querySelector('p').textContent = role;
  profileGrid.append(profile);
}
