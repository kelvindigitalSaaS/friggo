import { Recipe } from "@/types/kaza";

export const receitasCafeDaManha: Omit<Recipe, "id" | "usesExpiringItems">[] = [
  {
    name: "Panquecas Americanas Fofas 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Pancakes dourados e fofos servidos com maple syrup e frutas",
    category: "Café da Manhã",
    type: "snack",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "2 xícaras farinha de trigo",
      "2 colheres açúcar",
      "1 colher fermento",
      "1 colher bicarbonato",
      "1 colher sal",
      "1 xícara buttermilk (ou leite + 1 colher vinagre)",
      "1 xícara leite",
      "2 ovos",
      "3 colheres manteiga derretida"
    ],
    instructions: [
      "Se não tiver buttermilk: misture o leite com 1 colher de vinagre ou limão. Deixe por 5 min — talha e cria o ácido necessário.",
      "SECOS: Misture farinha, açúcar, fermento, bicarbonato e sal.",
      "ÚMIDOS: Bata os ovos com o buttermilk, leite e manteiga derretida morna.",
      "Misture úmidos nos secos até QUASE incorporar — a massa deve ter grumos. Massa lisa = pancake borrachento.",
      "Deixe a massa repousar 5 min enquanto aquece a frigideira.",
      "Frigideira antiaderente em fogo médio. Pequena gota de manteiga.",
      "Despeje 1/4 xícara de massa. Quando aparecerem bolhas na superfície (2–3 min) e as bordas ficarem opacas, vire.",
      "Cozinhe mais 1 min. Sirva imediatamente com syrup, frutas e manteiga."
    ],
    tips: [
      "Grumos na massa são bem-vindos — pancake fofa não tem massa lisa.",
      "Não pressione com a espátula — tira o ar e achata.",
      "Resultado perfeito: dourado uniforme, borbulhas antes de virar."
    ]
  },
  {
    name: "Granola Caseira Crocante 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Granola assada no forno com mel, aveia e mix de frutas secas",
    category: "Café da Manhã",
    type: "snack",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 30,
    servings: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1448907503123-67254d59ca4f?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "3 xícaras aveia em flocos grossos",
      "1 xícara nozes picadas variadas",
      "1/2 xícara sementes (girassol, abóbora)",
      "1/3 xícara mel",
      "1/3 xícara óleo de coco",
      "1 colher baunilha",
      "1 colher canela",
      "1 xícara frutas secas (uva passa, damasco, cranberry)"
    ],
    instructions: [
      "Pré-aqueça o forno a 160 °C. Forre assadeira grande com papel manteiga.",
      "Misture mel, óleo de coco e baunilha. Aqueça levemente se o óleo de coco estiver sólido.",
      "Misture aveia, nozes, sementes e canela. Despeje a mistura líquida e misture bem até todos.",
      "Espalhe em camada fina e uniforme na assadeira — mais fina = mais crocante.",
      "Asse por 20–25 min MEXENDO A CADA 10 MIN para dourar por igual.",
      "Retire quando estiver dourado — ainda mole, endurece ao esfriar.",
      "Deixe esfriar completamente SEM MEXER — cria os cascalhos.",
      "Adicione as frutas secas somente depois de esfriar. Guarde em pote hermético por até 3 semanas."
    ],
    tips: [
      "Não mexa durante o resfriamento — move-la quente quebra os clusters.",
      "Frutas secas adicionadas depois, pois no forno ficam duras demais.",
      "Óleo de coco é o que cria os torrões maiores."
    ]
  },
  {
    name: "Omelete Francesa Perfeita 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Omelete clássica francesas — macia, enrolada, sem dourar",
    category: "Café da Manhã",
    type: "snack",
    difficulty: "médio",
    prepTime: 5,
    cookTime: 3,
    servings: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "3 ovos frescos",
      "1 colher manteiga",
      "sal fino",
      "recheio opcional: queijo, ervas, cogumelos"
    ],
    instructions: [
      "Bata os ovos com garfo (não fouet) com sal — devem ficar ligeiramente mesclados, não homogêneos. Gemas e claras com pequenas listras.",
      "Frigideira antiaderente de 20 cm em fogo MÉDIO-ALTO.",
      "Adicione a manteiga. Quando espumar, despeje os ovos.",
      "Agite a frigideira com uma mão enquanto com a outra mexe os ovos com garfo em movimentos randômicos.",
      "Assim que os ovos cozinharem formando textura cremosa (20–30 seg), pare de mexer.",
      "Adicione o recheio no centro.",
      "ENROLAR: incline a frigideira 45°. Com espátula, dobre a parte mais próxima para o centro. Vire a frigideira sobre o prato para que a omelete caia já enrolada.",
      "Omelete francesa PERFEITA: amarela pálida, macia, úmida internamente, SEM dourar."
    ],
    tips: [
      "Técnica francesa: mexer rápido = ovos cremosos, não dourados.",
      "30 segundos para fazer — tudo no timing. Não distraia.",
      "Para iniciantes: filmar a si mesmo ajuda a visualizar a técnica."
    ]
  },
  {
    name: "Açaí na Tigela Com Granola 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "Tigela de açaí cremoso com frutas frescas — café da manhã brasileiro saudável",
    category: "Café da Manhã",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "400 g açaí puro congelado (polpa)",
      "1 banana congelada",
      "100 ml guaraná ou suco de uva",
      "TOPPINGS: banana fatiada, morangos, kiwi, granola, mel, castanhas"
    ],
    instructions: [
      "Congele a banana em pedaços na véspera.",
      "No liquidificador: adicione o açaí bloqueado e a banana congelada.",
      "Adicione o guaraná aos poucos — o açaí deve ficar espesso como sorvete, não líquido.",
      "Bata brevemente — o açaí não pode aquecer demais.",
      "A consistência certa: fica parado de pé quando despejado, como sorvete.",
      "Distribua em tigelas ou bowls.",
      "Monte os toppings em camadas: granola → frutas → mel → castanhas.",
      "Sirva imediatamente — açaí derrete rapidamente."
    ],
    tips: [
      "Açaí espesso = mais guaraná bloqueado. Açaí ralo = menos.",
      "Toppings colocados em seções separadas dão visual de café.",
      "Guaraná ou suco de uva adoçam sem precisar de açúcar extra."
    ]
  },
  {
    name: "Crepe Doce com Nutella e Morango 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Crepe fino e dourado com recheio cremoso — clássico das confeitarias francesas",
    category: "Café da Manhã",
    type: "snack",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 20,
    servings: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1565299543923-37dd37887442?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 xícara farinha",
      "2 ovos",
      "1,5 xícara leite",
      "1 colher açúcar",
      "1 pitada sal",
      "2 colheres manteiga derretida",
      "baunilha",
      "RECHEIO: Nutella, morangos, chantilly"
    ],
    instructions: [
      "Bata todos os ingredientes no liquidificador até massa lisíssima.",
      "Repouso OBRIGATÓRIO: cubra e leve à geladeira por 30 min. Isso relaxa o glúten — crepe mais macio.",
      "Frigideira antiaderente de 24 cm. Levemente untada com manteiga.",
      "Despeje pequena quantidade de massa, gire rapidamente a frigideira para espalhá-la fina.",
      "Doure por 1 min. Quando as bordas se soltarem e o centro ficar opaco, vire.",
      "30 seg no segundo lado. Deve estar levemente dourado.",
      "Espalhe Nutella, adicione morangos fatiados. Dobre em triângulo ou enrole.",
      "Polvilhe açúcar de confeiteiro. Sirva com chantilly."
    ],
    tips: [
      "Repouso de 30 min é essencial para crepe sem grumos e mais macio.",
      "Frigideira não muito quente — crepe deve dourar suave.",
      "Crepes salgados: omita o açúcar e baunilha, recheie com queijo e presunto."
    ]
  }
];
