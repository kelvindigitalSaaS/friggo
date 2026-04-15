import { allRecipes } from "../src/data/recipeDatabase";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function consolidate() {
  console.log(`Starting consolidation of ${allRecipes.length} recipes...`);
  
  // Ensure we have emojis for all (simple heuristic for bulk items)
  const processed = allRecipes.map(r => {
    if (!r.emoji || r.emoji === "🥣") {
      // Try to assign a better emoji based on category
      const cat = (r.category || "Outras").toLowerCase();
      if (cat.includes("carne")) r.emoji = "🥩";
      else if (cat.includes("ave") || cat.includes("frango")) r.emoji = "🍗";
      else if (cat.includes("massa")) r.emoji = "🍝";
      else if (cat.includes("peixe") || cat.includes("mar")) r.emoji = "🐟";
      else if (cat.includes("doce") || cat.includes("bolo") || cat.includes("sobremesa")) r.emoji = "🍰";
      else if (cat.includes("bebida") || cat.includes("smoothie")) r.emoji = "🥤";
      else if (cat.includes("salada") || cat.includes("vegeta")) r.emoji = "🥗";
      else if (cat.includes("pão") || cat.includes("lanche")) r.emoji = "🥪";
      else if (cat.includes("café")) r.emoji = "☕";
      else if (cat.includes("sopa")) r.emoji = "🥣";
      else if (cat.includes("pizza")) r.emoji = "🍕";
      else if (cat.includes("fitness")) r.emoji = "💪";
      else r.emoji = "🍽️";
    }
    return r;
  });

  const outputPath = path.resolve(__dirname, "../src/data/recipes.json");
  fs.writeFileSync(outputPath, JSON.stringify(processed, null, 2));
  
  console.log(`Successfully saved ${processed.length} recipes to ${outputPath}`);
}

consolidate().catch(console.error);
