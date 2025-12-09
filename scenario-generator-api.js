// Import all data lists
const { world_type } = require('./js/core/list-world-types.js');
const { natural_feature } = require('./js/core/list-natural-features.js');
const { anthropocentric_feature } = require('./js/core/list-anthropocentric-features.js');
const { hazardous_environment } = require('./js/core/list-hazardous-environments.js');
const { mission_source } = require('./js/core/list-mission-sources.js');
const { mission_hook, mission_sitrep } = require('./js/core/list-mission-hooks.js');
const { mission_location } = require('./js/core/list-mission-locations.js');
const { mission_complication } = require('./js/core/list-mission-complications.js');
const { npc_faction, npc_friendly } = require('./js/core/list-npc-factions.js');
const { npc_signature } = require('./js/core/list-npc-signatures.js');
const { npc_force } = require('./js/core/list-npc-forces.js');
const { 
  person_class, 
  person_modules, 
  person_template,
  person_template_ultra,
  person_template_veteran,
  person_template_exotic,
  person_template_mercenary,
  person_template_commander,
  person_template_pirate,
  person_template_spacer,
  person_tier,
  person_name_first,
  person_name_last,
  person_name_prefix,
  person_name_suffix
} = require('./js/core/list-persons.js');
const {
  mech_name_adj,
  mech_name_noun,
  mech_name_animal,
  mech_name_verb
} = require('./js/core/list-npc-mechs.js');
const { world_name_gen } = require('./js/core/world-name-gen.js');

// Pull a random element from the input list Array.
function randomize(my_list, lcase) {
  const randNumber = Math.floor(Math.random() * my_list.length);
  let randElement = my_list[randNumber];
  if (lcase === undefined) {
    const myElement = randElement.charAt(0).toUpperCase() + randElement.slice(1);
    randElement = myElement;
  }
  return randElement;
}

// Calculate possible hazardous environment
function getHazardousEnvironment() {
  const rand_hazard = Math.floor(Math.random() * 10);
  if (rand_hazard === 1) {
    return hazardous_environment[Math.floor(Math.random() * hazardous_environment.length)];
  }
  return null;
}

function composeNPC() {
  // Sketch out individual NPC.
  const npc_class = randomize(person_class);
  const npc_template = randomize(person_template);
  const npc_modules = person_modules[Math.floor(Math.random() * person_modules.length)];
  const npc_tier = person_tier[Math.floor(Math.random() * person_tier.length)];

  let module_list = [];

  if (npc_modules > 0) {
    const npc_module = new Array(npc_modules);
    for (let i = 0; i < npc_modules; i++) {
      switch (npc_template) {
        case "Ultra":
          npc_module[i] = randomize(person_template_ultra);
          break;
        case "Veteran":
          if (i <= npc_tier) {
            npc_module[i] = randomize(person_template_veteran);
          }
          break;
        case "Exotic":
          if (i <= npc_tier) {
            npc_module[i] = randomize(person_template_exotic);
          }
          break;
        case "Mercenary":
          npc_module[i] = randomize(person_template_mercenary);
          break;
        case "Commander":
          if (i === 0) {
            npc_module[i] = randomize(person_template_commander);
          }
          break;
        case "Pirate":
          npc_module[i] = randomize(person_template_pirate);
          break;
        case "Spacer":
          npc_module[i] = randomize(person_template_spacer);
          break;
        default:
          npc_module[i] = "Basic class module (TBA)";
          break;
      }
      if (npc_module[i]) {
        module_list.push(npc_module[i]);
      }
    }
  }

  // Name the NPC.
  let npc_name;
  const rand_name = Math.random();
  if (rand_name < 0.5) {
    const npc_first = randomize(person_name_first);
    const npc_last = randomize(person_name_last);
    npc_name = npc_first + " " + npc_last;
  } else {
    const npc_prefix = randomize(person_name_prefix);
    const npc_suffix = randomize(person_name_suffix, true);
    const world_name = world_name_gen(1);
    npc_name = npc_prefix + npc_suffix + " of " + world_name;
  }

  // Name the mech/ship used by the NPC.
  let mech_name;
  const rand_mech = Math.random();
  if (rand_mech < 0.33) {
    const rand_mech_adj = randomize(mech_name_adj);
    const rand_mech_noun = rand_mech < 0.15 
      ? randomize(mech_name_animal) 
      : randomize(mech_name_noun);
    mech_name = rand_mech_adj + " " + rand_mech_noun;
  } else if (rand_mech < 0.66) {
    const rand_mech_noun1 = rand_mech < 0.48 
      ? randomize(mech_name_animal) 
      : randomize(mech_name_noun);
    const rand_mech_noun2 = randomize(mech_name_noun);
    mech_name = rand_mech_noun1 + " of " + rand_mech_noun2;
  } else {
    const rand_mech_noun = rand_mech > 0.80 
      ? randomize(mech_name_animal) 
      : randomize(mech_name_noun);
    const rand_mech_verb = randomize(mech_name_verb);
    mech_name = rand_mech_noun + " " + rand_mech_verb;
  }

  return {
    name: npc_name,
    mechName: mech_name,
    mechClass: npc_class,
    template: npc_template,
    modules: module_list,
    tier: npc_tier
  };
}

