export async function editEvent(title, username, description) {
    try {
       let response = await fetch('http://localhost:3000/api/events/${id}', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: title,
                author: username,
                description: description,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Status: ${response.status}`);
        }

        // Analyser la réponse comme JSON
        const jsonResponse = await response.json();
        createEvent(jsonResponse);
    } catch (error) {
        console.error('Erreur lors de l\'édition de l\'événement:', error);
        // Gérer l'erreur, afficher un message à l'utilisateur, etc.
    }
}