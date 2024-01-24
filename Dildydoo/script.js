//let eventAuthor;
document.getElementById('submitpoll').addEventListener('click', createSchedulePoll);
function createSchedulePoll() {
    const eventName = document.getElementById('eventName').value;
    eventAuthor = document.getElementById('AuthorEvent').value;
    const eventDescription = document.getElementById('descriptionEvent').value;
    const dateOptionsInput = document.getElementById('dateOptions').value;

    if (!eventName || !eventAuthor || !eventDescription || !dateOptionsInput) {
        alert('Please fill all options.');
        return;
    }

    const dateOptions = dateOptionsInput.split(',').map(option => option.trim());

    const pollContainer = document.getElementById('pollContainer');
    const pollElement = document.createElement('div');
    pollElement.classList.add('poll');

    const pollTitle = document.createElement('h2');
    pollTitle.textContent = eventName + " By " + `${eventAuthor}`;
    pollElement.appendChild(pollTitle);

    const pollDescription = document.createElement('p');
    pollDescription.textContent = `Description: ${eventDescription}`;
    pollElement.appendChild(pollDescription);

    const pollOptions = document.createElement('ul');
    dateOptions.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        pollOptions.appendChild(li);
    });

    pollElement.appendChild(pollOptions);
    pollContainer.appendChild(pollElement);

    // Add buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const editButton = document.createElement('button');
    editButton.textContent = 'Modify';
    editButton.addEventListener('click', () => {
        showEditFields(pollTitle, pollDescription);
    });

    const addButton = document.createElement('button');
    addButton.textContent = 'Modify date';
    addButton.addEventListener('click', () => {
        alert('Function to modify date to be implemented.');
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        pollContainer.removeChild(pollElement);
    });

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(deleteButton);

    pollElement.appendChild(buttonContainer);
}

function showEditFields(titleElement, descriptionElement) {
    const editTitleInput = prompt('Enter new title:', titleElement.textContent);
    const editDescriptionInput = prompt('Enter new description:', descriptionElement.textContent);

    if (editTitleInput !== null && editDescriptionInput !== null) {
        titleElement.textContent = editTitleInput + " By " + `${eventAuthor}`;
        descriptionElement.textContent = `Description: ${editDescriptionInput}`;
    }
}
