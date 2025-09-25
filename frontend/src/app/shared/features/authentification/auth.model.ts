export type Recette = {
    id?: string;
    title: string;
    status: "ONLINE" | "OFFLINE";
    countryId: string;
    // country           Country        
    // category          Category         
    plates: RecettePlate[]
    thumbail: string;
    categoryId: string;
    created_at: string;
    updated_at: string;
    // RecetteIngredient RecetteIngredient[]
    // Image             Image[]
    // Favorite          Favorite[]
}

export type RecettePlate = {
    id: string;
    timer: string;
    status: RecettePlateType;
    recetteId: string;
}

export type RecettePlateType =
    "ONE_PLATE" |
    "TWO_PLATES" |
    "FOUR_PLATES";

