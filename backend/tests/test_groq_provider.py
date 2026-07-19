import asyncio

import pytest

from app.services.llm.groq_provider import GroqProvider


def test_groq_provider_does_not_create_client_on_initialization():
    provider = GroqProvider()

    assert provider.client is None


def test_groq_provider_rejects_missing_api_key():
    provider = GroqProvider()

    provider.api_key = None

    with pytest.raises(
        RuntimeError,
        match="GROQ_API_KEY is not configured"
    ):
        asyncio.run(provider.generate("Test prompt"))
