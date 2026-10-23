```
# Download Repository:
@: `https:github.com/Cy-Nonde/GGS-Tracker`

# Install dependencies:
//extract the zip file and open the Repository
//open a terminal or command line
//install node {Linux: `apt install nodejs npm` || `apk add nodejs npm`}
//run the command below
npm ci

# Start the server
//within the same terminal/command line, run the command below
npm start

```
---

Server runs at `http://localhost:8080`

---

Open the homepage:
    
	`http://localhost:8080/index.html`

     //The public folder is being served so,
	`http://localhost:8080`
		__as well//

---

API Endpoints:

	POST `/api/druguse`

		success: true
		id: this.lastId

		---------------

		success: false
		error: err.message

	GET `/api/druguse`

		id:
		drug_name:
        status:
		comments:
		created_at:

	GET `/api/checklist`

		eligible: false
		daysRemaining: 30
		message: No drug use records found

		-------------------------------

		eligible: true
		`currentMonth`
		records: rows

---

Tag link: https://github.com/Cy-Nonde/GGS-Tracker/releases/tag/v1.0.2
Commit SHA: cd5ec9c4f391812658a8d4bf882d95c72a491991
