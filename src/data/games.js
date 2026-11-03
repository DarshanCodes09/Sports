// List of all games available in the STRIVORA Sports Arena
export const games = [
  {
    id: 1,
    name: "Sports Quiz",
    description: "Test your knowledge of different sports around the world.",
    instructions: "Answer multiple-choice questions before the timer runs out to earn points.",
    buttonText: "Play Quiz",
    route: "/arena/quiz"
  },
  {
    id: 2,
    name: "Flag Challenge",
    description: "Identify national flags of famous sporting countries.",
    instructions: "Look at the country flag and pick the correct sporting nation.",
    buttonText: "Start Challenge",
    route: "/arena/flag-challenge"
  },
  {
    id: 3,
    name: "Guess the Player",
    description: "Identify famous sports personalities using clue cards.",
    instructions: "Read clues about nationality, club, and achievements to guess the player.",
    buttonText: "Guess Player",
    route: "/arena/guess-player"
  },
  {
    id: 4,
    name: "Stats Challenge",
    description: "Test your knowledge of real sports records, statistics, and milestones.",
    instructions: "Answer questions based on real-world sports records and numbers.",
    buttonText: "Take Challenge",
    route: "/arena/stats-challenge"
  }
];

export default games;