function scenarioGenerate() {
  // Assemble world type & features.
  const world = world_type[Math.floor(Math.random() * world_type.length)];
  const nature = natural_feature[Math.floor(Math.random() * natural_feature.length)];

  // Adding possibility of no anthropocenic features on inhospitable planets. (Only happens 50% of the time.)
  let anthropocene;
  if (world.includes("inhospitable")) {
    const rand_inhospitable = Math.floor(Math.random() * 2);
    if (rand_inhospitable === 0) {
      anthropocene = "None.";
    }
  }

  if (anthropocene === undefined) {
    anthropocene = anthropocentric_feature[Math.floor(Math.random() * anthropocentric_feature.length)];
  }

  // Add possibility for hazardous environment on station world.
  const naturalFeatureHazard = getHazardousEnvironment();

  // Assemble mission parameters.
  const source = mission_source[Math.floor(Math.random() * mission_source.length)];
  const hook = mission_hook[Math.floor(Math.random() * mission_hook.length)];
  const location = mission_location[Math.floor(Math.random() * mission_location.length)];
  const complication = mission_complication[Math.floor(Math.random() * mission_complication.length)];
  const sitrep = mission_sitrep[Math.floor(Math.random() * mission_sitrep.length)];

  // Add possibility for hazardous environment on mission location world.
  const missionLocationHazard = getHazardousEnvironment();

  // Populate NPC forces (currently, max 4).
  const rand_npc = Math.floor(Math.random() * 4);
  const npcForces = [];

  if (rand_npc >= 1) {
    for (let i = 0; i < rand_npc; i++) {
      // Establish orientation of NPCs toward party.
      const is_friendly = randomize(npc_friendly);
      const faction = npc_faction[Math.floor(Math.random() * npc_faction.length)];
      const signature = randomize(npc_signature);
      const force = randomize(npc_force);

      npcForces.push({
        faction: faction,
        orientation: is_friendly,
        signature: signature,
        force: force
      });
    }
  }

  // Bring in individual NPCs of note.
  const how_many_npcs = Math.floor(Math.random() * 4) + 1;
  const npcs = [];
  for (let i = 0; i < how_many_npcs; i++) {
    npcs.push(composeNPC());
  }

  // Return the complete scenario as a JSON object
  return {
    world: {
      type: world,
      naturalFeature: nature,
      naturalFeatureHazard: naturalFeatureHazard,
      anthropocentricFeature: anthropocene
    },
    mission: {
      source: source,
      hook: hook,
      location: location,
      locationHazard: missionLocationHazard,
      complication: complication,
      sitrep: sitrep
    },
    npcForces: npcForces,
    notableNPCs: npcs
  };
}

module.exports = { scenarioGenerate };
