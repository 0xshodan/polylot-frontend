import { Tables } from "@/database.types";

type CardEntity = Tables<"cards">;
type StackEntity = Tables<"stacks">;

export type { CardEntity, StackEntity };
