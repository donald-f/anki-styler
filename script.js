// script.js

document.getElementById("processButton").addEventListener("click", processHtml);
document.getElementById("clearButton").addEventListener("click", clearHtml);
document
  .getElementById("showHtmlOutputPreviewButton")
  .addEventListener("click", previewHtml);

function processHtml() {
  const inputHtml = document.getElementById("inputHtml").value;

  if (inputHtml.trim() === "") {
    alert("Please enter some HTML.");
    return;
  }

  // 1. Parse the input HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(inputHtml, "text/html");

  // 2. Remove all inline styles
  const elementsWithInlineStyles = doc.querySelectorAll("[style]");
  elementsWithInlineStyles.forEach((el) => el.removeAttribute("style"));

  // 3. Apply custom inline styles for flashcard-friendly appearance
  applyTailoredStyles(doc.body);

  // 4. Get the updated HTML content
  const updatedHtml = doc.body.innerHTML;

  // 5. Output the styled HTML to the output textarea
  document.getElementById("outputHtml").value = updatedHtml;
}

function applyTailoredStyles(element) {
  // Apply styles to specific tags
  if (
    element.tagName === "H1" ||
    element.tagName === "H2" ||
    element.tagName === "H3"
  ) {
    applyHeadingStyles(element);
  } else if (element.tagName === "P") {
    applyParagraphStyles(element);
  } else if (element.tagName === "UL" || element.tagName === "OL") {
    applyListStyles(element);
  } else if (element.tagName === "A") {
    applyLinkStyles(element);
  } else if (["TABLE", "TH", "TD", "TR"].includes(element.tagName)) {
    applyTableStyles(element);
  } else if (["EM", "B", "STRONG"].includes(element.tagName)) {
    applyInheritOnlyStyles(element);
  } else {
    applyGeneralStyles(element);
  }

  // Recursively apply styles to child elements
  Array.from(element.children).forEach((child) => applyTailoredStyles(child));
}

function applyGeneralStyles(element) {
  const styles = {
    color: "rgb(50, 50, 50)",
    textAlign: "left",
  };

  Object.keys(styles).forEach((style) => {
    element.style[style] = styles[style];
  });
}

function applyHeadingStyles(element) {
  const styles = {
    color: "rgb(0, 0, 139)",
    fontSize: getComputedStyleBasedOnTag(element),
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "'Arial', sans-serif",
  };

  Object.keys(styles).forEach((style) => {
    element.style[style] = styles[style];
  });
}

function applyInheritOnlyStyles(element) {
  const styles = {
    color: "inherit",
  };
  Object.keys(styles).forEach((style) => {
    element.style[style] = styles[style];
  });
}

function applyParagraphStyles(element) {
  const styles = {
    color: "rgb(50, 50, 50)",
    backgroundColor: "transparent",
    fontSize: "16px",
    fontWeight: "normal",
    textAlign: "left",
    fontFamily: "'Arial', sans-serif",
  };

  Object.keys(styles).forEach((style) => {
    element.style[style] = styles[style];
  });
}

function applyTableStyles(element) {
  const styles = {
    fontSize: "16px",
    fontFamily: "'Arial', sans-serif",
    borderCollapse: "collapse",
  };

  Object.keys(styles).forEach((style) => {
    element.style[style] = styles[style];
  });

  const table = element.querySelectorAll("table");
  table.forEach((table) => {
    table.style.borderCollapse = "collapse";
    table.style.color = "rgb(50, 50, 50)";
  });

  // Style the table header cells (th)
  const headerCells = element.querySelectorAll("th");
  headerCells.forEach((th) => {
    th.style.border = "1px solid rgb(220, 220, 220)";
    th.style.fontWeight = "bold";
    th.style.padding = "10px";
    th.style.color = "inherit";
  });

  // Style the table data cells (td)
  const dataCells = element.querySelectorAll("td");
  dataCells.forEach((td) => {
    td.style.padding = "8px";
    td.style.border = "1px solid rgb(220, 220, 220)"; // Light border for readability
    td.style.color = "inherit";
  });

  const rows = element.querySelectorAll("tr");
  rows.forEach((row, index) => {
    if (index % 2 === 0) {
      const isFirstRow = index === 0;
      if (isFirstRow) {
        row.style.backgroundColor = "rgb(0, 0, 139)";
        row.style.color = "rgb(255, 255, 255)";
      } else {
        row.style.backgroundColor = "rgb(240, 240, 240)";
        row.style.color = "inherit";
      }
    }
  });
}

function clearHtml() {
  document.getElementById("inputHtml").value = "";
  document.getElementById("outputHtml").value = "";
}

function previewHtml() {
  const htmlContent = document.getElementById("outputHtml").value;
  // Open a new tab
  const newTab = window.open();

  // Write the HTML content into the new tab
  if (newTab) {
    newTab.document.open();
    newTab.document.write(htmlContent);
    newTab.document.close();
  } else {
    alert("Pop-ups are blocked. Please allow pop-ups for this website.");
  }
}

function replaceWithNewHTML() {
  // Select the <link> tag by its href attribute
  const stylesheetLink = document.querySelector(
    'link[rel="stylesheet"][href="styles.css"]'
  );

  // Remove the <link> tag if it exists
  if (stylesheetLink) {
    stylesheetLink.remove();
    console.log("Stylesheet removed!");
  } else {
    console.log("Stylesheet not found!");
  }
  document.body.innerHTML = document.getElementById("outputHtml").value;
}

function applyListStyles(element) {
  const styles = {
    color: "rgb(50, 50, 50)",
    fontSize: "16px",
    textAlign: "left",
    fontFamily: "'Arial', sans-serif",
  };

  Object.keys(styles).forEach((style) => {
    element.style[style] = styles[style];
  });

  // Apply styles to list items as well
  Array.from(element.children).forEach((li) => {});
}

function applyLinkStyles(element) {
  const styles = {
    color: "rgb(0, 123, 255)",
    fontSize: "16px",
    textAlign: "left",
    textDecoration: "underline",
    fontFamily: "'Arial', sans-serif",
  };

  Object.keys(styles).forEach((style) => {
    element.style[style] = styles[style];
  });
}

function getComputedStyleBasedOnTag(element) {
  // Adjust font size based on tag type (H1, H2, H3)
  switch (element.tagName) {
    case "H1":
      return "36px";
    case "H2":
      return "28px";
    case "H3":
      return "24px";
    default:
      return "18px";
  }
}
