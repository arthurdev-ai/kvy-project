import { createActionGroup, props } from "@ngrx/store";
// Importe le model "Recette"
import { Recette } from "./auth.model";

export const RecetteActions = createActionGroup({
    source: "recettes",
    events: {
        'add recette': props<{ data: Recette }>(),
        'update recette': props<{ recetteId: string, data: Recette }>(),
        'delete recette': props<{ recetteId: string }>(),
        'get recette': props<{ recetteId: string }>(),
        'get recettes': props<{ recettes: ReadonlyArray<Recette> }>(),
    }
})

