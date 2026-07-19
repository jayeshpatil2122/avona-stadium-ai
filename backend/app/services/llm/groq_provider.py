from groq import AsyncGroq
from app.core.config import settings
from app.services.llm.base_provider import BaseProvider


class GroqProvider(BaseProvider):

    def __init__(self):
        self.api_key = settings.GROQ_API_KEY
        self.client: AsyncGroq | None = None

    async def generate(self, prompt: str) -> str:
        if not self.api_key:
            raise RuntimeError(
                "GROQ_API_KEY is not configured."
            )

        if self.client is None:
            self.client = AsyncGroq(
                api_key=self.api_key,
                timeout=15.0,
            )

        response = await self.client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.4,
            max_tokens=settings.LLM_MAX_TOKENS,
        )

        return response.choices[0].message.content or ""
