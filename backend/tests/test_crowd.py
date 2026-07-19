import asyncio

from app.agents.crowd import CrowdIntelligence
from app.schemas.ai import AIRequest
from app.services.crowd_service import CrowdService
from tests.fakes import FakeProvider


def test_crowd_service_returns_correct_zone_data():
    result = CrowdService.analyze_zone(
        stadium="Demo World Cup Stadium",
        location="North Concourse",
    )

    assert result is not None
    assert result["zone"] == "North Concourse"
    assert result["occupancy"] == 1700
    assert result["capacity"] == 2000
    assert result["density_percentage"] == 85.0
    assert result["risk_level"] == "Critical"


def test_crowd_service_returns_none_for_unknown_zone():
    result = CrowdService.analyze_zone(
        stadium="Demo World Cup Stadium",
        location="Unknown Zone",
    )

    assert result is None


def test_crowd_service_returns_none_for_unknown_stadium():
    result = CrowdService.analyze_zone(
        stadium="Unknown Stadium",
        location="North Concourse",
    )

    assert result is None


def test_crowd_agent_uses_verified_crowd_data():
    provider = FakeProvider(
        response="Mock crowd operational recommendation"
    )

    agent = CrowdIntelligence(provider)

    request = AIRequest(
        module="crowd",
        user_role="operations",
        language="English",
        stadium="Demo World Cup Stadium",
        location="North Concourse",
        destination=None,
        prompt="Analyze the crowd situation."
    )

    response = asyncio.run(agent.process(request))

    assert response == "Mock crowd operational recommendation"

    assert "North Concourse" in provider.last_prompt
    assert "1700" in provider.last_prompt
    assert "2000" in provider.last_prompt
    assert "85.0%" in provider.last_prompt
    assert "Critical" in provider.last_prompt


def test_crowd_agent_handles_missing_crowd_data():
    provider = FakeProvider(
        response="Crowd data unavailable"
    )

    agent = CrowdIntelligence(provider)

    request = AIRequest(
        module="crowd",
        user_role="operations",
        language="English",
        stadium="Demo World Cup Stadium",
        location="Unknown Zone",
        destination=None,
        prompt="Analyze the crowd situation."
    )

    response = asyncio.run(agent.process(request))

    assert response == "Crowd data unavailable"

    assert "No verified crowd data is available" in provider.last_prompt
