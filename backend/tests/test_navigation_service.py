from app.services.navigation_service import NavigationService


def test_route_from_main_entrance_to_gate_a():
    route = NavigationService.find_route(
        stadium="Demo World Cup Stadium",
        location="Main Entrance",
        destination="Gate A",
    )

    assert route == [
        "Main Entrance",
        "Security Checkpoint",
        "Central Plaza",
        "North Concourse",
        "Gate A",
    ]


def test_route_between_two_gates():
    route = NavigationService.find_route(
        stadium="Demo World Cup Stadium",
        location="Gate B",
        destination="Gate A",
    )

    assert route == [
        "Gate B",
        "East Concourse",
        "Central Plaza",
        "North Concourse",
        "Gate A",
    ]


def test_route_from_gate_a_to_central_plaza():
    route = NavigationService.find_route(
        stadium="Demo World Cup Stadium",
        location="Gate A",
        destination="Central Plaza",
    )

    assert route == [
        "Gate A",
        "North Concourse",
        "Central Plaza",
    ]


def test_route_to_same_location():
    route = NavigationService.find_route(
        stadium="Demo World Cup Stadium",
        location="Gate A",
        destination="Gate A",
    )

    assert route == ["Gate A"]


def test_invalid_stadium_returns_none():
    route = NavigationService.find_route(
        stadium="Unknown Stadium",
        location="Main Entrance",
        destination="Gate A",
    )

    assert route is None


def test_invalid_starting_location_returns_none():
    route = NavigationService.find_route(
        stadium="Demo World Cup Stadium",
        location="Unknown Location",
        destination="Gate A",
    )

    assert route is None


def test_invalid_destination_returns_none():
    route = NavigationService.find_route(
        stadium="Demo World Cup Stadium",
        location="Main Entrance",
        destination="Unknown Destination",
    )

    assert route is None


def test_missing_location_returns_none():
    route = NavigationService.find_route(
        stadium="Demo World Cup Stadium",
        location=None,
        destination="Gate A",
    )

    assert route is None


def test_missing_destination_returns_none():
    route = NavigationService.find_route(
        stadium="Demo World Cup Stadium",
        location="Main Entrance",
        destination=None,
    )

    assert route is None