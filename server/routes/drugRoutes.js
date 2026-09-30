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
