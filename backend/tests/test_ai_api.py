from fastapi.testclient import TestClient

from app.main import app

from app.api.routes.ai import service
from app.agents.navigation import NavigationIntelligence
from app.agents.multilingual import MultilingualIntelligence
from app.services.llm.base_provider import BaseProvider


client = TestClient(app)

class FakeProvider(BaseProvider):
    def generate(self, prompt: str) -> str:
        return "Mock AI response"


def test_generate_rejects_missing_required_fields():
    response = client.post(
        "/api/ai/generate",
        json={}
    )

    assert response.status_code == 422

    data = response.json()

    assert "detail" in data

def test_generate_rejects_unsupported_module():
    response = client.post(
        "/api/ai/generate",
        json={
            "module": "random",
            "user_role": "fan",
            "language": "English",
            "stadium": "Demo World Cup Stadium",
            "location": "Main Entrance",
            "destination": "Gate A",
            "prompt": "Help me"
        }
    )

    assert response.status_code == 400

    data = response.json()

    assert data["detail"] == "Unsupported intelligence module: random"

def test_navigation_api_with_fake_provider():
    fake_provider = FakeProvider()

    original_navigation = service.modules["navigation"]

    try:
        service.modules["navigation"] = NavigationIntelligence(fake_provider)

        response = client.post(
            "/api/ai/generate",
            json={
                "module": "navigation",
                "user_role": "fan",
                "language": "English",
                "stadium": "Demo World Cup Stadium",
                "location": "Main Entrance",
                "destination": "Gate A",
                "prompt": "Give me directions to Gate A."
            }
        )

        assert response.status_code == 200

        data = response.json()

        assert data["module"] == "navigation"
        assert data["response"] == "Mock AI response"

    finally:
        service.modules["navigation"] = original_navigation


def test_multilingual_api_with_fake_provider():
    fake_provider = FakeProvider()

    original_multilingual = service.modules["multilingual"]

    try:
        service.modules["multilingual"] = MultilingualIntelligence(fake_provider)

        response = client.post(
            "/api/ai/generate",
            json={
                "module": "multilingual",
                "user_role": "fan",
                "language": "Spanish",
                "stadium": "Demo World Cup Stadium",
                "location": "Main Entrance",
                "destination": "Gate A",
                "prompt": "Where is the medical center?"
            }
        )

        assert response.status_code == 200

        data = response.json()

        assert data["module"] == "multilingual"
        assert data["response"] == "Mock AI response"

    finally:
        service.modules["multilingual"] = original_multilingual