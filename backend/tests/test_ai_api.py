from fastapi.testclient import TestClient

from app.agents.multilingual import MultilingualIntelligence
from app.agents.navigation import NavigationIntelligence
from app.api.routes.ai import get_ai_service
from app.main import app
from app.services.ai_service import AIService
from app.services.llm.base_provider import BaseProvider


client = TestClient(app)


# ---------------------------------------------------------
# Fake Providers
# ---------------------------------------------------------

class FakeProvider(BaseProvider):
    """Fake LLM provider used to avoid real Groq API calls during tests."""

    def generate(self, prompt: str) -> str:
        return "Mock AI response"


class FailingProvider(BaseProvider):
    """Simulates an external LLM provider failure."""

    def generate(self, prompt: str) -> str:
        raise RuntimeError("Simulated provider failure")


# ---------------------------------------------------------
# Request Validation Tests
# ---------------------------------------------------------

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


def test_generate_rejects_whitespace_only_prompt():
    response = client.post(
        "/api/ai/generate",
        json={
            "module": "navigation",
            "user_role": "fan",
            "language": "English",
            "stadium": "Demo World Cup Stadium",
            "location": "Main Entrance",
            "destination": "Gate A",
            "prompt": "   "
        }
    )

    assert response.status_code == 422


def test_generate_rejects_whitespace_only_module():
    response = client.post(
        "/api/ai/generate",
        json={
            "module": "   ",
            "user_role": "fan",
            "language": "English",
            "stadium": "Demo World Cup Stadium",
            "location": "Main Entrance",
            "destination": "Gate A",
            "prompt": "Guide me to Gate A."
        }
    )

    assert response.status_code == 422


def test_generate_rejects_overly_long_prompt():
    response = client.post(
        "/api/ai/generate",
        json={
            "module": "navigation",
            "user_role": "fan",
            "language": "English",
            "stadium": "Demo World Cup Stadium",
            "location": "Main Entrance",
            "destination": "Gate A",
            "prompt": "A" * 1001
        }
    )

    assert response.status_code == 422


# ---------------------------------------------------------
# Navigation API Integration Tests
# ---------------------------------------------------------

def test_navigation_api_with_fake_provider():
    fake_service = AIService()

    fake_service.modules["navigation"] = NavigationIntelligence(
        FakeProvider()
    )

    app.dependency_overrides[get_ai_service] = lambda: fake_service

    try:
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
        app.dependency_overrides.clear()


# ---------------------------------------------------------
# Multilingual API Integration Tests
# ---------------------------------------------------------

def test_multilingual_api_with_fake_provider():
    fake_service = AIService()

    fake_service.modules["multilingual"] = MultilingualIntelligence(
        FakeProvider()
    )

    app.dependency_overrides[get_ai_service] = lambda: fake_service

    try:
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
        app.dependency_overrides.clear()


# ---------------------------------------------------------
# Provider Failure Handling Tests
# ---------------------------------------------------------

def test_navigation_api_handles_provider_failure():
    fake_service = AIService()

    fake_service.modules["navigation"] = NavigationIntelligence(
        FailingProvider()
    )

    app.dependency_overrides[get_ai_service] = lambda: fake_service

    try:
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

        assert response.status_code == 503

        data = response.json()

        assert data["detail"] == (
            "AI service is temporarily unavailable. "
            "Please try again later."
        )

        assert "Simulated provider failure" not in response.text

    finally:
        app.dependency_overrides.clear()


def test_multilingual_api_handles_provider_failure():
    fake_service = AIService()

    fake_service.modules["multilingual"] = MultilingualIntelligence(
        FailingProvider()
    )

    app.dependency_overrides[get_ai_service] = lambda: fake_service

    try:
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

        assert response.status_code == 503

        data = response.json()

        assert data["detail"] == (
            "AI service is temporarily unavailable. "
            "Please try again later."
        )

        assert "Simulated provider failure" not in response.text

    finally:
        app.dependency_overrides.clear()