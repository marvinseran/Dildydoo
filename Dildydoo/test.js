


let newEventDates = document.querySelectorAll(".newEventDates");
const newEventDescription = document.querySelector("#newEventDescription");

async function postUser(eventID, inputsUserSerie, inputName, btnsCont) {
    try {
        // First request to get event data
        const response1 = await fetch(`http://localhost:3000/api/events/${eventID}`);
        console.log('Response status:', response1.status);

        if (!response1.ok) {
            throw new Error(`HTTP error! Status: ${response1.status}`);
        }

        const data = await response1.json();
        console.log('Data received:', data);

        // Process event data
        const resArray = data.dates.map(elem => ({
            date: elem.date,
            disponible: inputsUserSerie[i].classList.contains("yes"),
        }));

        console.log('Modified resArray:', resArray);

       /* const resArray = [];

        data.dates.forEach((elem, i) => {
            const newAttend = {
                date: elem.date,
                disponible: inputsUserSerie[i].classList.contains("yes"), // Simplified condition
            };

            resArray.push(newAttend);
        });

        console.log(resArray);*/

        // Second request to submit user data
        const response2 = await fetch(`http://localhost:3000/api/events/${eventID}/attend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inputName, // USER INPUT STRING
                dates: [...resArray],
            }),
        });

        console.log('Second request status:', response2.status);

        if (!response2.ok) {
            throw new Error(`HTTP error! Status: ${response2.status}`);
        }

        // Example usage:
        btnsCont.classList.add("processed");
        console.log("btnsCont and indexRowsDisp are accessible here.");

        // Assuming this function exists
        displayAllEvents();
    } catch (error) {
        console.error('Error in postUser function:', error);
    }
}



function postAdd_Dates(eventID) {
    let resArray = [];
    newEventDates = document.querySelectorAll(".newEventDates");
    newEventDates.forEach((date) => resArray.push(date.value));
    console.log(resArray);
  
    fetch(`http://localhost:3000/api/events/${eventID}/add_dates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dates: [...resArray],
      }),
    }).then((data) => {
      console.log("data envoyée: POST add_dates",data);
      
    });
    displayAllEvents();
      resetAllInputs();
  }
  
  // fetch api/events .then function createEventDOM() on each event in the fetch-data
  function displayAllEvents() {
    document.querySelector("#pollContainer").innerHTML = "";
  
    fetch("http://localhost:3000/api/events")
      .then((res) => {
        console.log('Response status:', res.status);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
})
      .then((data) => {
        console.log('Data received:', data);
        let dispoGridNumIndex = 0;
        data.forEach((event) => {
          createEventDOM(event, dispoGridNumIndex);
          dispoGridNumIndex += 1;
        });
      })
      .catch((error) => console.error('Error fetching events:', error));
  }

