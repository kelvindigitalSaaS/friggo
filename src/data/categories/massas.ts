import { Recipe } from "@/types/kaza";

export const receitasMassas: Omit<Recipe, "id" | "usesExpiringItems">[] = [
  {
    name: "Macarrão à Bolonhesa 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Clássico molho de carne moída com tomate, servido com espaguete al dente",
    category: "Massas",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 35,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "400 g de espaguete",
      "500 g de carne moída",
      "1 cebola grande picada",
      "4 dentes de alho picados",
      "400 g de tomate pelado em lata",
      "2 colheres de extrato de tomate",
      "1 colher de sopa de azeite",
      "1 xícara de vinho tinto seco",
      "folhas de manjericão fresco",
      "sal e pimenta-do-reino a gosto",
      "parmesão ralado para servir"
    ],
    instructions: [
      "Aqueça o azeite em uma frigideira grande em fogo médio-alto. Adicione a cebola picada e refogue por 4–5 minutos, mexendo, até ficar translúcida e levemente dourada.",
      "Adicione o alho picado e mexa por mais 1 minuto até perfumar. Se o fundo começar a grudar, adicione um fio d'água.",
      "Adicione a carne moída e cozinhe quebrando com a colher por 7–8 minutos, até não restar mais partes rosadas. Tempere com sal e pimenta generosamente.",
      "Despeje o vinho tinto e deixe evaporar por 2 minutos, raspando o fundo da frigideira para soltar os sabores caramelizados.",
      "Adicione o extrato de tomate, mexa bem e cozinhe por 1 minuto. Em seguida, adicione os tomates pelados esmagando-os com a colher.",
      "Reduza o fogo para baixo, tampe parcialmente e cozinhe por 20–25 minutos, mexendo de vez em quando, até o molho engrossar e os sabores se aprofundarem. Ajuste o sal.",
      "Cozinhe o espaguete em água com bastante sal segundo as instruções da embalagem (geralmente 8–10 min para al dente). Reserve 1 xícara da água do cozimento antes de escorrer.",
      "Escorra o macarrão e misture diretamente na frigideira com o molho. Se estiver seco, adicione um pouco da água do macarrão. Finalize com folhas de manjericão rasgadas e sirva com parmesão."
    ],
    tips: [
      "A água do cozimento do macarrão tem amido que ajuda o molho a grudar nos fios.",
      "Para um molho mais rico, adicione 1 colher de manteiga no final fora do fogo.",
      "O molho fica ainda melhor no dia seguinte — ótimo para preparar com antecedência."
    ]
  },
  {
    name: "Carbonara Autêntica 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Macarrão romano com guanciale, gema de ovo e pecorino — sem creme de leite",
    category: "Massas",
    type: "lunch",
    difficulty: "médio",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "400 g de espaguete ou rigatoni",
      "200 g de guanciale (ou bacon em cubinhos)",
      "4 gemas + 1 ovo inteiro",
      "100 g de queijo pecorino romano ralado fino",
      "50 g de parmesão ralado fino",
      "pimenta-do-reino moída na hora (generosa)",
      "sal grosso para a água"
    ],
    instructions: [
      "Coloque uma panela grande com água abundante para ferver. Use bastante sal — a água deve estar 'salgada como o mar'.",
      "Em uma frigideira fria, coloque o guanciale em cubinhos e leve ao fogo médio. Deixe derreter a gordura lentamente por 8–10 minutos até ficarem dourados e crocantes. Desligue o fogo e reserve na gordura.",
      "Em uma tigela, bata as gemas com o ovo inteiro. Adicione o pecorino e o parmesão ralados e bata bem até formar uma pasta densa. Tempere com bastante pimenta-do-reino moída na hora.",
      "Cozinhe o macarrão na água fervente até al dente (1–2 min a menos que o indicado na embalagem). Reserve 1 xícara cheia da água do cozimento antes de escorrer.",
      "Escorra o macarrão e adicione imediatamente à frigideira com o guanciale (fogo DESLIGADO). Mexa bem para envolver todos os fios na gordura.",
      "Despeje a mistura de ovos e queijo sobre o macarrão, mexendo constantemente em movimentos circulares. Adicione a água do macarrão, uma concha de cada vez, até obter um molho cremoso que envolva bem os fios. O calor residual da massa cozinha os ovos sem scrambled.",
      "Sirva imediatamente com pimenta extra e um pouco mais de pecorino. Nunca adicione creme de leite — a cremosidade vem dos ovos e da água do macarrão."
    ],
    tips: [
      "A temperatura é fundamental: fogo alto demais embaralha os ovos. Trabalhe fora do fogo.",
      "Pecorino é mais salgado que parmesão — ajuste o sal da água com cuidado.",
      "Guanciale (bochecha de porco curada) dá sabor superior ao bacon, vale procurar em delicatessens."
    ]
  },
  {
    name: "Lasanha de Carne 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Lasanha em camadas com molho à bolonhesa e bechamel cremoso",
    category: "Massas",
    type: "lunch",
    difficulty: "médio",
    prepTime: 40,
    cookTime: 45,
    servings: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "500 g de massa para lasanha (placas)",
      "600 g de carne moída",
      "1 cebola picada",
      "3 dentes de alho",
      "400 g de tomate pelado",
      "2 colheres de extrato de tomate",
      "500 ml de leite integral",
      "40 g de manteiga",
      "40 g de farinha de trigo",
      "noz-moscada ralada",
      "300 g de queijo mussarela fatiado",
      "100 g de parmesão ralado",
      "sal, pimenta e azeite"
    ],
    instructions: [
      "BECHAMEL: Derreta a manteiga em fogo médio, adicione a farinha e misture com fouet por 1 min formando um roux claro. Despeje o leite morno gradualmente, sem parar de mexer, até engrossar (8–10 min). Tempere com sal, pimenta e noz-moscada. Reserve.",
      "BOLONHESA: Refogue cebola e alho no azeite por 4 min. Adicione a carne moída e cozinhe por 7 min quebrando bem. Adicione o extrato de tomate, depois os pelados esmagados. Cozinhe em fogo baixo por 20 min. Tempere.",
      "Se usar massa seca tradicional, cozinhe em água com sal até meia-cozida (3–4 min) e escorra em pano limpo. Se for pré-cozida, pule esta etapa.",
      "Pré-aqueça o forno a 180 °C. Em um refratário (30×20 cm), espalhe uma camada fina de bolonhesa no fundo para não grudar.",
      "Monte as camadas: massa → bolonhesa → bechamel → mussarela. Repita até acabar os ingredientes (3–4 camadas). A última camada deve ser: massa → bechamel → mussarela → parmesão.",
      "Cubra com papel-alumínio e asse por 25 min. Retire o alumínio e asse por mais 15–20 min até dourar e borbulhar nas bordas.",
      "Deixe descansar por 10 minutos antes de cortar — isso garante que as camadas fiquem firmes ao servir.",
      "Corte em quadrados e sirva acompanhado de salada verde e pão italiano."
    ],
    tips: [
      "Faça a bolonhesa e o bechamel no dia anterior para facilitar a montagem.",
      "Para uma lasanha mais firme, use menos bechamel. Para mais cremosa, use mais.",
      "Congelada antes de assar aguenta até 3 meses — ótimo para ter no estoque."
    ]
  },
  {
    name: "Espaguete ao Alho e Óleo 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "O mais simples e saboroso — alho dourado, azeite e pimenta calabresa",
    category: "Massas",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 5,
    cookTime: 15,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "400 g de espaguete",
      "8 dentes de alho laminados",
      "120 ml de azeite extravirgem de boa qualidade",
      "1 colher de chá de pimenta calabresa",
      "salsinha fresca picada",
      "sal grosso",
      "parmesão ralado (opcional)"
    ],
    instructions: [
      "Ferva água abundante com sal grosso. A água bem salgada é o único tempero que o macarrão absorve neste prato simples.",
      "Enquanto a água ferve, lamine os dentes de alho em fatias finas no sentido do comprimento. Uniformidade é importante para que dourem ao mesmo tempo.",
      "Em uma frigideira grande, coloque o azeite frio e o alho JUNTOS. Ligue o fogo médio-baixo. Cozinhe lentamente por 4–5 minutos — o alho deve ficar dourado claro e perfumado, nunca queimado (amargo).",
      "Adicione a pimenta calabresa e mexa por 30 segundos. Desligue o fogo imediatamente.",
      "Cozinhe o espaguete até al dente. Reserve 1 xícara grande da água do cozimento antes de escorrer.",
      "Adicione o macarrão escorrido diretamente na frigideira com o azeite de alho. Ligue o fogo médio. Adicione 3–4 colheres de sopa da água do macarrão e mexa vigorosamente por 1–2 minutos — a mistura deve ficar brilhante e envolver bem os fios.",
      "Finalize com salsinha picada, ajuste o sal e sirva imediatamente. A simplicidade deste prato depende de ingredientes de qualidade — use bom azeite."
    ],
    tips: [
      "Nunca queime o alho — o prato inteiro fica amargo.",
      "A água do macarrão emulsifica com o azeite criando um molho leve.",
      "Versão completa: adicione anchovas junto com o alho para profundidade de sabor."
    ]
  },
  {
    name: "Penne ao Pesto de Manjericão 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Molho verde intenso com manjericão, pinhão, parmesão e azeite",
    category: "Massas",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 12,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "400 g de penne",
      "2 maços grandes de manjericão fresco (folhas apenas)",
      "3 dentes de alho",
      "60 g de pinhão (ou castanha de caju)",
      "80 g de parmesão ralado",
      "150 ml de azeite extravirgem",
      "suco de ½ limão",
      "sal e pimenta",
      "tomate-cereja para servir (opcional)"
    ],
    instructions: [
      "Toste levemente o pinhão em frigideira seca por 2–3 minutos, mexendo sempre, até dourar levemente. Deixe esfriar — o pinhão cru tem sabor mais agudo.",
      "No processador ou liquidificador, bata o alho com o sal grosso primeiro (o sal ajuda a triturar). Adicione o pinhão tostado e pulse algumas vezes.",
      "Adicione as folhas de manjericão e o parmesão. Bata em intervalos curtos — pesto não deve ser superprocessado, deve ter textura.",
      "Com o processador ligado em velocidade baixa, adicione o azeite em fio contínuo até emulsificar. O pesto deve ficar verde vibrante e espesso.",
      "Ajuste com suco de limão, sal e pimenta. Se ficar muito grosso, adicione mais azeite. Transfira para tigela e cubra com uma camada fina de azeite para não oxidar (escurecer).",
      "Cozinhe o penne em água bem salgada até al dente. Reserve ½ xícara da água do cozimento.",
      "Escorra o penne e misture ao pesto em tigela grande. Adicione a água do cozimento aos poucos para ajustar a consistência — o molho deve envolver cada peça.",
      "Sirva imediatamente com parmesão extra e tomate-cereja cortado ao meio. Pesto não deve ser aquecido, o calor do macarrão é suficiente."
    ],
    tips: [
      "Para preservar a cor verde, branqueie o manjericão por 15 seg em água fervente e resfrie em gelo antes de processar.",
      "Pesto congelado em forminhas de gelo dura 3 meses.",
      "Substitua pinhão por nozes ou castanha para variar o sabor."
    ]
  },
  {
    name: "Macarrão com Molho Branco de Frango 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Molho bechamel cremoso com frango desfiado — confortante e fácil",
    category: "Massas",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 25,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "500 g de macarrão (penne, fusilli ou espaguete)",
      "2 peitos de frango cozidos e desfiados",
      "500 ml de leite integral",
      "50 g de manteiga",
      "3 colheres de sopa de farinha de trigo",
      "200 ml de creme de leite",
      "100 g de mussarela ralada",
      "1 cebola picada",
      "noz-moscada, sal e pimenta",
      "salsinha para finalizar"
    ],
    instructions: [
      "Cozinhe os peitos de frango em água com sal, cebola e louro por 20 min. Deixe esfriar e desfie em pedaços médios (não muito fino). Reserve o caldo.",
      "Faça o bechamel: derreta a manteiga em fogo médio, refogue a cebola picada até amolecer (3 min). Adicione a farinha e mexa por 1 min até formar uma pasta.",
      "Despeje o leite morno gradualmente, mexendo com fouet sem parar para não empelotar. Cozinhe em fogo médio por 8–10 min até encorpar.",
      "Adicione o creme de leite e metade da mussarela. Mexa até derreter. Tempere com sal, pimenta e noz-moscada generosa. Adicione o frango desfiado ao molho.",
      "Cozinhe o macarrão em água com sal até al dente. Escorra e misture ao molho de frango.",
      "Transfira para um refratário, cubra com o restante da mussarela e leve ao forno/grill por 10 min até gratinar.",
      "Finalize com salsinha picada e sirva quente. O prato pode ser montado e gratinado mais tarde — ótimo para preparar com antecedência."
    ],
    tips: [
      "Use caldo do cozimento do frango no lugar de parte do leite para intensificar o sabor.",
      "Adicione ervilhas congeladas no molho para mais cor e nutrição.",
      "Se sobrar molho, guarde separado do macarrão para não engorchar."
    ]
  },
  {
    name: "Fettuccine Alfredo 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Massa com manteiga, parmesão e creme — receita italiana clássica",
    category: "Massas",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 5,
    cookTime: 15,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "400 g de fettuccine fresco ou seco",
      "100 g de manteiga sem sal",
      "200 ml de creme de leite fresco",
      "150 g de parmesão recém-ralado",
      "sal grosso e pimenta-do-reino",
      "noz-moscada a gosto"
    ],
    instructions: [
      "Cozinhe o fettuccine em água bastante salgada até al dente. O sal na água é fundamental — a massa deve absorver sabor durante o cozimento.",
      "Em uma frigideira grande, derreta a manteiga em fogo baixo. Não deixe dourar — apenas derreter gentilmente.",
      "Adicione o creme de leite fresco e aqueça em fogo médio até começar a borbulhar levemente nas bordas (não ferver completamente).",
      "Reserve ½ xícara da água do cozimento. Escorra o fettuccine e adicione à frigideira, fogo desligado.",
      "Adicione o parmesão ralado em três adições, mexendo entre cada adição até derreter completamente. Se o molho estiver muito espesso, adicione água do cozimento colher por colher.",
      "Tempere com pimenta-do-reino e noz-moscada. Prove e ajuste o sal (o parmesão já é salgado).",
      "Sirva imediatamente em pratos aquecidos. Alfredo endurece rapidamente ao esfriar — sirva sem demora."
    ],
    tips: [
      "Parmesão recém-ralado derrete melhor que o pré-ralado.",
      "Para versão completa, adicione frango grelhado fatiado ou camarão.",
      "Fettuccine fresco (massas frescas de mercado) absorve melhor o molho."
    ]
  },
  {
    name: "Talharim ao Molho de Funghi 📋", emoji: "🥣", region: "INT", estimatedCost: "high", 
    description: "Macarrão com cogumelos porcini, vinho branco e creme",
    category: "Massas",
    type: "dinner",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "400 g de talharim",
      "50 g de funghi porcini seco",
      "300 g de cogumelo shitake ou champignon fresco",
      "1 cebola pequena picada",
      "3 dentes de alho",
      "1 xícara de vinho branco seco",
      "200 ml de creme de leite",
      "azeite, sal, pimenta",
      "tomilho fresco",
      "parmesão para servir"
    ],
    instructions: [
      "Hidrate o funghi porcini seco em 300 ml de água morna por 20 minutos. Escorra reservando o líquido de hidratação (esse caldo é ouro para o molho). Pique o funghi hidratado grosseiramente.",
      "Aqueça o azeite em frigideira grande. Refogue a cebola por 3 min. Adicione o alho e mexa por 1 min.",
      "Adicione os cogumelos frescos fatiados em fogo alto — mexendo pouco para que dourem em vez de cozinhar no próprio vapor (7–8 min). Eles devem ficar bem dourados.",
      "Adicione o funghi porcini hidratado e o tomilho. Mexa por 2 min.",
      "Despeje o vinho branco e deixe evaporar completamente (2–3 min) até sentir que o cheiro de álcool foi embora.",
      "Adicione o caldo de hidratação do funghi coado (passe pela peneira para reter impurezas) e cozinhe em fogo médio por 5 min até reduzir pela metade.",
      "Adicione o creme de leite, mexa bem e cozinhe por mais 3–4 min até encorpar levemente. Ajuste temperos.",
      "Cozinhe o talharim al dente, escorra e misture ao molho. Sirva com parmesão ralado e tomilho fresco."
    ],
    tips: [
      "O líquido de hidratação do porcini tem sabor intenso — não descarte.",
      "Para versão vegana, substitua o creme de leite por creme de castanha.",
      "Adicione uma noz de manteiga no final para brilho e riqueza."
    ]
  },
  {
    name: "Macarrão com Frutos do Mar 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description:
      "Espaguete com camarão, lula e mexilhão em molho de tomate e vinho",
    category: "Massas",
    type: "dinner",
    difficulty: "médio",
    prepTime: 25,
    cookTime: 20,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "400 g de espaguete",
      "300 g de camarão limpo",
      "200 g de lula em anéis",
      "200 g de mexilhão",
      "4 tomates maduros picados (ou 400 g tomate pelado)",
      "4 dentes de alho laminados",
      "150 ml de vinho branco seco",
      "pimenta calabresa, azeite",
      "salsinha e coentro",
      "sal e pimenta-do-reino"
    ],
    instructions: [
      "Tempere todos os frutos do mar com sal, pimenta-do-reino e um fio de limão. Reserve separados — cada um tem tempo de cozimento diferente.",
      "Em frigideira grande, aqueça azeite em fogo alto. Saltei o camarão por 1–2 min de cada lado até ficarem rosados. Remova e reserve.",
      "Na mesma frigideira, saltei os anéis de lula por 1–1,5 min — não mais que isso ou ficam borrachudos. Reserve.",
      "Refogue o alho laminado em azeite por 1 min até dourar. Adicione a pimenta calabresa a gosto.",
      "Adicione os tomates picados, amassando levemente, e cozinhe em fogo médio por 5 min. Despeje o vinho branco e deixe evaporar (2 min).",
      "Adicione o mexilhão ao molho de tomate e tampe por 3 min — eles devem abrir. Descarte os que não abrirem.",
      "Cozinhe o espaguete al dente. Escorra e adicione ao molho com o camarão e a lula. Mexa por 1 min para aquecer e integrar.",
      "Finalize com salsinha e coentro picados. Sirva imediatamente — frutos do mar não podem ser reaquecidos."
    ],
    tips: [
      "Não cozinhe o camarão e a lula demais — ficam borrachudos.",
      "Se usar mexilhão em conserva, adicione no final apenas para aquecer.",
      "Vinho branco seco (não suave) é essencial para o sabor correto."
    ]
  },
  {
    name: "Macarrão com Queijo (Mac and Cheese) 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description:
      "Versão cremosa e gratinada do clássico americano com blend de queijos",
    category: "Massas",
    type: "snack",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 25,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1543826173-70651703c5a4?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "400 g de cotovelo (macarrão caracol)",
      "50 g de manteiga",
      "3 colheres de farinha de trigo",
      "500 ml de leite integral",
      "200 g de cheddar inglês ou queijo americano ralado",
      "100 g de gouda ou mussarela",
      "1 colher de chá de mostarda dijon",
      "páprica defumada",
      "sal, pimenta, noz-moscada",
      "farinha de rosca para gratinar"
    ],
    instructions: [
      "Cozinhe o macarrão cotovelo em água bem salgada por 1–2 min a menos do tempo indicado (vai terminar de cozinhar no forno). Escorra e reserve.",
      "Faça o molho de queijo: derreta a manteiga em fogo médio. Adicione a farinha e mexa por 1 min formando roux.",
      "Despeje o leite morno gradualmente, mexendo com fouet sem parar. Cozinhe por 6–8 min até encorpar e não sentir mais sabor de farinha crua.",
      "Retire do fogo. Adicione a mostarda e metade dos queijos, mexendo até derreter completamente. Tempere com sal, pimenta, páprica e noz-moscada.",
      "Misture o macarrão escorrido ao molho de queijo. A mistura deve ficar bem cremosa.",
      "Transfira para um refratário untado. Cubra com o restante dos queijos e farinha de rosca misturada com um fio de azeite.",
      "Asse em forno a 190 °C por 20–25 min até dourar e borbulhar. Deixe descansar 5 min antes de servir.",
      "Para versão mais indulgente, adicione bacon crocante por cima antes de servir."
    ],
    tips: [
      "Não deixe o macarrão cozinhar demais — ele termina no forno.",
      "Cheddar inglês tem sabor mais intenso que o processado — preferível.",
      "O molho vai parecer liquido mas endurece no forno."
    ]
  },
  {
    name: "Nhoque de Batata ao Molho de Tomate 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description:
      "Nhoque caseiro fofinho com molho simples de tomate e manjericão",
    category: "Massas",
    type: "lunch",
    difficulty: "médio",
    prepTime: 40,
    cookTime: 20,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1616299908295-0a0a18b0f59b?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 kg de batata asterix ou monalisa",
      "200-250 g de farinha de trigo",
      "1 ovo",
      "1 gema",
      "sal, pimenta e noz-moscada",
      "MOLHO: 400 g tomate pelado",
      "1 cebola, 3 dentes de alho",
      "azeite, sal, pimenta, manjericão",
      "parmesão para servir"
    ],
    instructions: [
      "Cozinhe as batatas COM a casca em água salgada até que um garfo entre facilmente (25–30 min). A casca protege da água e o nhoque fica mais leve com menos umidade.",
      "Escorra e, ainda quente, descasque e passe pelo espremedor de batatas (nunca no liquidificador). Espalhe no mármore ou tabuleiro para amornar e evaporar o excesso de vapor.",
      "Quando morno (não frio), faça um vulcão com a batata, adicione o ovo, a gema, noz-moscada, sal e pimenta. Adicione 200 g de farinha e amasse gentilmente, apenas até incorporar. Não over-amassar — nhoque fica duro.",
      "Se a massa grudar muito, adicione farinha colher por colher. O ponto certo: a massa não gruda nas mãos, mas é macia e levemente pegajosa.",
      "Divida a massa e enrole em rolinhos de 2 cm de diâmetro. Corte em pedaços de 2–2,5 cm. Passe levemente no garfo para fazer as estrias (segura o molho).",
      "Coloque os nhoques numa assadeira enfarinhada enquanto prepara o molho.",
      "MOLHO: Refogue cebola e alho no azeite (4 min). Adicione os tomates pelados esmagados, sal, pimenta e cozinhe por 15 min. Finalize com manjericão.",
      "Cozinhe os nhoques em água fervente com sal em pequenas levas — quando subirem à superfície (2–3 min), estão prontos. Remova com escumadeira e misture ao molho. Sirva com parmesão."
    ],
    tips: [
      "Fuja da tentação de usar batata fria — o nhoque fica elástico.",
      "A quantidade de farinha varia conforme a umidade da batata — vá adicionando devagar.",
      "Para nhoque de gorgonzola: substitua o molho de tomate por manteiga com sálvia e gorgonzola derretido."
    ]
  },
  {
    name: "Ravioli de Ricota e Espinafre 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "Pasta recheada caseira com recheio de ricota, espinafre e parmesão",
    category: "Massas",
    type: "dinner",
    difficulty: "difícil",
    prepTime: 60,
    cookTime: 15,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1559561853-08451507bdb0?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "MASSA: 300 g de farinha 00 ou tipo 1",
      "3 ovos inteiros",
      "1 colher de sopa de azeite",
      "pitada de sal",
      "RECHEIO: 300 g de ricota fresca",
      "200 g de espinafre cozido e espremido",
      "80 g de parmesão ralado",
      "1 ovo",
      "noz-moscada, sal e pimenta",
      "MOLHO: manteiga, sálvia fresca"
    ],
    instructions: [
      "MASSA: Faça um vulcão com a farinha. No centro, adicione os ovos, azeite e sal. Incorpore gradualmente a farinha de fora para dentro. Amasse vigorosamente por 10 min até obter uma massa lisa e elástica.",
      "Embrulhe em plástico e deixe descansar em temperatura ambiente por 30 min (crucial para relaxar o glúten e facilitar a abertura).",
      "RECHEIO: Esprema muito bem o espinafre cozido para retirar toda a água (use um pano). Pique fino. Misture com a ricota, parmesão, ovo, noz-moscada, sal e pimenta. O recheio não pode ter umidade.",
      "Divida a massa em 4 partes. Abra cada parte fina (2 mm) com rolo ou máquina. Sobre metade da massa, coloque porções do recheio (1 colher de chá) espaçadas 4 cm uma da outra.",
      "Pincele a massa ao redor do recheio com água. Dobre a outra metade da massa por cima, pressionando ao redor de cada porção para expulsar o ar.",
      "Corte o ravioli com cortador dentado ou faca. Pressione bem as bordas com o garfo. Disponha em tabuleiro enfarinhado.",
      "Cozinhe em água abundante e salgada por 4–5 min até flutuarem e a massa ficar al dente.",
      "MOLHO DE MANTEIGA E SÁLVIA: Derreta 80 g de manteiga com folhas de sálvia em fogo baixo por 3 min até perfumar. Escorra o ravioli e napper com a manteiga aromática. Sirva com parmesão."
    ],
    tips: [
      "Farinha 00 dá massa mais sedosa; farinhas brasileiras tipo 1 funcionam bem também.",
      "Ar dentro do ravioli causa bolhas na cozedura — expulse bem.",
      "Faça grandes levas e congele antes de cozinhar — duram 3 meses."
    ]
  },
  {
    name: "Macarrão ao Sugo 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description:
      "Molho de tomate simples e perfeito — a base de tudo na cozinha italiana",
    category: "Massas",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 5,
    cookTime: 25,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1598866594230-a7c12756260f?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "400 g de macarrão (qualquer formato)",
      "800 g de tomate maduro ou 2 latas de tomate pelado",
      "4 dentes de alho inteiros",
      "5 colheres de sopa de azeite",
      "folhas de manjericão fresco",
      "1 colher de café de açúcar (para acidez)",
      "sal e pimenta-do-reino"
    ],
    instructions: [
      "Em panela funda, aqueça o azeite e doure os dentes de alho INTEIROS em fogo médio-baixo por 3–4 min até dourar. O alho inteiro dá sabor delicado sem amargar.",
      "Se usar tomates frescos: corte ao meio, remova as sementes e rale na caixa grossa (descarte a casca). Se usar pelados: amasse com as mãos.",
      "Adicione os tomates ao azeite com alho, tempere com sal e o açúcar (reduz a acidez). Tampe parcialmente e cozinhe em fogo médio por 20–25 min, mexendo de vez em quando.",
      "O molho está pronto quando a cor saturou de vermelho-laranja e o azeite começou a subir na superfície. Retire o alho (ou amasse dentro do molho para sabor mais intenso).",
      "Finalize com manjericão fresco rasgado. Nunca cozinhe o manjericão — o calor mata o aroma.",
      "Cozinhe o macarrão al dente. Misture ao molho com 2–3 colheres da água do cozimento.",
      "Sirva com parmesão e mais manjericão. Este molho é a base de inúmeras outras preparações — aprenda e domine."
    ],
    tips: [
      "San Marzano enlatado dá resultado superior ao tomate fresco fora de estação.",
      "O azeite que sobe na superfície é sinal de molho bem cozido.",
      "Nunca use açúcar em excesso — apenas neutralizar a acidez."
    ]
  },
  {
    name: "Cacio e Pepe 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "A trindade romana: massa, queijo e pimenta — nada mais, nada menos",
    category: "Massas",
    type: "lunch",
    difficulty: "médio",
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "200 g de tonnarelli, spaghetti grosso ou bucatini",
      "100 g de pecorino romano ralado finissimo",
      "50 g de parmesão ralado finissimo",
      "2 colheres de chá de pimenta-do-reino em grãos",
      "sal para a água"
    ],
    instructions: [
      "Torre os grãos de pimenta-do-reino em frigideira seca por 1–2 min até perfumar. Em seguida, moa grosseiramente no pilão ou processe brevemente — pedaços médios, não pó. Reserve.",
      "Combine pecorino e parmesão ralados em uma tigela. Reserve.",
      "Cozinhe a massa em menor quantidade de água que o normal (assim fica mais concentrada em amido — fundamental). Reserve ½ xícara de água do cozimento quando tirar.",
      "Na frigideira, coloque a pimenta moída com 2 colheres de água do cozimento e leve ao fogo médio por 1 min até soltar os óleos da pimenta.",
      "Escorra a massa (al dente) e adicione à frigideira, fogo médio-baixo. Misture bem com a pimenta.",
      "FORA DO FOGO: adicione metade dos queijos e ½ concha da água do macarrão. Mexa vigorosamente com pinça ou colher, fazendo movimentos circulares enérgicos por 1–2 min até o queijo não estar mais granulado mas sim cremoso.",
      "Adicione mais queijo e mais água, aos poucos, até obter creme sedoso e brilhante. Se necessário, volte ao fogo muito baixo por segundos.",
      "Sirva imediatamente com mais pimenta moída por cima. Simplíssimo e perfeito."
    ],
    tips: [
      "O segredo é a temperatura: quente demais = queijo empedrado. Fria demais = não derrete.",
      "Pecorino romano é salgado e pungente — não adicione sal à massa.",
      "Adicione a água do macarrão aos poucos, o ponto muda rapidamente."
    ]
  },
  {
    name: "Tagliatelle ao Ragù de Cordeiro 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Massa larga com molho de cordeiro desfiado, rosmarinho e vinho",
    category: "Massas",
    type: "dinner",
    difficulty: "difícil",
    prepTime: 30,
    cookTime: 90,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "500 g de tagliatelle",
      "800 g de pernil de cordeiro (com osso)",
      "1 cebola, 2 cenouras, 2 talos de salsão",
      "1 garrafa de vinho tinto encorpado",
      "400 g de tomate pelado",
      "rosmarinho, tomilho, louro",
      "4 dentes de alho",
      "azeite, sal, pimenta",
      "parmesão para servir"
    ],
    instructions: [
      "Tempere o cordeiro com sal, pimenta e rosmarinho. Em panela de fundo grosso, aqueça azeite em fogo alto e sele o cordeiro por todos os lados por 8–10 min até dourar bem — essa cor é sabor.",
      "Reserve a carne. Na mesma panela, reduza para fogo médio. Adicione cebola, cenouras e salsão picados (soffritto) e refogue por 8 min até caramelizar levemente.",
      "Adicione o alho picado e as ervas (rosmarinho, tomilho, louro). Mexa por 1 min.",
      "Despeje o vinho tinto e raspe bem o fundo para soltar os pedaços caramelizados. Deixe reduzir pela metade (10 min).",
      "Adicione os tomates pelados esmagados. Volte o cordeiro, adicione água suficiente para cobrir parcialmente. Tampe e cozinhe em fogo muito baixo por 1,5–2 horas (ou pressão por 40 min).",
      "Quando a carne estiver desfiando, retire e desfie com dois garfos, retirando ossos. Volte a carne desfiada ao molho.",
      "Reduza o molho descoberto por mais 10 min se ainda muito líquido. Ajuste temperos.",
      "Cozinhe o tagliatelle al dente. Escorra e misture cuidadosamente ao ragù com um pouco da água do cozimento. Sirva com parmesão ralado grosso."
    ],
    tips: [
      "Ragù fica melhor no dia seguinte — faça com antecedência.",
      "Qualquer corte de cordeiro serve: paleta, costilhar, pescoço.",
      "Para versão mais simples, use carne bovina (ossobuco ou acém)."
    ]
  },
  {
    name: "Macarrão de Pressão 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Macarrão cozido diretamente na panela de pressão com carne moída e molho",
    category: "Massas",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 15,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "500 g de macarrão parafuso ou penne",
      "500 g de carne moída",
      "1 cebola picada",
      "3 dentes de alho",
      "500 ml de molho de tomate pronto",
      "500 ml de água",
      "sal, orégano, pimenta",
      "1 cubo de caldo de carne"
    ],
    instructions: [
      "Na panela de pressão, aqueça um fio de óleo e refogue a cebola por 3 min. Adicione o alho e mexa por 1 min.",
      "Adicione a carne moída e cozinhe por 5 min quebrando com a colher até não restar partes cruas. Tempere com sal, pimenta e orégano.",
      "Adicione o molho de tomate, a água e o cubo de caldo. Misture bem.",
      "Adicione o macarrão SECO por cima do molho. Não misture — apenas certifique que está coberto pelo líquido.",
      "Feche a panela de pressão. Leve ao fogo alto até pegar pressão, reduza para médio e cozinhe por exatamente 4 minutos.",
      "Desligue e aguarde a pressão sair naturalmente por 3–4 minutos. Abra com cuidado.",
      "Mexa bem — se estiver com muita água, deixe no fogo baixo por 2 min descoberto. Se estiver seco, add um pouco de água quente.",
      "Ajuste o sal e sirva com queijo ralado e pimenta."
    ],
    tips: [
      "Cada marca de macarrão tem tempo diferente — se o pacote diz 8 min, cozinhe na pressão por 4 min.",
      "Nunca encha a pressão mais que 2/3 da capacidade com macarrão.",
      "Ideal para dias corridos — 20 minutos do início ao fim."
    ]
  },
  {
    name: "Espaguete Cacio e Limone 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Variação leve com limão-siciliano, queijo e pimenta branca",
    category: "Massas",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "200 g de espaguete",
      "raspa e suco de 1 limão-siciliano",
      "80 g de pecorino ou parmesão ralado",
      "2 colheres de sopa de manteiga",
      "pimenta-do-reino branca",
      "azeite extravirgem"
    ],
    instructions: [
      "Rale o limão antes de espremer — as raspas têm os óleos essenciais mais perfumados.",
      "Cozinhe o espaguete al dente. Reserve ½ xícara da água do cozimento.",
      "Em frigideira pequena, derreta a manteiga em fogo baixo. Adicione as raspas de limão e aqueça por 30 seg — não deixe a manteiga dourar.",
      "Escorra o macarrão e transfira par a frigideira. Desligue o fogo. Adicione 3 colheres da água do cozimento e o suco de limão.",
      "Misture metade do queijo com movimentos enérgicos. Adicione mais água e queijo alternadamente até obter creme que envolva os fios.",
      "Tempere com pimenta branca, um fio de azeite. Sirva com mais queijo."
    ],
    tips: [
      "Limão-siciliano tem acidez mais suave que o Tahiti.",
      "Pimenta branca tem sabor floral diferente da preta."
    ]
  },
  {
    name: "Orzo Cremoso de Forno 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Massa tipo arroz cozida no caldo com queijo e legumes — comfort food",
    category: "Massas",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "300 g de orzo (massa risoni)",
      "1 cebola picada",
      "2 dentes de alho",
      "600 ml de caldo de frango",
      "200 ml de creme de leite",
      "100 g de parma ou presunto",
      "ervilhas, espinafre ou qualquer vegetal",
      "parmesão, sal, pimenta"
    ],
    instructions: [
      "Pré-aqueça o forno a 180 °C. Em frigideira de ferro ou refratário de forno, refogue cebola e alho no azeite por 3 min.",
      "Adicione o orzo seco e toste por 2 min mexendo, como se fosse risoto.",
      "Adicione o caldo quente e o creme de leite. Misture, junte os vegetais e o presunto picado. Tempere com sal e pimenta.",
      "Leve ao forno coberto com alumínio por 15 min. Retire o alumínio, mexa e volte por mais 10–12 min.",
      "O orzo deve estar al dente e o molho cremoso. Finalize com parmesão ralado por cima e volte ao forno por 3–5 min para gratinar levemente.",
      "Sirva direto do refratário com salada verde."
    ],
    tips: [
      "Orzo/risoni é encontrado em mercados maiores ou lojas de importados.",
      "Funciona muito bem como acompanhamento de carnes assadas."
    ]
  },
  {
    name: "Tortiglioni ao Amatriciana 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Molho romano de guanciale, tomate e pecorino com toque de pimenta",
    category: "Massas",
    type: "lunch",
    difficulty: "médio",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1622973536968-3ead9e780960?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "400 g de tortiglioni ou bucatini",
      "200 g de guanciale (ou pancetta/bacon defumado)",
      "400 g de tomate pelado San Marzano",
      "1 cebola pequena",
      "150 ml de vinho branco seco",
      "pimenta calabresa em flocos",
      "100 g de pecorino romano ralado",
      "azeite, sal"
    ],
    instructions: [
      "Corte o guanciale em tiras ou cubinhos de 1 cm. Em frigideira, aqueça em fogo médio sem óleo extra — a gordura própria derreterá.",
      "Cozinhe o guanciale por 6–8 min até dourar e ficar crocante. Retire com escumadeira e reserve, deixando a gordura na frigideira.",
      "Na gordura do guanciale, refogue a cebola fatiada fina por 4 min. Adicione a pimenta calabresa a gosto e mexa por 30 seg.",
      "Despeje o vinho branco e deixe evaporar por 1–2 min. Adicione os tomates pelados esmagados.",
      "Cozinhe em fogo médio por 15–18 min até o molho reduzir e encorpar. Junte o guanciale reservado. Ajuste o sal (guanciale é salgado — cuidado).",
      "Cozinhe o macarrão al dente. Escorra reservando a água de cozimento.",
      "Misture o macarrão ao molho com 2–3 colheres da água. Sirva imediatamente com pecorino ralado generoso.",
      "Proibido: creme de leite, alho, pimenta preta ou parmesão nesta receita — é traição ao original romano!"
    ],
    tips: [
      "A Denominação de Origem deste prato exige guanciale e pecorino — sem substitutos para ser autêntico.",
      "Bucatini (macarrão com furo) é o formato oficial da Amatriciana.",
      "O molho deve ter equilíbrio entre gordura, acidez e picância."
    ]
  },
  {
    name: "Macarrão Instantâneo Gourmet 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Transforme o miojo em refeição de nível com ovos, legumes e molho especial",
    category: "Massas",
    type: "snack",
    difficulty: "fácil",
    prepTime: 5,
    cookTime: 10,
    servings: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 pacote de macarrão instantâneo (qualquer sabor)",
      "1 ovo",
      "cebolinha picada",
      "gergelim torrado",
      "1 colher de manteiga",
      "1 colher de soja",
      "pimenta sriracha ou chili oil",
      "1 dente de alho ralado"
    ],
    instructions: [
      "Cozinhe o macarrão em água fervente por 2 min — al dente, não mole. Escorra reservando ¼ xícara da água do cozimento.",
      "Na panela limpa e quente, derreta a manteiga e refogue o alho ralado por 30 seg.",
      "Adicione metade do sachê de tempero (menos sódio), soja e uma colher da água do cozimento. Mexa.",
      "Adicione o macarrão escorrido e mexa para envolver no molho.",
      "Empurre o macarrão para o lado e frite o ovo estrelado na mesma panela.",
      "Transfira para tigela, coloque o ovo por cima, polvilhe cebolinha, gergelim e adicione a pimenta a gosto.",
      "Sirva imediatamente — o contraste do ovo mole com o macarrão temperado é o segredo."
    ],
    tips: [
      "Use apenas metade do sachê de tempero para reduzir sódio.",
      "Adicione bok choy ou espinafre cru para mais nutrição."
    ]
  }
];
