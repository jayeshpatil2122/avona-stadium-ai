# 🏟️ Avona StadiumAI

### AI-Powered Smart Stadium Operations & Fan Experience Platform

Avona StadiumAI is a Generative AI-enabled smart stadium platform designed to enhance stadium operations and the overall tournament experience during large-scale sporting events such as the FIFA World Cup 2026.

The project was developed for **Google Virtual Prompt Wars – Challenge 4: Smart Stadiums & Tournament Operations**.

Avona StadiumAI combines AI-powered navigation, multilingual communication, contextual intelligence, and a modular stadium operations architecture to assist fans and stadium personnel through a unified digital command center.

---

## 🎯 Challenge

**Challenge 4: Smart Stadiums & Tournament Operations**

Build a Generative AI-enabled solution that enhances stadium operations and the overall tournament experience for fans, organizers, volunteers, or venue staff.

The solution should leverage Generative AI to improve areas such as:

- Stadium navigation
- Crowd management
- Accessibility
- Transportation
- Sustainability
- Multilingual assistance
- Operational intelligence
- Real-time decision support

---

## 💡 Problem Statement

Large international sporting events involve thousands of fans from different countries moving through complex stadium environments.

Fans may experience:

- Difficulty finding gates, seating areas, medical centers, or facilities
- Language barriers when receiving important stadium information
- Accessibility challenges
- Confusion during route changes or temporary gate closures
- Difficulty receiving contextual assistance quickly

At the same time, stadium personnel need intelligent systems capable of supporting operational decision-making and communicating information efficiently.

Traditional static maps and information systems cannot always provide contextual, natural-language assistance.

**Avona StadiumAI addresses this problem through a modular Generative AI-powered stadium intelligence platform.**

---

## 🚀 Solution

Avona StadiumAI provides a centralized **AI-Powered Stadium Command Center** containing specialized intelligence modules.

Instead of functioning as a generic chatbot, the system sends structured stadium context to specialized AI modules.

The AI can consider information such as:

- Selected intelligence module
- User role
- Stadium
- Current location
- Destination
- Preferred language
- User request

This enables more contextual and task-specific responses.

The current prototype includes two fully operational modules:

### 🧭 Navigation Intelligence

Provides AI-assisted stadium navigation using a verified demo route graph.

Users can:

- Select their current location
- Select a destination
- Request an intelligent route
- Receive step-by-step AI-generated navigation guidance

Example:

```text
Main Entrance
    ↓
Security Checkpoint
    ↓
Central Plaza
    ↓
North Concourse
    ↓
Gate A
```

The system combines predefined demo stadium routing information with Generative AI to produce clear and user-friendly guidance.

The interface also communicates the availability of accessible routes and encourages users to follow official venue signage and staff instructions.

---

### 🌐 Multilingual Assistant

Provides AI-powered multilingual communication for international stadium visitors.

Users can:

- Enter a stadium-related message
- Select a target language
- Receive an AI-generated translation

Example:

```text
Input:
Gate A is temporarily closed. Please proceed to Gate B.

Target Language:
Hindi

Output:
गेट ए अस्थायी रूप से बंद है। कृपया गेट बी की ओर जाएं।
```

The module can help communicate information such as:

- Gate changes
- Navigation instructions
- Medical assistance information
- Accessibility guidance
- General stadium announcements

This demonstrates how Generative AI can help reduce language barriers during international tournaments.

---

## 🧠 How Generative AI Is Used

Avona StadiumAI uses a provider-independent AI architecture.

The current implementation uses **Groq-hosted LLM inference**, while the backend architecture separates the application logic from the LLM provider.

The request flow is:

```text
User
  ↓
React Frontend
  ↓
Structured Context
  ↓
FastAPI Backend
  ↓
AI Service
  ↓
Intelligence Module
  ↓
Prompt Construction
  ↓
LLM Provider Layer
  ↓
Groq
  ↓
Generated Response
  ↓
Frontend Intelligence Panel
```

The AI does not receive only a generic user message.

The backend can provide contextual information including:

```text
Module
User Role
Language
Stadium
Current Location
Destination
User Prompt
```

Specialized prompts and modules then guide the model toward the required stadium task.

