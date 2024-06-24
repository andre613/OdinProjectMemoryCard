export enum Difficulty {
  Easy,
  Normal,
  Difficult,
  Pro
}

interface GameSettings {
  difficulty: Difficulty,
}

export default GameSettings;