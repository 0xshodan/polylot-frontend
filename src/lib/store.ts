import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Database } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CardEntity, StackEntity } from "@/app/entities.types";
import { PostgrestError } from "@supabase/supabase-js";

interface CardsState {
  cards: CardEntity[];
  isLoading: boolean;
  error: PostgrestError | null;
  fetchMany: (stackId: string) => Promise<void>;
}

const useCardsStore = create<CardsState>((set) => ({
  cards: [],
  isLoading: true,
  error: null,
  fetchMany: async (stackId: string) => {
    let cards: CardEntity[] = [];
    const supabase = createClientComponentClient<Database>();
    const result = await supabase
      .from("cards")
      .select()
      .eq("stack_id", stackId);
    if (result.data) {
      cards = result.data;
    }
    set({
      cards: cards,
      error: result.error,
    });
  },
}));
interface StacksState {
  stacks: StackEntity[];
  isLoading: boolean;
  error: PostgrestError | null;
  fetchMany: (limit: number, personal: boolean) => Promise<void>;
  fetchOne: (id: string | number) => Promise<StackEntity | null>;
  getById: (id: number) => StackEntity | null;
}

const useStacksStore = create<StacksState>((set, get) => ({
  stacks: [],
  isLoading: true,
  error: null,
  fetchMany: async (limit: number = 20, personal: boolean = false) => {
    let data: StackEntity[] | null = null;
    let error: PostgrestError | null = null;
    const supabase = createClientComponentClient<Database>();
    const q = supabase.from("stacks").select().limit(limit);
    if (personal) {
      const res = await q.eq("user_id", "");
      data = res.data;
      error = res.error;
    } else {
      const res = await q;
      data = res.data;
      error = res.error;
    }
    if (!data) {
      data = [];
    }
    set({
      stacks: data,
      error: error,
    });
  },
  fetchOne: async (id: string | number) => {
    const supabase = createClientComponentClient<Database>();
    let { data, error } = await supabase
      .from("stacks")
      .select()
      .limit(1)
      .eq("id", id)
      .single();
    if (data !== null) {
      const stack = { ...data };
      set((state) => ({
        stacks: [...state.stacks, stack],
        error: error,
      }));
    }

    return data;
  },
  getById: (id: number) => {
    const state = get();
    for (let i = 0; i < state.stacks.length; i++) {
      if (state.stacks[i].id == id) {
        return state.stacks[i];
      }
    }
    let val = null;
    get()
      .fetchOne(id)
      .then((data) => (val = data));
    return val;
  },
}));
export { useCardsStore, useStacksStore };
