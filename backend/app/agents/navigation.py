from app.prompts.navigation import NAVIGATION_SYSTEM_PROMPT
from app.schemas.ai import AIRequest
from app.services.llm.base_provider import BaseProvider
from app.services.navigation_service import NavigationService


class NavigationIntelligence:

    def __init__(self, provider: BaseProvider):
        self.provider = provider

    async def process(self, data: AIRequest) -> str:

        route = NavigationService.find_route(
            stadium=data.stadium,
            location=data.location,
            destination=data.destination,
        )

        if route:
            route_text = " -> ".join(route)
        else:
            route_text = "No verified route is available."

        prompt = f"""
{NAVIGATION_SYSTEM_PROMPT}

USER CONTEXT

Role: {data.user_role}
Language: {data.language}
Stadium: {data.stadium}
Current Location: {data.location or "Not provided"}
Destination: {data.destination or "Not provided"}

VERIFIED ROUTE DATA

{route_text}

USER REQUEST

{data.prompt}

IMPORTANT:
Use the verified route data when providing navigation instructions.
Do not add or invent locations that are not present in the verified route.
If no verified route is available, clearly tell the user that exact navigation
guidance is unavailable and recommend checking official venue signage or staff.
"""

        return await self.provider.generate(prompt)
