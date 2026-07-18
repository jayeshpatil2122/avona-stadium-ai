from fastapi import HTTPException
import logging

from app.agents.multilingual import MultilingualIntelligence
from app.agents.navigation import NavigationIntelligence
from app.agents.crowd import CrowdIntelligence
from app.agents.accessibility import AccessibilityIntelligence
from app.schemas.ai import AIRequest
from app.services.llm.provider_factory import ProviderFactory

logger = logging.getLogger(__name__)


class AIService:

    def __init__(self):
        self.provider = ProviderFactory.get_provider()

        self.modules = {
            "navigation": NavigationIntelligence(self.provider),
            "multilingual": MultilingualIntelligence(self.provider),
            "crowd": CrowdIntelligence(self.provider),
            "accessibility": AccessibilityIntelligence(self.provider),
        }

    def process(self, data: AIRequest):

        module_name = data.module.lower().strip()
        module = self.modules.get(module_name)

        if module is None:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported intelligence module: {data.module}"
            )

        try:
            response = module.process(data)

        except HTTPException:
            raise

        except Exception:
            logger.exception(
                "AI provider request failed for module '%s'.",
                module_name,
           )
 
            raise HTTPException(
                status_code=503,
                detail="AI service is temporarily unavailable. Please try again later."
           )

        return {
            "module": module_name,
            "response": response
        }