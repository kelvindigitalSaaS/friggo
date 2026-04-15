import { Recipe } from "@/types/friggo";

// usesExpiringItems é opcional no tipo Recipe — definido pelo mapper em recipeDatabase.ts
export const receitasFitness: Recipe[] = [
  {
    id: "fitness-001",
    name: "Bowl Proteico de Frango e Quinoa 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Bowl nutritivo com proteína magra, grãos e legumes frescos",
    category: "Fitness",
    type: "healthy",
    prepTime: 15,
    cookTime: 25,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "200g de peito de frango",
      "1 xícara de quinoa",
      "1 pepino fatiado",
      "1 cenoura ralada",
      "Folhas de espinafre",
      "Suco de limão",
      "Azeite",
      "Sal e pimenta"
    ],
    steps: [
      "Cozinhe a quinoa em 2 xícaras de água com sal por 15 minutos",
      "Tempere o frango com limão, sal e pimenta",
      "Grelhe o frango por 5-6 min cada lado até dourar",
      "Deixe o frango descansar e fatie em tiras",
      "Monte o bowl com a quinoa na base",
      "Adicione o frango, pepino, cenoura e espinafre",
      "Regue com azeite e suco de limão extra"
    ],
    tips: [
      "Prepare a quinoa em lotes e congele para praticidade",
      "Adicione abacate para mais gorduras boas"
    ]
  },
  {
    id: "fitness-002",
    name: "Omelete de Claras com Vegetais 📋", emoji: "🍳", region: "INT", estimatedCost: "low", 
    description: "Proteína pura com vegetais coloridos, low-carb e nutritivo",
    category: "Fitness",
    type: "healthy",
    prepTime: 5,
    cookTime: 8,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "5 claras de ovo",
      "1 ovo inteiro",
      "1/2 pimentão vermelho em cubos",
      "1/2 cebola pequena",
      "Espinafre fresco",
      "Cogumelos fatiados",
      "Sal e pimenta",
      "Azeite"
    ],
    steps: [
      "Bata as claras com o ovo inteiro, sal e pimenta",
      "Refogue a cebola e o pimentão em azeite por 3 min",
      "Adicione os cogumelos e refogue mais 2 min",
      "Despeje os ovos sobre os vegetais",
      "Cozinhe em fogo médio-baixo tampado por 3-4 min",
      "Adicione o espinafre, dobre ao meio e sirva"
    ],
    tips: [
      "Use spray antiaderente para reduzir calorias",
      "Adicione queijo cottage para mais proteína"
    ]
  },
  {
    id: "fitness-003",
    name: "Salada de Atum com Grão-de-Bico 📋", emoji: "🥗", region: "INT", estimatedCost: "low", 
    description: "Salada rica em proteína e fibra, ideal pós-treino",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 0,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 latas de atum em água",
      "1 lata de grão-de-bico cozido",
      "Tomate cereja",
      "Pepino",
      "Cebola roxa",
      "Salsinha",
      "Suco de limão",
      "Azeite",
      "Sal e pimenta"
    ],
    steps: [
      "Escorra o atum e desfaço em pedaços",
      "Lave e escorra o grão-de-bico",
      "Corte o tomate ao meio e o pepino em meio-luas",
      "Fatie a cebola roxa bem fininha",
      "Misture tudo numa tigela grande",
      "Tempere com azeite, limão, sal e pimenta",
      "Finalize com salsinha picada"
    ],
    tips: [
      "Pode substituir o atum por frango desfiado",
      "Guarda bem na geladeira por 2 dias"
    ]
  },
  {
    id: "fitness-004",
    name: "Frango Grelhado com Brócolis no Vapor 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Clássico da dieta fitness: proteína magra e vegetais verdes",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 20,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "400g de peito de frango",
      "300g de brócolis",
      "2 dentes de alho",
      "Suco de 1 limão",
      "Azeite",
      "Sal e ervas secas",
      "Pimenta preta"
    ],
    steps: [
      "Marine o frango com alho amassado, limão, sal e ervas por 15 min",
      "Aqueça uma grelha ou frigideira antiaderente",
      "Grelhe o frango por 6-7 min cada lado",
      "Cozinhe o brócolis no vapor por 8-10 min (ainda firme)",
      "Tempere o brócolis com azeite e sal",
      "Sirva o frango fatiado ao lado do brócolis"
    ],
    tips: [
      "O brócolis deve ficar al dente, não mole",
      "Prepare vários peitos de uma vez para o meal prep"
    ]
  },
  {
    id: "fitness-005",
    name: "Batata-Doce Assada com Canela 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description:
      "Carboidrato complexo de baixo índice glicêmico, perfeito pré-treino",
    category: "Fitness",
    type: "healthy",
    prepTime: 5,
    cookTime: 40,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 batatas-doces médias",
      "1 colher de chá de canela",
      "1 fio de azeite",
      "Pitada de sal"
    ],
    steps: [
      "Lave bem as batatas-doces",
      "Corte ao meio no sentido do comprimento",
      "Regue com azeite, canela e sal",
      "Leve ao forno a 200°C por 35-40 min",
      "Sirva quando estiver macia ao furar com um garfo"
    ],
    tips: [
      "Excelente fonte de carboidrato pré-treino",
      "Pode comer com queijo cottage ou pasta de amendoim"
    ]
  },
  {
    id: "fitness-006",
    name: "Wrap Fitness de Frango e Avocado 📋", emoji: "🍗", region: "US", estimatedCost: "low", 
    description: "Refeição completa e portátil com gorduras boas e proteína",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 10,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 wraps de farinha integral",
      "200g de frango desfiado grelhado",
      "1 abacate maduro",
      "Alface americana",
      "Tomate fatiado",
      "Suco de limão",
      "Sal e pimenta"
    ],
    steps: [
      "Amasse o abacate com limão, sal e pimenta",
      "Espalhe o guacamole nos wraps",
      "Distribua a alface e o tomate",
      "Coloque o frango desfiado",
      "Enrole firmemente e corte ao meio"
    ],
    tips: [
      "Use tortilla de grão-de-bico para mais proteína",
      "Prepare o frango em lote no início da semana"
    ]
  },
  {
    id: "fitness-007",
    name: "Steak de Carne com Aspargos 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Refeição anabólica com proteína completa e vegetais de elite",
    category: "Fitness",
    type: "healthy",
    prepTime: 5,
    cookTime: 15,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "400g de filé ou contrafilé",
      "1 maço de aspargos",
      "2 dentes de alho",
      "Azeite",
      "Sal grosso",
      "Pimenta preta",
      "Ervas frescas"
    ],
    steps: [
      "Retire a carne da geladeira 30 min antes de cozinhar",
      "Tempere com sal grosso e pimenta na hora de grelhar",
      "Aqueça uma frigideira de ferro muito quente",
      "Grelhe o steak 3-4 min cada lado (ao ponto)",
      "Deixe descansar 5 min antes de cortar",
      "Refogue os aspargos com alho e azeite por 5 min",
      "Sirva o steak com os aspargos ao lado"
    ],
    tips: [
      "Nunca fure a carne durante o preparo",
      "Aspargos são ricos em folato e vitamina K"
    ]
  },
  {
    id: "fitness-008",
    name: "Overnight Oats com Proteína 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Café da manhã fitness preparado na véspera",
    category: "Fitness",
    type: "healthy",
    prepTime: 5,
    cookTime: 0,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "1/2 xícara de aveia em flocos",
      "1 scoop de whey protein baunilha",
      "200ml de leite desnatado ou vegetal",
      "1 colher de sopa de chia",
      "Frutas vermelhas",
      "Mel (opcional)"
    ],
    steps: [
      "Num pote com tampa, coloque a aveia e o whey",
      "Adicione a chia",
      "Despeje o leite e misture bem",
      "Tampe e leve à geladeira por pelo menos 8 horas",
      "Na manhã seguinte, misture bem",
      "Adicione as frutas vermelhas por cima",
      "Adicione mel se desejar mais doçura"
    ],
    tips: [
      "Prepare vários potes de uma vez para a semana",
      "Pode variar com pasta de amendoim ou banana"
    ]
  },
  {
    id: "fitness-009",
    name: "Salmão Assado com Espinafre 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Ômega-3 e ferro em uma refeição anti-inflamatória completa",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 20,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 filés de salmão (180g cada)",
      "300g de espinafre fresco",
      "2 dentes de alho",
      "Suco de 1 limão",
      "Azeite",
      "Sal e pimenta",
      "Endro fresco"
    ],
    steps: [
      "Preaqueça o forno a 200°C",
      "Tempere o salmão com limão, sal e pimenta",
      "Coloque em assadeira com papel manteiga",
      "Asse por 15-18 min até o centro ficar opaco",
      "Refogue o alho no azeite por 1 min",
      "Adicione o espinafre e refogue até murchar (3 min)",
      "Sirva o salmão sobre o espinafre com endro fresco"
    ],
    tips: [
      "O salmão deve estar um pouco rosado por dentro",
      "Ômega-3 reduz inflamação e acelera recuperação"
    ]
  },
  {
    id: "fitness-010",
    name: "Frittata de Vegetais Coloridos 📋", emoji: "🍕", region: "INT", estimatedCost: "low", 
    description: "Omelete italiana assada, rica em proteína e micronutrientes",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 25,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "8 ovos",
      "1 abobrinha fatiada",
      "1 pimentão vermelho",
      "1/2 cebola",
      "Cogumelos",
      "50g de queijo feta",
      "Azeite",
      "Sal e ervas"
    ],
    steps: [
      "Preaqueça o forno a 180°C",
      "Refogue a cebola em frigideira que possa ir ao forno",
      "Adicione abobrinha, pimentão e cogumelos, refogue 5 min",
      "Bata os ovos com sal e ervas",
      "Despeje os ovos sobre os vegetais",
      "Adicione o feta esmigalhado por cima",
      "Cozinhe no fogão por 3 min, depois leve ao forno por 12-15 min"
    ],
    tips: [
      "Corte em fatias como uma pizza para servir",
      "Excelente opção de meal prep - dura 4 dias"
    ]
  },
  {
    id: "fitness-011",
    name: "Ceviche Fitness de Tilápia 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Proteína branca marinada no limão, leve e nutritivo",
    category: "Fitness",
    type: "healthy",
    prepTime: 20,
    cookTime: 0,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "400g de tilápia fresca em cubos",
      "Suco de 4 limões",
      "1 pepino em cubos",
      "1 tomate em cubos",
      "Cebola roxa em fatias finas",
      "Coentro fresco",
      "Pimenta dedo-de-moça",
      "Sal"
    ],
    steps: [
      "Corte a tilápia em cubos pequenos de 1,5cm",
      "Cubra com suco de limão e sal",
      "Deixe marinar por 15-20 min - o peixe vai 'cozinhar' no ácido",
      "Adicione pepino, tomate e cebola",
      "Acrescente pimenta picada a gosto",
      "Misture com cuidado",
      "Finalize com coentro fresco"
    ],
    tips: [
      "Use peixe muito fresco e de fonte confiável",
      "Sirva imediatamente após preparo"
    ]
  },
  {
    id: "fitness-012",
    name: "Bowl de Açaí Fitness sem Açúcar 📋", emoji: "🍽️", region: "INT", estimatedCost: "low", 
    description: "Antioxidantes e energia natural, sem açúcar adicionado",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 0,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "200g de açaí congelado puro",
      "1/2 banana congelada",
      "50ml de leite de amêndoa",
      "Granola sem açúcar",
      "Frutas vermelhas frescas",
      "Sementes de chia",
      "Coco ralado seco"
    ],
    steps: [
      "Bata o açaí congelado com banana e leite de amêndoa",
      "Bata até ficar cremoso e espesso",
      "Despeje numa tigela",
      "Cubra com granola",
      "Distribua as frutas vermelhas",
      "Polvilhe chia e coco"
    ],
    tips: [
      "Use açaí puro sem xarope de guaraná",
      "Banana congelada deixa mais cremoso sem sorvete"
    ]
  },
  {
    id: "fitness-013",
    name: "Torta de Aveia e Frango 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Alta proteína, low-carb, ideal como lanche ou refeição",
    category: "Fitness",
    type: "healthy",
    prepTime: 15,
    cookTime: 30,
    difficulty: "médio",
    servings: 6,
    ingredients: [
      "300g de frango cozido e desfiado",
      "1 xícara de aveia em flocos",
      "3 ovos",
      "1 xícara de leite desnatado",
      "1 cebola picada",
      "Salsinha",
      "Sal e pimenta",
      "Azeite"
    ],
    steps: [
      "Preaqueça o forno a 180°C",
      "Bata no liquidificador: aveia, ovos, leite, sal",
      "Refogue a cebola no azeite até dourar",
      "Misture o frango com a cebola e salsinha",
      "Unte uma forma e despeje metade da massa de aveia",
      "Distribua o recheio de frango",
      "Cubra com o restante da massa",
      "Asse por 25-30 min até dourar"
    ],
    tips: [
      "Dura 3-4 dias na geladeira",
      "Pode variar o recheio com atum ou ovo"
    ]
  },
  {
    id: "fitness-014",
    name: "Panquecas de Aveia e Banana 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Café da manhã saudável sem glúten nem açúcar refinado",
    category: "Fitness",
    type: "healthy",
    prepTime: 5,
    cookTime: 15,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 bananas maduras",
      "2 ovos",
      "1/2 xícara de aveia em flocos",
      "1 colher de chá de fermento",
      "Canela",
      "Spray antiaderente"
    ],
    steps: [
      "Amasse as bananas com um garfo",
      "Adicione os ovos e misture bem",
      "Acrescente a aveia, fermento e canela",
      "Misture até incorporar homogeneamente",
      "Aqueça frigideira com spray antiaderente",
      "Despeje porções pequenas de massa",
      "Cozinhe 2-3 min cada lado até dourar"
    ],
    tips: [
      "Bananas bem maduras deixam mais doce naturalmente",
      "Sirva com pasta de amendoim e frutas"
    ]
  },
  {
    id: "fitness-015",
    name: "Smoothie Verde Detox 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Verduras, proteínas e fibras num copo refrescante",
    category: "Fitness",
    type: "healthy",
    prepTime: 5,
    cookTime: 0,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "1 xícara de espinafre fresco",
      "1 banana congelada",
      "1/2 pepino",
      "Suco de 1/2 limão",
      "200ml de água de coco",
      "1 colher de sopa de chia",
      "Gengibre a gosto"
    ],
    steps: [
      "Coloque todos os ingredientes no liquidificador",
      "Bata por 2-3 min até obter uma mistura homogênea",
      "Prove e ajuste o limão se necessário",
      "Sirva imediatamente com gelo"
    ],
    tips: [
      "Consuma imediatamente para aproveitar os nutrientes",
      "Pode adicionar proteína em pó para aumentar proteínas"
    ]
  },
  {
    id: "fitness-016",
    name: "Peito de Peru com Purê de Couve-Flor 📋", emoji: "🥩", region: "LATAM", estimatedCost: "low", 
    description: "Substituto low-carb do purê de batata, com carne magra",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 30,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "400g de peito de peru",
      "1 couve-flor pequena",
      "2 dentes de alho",
      "50ml de leite desnatado",
      "Azeite",
      "Sal, pimenta e ervas"
    ],
    steps: [
      "Cozinhe a couve-flor no vapor até ficar bem macia",
      "Bata a couve-flor com leite, alho e azeite até virar purê",
      "Tempere o peru com ervas, sal e pimenta",
      "Grelhe o peru por 7-8 min cada lado",
      "Sirva sobre o purê de couve-flor"
    ],
    tips: [
      "O purê de couve-flor tem menos de ⅓ das calorias do de batata",
      "Adicione queijo cottage ao purê para cremosidade extra"
    ]
  },
  {
    id: "fitness-017",
    name: "Salada de Grãos com Vinagrete de Mostarda 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Mix de grãos nutritivos com molho levinho e saboroso",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 25,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "1 xícara de lentilha cozida",
      "1 xícara de grão-de-bico cozido",
      "1 xícara de quinoa cozida",
      "Tomate cereja",
      "Pepino",
      "Rúcula",
      "2 colheres de sopa de mostarda Dijon",
      "3 colheres de sopa de azeite",
      "Vinagre de maçã"
    ],
    steps: [
      "Misture a lentilha, grão-de-bico e quinoa cozidos e frios",
      "Pique o pepino e corte os tomates ao meio",
      "Bata a mostarda, azeite e vinagre para o molho",
      "Misture os grãos com os vegetais",
      "Regue com o molho e misture bem",
      "Sirva sobre rúcula fresca"
    ],
    tips: [
      "Prepare os grãos em lote e guarde na geladeira",
      "Acrescente sementes de abóbora para crocância"
    ]
  },
  {
    id: "fitness-018",
    name: "Tilápia Grelhada com Arroz Integral 📋", emoji: "🐟", region: "BR", estimatedCost: "low", 
    description:
      "Peixe magro com carboidrato complexo, clássico fitness brasileiro",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 30,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 filés de tilápia",
      "1 xícara de arroz integral",
      "Limão",
      "Alho",
      "Azeite",
      "Salsinha",
      "Sal e pimenta"
    ],
    steps: [
      "Cozinhe o arroz integral conforme embalagem (aprox 30 min)",
      "Tempere a tilápia com alho, limão, sal e pimenta",
      "Grelhe em frigideira quente por 4-5 min cada lado",
      "Sirva a tilápia sobre o arroz",
      "Regue com azeite e finalize com salsinha"
    ],
    tips: [
      "O arroz integral sacia mais e tem mais fibra",
      "Pode substituir por arroz de couve-flor para versão low-carb"
    ]
  },
  {
    id: "fitness-019",
    name: "Pudim de Chia com Leite de Coco 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Lanche fitness rico em fibras e gorduras saudáveis",
    category: "Fitness",
    type: "healthy",
    prepTime: 5,
    cookTime: 0,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "4 colheres de sopa de chia",
      "300ml de leite de coco light",
      "1 colher de chá de baunilha",
      "Frutas frescas para decorar",
      "Mel ou adoçante a gosto"
    ],
    steps: [
      "Misture a chia com o leite de coco e baunilha",
      "Adicione mel ou adoçante a gosto",
      "Misture bem para não grudar",
      "Distribua em potes e leve à geladeira por 4 horas ou overnight",
      "Sirva com frutas frescas por cima"
    ],
    tips: [
      "A chia absorve o líquido e se expande, criando textura de pudim",
      "Pode preparar na véspera para praticidade"
    ]
  },
  {
    id: "fitness-020",
    name: "Hamburguer Fitness de Grão-de-Bico 📋", emoji: "🥗", region: "INT", estimatedCost: "low", 
    description:
      "Versão vegetal do hamburguer, rica em fibra e proteína vegetal",
    category: "Fitness",
    type: "healthy",
    prepTime: 15,
    cookTime: 15,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "2 latas de grão-de-bico escorrido",
      "1 ovo",
      "1/4 xícara de aveia em flocos",
      "1 cebola pequena",
      "2 dentes de alho",
      "Temperos a gosto",
      "Azeite"
    ],
    steps: [
      "Amasse o grão-de-bico com um garfo ou processador",
      "Refogue alho e cebola picados no azeite",
      "Misture o grão-de-bico amassado com ovo, aveia e temperos",
      "Adicione o refogado e misture bem",
      "Forme os hambúrgueres com as mãos úmidas",
      "Leve à geladeira por 30 min para firmar",
      "Grelhe em frigideira por 5-6 min cada lado"
    ],
    tips: [
      "Quanto mais amassado o grão-de-bico, mais firme o hambúrguer",
      "Sirva em pão integral com salada fresca"
    ]
  },
  {
    id: "fitness-021",
    name: "Shake Pós-Treino de Banana e Amendoim 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Recuperação muscular com proteína e carboidrato em equilíbrio",
    category: "Fitness",
    type: "healthy",
    prepTime: 5,
    cookTime: 0,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "1 banana madura",
      "2 colheres de sopa de pasta de amendoim",
      "200ml de leite desnatado",
      "1 scoop de whey (opcional)",
      "Gelo a gosto"
    ],
    steps: [
      "Coloque todos os ingredientes no liquidificador",
      "Bata por 1-2 min até ficar cremoso",
      "Ajuste a espessura com mais leite se necessário",
      "Sirva imediatamente com gelo"
    ],
    tips: [
      "Consuma nos primeiros 30 min após o treino",
      "Banana provê potássio e repõe eletrólitos"
    ]
  },
  {
    id: "fitness-022",
    name: "Moqueca Fitness de Peixe 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Versão mais leve da moqueca, com peixe magro e cocos light",
    category: "Fitness",
    type: "healthy",
    prepTime: 15,
    cookTime: 25,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "600g de filé de peixe branco",
      "1 lata de leite de coco light",
      "2 tomates",
      "1 pimentão",
      "Cebola e alho",
      "Coentro fresco",
      "Azeite de dendê (1 colher)",
      "Sal e pimenta"
    ],
    steps: [
      "Refogue alho e cebola em azeite",
      "Adicione o tomate e pimentão picados",
      "Refogue por 5 min até amolecer",
      "Adicione o peixe em pedaços",
      "Despeje o leite de coco e misture",
      "Cozinhe por 15 min em fogo médio",
      "Finalize com coentro e azeite de dendê"
    ],
    tips: [
      "Use leite de coco light para reduzir calorias",
      "Sirva com arroz integral ou biomassa de banana verde"
    ]
  },
  {
    id: "fitness-023",
    name: "Pasta de Atum Temperada 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Proteína prática para passar no pão integral ou comer com torrada",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 0,
    difficulty: "fácil",
    servings: 3,
    ingredients: [
      "2 latas de atum em água",
      "2 colheres de sopa de cream cheese light",
      "Suco de meio limão",
      "Salsinha e cebolinha",
      "Pimenta preta",
      "Sal a gosto"
    ],
    steps: [
      "Escorra bem o atum",
      "Misture com o cream cheese até amalgamar",
      "Adicione o suco de limão",
      "Tempere com sal e pimenta",
      "Misture com as ervas picadas"
    ],
    tips: [
      "Dura 3 dias na geladeira tampada",
      "Ótimo para lanche pré-treino com pão integral"
    ]
  },
  {
    id: "fitness-024",
    name: "Cereal Caseiro de Quinoa e Frutas 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Café da manhã energético e nutritivo, sem açúcar industrial",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 20,
    difficulty: "fácil",
    servings: 6,
    ingredients: [
      "2 xícaras de quinoa em flocos",
      "1 xícara de aveia em flocos grossos",
      "2 colheres de sopa de mel",
      "Canela",
      "Frutas secas (damascos, uva-passa)",
      "Sementes de girassol",
      "Coco ralado seco"
    ],
    steps: [
      "Preaqueça o forno a 160°C",
      "Misture quinoa e aveia com mel e canela",
      "Espalhe numa assadeira forrada com papel manteiga",
      "Asse por 15-20 min, mexendo na metade do tempo",
      "Deixe esfriar completamente",
      "Misture com frutas secas e sementes",
      "Guarde em pote hermético"
    ],
    tips: [
      "Dura 2 semanas em pote fechado",
      "Sirva com yogurt grego e frutas frescas"
    ]
  },
  {
    id: "fitness-025",
    name: "Peito de Frango Recheado com Espinafre 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Proteína magra com recheio de ferro e vitaminas",
    category: "Fitness",
    type: "healthy",
    prepTime: 15,
    cookTime: 25,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "2 peitos de frango",
      "100g de espinafre",
      "50g de queijo cottage",
      "Alho amassado",
      "Azeite",
      "Sal e pimenta",
      "Palitos de dente"
    ],
    steps: [
      "Preaqueça o forno a 200°C",
      "Abra um bolso em cada peito de frango com uma faca",
      "Refogue o espinafre com alho, escorra bem",
      "Misture espinafre com cottage",
      "Recheie os peitos e feche com palitos",
      "Tempere com sal e pimenta por fora",
      "Grelhe na frigideira 2 min cada lado, depois asse 15 min"
    ],
    tips: [
      "Use palitos de dente para selar o recheio dentro",
      "O cottage pode ser trocado por ricota"
    ]
  },
  {
    id: "fitness-026",
    name: "Sopa de Lentilha Vermelha com Cúrcuma 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Anti-inflamatória, rica em proteína vegetal e ferro",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 30,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "2 xícaras de lentilha vermelha",
      "2 cenouras",
      "1 cebola",
      "3 dentes de alho",
      "1 colher de chá de cúrcuma",
      "Cominho",
      "Azeite",
      "Sal e pimenta"
    ],
    steps: [
      "Refogue a cebola e o alho em azeite",
      "Adicione a cenoura picada e refogue mais 3 min",
      "Adicione a cúrcuma e o cominho, mexa 1 min",
      "Despeje a lentilha e cubra com 1,5L de água",
      "Cozinhe por 25 min até a lentilha desmanchar",
      "Bata metade da sopa para criar cremosidade",
      "Ajuste o sal e sirva com azeite"
    ],
    tips: [
      "Lentilha vermelha cozinha mais rápido que as outras",
      "A cúrcuma tem potente ação anti-inflamatória"
    ]
  },
  {
    id: "fitness-027",
    name: "Tapioca Proteica com Ovo e Frango 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description: "A tapioca fitness brasileira, rica em proteína e sem glúten",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 10,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "4 colheres de sopa de goma de tapioca",
      "1 ovo",
      "50g de frango desfiado grelhado",
      "Folhas de rúcula",
      "Tomate cereja",
      "Sal"
    ],
    steps: [
      "Escale a goma de tapioca numa frigideira antiaderente a médio calor",
      "Quando desgrudar, vire e cozinhe mais 1 min",
      "Em outra frigideira, faça um ovo mexido ou frito",
      "Monte a tapioca com o ovo, frango e vegetais",
      "Dobre ao meio e sirva quente"
    ],
    tips: [
      "A goma de tapioca não precisa de adição de água",
      "Versão salgada é mais adequada para pós-treino"
    ]
  },
  {
    id: "fitness-028",
    name: "Iogurte Grego com Granola e Frutas 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Lanche simples e proteico rico em probióticos",
    category: "Fitness",
    type: "healthy",
    prepTime: 5,
    cookTime: 0,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "200g de iogurte grego natural",
      "3 colheres de sopa de granola",
      "1 banana ou frutas a gosto",
      "1 colher de mel",
      "Sementes de chia"
    ],
    steps: [
      "Em uma tigela, coloque o iogurte grego",
      "Adicione a granola por cima",
      "Fatie as frutas e coloque ao lado",
      "Regue com o mel",
      "Polvilhe chia"
    ],
    tips: [
      "Use iogurte grego integral para mais saciedade",
      "Evite granola com muito açúcar"
    ]
  },
  {
    id: "fitness-029",
    name: "Almondega de Carne Magra no Molho de Tomate 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Proteína magra em formato divertido com molho saboroso",
    category: "Fitness",
    type: "healthy",
    prepTime: 20,
    cookTime: 25,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "500g de patinho moído",
      "1 ovo",
      "2 colheres de sopa de aveia",
      "Salsinha e cebola ralada",
      "2 latas de tomate pelado",
      "Alho",
      "Azeite",
      "Sal e ervas"
    ],
    steps: [
      "Misture a carne com ovo, aveia, salsinha e cebola ralada",
      "Tempere com sal e molde bolinhas",
      "Grelhe as almondegas em frigideira untada até dourar",
      "Numa panela, refogue alho, adicione o tomate pelado",
      "Tempere o molho com sal e ervas",
      "Cozinhe por 10 min, adicione as almondegas",
      "Simmer por mais 10 min"
    ],
    tips: [
      "Patinho é uma das carnes mais magras",
      "Use aveia no lugar de farinha de rosca para mais fibra"
    ]
  },
  {
    id: "fitness-030",
    name: "Bowl Mediterrâneo Fitness 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Inspirado na dieta mediterrânea, repleto de alimentos vivos",
    category: "Fitness",
    type: "healthy",
    prepTime: 15,
    cookTime: 20,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "200g de frango grelhado",
      "Quinoa cozida",
      "Grão-de-bico temperado",
      "Pepino",
      "Tomate cereja",
      "Azeitonas",
      "Queijo feta",
      "Molho de iogurte (tzatziki)"
    ],
    steps: [
      "Monte a base com a quinoa cozida",
      "Adicione o frango fatiado",
      "Distribua o grão-de-bico assado",
      "Coloque os vegetais frescos",
      "Adicione azeitonas e feta esmigalhado",
      "Finalize com molho tzatziki"
    ],
    tips: [
      "O tzatziki pode ser feito com iogurte grego, pepino ralado, alho e endro",
      "Rico em ácidos graxos do Mediterrâneo"
    ]
  },
  {
    id: "fitness-031",
    name: "Arroz de Couve-Flor com Camarão 📋", emoji: "🍤", region: "INT", estimatedCost: "low", 
    description: "Substituto low-carb do arroz com proteína marinha",
    category: "Fitness",
    type: "healthy",
    prepTime: 15,
    cookTime: 15,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "1 cabeça de couve-flor",
      "200g de camarão descascado",
      "Alho",
      "Ervas frescas",
      "Azeite",
      "Suco de limão",
      "Sal e pimenta"
    ],
    steps: [
      "Rale ou processe a couve-flor até virar 'arroz'",
      "Refogue o alho no azeite",
      "Adicione a couve-flor ralada e refogue por 5-6 min",
      "Em outra frigideira, saltei os camarões com alho e limão",
      "Misture os camarões com o 'arroz' de couve-flor",
      "Ajuste o sal e finalize com ervas frescas"
    ],
    tips: [
      "Couve-flor tem cerca de 25 cal por 100g vs 130 do arroz",
      "Não deixe o arroz de couve-flor soltar muita água"
    ]
  },
  {
    id: "fitness-032",
    name: "Hamburguer de Proteína de Soja 📋", emoji: "🍳", region: "INT", estimatedCost: "low", 
    description: "Hamburguer plant-based rico em proteína vegetal",
    category: "Fitness",
    type: "healthy",
    prepTime: 15,
    cookTime: 10,
    difficulty: "fácil",
    servings: 3,
    ingredients: [
      "1 xícara de proteína de soja texturizada grossa",
      "1 ovo",
      "1/4 xícara de aveia",
      "Temperos a gosto",
      "Cebola e alho",
      "Azeite"
    ],
    steps: [
      "Hidrate a soja em água quente por 15 min, escorra bem",
      "Refogue alho e cebola",
      "Misture a soja hidratada com ovo, aveia e temperos",
      "Forme os hambúrgueres",
      "Grelhe por 4-5 min cada lado"
    ],
    tips: [
      "Esprema bem a soja após hidratar para evitar hamburger mole",
      "Adicione fumaça líquida para sabor defumado"
    ]
  },
  {
    id: "fitness-033",
    name: "Salada de Frango com Manga e Rúcula 📋", emoji: "🥗", region: "US", estimatedCost: "low", 
    description: "Contraponto doce-amargo com proteína magra e vitaminas",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 10,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "200g de peito de frango grelhado",
      "1 manga não muito madura",
      "Rúcula fresca",
      "Castanha de caju",
      "Vinagre balsâmico",
      "Azeite",
      "Sal e pimenta"
    ],
    steps: [
      "Grelhe e fatie o frango",
      "Descasque e corte a manga em cubos",
      "Em uma tigela, combine rúcula, frango e manga",
      "Adicione as castanhas de caju",
      "Tempere com azeite, balsâmico, sal e pimenta"
    ],
    tips: [
      "A manga provê vitamina C e potencializa a absorção de ferro do frango",
      "Pode usar vinagre de maçã no lugar do balsâmico"
    ]
  },
  {
    id: "fitness-034",
    name: "Crepioca Fitness 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Fusão de crepe com tapioca, sem glúten e baixo carboidrato",
    category: "Fitness",
    type: "healthy",
    prepTime: 5,
    cookTime: 10,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "1 ovo",
      "2 colheres de sopa de goma de tapioca",
      "Recheio a escolha (frango, atum, cream cheese)"
    ],
    steps: [
      "Bata o ovo com a goma de tapioca",
      "Aqueça frigideira antiaderente",
      "Despeje a mistura e espalhe",
      "Cozinhe em fogo médio tampado por 3-4 min",
      "Vire com cuidado, cozinhe mais 2 min",
      "Recheie e dobre ao meio"
    ],
    tips: [
      "A crepioca é naturalmente sem glúten",
      "Ótima versão de pós-treino com recheio proteico"
    ]
  },
  {
    id: "fitness-035",
    name: "Quinoa com Legumes Assados 📋", emoji: "🌱", region: "INT", estimatedCost: "low", 
    description: "Prato completo de origem andina com vegetais caramelizados",
    category: "Fitness",
    type: "healthy",
    prepTime: 15,
    cookTime: 35,
    difficulty: "fácil",
    servings: 3,
    ingredients: [
      "1,5 xícaras de quinoa",
      "1 abobrinha",
      "1 berinjela",
      "1 pimentão vermelho",
      "Cebola roxa",
      "Azeite",
      "Sal e ervas mediterrâneas"
    ],
    steps: [
      "Preaqueça o forno a 200°C",
      "Corte os legumes em cubos e tempere com azeite, sal e ervas",
      "Asse por 25-30 min até caramelizar",
      "Cozinhe a quinoa em 3 xícaras de água com sal",
      "Misture os legumes com a quinoa",
      "Sirva com azeite extra e ervas frescas"
    ],
    tips: [
      "Quinoa é uma proteína completa com todos aminoácidos essenciais",
      "Legumes assados podem ser preparados com antecedência"
    ]
  },
  {
    id: "fitness-036",
    name: "Mousse de Proteína de Chocolate 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Sobremesa fitness com whey e zero culpa",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 0,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 scoops de whey sabor chocolate",
      "200g de iogurte grego",
      "2 colheres de sopa de cacau em pó",
      "Adoçante a gosto",
      "100ml de leite desnatado"
    ],
    steps: [
      "Misture o whey com iogurte grego",
      "Adicione o cacau em pó e o adoçante",
      "Despeje o leite aos poucos batendo com garfo ou mixer",
      "Leve à geladeira por 1-2 horas para firmar",
      "Sirva gelado com frutas vermelhas"
    ],
    tips: [
      "Quanto menos leite, mais firme a mousse",
      "Cacau puro tem flavonoides e é antioxidante"
    ]
  },
  {
    id: "fitness-037",
    name: "Caldo de Legumes com Frango 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Caldo nutritivo e reconfortante, low-calorie e termogênico",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 40,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "300g de frango em cubos",
      "2 cenouras",
      "2 talos de salsão",
      "Cebola",
      "Alho",
      "Cúrcuma",
      "Gengibre",
      "Sal e salsinha"
    ],
    steps: [
      "Refogue alho e cebola",
      "Adicione o frango e sele por 5 min",
      "Adicione cenoura e salsão picados",
      "Refire com cúrcuma e gengibre ralado",
      "Cubra com 1,5L de água e cozinhe 30 min",
      "Desfie o frango dentro do caldo",
      "Ajuste o sal e finalize com salsinha"
    ],
    tips: [
      "Gengibre e cúrcuma são termogênicos e anti-inflamatórios",
      "Excelente opção para dias de recovery"
    ]
  },
  {
    id: "fitness-038",
    name: "Muffin de Aveia e Blueberry 📋", emoji: "🍳", region: "INT", estimatedCost: "low", 
    description: "Lanche fitness sem açúcar refinado, rico em antioxidantes",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 20,
    difficulty: "fácil",
    servings: 12,
    ingredients: [
      "2 xícaras de aveia em flocos",
      "2 bananas maduras",
      "2 ovos",
      "1/2 xícara de iogurte grego",
      "1 xícara de blueberries",
      "1 colher de chá de fermento",
      "Canela"
    ],
    steps: [
      "Preaqueça o forno a 180°C",
      "Amasse as bananas e misture com os ovos e iogurte",
      "Adicione a aveia, fermento e canela",
      "Misture até incorporar, mas não bata demais",
      "Acrescente as blueberries com cuidado",
      "Distribua em forminhas de muffin",
      "Asse por 18-20 min"
    ],
    tips: [
      "Pode substituir blueberry por mirtilo ou framboesa",
      "Congela bem - ótimo para ter sempre disponível"
    ]
  },
  {
    id: "fitness-039",
    name: "Stir-Fry de Legumes com Tofu 📋", emoji: "🌱", region: "INT", estimatedCost: "low", 
    description:
      "Proteína vegetal de soja com vegetais em wok, inspirado na culinária asiática saudável",
    category: "Fitness",
    type: "healthy",
    prepTime: 15,
    cookTime: 15,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "250g de tofu firme",
      "Brócolis",
      "Cenoura",
      "Pimentão colorido",
      "Cebola",
      "Molho shoyu light",
      "Gengibre ralado",
      "Azeite de gergelim"
    ],
    steps: [
      "Corte o tofu em cubos e seque com papel toalha",
      "Frite o tofu em óleo quente até dourar todos os lados",
      "Reserve o tofu e na mesma frigideira, refogue vegetais no ponto crocante",
      "Adicione gengibre, shoyu e azeite de gergelim",
      "Devolva o tofu à panela",
      "Misture e sirva imediatamente"
    ],
    tips: [
      "Tofu firme e bem seco fica crocante",
      "Use shoyu light para reduzir sódio"
    ]
  },
  {
    id: "fitness-040",
    name: "Sanduíche Natural Integral 📋", emoji: "🥪", region: "LATAM", estimatedCost: "low", 
    description: "Lanche prático e nutritivo para o dia a dia fitness",
    category: "Fitness",
    type: "healthy",
    prepTime: 10,
    cookTime: 0,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "2 fatias de pão integral",
      "Peito de peru sem sal",
      "Queijo cottage",
      "Alface e tomate",
      "Pepino fatiado",
      "Mostarda escura"
    ],
    steps: [
      "Espalhe o cottage em uma fatia",
      "Adicione a mostarda na outra fatia",
      "Monte com peito de peru, alface, tomate e pepino",
      "Corte no meio e sirva"
    ],
    tips: [
      "Pão integral tem 3x mais fibra que o branco",
      "Adote peito de peru light sem conservantes"
    ]
  }
];
