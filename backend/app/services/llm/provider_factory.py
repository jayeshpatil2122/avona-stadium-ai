from app.core.config import settings
from app.services.llm.groq_provider import GroqProvider


class ProviderFactory:

    @staticmethod
    def get_provider():
        if settings.LLM_PROVIDER == "groq" or not settings.LLM_PROVIDER:
            return GroqProvider()

        return GroqProvider()
