import { NumberSymbol } from "@angular/common"

export interface Player {
    id: number,
    name: string,
    surname: string,
    age: number,
    positions: Position[],
    uuid?: string
}
export interface Position {
    id: number,
    name: "firstBase" | "secondBase" | "thirdBase" | "pitcher" | "catcher" | "shortstop" | "leftField" | "centerField" | "rightField" | "designatedHitter"
}

