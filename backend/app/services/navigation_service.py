from app.data.stadium_data import STADIUM_ROUTES


class NavigationService:

    @staticmethod
    def find_route(
        stadium: str,
        location: str | None,
        destination: str | None,
    ) -> list[str] | None:

        if not location or not destination:
            return None

        stadium_data = STADIUM_ROUTES.get(stadium)

        if not stadium_data:
            return None

        location_data = stadium_data.get(location)

        if not location_data:
            return None

        return location_data.get(destination)