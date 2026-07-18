from app.agents.navigation import NavigationIntelligence
from app.schemas.ai import AIRequest
from app.services.llm.base_provider import BaseProvider
from app.services.navigation_service import NavigationService


# Fake AI provider used for testing.
# This prevents tests from calling the real Groq API.
class FakeProvider(BaseProvider):
    def __init__(self):
        self.last_prompt = None

    def generate(self, prompt: str) -> str:
        self.last_prompt = prompt
        return "Mock navigation guidance"


# ---------------------------------------------------------
# Navigation Service Tests
# ---------------------------------------------------------

def test_find_verified_route():
    route = NavigationService.find_route(
        stadium="Demo World Cup Stadium",
        location="Main Entrance",
        destination="Gate A",
    )

    assert route is not None
    assert route[0] == "Main Entrance"
    assert route[-1] == "Gate A"
    assert "Security Checkpoint" in route
    assert "Central Plaza" in route
    assert "North Concourse" in route


def test_find_route_with_unknown_stadium():
    route = NavigationService.find_route(
        stadium="Unknown Stadium",
        location="Main Entrance",
        destination="Gate A",
    )

    assert route is None


def test_find_route_with_unknown_location():
    route = NavigationService.find_route(
        stadium="Demo World Cup Stadium",
        location="Unknown Location",
        destination="Gate A",
    )

    assert route is None


def test_find_route_with_unknown_destination():
    route = NavigationService.find_route(
        stadium="Demo World Cup Stadium",
        location="Main Entrance",
        destination="Unknown Destination",
    )

    assert route is None


def test_find_route_without_location():
    route = NavigationService.find_route(
        stadium="Demo World Cup Stadium",
        location=None,
        destination="Gate A",
    )

    assert route is None


def test_find_route_without_destination():
    route = NavigationService.find_route(
        stadium="Demo World Cup Stadium",
        location="Main Entrance",
        destination=None,
    )

    assert route is None


# ---------------------------------------------------------
# Navigation Intelligence Tests
# ---------------------------------------------------------

def test_navigation_intelligence_uses_verified_route():
    provider = FakeProvider()
    intelligence = NavigationIntelligence(provider)

    request = AIRequest(
        module="navigation",
        user_role="fan",
        language="English",
        stadium="Demo World Cup Stadium",
        location="Main Entrance",
        destination="Gate A",
        prompt="Guide me to Gate A.",
    )

    response = intelligence.process(request)

    assert response == "Mock navigation guidance"
    assert provider.last_prompt is not None

    assert (
        "Main Entrance -> Security Checkpoint -> Central Plaza -> "
        "North Concourse -> Gate A"
        in provider.last_prompt
    )


def test_navigation_intelligence_handles_missing_verified_route():
    provider = FakeProvider()
    intelligence = NavigationIntelligence(provider)

    request = AIRequest(
        module="navigation",
        user_role="fan",
        language="English",
        stadium="Demo World Cup Stadium",
        location="Unknown Location",
        destination="Gate A",
        prompt="Guide me to Gate A.",
    )

    response = intelligence.process(request)

    assert response == "Mock navigation guidance"
    assert provider.last_prompt is not None
    assert "No verified route is available." in provider.last_prompt
    assert "Do not add or invent locations" in provider.last_prompt