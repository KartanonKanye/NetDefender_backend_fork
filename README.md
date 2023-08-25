# Welcome to NetDefender backend

**App name:** NetDefender

**Team:** 

- Kabir Bissessar: July 2023 - present

**Website:** https://netdefender.org.aalto.fi

Note: the domains https://netdefender.org.aalto.fi and https://netdefender.aalto.fi both work and access the same server. However, at the moment there are some known bugs when using https://netdefender.aalto.fi.

---

## About
This is the backend for the NetDefender project. It is built using Node.js and Express, and connects to a MongoDB database hosted on a remote server, where this app is also hosted.

--- 
## Project Technical Specifications
- This project is a Node.js project, which uses Express with TypeScript.
- The production code is transpiled and bundled using TypeScript's build process. The output is stored in the dist directory.
- The frontend is built separately and can be found in the repository [Netdefender](https://github.com/kabizzle/NetDefender)
- The project uses eslint and prettier for code formatting and styling.
- It follows the models, routes, controllers, utils structure
    - Models directory contains database schemas for MongoDB (Mongoose)
    - Routes directory handles which method is called based on which HTTP request is made to the API.
    - Controllers directory contains the logic of the API: the methods and responses to different requests
    - Utils directory contains configuration of the app, imported from the .env file and a Logger module, that handles logging in the server.

### Server information:
A Red Hat Enterprise Linux 8 server, provided by Aalto University, is used to host the web app and the MongoDB database.
- the Node.js app runs on a localhost port as a PM2 instance  
- nginx and mongod run on the server as systemctl services. These are configured to start automatically when the server starts, via ```systemctl enable mongod nginx```
- Nginx is configured to display the frontend app when the core domain (netdefender[.org].aalto.fi) is accessed, and as a reverse proxy to the Node.js app when (netdefender[.org].aalto.fi/api) is accessed.

---
## Known Bugs
- CORS error if request is made from https://netdefender.aalto.fi instead of https://netdefender.org.aalto.fi 
