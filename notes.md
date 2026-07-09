src/ai/prompt.js

Contains the system prompt that tells Gemini how to behave.

Example:

You are an Aircraft MRO Inventory Assistant.

Never generate SQL.

Return JSON only.

Available intents:
- PART_SEARCH
- LOW_STOCK
- MANUFACTURER_SEARCH
...

It contains no JavaScript logic, only the prompt text.

src/ai/intentExtractor.js

This is the only file that talks to Gemini.

Example flow:

User

↓

"Show Honeywell hydraulic pumps"

↓

Gemini API

↓

{
  intent: "PART_SEARCH",
  manufacturer: "Honeywell Aerospace",
  keyword: "hydraulic pump"
}

Its only responsibility is extracting structured intent.

src/ai/responseFormatter.js

After Prisma returns raw records, this file turns them into a clean AI response.

Instead of:

[
  {
    "partNumber":"ATA21-001"
  }
]

it formats something like:

Found 14 Honeywell hydraulic pump components.

Compatible Aircraft:
• Boeing 737-800
• Airbus A320

Available Inventory:
58 Units
src/services/ai.service.js

This is the brain.

It orchestrates everything:

User Question

↓

intentExtractor

↓

Inventory Service

↓

Database

↓

responseFormatter

↓

Final Answer

This file decides which inventory function to call based on the detected intent.

src/controllers/ai.controller.js

Very small file.

Just receives:

POST /api/ai/chat

Calls

ai.service

Returns JSON.

src/routes/ai.routes.js

Defines endpoints like:

POST /api/ai/chat

POST /api/ai/explain

POST /api/ai/suggest

For now, we'll implement only /api/ai/chat.

Final Architecture
User

↓

POST /api/ai/chat

↓

AI Controller

↓

AI Service

↓

Intent Extractor (Gemini)

↓

Inventory Service

↓

Prisma

↓

Supabase

↓

Response Formatter

↓

User