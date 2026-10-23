document.getElementById("druguse-form").addEventListener("submit", async (e) => {

    e.preventDefault();

    const drugName = document.getElementById("drug-name").value;

    const status = document.getElementById("drug-status").value;

    const comments = document.getElementById("drug-comments").value;

    const response = await fetch("/api/druguse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        drugName,
        status,
        comments
      })
    });

    const data = await response.json();

    const result =
      document.getElementById("result");

    if (data.success) {
      result.className = "success";
      result.textContent =
        "Drug use record saved successfully.";
    } else {
      result.className = "error";
      result.textContent =
        "Failed to save record.";
    }
});