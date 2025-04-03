# Google Search to JSON Flask Application

A simple web application built with Flask that allows users to perform a Google search via the SerpApi service, view the organic results (title, URL, snippet) in JSON format directly on the page, and download the results as a JSON file. It also features a client-side search history.

##  Features

* Web interface to input search queries.
* Fetches Google Search organic results using the [SerpApi](https://serpapi.com/).
* Displays results (title, URL, snippet) formatted as JSON on the webpage.
* Allows downloading the displayed results as a `results.json` file.
* Client-side search history using browser `localStorage`.
* Loading indicator during the search process.
* Basic unit tests for the search endpoint.

## 📦 Tech Stack

* **Backend:** Python 3, Flask
* **API Interaction:** `requests` library (for SerpApi)
* **Environment Variables:** `python-dotenv`
* **Frontend:** HTML, CSS, JavaScript (Vanilla JS, Fetch API, localStorage)
* **Testing:** `pytest`

## 📦 Prerequisites

* Python 3.x installed
* `pip` (Python package installer) or poetry (version control)
* Git (for cloning the repository)
* A SerpApi Account and API Key (sign up at [serpapi.com](https://serpapi.com/))
* Docker (Optional)

## ⚙️ Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/michalpuskac/Google-search-to-JSON.git
    cd Google-search-to-JSON
    ```

2.  **Create a virtual environment:**
    ```bash
    python -m venv venv
    ```

3.  **Activate the virtual environment:**
    * On macOS/Linux:
        ```bash
        source venv/bin/activate # On Windows: venv\Scripts\activate
        ```

4.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Set up Environment Variables:**
    * **Create a file named `.env` in the project root directory.**
    * Add your SerpApi API key to the `.env` file:
        ```env
        API_KEY=YOUR_SERPAPI_API_KEY
        ```

## Running the Application

1.  Make sure your virtual environment is activated.
2.  Run the Flask development server:
    ```bash
    python src/app.py
    ```
3.  Open your web browser and navigate to: `http://localhost:5000`

## 🧪 Running Tests

1.  Make sure your virtual environment is activated and development dependencies (`pytest`) are installed.
2.  Run the tests from the project root directory:
    ```bash
    pytest
    ```
    or
    ```bash
    python -m pytest
    ```

## 🗂 Project Structure

```
    ├── .docker-compose.yml # Docker Compose configuration for defining and running multi-container Docker applications
    ├──  Dockerfile         # Instructions for building the Docker image
    ├── .poetry.lock        # Lock file for Poetry dependencies (ensures reproducible installs)
    ├── pyproject.toml      # Poetry configuration file (dependencies and project metadata)
    ├── .env                # Local environment variables (API Key) !!CREATE OWN!!
    ├── .gitignore          # Specifies intentionally untracked files that Git should ignore
    ├── requirements.txt    # Python dependencies
    ├── src/                # Source code directory
    │   └── app.py          # Main Flask application logic
    ├── static/             # Static files (CSS, JS)
    │   ├── index.js        # Frontend JavaScript logic
    │   └── style.css       # CSS styles
    ├── templates/          # HTML templates
    │   └── index.html      # Main HTML page
    └── tests/              # Unit and integration tests
        └── test_app.py     # Tests for the Flask application
```

## ⚠️ Future Improvements (TODO)

Based on initial development, potential areas for improvement include:

* **Backend:**
    * Implement robust error handling for SerpApi calls (network errors, API errors, invalid responses).
    * Add comprehensive logging for requests and errors.
    * Make the search `location` parameter configurable instead of hardcoded ("Prague,Prague,Czechia").
    * Abstracting SerpApi interaction into a separate module.
* **Frontend:**
    * Improve `Workspace` error handling to catch non-200 HTTP responses from the backend.
    * Refine UI state management (loading, error, success states).
    * Optimize `localStorage` usage for history (e.g., store only queries, not full results).
    * Enhance accessibility (add labels, ARIA attributes).
* **Testing:**
    * Increase test coverage to include error scenarios and other routes.
* **CSS:**
    * Consider using CSS variables or methodologies like BEM for better maintainability.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 👨‍💻 Author - Michal Puškáč

This projects are part of my portfolio, showcasing the basic python skills and concepts. This application is for educational purposes.
Consider additional security measures if you plan to use it in a production environment.
If you have any questions, feedback, or would like to collaborate, feel free to get in touch!

---
- **LinkedIn**: [LinkedIn](https://www.linkedin.com/in/michal-pu%C5%A1k%C3%A1%C4%8D-94b925179/)
- **GitHub**: [GitHub](https://github.com/michalpuskac)

---