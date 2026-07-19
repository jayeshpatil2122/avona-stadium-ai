from app.services.llm.base_provider import BaseProvider


class FakeProvider(BaseProvider):
    """Fake LLM provider that records prompts without calling an external API."""

    def __init__(self, response: str = "Mock AI response"):
        self.response = response
        self.last_prompt: str | None = None

    async def generate(self, prompt: str) -> str:
        self.last_prompt = prompt
        return self.response


class FailingProvider(BaseProvider):
    """Fake LLM provider that simulates an external provider failure."""

    async def generate(self, prompt: str) -> str:
        raise RuntimeError("Simulated provider failure")
