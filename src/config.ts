export default {
  commands: ["/next", "/opendoor"],
  events: ["message", "reaction_added"],
  // actions: ["confirm-team-name-1", "confirm-team-name-2"],
  actions: [1, 2, 3, 4].map((i) => `confirm-team-name-${i}`),
  admin: ["UEJL2RADT", "U013B6CPV62"],
};
