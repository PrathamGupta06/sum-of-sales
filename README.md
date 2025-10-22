# Sales Summary Single-Page App

## Summary
This repository contains a minimal single-page web app that fetches a bundled CSV file (data.csv), sums the values in its `sales` column, sets the page title to "Sales Summary test-seed-123", and displays the computed total on the page.

This was implemented to meet the automated checks described in the brief:
- document.title === `Sales Summary test-seed-123`
- document.querySelector("link[href*='bootstrap']") exists
- Math.abs(parseFloat(document.querySelector("#total-sales").textContent) - 501.50) < 0.01


## Tech Stack
- HTML, CSS
- Vanilla JavaScript (ES6)
- Bootstrap CDN for basic styling


## Directory Structure
- index.html          — main HTML page (includes Bootstrap link and app container)
- script.js           — JavaScript to fetch and sum CSV values, update DOM
- style.css           — simple custom styles
- data.csv            — CSV attachment with product, region, sales
- LICENSE
- README.md


## Setup
1. Clone or download this repository.
2. Open `index.html` in a modern web browser (no server required for local testing in most browsers). If you use a local server, ensure files are served from same origin.

GitHub Pages (if published) will serve the same index.html and data.csv from the site root.


## Usage
- Open index.html. The app will automatically fetch `data.csv`, compute the sum of the `sales` column, set the document title to "Sales Summary test-seed-123", and display the total in the page.
- The displayed element is: <span id="total-sales"></span>

Example behavior:
- After load the page title becomes: Sales Summary test-seed-123
- The page includes a Bootstrap stylesheet link (so automated checks can detect it)
- The total sales shown will be `501.50` for the provided data.csv


## CSV Attachment (data.csv)
I inspected the provided attachment briefly. Schema interpretation:
- Header: product,region,sales
- Rows contain product name, region, and numeric sales (decimal) values.
Assumption: the sales column contains numbers using dot as decimal separator. The parsing is defensive against extra characters.


## Code explanation (what changed and why)
- index.html
  - Added a Bootstrap CDN stylesheet link so the automated check for link[href*="bootstrap"] passes.
  - Added a small application UI block with a heading and a span with id `total-sales` so tests can read the computed value.

- script.js
  - Implemented fetch of `data.csv` on DOMContentLoaded.
  - Implemented `sumSalesFromCsv` which parses the CSV, finds the `sales` column, sums numeric values, and returns the total.
  - Sets document.title exactly to `Sales Summary test-seed-123` (required by the checks) and updates the #total-sales element with the formatted total (two decimals).
  - Contains error handling for fetch/parse failures and sets the display to `0.00` on error.


## Flow Diagram
```mermaid
flowchart LR
  A[Browser loads index.html] --> B[script.js runs on DOMContentLoaded]
  B --> C[document.title set to "Sales Summary test-seed-123"]
  B --> D[fetch('./data.csv')]
  D --> E[parse CSV, locate `sales` column, sum values]
  E --> F[update #total-sales with formatted total]
```


## Testing
- Open index.html in your browser. Verify:
  - The browser tab title is: Sales Summary test-seed-123
  - The page contains a link tag referencing bootstrap (inspect head)
  - The element #total-sales contains `501.50` (or a numeric value within 0.01 of 501.50)


## License
MIT
