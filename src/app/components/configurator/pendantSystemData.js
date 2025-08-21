// Bar system base IDs
export const barBaseIds = [
  "prism", "helix", "orbit", "zenith", "pulse", "vortex", "nexus", "quasar", "nova"
];

// Universal system base IDs
export const universalBaseIds = [
  "atom", "nebula", "cosmos", "stellar", "eclipse", "aurora", "solstice", "quantum", "vertex", "horizon",
  "zoneith", "equinox", "meridian", "polaris", "pulsar", "quasar", "supernova", "galaxy", "comet", "meteor",
  "asteroid", "celestial", "orbital", "lunar", "solar", "nova", "photon", "gravity", "spectrum", "infinity"
];

// Ball system base IDs
export const ballBaseIds = [
  "solari", "lumina",
 ];

// Pendant types
export const pendantTypes = [
  "bumble", "fina", "ico", "pico", "radial"
];

// Unified array for all systems and pendants, statically defined
export const systemAssignments = [
  // Bar systems
  { id: 0,baseNumber: 1, systemType: "bar", name: "Prism", design: "prism", message: "system_base_1", isSystem: true,image: "/images/configOptions/bar/1.png" },
  { id: 1,baseNumber: 2, systemType: "bar", name: "Helix", design: "helix", message: "system_base_2", isSystem: true,image: "/images/configOptions/bar/2.png" },
  { id: 2,baseNumber: 3, systemType: "bar", name: "Orbit", design: "orbit", message: "system_base_3", isSystem: true,image: "/images/configOptions/bar/3.png" },
  { id: 3,baseNumber: 4, systemType: "bar", name: "Zenith", design: "zenith", message: "system_base_4", isSystem: true,image: "/images/configOptions/bar/4.jpg" },
  { id: 4,baseNumber: 5, systemType: "bar", name: "Pulse", design: "pulse", message: "system_base_5", isSystem: true,image: "/images/configOptions/bar/5.jpg" },
  { id: 5,baseNumber: 6, systemType: "bar", name: "Vortex", design: "vortex", message: "system_base_6", isSystem: true,image: "/images/configOptions/bar/6.jpg" },
  { id: 6,baseNumber: 7, systemType: "bar", name: "Nexus", design: "nexus", message: "system_base_7", isSystem: true,image: "/images/configOptions/bar/7.jpg" },
  { id: 7,baseNumber: 8, systemType: "bar", name: "Quasar", design: "quasar", message: "system_base_8", isSystem: true,image: "/images/configOptions/bar/8.jpg" },
  { id: 8,baseNumber: 9, systemType: "bar", name: "Nova", design: "nova", message: "system_base_9", isSystem: true,image: "/images/configOptions/bar/9.jpg" },

  // Universal systems
  { id: 9,baseNumber: 1, systemType: "universal", name: "Atom", design: "atom", message: "system_base_1", isSystem: true,image: "/images/configOptions/universal/1.png" },
  { id: 10,baseNumber: 2, systemType: "universal", name: "Nebula", design: "nebula", message: "system_base_2", isSystem: true,image: "/images/configOptions/universal/2.png" },
  { id: 11,baseNumber: 3, systemType: "universal", name: "Cosmos", design: "cosmos", message: "system_base_3", isSystem: true,image: "/images/configOptions/universal/3.png" },
  { id: 12,baseNumber: 4, systemType: "universal", name: "Stellar", design: "stellar", message: "system_base_4", isSystem: true,image: "/images/configOptions/universal/4.png" },
  { id: 13,baseNumber: 5, systemType: "universal", name: "Eclipse", design: "eclipse", message: "system_base_5", isSystem: true,image: "/images/configOptions/universal/5.png" },
  { id: 14,baseNumber: 6, systemType: "universal", name: "Aurora", design: "aurora", message: "system_base_6", isSystem: true,image: "/images/configOptions/universal/6.png" },
  { id: 15,baseNumber: 7, systemType: "universal", name: "Solstice", design: "solstice", message: "system_base_7", isSystem: true,image: "/images/configOptions/universal/7.png" },
  { id: 16,baseNumber: 8, systemType: "universal", name: "Quantum", design: "quantum", message: "system_base_8", isSystem: true,image: "/images/configOptions/universal/8.png" },
  { id: 17,baseNumber: 9, systemType: "universal", name: "Vertex", design: "vertex", message: "system_base_9", isSystem: true,image: "/images/configOptions/universal/9.png" },
  { id: 18,baseNumber: 10, systemType: "universal", name: "Horizon", design: "horizon", message: "system_base_10", isSystem: true,image: "/images/configOptions/universal/10.png" },
  { id: 19,baseNumber: 11, systemType: "universal", name: "Zoneith", design: "zoneith", message: "system_base_11", isSystem: true,image: "/images/configOptions/universal/11.png" },
  { id: 20,baseNumber: 12, systemType: "universal", name: "Equinox", design: "equinox", message: "system_base_12", isSystem: true,image: "/images/configOptions/universal/12.png" },
  { id: 21,baseNumber: 13, systemType: "universal", name: "Meridian", design: "meridian", message: "system_base_13", isSystem: true,image: "/images/configOptions/universal/13.png" },
  { id: 22,baseNumber: 14, systemType: "universal", name: "Polaris", design: "polaris", message: "system_base_14", isSystem: true,image: "/images/configOptions/universal/14.png" },
  { id: 23,baseNumber: 15, systemType: "universal", name: "Pulsar", design: "pulsar", message: "system_base_15", isSystem: true,image: "/images/configOptions/universal/15.png" },
  { id: 24,baseNumber: 16, systemType: "universal", name: "Quasar", design: "quasar", message: "system_base_16", isSystem: true,image: "/images/configOptions/universal/16.png" },
  { id: 25,baseNumber: 17, systemType: "universal", name: "Supernova", design: "supernova", message: "system_base_17", isSystem: true,image: "/images/configOptions/universal/17.png" },
  { id: 26,baseNumber: 18, systemType: "universal", name: "Galaxy", design: "galaxy", message: "system_base_18", isSystem: true,image: "/images/configOptions/universal/18.png" },
  { id: 27,baseNumber: 19, systemType: "universal", name: "Comet", design: "comet", message: "system_base_19", isSystem: true,image: "/images/configOptions/universal/19.png" },
  { id: 28,baseNumber: 20, systemType: "universal", name: "Meteor", design: "meteor", message: "system_base_20", isSystem: true,image: "/images/configOptions/universal/20.png" },
  { id: 29,baseNumber: 21, systemType: "universal", name: "Asteroid", design: "asteroid", message: "system_base_21", isSystem: true,image: "/images/configOptions/universal/21.png" },
  { id: 30,baseNumber: 22, systemType: "universal", name: "Celestial", design: "celestial", message: "system_base_22", isSystem: true,image: "/images/configOptions/universal/22.png" },
  { id: 31,baseNumber: 23, systemType: "universal", name: "Orbital", design: "orbital", message: "system_base_23", isSystem: true,image: "/images/configOptions/universal/23.png" },
  { id: 32,baseNumber: 24, systemType: "universal", name: "Lunar", design: "lunar", message: "system_base_24", isSystem: true,image: "/images/configOptions/universal/24.png" },
  { id: 33,baseNumber: 25, systemType: "universal", name: "Solar", design: "solar", message: "system_base_25", isSystem: true,image: "/images/configOptions/universal/25.png" },
  { id: 34,baseNumber: 26, systemType: "universal", name: "Nova", design: "nova", message: "system_base_26", isSystem: true,image: "/images/configOptions/universal/26.png" },
  { id: 35,baseNumber: 27, systemType: "universal", name: "Photon", design : "photon", message: "system_base_27", isSystem: true,image: "/images/configOptions/universal/27.png" },
  { id: 36,baseNumber: 28, systemType: "universal", name: "Gravity", design: "gravity", message: "system_base_28", isSystem: true,image: "/images/configOptions/universal/28.png" },
  { id: 37,baseNumber: 29, systemType: "universal", name: "Spectrum", design: "spectrum", message: "system_base_29", isSystem: true,image: "/images/configOptions/universal/29.png" },
  { id: 38,baseNumber: 30, systemType: "universal", name: "Infinity", design: "infinity", message: "system_base_30", isSystem: true,image: "/images/configOptions/universal/30.png" },
  
  // Ball systems
  { id: 39,baseNumber: 1, systemType: "ball", name: "Solari", design: "solari", message: "system_base_1", isSystem: true,image: "" },
  { id: 40,baseNumber: 2, systemType: "ball", name: "Lumina", design: "lumina", message: "system_base_2", isSystem: true,image: "" },

  // Pendants
  { id: 41,baseNumber: 1, systemType: "", name: "Bumble", design: "bumble", message: "product_1", isSystem: false,image: "/images/configOptions/1.png" },
  { id: 42,baseNumber: 2, systemType: "", name: "Radial", design: "radial", message: "product_2", isSystem: false,image: "/images/configOptions/2.png" },
  { id: 43,baseNumber: 3, systemType: "",name: "Fina", design: "fina", message: "product_3", isSystem: false,image: "/images/configOptions/3.png" },
  { id: 44,baseNumber: 4, systemType: "", name: "Ico", design: "ico", message: "product_4", isSystem: false,image: "/images/configOptions/4.png" },
  { id: 45,baseNumber: 5, systemType: "", name: "Piko", design: "piko", message: "product_5", isSystem: false,image: "/images/configOptions/5.png" }
];

// All pendants (isSystem: false)
export const pendantAssignments = systemAssignments.filter(a => !a.isSystem);

// All ball systems (isSystem: true, systemType: "ball")
export const ballAssignments = systemAssignments.filter(a => a.isSystem && a.systemType === "ball");

// All bar systems (isSystem: true, systemType: "bar")
export const barAssignments = systemAssignments.filter(a => a.isSystem && a.systemType === "bar");

// All universal systems (isSystem: true, systemType: "universal")
export const universalAssignments = systemAssignments.filter(a => a.isSystem && a.systemType === "universal");