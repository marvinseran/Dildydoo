import { editEvent } from './editEvent.js';

editEvent("Nouveau titre", "Nouvel auteur", "Nouvelle description");

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const formEl = document.querySelector('#form');

        formEl.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Récupérez la valeur de l'élément 'newEventAuthor' s'il existe
            const usernameInput = document.getElementById("newEventAuthor");

            if (usernameInput) {
                const username = usernameInput.value;
                console.log("Nom d'utilisateur:", username);

                // Continuez avec le reste de votre traitement
                const title = document.getElementById("newEventName").value;
                const description = document.getElementById("newEventDescription").value;

                try {
                    console.log('Avant de récupérer dateOptionsInput');
                    let dateOptionsInput = document.querySelector('#dateOptions');
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
                            throw new Error(`Erreur HTTP! Status: ${response.status}`);
                        }

                        // Analyser la réponse comme JSON
                        const jsonResponsePost = await response.json();
                        createEvent(jsonResponsePost);

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

        // Fonction pour créer un événement
        function createEvent(jsonResponsePost) {
            const menu = document.getElementById('pollContainer');

            const eventDiv = document.createElement('div');
            eventDiv.className = `event event_${jsonResponsePost.id}`;

            const eventName = document.createElement('h2');
            eventName.className = 'firstEventName';
            eventName.textContent = jsonResponsePost.name;

            const eventDescription = document.createElement('p');
            eventDescription.className = 'firstEventDescription';
            eventDescription.textContent = jsonResponsePost.description;

            const tableEvent = document.createElement('div');
            tableEvent.className = 'tableEvent';

            const table = document.createElement('table');
            table.className = 'Blue';
            table.id = jsonResponsePost.id;

            const tableHead = document.createElement('thead');
            const tableHeadRow = document.createElement('tr');

            // gérer une logique pour les dates

            const columnHeadDates = jsonResponsePost.dates;
            columnHeadDates.forEach(date => {
                const tableHeadDate = document.createElement("th");
                tableHeadDate.textContent = formatDate(date);
                tableHeadRow.appendChild(tableHeadDate);
            });

            const bodyTable = document.createElement('tbody');

            tableHead.appendChild(tableHeadRow);
            table.appendChild(tableHead);
            table.appendChild(bodyTable);
            eventDiv.appendChild(tableEvent);
            tableEvent.appendChild(table);
            eventDiv.appendChild(eventName);
            eventDiv.appendChild(eventDescription);

            console.log("Avant d'ajouter eventDiv au DOM");
            menu.appendChild(eventDiv);
            console.log("Après avoir ajouté eventDiv au DOM");
        }

        async function displayAllEvents() {
            try {
                const responseGet = await fetch('http://localhost:3000/api/events/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!responseGet.ok) {
                    throw new Error(`Erreur HTTP! Status: ${response.status}`);
                }

                // Analyser la réponse comme JSON
                const AllData = await responseGet.json();
                console.log("AllData", AllData);

                // Utiliser les données récupérées (par exemple, stocker dans AllData)
                // AllData = data; // This line is commented out as AllData is already declared
                // console.log(AllData);
            } catch (error) {
                console.error('Error', error);
                // Gérer l'erreur, afficher un message à l'utilisateur, etc.
            }
        }

        // Fonction pour formater la date
        function formatDate(dateString) {
            return dateString;
        }

        // Call the displayAllEvents function
        await displayAllEvents();
    } catch (error) {
        console.error('Error', error);
        // Gérer l'erreur, afficher un message à l'utilisateur, etc.
    }
});
