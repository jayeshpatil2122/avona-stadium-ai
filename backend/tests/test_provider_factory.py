import pytest

from app.core.config import settings
from app.services.llm.groq_provider import GroqProvider
from app.services.llm.provider_factory import ProviderFactory


@pytest.fixture(autouse=True)
def reset_provider_factory():
    ProviderFactory._instance = None
    yield
    ProviderFactory._instance = None


def test_provider_factory_returns_groq_provider(monkeypatch):
    monkeypatch.setattr(settings, "LLM_PROVIDER", "groq")

    provider = ProviderFactory.get_provider()

    assert isinstance(provider, GroqProvider)


def test_provider_factory_is_case_insensitive(monkeypatch):
    monkeypatch.setattr(settings, "LLM_PROVIDER", "GROQ")

    provider = ProviderFactory.get_provider()

    assert isinstance(provider, GroqProvider)


def test_provider_factory_rejects_unsupported_provider(monkeypatch):
    monkeypatch.setattr(settings, "LLM_PROVIDER", "unsupported-provider")

    with pytest.raises(
        ValueError,
        match="Unsupported LLM provider configuration"
    ):
        ProviderFactory.get_provider()