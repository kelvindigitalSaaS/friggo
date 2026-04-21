import { Recipe } from "@/types/kaza";

type RecipeEntry = Omit<Recipe, "id" | "usesExpiringItems">;

function gen(base: string, vars: string[], cat: string, type: Recipe["type"], baseIng: string[], inst: string[], prep: number, cook: number, srv: number, diff: Recipe["difficulty"]): RecipeEntry[] {
  return vars.map(v => ({
    name: `${base} ${v}`, emoji: "🍽️", region: "INT", estimatedCost: "low",  description: `${base} com ${v.toLowerCase()} - uma experiência gastronômica única`,
    category: cat, type, ingredients: [...baseIng, v.toLowerCase()], instructions: inst,
    prepTime: prep, cookTime: cook, servings: srv, difficulty: diff,
  }));
}

export const receitasBulk2: RecipeEntry[] = [
  // JAPONESA - 40 receitas
  ...gen("Sushi", [
    "de Salmão com Cream Cheese", "de Atum Picante", "Filadélfia Roll", "Dragon Roll",
    "Rainbow Roll", "de Camarão Empanado", "de Pele de Salmão Crocante",
    "Vegano de Abacate", "de Manga e Camarão", "Temaki de Salmão",
    "Temaki de Atum", "Temaki Skin", "Uramaki Especial", "California Roll",
    "Spicy Tuna Roll", "Niguiri de Salmão", "Niguiri de Polvo",
    "Sashimi Trio Premium", "Hot Roll de Salmão", "Gunkan de Ikura"
  ], "Japonesa", "lunch", ["arroz para sushi", "nori", "vinagre de arroz", "shoyu", "wasabi"], 
  ["Prepare o arroz de sushi", "Prepare o recheio", "Monte o sushi", "Corte e sirva com shoyu"], 30, 10, 2, "hard"),

  ...gen("Ramen", [
    "Tonkotsu Clássico", "Shoyu de Frango", "Miso com Chashu", "Tantanmen Picante",
    "de Curry Japonês", "Vegetariano de Cogumelos", "com Ovo Marinado",
    "de Mariscos", "Tsukemen", "de Kimchi", "Frio de Verão",
    "com Porco Desfiado", "de Tofu com Misô", "Black Garlic",
    "de Frutos do Mar Premium", "com Wonton", "Abura Soba",
    "de Beterraba Vegano", "Tom Yum Fusion", "de Pato"
  ], "Japonesa", "lunch", ["macarrão ramen", "caldo", "ovo", "cebolinha", "nori"],
  ["Prepare o caldo por horas", "Cozinhe o macarrão", "Prepare os toppings", "Monte a tigela", "Sirva fumegante"], 30, 180, 2, "hard"),

  // MEXICANA - 30 receitas
  ...gen("Taco", [
    "Al Pastor com Abacaxi", "de Carnitas", "de Barbacoa", "de Baja Fish",
    "de Camarão com Chipotle", "Birria", "de Carne Asada", "de Cochinita Pibil",
    "de Chorizo com Queijo", "Gobernador de Camarão", "de Lengua",
    "de Pollo con Mole", "de Nopales", "de Hongos", "Dorado de Tinga"
  ], "Mexicana", "lunch", ["tortilla de milho", "cebola", "coentro", "limão", "molho"],
  ["Prepare a proteína", "Aqueça as tortillas", "Monte os tacos", "Sirva com limão e molho"], 20, 25, 4, "medium"),

  ...gen("Receita Mexicana", [
    "Enchiladas Verdes", "Enchiladas de Mole", "Chilaquiles com Ovo",
    "Tamales de Frango", "Sopa Azteca", "Pozole Rojo",
    "Quesadilla de Huitlacoche", "Gorditas de Chicharrón",
    "Elote com Mayo e Cotija", "Churros com Cajeta",
    "Chiles en Nogada", "Mole Poblano", "Huevos Rancheros Especial",
    "Flautas de Frango", "Tostadas de Tinga de Pollo"
  ], "Mexicana", "lunch", ["pimenta", "cominho", "oregano", "tomate", "cebola"],
  ["Prepare os ingredientes", "Cozinhe com especiarias mexicanas", "Monte o prato", "Sirva com guarnições"], 20, 30, 4, "medium"),

  // INDIANA - 30 receitas
  ...gen("Curry", [
    "Tikka Masala de Frango", "Butter Chicken Premium", "Madras de Cordeiro",
    "Verde Thai de Camarão", "Rogan Josh de Carneiro", "Paneer Butter Masala",
    "de Grão-de-Bico Chana", "Dal Makhani", "Vindaloo de Porco",
    "Korma de Vegetais", "Palak Paneer", "Aloo Gobi",
    "de Peixe Malabari", "Keema de Carne Moída", "Saag de Espinafre",
    "Dhansak de Lentilha", "Jalfrezi de Frango", "Pasanda de Cordeiro",
    "de Berinjela Baingan", "Balti de Vegetais"
  ], "Indiana", "lunch", ["especiarias indianas", "cebola", "gengibre", "alho", "tomate"],
  ["Torre as especiarias", "Refogue a base", "Adicione a proteína", "Cozinhe com molho", "Sirva com arroz basmati"], 25, 35, 4, "medium"),

  ...gen("Receita Indiana", [
    "Naan com Alho e Manteiga", "Samosa de Vegetais", "Pakora de Cebola",
    "Biryani de Frango", "Biryani Hyderabadi", "Dosa com Chutney",
    "Idli com Sambar", "Vada Pav", "Pav Bhaji",
    "Raita de Pepino"
  ], "Indiana", "lunch", ["especiarias", "ghee", "coentro"],
  ["Prepare a massa ou base", "Prepare o recheio", "Cozinhe", "Sirva com condimentos"], 20, 25, 4, "medium"),

  // TAILANDESA - 25 receitas
  ...gen("Receita Thai", [
    "Pad Thai de Camarão", "Pad Thai Vegano", "Pad See Ew",
    "Som Tam de Papaya", "Tom Kha Gai", "Tom Yum Goong",
    "Khao Pad Especial", "Massaman de Frango", "Laab de Porco",
    "Mango Sticky Rice", "Pad Kra Pao com Ovo", "Satay de Frango",
    "Larb Gai", "Kao Soi de Curry", "Panaeng de Carne",
    "Spring Rolls Frescos", "Tod Man Pla", "Kai Jeow Thai",
    "Pla Rad Prik", "Gaeng Daeng", "Khao Man Gai",
    "Yam Wun Sen", "Gai Pad Med Mamuang", "Pad Pak Ruam",
    "Boat Noodle Soup"
  ], "Tailandesa", "lunch", ["molho de peixe", "pimenta thai", "coentro", "limão", "açúcar de palma"],
  ["Prepare a pasta ou molho", "Salteie em wok quente", "Adicione ingredientes", "Ajuste sabor", "Sirva com arroz jasmine"], 15, 15, 2, "medium"),

  // COREANA - 20 receitas
  ...gen("Receita Coreana", [
    "Bibimbap Clássico", "Korean Fried Chicken", "Japchae",
    "Bulgogi de Carne", "Galbi de Costela", "Kimchi Jjigae",
    "Sundubu Jjigae", "Tteokbokki", "Kimbap",
    "Jajangmyeon", "Samgyeopsal Grelhado", "Dakgalbi",
    "Haemul Pajeon", "Bossam", "Hotteok",
    "Kimchi Bokkeumbap", "Doenjang Jjigae", "Gimbap",
    "Pajeon de Cebolinha", "Japchae Premium"
  ], "Coreana", "lunch", ["gergelim", "shoyu", "gochujang", "alho", "gengibre"],
  ["Marine ou prepare a base", "Cozinhe a proteína", "Prepare banchan", "Monte o prato", "Sirva com kimchi"], 20, 20, 2, "medium"),

  // CHINESA - 20 receitas
  ...gen("Receita Chinesa", [
    "Kung Pao de Frango", "Mapo Tofu", "Char Siu BBQ",
    "Dim Sum Variado", "Wonton em Caldo", "Chow Mein Crocante",
    "Pato de Pequim", "Dan Dan Mian", "Hot Pot Sichuan",
    "Arroz Frito Yangzhou", "Ma La Xiang Guo", "Jiaozi de Porco",
    "Baozi de Carne", "Congee de Frango", "Gan Bian de Vagem",
    "Mapo Eggplant", "Fish Fragrant Pork", "Sweet and Sour Pork",
    "Siu Mai Premium", "Lo Mein de Vegetais"
  ], "Chinesa", "lunch", ["shoyu", "óleo de gergelim", "gengibre", "alho", "mirin"],
  ["Prepare o wok em fogo alto", "Salteie os aromáticos", "Adicione proteína", "Adicione molho", "Sirva imediatamente"], 15, 15, 2, "medium"),

  // MEDITERRÂNEA - 25 receitas
  ...gen("Receita Mediterrânea", [
    "Moussaka Grega", "Spanakopita", "Tzatziki com Pita",
    "Souvlaki de Frango", "Pastitsio", "Dolmades de Folha de Uva",
    "Fattoush Libanês", "Kibbeh Frito", "Shawarma de Cordeiro",
    "Baba Ghanoush", "Kafta de Cordeiro na Grelha", "Hummus Perfeito",
    "Muhammara", "Mansaf Jordaniano", "Koshari Egípcio",
    "Shakshuka Tunisiana", "Falafel Perfeito", "Labneh com Zaatar",
    "Pide Turco", "Imam Bayildi", "Menemen Turco",
    "Kofte com Molho de Iogurte", "Adana Kebab", "Iskender Kebab",
    "Baklava de Pistache"
  ], "Mediterrânea", "lunch", ["azeite", "limão", "alho", "ervas mediterrâneas"],
  ["Prepare os ingredientes", "Cozinhe com azeite e ervas", "Monte o prato", "Sirva com pão e molhos"], 20, 30, 4, "medium"),

  // AMERICANA - 20 receitas
  ...gen("Receita Americana", [
    "Mac and Cheese Truffle", "Clam Chowder", "Gumbo de Louisiana",
    "Po' Boy de Camarão", "Nashville Hot Chicken", "Texas Chili con Carne",
    "Philly Cheese Steak", "Chicago Deep Dish Pizza", "New York Cheesecake",
    "Key Lime Pie", "Jambalaya Cajun", "Cobb Salad",
    "Lobster Bisque", "Cornbread com Mel", "Pecan Pie",
    "Biscuits and Gravy", "Chicken and Waffles", "BBQ Ribs",
    "Banana Pudding", "Apple Pie Clássica"
  ], "Americana", "lunch", ["manteiga", "sal", "pimenta"],
  ["Prepare os ingredientes", "Cozinhe conforme técnica", "Monte o prato", "Sirva porção generosa"], 20, 30, 4, "medium"),

  // PERUANA - 15 receitas
  ...gen("Receita Peruana", [
    "Ceviche Clássico", "Lomo Saltado", "Ají de Gallina",
    "Causa Limeña", "Arroz con Pollo", "Anticuchos de Coração",
    "Papa a la Huancaína", "Seco de Cordero", "Rocoto Relleno",
    "Tiradito de Salmão", "Chupe de Camarones", "Arroz Chaufa",
    "Suspiro Limeño", "Lucuma Ice Cream", "Picarones"
  ], "Peruana", "lunch", ["ají", "limão", "cebola roxa", "coentro"],
  ["Prepare os ingredientes frescos", "Cozinhe com técnicas peruanas", "Monte com cuidado", "Sirva com guarnições"], 20, 25, 4, "medium"),

  // FRANCESA - 20 receitas
  ...gen("Receita Francesa", [
    "Coq au Vin", "Cassoulet", "Bouillabaisse",
    "Quiche Lorraine Clássica", "Blanquette de Veau", "Boeuf Bourguignon",
    "Croque Monsieur", "Soupe à l'Oignon", "Tarte Tatin",
    "Crème Brûlée", "Madeleines", "Profiteroles au Chocolat",
    "Tarte aux Fruits", "Duck Confit", "Soufflé de Queijo",
    "Dauphinoise Gratinée", "Niçoise Salade", "Pissaladière",
    "Gougères", "Pot-au-Feu"
  ], "Francesa", "lunch", ["manteiga", "vinho", "ervas finas", "creme de leite"],
  ["Prepare os ingredientes com mise en place", "Cozinhe com técnica francesa", "Finalize com molho", "Apresente elegantemente"], 25, 40, 4, "hard"),

  // ESPANHOLA - 15 receitas
  ...gen("Receita Espanhola", [
    "Paella Valenciana", "Gazpacho Andaluz", "Pintxos Variados",
    "Tortilla Española", "Patatas Bravas", "Gambas al Ajillo",
    "Fabada Asturiana", "Churros con Chocolate", "Croquetas de Jamón",
    "Pimientos de Padrón", "Pulpo a la Gallega", "Cochinillo Asado",
    "Salmorejo Cordobés", "Crema Catalana", "Tarta de Santiago"
  ], "Espanhola", "lunch", ["azeite espanhol", "pimentón", "alho", "sal marinho"],
  ["Prepare mise en place", "Cozinhe com técnicas espanholas", "Descanse se necessário", "Sirva no estilo tapas"], 20, 30, 4, "medium"),

  // PETISCOS E ENTRADAS - 25 receitas
  ...gen("Petisco", [
    "Bruschetta de Tomate e Manjericão", "Carpaccio de Carne com Rúcula",
    "Coxinha de Frango Cremosa", "Pastel de Feira Gigante",
    "Bolinho de Bacalhau", "Arancini de Risoto", "Gyoza de Porco",
    "Empanada Argentina", "Croquete de Carne", "Spring Roll Vietnamita",
    "Tartare de Atum", "Nachos Loaded Supremo", "Caponata Siciliana",
    "Gravlax de Salmão", "Patê de Fígado de Galinha",
    "Iscas de Peixe com Tartar", "Queijo Brie Folhado com Geleia",
    "Edamame Temperado", "Guacamole Premium", "Salsa Mexicana Fresca",
    "Homus com Pimenta", "Antepasto de Berinjela", "Torresmo Crocante",
    "Mini Quiche de Alho-Poró", "Dadinhos de Tapioca"
  ], "Petiscos", "snack", ["azeite", "sal", "pimenta"],
  ["Prepare os ingredientes", "Cozinhe ou monte", "Apresente de forma atraente", "Sirva como entrada"], 15, 15, 4, "easy"),

  // SOBREMESAS ELABORADAS - 20 receitas
  ...gen("Sobremesa Gourmet", [
    "Crème Brûlée de Baunilha", "Tiramisù Clássico", "Panna Cotta com Frutas",
    "Fondant de Chocolate 70%", "Tarte au Citron Meringuée",
    "Mille-Feuille", "Ópera de Chocolate e Café", "Charlotte Royale",
    "Semifreddo de Amaretto", "Soufflé de Chocolate", "Dacquoise de Avelã",
    "Pavlova Tropical", "Saint-Honoré", "Croquembouche Natalino",
    "Strudel de Maçã Vienense", "Sachertorte", "Cassata Siciliana",
    "Tres Leches Especial", "Flan Napolitano", "Bolo Japonês Fluffy"
  ], "Sobremesas Gourmet", "dessert", ["chocolate", "creme", "açúcar", "baunilha"],
  ["Prepare cada componente separado", "Monte com cuidado", "Decore elegantemente", "Sirva na temperatura ideal"], 30, 25, 6, "hard"),
];
