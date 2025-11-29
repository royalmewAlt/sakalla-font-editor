import { z } from "zod";

export const fontSchema = z.object({
  name: z.string(),
  family: z.string(),
  category: z.enum(["serif", "sans-serif", "monospace", "display", "3d"]),
});

export type Font = z.infer<typeof fontSchema>;

export const fonts: Font[] = [
  // Serif fonts
  { name: "Playfair Display", family: "'Playfair Display', serif", category: "serif" },
  { name: "Merriweather", family: "'Merriweather', serif", category: "serif" },
  { name: "Lora", family: "'Lora', serif", category: "serif" },
  { name: "Libre Baskerville", family: "'Libre Baskerville', serif", category: "serif" },
  { name: "Source Serif 4", family: "'Source Serif 4', serif", category: "serif" },
  
  // Sans-serif fonts
  { name: "Poppins", family: "'Poppins', sans-serif", category: "sans-serif" },
  { name: "Montserrat", family: "'Montserrat', sans-serif", category: "sans-serif" },
  { name: "Open Sans", family: "'Open Sans', sans-serif", category: "sans-serif" },
  { name: "Roboto", family: "'Roboto', sans-serif", category: "sans-serif" },
  { name: "Inter", family: "'Inter', sans-serif", category: "sans-serif" },
  { name: "DM Sans", family: "'DM Sans', sans-serif", category: "sans-serif" },
  { name: "Plus Jakarta Sans", family: "'Plus Jakarta Sans', sans-serif", category: "sans-serif" },
  { name: "Space Grotesk", family: "'Space Grotesk', sans-serif", category: "sans-serif" },
  { name: "Outfit", family: "'Outfit', sans-serif", category: "sans-serif" },
  { name: "Geist", family: "'Geist', sans-serif", category: "sans-serif" },
  
  // Monospace fonts
  { name: "Space Mono", family: "'Space Mono', monospace", category: "monospace" },
  { name: "JetBrains Mono", family: "'JetBrains Mono', monospace", category: "monospace" },
  { name: "Fira Code", family: "'Fira Code', monospace", category: "monospace" },
  { name: "Roboto Mono", family: "'Roboto Mono', monospace", category: "monospace" },
  { name: "Source Code Pro", family: "'Source Code Pro', monospace", category: "monospace" },
  { name: "IBM Plex Mono", family: "'IBM Plex Mono', monospace", category: "monospace" },
  { name: "Geist Mono", family: "'Geist Mono', monospace", category: "monospace" },
  
  // Display fonts
  { name: "Architects Daughter", family: "'Architects Daughter', cursive", category: "display" },
  { name: "Oxanium", family: "'Oxanium', sans-serif", category: "display" },
  { name: "Permanent Marker", family: "'Permanent Marker', cursive", category: "display" },
  { name: "Black Ops One", family: "'Black Ops One', system-ui", category: "display" },
  { name: "Fredericka the Great", family: "'Fredericka the Great', cursive", category: "display" },
  { name: "Creepster", family: "'Creepster', system-ui", category: "display" },
  { name: "Press Start 2P", family: "'Press Start 2P', system-ui", category: "display" },
  { name: "Tourney", family: "'Tourney', system-ui", category: "display" },
  { name: "Dancing Script", family: "'Dancing Script', cursive", category: "display" },
  { name: "Alfa Slab One", family: "'Alfa Slab One', system-ui", category: "display" },
  
  // 3D & Special Effect fonts
  { name: "Bungee", family: "'Bungee', system-ui", category: "3d" },
  { name: "Bungee Shade", family: "'Bungee Shade', system-ui", category: "3d" },
  { name: "Bungee Inline", family: "'Bungee Inline', system-ui", category: "3d" },
  { name: "Bungee Outline", family: "'Bungee Outline', system-ui", category: "3d" },
  { name: "Nabla", family: "'Nabla', system-ui", category: "3d" },
  { name: "Kablammo", family: "'Kablammo', system-ui", category: "3d" },
  { name: "Rubik Moonrocks", family: "'Rubik Moonrocks', system-ui", category: "3d" },
  { name: "Rubik Wet Paint", family: "'Rubik Wet Paint', system-ui", category: "3d" },
  { name: "Stalinist One", family: "'Stalinist One', system-ui", category: "3d" },
];
