# Codehesive

## Functionality

- Login/Signup feature with full CRUD for the user.
- Code Editor with preview, full CRUD and version control
- Connected to WebRTC, send link for the editor to code at the same time
- Following and Follower support 
- Image upload support for profile and projects

---

## Getting Started / Setup

Clone and fork this repo with the following command

```console
git@github.com:Trizee/Tri-Phase-5.git
```

NOTICE: Have a seperate terminal for the frontend and the backend

Setup commands for the frontend 
```console
cd /client
npm install
npm run dev
```

Setup commands for the backend
```console
pipenv install && pipenv
cd /server
python seed.py
python app.py
``` 

## Introduction

Once you launch the website you'll notice that there's already a seeded user and an empty project 
in the community page, You can now create your own projects in the dashboard page, Once your project 
is created you can launch a room and send the link out to have people code with you. There are version
controls and and once you commit a version it will populate in community page where people can preview 
and copy your projects.

## How it works

Once you post a project a room route will be made with all the information with the code.
Once you launch the room the editor will mount and then after a slight buffer the latest version
will populate in the editors. The versions will be saved to the backend once you commit it and 
be saved to be pulled up whenever.

## Technologies and libaries used

### Frontend

- Vite / React
- Monaco Editor Libary for the editor components
- WebRTC for the real time collaberations in rooms
- React Toastify for page notifications
- Cloudinary for uploading and images

### Backend

- Flask / SQLAlchemy
- python 

## Disclaimers

- Upload widget will be missing to avoid giving out my personal api key 

## Conclusion

Thank you for viewing this repository, This is my final project for Flatirons coding
bootcamp. You can contact me with any questions at trihoang09@gmail.com

---