This architecture makes the application modular and allows additional intelligence capabilities to be added without redesigning the entire system.

---

## 🏗️ Architecture

```text
                    AVONA STADIUMAI

                         User
                           │
                           ▼
                 React + TypeScript
                    Vite Frontend
                           │
                           ▼
                    REST API Request
                           │
                           ▼
                     FastAPI Backend
                           │
                           ▼
                       AI Service
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
        Navigation Module    Multilingual Module
                 │                   │
                 └─────────┬─────────┘
                           ▼
                    Prompt Layer
                           │
                           ▼
                  Provider Factory
                           │
                           ▼
                    Groq Provider
                           │
                           ▼
                         LLM
                           │
                           ▼
                 Contextual AI Output
```

---

## 🛠️ Technologies Used

### Frontend

- React
- TypeScript
- Vite
- CSS
- Responsive UI architecture

### Backend

- Python
- FastAPI
- Uvicorn
- Pydantic

### Generative AI

- Groq API
- LLM-based response generation
- Specialized AI prompts
- Provider-independent LLM architecture

### Deployment

- Vercel — Frontend deployment
- Railway — FastAPI backend deployment

### Development & Version Control

- Git
- GitHub
- Visual Studio Code

---

## 📁 Project Structure

```text
avona-stadium-ai/
│
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   │   ├── multilingual.py
│   │   │   ├── navigation.py
│   │   │   └── router.py
│   │   │
│   │   ├── api/
│   │   │   └── routes/
│   │   │       └── ai.py
│   │   │
│   │   ├── core/
│   │   │   └── config.py
│   │   │
│   │   ├── data/
│   │   │   └── stadium_data.py
│   │   │
│   │   ├── prompts/
│   │   │   ├── multilingual.py
│   │   │   └── navigation.py
│   │   │
│   │   ├── schemas/
│   │   │   └── ai.py
│   │   │
│   │   ├── services/
│   │   │   ├── llm/
│   │   │   │   ├── base_provider.py
│   │   │   │   ├── groq_provider.py
│   │   │   │   └── provider_factory.py
│   │   │   ├── ai_service.py
│   │   │   └── navigation_service.py
│   │   │
│   │   └── main.py
│   │
│   ├── .env.example
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── types/
│   │
│   └── package.json
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🔄 How the System Works

### Navigation Request

A fan selects:

```text
Current Location: Main Entrance
Destination: Gate A
```

The frontend sends structured context to:

```text
POST /api/ai/generate
```

Example request:

```json
{
  "module": "navigation",
  "user_role": "fan",
  "language": "English",
  "stadium": "Demo World Cup Stadium",
  "location": "Main Entrance",
  "destination": "Gate A",
  "prompt": "Give me directions to Gate A."
}
```

The Navigation Intelligence module validates and processes the route context.

The AI then generates clear natural-language guidance based on the available demo stadium route information.

---

### Multilingual Request

A user enters a stadium message and selects a target language.

Example:

```json
{
  "module": "multilingual",
  "user_role": "fan",
  "language": "Spanish",
  "stadium": "Demo World Cup Stadium",
  "location": "Main Entrance",
  "destination": "Medical Center",
  "prompt": "Where is the nearest medical center?"
}
```

The Multilingual Intelligence module instructs the LLM to return the requested translation.

---

## 🔐 Security

The project follows basic security practices suitable for the prototype:

- API keys are stored using environment variables
- `.env` files are excluded from Git
- `.env.example` is provided for configuration guidance
- Secrets are not stored in the public repository
- Backend and frontend are deployed separately
- CORS restricts browser access to approved frontend origins
- Unsupported intelligence modules are rejected by the backend

Production deployments should implement additional security controls such as authentication, authorization, rate limiting, monitoring, and stronger request validation.

---

## ⚡ Efficiency

The architecture is designed to avoid unnecessary AI requests.

Only the selected intelligence module processes the user's request.

For example:

```text
Navigation selected
        ↓
Only Navigation Intelligence runs
        ↓
