document.addEventListener('DOMContentLoaded', async () => {
    const dateArray = [];
let eventAuthor;
document.getElementById('btnEvent').addEventListener('click', createSchedulePoll);
document.getElementById('addDate').addEventListener('click', newDate);
function createSchedulePoll(e) {
    e.preventDefault();
    const eventName = document.getElementById('newEventName').value;
    const eventAuthor = document.getElementById('newEventAuthor').value;
    const eventDescription = document.getElementById('newEventDescription').value;
    const dateOptionsInput = document.getElementById('dateOptions').value;
    const submitButtonPoll = document.getElementById('btnEvent');

    if (!eventName || !eventAuthor || !eventDescription || !dateOptionsInput) {
        return;
    }

    const pollContainer = document.getElementById('pollContainer');
    const pollElement = document.createElement('div');
    pollElement.classList.add('poll');

    const pollTitle = document.createElement('h2');
    pollTitle.textContent = eventName + " By " + `${eventAuthor}`;
    pollElement.appendChild(pollTitle);

    const pollDescription = document.createElement('p');
    pollDescription.textContent = `Description: ${eventDescription}`;
    pollElement.appendChild(pollDescription);

    // Add buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const editButton = document.createElement('button');
    editButton.textContent = 'Modify';
    editButton.addEventListener('click', () => {
        showEditFields(pollTitle, pollDescription);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        pollElement.style.display = "none";
        submitButtonPoll.style.display = "flex";
    });

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);


    pollElement.appendChild(buttonContainer);
    submitButtonPoll.style.display = "none";
    pollContainer.appendChild(pollElement);
    createTable(dateOptionsInput);
    dateArray.push(dateOptionsInput); 

    createTable(dateArray);
}

function showEditFields(titleElement, descriptionElement) {
    const editTitleInput = prompt('Enter new title:', titleElement.textContent);
    const editDescriptionInput = prompt('Enter new description:', descriptionElement.textContent);

    if (editTitleInput !== null && editDescriptionInput !== null) {
        titleElement.textContent = editTitleInput + " By " + `${eventAuthor}`;
        descriptionElement.textContent = `Description: ${editDescriptionInput}`;
    }
}

function createTable(dateArray) {
    const tableDisplay = document.querySelector(".tableinfo");
    tableDisplay.style.display = "flex";

    // Créez une nouvelle colonne avec la date de l'input en première ligne
    const pollOptions = document.createElement('td');
    const th = document.createElement('th');
    th.textContent = dateArray[dateArray.length - 1]; // Prenez la dernière date ajoutée
    pollOptions.appendChild(th);

    // Ajoutez la nouvelle colonne à chaque ligne du tableau
    const tableRows = document.querySelectorAll('.tableInfo tbody tr');
    tableRows.forEach(row => {
        const td = document.createElement('td');
        row.appendChild(td);
    });

    // Ajoutez la nouvelle colonne à l'en-tête du tableau
    const tableHeader = document.querySelector('.tableheader th:last-child');
    const newHeader = document.createElement('th');
    newHeader.textContent = dateArray[dateArray.length - 1];
    tableHeader.after(newHeader);
}

function newDate() {
    const dateOptionsContainer = document.getElementById('alldatesubmit');

    if (dateOptionsContainer) {
        const newDateInput = document.createElement('input');
        newDateInput.type = 'date';
        dateOptionsContainer.appendChild(newDateInput);
    } else {
        console.error("Date options container not found in the DOM.");
    }
}

});