function createEventDOM(event, dispoGridNumIndex) {
    // ---- Users & Dates & disponibilies( GRID ) ----
    const dispoGrid = document.createElement("section");
    dispoGrid.classList.add("bigGrid");
    dispoGrid.id = `i${dispoGridNumIndex}`;
    let indexGridColumns = 1;
    let indexGridRows = 1;

    const emptydivforgrid = document.createElement("div");
    emptydivforgrid.style.gridArea = "1 / 1";
    dispoGrid.appendChild(emptydivforgrid);

    // Dates
    event.dates.forEach((elem) => {
        const dateDiv = document.createElement("h5");
        dateDiv.textContent = elem.date;
        dispoGrid.appendChild(dateDiv);

        indexGridColumns += 1;
        

         // disponibilities
         let indexRowsDisp = 2;

         elem.attendees.forEach((user) => {
             const userDispDiv = document.createElement("div");
             userDispDiv.classList.add("disp");
             if (user.disponible === true) {
                 userDispDiv.classList.add("greenDisp");
                 userDispDiv.textContent = "V";
             } else if (user.disponible === false) {
                 userDispDiv.classList.add("redDisp");
                 userDispDiv.textContent = "X";
             }
             userDispDiv.style.gridColumn = indexGridColumns;
             userDispDiv.style.gridRow = indexRowsDisp;
             dispoGrid.appendChild(userDispDiv);
             indexRowsDisp += 1;
         });
     });

     dispoGrid.style.gridTemplateColumns = `repeat(${indexGridColumns}, 1fr)`;

     // Users
    event.dates[0].attendees.forEach((elem) => {
        const usersDiv = document.createElement("h6");
        usersDiv.textContent = elem.name;
        dispoGrid.appendChild(usersDiv);
        indexGridRows += 1;
    });

    dispoGrid.style.gridTemplateRows = `repeat(${indexGridRows}, 1fr)`;

    // ---- Users inputs (name & disponibilities) ---- ( POST users )
    const inputName = document.createElement("input");
    inputName.placeholder = "User name";
    const sendBtn = document.createElement("button");
    sendBtn.classList.add("sendBtn");
    sendBtn.textContent = "Send";
    sendBtn.addEventListener("click", () => {
        if (inputName.value) {
            postUser(
                event.id,
                document.querySelectorAll(`#${dispoGrid.id}>.inputsBtns`),
                inputName.value
            );
        }
    });

    const inputNameDiv = document.createElement("div");
    inputNameDiv.classList.add("sendBtnAndInputNameDiv", "flexCenter");
    inputNameDiv.appendChild(inputName);
    inputNameDiv.appendChild(sendBtn);

    dispoGrid.appendChild(inputNameDiv);

    event.dates.forEach((date) => {
        const trueDispBtn = document.createElement("button");
        trueDispBtn.classList.add("dispBtn");
        trueDispBtn.addEventListener("click", () => {
            btnsCont.classList.add("yes");
            trueDispBtn.textContent = "X";
            falseDispBtn.textContent = "";
        });

        const falseDispBtn = document.createElement("button");
        falseDispBtn.classList.add("dispBtn");
        falseDispBtn.addEventListener("click", () => {
            btnsCont.classList.remove("yes");
            trueDispBtn.textContent = "";
            falseDispBtn.textContent = "X";
        });

        const btnsCont = document.createElement("div");
        btnsCont.classList.add("inputsBtns", "flexCenter");
        btnsCont.appendChild(trueDispBtn);
        btnsCont.appendChild(falseDispBtn);

        dispoGrid.appendChild(btnsCont);
    });

    // ---- Event informations (title & author & description & BTNS) ----
    const eventTitle = document.createElement("h3");
    eventTitle.textContent = `${event.name} by ${event.author}`;

    const eventDescription = document.createElement("p");
    eventDescription.textContent = event.description;

// (fetch) PATCH event BTN (Edit Btn)
const editEventBtn = document.createElement("button");
editEventBtn.classList.add("editEventBtn");
editEventBtn.textContent = "Edit";
editEventBtn.addEventListener("click", () => {
    if (
        newEventName.value &&
        newEventAuthor.value &&
        newEventDescription.value
    ) {
        fetch(`http://localhost:3000/api/events/${event.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: newEventName.value,
                    author: newEventAuthor.value,
                    description: newEventDescription.value,
                }),
            }).then(() => {
                createEventDOM(jsonResponsePost);
                displayAllEvents();
                resetAllInputs();
            });
        }
    });

    // (fetch) ADD_DATES event BTN (Add dates Btn)
    const addDatesBtn = document.createElement("button");
    addDatesBtn.classList.add("addDatesBtn");
    addDatesBtn.textContent = "Add date(s)";
    addDatesBtn.addEventListener("click", () => postAdd_Dates(event.id));

// (fetch) DELETE event BTN (Delete Btn)
const deleteEventBtn = document.createElement("button");
deleteEventBtn.classList.add("deleteEventBtn");
deleteEventBtn.textContent = "Delete";
deleteEventBtn.addEventListener("click", () => {
    fetch(`http://localhost:3000/api/events/${event.id}`, {
        method: "DELETE",
    }).then(() => displayAllEvents());
});

const eventBtnsDiv = document.createElement("section");
eventBtnsDiv.appendChild(editEventBtn);
eventBtnsDiv.appendChild(addDatesBtn);
eventBtnsDiv.appendChild(deleteEventBtn);

    const btnsNameAuthorContainer = document.createElement("section");
    btnsNameAuthorContainer.classList.add("btnsNameAuthorContainer");
    btnsNameAuthorContainer.appendChild(eventTitle);
    btnsNameAuthorContainer.appendChild(eventBtnsDiv);

    const infosContainer = document.createElement("section");
    infosContainer.appendChild(btnsNameAuthorContainer);
    infosContainer.appendChild(eventDescription);

    // ---- Main Container ----
    const eventContainer = document.createElement("section");
    eventContainer.classList.add("eventContainer");
    eventContainer.appendChild(infosContainer);
    eventContainer.appendChild(dispoGrid);

    document.querySelector("#pollContainer").appendChild(eventContainer);
}



