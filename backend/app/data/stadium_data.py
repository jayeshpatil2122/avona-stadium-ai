# =========================================================
# STADIUM ROUTE GRAPH
# =========================================================
#
# Represents connected locations inside the demo stadium.
# The graph is bidirectional, allowing route calculation
# between any two connected locations.
#
# This is simulated demo data and does not represent
# an actual FIFA World Cup stadium.
# =========================================================

STADIUM_GRAPHS = {
    "Demo World Cup Stadium": {
        "Main Entrance": [
            "Security Checkpoint",
        ],
        "Security Checkpoint": [
            "Main Entrance",
            "Central Plaza",
        ],
        "Central Plaza": [
            "Security Checkpoint",
            "North Concourse",
            "East Concourse",
            "Medical Center",
        ],
        "North Concourse": [
            "Central Plaza",
            "Gate A",
        ],
        "East Concourse": [
            "Central Plaza",
            "Gate B",
        ],
        "Gate A": [
            "North Concourse",
        ],
        "Gate B": [
            "East Concourse",
        ],
        "Medical Center": [
            "Central Plaza",
        ],
    }
}


# =========================================================
# SIMULATED CROWD DATA
# =========================================================

STADIUM_CROWD_DATA = {
    "Demo World Cup Stadium": {
        "Main Entrance": {
            "occupancy": 850,
            "capacity": 2000,
        },
        "Security Checkpoint": {
            "occupancy": 1200,
            "capacity": 1500,
        },
        "Central Plaza": {
            "occupancy": 2400,
            "capacity": 3000,
        },
        "North Concourse": {
            "occupancy": 1700,
            "capacity": 2000,
        },
        "East Concourse": {
            "occupancy": 900,
            "capacity": 2000,
        },
        "Gate A": {
            "occupancy": 750,
            "capacity": 1000,
        },
        "Gate B": {
            "occupancy": 350,
            "capacity": 1000,
        },
        "Medical Center": {
            "occupancy": 40,
            "capacity": 150,
        },
    }
}


# =========================================================
# SIMULATED ACCESSIBILITY FACILITIES
# =========================================================

STADIUM_ACCESSIBILITY_FACILITIES = {
    "Demo World Cup Stadium": {
        "accessible_toilet": {
            "name": "Central Plaza Accessible Restroom",
            "location": "Central Plaza",
            "wheelchair_accessible": True,
            "elevator_access": True,
            "assistance_point": "Guest Services Desk",
            "description": (
                "Accessible restroom facilities available "
                "in the Central Plaza."
            ),
        },
        "medical_assistance": {
            "name": "Stadium Medical Center",
            "location": "Medical Center",
            "wheelchair_accessible": True,
            "elevator_access": True,
            "assistance_point": "Medical Assistance Desk",
            "description": (
                "Medical support area for fans requiring "
                "health or first-aid assistance."
            ),
        },
        "accessible_seating": {
            "name": "Gate A Accessible Seating Assistance",
            "location": "Gate A",
            "wheelchair_accessible": True,
            "elevator_access": True,
            "assistance_point": "Gate A Accessibility Desk",
            "description": (
                "Assistance point for accessible seating "
                "and companion support."
            ),
        },
        "wheelchair_access": {
            "name": "Accessibility Help Desk",
            "location": "Central Plaza",
            "wheelchair_accessible": True,
            "elevator_access": True,
            "assistance_point": "Accessibility Help Desk",
            "description": (
                "Support point for wheelchair users "
                "and mobility assistance."
            ),
        },
        "visual_assistance": {
            "name": "Guest Services Accessibility Support",
            "location": "Central Plaza",
            "wheelchair_accessible": True,
            "elevator_access": True,
            "assistance_point": "Guest Services Desk",
            "description": (
                "Staff assistance point for fans requiring "
                "visual navigation support."
            ),
        },
        "hearing_assistance": {
            "name": "Hearing Assistance Support Point",
            "location": "Central Plaza",
            "wheelchair_accessible": True,
            "elevator_access": True,
            "assistance_point": "Guest Services Desk",
            "description": (
                "Demo assistance point for fans requesting "
                "hearing accessibility support."
            ),
        },
        "reduced_mobility": {
            "name": "Reduced Mobility Assistance Point",
            "location": "Central Plaza",
            "wheelchair_accessible": True,
            "elevator_access": True,
            "assistance_point": "Accessibility Help Desk",
            "description": (
                "Assistance for elderly fans and visitors "
                "with reduced mobility."
            ),
        },
    }
}