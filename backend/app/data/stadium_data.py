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


# =========================================================
# SIMULATED OPERATIONAL INCIDENT DATA
# =========================================================

STADIUM_OPERATIONS_DATA = {
    "Demo World Cup Stadium": {
        "Main Entrance": {
            "crowd": {
                "category": "crowd",
                "severity": "high",
                "situation": "High arrival flow near security screening lanes causing queue build-up.",
                "recommended_actions": [
                    "Open auxiliary screening lanes.",
                    "Deploy crowd-control stanchions.",
                    "Direct volunteers to guide fans to shorter queues.",
                ],
            },
            "medical": {
                "category": "medical",
                "severity": "high",
                "situation": "Visitor fainted in the queue outside the main gates.",
                "recommended_actions": [
                    "Dispatch nearest mobile medical responder team.",
                    "Keep entrance lane 4 clear for medical staff access.",
                    "Guide nearby fans away to maintain privacy.",
                ],
            },
            "accessibility": {
                "category": "accessibility",
                "severity": "medium",
                "situation": "Wheelchair user requests entry guidance through the priority lane.",
                "recommended_actions": [
                    "Direct visitor to designated priority entry lane 1.",
                    "Dispatch accessibility coordinator to assist with tickets.",
                    "Verify that the ramp route remains unobstructed.",
                ],
            },
            "facility": {
                "category": "facility",
                "severity": "medium",
                "situation": "Ticket scanner failure at Entrance Turnstile 3.",
                "recommended_actions": [
                    "Re-route turnstile 3 queue to adjacent turnstiles.",
                    "Dispatch technical support staff.",
                    "Monitor scanner status.",
                ],
            },
            "normal": {
                "category": "normal",
                "severity": "low",
                "situation": "No significant operational incident detected at Main Entrance.",
                "recommended_actions": [
                    "Continue routine monitoring.",
                    "Maintain normal staffing.",
                ],
            },
        },
        "Security Checkpoint": {
            "crowd": {
                "category": "crowd",
                "severity": "high",
                "situation": "Congestion building up inside the security metal detector zone.",
                "recommended_actions": [
                    "Pace the fan entry flow from Main Entrance.",
                    "Deploy additional security personnel.",
                    "Keep circulation lanes clear.",
                ],
            },
            "medical": {
                "category": "medical",
                "severity": "high",
                "situation": "Fan complaining of chest pain during security check.",
                "recommended_actions": [
                    "Call medical team dispatch immediately.",
                    "Escort visitor to a quiet seated area.",
                    "Keep metal detector lane 3 clear for responder access.",
                ],
            },
            "accessibility": {
                "category": "accessibility",
                "severity": "medium",
                "situation": "Visually impaired fan requests assistance through security screening.",
                "recommended_actions": [
                    "Assign volunteer to guide visitor through security check.",
                    "Ensure clear verbal instructions are provided for screening.",
                    "Escort to Central Plaza after screening.",
                ],
            },
            "facility": {
                "category": "facility",
                "severity": "medium",
                "situation": "X-Ray bag scanner power trip in screening zone B.",
                "recommended_actions": [
                    "Redirect bags to Zone A scanner.",
                    "Notify operations maintenance.",
                    "Re-initialize power circuit break panel.",
                ],
            },
            "normal": {
                "category": "normal",
                "severity": "low",
                "situation": "No significant operational incident detected at Security Checkpoint.",
                "recommended_actions": [
                    "Continue routine monitoring.",
                    "Maintain normal staffing.",
                ],
            },
        },
        "Central Plaza": {
            "crowd": {
                "category": "crowd",
                "severity": "medium",
                "situation": "Cross-flow congestion at the food court crossing paths.",
                "recommended_actions": [
                    "Deploy direction boards to divide flow.",
                    "Use loudspeaker announcements for crowd distribution.",
                    "Monitor plaza occupancy levels.",
                ],
            },
            "medical": {
                "category": "medical",
                "severity": "high",
                "situation": "Medical assistance requested.",
                "recommended_actions": [
                    "Dispatch nearest available medical team.",
                    "Keep access route clear.",
                    "Direct nearby staff to support crowd clearance.",
                ],
            },
            "accessibility": {
                "category": "accessibility",
                "severity": "medium",
                "situation": "Elevator to upper levels in Central Plaza requires operator key verification.",
                "recommended_actions": [
                    "Deploy lift operations coordinator.",
                    "Verify accessibility lift operates cleanly.",
                    "Guide fans to priority queue area.",
                ],
            },
            "facility": {
                "category": "facility",
                "severity": "medium",
                "situation": "Water leak reported near rest area restrooms.",
                "recommended_actions": [
                    "Place wet floor caution signs.",
                    "Dispatch maintenance team to inspect pipe leaks.",
                    "Cordon off the immediate area.",
                ],
            },
            "normal": {
                "category": "normal",
                "severity": "low",
                "situation": "No significant operational incident detected at Central Plaza.",
                "recommended_actions": [
                    "Continue routine monitoring.",
                    "Maintain normal staffing.",
                ],
            },
        },
        "North Concourse": {
            "crowd": {
                "category": "crowd",
                "severity": "critical",
                "situation": "High crowd density detected.",
                "recommended_actions": [
                    "Redirect incoming fan flow.",
                    "Deploy additional crowd-management staff.",
                    "Monitor adjacent concourses.",
                    "Temporarily restrict additional entry if required.",
                ],
            },
            "medical": {
                "category": "medical",
                "severity": "high",
                "situation": "Fan slipped and sustained minor ankle injury.",
                "recommended_actions": [
                    "Dispatch first aid team with a wheelchair.",
                    "Provide ice pack support.",
                    "Clear pedestrian path to concourse exit.",
                ],
            },
            "accessibility": {
                "category": "accessibility",
                "severity": "medium",
                "situation": "Seating map assistance request for wheelchair user.",
                "recommended_actions": [
                    "Escort visitor to designated accessible seating section 102.",
                    "Coordinate companion seating verification.",
                    "Keep wheelchair accessibility ramp clear.",
                ],
            },
            "facility": {
                "category": "facility",
                "severity": "medium",
                "situation": "Wayfinding digital display screen flickering in North Concourse.",
                "recommended_actions": [
                    "Log IT ticket for screen reset.",
                    "Check power input cable connection.",
                    "Deploy volunteer to assist with manual directions.",
                ],
            },
            "normal": {
                "category": "normal",
                "severity": "low",
                "situation": "No significant operational incident detected at North Concourse.",
                "recommended_actions": [
                    "Continue routine monitoring.",
                    "Maintain normal staffing.",
                ],
            },
        },
        "East Concourse": {
            "crowd": {
                "category": "crowd",
                "severity": "medium",
                "situation": "Moderate congestion near merchandising stores during half-time.",
                "recommended_actions": [
                    "Request store queue management support.",
                    "Direct fans to alternative concourse outlets.",
                    "Observe crowd flow changes.",
                ],
            },
            "medical": {
                "category": "medical",
                "severity": "high",
                "situation": "First aid needed for a fan experiencing severe dehydration.",
                "recommended_actions": [
                    "Dispatch nearest mobile medical responder.",
                    "Provide hydration and cooling support.",
                    "Direct nearby staff to guide responder.",
                ],
            },
            "accessibility": {
                "category": "accessibility",
                "severity": "medium",
                "situation": "Tactile paving pathway obstruction in East Concourse.",
                "recommended_actions": [
                    "Clear barricade from tactile paving pathway.",
                    "Alert concourse supervisors.",
                    "Verify clear passage for visually impaired.",
                ],
            },
            "facility": {
                "category": "facility",
                "severity": "medium",
                "situation": "Facility availability issue reported.",
                "recommended_actions": [
                    "Dispatch venue maintenance staff.",
                    "Redirect visitors to alternative verified facility.",
                    "Monitor issue status.",
                ],
            },
            "normal": {
                "category": "normal",
                "severity": "low",
                "situation": "No significant operational incident detected at East Concourse.",
                "recommended_actions": [
                    "Continue routine monitoring.",
                    "Maintain normal staffing.",
                ],
            },
        },
        "Gate A": {
            "crowd": {
                "category": "crowd",
                "severity": "high",
                "situation": "Heavy queue build-up outside Gate A entry doors.",
                "recommended_actions": [
                    "Open auxiliary gate doors for faster egress.",
                    "Deploy crowd guidance personnel.",
                    "Observe turnstile processing speeds.",
                ],
            },
            "medical": {
                "category": "medical",
                "severity": "high",
                "situation": "Fan sustained minor cut from handrail.",
                "recommended_actions": [
                    "Apply local first-aid kit dressing.",
                    "Clean the handrail area.",
                    "Dispatch basic first responder if pain worsens.",
                ],
            },
            "accessibility": {
                "category": "accessibility",
                "severity": "medium",
                "situation": "Accessibility shuttle drop-off queue assistance.",
                "recommended_actions": [
                    "Guide shuttle arrivals to priority gate entry point.",
                    "Ensure wheelchair transport access remains clear.",
                    "Assist visitor with tickets.",
                ],
            },
            "facility": {
                "category": "facility",
                "severity": "medium",
                "situation": "Gate A turnstile barrier gate fails to release automatically.",
                "recommended_actions": [
                    "Switch turnstile unit to manual release.",
                    "Deploy technician for lock actuator check.",
                    "Monitor ticket verification log.",
                ],
            },
            "normal": {
                "category": "normal",
                "severity": "low",
                "situation": "No significant operational incident detected at Gate A.",
                "recommended_actions": [
                    "Continue routine monitoring.",
                    "Maintain normal staffing.",
                ],
            },
        },
        "Gate B": {
            "crowd": {
                "category": "crowd",
                "severity": "medium",
                "situation": "Slight crowd flow pressure near Gate B corridor.",
                "recommended_actions": [
                    "Direct fans to adjacent corridor exits.",
                    "Deploy additional stadium stewards.",
                    "Monitor flow rate.",
                ],
            },
            "medical": {
                "category": "medical",
                "severity": "high",
                "situation": "Minor asthma attack reported at Gate B seating area.",
                "recommended_actions": [
                    "Dispatch first responder with oxygen support.",
                    "Keep seating aisle clear for access.",
                    "Ensure ambulance route remains clear.",
                ],
            },
            "accessibility": {
                "category": "accessibility",
                "severity": "medium",
                "situation": "Visitor requires mobility assistance.",
                "recommended_actions": [
                    "Dispatch accessibility support staff.",
                    "Use verified accessible route.",
                    "Avoid congested route where possible.",
                ],
            },
            "facility": {
                "category": "facility",
                "severity": "medium",
                "situation": "Restroom exhaust fan issue reported at Gate B public amenities.",
                "recommended_actions": [
                    "Dispatch electrical maintenance team.",
                    "Place temporary vent indicator signs.",
                    "Observe air quality status.",
                ],
            },
            "normal": {
                "category": "normal",
                "severity": "low",
                "situation": "No significant operational incident detected at Gate B.",
                "recommended_actions": [
                    "Continue routine monitoring.",
                    "Maintain normal staffing.",
                ],
            },
        },
        "Medical Center": {
            "crowd": {
                "category": "crowd",
                "severity": "medium",
                "situation": "High volume of visitors at the Medical Center reception counter.",
                "recommended_actions": [
                    "Deploy guest services helper to triage check-ins.",
                    "Establish clear queue borders.",
                    "Monitor patient wait times.",
                ],
            },
            "medical": {
                "category": "medical",
                "severity": "high",
                "situation": "Patient requires emergency transport transfer to city hospital.",
                "recommended_actions": [
                    "Coordinate ambulance route entry and parking bay clear.",
                    "Assist medical responders during patient hand-off.",
                    "Log transport details.",
                ],
            },
            "accessibility": {
                "category": "accessibility",
                "severity": "medium",
                "situation": "Wheelchair request from outpatient visitor leaving the center.",
                "recommended_actions": [
                    "Deploy guest services wheelchair helper.",
                    "Escort patient to priority shuttle station.",
                    "Verify wheelchair stock levels.",
                ],
            },
            "facility": {
                "category": "facility",
                "severity": "medium",
                "situation": "Automatic entry door failure at Medical Center main doors.",
                "recommended_actions": [
                    "Prop doors open to maintain free access.",
                    "Dispatch door technician for motor check.",
                    "Ensure clear signs are placed.",
                ],
            },
            "normal": {
                "category": "normal",
                "severity": "low",
                "situation": "No significant operational incident detected at Medical Center.",
                "recommended_actions": [
                    "Continue routine monitoring.",
                    "Maintain normal staffing.",
                ],
            },
        },
    }
}