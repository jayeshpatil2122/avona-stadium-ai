from typing import Literal, TypedDict
from app.data.stadium_data import STADIUM_OPERATIONS_DATA


class OperationalIncident(TypedDict):
    stadium: str
    location: str
    category: str
    severity: Literal["low", "medium", "high", "critical"]
    situation: str
    recommended_actions: list[str]
    data_source: str


class OperationsService:

    @staticmethod
    def get_operational_situation(
        stadium: str,
        location: str | None,
        incident_type: str | None,
    ) -> OperationalIncident | None:
        if not location or not incident_type:
            return None

        stadium_data = STADIUM_OPERATIONS_DATA.get(stadium)
        if not stadium_data:
            return None

        location_data = stadium_data.get(location)
        if not location_data:
            return None

        incident = location_data.get(incident_type.lower().strip())
        if not incident:
            return None

        return {
            "stadium": stadium,
            "location": location,
            "category": incident["category"],
            "severity": incident["severity"],
            "situation": incident["situation"],
            "recommended_actions": incident["recommended_actions"],
            "data_source": "Verified Simulated Operations Registry",
        }
