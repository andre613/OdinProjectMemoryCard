export enum Difficulty {
  Easy,
  Normal,
  Difficult,
  Pro
}

interface GameSettings {
  difficulty: Difficulty | null,
}

export default GameSettings;