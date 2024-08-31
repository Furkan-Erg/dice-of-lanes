import { PunModel } from "./punModel";

export interface GameMapModel {
  lanes: {
    top: { id: number; contains: PunModel[]; isSelectable?: boolean }[];
    mid: { id: number; contains: PunModel[]; isSelectable?: boolean }[];
    bot: { id: number; contains: PunModel[]; isSelectable?: boolean }[];
  };
}
