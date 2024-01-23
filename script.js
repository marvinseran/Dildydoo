function createSchedulePoll() {
    const eventName = document.getElementById('eventName').value;
    const dateOptionsInput = document.getElementById('dateOptions').value;

    if (!eventName || !dateOptionsInput) {
        alert('Please enter both event name and date options.');
        return;
    }

    const dateOptions = dateOptionsInput.split(',').map(option => option.trim());

    const pollContainer = document.getElementById('pollContainer');
    const pollElement = document.createElement('div');
    pollElement.classList.add('poll');

    const pollTitle = document.createElement('h2');
    pollTitle.textContent = eventName;
    pollElement.appendChild(pollTitle);

    const pollOptions = document.createElement('ul');
    dateOptions.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        pollOptions.appendChild(li);
    });

    pollElement.appendChild(pollOptions);
    pollContainer.appendChild(pollElement);

    // You can add more logic here, like handling user responses, storing data, etc.
}