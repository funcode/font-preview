const fs = require("fs");
const path = require("path");

// Load the font list exported from PowerShell
const fonts = JSON.parse(
  fs.readFileSync(path.join(process.env.USERPROFILE, "Desktop", "fonts.json"), "utf8")
);

// HTML boilerplate
let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>System Font Preview</title>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    table { border-collapse: collapse; width: 100%; }
    td, th { border: 1px solid #ccc; padding: 8px; }
    .sample { font-size: 36px; }
    .controls { margin-bottom: 1em; }
    input[type=range] { width: 200px; }
  </style>
</head>
<body>
  <h1>System Font Preview</h1>
  <div class="controls">
    Font size: <input id="sizeSlider" type="range" min="12" max="120" value="36">
    <span id="sizeValue">36px</span>
  </div>
  <table>
    <tr><th>Font Family</th><th>Sample</th></tr>
`;

// Add each font row
for (const font of fonts) {
  html += `
    <tr>
      <td>${font}</td>
      <td class="sample" style="font-family: '${font}'">11:57:69</td>
    </tr>
  `;
}

html += `
  </table>
  <script>
    const slider = document.getElementById("sizeSlider");
    const sizeValue = document.getElementById("sizeValue");
    slider.addEventListener("input", () => {
      sizeValue.textContent = slider.value + "px";
      document.querySelectorAll(".sample").forEach(el => {
        el.style.fontSize = slider.value + "px";
      });
    });
  </script>
</body>
</html>
`;

// Write out to Desktop
const outPath = path.join(process.env.USERPROFILE, "Desktop", "fonts-preview.html");
fs.writeFileSync(outPath, html, "utf8");
console.log("Preview generated at:", outPath);
