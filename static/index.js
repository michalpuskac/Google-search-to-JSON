const form = document.getElementById("searchForm");
const resultsDiv = document.getElementById("results");
const downloadBtn = document.getElementById("downloadBtn");
const searchBtn = document.getElementById("searchBtn");
const historyContainer = document.getElementById("historyContainer");
const historyEntries = document.getElementById("historyEntries");
const loadingMessage = document.getElementById("loadingMessage");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const useMockData = false; // Switch for testing !


function addToHistory(query, results) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    history.push({ query, results, timestamp: new Date().toISOString() });
    localStorage.setItem("searchHistory", JSON.stringify(history));
    displayHistory();
}


function displayHistory() {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!history.length) {
        historyContainer.classList.add("hidden");
        return;
    }
    historyContainer.classList.remove("hidden");
    historyEntries.innerHTML = ""; // Clean old records
    // First show newest records
    history.slice().reverse().forEach(item => {
        const entry = document.createElement("div");
        entry.className = "historyEntry";
        entry.textContent = `${item.query} (${new Date(item.timestamp).toLocaleString()})`;
        entry.onclick = () => {
            document.querySelector('input[name="query"]').value = item.query;
        };
        historyEntries.appendChild(entry);
    });
}

// Load history at the start of app
document.addEventListener("DOMContentLoaded", displayHistory);

// Clear history button on click
clearHistoryBtn.addEventListener("click", () => {
    localStorage.removeItem("searchHistory");
    displayHistory();  // Update displayed history 
});

// Main event listener for FORM
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get a value (query) from input 
    const query = document.querySelector('input[name="query"]').value;
    if (!query) {
        resultsDiv.textContent = 'Please enter a search term.';
        return;
    }

    // Disable button during search
    searchBtn.disabled = true;

    // Show spinner and and loading message
    loadingMessage.classList.remove("hidden");
    resultsDiv.textContent = "";
    downloadBtn.style.display = "none";

    // Try mock data for testing or fetch data from api
    try {
        let data;
        if (useMockData) {
            const response = await fetch('/static/dummy.json');
            data = await response.json();
        } else {
            const formData = new FormData(form);
            const response = await fetch('/search', {
                method: 'POST',
                body: formData
            });
            data = await response.json();
        }
        // Hide loading message
        loadingMessage.classList.add("hidden");

        // Display result
        resultsDiv.textContent = JSON.stringify(data, null, 2);
        // Save query value to history
        addToHistory(query, data);

        // Blob for downloading JSON file
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        downloadBtn.href = url;
        downloadBtn.download = 'results.json';
        downloadBtn.style.display = 'inline-block';
    } catch (error) {
        loadingMessage.classList.add("hidden");
        resultsDiv.textContent = 'Error: ' + error.message;
    } finally{
        // Re-enable search button (delay)
        setTimeout(() =>{
            searchBtn.disabled = false;
        },500);
    }
    });