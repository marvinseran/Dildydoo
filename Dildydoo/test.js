
let submitButton = document.getElementById("submitpoll")
function creatEvent(jsonResponse) {
    const eventContainer = document.getElementById('pollContainer');

    const eventDiv = document.createElement('div');
    eventDiv.className = `event event_${jsonResponse.id}`;

    const eventName = document.createElement('h2');
    eventName.className = 'firstEventName'; // Utiliser 'className' au lieu de 'class'
    eventName.textContent = jsonResponse.name;

    const eventDescription = document.createElement('p');
    eventDescription.className = 'firstEventDescription';
    eventDescription.textContent = jsonResponse.description;

    const tableEvent = document.createElement('div');
    tableEvent.className = 'tableEvent';

    const table = document.createElement('table');
    table.className = 'Blue';
    table.id = jsonResponse.id;

    tableEvent.appendChild(table);

    const tableHead = document.createElement('thead');
    const tableHeadRow = document.createElement('tr');

    // gérer une logique en fonction des dates
    const dates = jsonResponse.dates; // Remplacer par les dates réelles
    const columnHeadDates = dates; // Utiliser les dates réelles
    columnHeadDates.forEach(date => {
        const tableHeadDate = document.createElement("th");
        tableHeadDate.textContent = formatDate(date);
        tableHeadRow.appendChild(tableHeadDate);
    });

    const bodyTable = document.createElement('tbody');

    table.appendChild(tableHead);
    table.appendChild(bodyTable);
    eventDiv.appendChild(tableHead);
    eventDiv.appendChild(eventName);
    eventDiv.appendChild(eventDescription);

    console.log("Avant d'ajouter eventDiv au DOM");
    tableEvent.appendChild(eventDiv);
    console.log("Après avoir ajouté eventDiv au DOM");
}

const formEl = document.querySelector('#form');

formEl.addEventListener('submit', async (event) => {
    console.log(event)
    event.preventDefault();
    const usernameInput = document.getElementById("newEventAuthor");

    if (usernameInput) {
        const username = usernameInput.value;
        console.log("Nom d'utilisateur:", username);

        // Continuez avec le reste de votre traitement
        const title = document.getElementById("newEventName").value;
        const description = document.getElementById("newEventDescription").value;

        try {
            console.log('Avant de récupérer dateOptionsInput');
            let dateOptionsInput = document.querySelector('.dateOptions');
            console.log('Après avoir récupéré dateOptionsInput');

            if (dateOptionsInput) {
                let dateArray = [];
                dateArray.push(dateOptionsInput.value);
                console.log("Dates:", dateArray);

                let response = await fetch('http://localhost:3000/api/events/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: title,
                        dates: dateArray,
                        author: username,
                        description: description,
                    }),
                });

                if (!response.ok) {
                    // debugger

                    throw new Error(`Erreur HTTP! Status: ${response.status}`);
                }
                // Analyser la réponse comme JSON
                const jsonResponse = await response.json();
                creatEvent(jsonResponse);
                // Utilisez jsonResponse comme objet JSON
                console.log('Réponse JSON:', jsonResponse.id);
                console.log(jsonResponse)

                // Traitement de la réponse réussie ici, par exemple, redirection ou affichage d'un message de succès
            } else {
                console.error("L'élément avec l'ID 'dateOptions' n'a pas été trouvé.");
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire:', error);
            // Gérer l'erreur, afficher un message à l'utilisateur, etc.
        }

    } else {
        console.error("L'élément avec l'ID 'newEventAuthor' n'a pas été trouvé.");
    }
});

// Ajouter la logique pour le bouton "addDate"
// const addDateButton = document.getElementById('addDate');
// addDateButton.addEventListener('click', () => {
//     addNewDateInput();
// });

function addNewDateInput() {
    const dateOptionsContainer = document.getElementById('alldatesubmit');
    const newDateInput = document.createElement('input');
    newDateInput.type = 'date';
    newDateInput.className = 'dateOptions';
    dateOptionsContainer.appendChild(newDateInput);
}

// Ajouter la fonction formatDate si elle n'est pas déjà définie
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
