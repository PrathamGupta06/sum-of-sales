// Script: fetch data.csv, sum the `sales` column, set document title, and display total
// The required title per the brief / tests is: Sales Summary test-seed-123

document.addEventListener('DOMContentLoaded', function() {
    // Set the required document title exactly
    document.title = 'Sales Summary test-seed-123';

    // Update heading to reflect title (optional UX)
    const heading = document.querySelector('#page-heading');
    if (heading) heading.textContent = document.title;

    // Path to the bundled CSV attachment
    const csvPath = './data.csv';

    // Fetch and process the CSV
    fetch(csvPath)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch CSV: ' + response.status);
            return response.text();
        })
        .then(text => {
            const total = sumSalesFromCsv(text);
            const display = document.querySelector('#total-sales');
            if (display) display.textContent = Number(total).toFixed(2);
        })
        .catch(err => {
            console.error('Error loading or parsing CSV:', err);
            const display = document.querySelector('#total-sales');
            if (display) display.textContent = '0.00';
        });
});

// Parse CSV text and sum the `sales` column. Returns numeric total (float).
function sumSalesFromCsv(csvText) {
    if (!csvText) return 0;
    // Split into lines and trim
    const lines = csvText.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
    if (lines.length <= 1) return 0; // no data rows

    // Parse header to find sales column index
    const header = lines[0].split(',').map(h => h.trim().toLowerCase());
    const salesIdx = header.findIndex(h => h === 'sales');
    if (salesIdx === -1) return 0;

    let total = 0;
    for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',');
        // Defensive: if line has fewer columns, skip
        if (parts.length <= salesIdx) continue;
        let raw = parts[salesIdx].trim();
        // Remove any non-numeric characters except dot and minus
        raw = raw.replace(/[^0-9.\-]/g, '');
        const val = parseFloat(raw);
        if (!isNaN(val)) total += val;
    }
    return total;
}
