from collections import deque

from app.data.stadium_data import STADIUM_GRAPHS


class NavigationService:

    @staticmethod
    def find_route(
        stadium: str,
        location: str | None,
        destination: str | None,
    ) -> list[str] | None:
        """
        Find the shortest verified route between two connected
        locations in the demo stadium using breadth-first search.

        Returns:
            A list of locations representing the route,
            or None if no verified route is available.
        """

        if not location or not destination:
            return None

        stadium_graph = STADIUM_GRAPHS.get(stadium)

        if not stadium_graph:
            return None

        if location not in stadium_graph:
            return None

        if destination not in stadium_graph:
            return None

        # User is already at the requested destination.
        if location == destination:
            return [location]

        queue = deque([
            (location, [location])
        ])

        visited = {location}

        while queue:
            current_location, path = queue.popleft()

            for neighbor in stadium_graph[current_location]:

                if neighbor in visited:
                    continue

                new_path = path + [neighbor]

                if neighbor == destination:
                    return new_path

                visited.add(neighbor)

                queue.append(
                    (neighbor, new_path)
                )

        return None