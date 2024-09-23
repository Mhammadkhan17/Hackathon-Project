document.addEventListener("DOMContentLoaded", () => {
  const resumeElement = document.getElementById("resume");
  const resumeName = localStorage.getItem("resumeName") || "Your Name";
  const resumeSections = JSON.parse(
    localStorage.getItem("resumeSections") || "[]"
  );

  if (resumeElement) {
    resumeElement.innerHTML = `
            <h1>${resumeName}</h1>
            ${resumeSections
              .map(
                (section) => `
                <div class="editable-section">
                    <h2>${section.title}</h2>
                    <div>${section.content}</div>
                </div>
            `
              )
              .join("")}
        `;
  }
  const downloadButton = document.getElementById("download-button");
  const reeditButton = document.getElementById("reedit-button");

  if (downloadButton) {
    downloadButton.addEventListener("click", () => {
      const resumeContent = `
                <html>
                <head>
                    <title>${resumeName}</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .editable-section { margin-bottom: 20px; }
                    </style>
                </head>
                <body>
                    <h1>${resumeName}</h1>
                    ${resumeSections
                      .map(
                        (section) => `
                        <div class="editable-section">
                            <h2>${section.title}</h2>
                            <div>${section.content}</div>
                        </div>
                    `
                      )
                      .join("")}
                </body>
                </html>
            `;

      const blob = new Blob([resumeContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resumeName}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  if (reeditButton) {
    reeditButton.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});
