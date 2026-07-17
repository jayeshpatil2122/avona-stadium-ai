from app.prompts.multilingual import MULTILINGUAL_SYSTEM_PROMPT
from app.schemas.ai import AIRequest
from app.services.llm.base_provider import BaseProvider


class MultilingualIntelligence:

    def __init__(self, provider: BaseProvider):
        self.provider = provider

    def process(self, data: AIRequest):

        prompt = f"""
{MULTILINGUAL_SYSTEM_PROMPT}

USER CONTEXT

Role: {data.user_role}
Stadium: {data.stadium}

TARGET LANGUAGE

{data.language}

MESSAGE TO TRANSLATE

{data.prompt}
"""

        return self.provider.generate(prompt)