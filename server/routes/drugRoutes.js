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

