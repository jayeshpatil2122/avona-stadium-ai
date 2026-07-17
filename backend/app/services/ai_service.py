from fastapi import HTTPException

from app.agents.navigation import NavigationIntelligence
from app.schemas.ai import AIRequest
from app.services.llm.provider_factory import ProviderFactory
from app.agents.multilingual import MultilingualIntelligence

class AIService:

    def __init__(self):
        self.provider = ProviderFactory.get_provider()

        self.modules = {
            "navigation": NavigationIntelligence(self.provider),
            "multilingual": MultilingualIntelligence(self.provider),
        }
    def process(self, data: AIRequest):

        module_name = data.module.lower().strip()

        module = self.modules.get(module_name)

        if module is None:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported intelligence module: {data.module}"
            )

        response = module.process(data)

        return {
            "module": module_name,
            "response": response
        }