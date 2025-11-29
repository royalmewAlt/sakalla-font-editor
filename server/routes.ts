import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/fonts", async (_req, res) => {
    const fonts = await storage.getFonts();
    res.json(fonts);
  });

  app.get("/api/fonts/random", async (_req, res) => {
    const font = await storage.getRandomFont();
    res.json(font);
  });

  return httpServer;
}
