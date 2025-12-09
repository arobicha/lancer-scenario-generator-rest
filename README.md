# Lancer RPG: Basic Mission/Scenario Generator REST API

This is a REST API that generates random scenarios for missions in the [_Lancer_ tabletop RPG](https://twitter.com/Lancer_RPG) by Tom Parkinson Morgan and Miguel Lopez.

## REST API Usage

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```

The server will start on port 3000 by default (or the PORT environment variable if set).

### API Endpoints

#### `GET /`
Returns information about available endpoints.

**Example:**
```bash
curl http://localhost:3000/
```

#### `GET /api/scenario`
Generates and returns a random scenario as JSON.

**Example:**
```bash
curl http://localhost:3000/api/scenario
```

**Response Format:**
```json
{
  "world": {
    "type": "A temperate world...",
    "naturalFeature": "...",
    "naturalFeatureHazard": null,
    "anthropocentricFeature": "..."
  },
  "mission": {
    "source": "...",
    "hook": "...",
    "location": "...",
    "locationHazard": null,
    "complication": "...",
    "sitrep": "..."
  },
  "npcForces": [
    {
      "faction": "...",
      "orientation": "...",
      "signature": "...",
      "force": "..."
    }
  ],
  "notableNPCs": [
    {
      "name": "...",
      "mechName": "...",
      "mechClass": "...",
      "template": "...",
      "modules": [],
      "tier": 1
    }
  ]
}
```

## Static Web Version

View randomized scenarios from the core book at http://brocktopus.github.io/lancer-scenario-generator/

View randomized space station-related info from the _Long Rim_ supplement at http://brocktopus.github.io/lancer-scenario-generator/long-rim.html

In the near future, I hope to improve the granularity and variety of randomized elements so as to produce a much wider, and hopefully more interesting, range of potential missions/scenarios.


## Other (and Better) Community Resources

While this is a pretty simple project, there are some awesome initiatives out there providing players and GMs with useful resources to play the game. These include:

* [_Lancer_ Community Edition](https://github.com/AshleyMoni/Lancer-Community-Edition)
* [_Lancer_ Wiki](http://lancer.wiki)
* [Comp/Con](https://beeftime.itch.io/compcon)
* [_Lancer_ Encounter Designer](https://github.com/aritsune/lancer-encounter-designer)


## Credits / Acknowledgments

The vast majority of material used for this page comes directly from the _Lancer_ rulebook. However, some of the randomly generated fields are populated with content taken from other name- and plot- generator sites.

NPC name lists seeded by:

* The amazing lists used at [Eigengrau's Generator](http://eigengrausgenerator.com/), the files for which are available at https://github.com/ryceg/Eigengrau-s-Essential-Establishment-Generator
* Kerbal name generator by Jacob Swanson at https://github.com/jacob-swanson/kerbonaut-naming
* Sci-fi planet name generator by Hakan Bilgin at https://github.com/hbi99/namegen

NPC mecha name lists seeded by lists for:

* Heroku app-style name generator by Akash K at https://github.com/aceakash/project-name-generator/
* Random name generator by Ben Weaver at https://github.com/weaver/moniker
* Codename generator by R.J. Zaworski at https://github.com/rjz/codename/
* Heavy metal band name generator by Rich Trott at https://github.com/Trott/metal-name
