import { $, btnReloadWallpaper, input } from './Accesibilidad.js';
import { quotes } from '../data/quotes.js';

let user;
// Al iniciar el main se inician todas estas funciones
const start = () => {
    getQuote();
    addTime();
    getWallpaper();
    // nameUser();
  };

//Para buscar
const form = document.getElementById('form');
form.addEventListener('submit', handleForm);

function handleForm(e) {
    e.preventDefault(); //Para que no se recarge la pagina
    window.location.href = `https://www.google.com/search?q=${input.value.trim()}`;
    e.target.reset();
  }
//Usar la Data de Frases ubicada en data

function addQuote(data) {
    const rootQuote = $('.quote');
    rootQuote.innerHTML = `
      <h2 class="text-lg font-medium">${data.text}</h2>
      <small class="text-md ">${data.author || 'Unknown'}</small>
    `;
  }
function getQuote() {
    const quote = Math.floor(Math.random() * quotes.length);
    addQuote(quotes[quote]);
}
//Agregar el tiempo donde sale AM o PM
function addTime() {
    let o = new Intl.DateTimeFormat('es', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });
    let date = new Intl.DateTimeFormat('es', {
        dateStyle: 'long',
    });
    const hour = o.format(Date.now());
    const datenow = date.format(Date.now());
    const now = new Date();
    const timeOfDay = now.getHours() >= 12 ? 'PM' : 'AM';

    const rootClock = $('.clock');
    rootClock.innerHTML = `
        <h1 class="font-semibold text-7xl md:text-9xl py-3">${hour} ${timeOfDay}</h1>
        <p class="text-center sm:text-xl mb-6">${datenow}</p>
    `;
}
setInterval(() => {
    addTime();
}, 60000); 
//Fondo de pantalla
function addWallpaper(data) {
    const {
      user: {
        links: { html: link_profile },
        first_name,
        location,
      },
      urls: { regular },
    } = data;
  
    const wallpaper = $('.wallpaper');
    //Para que aparezca gradualmente el fondo
    wallpaper.className = 'wallpaper animate__animated animate__fadeIn';
    wallpaper.style = `
    background: url('${regular.replace('1080', '1440')}') center center no-repeat;
    background-size: cover;
    `;
    setTimeout(() => {
      wallpaper.className = 'wallpaper';
    }, 400);
    const author = $('#author');
    author.textContent = first_name;
    author.href = link_profile;
  
    if (!location) {
      $('.location-wrapper').classList.add('hidden');
    } else {
      $('#location').textContent = location;
    }
  }
async function getWallpaper() {
    //Agregar una barra donde pueda escoger el tema que quieras de las fotos
    const url = 'https://api.unsplash.com/photos/random/?client_id=3j0d6XQ7CAPIECX8Srl987CrGxpQLn5g07vL3vgxdco&orientation=landscape&&query=Peru';
  
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      addWallpaper(data);
    } catch (e) {
      console.log(e);
    }
  }
start();