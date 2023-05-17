import { TPick } from "."

export interface IGAME {
  pickGameSelection: (pick: TPick) => void
  exitGame: () => void
  playAgain: () => void
}