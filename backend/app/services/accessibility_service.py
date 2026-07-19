from typing import TypedDict

from app.data.stadium_data import STADIUM_ACCESSIBILITY_FACILITIES
from app.services.navigation_service import NavigationService


class AccessibilityAssistance(TypedDict):
    assistance_type: str
    facility_name: str
    location: str
    route: list[str]
    wheelchair_accessible: bool
    elevator_access: bool
    assistance_point: str
    description: str


class AccessibilityService:

    @staticmethod
    def find_assistance(
        stadium: str,
        location: str | None,
        assistance_type: str | None,
    ) -> AccessibilityAssistance | None:

        if not location or not assistance_type:
            return None

        stadium_data = STADIUM_ACCESSIBILITY_FACILITIES.get(stadium)

        if not stadium_data:
            return None

        facility = stadium_data.get(
            assistance_type.lower().strip()
        )

        if not facility:
            return None

        destination = facility["location"]

        route = NavigationService.find_route(
            stadium=stadium,
            location=location,
            destination=destination,
        )

        if not route:
            return None

        return {
            "assistance_type": assistance_type,
            "facility_name": facility["name"],
            "location": facility["location"],
            "route": route,
            "wheelchair_accessible": facility[
                "wheelchair_accessible"
            ],
            "elevator_access": facility[
                "elevator_access"
            ],
            "assistance_point": facility[
                "assistance_point"
            ],
            "description": facility["description"],
        }
