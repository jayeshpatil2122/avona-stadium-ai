from app.services.accessibility_service import AccessibilityService


def test_find_accessible_toilet_from_main_entrance():
    result = AccessibilityService.find_assistance(
        stadium="Demo World Cup Stadium",
        location="Main Entrance",
        assistance_type="accessible_toilet",
    )

    assert result is not None
    assert result["facility_name"] == (
        "Central Plaza Accessible Restroom"
    )
    assert result["location"] == "Central Plaza"
    assert result["wheelchair_accessible"] is True
    assert result["route"] == [
        "Main Entrance",
        "Security Checkpoint",
        "Central Plaza",
    ]


def test_find_accessible_toilet_from_gate_a():
    result = AccessibilityService.find_assistance(
        stadium="Demo World Cup Stadium",
        location="Gate A",
        assistance_type="accessible_toilet",
    )

    assert result is not None
    assert result["location"] == "Central Plaza"
    assert result["route"] == [
        "Gate A",
        "North Concourse",
        "Central Plaza",
    ]


def test_find_accessible_seating_from_gate_b():
    result = AccessibilityService.find_assistance(
        stadium="Demo World Cup Stadium",
        location="Gate B",
        assistance_type="accessible_seating",
    )

    assert result is not None
    assert result["facility_name"] == (
        "Gate A Accessible Seating Assistance"
    )
    assert result["location"] == "Gate A"
    assert result["route"] == [
        "Gate B",
        "East Concourse",
        "Central Plaza",
        "North Concourse",
        "Gate A",
    ]


def test_find_medical_assistance_from_north_concourse():
    result = AccessibilityService.find_assistance(
        stadium="Demo World Cup Stadium",
        location="North Concourse",
        assistance_type="medical_assistance",
    )

    assert result is not None
    assert result["location"] == "Medical Center"
    assert result["assistance_point"] == (
        "Medical Assistance Desk"
    )
    assert result["route"] == [
        "North Concourse",
        "Central Plaza",
        "Medical Center",
    ]


def test_find_wheelchair_assistance():
    result = AccessibilityService.find_assistance(
        stadium="Demo World Cup Stadium",
        location="Gate B",
        assistance_type="wheelchair_access",
    )

    assert result is not None
    assert result["wheelchair_accessible"] is True
    assert result["assistance_point"] == (
        "Accessibility Help Desk"
    )


def test_invalid_assistance_type_returns_none():
    result = AccessibilityService.find_assistance(
        stadium="Demo World Cup Stadium",
        location="Main Entrance",
        assistance_type="unknown_assistance",
    )

    assert result is None


def test_invalid_stadium_returns_none():
    result = AccessibilityService.find_assistance(
        stadium="Unknown Stadium",
        location="Main Entrance",
        assistance_type="accessible_toilet",
    )

    assert result is None


def test_missing_location_returns_none():
    result = AccessibilityService.find_assistance(
        stadium="Demo World Cup Stadium",
        location=None,
        assistance_type="accessible_toilet",
    )

    assert result is None


def test_missing_assistance_type_returns_none():
    result = AccessibilityService.find_assistance(
        stadium="Demo World Cup Stadium",
        location="Main Entrance",
        assistance_type=None,
    )

    assert result is None