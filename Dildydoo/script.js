

let eventAuthor;
document.getElementById('submitpoll').addEventListener('click', createSchedulePoll);
document.getElementById('addDate').addEventListener('click', newDate);
function createSchedulePoll() {
    const eventName = document.getElementById('eventName').value;
    const eventAuthor = document.getElementById('AuthorEvent').value;
    const eventDescription = document.getElementById('descriptionEvent').value;
    const dateOptionsInput = document.getElementById('dateOptions').value;
    const submitButtonPoll = document.getElementById('submitpoll');

    if (!eventName || !eventAuthor || !eventDescription || !dateOptionsInput) {
        alert('Please fill all options.');
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
}

function showEditFields(titleElement, descriptionElement) {
    const editTitleInput = prompt('Enter new title:', titleElement.textContent);
    const editDescriptionInput = prompt('Enter new description:', descriptionElement.textContent);

    if (editTitleInput !== null && editDescriptionInput !== null) {
        titleElement.textContent = editTitleInput + " By " + `${eventAuthor}`;
        descriptionElement.textContent = `Description: ${editDescriptionInput}`;
    }
}

function createTable(dateOptionsInput) {
    const dateOptions = dateOptionsInput.split(',').map(option => option.trim());
    const tableDisplay = document.querySelector(".tableinfo");
    tableDisplay.style.display = "flex";
    const pollOptions = document.createElement('tr');
    dateOptions.forEach(option => {
        const th = document.createElement('th');
        th.textContent = option;
        pollOptions.appendChild(th);
    });



    tableDisplay.appendChild(pollOptions);
    return pollOptions;
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