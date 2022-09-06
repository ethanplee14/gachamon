// src/server/router/index.ts
import {createRouter} from "./context";
import superjson from "superjson";
import {pokemonRouter} from "./pokemon";
import {gachamonRouter} from "./gachamon";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("gachamon.", gachamonRouter)
  .merge("pokemon.", pokemonRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
