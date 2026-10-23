document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = '/';
});

async function loadChecklist() {

    const content =
        document.getElementById("content");

    try {

        const response =
            await fetch("/api/checklist");

        const data =
            await response.json();

        // Checklist locked
        if (!data.eligible) {

            content.textContent = `
                <div class="locked">
                    <h2>Checklist Locked</h2>

                    <p>
                        A full review becomes available
                        after one month of records.
                    </p>

                    <p>
                        Days Remaining:
                        <strong>${data.daysRemaining}</strong>
                    </p>
                </div>
            `;

            return;
        }

        let html = `
            <div class="success">
                <h2>
                    Review Available
                </h2>

                <p>
                    Current Review Month:
                    <strong>
                        ${data.currentMonth}
                    </strong>
                </p>
            </div>
            <br>
        `;

        if (!data.records ||
            data.records.length === 0) {

            html += `
                <p class="empty">
                    No records exist for Month
                    ${data.currentMonth}.
                </p>
            `;

            content.textContent = html;
            return;
        }

        data.records.forEach(record => {

            html += `
                <div class="card">

                    <div class="record-title">
                        ${record.drug_name}
                    </div>

                    <p>
                        <strong>Status:</strong>
                        ${record.status}
                    </p>

                    <p>
                        <strong>Comments:</strong>
                        ${record.comments || "None"}
                    </p>

                    <p>
                        <strong>Recorded:</strong>
                        ${record.created_at}
                    </p>

                </div>
            `;
        });

        content.textContent = html;

    }
    catch(error) {

        console.error(error);

        content.textContent = `
            <div class="locked">
                Failed to load checklist.
            </div>
        `;
    }
}

loadChecklist();