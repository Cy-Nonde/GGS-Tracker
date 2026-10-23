async function loadDrugHistory() {

    try {

        const response =
          await fetch("/api/druguse");

        const records =
          await response.json();

        const container =
          document.getElementById(
            "history-container"
          );

        container.textContent = "";

        if (records.length === 0) {
            container.textContent =
              "<p>No records found.</p>";
            return;
        }

        records.forEach(record => {

            container.textContent += `
                <div class="record">
                    <h3>${record.drug_name}</h3>

                    <p>
                      <strong>Status:</strong>
                      ${record.status}
                    </p>

                    <p>
                      <strong>Comments:</strong>
                      ${record.comments || "None"}
                    </p>

                    <p>
                      <strong>Date:</strong>
                      ${record.created_at}
                    </p>
                </div>
            `;
        });

    } catch (error) {

        console.error(error);

        document.getElementById(
          "history-container"
        ).textContent =
          "<p>Failed to load records.</p>";
    }
}

loadDrugHistory();