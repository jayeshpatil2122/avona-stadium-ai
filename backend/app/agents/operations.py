from app.prompts.operations import OPERATIONS_SYSTEM_PROMPT
from app.schemas.ai import AIRequest
from app.services.llm.base_provider import BaseProvider
from app.services.operations_service import OperationsService


class OperationsIntelligence:

    def __init__(self, provider: BaseProvider):
        self.provider = provider

    async def process(self, data: AIRequest) -> str:
        incident = OperationsService.get_operational_situation(
            stadium=data.stadium,
            location=data.location,
            incident_type=data.incident_type,
        )

        if incident:
            actions_text = "\n".join(
                [f"- {action}" for action in incident["recommended_actions"]]
            )
            operational_context = f"""
Incident Category: {incident["category"]}
Location: {incident["location"]}
Deterministic Severity: {incident["severity"].upper()}
Current Situation: {incident["situation"]}
Recommended Actions:
{actions_text}
Data Source: {incident["data_source"]}
"""
        else:
            operational_context = """
No verified demo operational incident data is available for this location and incident type.
"""

        prompt = f"""
{OPERATIONS_SYSTEM_PROMPT}

USER CONTEXT

Role: {data.user_role}
Stadium: {data.stadium}
Current Location: {data.location or "Not provided"}
Requested Incident Type: {data.incident_type or "Not provided"}

VERIFIED SIMULATED OPERATIONAL DATA

{operational_context}

USER REQUEST

{data.prompt}

IMPORTANT:
Base your operational recommendation and explanation only on the verified simulated operational data provided above.
If no verified incident data is available, explain that exact operational decision support cannot be provided and recommend checking official venue systems or contacting authorized staff.
Do not invent additional details or recommended actions.
"""

        return await self.provider.generate(prompt)
