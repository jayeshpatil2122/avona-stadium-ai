from typing import Literal, TypedDict

from app.data.stadium_data import STADIUM_CROWD_DATA


class CrowdAnalysis(TypedDict):
    zone: str
    occupancy: int
    capacity: int
    density_percentage: float
    risk_level: Literal["Low", "Moderate", "High", "Critical"]


class CrowdService:

    @staticmethod
    def analyze_zone(
        stadium: str,
        location: str | None,
    ) -> CrowdAnalysis | None:

        if not location:
            return None

        stadium_data = STADIUM_CROWD_DATA.get(stadium)

        if not stadium_data:
            return None

        zone_data = stadium_data.get(location)

        if not zone_data:
            return None

        occupancy = zone_data["occupancy"]
        capacity = zone_data["capacity"]

        density_percentage = round(
            (occupancy / capacity) * 100,
            1,
        )

        if density_percentage >= 85:
            risk_level = "Critical"

        elif density_percentage >= 70:
            risk_level = "High"

        elif density_percentage >= 50:
            risk_level = "Moderate"

        else:
            risk_level = "Low"

        return {
            "zone": location,
            "occupancy": occupancy,
            "capacity": capacity,
            "density_percentage": density_percentage,
            "risk_level": risk_level,
        }
