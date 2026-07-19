import pytest
from fastapi.testclient import TestClient
from fastapi import HTTPException

from app.main import app
from app.api.routes.ai import get_ai_service
from app.services.ai_service import AIService
from app.agents.operations import OperationsIntelligence
from app.services.operations_service import OperationsService
from app.schemas.ai import AIRequest
from tests.fakes import FakeProvider, FailingProvider

client = TestClient(app)


def test_operations_service_returns_known_incident():
    result = OperationsService.get_operational_situation(
        stadium="Demo World Cup Stadium",
        location="North Concourse",
        incident_type="crowd",
    )
    assert result is not None
    assert result["category"] == "crowd"
    assert result["severity"] == "critical"
    assert result["location"] == "North Concourse"
    assert "Redirect incoming fan flow." in result["recommended_actions"]


def test_operations_service_returns_none_for_unknown_location():
    result = OperationsService.get_operational_situation(
        stadium="Demo World Cup Stadium",
        location="Unknown Concourse",
        incident_type="crowd",
    )
    assert result is None


def test_operations_service_returns_none_for_unknown_stadium():
    result = OperationsService.get_operational_situation(
        stadium="Unknown Stadium",
        location="North Concourse",
        incident_type="crowd",
    )
    assert result is None


def test_operations_service_returns_none_for_unknown_incident_type():
    result = OperationsService.get_operational_situation(
        stadium="Demo World Cup Stadium",
        location="North Concourse",
        incident_type="unknown_type",
    )
    assert result is None


@pytest.mark.anyio
async def test_operations_agent_includes_verified_operational_context():
    provider = FakeProvider(response="AI Operational Recommendation")
    agent = OperationsIntelligence(provider=provider)
    data = AIRequest(
        module="operations",
        user_role="operations",
        language="English",
        stadium="Demo World Cup Stadium",
        location="North Concourse",
        incident_type="crowd",
        prompt="Analyze crowd issue",
    )
    response = await agent.process(data)
    assert response == "AI Operational Recommendation"
    assert "High crowd density detected" in provider.last_prompt
    assert "CRITICAL" in provider.last_prompt


@pytest.mark.anyio
async def test_operations_agent_handles_missing_operational_data_safely():
    provider = FakeProvider(response="Safe default response")
    agent = OperationsIntelligence(provider=provider)
    data = AIRequest(
        module="operations",
        user_role="operations",
        language="English",
        stadium="Demo World Cup Stadium",
        location="North Concourse",
        incident_type="unknown_type",  # unknown_type is not defined for North Concourse
        prompt="Analyze status",
    )
    response = await agent.process(data)
    assert response == "Safe default response"
    assert "No verified demo operational incident data is available" in provider.last_prompt


def test_operations_api_integration_with_fake_provider():
    fake_service = AIService()
    fake_service.modules["operations"] = OperationsIntelligence(
        FakeProvider(response="API Operations Response")
    )
    app.dependency_overrides[get_ai_service] = lambda: fake_service

    try:
        response = client.post(
            "/api/ai/generate",
            json={
                "module": "operations",
                "user_role": "operations",
                "language": "English",
                "stadium": "Demo World Cup Stadium",
                "location": "North Concourse",
                "incident_type": "crowd",
                "prompt": "Recommend actions",
            },
        )
        assert response.status_code == 200
        data = response.json()
        assert data["module"] == "operations"
        assert data["response"] == "API Operations Response"
    finally:
        app.dependency_overrides.clear()


def test_operations_api_handles_provider_failure():
    fake_service = AIService()
    fake_service.modules["operations"] = OperationsIntelligence(
        FailingProvider()
    )
    app.dependency_overrides[get_ai_service] = lambda: fake_service

    try:
        response = client.post(
            "/api/ai/generate",
            json={
                "module": "operations",
                "user_role": "operations",
                "language": "English",
                "stadium": "Demo World Cup Stadium",
                "location": "North Concourse",
                "incident_type": "crowd",
                "prompt": "Recommend actions",
            },
        )
        assert response.status_code == 503
        data = response.json()
        assert "AI service is temporarily unavailable" in data["detail"]
    finally:
        app.dependency_overrides.clear()


@pytest.mark.parametrize(
    "location",
    [
        "Main Entrance",
        "Security Checkpoint",
        "Central Plaza",
        "North Concourse",
        "East Concourse",
        "Gate A",
        "Gate B",
        "Medical Center",
    ],
)
@pytest.mark.parametrize(
    "incident_type",
    ["crowd", "medical", "accessibility", "facility", "normal"],
)
def test_operations_service_coverage_matrix(location, incident_type):
    result = OperationsService.get_operational_situation(
        stadium="Demo World Cup Stadium",
        location=location,
        incident_type=incident_type,
    )
    assert result is not None
    assert result["stadium"] == "Demo World Cup Stadium"
    assert result["location"] == location
    assert result["category"] == incident_type
    assert result["severity"] in ["low", "medium", "high", "critical"]
    assert len(result["situation"]) > 0
    assert len(result["recommended_actions"]) > 0
    assert result["data_source"] == "Verified Simulated Operations Registry"
