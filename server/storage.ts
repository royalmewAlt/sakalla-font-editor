import { fonts, type Font } from "@shared/schema";

export interface IStorage {
  getFonts(): Promise<Font[]>;
  getRandomFont(): Promise<Font>;
}

export class MemStorage implements IStorage {
  async getFonts(): Promise<Font[]> {
    return fonts;
  }

  async getRandomFont(): Promise<Font> {
    return fonts[Math.floor(Math.random() * fonts.length)];
  }
}

export const storage = new MemStorage();