function resetAllInputs() {
    newEventDates = document.querySelectorAll(".newEventDates");
    newEventDates.forEach((dateInput) => (dateInput.value = ""));
  
    newEventName.value = "";
    newEventAuthor.value = "";
    newEventDescription.value = "";
  }
  
  // display all events at page opening
  displayAllEvents();
  // reset all users inputs at page opening
  resetAllInputs();


   
   // const form = ;

        //form
        document.getElementById('newEventSubmit').addEventListener('submit', async function (event)  {
            event.preventDefault();
        
            const newEventAuthor = document.getElementById("newEventAuthor");
            const newEventName = document.getElementById("newEventName");
            const dateOptionsInput = document.querySelectorAll('#dateOptions');
            console.log("test");
        
            try {
                let iTop = 0;
        
                dateOptionsInput.forEach((date) => {
                    if (date.value) {
                        iTop += 1;
                    }
                });
        
                console.log(iTop, dateOptionsInput.length);
        
                if (
                    newEventName.value &&
                    iTop === dateOptionsInput.length &&
                    newEventAuthor.value &&
                    newEventDescription.value
                ) {
                    let resArray = [];
        
                    dateOptionsInput.forEach((date) => {
                        resArray.push(date.value);
                    });
        
                    console.log(resArray);
        
                    const response = await fetch('http://localhost:3000/api/events/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: newEventName.value,
                            dates: [...resArray],
                            author: newEventAuthor.value,
                            description: newEventDescription.value,
                        }),
                    });
        
                    console.log('Response status:', response.status);
        
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
        
                    const data = await response.json();
                    console.log('Data received:', data);
        
                    createEventDOM(data); // Pass the received data to createEventDOM
        
                    displayAllEvents();
                    resetAllInputs();
                } else {
                    console.error("Veuillez remplir tous les champs.");
                }
            } catch (error) {
                console.error('Erreur lors de la soumission du formulaire:', error);
            }
        });
        
                   // if (!response.ok) {
                     //   throw new Error(`Erreur HTTP! Status: ${response.status}`);
                    //}

                  //  const data = await response.json();
                   //  console.log(data);
            //    } else {
                //    console.error("Veuillez remplir tous les champs.");
    //            }
          //  } catch (error) {
          //      console.error('Erreur lors de la soumission du formulaire:', error);
  //          }
        //});
    //} else {
      //  console.error("Le formulaire avec l'ID 'form' n'a pas été trouvé.");
   // }
//displayAllEvents();
//resetAllInputs();

// add dates BTN (=== "+" btn)
document.querySelector("#addDatesBtn").addEventListener("click", (e) => {
    e.preventDefault();
  
    const divContainer = document.createElement("div");
  
    const newDateInput = document.createElement("input");
    newDateInput.type = "date";
    newDateInput.classList.add("newEventDates");
    divContainer.appendChild(newDateInput);
  
    const removeDateInputBtn = document.createElement("button");
    removeDateInputBtn.classList.add("deleteDateBtn");
    removeDateInputBtn.textContent = "x";
    removeDateInputBtn.addEventListener("click", () => divContainer.remove());
    divContainer.appendChild(removeDateInputBtn);
    document.querySelector("#dateInputsContainer").appendChild(divContainer);

  });
