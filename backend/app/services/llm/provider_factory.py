from app.services.llm.base_provider import BaseProvider
from app.core.config import settings
from app.services.llm.groq_provider import GroqProvider


class ProviderFactory:
    _instance: BaseProvider | None = None

    @classmethod
    def get_provider(cls) -> BaseProvider:
        if cls._instance is None:
            provider_name = (settings.LLM_PROVIDER or "groq").lower().strip()

            if provider_name == "groq":
                cls._instance = GroqProvider()
            else:
                raise ValueError(
                    f"Unsupported LLM provider configuration: {provider_name}"
                )
        return cls._instance
