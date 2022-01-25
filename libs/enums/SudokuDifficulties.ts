export enum SudokuDifficulties {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  ULTRA_HARD = 'ultra-hard'
}

export function isValidSudokuDifficulty(difficulty: string): boolean {
  switch (difficulty) {
    case 'easy':
    case 'medium':
    case 'hard':
    case 'ultra-hard':
      return true;
    default:
      return false;
  }
}

export function getValidDifficulties(): string[] {
  return ['easy', 'medium', 'hard', 'ultra-hard'];
}
