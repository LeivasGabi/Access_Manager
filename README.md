# Access_Control

A small frontend project made with **TypeScript** and **OpenUI5**, which
implements a login screen and a simple dashboard.\
The goal is to demonstrate basic authentication and navigation between pages
using UI5 components.

- Technologies Used
- OpenUI5 — SAP UI framework for components and layout.
- LocalStorage — Stores simple logged-in user data.

Basic Logic
Login validates the username and password directly on the frontend.
If the login is successful:
Creates a User object with an ID, name, and token.
Calls setSession(user) to store the information locally.
Displays a welcome message and redirects to director.html.

On startup, login.ts checks isLoggedIn().
If the user is already logged in, they are automatically redirected.

Mock User
User: director1
Password: directorone
