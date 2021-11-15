# INCIDENT REPORT PROJECT TASK
### The required working flow :
- Create a post endpoint to create a user (name, email unique, password, first name and last name), 
- A Post endpoint to login
- A POST endpoint that receives the incident report.
- The report should have the following data :
{ “client_id”: number, “incident_desc: string, “city”: string, “country”: string }
The endpoint receives the report, adds a weather data and stores it in a table “incidents”.
The weather report should be fetched from the API service of https://openweathermap.org/current
- The stored object should be then as follow :
{ “client_id”: number, “incident_desc: string, “city”: string, “country”: string, “date”: date, “weather_report”: object }
- A GET endpoint that lists all the incidents.
- A Get endpoint to get a user incidents 
- Note only a register user should be able to create a report.

## Getting Started.

Make sure you have nodejs installed by running the following command:

```bash
node -v
```

If the output is not the version of your nodejs installation, install nodejs from [here](https://nodejs.org/en/download/)

After installing nodejs install [npm](https://www.npmjs.com/package/npm)
if you have it then install the project's dependencies:

```bash
npm install
```

If you don't have nodemon running globally, install:

```bash
npm i -g nodemon
```

Create a dotenv file and add

```bash
HOST=hostname
PORT=portnumber
```

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4000/`. The app will automatically reload if you change any of the source files.

## Endpoints

Create User Register Endpoint (POST request) - 
```bash
    http://localhost:4000/api/users/register
```

Create User Login Endpoint (POST request) - 
```bash
    http://localhost:4000/api/users/login
```

Create Incident Report Endpoint (POST request) - 
```bash
    http://localhost:4000/api/user-incident_report
```

Get All Incident Report Endpoint (GET request) - 
```bash
    http://localhost:4000/api/incident_reports
```

Get A User Incident Report Endpoint (GET request) - 
```bash
    http://localhost:4000/api/user-incident_report
```