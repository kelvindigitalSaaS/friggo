import { Recipe } from "@/types/friggo";

export const receitasPeixes: Recipe[] = [
  {
    id: "peixes-001",
    name: "Filé de Tilápia ao Limão e Ervas 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Tilápia grelhada levinha com manteiga de ervas e limão",
    category: "Peixes",
    type: "dinner",
    prepTime: 10,
    cookTime: 15,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "4 filés de tilápia",
      "Suco de 2 limões",
      "Raspas de limão",
      "2 colheres de manteiga",
      "Salsinha e cebolinha",
      "Alho",
      "Sal e pimenta"
    ],
    steps: [
      "Tempere os filés com sal, pimenta, alho e limão",
      "Refogue em manteiga por 3-4 min cada lado",
      "Adicione raspas e suco de limão",
      "Finalize com ervas frescas"
    ],
    tips: [
      "Tilápia é delicada — não vire mais de uma vez para não desmanchar",
      "Peixe está pronto quando a carne opaca e descama facilmente"
    ]
  },
  {
    id: "peixes-002",
    name: "Salmão Grelhado com Molho de Maracujá 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Salmão suculento com o agridoce intenso do maracujá",
    category: "Peixes",
    type: "dinner",
    prepTime: 10,
    cookTime: 15,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 postas de salmão",
      "Polpa de 2 maracujás",
      "2 colheres de mel",
      "1 colher de manteiga",
      "Sal e pimenta",
      "Cebolinha e hortelã"
    ],
    steps: [
      "Tempere o salmão com sal e pimenta",
      "Grelhe em frigideira bem quente por 3-4 min cada lado",
      "Prepare o molho: polpa do maracujá + mel na frigideira",
      "Reduza o molho por 2 min",
      "Adicione manteiga ao final",
      "Sirva o salmão com o molho de maracujá"
    ],
    tips: [
      "Salmão com pele: inicie pelo lado da pele para ficar crocante",
      "Centro rosado indica ponto perfeito — não cozinhe demais"
    ]
  },
  {
    id: "peixes-003",
    name: "Bacalhau à Brás 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "O clássico bacalhau português com batata palha e ovo",
    category: "Peixes",
    type: "dinner",
    prepTime: 20,
    cookTime: 20,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "400g de bacalhau dessalgado desfiado",
      "400g de batata palha",
      "4 ovos batidos",
      "1 cebola grande",
      "Alho e azeite",
      "Salsinha e azeitonas pretas",
      "Pimenta"
    ],
    steps: [
      "Dessalgue o bacalhau em água por 48 horas (troque a água)",
      "Refogue a cebola e alho fatiados em azeite até caramelizar",
      "Adicione o bacalhau desfiado",
      "Adicione a batata palha",
      "Adicione os ovos batidos e mexa até cremoso",
      "Finalize com salsinha e azeitonas"
    ],
    tips: [
      "O bacalhau à brás deve ser cremoso — os ovos não podem firmar demais",
      "Retire do fogo ANTES dos ovos coagularem completamente"
    ]
  },
  {
    id: "peixes-004",
    name: "Atum Fresco Grelhado com Tapenade 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Atum fresco selado com pasta de azeitonas",
    category: "Peixes",
    type: "dinner",
    prepTime: 15,
    cookTime: 5,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "2 postas de atum fresco (200g cada)",
      "100g de azeitonas pretas",
      "1 colher de alcaparras",
      "Alho",
      "Azeite",
      "Tomilho",
      "Sal e pimenta"
    ],
    steps: [
      "Processe azeitonas, alcaparras, alho e azeite para a tapenade",
      "Tempere o atum com sal e pimenta",
      "Sele em frigideira de ferro muito quente: 1-2 min por lado",
      "O atum deve estar rosado no centro",
      "Sirva com a tapenade"
    ],
    tips: [
      "Atum fresco deve ser selado rapidamente — cozinhar demais perde textura",
      "Centro rosado avermelhado é o ponto ideal — sashimi-style"
    ]
  },
  {
    id: "peixes-005",
    name: "Peixe à Fiorentina 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Filé de peixe branco sobre cama de espinafre cremoso",
    category: "Peixes",
    type: "dinner",
    prepTime: 15,
    cookTime: 20,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "4 filés de peixe branco (robalo, pescada)",
      "300g de espinafre fresco",
      "200ml de creme de leite",
      "Alho e cebola",
      "Manteiga",
      "Noz-moscada",
      "Parmesão"
    ],
    steps: [
      "Refogue alho e espinafre na manteiga",
      "Adicione creme de leite e noz-moscada",
      "Cozinhe até engrossar",
      "Distribua o espinafre cremoso numa assadeira",
      "Posicione os filés por cima",
      "Polvilhe parmesão e asse a 200°C por 15 min"
    ],
    tips: [
      "Espinafre murcha muito — use uma quantidade que pareça excessiva cru",
      "Fiorentina sempre significa 'sobre espinafre' na culinária clássica"
    ]
  },
  {
    id: "peixes-006",
    name: "Fish and Chips Britânico 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Peixe empanado em massa de cerveja com chips douradas",
    category: "Peixes",
    type: "dinner",
    prepTime: 20,
    cookTime: 25,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "4 filés de bacalhau fresco ou merluza",
      "150g de farinha",
      "200ml de cerveja gelada",
      "Sal e pimenta",
      "Batatas grandes para os chips",
      "Molho tártaro para servir"
    ],
    steps: [
      "Corte batatas em chips grossas e frite a 160°C por 5 min",
      "Para a massa: bata farinha com cerveja gelada até liso",
      "Tempere o peixe",
      "Mergulhe na massa e frite a 180°C por 6-8 min",
      "Frite os chips novamente a 190°C para crispar",
      "Sirva com molho tártaro e vinagre de malte"
    ],
    tips: [
      "Cerveja gelada dá leveza à massa de fritura",
      "Dupla fritura das batatas é o segredo dos chips perfeitos"
    ]
  },
  {
    id: "peixes-007",
    name: "Moqueca de Peixe Baiana 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Moqueca clássica de peixe no dendê com leite de coco",
    category: "Peixes",
    type: "dinner",
    prepTime: 20,
    cookTime: 30,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "800g de filés de peixe branco firme",
      "1 lata de leite de coco",
      "2 tomates",
      "1 pimentão amarelo",
      "Cebola, alho e coentro",
      "Azeite de dendê",
      "Pimenta dedo-de-moça",
      "Limão"
    ],
    steps: [
      "Marine o peixe em limão e sal por 30 min",
      "Em panela de barro, refogue cebola, tomate e pimentão",
      "Adicione alho e coentro",
      "Adicione o peixe",
      "Despeje o leite de coco",
      "Tampe e cozinhe por 20 min em fogo médio",
      "Finalize com dendê e coentro fresco"
    ],
    tips: [
      "Panela de barro distribui o calor uniformemente",
      "Dendê no final preserva a cor e o sabor"
    ]
  },
  {
    id: "peixes-008",
    name: "Ceviche de Peixe Branco 📋", emoji: "🐟", region: "LATAM", estimatedCost: "low", 
    description: "Peixe cítrico marinado na hora estilo peruano",
    category: "Peixes",
    type: "snack",
    prepTime: 20,
    cookTime: 0,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "400g de peixe branco fresquíssimo (robalo, linguado)",
      "Suco de 8 limões tahiti",
      "1 ají amarillo ou pimenta vermelha",
      "1/2 cebola roxa",
      "Coentro",
      "Sal",
      "Milho cozido e batata doce para servir"
    ],
    steps: [
      "Corte o peixe em cubos de 1,5cm",
      "Tempere com sal e deixe na geladeira",
      "Esprema os limões e adicione ao peixe",
      "Marine por 10-15 min — peixe deve opacificar",
      "Adicione cebola roxa, pimenta e coentro",
      "Sirva com milho e batata doce"
    ],
    tips: [
      "Peixe DEVE ser muito fresco pois não é aquecido",
      "A acidez do limão 'cozinha' o peixe quimicamente — chamado de 'leche de tigre'"
    ]
  },
  {
    id: "peixes-009",
    name: "Truta Grelhada com Amêndoas Torradas 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Truta de rio clássica com manteiga de amêndoas",
    category: "Peixes",
    type: "dinner",
    prepTime: 10,
    cookTime: 15,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 trutas inteiras limpas",
      "50g de amêndoas laminadas",
      "Manteiga",
      "Limão",
      "Salsinha",
      "Sal e pimenta"
    ],
    steps: [
      "Tempere as trutas com sal, pimenta e limão",
      "Grelhe em frigideira com manteiga por 5-6 min cada lado",
      "Toast as amêndoas em separado até dourar",
      "Faça o beurre noisette (manteiga castanha) na frigideira",
      "Adicione as amêndoas e suco de limão",
      "Sirva a truta com o molho de amêndoas"
    ],
    tips: [
      "Beurre noisette (manteiga de avelã) é a manteiga levemente queimada que está com cor de avelã",
      "Peixe inteiro fica mais suculento que o filé"
    ]
  },
  {
    id: "peixes-010",
    name: "Camarão ao Alho e Óleo 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Camarão salteado em azeite com muito alho",
    category: "Peixes",
    type: "dinner",
    prepTime: 15,
    cookTime: 10,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "600g de camarão médio limpo",
      "8 dentes de alho fatiados",
      "Azeite extravirgem generoso",
      "Pimenta calabresa",
      "Salsinha",
      "Limão",
      "Sal"
    ],
    steps: [
      "Aqueça o azeite com o alho em fogo médio",
      "Deixe o alho dourar lentamente",
      "Aumente o fogo e adicione o camarão",
      "Salteie por 2-3 min cada lado",
      "Adicione pimenta calabresa",
      "Finalize com salsinha e limão"
    ],
    tips: [
      "Camarão cozinha em MINUTOS — cozinhar demais deixa borrachudo",
      "Guarde os cascalhos para um caldo de camarão rico"
    ]
  },
  {
    id: "peixes-011",
    name: "Salmão ao Forno com Crosta de Ervas 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Salmão com crosta aromática assado perfeitamente",
    category: "Peixes",
    type: "dinner",
    prepTime: 15,
    cookTime: 20,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "1 posta grande de salmão (700g)",
      "Farinha de rosca panko",
      "Salsinha, cebolinha e endro",
      "Alho",
      "Azeite",
      "Raspas de limão",
      "Sal e pimenta"
    ],
    steps: [
      "Misture panko com ervas, alho, azeite, raspas de limão",
      "Tempere o salmão",
      "Pressione a crosta de ervas sobre o salmão",
      "Asse a 200°C por 15-18 min"
    ],
    tips: [
      "Centro ainda levemente translúcido é o ponto perfeito",
      "Panko japonês dá crosta mais crocante que farinha de rosca comum"
    ]
  },
  {
    id: "peixes-012",
    name: "Peixe à la Meunière 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description:
      "Técnica francesa clássica de filé de peixe na farinha com manteiga",
    category: "Peixes",
    type: "dinner",
    prepTime: 10,
    cookTime: 10,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "2 filés de linguado ou saint peter",
      "Farinha para empanar",
      "100g de manteiga",
      "Suco de 1 limão",
      "Salsinha",
      "Sal e pimenta branca"
    ],
    steps: [
      "Tempere o peixe com sal e pimenta",
      "Empane levemente na farinha, sacuda o excesso",
      "Frite em manteiga por 2-3 min por lado",
      "Reserve o peixe aquecido",
      "Na mesma frigideira, faça beurre noisette",
      "Adicione limão e salsinha",
      "Despeje o molho sobre o peixe"
    ],
    tips: [
      "A farinha deve ser uma película fina, não uma crosta",
      "Beurre meunière é um dos molhos mais elegantes da culinária francesa"
    ]
  },
  {
    id: "peixes-013",
    name: "Robalo à Acqua Pazza 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Peixe cozido em 'água louca' italiana com tomates e ervas",
    category: "Peixes",
    type: "dinner",
    prepTime: 10,
    cookTime: 20,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "1 robalo inteiro ou 2 filés",
      "200g de tomates cereja",
      "Vinho branco",
      "Alho fatiado",
      "Azeitonas",
      "Salsinha e manjericão",
      "Azeite"
    ],
    steps: [
      "Refogue alho em azeite",
      "Adicione tomates cereja e deixe murchar",
      "Adicione vinho branco",
      "Adicione o peixe",
      "Tampe e cozinhe por 15 min",
      "Adicione azeitonas e ervas",
      "Sirva com pão rústico para o caldo"
    ],
    tips: [
      "Acqua pazza significa 'água louca' — o caldo é levemente intenso",
      "Pão para absorver o caldo é obrigatório"
    ]
  },
  {
    id: "peixes-014",
    name: "Escabeche de Peixe 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description:
      "Peixe frito em molho agridoce conservado com vinagre e especiarias",
    category: "Peixes",
    type: "dinner",
    prepTime: 20,
    cookTime: 30,
    difficulty: "médio",
    servings: 6,
    ingredients: [
      "800g de peixe firme em postas",
      "Cebola em meias-luas",
      "Pimentão",
      "Vinagre de vinho branco",
      "Azeite",
      "Louro, pimenta em grão, cravo",
      "Sal e farinha para empanar"
    ],
    steps: [
      "Tempere e frite as postas de peixe levemente enfarinhadas",
      "Reserve",
      "Refogue cebola e pimentão em azeite",
      "Adicione vinagre, louro, pimenta e cravo",
      "Deixe ferver 5 min",
      "Despeje sobre o peixe",
      "Deixe marinar por pelo menos 2 horas"
    ],
    tips: [
      "Escabeche é melhor ao dia seguinte — o sabor absorve",
      "Dura até 1 semana na geladeira"
    ]
  },
  {
    id: "peixes-015",
    name: "Caldeirada Portuguesa 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Ensopado de vários peixes estilo português",
    category: "Peixes",
    type: "dinner",
    prepTime: 25,
    cookTime: 35,
    difficulty: "médio",
    servings: 6,
    ingredients: [
      "1kg de peixes variados (robalo, cação, mariscos)",
      "3 batatas",
      "2 tomates",
      "Cebola, alho e azeite abundante",
      "Coentro e salsinha",
      "Vinho branco",
      "Pimentão e louro"
    ],
    steps: [
      "Em camadas numa panela: cebola, batata, peixe, tomate, repetir",
      "Regue com azeite e vinho branco",
      "Tempere cada camada com sal e ervas",
      "Tampe e cozinhe em fogo médio por 30 min sem mexer",
      "Sirva com pão rústico"
    ],
    tips: [
      "Não mexa durante o cozimento para não desmanchar as camadas",
      "Caldeirada deve ter caldo abundante e saboroso de azeite e peixe"
    ]
  }
];
