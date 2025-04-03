import sys
import os
import pytest
import json

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))
from app import app

@pytest.fixture
def client():
    app.testing = True
    with app.test_client() as client:
        yield client

def test_search(client, monkeypatch):
    def mock_get(*args, **kwargs):
        class MockResponse:
            def json(self):
                return {
                    "organic_results":[
                        {"title": "Title 1", "link": "http://link1.com", "snippet": "Snippet 1"},
                        {"title": "Title 2", "link": "http://link2.com", "snippet": "Snippet 2"},
                    ]
                }
        return MockResponse()
    monkeypatch.setattr("requests.get",mock_get)
    response = client.post("/search", data={"query":"test"})
    assert response.status_code == 200
    data = json.loads(response.data)

    assert len(data) == 2
    assert data[0]["title"] == "Title 1"
    assert data[0]["url"] == "http://link1.com"
    assert data[0]["snippet"] == "Snippet 1"