from flask import Flask, render_template, request, jsonify, Response
import requests
import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
TEMPLATE_DIR = os.path.join(BASE_DIR, "..", "templates")
STATIC_DIR = os.path.join(BASE_DIR, "..", "static")

app = Flask(__name__, template_folder=TEMPLATE_DIR, static_folder=STATIC_DIR)

API_KEY = os.getenv("API_KEY")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/search", methods=["POST"])
def search():
    query = request.form["query"]
    params = {
        "engine" : "google",
        "q" : query,
        "location": "Prague,Prague,Czechia",
        "api_key" : API_KEY
    }

    response = requests.get("https://serpapi.com/search", params=params)
    results = response.json().get("organic_results", [])
    # print(response.json())  

    data = [{
        "title": r["title"],
        "url": r["link"],
        "snippet": r["snippet"]
    } for r in results]

    return jsonify(data)

if __name__ == "__main__":
    # app.run(debug=True, port=5001)
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)