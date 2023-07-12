window.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => displayRituCards(data.rituNames))
        .catch(error => console.error(error));
    // Fetching darshan timings
    fetch('darshan_timings.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to fetch JSON data.');
            }
        })
        .then(data => {
            const jsonData = data;

            const tableBody = document.querySelector('#darshan-table tbody');
            jsonData.darshan_timings.forEach(entry => {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${entry.darshan}</td>
          <td>${entry.timing}</td>
        `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error(error);
        });
});

function displayRituCards(rituNames) {
    const rituCardsContainer = document.getElementById('ritu-cards');

    rituNames.forEach(rituName => {
        const rituCard = document.createElement('div');
        rituCard.classList.add('ritu-card');
        rituCard.textContent = rituName;

        rituCard.addEventListener('click', () => {
            fetch('data.json')
                .then(response => response.json())
                .then(data => displayKirtans(data.kirtans[rituName]))
                .catch(error => console.error(error));
        });

        rituCardsContainer.appendChild(rituCard);
    });
}

function displayKirtans(kirtans) {
    const kirtanCardsContainer = document.createElement('div');
    kirtanCardsContainer.classList.add('kirtan-cards');

    kirtans.forEach(kirtan => {
        const kirtanCard = createKirtanCard(kirtan);
        kirtanCardsContainer.appendChild(kirtanCard);
    });



    const rituCardsContainer = document.getElementById('ritu-cards');
    rituCardsContainer.innerHTML = '';
    rituCardsContainer.appendChild(kirtanCardsContainer);
}

function createKirtanCard(kirtan) {
    const kirtanCard = document.createElement('div');
    kirtanCard.classList.add('kirtan-card');

    kirtanCard.innerHTML = `
    <h2>${kirtan.title}</h2>
    `;


    kirtanCard.addEventListener('click', () => {

        kirtanCard.classList.add('active');

        kirtanCard.innerHTML = `
        <h2>${kirtan.title}</h2>
        <p>${kirtan.content}</p>
        <footer>राग - ${kirtan.raag}</footer>
        `;
    });

    return kirtanCard;
}



// Change image in index.html according to time
const imageElement = document.getElementById("dynamicImage");
// Get the current hour
const currentHour = new Date().getHours();
// Define image sources for different times of the day
const mangla = "assets/Mangla.jpg";
const shringar = "assets/shringar1.jpg";
const gwal = "assets/Gwal.jpg";
const rajbhog = "assets/Rajbhog.jpg";
const uthapan = "assets/Uthapan.jpg";
const arti = "assets/Aarti.jpg";
const shayan = "assets/Shayan.jpg";
// Determine the appropriate image source based on the current time
let imageSource;
if (currentHour >= 6 && currentHour < 7) {
    imageSource = mangla;
} else if (currentHour >= 7 && currentHour < 9) {
    imageSource = shringar;
} else if (currentHour >= 9 && currentHour < 11) {
    imageSource = gwal;
} else if (currentHour >= 11 && currentHour < 12) {
    imageSource = rajbhog;
} else if (currentHour >= 12 && currentHour < 16) {
    imageSource = uthapan;
} else if (currentHour >= 16 && currentHour < 18) {
    imageSource = arti;
} else {
    imageSource = shayan;
}
// Set the image source dynamically
imageElement.src = imageSource;