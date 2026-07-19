from app.prompts.crowd import CROWD_SYSTEM_PROMPT
from app.schemas.ai import AIRequest
from app.services.crowd_service import CrowdService
from app.services.llm.base_provider import BaseProvider


class CrowdIntelligence:

    def __init__(self, provider: BaseProvider):
        self.provider = provider

    async def process(self, data: AIRequest) -> str:

        crowd_data = CrowdService.analyze_zone(
            stadium=data.stadium,
            location=data.location,
        )

        if crowd_data:
            crowd_context = f"""
Zone: {crowd_data["zone"]}
Occupancy: {crowd_data["occupancy"]}
Capacity: {crowd_data["capacity"]}
Density: {crowd_data["density_percentage"]}%
Risk Level: {crowd_data["risk_level"]}
"""
        else:
            crowd_context = """
No verified crowd data is available for this zone.
"""

        prompt = f"""
{CROWD_SYSTEM_PROMPT}

USER CONTEXT

Role: {data.user_role}
Language: {data.language}
Stadium: {data.stadium}

SIMULATED VERIFIED CROWD DATA

{crowd_context}

USER REQUEST

{data.prompt}

IMPORTANT:

Base your operational recommendation only on the provided crowd data.
If no verified crowd data is available, clearly state that crowd analysis
cannot be performed for this zone.
"""

        return await self.provider.generate(prompt)
