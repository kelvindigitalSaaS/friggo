import { Recipe } from "@/types/friggo";

export const receitasFrangoEspecial: Recipe[] = [
  {
    id: "frango-esp-001",
    name: "Frango à Parmegiana 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Frango empanado com molho de tomate e queijo derretido",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 20,
    cookTime: 30,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "4 peitos de frango",
      "2 ovos batidos",
      "Farinha de rosca",
      "Parmesão ralado",
      "Molho de tomate",
      "Muçarela fatiada",
      "Azeite e temperos"
    ],
    steps: [
      "Bata os peitos finos com martelo de carne",
      "Tempere com sal, pimenta e alho",
      "Empane (farinha, ovo, farinha de rosca com parmesão)",
      "Frite em óleo quente por 3-4 min cada lado",
      "Coloque numa assadeira, cubra com molho de tomate",
      "Adicione muçarela fatiada",
      "Gratine no forno a 200°C por 10 min"
    ],
    tips: [
      "Bater o frango fino garante cozimento uniforme",
      "Gratinar no forno em vez de fritar o empanado é mais saudável"
    ]
  },
  {
    id: "frango-esp-002",
    name: "Frango Xadrez 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Frango salteado em wok com amêndoas e pimentões coloridos",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 20,
    cookTime: 15,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "500g de peito de frango em cubos",
      "1 pimentão vermelho",
      "1 pimentão amarelo",
      "1/2 xícara de amêndoas sem pele",
      "3 colheres de shoyu",
      "1 colher de amido de milho",
      "1 colher de óleo de gergelim",
      "Alho e gengibre"
    ],
    steps: [
      "Marine o frango em shoyu, amido e gengibre por 20 min",
      "Saltie as amêndoas até dourar, reserve",
      "Em wok quente, salteie o frango marinado em fogo alto",
      "Adicione alho e os pimentões cortados em cubos",
      "Finalize com óleo de gergelim",
      "Adicione as amêndoas e sirva"
    ],
    tips: [
      "Wok precisa estar muito quente para o frango selar corretamente",
      "Amêndoas dão crocância e proteína extra"
    ]
  },
  {
    id: "frango-esp-003",
    name: "Frango Tikka Masala 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Frango cremoso e especiado clássico da culinária indiana",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 30,
    cookTime: 35,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "600g de frango marinado em iogurte e especiarias",
      "1 lata de tomate pelado",
      "200ml de creme de leite",
      "Garam masala, cúrcuma, cominho, coentro",
      "Cebola, alho e gengibre",
      "Pimenta vermelha",
      "Manteiga"
    ],
    steps: [
      "Marine o frango em iogurte com especiarias por 4 horas",
      "Grelhe o frango marinado até charrar",
      "Em outra panela, refogue cebola, alho e gengibre na manteiga",
      "Adicione tomates e especiarias",
      "Cozinhe por 20 min e bata o molho",
      "Adicione o frango grelhado ao molho",
      "Finalize com creme de leite"
    ],
    tips: [
      "O frango deve ser queimado levemente na grelha para o sabor defumado",
      "Molho pode ser preparado com antecedência"
    ]
  },
  {
    id: "frango-esp-004",
    name: "Frango ao Curry Verde Tailandês 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Frango em curry verde perfumado com leite de coco",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 15,
    cookTime: 25,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "500g de frango em cubos",
      "1 lata de leite de coco integral",
      "2 colheres de pasta de curry verde",
      "Berinjela tailandesa",
      "Folhas de capim-limão",
      "Manjericão tailandês",
      "Molho de peixe e açúcar de palma"
    ],
    steps: [
      "Frite a pasta de curry verde no óleo por 1 min",
      "Adicione metade do leite de coco e deixe ferver",
      "Coloque o frango e cozinhe por 10 min",
      "Adicione berinjela e o resto do leite de coco",
      "Tempere com molho de peixe e açúcar de palma",
      "Finalize com manjericão tailandês e capim-limão"
    ],
    tips: [
      "Pasta de curry verde feita na hora tem sabor infinitamente superior",
      "Açúcar de palma ou demerara equilibra o picante"
    ]
  },
  {
    id: "frango-esp-005",
    name: "Coxa de Frango Caramelizada com Limão e Alho 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description:
      "Coxas douradas e brilhantes em molho adocicado de alho e limão",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 15,
    cookTime: 40,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "8 coxas de frango com pele",
      "8 dentes de alho",
      "Suco de 3 limões",
      "3 colheres de mel",
      "2 colheres de shoyu",
      "Romero e tomilho",
      "Manteiga"
    ],
    steps: [
      "Tempere as coxas com sal e pimenta",
      "Sele numa frigideira com manteiga até dourar bem",
      "Transfira para assadeira",
      "Na mesma frigideira, doure os dentes de alho inteiros",
      "Adicione mel, limão e shoyu e reduza",
      "Regue as coxas com o molho",
      "Asse a 200°C por 25 min"
    ],
    tips: [
      "Selar bem antes de ir ao forno é o segredo da pele crocante",
      "O molho carameliza ao assar criando um glaze delicioso"
    ]
  },
  {
    id: "frango-esp-006",
    name: "Frango Assado com Ervas de Provence 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description:
      "Frango inteiro assado lentamente aromático com ervas francesas",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 20,
    cookTime: 90,
    difficulty: "médio",
    servings: 6,
    ingredients: [
      "1 frango inteiro (1,5-2kg)",
      "Ervas de Provence abundantes",
      "Manteiga amolecida",
      "Limão",
      "Alho",
      "Cebola e cenoura para a cama"
    ],
    steps: [
      "Misture manteiga com ervas, alho e raspas de limão",
      "Passe a manteiga de ervas sob a pele e por cima",
      "Tempere o interior com sal e limão",
      "Coloque sobre cama de cebola e cenoura",
      "Asse a 200°C por 20 min e depois 180°C por 60-70 min",
      "Deixe descansar 15 min antes de cortar"
    ],
    tips: [
      "Passar a manteiga sob a pele tempera a carne diretamente",
      "Descanso antes de cortar redistribui os sucos"
    ]
  },
  {
    id: "frango-esp-007",
    name: "Frango Búfalo 📋", emoji: "🍗", region: "US", estimatedCost: "low", 
    description: "Asas de frango crocantes com molho picante estilo americano",
    category: "Frango Especial",
    type: "snack",
    prepTime: 20,
    cookTime: 40,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "1kg de asas de frango",
      "3 colheres de manteiga",
      "4 colheres de molho de pimenta Frank's ou similar",
      "Sal, pimenta e alho em pó",
      "Molho blue cheese ou ranch para servir"
    ],
    steps: [
      "Seque bem as asas e tempere com sal, pimenta e alho",
      "Asse a 200°C por 40 min virando na metade",
      "Derreta a manteiga e misture com o molho de pimenta",
      "Jogue as asas assadas no molho búfalo",
      "Sirva com molho blue cheese e cenoura"
    ],
    tips: [
      "Asas bem secas ficam crocantes ao assar sem fritar",
      "Molho búfalo clássico é apenas manteiga + Frank's Red Hot"
    ]
  },
  {
    id: "frango-esp-008",
    name: "Frango Mediterrâneo com Azeitonas e Tomate 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description:
      "Guisado de frango ao estilo mediterrâneo com capers e azeitonas",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 15,
    cookTime: 35,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "4 coxas de frango",
      "1 lata de tomate pelado",
      "100g de azeitonas pretas",
      "2 colheres de alcaparras",
      "Alho e cebola",
      "Vinho branco",
      "Orégano e folha de louro"
    ],
    steps: [
      "Doure as coxas em azeite",
      "Reserve e refogue alho e cebola",
      "Adicione vinho branco e raspberry",
      "Adicione tomates, azeitonas, alcaparras e temperos",
      "Retorne as coxas ao molho",
      "Tampe e cozinhe por 25 min em fogo médio"
    ],
    tips: [
      "Azeitona preta tem sabor mais intenso que a verde para este preparo",
      "Alcaparras dão o toque salgado e ácido característico"
    ]
  },
  {
    id: "frango-esp-009",
    name: "Galinhada Mineira 📋", emoji: "🍗", region: "US", estimatedCost: "low", 
    description: "Arroz com frango à moda mineira com açafrão e pequi",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 25,
    cookTime: 45,
    difficulty: "médio",
    servings: 6,
    ingredients: [
      "1 frango caipira cortado em pedaços",
      "2 xícaras de arroz",
      "Açafrão da terra (cúrcuma)",
      "Pequi (opcional)",
      "Pimentão, cebola, alho",
      "Tomate",
      "Cebolinha e salsinha"
    ],
    steps: [
      "Tempere o frango com sal, alho e limão",
      "Doure em panela de barro ou funda no azeite",
      "Refogue pimentão, cebola e tomate",
      "Adicione açafrão",
      "Adicione o arroz e frite um pouco",
      "Adicione água (2x) e cozinhe",
      "Sirva direto na panela com cebolinha",
      "Se usar pequi, adicione junto com o arroz"
    ],
    tips: [
      "Frango caipira tem sabor mais intenso, mas demora mais para amaciar",
      "Cúrcuma (açafrão da terra) dá cor amarela bonita"
    ]
  },
  {
    id: "frango-esp-010",
    name: "Frango Bourbon com Arroz 📋", emoji: "🍗", region: "US", estimatedCost: "low", 
    description: "Frango estilo americano sul em molho adocicado de bourbon",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 15,
    cookTime: 25,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "500g de peito de frango em cubos",
      "3 colheres de shoyu",
      "2 colheres de mel",
      "2 colheres de ketchup",
      "1 colher de vinagre",
      "Alho e gengibre",
      "1 colher de amido de milho"
    ],
    steps: [
      "Misture shoyu, mel, ketchup, vinagre, alho e gengibre",
      "Salteie o frango em fogo alto",
      "Adicione o molho e misture bem",
      "Dissolva o amido em água fria e adicione",
      "Cozinhe até o molho engrossar e brilhar",
      "Sirva sobre arroz branco com cebolinha"
    ],
    tips: [
      "O molho deve ser ligeiramente espesso e brilhante",
      "Semelhante ao frango bourbon de restaurante fast-food americano mas saudável"
    ]
  },
  {
    id: "frango-esp-011",
    name: "Frango Marroquino com Grão-de-Bico 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Tagine de frango com especiarias exóticas marroquinas",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 20,
    cookTime: 45,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "600g de coxa de frango",
      "1 lata de grão-de-bico",
      "1 lata de tomate pelado",
      "Ras el hanout",
      "Cominho, canela e cúrcuma",
      "Cebola, alho e gengibre",
      "Azeitonas verdes",
      "Limão preservado (ou raspas de limão)"
    ],
    steps: [
      "Tempere o frango com ras el hanout",
      "Doure em azeite",
      "Refogue cebola, alho e gengibre com as especiarias",
      "Adicione tomates, grão-de-bico e azeitonas",
      "Cubra e cozinhe por 35 min",
      "Finalize com limão preservado"
    ],
    tips: [
      "Ras el hanout é a mistura de especiarias marroquina — encontre em importados",
      "Limão preservado dá o sabor autêntico mas raspas de limão substituem bem"
    ]
  },
  {
    id: "frango-esp-012",
    name: "Frango Peruano (Pollo a la Brasa) 📋", emoji: "🍗", region: "LATAM", estimatedCost: "low", 
    description: "Frango marinado com especiarias peruanas e assado lentamente",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 20,
    cookTime: 60,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "1 frango inteiro ou 8 coxas",
      "3 dentes de alho",
      "1 colher de cominho",
      "1 colher de páprica",
      "1 colher de orégano",
      "Suco de limão",
      "Soja e vinagre",
      "Azeite"
    ],
    steps: [
      "Triture alho, cominho, páprica e orégano",
      "Misture com limão, shoyu, vinagre e azeite",
      "Marine o frango nesta mistura por 8 horas",
      "Asse a 200°C por 60 min virando na metade",
      "Sirva com batatas fritas e molho verde (uchucuta)"
    ],
    tips: [
      "Quanto mais tempo marinado, melhor o sabor",
      "A marinada peruana usa cominho abundante como assinatura"
    ]
  },
  {
    id: "frango-esp-013",
    name: "Stir Fry de Frango com Brócolis 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Salteado oriental de frango com brócolis em molho de ostras",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 15,
    cookTime: 10,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "400g de frango em tiras",
      "300g de brócolis em floretes",
      "2 colheres de molho de ostras",
      "2 colheres de shoyu",
      "Alho e gengibre",
      "1 colher de amido de milho",
      "Óleo de gergelim"
    ],
    steps: [
      "Marine o frango em shoyu, amido e gengibre",
      "Em wok quente, salteie o frango em fogo alto",
      "Adicione alho e brócolis",
      "Adicione molho de ostras",
      "Salteie por 3-4 min",
      "Finalize com óleo de gergelim"
    ],
    tips: [
      "Wok tem que estar fumegando para o autêntico sabor 'wok hei'",
      "Não lotear o wok — frango precisa selar, não cozinhar no vapor"
    ]
  },
  {
    id: "frango-esp-014",
    name: "Frango Grelhado com Molho de Pesto 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Peito de frango grelhado ao ponto com pesto de manjericão",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 10,
    cookTime: 15,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 peitos de frango",
      "Para o pesto: manjericão, pinhão, alho, parmesão, azeite",
      "Sal e pimenta",
      "Limão"
    ],
    steps: [
      "Prepare o pesto processando todos os ingredientes",
      "Tempere o frango com sal, pimenta e azeite",
      "Grelhe por 6-7 min cada lado",
      "Deixe descansar 3 min",
      "Sirva com o pesto fresco e gotas de limão"
    ],
    tips: [
      "Frango grelhado ideal é 74°C no centro",
      "Pesto só deve ser adicionado após grelhar para não queimar os óleos"
    ]
  },
  {
    id: "frango-esp-015",
    name: "Caldo de Frango Caseiro 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Caldo dourado e nutritivo, base para sopas e molhos",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 15,
    cookTime: 120,
    difficulty: "fácil",
    servings: 8,
    ingredients: [
      "1 carcaça de frango com os ossos",
      "2 cenouras",
      "2 talos de aipo",
      "1 cebola",
      "Ramo de tomilho e louro",
      "Salsa",
      "Pimenta em grão"
    ],
    steps: [
      "Coloque todos os ingredientes em panela grande",
      "Cubra com água fria",
      "Leve ao fogo e retire a espuma ao ferver",
      "Reduza o fogo e cozinhe por 2 horas",
      "Coe o caldo",
      "Resfrie e retire a gordura que solidifica por cima"
    ],
    tips: [
      "Água fria no início extrai mais sabor e colágeno dos ossos",
      "Caldo pode ser congelado por 3 meses"
    ]
  },
  {
    id: "frango-esp-016",
    name: "Frango ao Vinho Branco com Cogumelos 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Frango braseado elegante com cogumelos e vinho branco",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 15,
    cookTime: 35,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "4 coxas de frango",
      "200g de cogumelos paris ou shitake",
      "1 copo de vinho branco seco",
      "200ml de creme de leite",
      "Cebola, alho e tomilho",
      "Manteiga"
    ],
    steps: [
      "Doure as coxas em manteiga até crocante por todos os lados",
      "Reserve e refogue cebola e alho",
      "Adicione cogumelos fatiados e salteie",
      "Adicione vinho branco e reduza pela metade",
      "Adicione creme de leite",
      "Retorne as coxas ao molho e tampe",
      "Cozinhe por 20 min"
    ],
    tips: [
      "Dourar bem o frango cria sabor com a reação de Maillard",
      "Reduzir o vinho antes de adicionar o creme elimina o álcool e concentra o sabor"
    ]
  },
  {
    id: "frango-esp-017",
    name: "Yakitori (Espetinho de Frango Japonês) 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Espetinhos de frango japoneses glaceados com tare",
    category: "Frango Especial",
    type: "snack",
    prepTime: 20,
    cookTime: 15,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "500g de coxa de frango sem osso",
      "Para o tare: shoyu, mirin, saquê, açúcar",
      "Cebolinha em pedaços",
      "Sal grosso"
    ],
    steps: [
      "Corte o frango em cubos de 2cm",
      "Alterne frango e cebolinha nos espetinhos",
      "Para o tare: reduza shoyu, mirin, saquê e açúcar à metade",
      "Grelhe os espetinhos em churrasqueira ou frigideira",
      "Aplique o tare com pincel a cada 2 min",
      "Sirva com sal grosso como alternativa (shio yakitori)"
    ],
    tips: [
      "Coxa de frango é mais saborosa que o peito para yakitori",
      "Tare é o molho de finalização clássico — glaceie repetidamente"
    ]
  },
  {
    id: "frango-esp-018",
    name: "Frango Crocante Especiado (Fried Chicken) 📋", emoji: "🍗", region: "US", estimatedCost: "low", 
    description: "Frango frito crocante estilo americano do Sul",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 30,
    cookTime: 25,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "1kg de pedaços de frango",
      "500ml de leite",
      "2 ovos",
      "2 xícaras de farinha de trigo",
      "Páprica defumada, alho em pó, tomilho",
      "Sal e pimenta caiena",
      "Óleo para fritar"
    ],
    steps: [
      "Marine o frango no leite com ovo por 4 horas",
      "Misture farinha com todas as especiarias",
      "Retire o frango do leite e empane na farinha temperada",
      "Frite em óleo a 170°C por 12-15 min",
      "Escorra no papel e tempere com sal imediatamente"
    ],
    tips: [
      "Marine em leite para amaciar a carne",
      "Temperatura do óleo constante a 170°C garante cozimento uniforme"
    ]
  },
  {
    id: "frango-esp-019",
    name: "Sobrecoxa de Frango ao Molho de Laranja 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Frango braseado em molho cítrico adocicado",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 15,
    cookTime: 40,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "8 sobrecoxas de frango",
      "Suco de 4 laranjas",
      "Raspas de 1 laranja",
      "2 colheres de mel",
      "1 colher de shoyu",
      "Tomilho e alho",
      "Manteiga"
    ],
    steps: [
      "Doure as sobrecoxas em manteiga",
      "Reserve e na mesma panela, refogue o alho",
      "Adicione suco de laranja, raspas, mel e shoyu",
      "Reduza por 5 min",
      "Retorne as sobrecoxas ao molho",
      "Cozinhe em fogo baixo por 25-30 min banhando com o molho"
    ],
    tips: [
      "Sobrecoxa de frango é muito mais suculenta que peito para brasear",
      "Baste (regar com o molho) frequentemente para glaze uniforme"
    ]
  },
  {
    id: "frango-esp-020",
    name: "Frango ao Pesto de Nozes 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Frango assado coberto com pesto de nozes e ervas",
    category: "Frango Especial",
    type: "dinner",
    prepTime: 15,
    cookTime: 30,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "4 peitos de frango",
      "1 xícara de nozes",
      "Salsinha e manjericão",
      "2 dentes de alho",
      "Azeite",
      "Parmesão",
      "Sal e pimenta"
    ],
    steps: [
      "Processe nozes com alho, ervas, parmesão e azeite",
      "Tempere os peitos com sal e pimenta",
      "Cubra generosamente com o pesto de nozes",
      "Asse a 200°C por 25-30 min"
    ],
    tips: [
      "Pesto de nozes tem sabor mais terroso que o de pinhão",
      "Frango com crosta de pesto deve ser coberto com papel alumínio no início para não queimar"
    ]
  }
];
