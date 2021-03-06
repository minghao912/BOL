# BOL
by Minghao Chen, Stanley Lim, Mike Qu, Prateik Sinha, Ken Zhou

# Launching BOL

## Install necessary modules and programs

1. Install Docker Desktop
2. Install Node.js
3. Install npm modules: in the folder `./BOL/frontend` fun `npm install`

## Start backend

1. In the root folder `./BOL`, run `docker-compose up`. The first time you do this it will take a bit of time.

## Start frontend

1. In the folder `./BOL/frontend` run the startup script `start.ps1` (Windows) or `start.sh` (Mac)

# First Time Setup

## Download the files

1. Install Git
2. Create a folder on your computer where you can download this repository
3. Clone this repository to your computer: `git clone https://github.com/minghao912/GAMERSOfExcelSpreadsheetLine30.git`

## Get modules set up and ready

1. Install Docker Desktop
2. Install Node.js
3. In the root folder `./GAMERSOfExcelSpreadsheetLine30`, run `docker-compose up`. The first time you do this it will take a bit of time
4. In the folder `./GAMERSOfExcelSpreadsheetLine30/frontend`, run `npm install`. This will install the necessary modules for the frontend

# Launching the app

1. Make sure you have Docker Desktop running in the background
2. In the root folder `./GAMERSOfExcelSpreadsheetLine30`, run `docker-compose up`.
3. Delete the file `tsconfig.json` in the folder `./GAMERSOfExcelSpreadsheetLine30/frontend`. You have to do this every time you launch the app because of a bug with React and Typescript
4. In a different terminal window, go to `./GAMERSOfExcelSpreadsheetLine30/frontend` and run `npm start`. It should automatically open your browser window and show a webpage
5. To close the app, do Ctrl+C in both terminal windows and the app will stop
