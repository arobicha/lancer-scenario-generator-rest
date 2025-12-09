# API Usage Examples

## Start the Server

```bash
npm start
```

The server will start on port 3000 (or the PORT environment variable if set).

## Example Request

```bash
curl http://localhost:3000/api/scenario
```

## Example Response

```json
{
  "world": {
    "type": "A temperate world, lush, forever hazy under a thick mist that all but blocks out the sun.",
    "naturalFeature": "Hecatoncheires - The world is marked by a series of massive mountains, sheer peaks rising kilometers into the sky.",
    "naturalFeatureHazard": null,
    "anthropocentricFeature": "Civic - Arcology. The world's population lives in one or more arcologies..."
  },
  "mission": {
    "source": "A Union Administrator in need of a team of fixers.",
    "hook": "Escort a VIP from a compromised location to a new safe one.",
    "location": "On an ocean world, landmasses covered by glaciers...",
    "locationHazard": null,
    "complication": "This mission is set up to fail, but you don't know that yet.",
    "sitrep": "Control"
  },
  "npcForces": [
    {
      "faction": "Union Regulars",
      "orientation": "Friendly toward",
      "signature": "Light infantry, with light anti-armor...",
      "force": "Squad. At least 10 to 20 soldiers, on foot."
    }
  ],
  "notableNPCs": [
    {
      "name": "John Smith",
      "mechName": "Iron Wolf",
      "mechClass": "Ace",
      "template": "Veteran",
      "modules": ["NHP Co-Pilot", "Acrobat"],
      "tier": 2
    }
  ]
}
```

## Integration Example (Node.js)

```javascript
const fetch = require('node-fetch');

async function getScenario() {
  const response = await fetch('http://localhost:3000/api/scenario');
  const scenario = await response.json();
  console.log('Mission Hook:', scenario.mission.hook);
  console.log('World Type:', scenario.world.type);
}

getScenario();
```

## Integration Example (Python)

```python
import requests

response = requests.get('http://localhost:3000/api/scenario')
scenario = response.json()

print(f"Mission Hook: {scenario['mission']['hook']}")
print(f"World Type: {scenario['world']['type']}")
```
