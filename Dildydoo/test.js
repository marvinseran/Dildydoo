document.addEventListener('DOMContentLoaded', () => {
    // Attendez que le DOM soit entièrement chargé avant d'exécuter le code

    function creatEvent(jsonResponse) {
        const eventContainer = document.getElementById('pollContainer');
    
        const eventDiv = document.createElement('div');
        eventDiv.className = `event event_${jsonResponse.id}`;
    
        const eventName = document.createElement('h2');
        eventName.class = 'firstEventName';
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
    
        const tableHead = document.createElement('tableHead');
        const tableHeadRow = document.createElement('tr');
    
        // gérer une logique en focntion des dates
        
    
        const columnHeadDates = get(dates);
        columnHeadDates.forEach(date => {
          const tableHeadDate = document.createElement("th");
          tableHeadDate.textContent = formatDate(date);
          tableHeadRow.appendChild(tableHeadDate);
        });
    
        const bodyTable = document.createElement('bodyTable');
    
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
                        throw new Error(`Erreur HTTP! Status: ${response.status}`);
                    }
                    // Analyser la réponse comme JSON
                    const jsonResponse = await response.json();
                    creatEvent(jsonResponse);
                    // Utilisez jsonResponse comme objet JSON
                    console.log('Réponse JSON:', jsonResponse.id);


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

});

