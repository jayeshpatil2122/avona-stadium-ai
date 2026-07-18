from app.agents.multilingual import MultilingualIntelligence
from app.schemas.ai import AIRequest
from app.services.llm.base_provider import BaseProvider


# Fake AI provider used for testing.
# No real Groq API request is made.
class FakeProvider(BaseProvider):
    def __init__(self):
        self.last_prompt = None

    def generate(self, prompt: str) -> str:
        self.last_prompt = prompt
        return "Traducción simulada"


def test_multilingual_intelligence_returns_provider_response():
    provider = FakeProvider()
    intelligence = MultilingualIntelligence(provider)

    request = AIRequest(
        module="multilingual",
        user_role="fan",
        language="Spanish",
        stadium="Demo World Cup Stadium",
        location="Main Entrance",
        destination="Gate A",
        prompt="Where is the medical center?",
    )

    response = intelligence.process(request)

    assert response == "Traducción simulada"


def test_multilingual_intelligence_uses_target_language():
    provider = FakeProvider()
    intelligence = MultilingualIntelligence(provider)

    request = AIRequest(
        module="multilingual",
        user_role="fan",
        language="Hindi",
        stadium="Demo World Cup Stadium",
        location="Main Entrance",
        destination="Gate A",
        prompt="Please proceed to Gate B.",
    )

    intelligence.process(request)

    assert provider.last_prompt is not None
    assert "TARGET LANGUAGE" in provider.last_prompt
    assert "Hindi" in provider.last_prompt


def test_multilingual_intelligence_includes_message():
    provider = FakeProvider()
    intelligence = MultilingualIntelligence(provider)

    request = AIRequest(
        module="multilingual",
        user_role="fan",
        language="Spanish",
        stadium="Demo World Cup Stadium",
        location="Main Entrance",
        destination="Gate A",
        prompt="Gate A is temporarily closed.",
    )

    intelligence.process(request)

    assert provider.last_prompt is not None
    assert "MESSAGE TO TRANSLATE" in provider.last_prompt
    assert "Gate A is temporarily closed." in provider.last_prompt


def test_multilingual_intelligence_includes_user_context():
    provider = FakeProvider()
    intelligence = MultilingualIntelligence(provider)

    request = AIRequest(
        module="multilingual",
        user_role="volunteer",
        language="Spanish",
        stadium="Demo World Cup Stadium",
        location="Main Entrance",
        destination="Gate A",
        prompt="Please proceed to the medical center.",
    )

    intelligence.process(request)

    assert provider.last_prompt is not None
    assert "Role: volunteer" in provider.last_prompt
    assert "Stadium: Demo World Cup Stadium" in provider.last_prompt