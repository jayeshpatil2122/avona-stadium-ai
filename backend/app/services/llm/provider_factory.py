from app.core.config import settings
from app.services.llm.groq_provider import GroqProvider


class ProviderFactory:

    @staticmethod
    def get_provider():
        provider_name = (settings.LLM_PROVIDER or "groq").lower().strip()

        if provider_name == "groq":
            return GroqProvider()

        raise ValueError(
            f"Unsupported LLM provider configuration: {provider_name}"
        )