One relevant LLM request
```

This modular approach reduces unnecessary model calls and makes future optimization easier.

The application also uses a provider abstraction layer, allowing the underlying LLM provider to be changed without rewriting the core application architecture.

---

## ♿ Accessibility

The interface is designed with accessibility considerations including:

- Semantic interface structure
- Responsive layouts
- Clear visual hierarchy
- Readable typography
- High-contrast interface elements
- Keyboard-friendly native controls
- Clearly labeled form elements

The Navigation Intelligence experience also communicates the availability of accessible route assistance.

Further accessibility improvements are included in the future roadmap.

---

## 🧪 API Testing

FastAPI provides interactive API documentation through Swagger UI.

After running the backend locally, visit:

```text
http://127.0.0.1:8000/docs
```

The main AI endpoint can be tested directly:

```text
POST /api/ai/generate
```

The API handles supported intelligence modules and rejects unsupported module requests.

Example unsupported module:

```json
{
  "module": "random",
  "user_role": "fan",
  "language": "English",
  "stadium": "Demo World Cup Stadium",
  "location": "Main Entrance",
  "destination": "Gate A",
  "prompt": "Help me"
}
```

The backend returns an error instead of processing an unsupported intelligence module.

---

## 💻 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/jayeshpatil2122/avona-stadium-ai
cd avona-stadium-ai
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file based on:

```text
.env.example
```

Configure the required environment variables:

```env
APP_NAME=Avona StadiumAI
APP_VERSION=1.0.0
LLM_PROVIDER=groq
GROQ_API_KEY=your_groq_api_key
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will provide the local frontend URL.

---

## 🚀 Deployment

### Backend

The FastAPI backend is deployed using Railway.

Required environment variables are configured securely through the deployment platform.

The production server uses Uvicorn to run the FastAPI application.

### Frontend

The React + Vite frontend is deployed using Vercel.

The frontend uses:

```env
VITE_API_URL=<backend-production-url>
```

to communicate with the deployed FastAPI backend.

The production frontend origin must also be included in the backend CORS configuration.

---

## 📊 Current Intelligence Modules

| Module | Status | Purpose |
|---|---|---|
| Navigation Intelligence | ✅ Operational | Context-aware stadium route guidance |
| Multilingual Assistant | ✅ Operational | AI-powered multilingual communication |
| Crowd Intelligence | 🚧 Planned | Crowd condition insights and recommendations |
| Operations Intelligence | 🚧 Planned | AI-assisted operational decision support |
| Accessibility Intelligence | 🚧 Planned | Personalized accessibility assistance |

The interface intentionally distinguishes operational modules from planned capabilities.

---

## ⚠️ Assumptions

This project is a functional hackathon prototype and is not connected to official FIFA or stadium infrastructure.

The following assumptions are made:

- Stadium route information uses a simulated demo stadium
- The route graph is demonstration data
- Crowd and operational intelligence modules shown as planned are not presented as live systems
- AI responses should complement, not replace, official venue instructions
- Users should follow official stadium signage and staff guidance
- Emergency situations should always follow instructions from authorized venue personnel

---

## 🔮 Future Scope

Avona StadiumAI is designed as a modular platform that can be expanded with additional intelligence modules.

Future capabilities may include:

- Real-time crowd density intelligence
- AI-powered crowd redirection recommendations
- Operational command center insights
- Personalized accessibility routing
- Wheelchair-friendly route recommendations
- Real-time transportation assistance
- Sustainable transportation recommendations
- Emergency communication assistance
- Volunteer and venue staff copilots
- Live stadium data integrations
- Event and match scheduling integrations
- Real-time alerts
- Additional language support
- Voice-based multilingual assistance

With access to authorized real-world stadium systems, the architecture could integrate live operational data while maintaining clear separation between verified data and AI-generated recommendations.

---

## 🌍 Impact

Avona StadiumAI demonstrates how Generative AI can move beyond a traditional chatbot and become part of a broader stadium intelligence platform.

By combining:

**Navigation Intelligence + Multilingual Assistance + Context-Aware AI + Modular Architecture**

the project aims to create a safer, more accessible, and more intuitive stadium experience for international sporting events.

---

## 🏆 Built For

**Google Virtual Prompt Wars**

**Challenge 4 — Smart Stadiums & Tournament Operations**

Focused on demonstrating practical and meaningful applications of Generative AI for next-generation stadium experiences.

---

## 📜 License

This project is provided under the license included in the repository.