function nodeListToArray(nodeList) {
  var array = [];
  nodeList.forEach(function (node) {
    array.push(node);
  });
  return array;
}
function initializeEditableSections() {
  var editableSections = document.querySelectorAll(
    '.editable-section [contenteditable="true"]'
  );
  var editableSectionsArray = nodeListToArray(editableSections);
  editableSectionsArray.forEach(function (section) {
    section.addEventListener("input", function (event) {
      var target = event.target;
      if (target) {
        saveChanges(target);
        handlePlaceholders(target);
      }
    });
  });
  editableSectionsArray.forEach(function (section) {
    handlePlaceholders(section);
  });
}
function saveChanges(target) {
  var parentElement = target.parentElement;
  var sectionId =
    (parentElement === null || parentElement === void 0
      ? void 0
      : parentElement.id) || "";
  var content = target.innerHTML;
  console.log("Updated ".concat(sectionId, ": ").concat(content));
}
function handlePlaceholders(element) {
  if (element.innerHTML.trim() === "") {
    element.classList.add("empty");
  } else {
    element.classList.remove("empty");
  }
}
function showPreview() {
  var resumeNameElement = document.querySelector("#resume h1");
  var resumeName = resumeNameElement
    ? resumeNameElement.innerText
    : "Your Name";
  var resumeSections = nodeListToArray(
    document.querySelectorAll("#resume .editable-section")
  ).map(function (section) {
    var titleElement = section.querySelector("h2");
    var contentElement = section.querySelector('[contenteditable="true"]');
    return {
      title: titleElement ? titleElement.innerText : "",
      content: contentElement ? contentElement.innerHTML : "",
    };
  });
  localStorage.setItem("resumeName", resumeName);
  localStorage.setItem("resumeSections", JSON.stringify(resumeSections));
  window.location.href = "preview.html";
}
function loadResumeData() {
  var resumeName = localStorage.getItem("resumeName") || "Your Name";
  var resumeSectionsJSON = localStorage.getItem("resumeSections");
  if (resumeSectionsJSON) {
    var resumeSections = JSON.parse(resumeSectionsJSON);
    var resumeNameElement = document.querySelector("#resume h1");
    resumeNameElement.innerText = resumeName;
    resumeSections.forEach(function (section, index) {
      var sectionElement = document.querySelector(
        "#resume .editable-section:nth-of-type(".concat(index + 1, ")")
      );
      if (sectionElement) {
        var titleElement = sectionElement.querySelector("h2");
        var contentElement = sectionElement.querySelector(
          '[contenteditable="true"]'
        );
        if (titleElement) titleElement.innerText = section.title;
        if (contentElement) contentElement.innerHTML = section.content;
      }
    });
  }
}
function closePreview() {
  var previewModal = document.getElementById("preview-modal");
  if (previewModal) {
    previewModal.classList.add("hidden");
  }
}
function downloadResume() {
  var resumeNameElement = document.querySelector("#resume h1");
  var resumeName = resumeNameElement ? resumeNameElement.innerText : "resume";
  var resumeSections = nodeListToArray(
    document.querySelectorAll("#resume .editable-section")
  ).map(function (section) {
    var titleElement = section.querySelector("h2");
    var contentElement = section.querySelector('[contenteditable="true"]');
    return {
      title: titleElement ? titleElement.innerText : "",
      content: contentElement ? contentElement.innerHTML : "",
    };
  });
  var resumeContent = "\n        <html>\n        <head>\n            <title>"
    .concat(
      resumeName,
      "</title>\n            <style>\n                body { font-family: Arial, sans-serif; }\n                .editable-section { margin-bottom: 20px; }\n            </style>\n        </head>\n        <body>\n            <h1>"
    )
    .concat(resumeName, "</h1>\n            ")
    .concat(
      resumeSections
        .map(function (section) {
          return '\n                <div class="editable-section">\n                    <h2>'
            .concat(section.title, "</h2>\n                    <div>")
            .concat(
              section.content,
              "</div>\n                </div>\n            "
            );
        })
        .join(""),
      "\n        </body>\n        </html>\n    "
    );
  var blob = new Blob([resumeContent], { type: "text/html" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "".concat(resumeName, ".html");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
document.addEventListener("DOMContentLoaded", function () {
  initializeEditableSections();
  loadResumeData();
  var previewButton = document.getElementById("preview-button");
  var closePreviewButton = document.getElementById("close-preview");
  var downloadButton = document.getElementById("download-button");
  var reeditButton = document.getElementById("reedit-button");
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
    reeditButton.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }
});
