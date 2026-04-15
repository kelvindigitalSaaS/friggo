import { Recipe } from "@/types/friggo";

type RecipeEntry = Omit<Recipe, "id" | "usesExpiringItems">;

// Generator function to create bulk recipes from templates
function generateRecipes(templates: Array<{
  base: string; variations: string[]; category: string; type: Recipe["type"];
  baseIngredients: string[]; baseInstructions: string[];
  prepTime: number; cookTime: number; servings: number; difficulty: Recipe["difficulty"];
}>): RecipeEntry[] {
  const recipes: RecipeEntry[] = [];
  for (const t of templates) {
    for (const variation of t.variations) {
      recipes.push({
        name: `${t.base} ${variation}`, emoji: "🥣", region: "INT", estimatedCost: "low", 
        description: `${t.base} preparado com ${variation.toLowerCase()} - sabor irresistível e preparo prático`,
        category: t.category,
        type: t.type,
        ingredients: [...t.baseIngredients, variation.toLowerCase()],
        instructions: t.baseInstructions,
        prepTime: t.prepTime,
        cookTime: t.cookTime,
        servings: t.servings,
        difficulty: t.difficulty,
      });
    }
  }
  return recipes;
}

const bulkTemplates = [
  {
    base: "Risoto de", variations: [
      "Limão Siciliano e Camarão", "Tomate Seco e Rúcula", "Abóbora com Sálvia",
      "Alcachofra", "Aspargos Verdes", "Gorgonzola e Nozes", "Parmesão e Trufa",
      "Cúrcuma e Frango", "Beterraba", "Radicchio", "Mascarpone e Espinafre",
      "Salmão Defumado", "Lula e Tinta", "Presunto de Parma", "Funghi Misto",
      "Azeitonas e Tomate", "Queijo de Cabra", "Milho Verde", "Bacalhau",
      "Linguiça Calabresa", "Camarão e Açafrão", "Palmito e Ervas", "Abobrinha",
      "Pesto Genovese"
    ],
    category: "Risotos", type: "lunch" as const,
    baseIngredients: ["arroz arbório", "cebola", "vinho branco", "caldo", "manteiga", "parmesão"],
    baseInstructions: ["Refogue a cebola", "Toste o arroz", "Adicione vinho", "Adicione caldo aos poucos", "Finalize com manteiga e parmesão"],
    prepTime: 15, cookTime: 25, servings: 4, difficulty: "medium" as const
  },
  {
    base: "Sopa de", variations: [
      "Mandioquinha com Bacon", "Abóbora Assada", "Ervilha com Hortelã",
      "Batata-Doce e Gengibre", "Cenoura com Laranja", "Couve-Flor Gratinada",
      "Inhame com Alho-Poró", "Milho Verde Cremosa", "Lentilha Defumada",
      "Grão-de-Bico com Curry", "Tomate Assado com Manjericão", "Cogumelos Selvagens",
      "Brócolis com Cheddar", "Aspargos com Limão", "Beterraba com Mascarpone",
      "Feijão Branco com Linguiça", "Alcachofra", "Cebola Francesa Gratinada",
      "Espinafre com Parmesão", "Agrião com Batata"
    ],
    category: "Sopas", type: "lunch" as const,
    baseIngredients: ["cebola", "alho", "azeite", "caldo", "sal", "pimenta"],
    baseInstructions: ["Refogue aromáticos", "Adicione o ingrediente principal", "Cozinhe até macio", "Bata até cremoso", "Ajuste temperos"],
    prepTime: 15, cookTime: 30, servings: 4, difficulty: "easy" as const
  },
  {
    base: "Salada de", variations: [
      "Quinoa com Abacate e Manga", "Macarrão com Pesto e Tomate Cereja",
      "Grão-de-Bico Mediterrânea", "Folhas com Figo e Gorgonzola",
      "Beterraba com Queijo de Cabra", "Couscous Marroquino",
      "Cítricos com Hortelã", "Rúcula com Pera e Nozes",
      "Lentilha com Legumes Assados", "Kale com Cranberry e Amêndoa",
      "Tabule Libanês", "Frutas Tropicais com Hortelã",
      "Caprese Desconstruída", "Waldorf Moderna",
      "Melancia com Feta e Hortelã", "Endívia com Roquefort",
      "Pepino Japonês com Gergelim", "Tomate com Burrata",
      "Erva-Doce com Laranja", "Repolho Roxo com Maçã"
    ],
    category: "Saladas", type: "lunch" as const,
    baseIngredients: ["azeite extra virgem", "limão", "sal", "pimenta"],
    baseInstructions: ["Prepare os ingredientes", "Faça o molho", "Monte a salada", "Finalize com o molho"],
    prepTime: 15, cookTime: 0, servings: 2, difficulty: "easy" as const
  },
  {
    base: "Bolo de", variations: [
      "Chocolate com Ganache", "Cenoura com Cobertura de Chocolate",
      "Laranja com Calda", "Limão com Glacê", "Banana com Canela",
      "Fubá Cremoso", "Milho Verde", "Coco com Leite Condensado",
      "Maçã com Nozes", "Morango com Chantilly", "Red Velvet com Cream Cheese",
      "Churros", "Prestígio", "Brownie de Chocolate Duplo", "Mármore",
      "Abacaxi Invertido", "Formigueiro", "Amendoim", "Brigadeiro",
      "Doce de Leite", "Café com Nozes", "Pistache", "Maracujá",
      "Três Leites", "Mousse de Chocolate", "Floresta Negra",
      "Nega Maluca", "Avelã com Nutella", "Romeu e Julieta",
      "Mandioca com Coco"
    ],
    category: "Bolos", type: "dessert" as const,
    baseIngredients: ["farinha", "açúcar", "ovo", "manteiga", "fermento"],
    baseInstructions: ["Misture ingredientes secos", "Bata líquidos separados", "Combine tudo", "Asse por 35-40min", "Prepare a cobertura"],
    prepTime: 20, cookTime: 40, servings: 12, difficulty: "easy" as const
  },
  {
    base: "Frango", variations: [
      "ao Curry Thai", "com Mel e Mostarda", "Teriyaki Grelhado",
      "à Provençal", "com Molho de Laranja", "Xadrez Chinês",
      "ao Creme de Palmito", "com Quiabo", "Tandoori", "com Abacaxi",
      "Cordon Bleu", "Kiev", "Marsala", "ao Pesto", "com Azeitonas",
      "à Caçadora", "BBQ com Bacon", "com Ervas Finas",
      "Satay com Amendoim", "Shawarma", "Recheado com Ricota",
      "à Moda da Vovó", "com Batata e Alecrim", "com Creme de Milho",
      "ao Vinho Branco", "com Tomate Seco e Manjericão",
      "General Tso", "Orange Chicken", "Buffalo Wings", "Kung Pao"
    ],
    category: "Aves", type: "lunch" as const,
    baseIngredients: ["frango", "sal", "pimenta", "alho", "azeite"],
    baseInstructions: ["Tempere o frango", "Sele ou marine", "Cozinhe com o molho", "Ajuste temperos", "Sirva com acompanhamento"],
    prepTime: 20, cookTime: 30, servings: 4, difficulty: "medium" as const
  },
  {
    base: "Massa", variations: [
      "ao Ragu de Carne", "Primavera", "ao Molho Rosa",
      "com Brócolis e Alho", "Alfredo com Camarão", "Arrabbiata",
      "Amatriciana", "Putanesca", "com Sardinha e Tomate",
      "ao Molho de Nozes", "com Bacon e Ervilha", "de Berinjela à Parmegiana",
      "ao Pesto Siciliano", "com Rúcula e Tomate Seco",
      "com Cogumelos Salteados", "ao Sugo Fresco", "Norma",
      "alla Vodka", "com Atum e Alcaparra", "com Linguiça e Pimentão",
      "ao Limão Siciliano", "Cacio e Pepe", "com Vôngole",
      "ao Pesto de Manjericão Roxo", "com Salmão e Endro",
      "Gricia", "ao Ragù Bolonhês", "com Aspargos e Presunto",
      "Orecchiette com Rapini", "com Abóbora e Sálvia"
    ],
    category: "Massas", type: "lunch" as const,
    baseIngredients: ["massa", "azeite", "alho", "sal", "pimenta"],
    baseInstructions: ["Cozinhe a massa al dente", "Prepare o molho", "Combine massa e molho", "Finalize com queijo"],
    prepTime: 10, cookTime: 15, servings: 2, difficulty: "easy" as const
  },
  {
    base: "Peixe", variations: [
      "Grelhado com Ervas", "ao Molho de Maracujá", "Assado com Limão",
      "com Crosta de Castanha", "em Papillote", "ao Molho de Alcaparras",
      "Teriyaki", "com Manteiga de Ervas", "à Meunière",
      "com Purê de Couve-flor", "ao Curry Verde", "Empanado com Panko",
      "em Cama de Legumes", "com Molho de Manga", "ao Shoyu e Gengibre",
      "com Tomate e Azeitonas", "na Folha de Bananeira",
      "ao Molho Branco com Espinafre", "com Crosta de Parmesão",
      "ao Pesto de Rúcula"
    ],
    category: "Peixes", type: "lunch" as const,
    baseIngredients: ["peixe fresco", "limão", "sal", "pimenta", "azeite"],
    baseInstructions: ["Tempere o peixe", "Prepare o acompanhamento", "Cozinhe o peixe", "Monte o prato", "Sirva com o molho"],
    prepTime: 15, cookTime: 15, servings: 2, difficulty: "medium" as const
  },
  {
    base: "Carne", variations: [
      "com Molho Chimichurri", "ao Vinho Tinto com Cogumelos",
      "na Manteiga de Alho", "Assada com Batatas", "de Panela da Vovó",
      "com Molho Madeira", "Wellington Individual", "ao Pesto com Gnocchi",
      "Desfiada com Abóbora", "com Molho de Mostarda Dijon",
      "Maluca na Pressão", "à Parmegiana Gratinada", "ao Shoyu e Mel",
      "com Purê de Mandioquinha", "Bourguignon Express",
      "na Cerveja Preta", "com Molho de Vinho do Porto",
      "Thai com Manjericão", "ao Curry com Leite de Coco",
      "com Farofa de Bacon"
    ],
    category: "Carnes", type: "lunch" as const,
    baseIngredients: ["carne bovina", "sal", "pimenta", "alho", "azeite"],
    baseInstructions: ["Tempere a carne", "Sele em fogo alto", "Prepare o molho", "Cozinhe até o ponto desejado", "Sirva com acompanhamento"],
    prepTime: 20, cookTime: 30, servings: 4, difficulty: "medium" as const
  },
  {
    base: "Smoothie de", variations: [
      "Banana com Aveia e Mel", "Frutas Vermelhas e Iogurte",
      "Manga com Cúrcuma", "Morango com Proteína", "Abacate com Cacau",
      "Açaí com Guaraná", "Maçã Verde com Gengibre", "Maracujá com Hortelã",
      "Kiwi com Espinafre", "Melão com Limão", "Goiaba com Laranja",
      "Mamão com Linhaça", "Pêssego com Iogurte Grego",
      "Amêndoa com Tâmara", "Coco com Abacaxi",
      "Mirtilo com Chia", "Framboesa com Baunilha",
      "Detox Verde", "Tropical Energético", "Proteico Pós-Treino"
    ],
    category: "Bebidas", type: "snack" as const,
    baseIngredients: ["gelo", "leite ou água de coco"],
    baseInstructions: ["Coloque todos ingredientes no liquidificador", "Bata até homogêneo", "Sirva gelado"],
    prepTime: 5, cookTime: 0, servings: 1, difficulty: "easy" as const
  },
  {
    base: "Pizza", variations: [
      "Margherita Napolitana", "Quattro Formaggi", "Diavola com Calabresa",
      "Prosciutto e Rúcula", "Fungi Misti", "Caprese com Burrata",
      "BBQ de Frango", "Hawaiana", "Pepperoni Clássica",
      "de Abobrinha e Ricota", "Siciliana com Anchova",
      "de Trufas e Cogumelos", "Vegana de Vegetais",
      "de Presunto de Parma e Figo", "Carbonara",
      "de Salmão Defumado", "Toscana com Linguiça",
      "de Camarão com Catupiry", "Portuguesa", "Romana com Alcachofra"
    ],
    category: "Pizzas", type: "lunch" as const,
    baseIngredients: ["farinha", "fermento", "água", "sal", "azeite", "molho de tomate", "muçarela"],
    baseInstructions: ["Prepare a massa", "Deixe fermentar 24h", "Abra a massa", "Adicione molho e coberturas", "Asse em forno muito quente"],
    prepTime: 1440, cookTime: 10, servings: 2, difficulty: "medium" as const
  },
  {
    base: "Torta de", variations: [
      "Frango com Catupiry", "Palmito com Requeijão", "Atum com Tomate",
      "Legumes com Queijo", "Espinafre com Ricota", "Presunto e Queijo",
      "Brócolis com Bacon", "Abobrinha com Parmesão",
      "Cogumelos e Gruyère", "Tomate com Manjericão",
      "Berinjela à Parmegiana", "Bacalhau com Natas",
      "Carne Seca com Abóbora", "Milho com Queijo",
      "Alho-Poró com Cheddar", "Camarão com Catupiry",
      "Quiche Lorraine", "Quiche de Alho-Poró",
      "Quiche de Tomate Seco", "Quiche de Espinafre"
    ],
    category: "Tortas Salgadas", type: "lunch" as const,
    baseIngredients: ["farinha", "manteiga", "ovo", "leite", "sal"],
    baseInstructions: ["Prepare a massa podre", "Faça o recheio", "Monte e asse a base", "Adicione o recheio", "Asse até dourar"],
    prepTime: 25, cookTime: 35, servings: 8, difficulty: "easy" as const
  },
  {
    base: "Bowl de", variations: [
      "Burrito com Guacamole", "Buddha Vegetariano", "Açaí Fitness",
      "Quinoa Mediterrâneo", "Poke de Atum", "Falafel com Hummus",
      "Frango Teriyaki", "Salmão com Edamame", "Arroz Thai com Camarão",
      "Bibimbap Coreano", "Lentilha com Legumes", "Tofu Teriyaki",
      "Carne Thai com Amendoim", "Camarão com Abacate",
      "Grão-de-Bico Especiado", "Frango Tikka", "Sushi Desconstruído",
      "Ceviche com Chips", "Pulled Pork BBQ", "Feijoada Desconstruída"
    ],
    category: "Bowls", type: "lunch" as const,
    baseIngredients: ["arroz ou base", "proteína", "vegetais"],
    baseInstructions: ["Prepare a base", "Cozinhe a proteína", "Prepare os toppings", "Monte o bowl", "Finalize com molho"],
    prepTime: 20, cookTime: 20, servings: 2, difficulty: "easy" as const
  },
  {
    base: "Sobremesa", variations: [
      "Mousse de Maracujá", "Pudim de Leite Condensado", "Pavlova de Morango",
      "Cheesecake de Frutas Vermelhas", "Brigadeiro Gourmet", "Petit Gâteau",
      "Churros com Chocolate Belga", "Banana Caramelizada com Sorvete",
      "Profiteroles com Chocolate", "Charlotte de Framboesa",
      "Rabanada com Sorvete", "Torta de Limão Merengada",
      "Éclair de Café", "Macaron de Pistache", "Crumble de Maçã",
      "Baba au Rhum", "Cannoli Siciliano", "Baklava de Nozes",
      "Mochi de Matcha", "Opera Cake", "Millefeuille de Baunilha",
      "Trifle Inglês", "Arroz-Doce com Canela", "Cartola Pernambucana",
      "Romeo e Julieta Quente", "Parfait de Iogurte com Granola",
      "Affogato al Caffè", "Chocolate Quente Belga",
      "Torta Banoffee", "Paris-Brest"
    ],
    category: "Sobremesas", type: "dessert" as const,
    baseIngredients: ["açúcar", "manteiga"],
    baseInstructions: ["Prepare a base", "Monte a sobremesa", "Finalize a decoração", "Sirva na temperatura ideal"],
    prepTime: 25, cookTime: 30, servings: 6, difficulty: "medium" as const
  },
  {
    base: "Café da Manhã", variations: [
      "Panqueca Americana com Maple", "Waffle Belga com Frutas", "French Toast com Canela",
      "Granola Caseira com Iogurte", "Overnight Oats com Chia", "Açaí na Tigela Premium",
      "Omelete Espanhola", "Shakshuka Express", "Crepioca Fit",
      "Muffin de Blueberry", "Scone Inglês com Geleia", "Croissant de Chocolate",
      "Mingau de Aveia Proteico", "Eggs Benedict", "Tortilla de Patatas",
      "Bagel com Salmão e Cream Cheese", "Burrito de Café da Manhã",
      "Tapioca Recheada Premium", "Pão de Queijo Fit", "Banana Bread Integral",
      "Acai Bowl com Proteína", "Porridge de Quinoa", "Hash Browns Crocantes",
      "Huevos Rancheros", "Avocado Toast Especial"
    ],
    category: "Café da Manhã", type: "snack" as const,
    baseIngredients: ["ovo", "farinha", "leite"],
    baseInstructions: ["Prepare a base", "Cozinhe", "Monte o prato", "Sirva quente"],
    prepTime: 10, cookTime: 15, servings: 2, difficulty: "easy" as const
  },
  {
    base: "Lanche", variations: [
      "Burger Artesanal com Cheddar", "Smash Burger com Bacon", "Burger de Costela",
      "Cachorro-Quente Gourmet", "Club Sandwich Triplo", "BLT com Avocado",
      "Hambúrguer de Frango Crocante", "Pulled Pork Sandwich", "Cheese Steak",
      "Burger Vegano de Beterraba", "Lobster Roll", "Banh Mi de Porco",
      "Crepe Salgado Parisiense", "Hot Dog Dinamarquês", "Focaccia Recheada",
      "Misto Quente Gourmet", "Pão com Pernil", "Beirute Completo",
      "Ciabatta de Frango", "Mini Pizza Caseira", "Tostex de Presunto e Queijo",
      "Waffle Salgado", "Piadina Italiana", "Toast Havaiano",
      "Sanduíche Monte Cristo"
    ],
    category: "Lanches", type: "lanche" as const,
    baseIngredients: ["pão", "queijo", "sal"],
    baseInstructions: ["Prepare a proteína", "Prepare os acompanhamentos", "Monte o lanche", "Sirva quente"],
    prepTime: 15, cookTime: 15, servings: 2, difficulty: "easy" as const
  },
  {
    base: "Churrasco", variations: [
      "Picanha na Brasa", "Costela Low & Slow", "Maminha com Chimichurri",
      "Alcatra ao Ponto", "Fraldinha Defumada", "Linguiça Artesanal",
      "Asinha de Frango BBQ", "Espetinho de Camarão", "Pão de Alho Recheado",
      "Ancho com Manteiga de Ervas", "T-Bone Grelhado", "Cupim na Brasa",
      "Cordeiro com Alecrim", "Burger na Grelha", "Leitão à Pururuca",
      "Contra Filé com Flor de Sal", "Medalhão Envolto em Bacon",
      "Coração de Frango", "Kafta na Grelha", "Espetinho de Carne com Queijo",
      "Costelinha Ribs BBQ", "Brisket Defumado 12h", "Tri-Tip no Ponto",
      "Tomahawk Steak", "Espeto Misto Premium"
    ],
    category: "Churrasco", type: "lunch" as const,
    baseIngredients: ["carne", "sal grosso", "carvão"],
    baseInstructions: ["Tempere a carne", "Prepare a brasa", "Grelhe no ponto certo", "Descanse a carne", "Fatie e sirva"],
    prepTime: 15, cookTime: 30, servings: 6, difficulty: "medium" as const
  },
  {
    base: "Receita Fitness", variations: [
      "Omelete de Claras com Espinafre", "Frango Grelhado com Quinoa",
      "Salmão ao Forno com Aspargos", "Bowl de Tofu com Vegetais",
      "Muffin Proteico de Banana", "Panqueca de Aveia e Banana",
      "Wrap Integral de Peru", "Salada Proteica Completa",
      "Almôndega de Peru ao Forno", "Hambúrguer de Frango Fit",
      "Arroz Integral com Brócolis", "Batata-Doce Recheada",
      "Steak de Atum com Gergelim", "Peito de Peru com Ervas",
      "Sopa Proteica de Frango", "Tabule com Quinoa", "Chia Pudding",
      "Energy Ball de Tâmara", "Granola Low Carb", "Iogurte com Mix de Nuts",
      "Frango Desfiado com Batata-Doce", "Poke Fit com Tofu",
      "Espaguete de Abobrinha", "Pizza de Frigideira Fit",
      "Brownie Fit de Abóbora"
    ],
    category: "Fitness", type: "lunch" as const,
    baseIngredients: ["proteína magra", "vegetais"],
    baseInstructions: ["Prepare os ingredientes", "Cozinhe de forma saudável", "Monte o prato", "Sirva com acompanhamento fit"],
    prepTime: 15, cookTime: 20, servings: 2, difficulty: "easy" as const
  },
  {
    base: "Receita Vegana", variations: [
      "Curry de Grão-de-Bico", "Pad Thai Vegano", "Lasanha de Berinjela",
      "Hambúrguer de Feijão Preto", "Risoto Vegano de Cogumelos",
      "Tacos de Jackfruit", "Bowl Buddha Completo",
      "Macarrão com Molho Cashew", "Chili Vegano com 3 Feijões",
      "Falafel no Pita", "Sopa de Lentilha Vermelha",
      "Wrap de Hummus com Vegetais", "Tofu Scramble",
      "Paella Vegana", "Ramen Vegano de Misô",
      "Espetinho de Tofu Thai", "Bolonhesa de Lentilha",
      "Quiche Vegana de Tofu", "Ceviche de Manga",
      "Strogonoff Vegano de Cogumelos", "Moqueca Vegana",
      "Bobó de Cogumelos", "Yakisoba Vegano", "Acarajé Vegano",
      "Pizza Vegana de Couve-Flor"
    ],
    category: "Vegano", type: "lunch" as const,
    baseIngredients: ["vegetais", "azeite", "temperos"],
    baseInstructions: ["Prepare os ingredientes vegetais", "Cozinhe com técnica adequada", "Monte o prato", "Sirva com guarnição"],
    prepTime: 20, cookTime: 25, servings: 4, difficulty: "medium" as const
  },
  {
    base: "Doce", variations: [
      "Brigadeiro de Chocolate ao Leite", "Brigadeiro de Churros",
      "Brigadeiro de Pistache", "Brigadeiro de Café",
      "Trufa de Chocolate com Framboesa", "Trufa de Maracujá",
      "Brownie com Sorvete", "Cookie de Chocolate Chips",
      "Palha Italiana", "Beijinho de Coco", "Cajuzinho",
      "Olho de Sogra", "Bem-Casado", "Cartola", "Cocada Cremosa",
      "Quindim", "Manjar de Coco", "Baba de Moça",
      "Ambrosia Mineira", "Doce de Figo com Queijo",
      "Goiabada Cascão", "Paçoca de Amendoim", "Pé-de-Moleque",
      "Rapadura com Coco", "Canjica Cremosa"
    ],
    category: "Doces", type: "dessert" as const,
    baseIngredients: ["açúcar", "leite condensado"],
    baseInstructions: ["Prepare a base", "Cozinhe até o ponto", "Modele ou monte", "Deixe esfriar", "Sirva"],
    prepTime: 15, cookTime: 20, servings: 20, difficulty: "easy" as const
  },
  {
    base: "Pão", variations: [
      "Ciabatta com Alecrim", "Focaccia de Tomate Seco", "Baguete Francesa",
      "de Fermentação Natural", "Brioche Amanteigado", "de Batata Fofinho",
      "Integral com Sementes", "de Queijo Parmesão", "Australiano",
      "Challah Trançado", "Naan com Alho", "de Cerveja Artesanal",
      "de Centeio", "Pita Árabe", "de Mandioquinha", "Croissant Clássico",
      "de Azeitona e Ervas", "de Cebola Caramelizada", "de Abóbora",
      "Pretzel Alemão"
    ],
    category: "Pães", type: "snack" as const,
    baseIngredients: ["farinha", "fermento", "água", "sal"],
    baseInstructions: ["Misture os ingredientes", "Sove a massa", "Deixe fermentar", "Modele", "Asse até dourar"],
    prepTime: 120, cookTime: 30, servings: 8, difficulty: "medium" as const
  },
  {
    base: "Frutos do Mar", variations: [
      "Paella de Frutos do Mar", "Risoto de Frutos do Mar",
      "Bobó de Camarão", "Casquinha de Siri", "Moqueca de Camarão",
      "Lagostim ao Alho", "Camarão à Paulista", "Polvo à Lagareiro",
      "Lula Grelhada com Limão", "Mexilhão ao Vinho Branco",
      "Camarão na Moranga", "Ceviche de Camarão",
      "Linguine alle Vongole", "Camarão ao Curry",
      "Sashimi Misto Premium", "Caldeirada de Peixe",
      "Bacalhau à Gomes de Sá", "Bacalhau com Natas",
      "Camarão ao Catupiry", "Escondidinho de Camarão"
    ],
    category: "Frutos do Mar", type: "lunch" as const,
    baseIngredients: ["frutos do mar", "limão", "alho", "azeite", "sal"],
    baseInstructions: ["Limpe os frutos do mar", "Prepare o molho/base", "Cozinhe rapidamente", "Finalize com ervas", "Sirva imediatamente"],
    prepTime: 20, cookTime: 20, servings: 4, difficulty: "medium" as const
  },
];

