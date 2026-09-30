router.post("/druguse", (req, res) => {

  const { drugName, status, notes } = req.body;

  db.run(
    `
    INSERT INTO drug_use
    (
      drug_name,
      status,
      notes
    )
    VALUES (?, ?, ?)
    `,
    [drugName, status, notes],
    function (err) {

      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      res.json({
        success: true,
        id: this.lastID
      });
    }
  );
});

router.get("/druguse", (req, res) => {

  db.all(
    "SELECT * FROM drug_use ORDER BY created_at DESC",
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

      const firstRecord =
        new Date(result.first_record);

      const now =
        new Date();

      const daysPassed =
        (now - firstRecord) /
        (1000 * 60 * 60 * 24);

      if (daysPassed < 30) {

        return res.json({
          eligible: false,
          daysRemaining:
            Math.ceil(30 - daysPassed)
        });

      }

      db.all(
        `
        SELECT *
        FROM drug_use
        ORDER BY created_at DESC
        `,
        [],
        (err, rows) => {

          if (err) {
            return res
              .status(500)
              .json(err);
          }

          res.json({
            eligible: true,
            records: rows
          });

        }
      );

    }
  );
});