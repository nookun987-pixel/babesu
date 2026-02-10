
export enum AppTab {
  OVERVIEW = 'overview',
  BIBLE = 'bible',
  IMAGE_FORGE = 'image-forge', // Lò Rèn Ma Trận
  LIBRARY = 'library',        // Lò Rèn Mở Rộng
  CHARACTER_STUDIO = 'character-studio',
  VEO_STUDIO = 'veo-studio',
  TRAILER_ARCHITECT = 'trailer-architect',
  STRATEGY = 'strategy',
  ENGINE = 'engine'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// Fix: Restrict AspectRatio to only supported values by the Gemini API (1:1, 3:4, 4:3, 9:16, 16:9)
export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

/**
 * Interface representing the structure of the project's asset library.
 * This resolves the import error in constants.tsx.
 */
export interface LibraryData {
  poses: Record<string, string>;
  backgrounds: Record<string, string>;
  weapons: Record<string, string>;
  outfits: Record<string, string>;
}
