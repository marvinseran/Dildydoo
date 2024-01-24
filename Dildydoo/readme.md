# Didlydoo

![Didlydoo](logo.png)

-   Repository: `didlydoo-app`
-   Type of Challenge: `Consolidation`
-   Duration: `3 days`
-   Team challenge : `group 3`
-   Deadline: 26/01/2024 - 17:00
-   Submission form: WIP

> Didlydoo is a revolutionary website that allows you to create events and let anyone add their availability to find the best date for everyone.

## The mission

You have been hired by a "truly disruptive" startup, to create a revolutionnary tool to plan events with friends and relatives. Introducing Didlydoo, the event planner!

A backend developer has already created an API for the tool, so you can focus on the frontend. The list of endpoints is available below.

Your tasks is to :

-   🌱 Display all the events, including everyone's availability
-   🌱 Allow users to create events
-   🌱 Allow users to add their availability to an existing event
-   🌱 Edit an event name/description/author
-   🌱 Delete an event
-   🌱 You must validate your inputs before sending the data to your backend, inputs required must be filed and shorter than 256 characters. If it's not the case you don't send the request and display the appropriate error **below** the input.

Bonus :

-   🌼 Display the best possible date for the event according to everyone availabilities

Constrains:
    - USE VITE
    - USE BEM methodology & SCSS
    - USE MODULES
    - USE date-fns (install with npm this time): https://date-fns.org

This is the mockup that the company founder has drawn on a piece of paper during a lunch break (you can use it, or create your own layout).

![Didlydoo](./didlydoo.svg)

# Backend setup

Clone the [backend](./backend) directory on your computer and open in it in a terminal, then type `npm install` once to install the dependencies.

To launch the server simply type `node server/index.mjs` to start the server (the terminal has to remain open and running).

## Endpoint documentation

| Method | Endpoint                   | Body                                                                                          | Response                                                                                                                                  |
| ------ | -------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /api/events/               |                                                                                               | A list of all the events                                                                                                                  |
| GET    | /api/events/[id]           |                                                                                               | A single event                                                                                                                            |
| GET    | /api/attendees/            |                                                                                               | Get a list of all the attendees, and the events they're attending                                                                         |
| GET    | /api/attendees/[name]      |                                                                                               | Get all attendances for a given name                                                                                                      |
| POST   | /api/events/               | `{ name: string, dates: array of dates ['YYYY-MM-DD'], author: string, description: string }` | Creates an event with `dates` as possibilities. You must provide an author, a name and a description for the event                        |
| PATCH  | /api/events/[id]/          | `{ name: string (optional), author: string (optional), description: string (optional) }`      | Patches (edit) an event with the provided infos                                                                                           |
| DELETE | /api/events/[id]/          |                                                                                               | Deletes an event                                                                                                                          |
| POST   | /api/events/[id]/add_dates | `{ dates: array of dates ['YYYY-MM-DD'] }`                                                    | Add some possible dates to an event                                                                                                       |
| POST   | /api/events/[id]/attend    | `{ name: string, dates : [ { date: date 'YYYY-MM-DD', available: boolean (true/false) } ] }`  | Add an attendance for the given event. You must provide the attendee's `name` and some availabilities, in the form of an array of object  |
| PATCH  | /api/events/[id]/attend    | `{ name: string, dates : [ { date: date 'YYYY-MM-DD', available: boolean (true/false) } ] }`  | Edit an attendance for the given event. You must provide the attendee's `name` and some availabilities, in the form of an array of object |
