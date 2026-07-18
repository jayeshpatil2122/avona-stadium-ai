from app.prompts.accessibility import ACCESSIBILITY_SYSTEM_PROMPT
from app.schemas.ai import AIRequest
from app.services.accessibility_service import AccessibilityService
from app.services.llm.base_provider import BaseProvider


class AccessibilityIntelligence:

    def __init__(self, provider: BaseProvider):
        self.provider = provider

    def process(self, data: AIRequest) -> str:

        assistance_data = AccessibilityService.find_assistance(
            stadium=data.stadium,
            location=data.location,
            assistance_type=data.assistance_type,
        )

        if assistance_data:
            route_text = " -> ".join(
                assistance_data["route"]
            )

            accessibility_context = f"""
Requested Assistance: {assistance_data["assistance_type"]}
Recommended Facility: {assistance_data["facility_name"]}
Facility Location: {assistance_data["location"]}
Verified Route: {route_text}
Wheelchair Accessible: {assistance_data["wheelchair_accessible"]}
Elevator Access: {assistance_data["elevator_access"]}
Assistance Point: {assistance_data["assistance_point"]}
Facility Information: {assistance_data["description"]}
"""
        else:
            accessibility_context = """
No verified accessibility facility or route data is available
for this request.
"""

        prompt = f"""
{ACCESSIBILITY_SYSTEM_PROMPT}

USER CONTEXT

Role: {data.user_role}
Language: {data.language}
Stadium: {data.stadium}
Current Location: {data.location or "Not provided"}
Requested Assistance: {data.assistance_type or "Not provided"}

VERIFIED DEMO ACCESSIBILITY INFORMATION

{accessibility_context}

USER REQUEST

{data.prompt}

IMPORTANT:

Base your response only on the verified demo accessibility facility
and route information provided above.

If verified information is unavailable, explain that exact accessibility
guidance cannot be provided and recommend contacting authorized venue staff.

Do not invent additional facilities or routes.
"""

        return self.provider.generate(prompt)