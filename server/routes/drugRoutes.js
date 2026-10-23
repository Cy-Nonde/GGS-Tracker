const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = express.Router();

const db = new sqlite3.Database("./drug_use.db", (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to SQLite database.");

    db.run(`
      CREATE TABLE IF NOT EXISTS drug_use (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        drug_name TEXT NOT NULL
	CHECK(TRIM(drug_name) <> ''),
        status TEXT NOT NULL,
        comments TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("drug_use table ready.");
      }
    }); //closes db.run
  } //closes first else
}); //closes database connector

router.post("/druguse", (req, res) => {
  const { drugName, status, comments } = req.body;
  if (
    !drugName ||
    !status ||
    drugName.trim() === "" ||
    status.trim() === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "drugName and status are required",
    });
  }

  db.run(
    `
    INSERT INTO drug_use (
      drug_name,
      status,
      comments
    )
    VALUES (?, ?, ?)
    `,
    [drugName.trim(), status.trim(), comments || null],
    function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      return res.status(201).json({
        success: true,
        id: this.lastID,
      });
    }
  );
});

router.get("/druguse", (req, res) => {
  db.all(
    "SELECT * FROM drug_use ORDER BY created_at DESC, id DESC",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);
    }
  );
});

router.get("/checklist", (req, res) => {
  db.get(
    `
    SELECT MIN(created_at) AS first_record
    FROM drug_use
    `,
    [],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!result.first_record) {
        return res.json({
          eligible: false,
          daysRemaining: 30,
          message: "No drug-use records found.",
        });
      }

      const firstRecord = new Date(result.first_record);
      const now = new Date();

      const daysPassed =
        (now - firstRecord) / (1000 * 60 * 60 * 24);

      const currentMonth =
        Math.floor(daysPassed / 30) + 1;

      if (daysPassed < 30) {
        return res.json({
          eligible: false,
          currentMonth: 1,
          daysRemaining: Math.ceil(30 - daysPassed),
        });
      }

      const startDay = (currentMonth - 1) * 30;
      const endDay = currentMonth * 30;

      db.all(
        `
        SELECT *
        FROM drug_use
        WHERE julianday(created_at) -
              julianday(?) >= ?
        AND julianday(created_at) -
            julianday(?) < ?
        ORDER BY created_at DESC, id DESC
        `,
        [
          result.first_record,
          startDay,
          result.first_record,
          endDay,
        ],
        (err, rows) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            eligible: true,
            currentMonth,
            records: rows,
          });
        }
      );
    }
  );
});

module.exports = {
  router,
  db,
};