// Additional handwritten unique recipes
const uniqueRecipes: RecipeEntry[] = [
  { name: "Wellington de Salmão 📋", emoji: "🐟", region: "INT", estimatedCost: "medium",  description: "Salmão envolvido em espinafre e massa folhada, o luxo acessível", category: "Gourmet", type: "lunch", ingredients: ["salmão", "massa folhada", "espinafre", "cream cheese", "endro", "limão", "ovo"], instructions: ["Grelhe o salmão brevemente", "Prepare o recheio de espinafre e cream cheese", "Envolva na massa folhada", "Asse até dourar"], prepTime: 20, cookTime: 25, servings: 4, difficulty: "medium" },
  { name: "Açorda Alentejana 📋", emoji: "🥣", region: "INT", estimatedCost: "medium",  description: "Sopa portuguesa com pão, alho, coentro e ovo pochê", category: "Portuguesa", type: "lunch", ingredients: ["pão alentejano", "alho", "coentro", "ovo", "azeite", "sal", "pimentão"], instructions: ["Refogue alho e pimentão", "Adicione água e coentro", "Coloque o pão", "Adicione ovos pochê"], prepTime: 10, cookTime: 15, servings: 4, difficulty: "easy" },
  { name: "Carne de Sol com Macaxeira 📋", emoji: "🥩", region: "BR", estimatedCost: "medium",  description: "Prato nordestino com carne de sol desfiada e purê de macaxeira", category: "Brasileira", type: "lunch", ingredients: ["carne de sol", "macaxeira", "manteiga de garrafa", "cebola", "tomate", "coentro", "cebolinha"], instructions: ["Dessalgue e cozinhe a carne", "Desfie a carne", "Cozinhe a macaxeira", "Prepare o purê", "Sirva com manteiga de garrafa"], prepTime: 720, cookTime: 40, servings: 4, difficulty: "medium" },
  { name: "Ratatouille Provençal 📋", emoji: "🍽️", region: "INT", estimatedCost: "medium",  description: "Legumes fatiados dispostos em espiral sobre molho de tomate", category: "Francesa", type: "lunch", ingredients: ["abobrinha", "berinjela", "tomate", "pimentão", "cebola", "alho", "tomilho", "azeite"], instructions: ["Prepare o molho de tomate", "Fatie os legumes finamente", "Disponha em espiral no refratário", "Tempere e asse"], prepTime: 30, cookTime: 45, servings: 4, difficulty: "medium" },
  { name: "Nhoque de Abóbora com Sálvia 📋", emoji: "🍝", region: "INT", estimatedCost: "medium",  description: "Nhoque feito com abóbora assada e manteiga de sálvia tostada", category: "Italiana", type: "lunch", ingredients: ["abóbora", "farinha", "ovo", "noz-moscada", "sálvia", "manteiga", "parmesão", "pimenta"], instructions: ["Asse a abóbora", "Faça a massa do nhoque", "Cozinhe em água", "Prepare manteiga de sálvia", "Combine e sirva"], prepTime: 30, cookTime: 15, servings: 4, difficulty: "medium" },
  { name: "Baião de Dois 📋", emoji: "🍚", region: "BR", estimatedCost: "medium",  description: "Arroz com feijão verde cearense, queijo coalho e manteiga", category: "Brasileira", type: "lunch", ingredients: ["arroz", "feijão verde", "queijo coalho", "manteiga de garrafa", "bacon", "cebola", "alho", "coentro", "cebolinha"], instructions: ["Cozinhe o feijão verde", "Refogue o arroz", "Cozinhe juntos", "Adicione queijo coalho", "Finalize com manteiga de garrafa e coentro"], prepTime: 20, cookTime: 30, servings: 6, difficulty: "easy" },
  { name: "Pato no Tucupi 📋", emoji: "🥩", region: "BR", estimatedCost: "medium",  description: "Receita paraense com pato cozido em tucupi com jambu", category: "Brasileira", type: "lunch", ingredients: ["pato", "tucupi", "jambu", "alho", "chicória", "alfavaca", "pimenta-de-cheiro"], instructions: ["Cozinhe o pato com temperos", "Desfie a carne", "Cozinhe o tucupi separado", "Combine com jambu", "Sirva com arroz branco"], prepTime: 30, cookTime: 120, servings: 8, difficulty: "hard" },
  { name: "Escondidinho de Carne Seca 📋", emoji: "🥩", region: "BR", estimatedCost: "medium",  description: "Creme de mandioca com carne seca desfiada gratinada com queijo", category: "Brasileira", type: "lunch", ingredients: ["carne seca", "mandioca", "creme de leite", "queijo muçarela", "cebola", "alho", "manteiga", "leite"], instructions: ["Dessalgue a carne", "Cozinhe e desfie", "Cozinhe a mandioca", "Faça o purê cremoso", "Monte e gratine"], prepTime: 720, cookTime: 40, servings: 8, difficulty: "easy" },
  { name: "Vatapá Baiano 📋", emoji: "🍤", region: "BR", estimatedCost: "medium",  description: "Creme espesso de pão, castanha de caju, amendoim e camarão seco", category: "Brasileira", type: "lunch", ingredients: ["pão", "castanha de caju", "amendoim", "camarão seco", "leite de coco", "azeite de dendê", "cebola", "gengibre"], instructions: ["Amoleça o pão", "Bata castanhas e amendoim", "Cozinhe com leite de coco", "Adicione camarão e dendê", "Cozinhe até engrossar"], prepTime: 20, cookTime: 30, servings: 6, difficulty: "medium" },
  { name: "Galinhada Goiana 📋", emoji: "🍗", region: "BR", estimatedCost: "medium",  description: "Arroz com frango e pequi, prato típico de Goiás", category: "Brasileira", type: "lunch", ingredients: ["frango caipira", "arroz", "pequi", "açafrão", "alho", "cebola", "cheiro-verde", "tomate"], instructions: ["Refogue o frango", "Adicione açafrão e pequi", "Junte o arroz", "Cozinhe até secar", "Finalize com cheiro-verde"], prepTime: 20, cookTime: 35, servings: 6, difficulty: "easy" },
  { name: "Tacacá Paraense 📋", emoji: "🥣", region: "BR", estimatedCost: "medium",  description: "Caldo de tucupi com jambu, goma de tapioca e camarão seco", category: "Brasileira", type: "lunch", ingredients: ["tucupi", "jambu", "goma de tapioca", "camarão seco", "alho", "chicória", "sal"], instructions: ["Ferva o tucupi", "Cozinhe o jambu em água", "Prepare a goma de tapioca", "Monte na cuia", "Sirva bem quente"], prepTime: 15, cookTime: 20, servings: 4, difficulty: "medium" },
  { name: "Barreado Paranaense 📋", emoji: "🥩", region: "BR", estimatedCost: "medium",  description: "Carne cozida lentamente em panela de barro por 12 horas", category: "Brasileira", type: "lunch", ingredients: ["acém", "bacon", "cebola", "alho", "cominho", "louro", "farinha de mandioca", "banana"], instructions: ["Tempere a carne", "Sele em panela de barro", "Vede a tampa com farinha e água", "Cozinhe por 12h em fogo baixo", "Sirva com farinha e banana"], prepTime: 30, cookTime: 720, servings: 10, difficulty: "medium" },
  { name: "Bobó de Camarão Baiano 📋", emoji: "🍤", region: "BR", estimatedCost: "medium",  description: "Creme de mandioca com camarão e leite de coco da Bahia", category: "Brasileira", type: "lunch", ingredients: ["camarão", "mandioca", "leite de coco", "azeite de dendê", "tomate", "pimentão", "cebola", "coentro"], instructions: ["Cozinhe e amasse a mandioca", "Refogue os camarões", "Prepare o creme com leite de coco", "Combine tudo", "Finalize com dendê e coentro"], prepTime: 20, cookTime: 30, servings: 6, difficulty: "medium" },
  { name: "Vaca Atolada 📋", emoji: "🥣", region: "BR", estimatedCost: "medium",  description: "Costela bovina cozida com mandioca em caldo encorpado", category: "Brasileira", type: "lunch", ingredients: ["costela bovina", "mandioca", "tomate", "cebola", "alho", "cheiro-verde", "pimenta-de-cheiro", "louro"], instructions: ["Sele a costela", "Refogue temperos", "Adicione água e cozinhe", "Junte a mandioca", "Cozinhe até desmanchar"], prepTime: 15, cookTime: 120, servings: 8, difficulty: "easy" },
  { name: "Tutu de Feijão Mineiro 📋", emoji: "🍳", region: "BR", estimatedCost: "medium",  description: "Feijão engrossado com farinha de mandioca, típico de Minas Gerais", category: "Brasileira", type: "lunch", ingredients: ["feijão carioca", "farinha de mandioca", "bacon", "linguiça", "couve", "ovo frito", "cebola", "alho"], instructions: ["Cozinhe o feijão", "Refogue bacon e linguiça", "Adicione a farinha aos poucos ao feijão", "Misture até engrossar", "Sirva com couve e ovo frito"], prepTime: 15, cookTime: 30, servings: 6, difficulty: "easy" },
  { name: "Feijão Tropeiro Mineiro 📋", emoji: "🍳", region: "BR", estimatedCost: "medium",  description: "Feijão com farinha, bacon, linguiça, ovo e couve crocante", category: "Brasileira", type: "lunch", ingredients: ["feijão carioca", "farinha de mandioca", "bacon", "linguiça", "ovo", "couve", "alho", "cebola"], instructions: ["Cozinhe o feijão", "Frite bacon e linguiça", "Adicione ovos mexidos", "Misture feijão e farinha", "Sirva com couve refogada"], prepTime: 15, cookTime: 25, servings: 6, difficulty: "easy" },
];

export const receitasBulk: RecipeEntry[] = [
  ...generateRecipes(bulkTemplates),
  ...uniqueRecipes,
];
