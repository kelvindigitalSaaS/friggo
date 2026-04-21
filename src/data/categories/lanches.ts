import { Recipe } from "@/types/kaza";

export const receitasLanches: Recipe[] = [
  {
    id: "lanches-001",
    name: "Coxinha de Frango Caseira 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "A rainha dos salgados brasileiros, crocante por fora e cremosa por dentro",
    category: "Lanches",
    type: "snack",
    prepTime: 40,
    cookTime: 30,
    difficulty: "difícil",
    servings: 20,
    ingredients: [
      "500g de peito de frango cozido e desfiado",
      "2 xícaras de caldo de frango",
      "2 xícaras de farinha de trigo",
      "1 cebola ralada",
      "Cream cheese",
      "Salsinha",
      "Óleo para fritar",
      "Farinha de rosca",
      "2 ovos batidos"
    ],
    steps: [
      "Cozinhe o frango no caldo e desfie",
      "Refogue cebola, adicione o frango, cream cheese e salsinha",
      "Reserve o caldo quente e misture com a farinha de trigo",
      "Mexa vigorosamente até formar massa que desgruda da panela",
      "Deixe a massa esfriar até poder manusear",
      "Molde as coxinhas com o recheio",
      "Passe no ovo e farinha de rosca",
      "Frite em óleo quente a 180°C por 4-5 min"
    ],
    tips: [
      "A massa deve ser sovada bem para ficar lisa",
      "A coxinha resfriada fica mais fácil de modelar"
    ]
  },
  {
    id: "lanches-002",
    name: "Esfiha Aberta de Carne 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description: "Salgado árabe-brasileiro com recheio de carne temperada",
    category: "Lanches",
    type: "snack",
    prepTime: 60,
    cookTime: 20,
    difficulty: "médio",
    servings: 24,
    ingredients: [
      "3 xícaras de farinha de trigo",
      "1 colher de sopa de fermento biológico",
      "1 copo de leite morno",
      "3 colheres de sopa de margarina",
      "300g de carne moída",
      "Tomate picado",
      "Cebola",
      "Suco de limão",
      "Sal e pimenta"
    ],
    steps: [
      "Dissolva o fermento no leite morno com uma pitada de açúcar",
      "Misture farinha, margarina, sal e o fermento",
      "Sove a massa por 10 min, cubra e deixe crescer 1 hora",
      "Refogue a carne com cebola, tomate, limão e temperos",
      "Abra a massa e corte em discos",
      "Coloque o recheio no centro",
      "Dobre as bordas em triângulo e leve ao forno 180°C por 20 min"
    ],
    tips: [
      "A massa deve dobrar de tamanho antes de usar",
      "Pode rechear também com frango ou queijo"
    ]
  },
  {
    id: "lanches-003",
    name: "Pastel Frito de Queijo 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Pastel crocante e delicioso com queijo derretido",
    category: "Lanches",
    type: "snack",
    prepTime: 30,
    cookTime: 15,
    difficulty: "médio",
    servings: 16,
    ingredients: [
      "2 xícaras de farinha de trigo",
      "100ml de água quente",
      "2 colheres de sopa de manteiga",
      "1 colher de chá de sal",
      "1 colher de sopa de cachaça",
      "200g de queijo mussarela",
      "Óleo para fritar"
    ],
    steps: [
      "Misture farinha, manteiga derretida, sal e cachaça",
      "Adicione água quente aos poucos até formar massa lisa",
      "Deixe descansar tampada por 30 min",
      "Abra a massa bem fina com rolo",
      "Corte retângulos e coloque queijo no centro",
      "Dobre e pressione bem as bordas com garfo",
      "Frite em óleo quente até dourar"
    ],
    tips: [
      "A cachaça deixa a massa crocante e bolhosa",
      "O óleo deve estar bem quente para a massa ficar crocante"
    ]
  },
  {
    id: "lanches-004",
    name: "Kibe Frito 📋", emoji: "🥩", region: "BR", estimatedCost: "low", 
    description: "Salgado árabe tradicional no Brasil, crocante e saboroso",
    category: "Lanches",
    type: "snack",
    prepTime: 30,
    cookTime: 20,
    difficulty: "médio",
    servings: 18,
    ingredients: [
      "500g de carne bovina moída",
      "1 xícara de trigo para kibe",
      "1 cebola grande",
      "Hortelã fresca",
      "Sal",
      "Pimenta síria",
      "Canela",
      "Óleo para fritar"
    ],
    steps: [
      "Hidrate o trigo por 30 min em água fria, escorra bem",
      "Misture a carne moída com o trigo, cebola ralada, hortelã, sal e temperos",
      "Sove bem até formar uma pasta",
      "Molde os kibes em formato oval",
      "Faça um buraco no centro para o interior cozinhar bem",
      "Frite em óleo a 170°C por 6-8 min",
      "Escorra em papel toalha"
    ],
    tips: [
      "O trigo deve estar bem escorrido para a massa firmar",
      "Temperatura do óleo controlada evita kibe estourar"
    ]
  },
  {
    id: "lanches-005",
    name: "Mini Pizza no Pão Sírio 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Pizza rápida no pão árabe, crocante e versátil",
    category: "Lanches",
    type: "snack",
    prepTime: 10,
    cookTime: 10,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "2 pães sírios",
      "4 colheres de sopa de molho de tomate",
      "150g de mussarela",
      "Pepperoni ou presunto",
      "Orégano",
      "Azeite"
    ],
    steps: [
      "Preaqueça o forno a 200°C ou use airfryer",
      "Abra os pães sírios ao meio",
      "Espalhe o molho de tomate",
      "Distribua a mussarela e os frios",
      "Polvilhe orégano e regue com azeite",
      "Asse por 8-10 min até crocante e derretido"
    ],
    tips: [
      "O pão sírio fica super crocante no forno",
      "Ótimo para usar ingredientes que estão acabando"
    ]
  },
  {
    id: "lanches-006",
    name: "Chips de Batata Caseiro 📋", emoji: "🍽️", region: "INT", estimatedCost: "low", 
    description: "Mais saudável que o industrializado, temperado do seu jeito",
    category: "Lanches",
    type: "snack",
    prepTime: 15,
    cookTime: 30,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "4 batatas grandes",
      "Azeite",
      "Sal",
      "Páprica defumada",
      "Alho em pó",
      "Ervas a gosto"
    ],
    steps: [
      "Fatie as batatas muito finhas (2mm) com mandoline ou faca afiada",
      "Coloque em água gelada por 20 min para retirar amido",
      "Seque bem com papel toalha",
      "Misture com azeite, sal e temperos",
      "Espalhe em assadeira sem sobrepor",
      "Asse a 180°C por 25-30 min, virando na metade"
    ],
    tips: [
      "Quanto mais fino o corte, mais crocante fica",
      "Batata bem seca é essencial para crocância"
    ]
  },
  {
    id: "lanches-007",
    name: "Bolinha de Queijo Frita 📋", emoji: "🍳", region: "INT", estimatedCost: "low", 
    description:
      "Bolinha crocante de queijo que derrete ao dar a primeira mordida",
    category: "Lanches",
    type: "snack",
    prepTime: 20,
    cookTime: 10,
    difficulty: "médio",
    servings: 20,
    ingredients: [
      "300g de queijo parmesão ralado",
      "300g de queijo mussarela",
      "3 ovos",
      "Farinha de rosca",
      "Farinha de trigo",
      "Óleo para fritar"
    ],
    steps: [
      "Misture os queijos ralados com 1 ovo",
      "Molde pequenas bolinhas",
      "Congele as bolinhas por 2 horas (fundamental)",
      "Passe na farinha, ovo batido e farinha de rosca",
      "Frite em óleo quente por 2-3 min"
    ],
    tips: [
      "Congelar as bolinhas antes de fritar evita que desmantelhem",
      "Quanto mais quente o óleo, menos absorve gordura"
    ]
  },
  {
    id: "lanches-008",
    name: "Sanduíche Bauru Caseiro 📋", emoji: "🥩", region: "US", estimatedCost: "low", 
    description:
      "O clássico sanduíche paulista com carne assada e queijo derretido",
    category: "Lanches",
    type: "snack",
    prepTime: 10,
    cookTime: 15,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 pãezinhos ou pão francês",
      "200g de rosbife ou carne assada fatiada",
      "Queijo mussarela",
      "Tomate fatiado",
      "Pepino em conserva",
      "Orégano"
    ],
    steps: [
      "Corte os pãezinhos ao meio",
      "Coloque as fatias de carne",
      "Cubra com mussarela",
      "Adicione tomate e pepino",
      "Polvilhe orégano",
      "Leve ao forno ou chapa para derreter o queijo"
    ],
    tips: [
      "Carne assada pode ser substituída por rosbife de delicatessen",
      "Pode usar pão de forma para versão mais simples"
    ]
  },
  {
    id: "lanches-009",
    name: "Tortilha de Batata a Española 📋", emoji: "🍳", region: "INT", estimatedCost: "low", 
    description:
      "Omelete espanhola com batata e cebola, versátil para qualquer hora",
    category: "Lanches",
    type: "snack",
    prepTime: 15,
    cookTime: 25,
    difficulty: "médio",
    servings: 6,
    ingredients: [
      "4 batatas médias",
      "6 ovos",
      "1 cebola grande",
      "Azeite",
      "Sal"
    ],
    steps: [
      "Descasque e corte as batatas em fatias finas",
      "Confite as batatas em azeite abundante em fogo baixo por 15 min",
      "Escorra as batatas reservando o azeite",
      "Bata os ovos com sal, adicione a cebola e as batatas confitadas",
      "Numa frigideira com pouco azeite, despeje a mistura",
      "Cozinhe em fogo baixo tampado, virando com um prato"
    ],
    tips: [
      "A tortilha deve ficar um pouco cremosa por dentro, não seca",
      "Pode ser servida quente ou fria"
    ]
  },
  {
    id: "lanches-010",
    name: "Spring Roll Vegetariano Caseiro 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Rolinhos crocantes com recheio de vegetais salteados",
    category: "Lanches",
    type: "snack",
    prepTime: 30,
    cookTime: 15,
    difficulty: "médio",
    servings: 12,
    ingredients: [
      "12 folhas de massa de spring roll",
      "200g de repolho fatiado",
      "2 cenouras raladas",
      "Cogumelos fatiados",
      "Broto de feijão",
      "Shoyu",
      "Gengibre",
      "Óleo para fritar"
    ],
    steps: [
      "Refogue todos os vegetais em fogo alto com shoyu e gengibre",
      "Deixe esfriar completamente",
      "Coloque uma porção do recheio numa ponta da folha",
      "Enrole firmemente dobrando as laterais",
      "Sele a ponta com amido de milho dissolvido em água",
      "Frite em óleo a 180°C por 3-4 min"
    ],
    tips: [
      "Recheio frio evita que a massa estoure na fritura",
      "Pode assar no forno com spray de óleo para versão mais leve"
    ]
  },
  {
    id: "lanches-011",
    name: "Bruschetta Italiana 📋", emoji: "🍽️", region: "INT", estimatedCost: "low", 
    description: "Torrada italiana com tomate fresco e manjericão perfumado",
    category: "Lanches",
    type: "snack",
    prepTime: 10,
    cookTime: 5,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "1 baguete ou pão italiano",
      "4 tomates maduros",
      "2 dentes de alho",
      "Azeite extra virgem",
      "Manjericão fresco",
      "Sal e pimenta"
    ],
    steps: [
      "Corte o pão em fatias e toste no forno ou chapa",
      "Esfregue alho cortado ao meio nas fatias ainda quentes",
      "Corte os tomates em cubos e tempere com sal e azeite",
      "Desfie o manjericão e misture com o tomate",
      "Coloque o tomate sobre as torradas",
      "Regue com azeite e sirva imediatamente"
    ],
    tips: [
      "Use tomates bem maduros para mais sabor",
      "O azeite deve ser de qualidade, extra virgem"
    ]
  },
  {
    id: "lanches-012",
    name: "Tostex de Queijo e Presunto 📋", emoji: "🥪", region: "INT", estimatedCost: "low", 
    description: "O clássico lanche quente que nunca sai de moda",
    category: "Lanches",
    type: "snack",
    prepTime: 5,
    cookTime: 8,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "4 fatias de pão de forma",
      "100g de queijo prato ou mussarela",
      "100g de presunto",
      "Manteiga"
    ],
    steps: [
      "Passe manteiga no lado externo de todas as fatias",
      "Monte o sanduíche com queijo e presunto",
      "Coloque na sanduicheira ou frigideira tampada",
      "Prense e cozinhe por 3-4 min até dourar",
      "Vire e doure o outro lado"
    ],
    tips: [
      "Manteiga no lado de fora garante dourado perfeito",
      "Pode adicionar tomate e orégano para um tostex caprichado"
    ]
  },
  {
    id: "lanches-013",
    name: "Cachorro Quente Gourmet Caseiro 📋", emoji: "🍽️", region: "INT", estimatedCost: "low", 
    description:
      "Versão caseira do cachorro-quente de carrinho com molhos variados",
    category: "Lanches",
    type: "snack",
    prepTime: 15,
    cookTime: 10,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "4 salsichas",
      "4 pãezinhos de hot-dog",
      "Molho de tomate",
      "Mostarda",
      "Maionese",
      "Milho em conserva",
      "Ervilha em conserva",
      "Batata palha"
    ],
    steps: [
      "Cozinhe as salsichas em água fervente por 5 min ou na grelha",
      "Aqueça os pãezinhos por 2 min no forno",
      "Corte os pãezinhos e coloque a salsicha",
      "Regue com molho de tomate, mostarda e maionese",
      "Adicione milho, ervilha e batata palha",
      "Sirva imediatamente"
    ],
    tips: [
      "Salsicha grelhada tem muito mais sabor que só cozida",
      "Molho de tomate caseiro faz toda a diferença"
    ]
  },
  {
    id: "lanches-014",
    name: "Pão de Queijo Mineiro Tradicional 📋", emoji: "🍝", region: "BR", estimatedCost: "low", 
    description:
      "O lanche brasileiro mais amado, crocante fora e mastigável dentro",
    category: "Lanches",
    type: "snack",
    prepTime: 15,
    cookTime: 25,
    difficulty: "fácil",
    servings: 30,
    ingredients: [
      "4 xícaras de polvilho o azedo",
      "1 xícara de leite",
      "1/2 xícara de óleo",
      "1 colher de chá de sal",
      "2 ovos",
      "200g de queijo parmesão ralado",
      "100g de queijo minas curado"
    ],
    steps: [
      "Escalde o polvilho com o leite e óleo ferventes",
      "Misture bem e deixe amornar",
      "Acrescente os ovos um a um",
      "Adicione os queijos e o sal",
      "Sove até formar massa lisa e pegajosa",
      "Molde bolinhas e coloque em assadeira untada",
      "Asse a 200°C por 20-25 min"
    ],
    tips: [
      "Polvilho azedo dá mais crocância que o doce",
      "A massa crua pode ser congelada por 3 meses"
    ]
  },
  {
    id: "lanches-015",
    name: "Nuggets de Frango Caseiro 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description:
      "Nuggets sem conservantes, muito mais gostosos que os industriais",
    category: "Lanches",
    type: "snack",
    prepTime: 20,
    cookTime: 15,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "500g de peito de frango",
      "1/2 xícara de maionese",
      "1 xícara de farinha panko",
      "Temperos: sal, alho, páprica",
      "2 ovos"
    ],
    steps: [
      "Corte o frango em pedaços de 3cm",
      "Marine na maionese com os temperos por 30 min",
      "Passe em farinha de trigo, ovo batido e panko",
      "Leve ao airfryer a 200°C por 12-15 min",
      "Ou frite em óleo a 180°C por 6-8 min"
    ],
    tips: [
      "Panko deixa mais crocante que farinha de rosca comum",
      "Airfryer é uma ótima alternativa mais saudável"
    ]
  },
  {
    id: "lanches-016",
    name: "Empadinha de Frango 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Tortinha salgada com massa sequinha e recheio cremoso",
    category: "Lanches",
    type: "snack",
    prepTime: 30,
    cookTime: 25,
    difficulty: "médio",
    servings: 12,
    ingredients: [
      "2 xícaras de farinha de trigo",
      "150g de manteiga",
      "1 gema",
      "1 colher de sopa de água gelada",
      "300g de frango desfiado",
      "Caldo de frango",
      "Cream cheese",
      "Salsinha",
      "Sal"
    ],
    steps: [
      "Misture a farinha com manteiga até formar farofa",
      "Adicione a gema e água gelada, forme a massa",
      "Leve à geladeira por 30 min enrolada em filme",
      "Prepare o recheio: misture frango, cream cheese, salsinha",
      "Forre forminhas com a massa, coloque o recheio",
      "Cubra com mais massa e feche as bordas",
      "Pincele com gema e asse a 180°C por 25 min"
    ],
    tips: [
      "Massa fria é mais fácil de trabalhar",
      "Nunca deixe o recheio molhado vazar pela borda"
    ]
  },
  {
    id: "lanches-017",
    name: "Açaí na Tigela Cremoso 📋", emoji: "🍽️", region: "BR", estimatedCost: "low", 
    description: "O lanche favorito das praias e academia do Brasil",
    category: "Lanches",
    type: "snack",
    prepTime: 5,
    cookTime: 0,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "200g de açaí congelado com guaraná",
      "1/2 banana",
      "Granola",
      "Banana fatiada",
      "Leite condensado ou mel"
    ],
    steps: [
      "Bata o açaí com banana no liquidificador até cremoso",
      "Use o mínimo de líquido possível",
      "Transfira para uma tigela",
      "Adicione a granola",
      "Decore com banana fatiada",
      "Adicione leite condensado ou mel a gosto"
    ],
    tips: [
      "Quanto menos líquido, mais cremoso e gelado",
      "Adicione morango, kiwi ou guaraná líquido por cima"
    ]
  },
  {
    id: "lanches-018",
    name: "Tapioca Doce com Coco e Brigadeiro 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Sobremesa nordestina que vira lanche irresistível",
    category: "Lanches",
    type: "snack",
    prepTime: 15,
    cookTime: 10,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "1 xícara de goma de tapioca",
      "1 lata de leite condensado",
      "1 colher de sopa de manteiga",
      "3 colheres de cacau em pó",
      "Coco ralado"
    ],
    steps: [
      "Para o brigadeiro: cozinhe o leite condensado com manteiga e cacau até soltar da panela",
      "Escale a goma de tapioca numa frigideira seca",
      "Quando firmar, vire e cozinhe mais 1 min",
      "Recheie com o brigadeiro",
      "Polvilhe coco ralado por cima",
      "Dobre ao meio e sirva"
    ],
    tips: [
      "A tapioca não precisa de nenhuma gordura para fritar",
      "Brigadeiro deve estar em ponto de enrolar"
    ]
  },
  {
    id: "lanches-019",
    name: "Mini Calzone de Queijo e Presunto 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Pastelão italiano recheado com queijo derretido",
    category: "Lanches",
    type: "snack",
    prepTime: 30,
    cookTime: 20,
    difficulty: "médio",
    servings: 8,
    ingredients: [
      "2 xícaras de farinha",
      "1 colher de fermento biológico",
      "1/2 copo de água morna com sal",
      "2 colheres de azeite",
      "200g de mussarela",
      "100g de presunto"
    ],
    steps: [
      "Dissolva o fermento na água morna",
      "Misture com farinha e azeite, sove 10 min",
      "Deixe crescer 1 hora",
      "Abra a massa em formas redondas pequenas",
      "Coloque queijo e presunto em metade",
      "Dobre e sele as bordas com garfo",
      "Asse a 200°C por 18-20 min"
    ],
    tips: [
      "Varie o recheio com ricota e espinafre",
      "Massa bem assada é mais saborosa que frita"
    ]
  },
  {
    id: "lanches-020",
    name: "Banana Caramelada com Canela 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Lanche doce simples que parece sobremesa gourmet",
    category: "Lanches",
    type: "snack",
    prepTime: 5,
    cookTime: 8,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 bananas d'água",
      "2 colheres de sopa de manteiga",
      "3 colheres de açúcar mascavo",
      "Canela em pó",
      "Suco de 1 laranja"
    ],
    steps: [
      "Corte as bananas ao meio no sentido do comprimento",
      "Derreta a manteiga numa frigideira",
      "Adicione o açúcar mascavo e deixe caramelizar",
      "Coloque as bananas e deixe dourar 3 min cada lado",
      "Adicione o suco de laranja e deixe reduzir",
      "Polvilhe canela e sirva com sorvete se quiser"
    ],
    tips: [
      "Banana d'água aguenta melhor o calor",
      "Calda de caramelo fica incrível com sorvete de creme"
    ]
  },
  {
    id: "lanches-021",
    name: "Hummus Artesanal com Pita 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Pasta de grão-de-bico árabe cremosa e saborosa",
    category: "Lanches",
    type: "snack",
    prepTime: 15,
    cookTime: 0,
    difficulty: "fácil",
    servings: 6,
    ingredients: [
      "2 latas de grão-de-bico",
      "3 colheres de sopa de tahine",
      "Suco de 2 limões",
      "2 dentes de alho",
      "3 colheres de azeite",
      "Cominho em pó",
      "Sal",
      "Pão pita para servir"
    ],
    steps: [
      "Escorra o grão-de-bico reservando a água do cozimento",
      "Retire as películas do grão-de-bico para consistência mais suave",
      "Bata no processador com tahine, limão, alho e sal",
      "Adicione azeite e um pouco da água reservada",
      "Bata até cremoso e homogêneo",
      "Sirva com azeite, páprica e pão pita"
    ],
    tips: [
      "A água do cozimento deixa o hummus mais cremoso",
      "Pode adicionar pimentão assado para versão diferente"
    ]
  },
  {
    id: "lanches-022",
    name: "Guacamole Fresco com Totopos 📋", emoji: "🍝", region: "LATAM", estimatedCost: "low", 
    description: "Pasta de abacate mexicana refrescante com chips de milho",
    category: "Lanches",
    type: "snack",
    prepTime: 10,
    cookTime: 0,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "3 abacates maduros",
      "2 tomates sem semente",
      "1/2 cebola roxa",
      "Coentro fresco",
      "Suco de 2 limões",
      "1 pimenta jalapeño",
      "Sal",
      "Nachos ou totopos"
    ],
    steps: [
      "Amasse os abacates com um garfo (não liquerifique)",
      "Muito pique finamente a cebola, tomate e pimenta",
      "Misture tudo com o limão e sal",
      "Rasgue o coentro por cima",
      "Sirva imediatamente com nachos"
    ],
    tips: [
      "O limão preserva a cor verde e evita oxidação",
      "Deixe os pedaços de abacate um pouco grosseiros para textura"
    ]
  },
  {
    id: "lanches-023",
    name: "Pipoca Gourmet de Manteiga e Sal 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Pipoca artesanal no ponto perfeito, especialmente crocante",
    category: "Lanches",
    type: "snack",
    prepTime: 5,
    cookTime: 5,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "1/2 xícara de milho para pipoca",
      "3 colheres de sopa de manteiga",
      "Sal grosso a gosto",
      "Óleo de girassol"
    ],
    steps: [
      "Aqueça uma panela grande com tampa",
      "Adicione o óleo e 3 grãos de milho",
      "Quando os grãos estourarem, o óleo está na temperatura certa",
      "Adicione o restante do milho e tampe",
      "Agite levemente de vez em quando",
      "Retire quando o estouro diminuir",
      "Adicione manteiga derretida e sal"
    ],
    tips: [
      "Sal grosso por cima depois fica mais especial",
      "Varie com tempero de cheddar, sriracha ou fumaça liquida"
    ]
  },
  {
    id: "lanches-024",
    name: "Mini Wraps de Frango e Queijo 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Lanche prático e delicioso para qualquer hora do dia",
    category: "Lanches",
    type: "snack",
    prepTime: 10,
    cookTime: 10,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "4 tortillas de farinha pequenas",
      "200g de frango temperado",
      "Queijo cheddar",
      "Pimentão",
      "Alface",
      "Molho ranch ou maionese temperada"
    ],
    steps: [
      "Grelhe o frango e desfie",
      "Derreta o queijo sobre o frango na frigideira",
      "Aqueça as tortillas por 30 segundos no micro-ondas",
      "Monte com frango, queijo, pimentão e alface",
      "Regue com o molho",
      "Enrole firme e fixe com palito"
    ],
    tips: [
      "Tortilla morna enrola melhor sem rachar",
      "Pode adicionar jalapeño para versão picante"
    ]
  },
  {
    id: "lanches-025",
    name: "Biscoito de Polvilho Caseiro 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "O biscoitinho sequinho mineiro feito em casa",
    category: "Lanches",
    type: "snack",
    prepTime: 20,
    cookTime: 20,
    difficulty: "fácil",
    servings: 40,
    ingredients: [
      "2 xícaras de polvilho azedo",
      "2 xícaras de polvilho doce",
      "1 xícara de óleo",
      "1/2 xícara de leite",
      "1/2 xícara de queijo parmesão ralado",
      "Sal"
    ],
    steps: [
      "Misture os polvilhos com sal",
      "Aqueça o leite com o óleo até ferver",
      "Despeje sobre a mistura de polvilho e mexa",
      "Adicione o queijo e sove até formar massa lisa",
      "Enrole em rolinhos finos ou coloque num saco com bico",
      "Enrole em letras S ou O sobre assadeira",
      "Asse a 180°C por 18-20 min"
    ],
    tips: [
      "A mistura dos dois polvilhos equilibra a textura",
      "Pode adicionar ervas secas na massa para variação"
    ]
  },
  {
    id: "lanches-026",
    name: "Barrinhas de Cereal Caseiro 📋", emoji: "🍽️", region: "INT", estimatedCost: "low", 
    description: "Lanche energético sem conservantes, preparado em casa",
    category: "Lanches",
    type: "snack",
    prepTime: 15,
    cookTime: 20,
    difficulty: "fácil",
    servings: 16,
    ingredients: [
      "2 xícaras de aveia em flocos",
      "1/2 xícara de mel",
      "1/4 xícara de manteiga",
      "Frutas secas variadas",
      "Sementes",
      "Chocolate amargo picado"
    ],
    steps: [
      "Preaqueça o forno a 160°C",
      "Derreta mel e manteiga juntos",
      "Misture com a aveia, frutas e sementes",
      "Pressione bem numa forma forrada com papel manteiga",
      "Asse por 18-20 min até dourar levemente",
      "Deixe esfriar completamente antes de cortar"
    ],
    tips: [
      "Pressionar bem a mistura é fundamental para as barrinhas ficarem firmes",
      "Adicione chocolate após sair do forno para não derreter]"
    ]
  },
  {
    id: "lanches-027",
    name: "Quesadilla Mexicana Rápida 📋", emoji: "🍗", region: "LATAM", estimatedCost: "low", 
    description: "Pronto em 10 minutos — queijo derretido em tortilla crocante",
    category: "Lanches",
    type: "snack",
    prepTime: 5,
    cookTime: 6,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "4 tortillas de farinha",
      "200g de queijo cheddar",
      "Frango desfiado ou feijão preto",
      "Pimenta jalapeño em conserva",
      "Coentro"
    ],
    steps: [
      "Coloque uma tortilla na frigideira aquecida",
      "Distribua o queijo e o recheio escolhido",
      "Cubra com outra tortilla",
      "Cozinhe por 3 min cada lado até crocante e dourado",
      "Corte em triângulos e sirva com guacamole"
    ],
    tips: [
      "Use queijo que derreta bem: cheddar, mussarela ou gouda",
      "Frigideira seca, sem óleo, é melhor para tortilla crocante"
    ]
  },
  {
    id: "lanches-028",
    name: "Bolo de Rolo Pernambucano 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "O famoso e delicado bolo de rolo do Nordeste com goiabada",
    category: "Lanches",
    type: "snack",
    prepTime: 30,
    cookTime: 15,
    difficulty: "difícil",
    servings: 16,
    ingredients: [
      "200g de margarina",
      "2 xícaras de açúcar",
      "6 ovos",
      "2 xícaras de farinha de trigo",
      "400g de goiabada mole",
      "Açúcar de confeiteiro"
    ],
    steps: [
      "Bata a margarina com açúcar até ficar esbranquiçada",
      "Adicione os ovos um a um batendo",
      "Acrescente a farinha aos poucos",
      "Espalhe uma camada fina em assadeira de 40x30 com papel manteiga",
      "Asse a 200°C por apenas 6-8 min",
      "Retire do forno, espalhe a goiabada e enrole ainda quente",
      "Repita o processo com o restante da massa"
    ],
    tips: [
      "A massa deve ser muito fina, quase transparente",
      "Enrole imediatamente após sair do forno"
    ]
  },
  {
    id: "lanches-029",
    name: "Espetinho de Fruta com Chocolate 📋", emoji: "🍖", region: "INT", estimatedCost: "low", 
    description:
      "Lanche divertido e nutritivo com frutas e fondue de chocolate",
    category: "Lanches",
    type: "snack",
    prepTime: 15,
    cookTime: 5,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "Morangos",
      "Uvas",
      "Banana em rodelas",
      "Abacaxi em cubos",
      "100g de chocolate meio amargo",
      "2 colheres de creme de leite"
    ],
    steps: [
      "Monte os espetinhos alternando as frutas",
      "Derreta o chocolate com o creme de leite em banho-maria",
      "Sirva os espetinhos mergulhando no chocolate derretido",
      "Para versão sólida: mergulhe, escorra e resfriar na geladeira"
    ],
    tips: [
      "Use palitos de churrasco ou espetos de bambu",
      "Pode polvilhar granola por cima do chocolate"
    ]
  },
  {
    id: "lanches-030",
    name: "Misto Quente de Pão Italiano 📋", emoji: "🥪", region: "US", estimatedCost: "low", 
    description: "Versão gourmet do clássico misto quente",
    category: "Lanches",
    type: "snack",
    prepTime: 5,
    cookTime: 8,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "4 fatias de pão italiano",
      "100g de presunto italiano",
      "100g de queijo gruyère ou emmental",
      "Mostarda de Dijon",
      "Manteiga",
      "Tomilho seco"
    ],
    steps: [
      "Passe mostarda em duas fatias",
      "Monte com presunto e queijo",
      "Passe manteiga no lado externo",
      "Gelle em chapa ou frigideira por 3-4 min cada lado",
      "Polvilhe tomilho e sirva quente"
    ],
    tips: [
      "Gruyère derrete lindamente e tem sabor intenso",
      "Pode usar panini press para resultado profissional"
    ]
  },
  {
    id: "lanches-031",
    name: "Nachos com Molho Cheddar Caseiro 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Snack americano com molho cremoso de queijo feito do zero",
    category: "Lanches",
    type: "snack",
    prepTime: 10,
    cookTime: 10,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "1 pacote de doritos ou nachos",
      "200g de queijo cheddar",
      "100ml de leite integral",
      "1 colher de sopa de amido de milho",
      "Pimenta jalapeño",
      "Cebolinha"
    ],
    steps: [
      "Dissolva o amido no leite",
      "Aquece em fogo médio mexendo sempre",
      "Adicione o queijo cheddar picado e misture até derreter",
      "Tempere com pimenta e sal se necessário",
      "Distribua os nachos numa travessa",
      "Despeje o molho de cheddar quente por cima",
      "Decore com jalapeño e cebolinha"
    ],
    tips: [
      "Amido de milho estabiliza o molho e evita que separe",
      "Sirva imediatamente enquanto o molho está cremoso"
    ]
  },
  {
    id: "lanches-032",
    name: "Tapioca com Queijo Coalho e Mel 📋", emoji: "🍰", region: "INT", estimatedCost: "low", 
    description:
      "Nordestino e gostoso - queijo coalho derretido com mel de abelha",
    category: "Lanches",
    type: "snack",
    prepTime: 5,
    cookTime: 8,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "4 colheres de goma de tapioca",
      "50g de queijo coalho",
      "1 colher de mel de abelha",
      "Canela (opcional)"
    ],
    steps: [
      "Escale a goma numa frigideira antiaderente",
      "Coloque o queijo coalho fatiado",
      "Tampe e deixe derreter por 2 min",
      "Dobre ao meio",
      "Finalize com mel e canela"
    ],
    tips: [
      "Queijo coalho derrete mas mantém a forma",
      "O contraste doce-salgado é perfeito"
    ]
  },
  {
    id: "lanches-033",
    name: "Crostini com Patê de Ricota e Ervas 📋", emoji: "🍽️", region: "INT", estimatedCost: "low", 
    description: "Entrada italiana elegante e fácil de preparar",
    category: "Lanches",
    type: "snack",
    prepTime: 10,
    cookTime: 8,
    difficulty: "fácil",
    servings: 8,
    ingredients: [
      "1 baguete fatiada",
      "250g de ricota",
      "Ervas frescas: manjericão, cebolinha, salsinha",
      "Azeite",
      "Sal e pimenta",
      "Tomate cereja para decorar"
    ],
    steps: [
      "Toste as fatias de baguete no forno a 180°C por 8 min",
      "Bata a ricota com ervas, azeite, sal e pimenta",
      "Espalhe o patê sobre as torradas",
      "Decore com tomate cereja cortado",
      "Sirva imediatamente"
    ],
    tips: [
      "Ricota fresca tem textura melhor que a embalada",
      "Ervas frescas fazem toda a diferença"
    ]
  },
  {
    id: "lanches-034",
    name: "Crepe Doce com Nutella e Morango 📋", emoji: "🍝", region: "US", estimatedCost: "low", 
    description: "Crepe francês recheado com chocolate e frutas frescas",
    category: "Lanches",
    type: "snack",
    prepTime: 15,
    cookTime: 15,
    difficulty: "médio",
    servings: 6,
    ingredients: [
      "1 xícara de farinha de trigo",
      "2 ovos",
      "300ml de leite",
      "2 colheres de manteiga derretida",
      "Pitada de sal",
      "Nutella",
      "Morangos fatiados",
      "Açúcar de confeiteiro"
    ],
    steps: [
      "Bata todos os ingredientes da massa no liquidificador",
      "Deixe descansar 15 min",
      "Aqueça frigideira antiaderente com manteiga",
      "Despeje uma concha fina de massa e gire para espalhar",
      "Cozinhe 1-2 min cada lado",
      "Recheie com nutella e morango",
      "Polvilhe açúcar de confeiteiro"
    ],
    tips: [
      "Frigideira quente e untada é fundamental para crepes finos",
      "Pode usar bananas, maçã ou creme de baunilha no recheio"
    ]
  },
  {
    id: "lanches-035",
    name: "Sanduíche X-Salada Caseiro 📋", emoji: "🥗", region: "US", estimatedCost: "low", 
    description: "O hamburguer artesanal completo com tudo que tem direito",
    category: "Lanches",
    type: "snack",
    prepTime: 15,
    cookTime: 15,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "2 hambúrgueres de 150g",
      "2 pães de hamburguer",
      "Queijo cheddar",
      "Alface americana",
      "Tomate",
      "Cebola roxa",
      "Maionese",
      "Ketchup e mostarda"
    ],
    steps: [
      "Tempere os hambúrgueres com sal e pimenta",
      "Aqueça a grelha ou frigideira na temperatura máxima",
      "Grelhe 3-4 min cada lado",
      "Coloque o queijo e tampe para derreter",
      "Toste o pão na mesma frigideira",
      "Monte: molhos na base, alface, tomate, hambúrguer com queijo, cebola"
    ],
    tips: [
      "Grelha bem quente sela o hamburguer e mantém os sucos",
      "Use pão de brioche para versão mais gourmet"
    ]
  },
  {
    id: "lanches-036",
    name: "Palmito Pupunha Refogado com Alho 📋", emoji: "🍽️", region: "INT", estimatedCost: "low", 
    description: "Petisco sofisticado e prático com palmito fresco",
    category: "Lanches",
    type: "snack",
    prepTime: 5,
    cookTime: 10,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "400g de palmito pupunha em rodelas",
      "4 dentes de alho",
      "Azeite",
      "Salsinha",
      "Suco de limão",
      "Sal e pimenta"
    ],
    steps: [
      "Escorra bem o palmito",
      "Aqueça o azeite e doure o alho fatiado",
      "Adicione o palmito e refogue por 5 min",
      "Tempere com sal, pimenta e limão",
      "Finalize com salsinha fresca"
    ],
    tips: [
      "Palmito fresco pupunha é mais saboroso que em conserva",
      "Serve como acompanhamento ou petisco com torradinhas"
    ]
  },
  {
    id: "lanches-037",
    name: "Sonho de Padaria Caseiro 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Rosquinha frita recheada com creme, igual ao da padaria",
    category: "Lanches",
    type: "snack",
    prepTime: 60,
    cookTime: 15,
    difficulty: "difícil",
    servings: 12,
    ingredients: [
      "3 xícaras de farinha",
      "2 ovos",
      "50g de manteiga",
      "1/4 xícara de açúcar",
      "15g de fermento biológico",
      "1/2 xícara de leite morno",
      "Óleo para fritar",
      "Doce de leite ou creme para rechear",
      "Açúcar e canela para enrolar"
    ],
    steps: [
      "Dissolva o fermento no leite morno com açúcar",
      "Misture farinha, ovos, manteiga e fermento",
      "Sove 10 min e deixe crescer 1 hora",
      "Abra a massa e corte círculos",
      "Deixe crescer mais 30 min",
      "Frite em óleo a 170°C por 2 min cada lado",
      "Enrole no açúcar com canela e recheie com saco de confeitar"
    ],
    tips: [
      "Temperatura do óleo muito quente queima fora e deixa cru dentro",
      "Corte a massa bem grossa para ficar macio"
    ]
  },
  {
    id: "lanches-038",
    name: "Patê de Berinjela Assada (Baba Ganoush) 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Pasta árabe defumada de berinjela, perfeita com pão árabe",
    category: "Lanches",
    type: "snack",
    prepTime: 10,
    cookTime: 40,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "2 berinjelas grandes",
      "2 colheres de tahine",
      "Suco de 1 limão",
      "2 dentes de alho",
      "Azeite",
      "Sal e cominho",
      "Salsinha"
    ],
    steps: [
      "Faça furos nas berinjelas e leve ao forno a 220°C por 35-40 min",
      "Deixe esfriar e retire a polpa com uma colher",
      "Processe ou amasse a polpa com o restante dos ingredientes",
      "Ajuste sal e limão",
      "Sirva com fio de azeite e salsinha"
    ],
    tips: [
      "Assar direto na chama do fogão dá mais sabor defumado",
      "Escorra bem o líquido da bernjela antes de processar"
    ]
  },
  {
    id: "lanches-039",
    name: "Frango a Passarinho 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Tirinhas de frango fritas e temperadas, petisco clássico",
    category: "Lanches",
    type: "snack",
    prepTime: 20,
    cookTime: 20,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "1kg de frango em pedaços pequenos",
      "4 dentes de alho",
      "Suco de 2 limões",
      "Sal e pimenta",
      "Farinha de trigo para empanar",
      "Óleo para fritar"
    ],
    steps: [
      "Marine o frango com alho, limão, sal e pimenta por 30 min",
      "Passe na farinha de trigo",
      "Frite em óleo quente por 6-8 min até dourar",
      "Escorra em papel toalha",
      "Sirva com limão e pimenta"
    ],
    tips: [
      "Frango em pedaços pequenos frita mais rápido e uniforme",
      "Servir com maionese de açafrão ou alho eleva o petisco"
    ]
  },
  {
    id: "lanches-040",
    name: "Bolo de Caneca de Chocolate 📋", emoji: "🍳", region: "INT", estimatedCost: "low", 
    description:
      "O bolo mais rápido do mundo, pronto em 2 minutos no micro-ondas",
    category: "Lanches",
    type: "snack",
    prepTime: 3,
    cookTime: 2,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "4 colheres de farinha de trigo",
      "4 colheres de açúcar",
      "3 colheres de cacau em pó",
      "1 ovo",
      "3 colheres de leite",
      "3 colheres de óleo",
      "Pitada de sal"
    ],
    steps: [
      "Numa caneca grande, misture os ingredientes secos",
      "Adicione o ovo, leite e óleo",
      "Misture muito bem com um garfo",
      "Leve ao micro-ondas por 90 segundos na potência máxima",
      "Sirva direto na caneca com sorvete ou creme de leite"
    ],
    tips: [
      "A caneca deve estar limpa e ser grande para não transbordar",
      "O bolo continua cozinhando após sair do micro-ondas"
    ]
  }
];
