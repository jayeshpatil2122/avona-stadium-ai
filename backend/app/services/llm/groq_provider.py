from groq import Groq

from app.core.config import settings
from app.services.llm.base_provider import BaseProvider


class GroqProvider(BaseProvider):

    def __init__(self):
        self.api_key = settings.GROQ_API_KEY
        self.client = None

    def generate(self, prompt: str) -> str:

        if not self.api_key:
            raise RuntimeError(
                "GROQ_API_KEY is not configured."
            )

        if self.client is None:
            self.client = Groq(
                api_key=self.api_key,
                timeout=15.0,
            )

        response = self.client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.4,
        )

        return response.choices[0].message.content