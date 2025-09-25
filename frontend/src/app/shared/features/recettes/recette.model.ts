export type Recette = {
  id?: string;
  title: string;
  description: string;
  status: string;
  countryId: string;
  countryName: string;
  thumbail: string;
  categoryId: string;
  categoryName: string;
  created_at: Date | null;
  updated_at: Date | null;
  steps: {
    step: number;
    id: string;
    blocs: {
      content: string;
      id: string;
      type: string;
    }[];
  }[];
  ingredients: {
    name: string;
    thumbail: string;
    id: string;
  }[];
  plates: {
    id: string;
    timer: string;
    status: string;
    content: string;
  }[];
};

export type RecettePlate = {
  id: string;
  timer: string;
  status: RecettePlateType;
  recetteId: string;
};

export type RecettePlateType = 'ONE_PLATE' | 'TWO_PLATES' | 'FOUR_PLATES';
