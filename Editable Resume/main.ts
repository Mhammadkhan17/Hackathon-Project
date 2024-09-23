function nodeListToArray(nodeList: NodeListOf<Element>): HTMLElement[] {
  const array: HTMLElement[] = [];
  nodeList.forEach((node) => {
    array.push(node as HTMLElement);
  });
  return array;
}

function initializeEditableSections() {
  const editableSections = document.querySelectorAll(
    '.editable-section [contenteditable="true"]'
  );
  const editableSectionsArray = nodeListToArray(editableSections);

  editableSectionsArray.forEach((section) => {
    section.addEventListener("input", (event: Event) => {
      const target = event.target as HTMLElement;
      if (target) {
        saveChanges(target);
        handlePlaceholders(target);
      }
    });
  });

  editableSectionsArray.forEach((section) => {
    handlePlaceholders(section);
  });
}

function saveChanges(target: HTMLElement) {
  const parentElement = target.parentElement as HTMLElement;
  const sectionId = parentElement?.id || "";
  const content = target.innerHTML;

  console.log(`Updated ${sectionId}: ${content}`);
}

function handlePlaceholders(element: HTMLElement) {
  if (element.innerHTML.trim() === "") {
    element.classList.add("empty");
  } else {
    element.classList.remove("empty");
  }
}

function showPreview() {
  const resumeNameElement = document.querySelector("#resume h1");
  const resumeName = resumeNameElement
    ? (resumeNameElement as HTMLElement).innerText
    : "Your Name";

  const resumeSections = nodeListToArray(
    document.querySelectorAll("#resume .editable-section")
  ).map((section) => {
    const titleElement = section.querySelector("h2");
    const contentElement = section.querySelector('[contenteditable="true"]');

    return {
      title: titleElement ? (titleElement as HTMLElement).innerText : "",
      content: contentElement ? (contentElement as HTMLElement).innerHTML : "",
    };
  });

  localStorage.setItem("resumeName", resumeName);
  localStorage.setItem("resumeSections", JSON.stringify(resumeSections));

  window.location.href = "preview.html";
}

function loadResumeData() {
  const resumeName = localStorage.getItem("resumeName") || "Your Name";
  const resumeSectionsJSON = localStorage.getItem("resumeSections");

  if (resumeSectionsJSON) {
    const resumeSections = JSON.parse(resumeSectionsJSON);

    const resumeNameElement = document.querySelector(
      "#resume h1"
    ) as HTMLElement;
    resumeNameElement.innerText = resumeName;

    resumeSections.forEach(
      (section: { title: string; content: string }, index: number) => {
        const sectionElement = document.querySelector(
          `#resume .editable-section:nth-of-type(${index + 1})`
        );
        if (sectionElement) {
          const titleElement = sectionElement.querySelector(
            "h2"
          ) as HTMLElement;
          const contentElement = sectionElement.querySelector(
            '[contenteditable="true"]'
          ) as HTMLElement;

          if (titleElement) titleElement.innerText = section.title;
          if (contentElement) contentElement.innerHTML = section.content;
        }
      }
    );
  }
}

function closePreview() {
  const previewModal = document.getElementById("preview-modal") as HTMLElement;
  if (previewModal) {
    previewModal.classList.add("hidden");
  }
}

function downloadResume() {
  const resumeNameElement = document.querySelector("#resume h1");
  const resumeName = resumeNameElement
    ? (resumeNameElement as HTMLElement).innerText
    : "resume";

  const resumeSections = nodeListToArray(
    document.querySelectorAll("#resume .editable-section")
  ).map((section) => {
    const titleElement = section.querySelector("h2");
    const contentElement = section.querySelector('[contenteditable="true"]');

    return {
      title: titleElement ? (titleElement as HTMLElement).innerText : "",
      content: contentElement ? (contentElement as HTMLElement).innerHTML : "",
    };
  });

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
}

document.addEventListener("DOMContentLoaded", () => {
  initializeEditableSections();
  loadResumeData();

  const previewButton = document.getElementById("preview-button");
  const closePreviewButton = document.getElementById("close-preview");
  const downloadButton = document.getElementById("download-button");
  const reeditButton = document.getElementById("reedit-button");

  if (previewButton) {
    previewButton.addEventListener("click", showPreview);
  }

  if (closePreviewButton) {
    closePreviewButton.addEventListener("click", closePreview);
  }

  if (downloadButton) {
    downloadButton.addEventListener("click", downloadResume);
  }

  if (reeditButton) {
    reeditButton.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});
