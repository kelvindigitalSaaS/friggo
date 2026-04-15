import { Recipe } from "@/types/friggo";

export const receitasMexicana: Recipe[] = [
  {
    id: "mexicana-001",
    name: "Tacos de Carne Asada 📋", emoji: "🥩", region: "LATAM", estimatedCost: "low", 
    description:
      "Tacos mexicanos tradicionais com carne grelhada e salsa fresca",
    category: "Comida Mexicana",
    type: "dinner",
    prepTime: 20,
    cookTime: 15,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "600g de flank steak ou alcatra",
      "8 tortillas de milho",
      "Cebola branca picada",
      "Coentro fresco",
      "Limão",
      "Alho",
      "Cominho e orégano",
      "Sal e pimenta",
      "Salsa de tomate"
    ],
    steps: [
      "Marine a carne com alho, limão, cominho, orégano, sal e pimenta por 30 min",
      "Grelhe em fogo muito alto por 3-4 min cada lado para medium-rare",
      "Deixe descansar e fatie contra as fibras em tiras finas",
      "Aqueça as tortillas numa frigideira seca por 30 seg cada",
      "Monte os tacos com carne, cebola e coentro",
      "Sirva com salsa de tomate e limão"
    ],
    tips: [
      "Carne bem temperada e grelhada em alta temperatura é o segredo",
      "Tortilla de milho é mais autêntica que a de farinha"
    ]
  },
  {
    id: "mexicana-002",
    name: "Burrito de Frango 📋", emoji: "🍗", region: "LATAM", estimatedCost: "low", 
    description:
      "Tortilla de farinha gigante recheada de frango, feijão e queijo",
    category: "Comida Mexicana",
    type: "lunch",
    prepTime: 20,
    cookTime: 20,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "2 peitos de frango",
      "4 tortillas de farinha grandes",
      "2 xícaras de feijão preto cozido",
      "1 xícara de arroz cozido temperado",
      "Queijo cheddar ralado",
      "Creme azedo ou sour cream",
      "Guacamole e salsa"
    ],
    steps: [
      "Tempere e grelhe o frango, depois desfie",
      "Aqueça o feijão com cominho e sal",
      "Aqueça as tortillas por 30 seg no micro-ondas enroladas em papel toalha",
      "Distribua arroz, feijão, frango e queijo no centro da tortilla",
      "Adicione creme azedo e salsa",
      "Dobre os lados e enrole como um cilindro firme",
      "Pode tostar na frigideira para selar"
    ],
    tips: [
      "Aquecer a tortilla antes facilita dobrar sem rachar",
      "Recheio não deve ficar muito molhado para não romper a tortilla"
    ]
  },
  {
    id: "mexicana-003",
    name: "Enchiladas de Frango ao Molho Rojo 📋", emoji: "🍗", region: "LATAM", estimatedCost: "low", 
    description:
      "Tortillas recheadas de frango e cobertas com molho de chili vermelho",
    category: "Comida Mexicana",
    type: "dinner",
    prepTime: 30,
    cookTime: 25,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "500g de frango desfiado",
      "8 tortillas de milho",
      "Molho de enchilada vermelho",
      "Queijo Oaxaca ou mussarela",
      "Cebola roxa",
      "Coentro e creme azedo"
    ],
    steps: [
      "Mergulhe as tortillas no molho de enchilada levemente",
      "Recheie cada tortilla com frango desfiado e enrole",
      "Coloque numa assadeira lado a lado",
      "Cubra com o restante do molho",
      "Distribua o queijo por cima",
      "Asse a 180°C por 20-25 min até borbulhar",
      "Sirva com coentro, cebola e creme azedo"
    ],
    tips: [
      "Molho enchilada pronto economiza tempo",
      "A tortilla de milho não rompe tão facilmente quando aquecida"
    ]
  },
  {
    id: "mexicana-004",
    name: "Nachos Supremos 📋", emoji: "🍗", region: "LATAM", estimatedCost: "low", 
    description: "Chips de milho cobertos de tudo que tem direito",
    category: "Comida Mexicana",
    type: "snack",
    prepTime: 10,
    cookTime: 15,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "1 pacote de nachos de milho",
      "200g de feijão preto cozido",
      "200g de queijo cheddar",
      "Frango desfiado temperado",
      "Jalapeño",
      "Tomate",
      "Cebola roxa",
      "Guacamole e sour cream",
      "Coentro"
    ],
    steps: [
      "Preaqueça o forno a 200°C",
      "Espalhe os nachos numa assadeira",
      "Distribua feijão e frango",
      "Cubra com queijo ralado abundante",
      "Asse por 10-12 min até o queijo derreter",
      "Tire do forno e adicione jalapeño, tomate, cebola",
      "Finalize com guacamole, sour cream e coentro"
    ],
    tips: [
      "Ingredientes frios (guacamole, sour cream) vão após o forno",
      "Coma imediatamente para aproveitar os nachos crocantes"
    ]
  },
  {
    id: "mexicana-005",
    name: "Quesadillas de Queijo e Pimentão 📋", emoji: "🌱", region: "LATAM", estimatedCost: "low", 
    description: "Tortilla grelhada com queijo derretido e pimentões coloridos",
    category: "Comida Mexicana",
    type: "snack",
    prepTime: 10,
    cookTime: 8,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "4 tortillas",
      "200g de queijo mussarela",
      "1 pimentão vermelho",
      "1 pimentão verde",
      "1 cebola",
      "Azeite",
      "Sal e cominho"
    ],
    steps: [
      "Refogue os pimentões e cebola com cominho até dourar",
      "Coloque uma tortilla na frigideira",
      "Distribua o queijo e os vegetais refogados",
      "Cubra com outra tortilla",
      "Cozinhe por 3-4 min cada lado até crocante",
      "Corte em triângulos e sirva com salsa"
    ],
    tips: [
      "Frigideira seca, sem óleo, cria tortilla bem crocante",
      "Gire a quesadilla com cuidado para não derramar o recheio"
    ]
  },
  {
    id: "mexicana-006",
    name: "Fajitas de Carne 📋", emoji: "🥩", region: "LATAM", estimatedCost: "low", 
    description:
      "Carne salteada com pimentões servida com tortillas na frigideira de ferro",
    category: "Comida Mexicana",
    type: "dinner",
    prepTime: 20,
    cookTime: 15,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "600g de alcatra em tiras",
      "2 pimentões coloridos",
      "1 cebola grande",
      "Tempero fajita (cominho, páprica, alho)",
      "Tortillas de farinha",
      "Guacamole e sour cream"
    ],
    steps: [
      "Tempere a carne e os vegetais com o tempero fajita",
      "Grelhe a carne em alta temperatura, reserve",
      "Salteie os pimentões e cebola na mesma frigideira",
      "Sirva tudo fumante diretamente na frigideira de ferro",
      "Acompanhe com tortillas quentes e os extras"
    ],
    tips: [
      "Serviço na frigideira de ferro quente é essencial para o efeito",
      "Tempere generosamente - fajita pede muito sazón"
    ]
  },
  {
    id: "mexicana-007",
    name: "Guacamole Clássico 📋", emoji: "🍝", region: "LATAM", estimatedCost: "low", 
    description:
      "A pasta de abacate mais famosa do mundo, feita autenticamente",
    category: "Comida Mexicana",
    type: "snack",
    prepTime: 10,
    cookTime: 0,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "3 abacates Hass maduros",
      "Suco de 2 limas",
      "1/4 cebola branca finamente picada",
      "1 tomate sem sementes picado",
      "1 pimenta jalapeño ou serrano",
      "Coentro fresco",
      "Sal"
    ],
    steps: [
      "Corte os abacates ao meio e retire o caroço",
      "Amasse com um garfo em molcajete ou tigela",
      "Mantenha alguns pedaços para textura",
      "Adicione cebola, tomate, pimenta e coentro",
      "Esprima as limas",
      "Tempere com sal",
      "Misture delicadamente"
    ],
    tips: [
      "Lime (lima ácida) é preferível ao limão",
      "Sirva imediatamente ou cubra diretamente com plástico para não oxidar"
    ]
  },
  {
    id: "mexicana-008",
    name: "Chili Con Carne 📋", emoji: "🥩", region: "LATAM", estimatedCost: "low", 
    description: "Guisado americano-mexicano de carne moída com feijão e chili",
    category: "Comida Mexicana",
    type: "dinner",
    prepTime: 15,
    cookTime: 60,
    difficulty: "fácil",
    servings: 6,
    ingredients: [
      "500g de carne moída",
      "1 lata de feijão vermelho",
      "1 lata de tomate pelado",
      "1 cebola",
      "3 dentes de alho",
      "2 colheres de chili em pó",
      "Cominho e páprica defumada",
      "Sal"
    ],
    steps: [
      "Doure a carne moída, escorra o excesso de gordura",
      "Adicione cebola e alho, refogue 3 min",
      "Adicione o chili, cominho e páprica, mexa 1 min",
      "Adicione o tomate e feijão",
      "Cozinhe em fogo baixo por 45-60 min",
      "Sirva com arroz, pão de milho ou nachos"
    ],
    tips: [
      "Quanto mais tempo cozinha, mais rico o sabor",
      "Chili com carne melhora no dia seguinte"
    ]
  },
  {
    id: "mexicana-009",
    name: "Pozole Rojo de Frango 📋", emoji: "🥣", region: "LATAM", estimatedCost: "low", 
    description: "Sopa mexicana reconfortante com milho hominy e frango",
    category: "Comida Mexicana",
    type: "dinner",
    prepTime: 20,
    cookTime: 60,
    difficulty: "médio",
    servings: 6,
    ingredients: [
      "1 frango inteiro ou 1kg de coxa",
      "1 lata grande de milho hominy",
      "Pimenta guajillo ou mulato seca",
      "Cebola e alho",
      "Orégano",
      "Acompanhamentos: repolho, rábano, cebola, orégano, tostada"
    ],
    steps: [
      "Cozinhe o frango com cebola e alho em 2L de água por 45 min",
      "Retire o frango e desfie",
      "Hidrate as pimentas secas em água quente",
      "Bata as pimentas com alho e incorpore ao caldo",
      "Coe o caldo temperado",
      "Adicione o milho hominy e o frango desfiado",
      "Cozinhe por mais 15 min"
    ],
    tips: [
      "Hominy é milho nixtamalizado - diferente do milho doce comum",
      "Os acompanhamentos frescos são o que torna o pozole especial"
    ]
  },
  {
    id: "mexicana-010",
    name: "Tamales de Frango 📋", emoji: "🥣", region: "LATAM", estimatedCost: "low", 
    description:
      "Massa de milho recheada e cozida em folha de milho, tradicional nas festas",
    category: "Comida Mexicana",
    type: "meal-prep",
    prepTime: 60,
    cookTime: 60,
    difficulty: "difícil",
    servings: 12,
    ingredients: [
      "500g de masa harina (farinha de milho especial)",
      "Caldo de frango",
      "Gordura vegetal ou banha",
      "400g de frango desfiado temperado",
      "Molho de chile",
      "Folhas de milho secas"
    ],
    steps: [
      "Hidrate as folhas de milho em água quente por 30 min",
      "Bata a gordura até ficar cremosa, adicione a masa harina",
      "Adicione caldo quente aos poucos até a massa se soltar das mãos",
      "Espalhe a massa nas folhas hidratadas",
      "Coloque o recheio de frango no centro",
      "Dobre as folhas e amarre",
      "Cozinhe a vapor por 60-75 min"
    ],
    tips: [
      "A massa está no ponto quando flutu em copo de água",
      "Cozinhaher vertical na panela evita que abram"
    ]
  },
  {
    id: "mexicana-011",
    name: "Huevos Rancheros 📋", emoji: "🍳", region: "LATAM", estimatedCost: "low", 
    description: "Ovos fritos sobre tortilla com salsa de tomate picante",
    category: "Comida Mexicana",
    type: "snack",
    prepTime: 10,
    cookTime: 15,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "4 ovos",
      "4 tortillas de milho",
      "2 tomates maduros",
      "1 jalapeño",
      "1 cebola pequena",
      "Coentro",
      "Feijão preto refrito",
      "Queijo fresco"
    ],
    steps: [
      "Faça a salsa: blende tomate, jalapeño e cebola levemente",
      "Frite a salsa em frigideira com azeite por 5 min",
      "Toste as tortillas na frigideira seca",
      "Espalhe feijão refrito nas tortillas",
      "Frite os ovos estrelados",
      "Coloque os ovos sobre as tortillas",
      "Cubra com salsa e finalize com queijo e coentro"
    ],
    tips: [
      "Salsa deve ter sabor defumado da fritura",
      "Ideal para café da manhã tardio ou brunch"
    ]
  },
  {
    id: "mexicana-012",
    name: "Molho de Tomate Salsa Caseiro 📋", emoji: "🍽️", region: "LATAM", estimatedCost: "low", 
    description: "Salsa fresca ou assada — a base de toda cozinha mexicana",
    category: "Comida Mexicana",
    type: "snack",
    prepTime: 10,
    cookTime: 15,
    difficulty: "fácil",
    servings: 8,
    ingredients: [
      "4-5 tomates médios",
      "2 pimentas jalapeño ou serrano",
      "1/4 cebola branca",
      "2 dentes de alho",
      "Coentro fresco",
      "Suco de lima",
      "Sal"
    ],
    steps: [
      "Para salsa fresca (pico de gallo): pique tudo fininho e misture",
      "Para salsa assada: toste tomates, pimenta, cebola e alho na frigideira sem óleo",
      "Bata levemente no liquidificador - não muito liso",
      "Tempere com sal e lima",
      "Adicione coentro fresco ao final"
    ],
    tips: [
      "Pico de gallo é perfeito com chips",
      "Salsa assada tem sabor mais profundo e defumado"
    ]
  },
  {
    id: "mexicana-013",
    name: "Tostadas de Frango 📋", emoji: "🍗", region: "LATAM", estimatedCost: "low", 
    description: "Tortillas crocantes empilhadas com ingredientes coloridos",
    category: "Comida Mexicana",
    type: "snack",
    prepTime: 15,
    cookTime: 10,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "8 tortillas de milho",
      "300g de frango desfiado",
      "Feijão refrito",
      "Abacate",
      "Queijo fresco",
      "Alface",
      "Salsa",
      "Creme azedo"
    ],
    steps: [
      "Asse as tortillas no forno a 200°C por 8-10 min até crispar",
      "Ou frite em óleo até dourar",
      "Espalhe feijão refrito",
      "Distribua frango, alface e abacate",
      "Finalize com queijo, salsa e creme azedo"
    ],
    tips: [
      "Tortillas do forno ficam um pouco mais saudáveis",
      "Servir imediatamente é fundamental para não amolecer"
    ]
  },
  {
    id: "mexicana-014",
    name: "Sopa de Tortilla Mexicana 📋", emoji: "🥣", region: "LATAM", estimatedCost: "low", 
    description:
      "Sopa rica com caldo de tomate e chili, coberta de chips de tortilla",
    category: "Comida Mexicana",
    type: "lunch",
    prepTime: 15,
    cookTime: 30,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "2 tomates",
      "2 pimentas chipotle em adobo",
      "1 cebola",
      "3 dentes de alho",
      "1L de caldo de frango",
      "Frango desfiado",
      "Tortillas em tiras fritas",
      "Abacate, creme azedo e queijo"
    ],
    steps: [
      "Bata tomates, chipotle, cebola e alho",
      "Frite o blend em óleo por 5 min",
      "Adicione o caldo e o frango",
      "Cozinhe por 20 min",
      "Sirva a sopa nas tigelas",
      "Adicione os chips de tortilla por cima",
      "Decore com abacate, creme e queijo"
    ],
    tips: [
      "Chipotle dá sabor defumado característico",
      "Chips de tortilla entram na hora de servir para ficarem crocantes"
    ]
  },
  {
    id: "mexicana-015",
    name: "Tacos de Peixes Estilo Baja 📋", emoji: "🐟", region: "LATAM", estimatedCost: "low", 
    description: "Tacos de peixe empanado com coleslaw cremoso",
    category: "Comida Mexicana",
    type: "lunch",
    prepTime: 20,
    cookTime: 15,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "500g de tilápia ou mahi mahi",
      "Farinha, ovos e panko para empanar",
      "Repolho fatiado fino",
      "Maionese e suco de lima para coleslaw",
      "Tortillas de milho",
      "Molho chipotle",
      "Coentro"
    ],
    steps: [
      "Empane o peixe em farinha, ovo e panko",
      "Frite ou asse até crocante",
      "Faça o coleslaw: repolho com maionese e lima",
      "Aqueça as tortillas",
      "Monte os tacos com peixe, coleslaw e chipotle",
      "Finalize com coentro e lima"
    ],
    tips: [
      "Peixe branco firme funciona melhor",
      "O coleslaw cremoso equilibra a crocância do peixe"
    ]
  },
  {
    id: "mexicana-016",
    name: "Arroz Mexicano Vermelho 📋", emoji: "🥣", region: "LATAM", estimatedCost: "low", 
    description:
      "Arroz cozido com tomate e especiarias, acompanhamento clássico",
    category: "Comida Mexicana",
    type: "lunch",
    prepTime: 10,
    cookTime: 25,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "2 xícaras de arroz agulhinha",
      "1 tomate grande",
      "1/4 cebola",
      "2 dentes de alho",
      "Caldo de galinha",
      "Cominho",
      "Sal e pimenta"
    ],
    steps: [
      "Frite o arroz no azeite até dourar",
      "Bata tomate, cebola e alho no liquidificador",
      "Adicione o blend ao arroz e refogue 2 min",
      "Adicione o caldo quente (proporção 1:2)",
      "Tempere com cominho e sal",
      "Tampe e cozinhe em fogo baixo por 20 min"
    ],
    tips: [
      "Fritar o arroz antes dá cor e sabor profundo",
      "O arroz deve ficar seco e solto, não empapado"
    ]
  },
  {
    id: "mexicana-017",
    name: "Feijão Preto Refrito 📋", emoji: "🥣", region: "LATAM", estimatedCost: "low", 
    description:
      "Feijão cremoso amassado refogado — o acompanhamento essencial",
    category: "Comida Mexicana",
    type: "meal-prep",
    prepTime: 5,
    cookTime: 15,
    difficulty: "fácil",
    servings: 6,
    ingredients: [
      "2 latas de feijão preto",
      "1 cebola",
      "3 dentes de alho",
      "Cominho e orégano",
      "Azeite ou banha de porco",
      "Sal e pimenta"
    ],
    steps: [
      "Refogue cebola e alho até ficar macio",
      "Adicione o feijão com o caldo da lata",
      "Amasse com um garfo ou processador",
      "Adicione cominho e temperos",
      "Cozinhe em fogo baixo mexendo até engrossar"
    ],
    tips: [
      "Banha de porco dá sabor mais autêntico",
      "Pode fazer com feijão cozido do zero para melhor resultado"
    ]
  },
  {
    id: "mexicana-018",
    name: "Mole Negro Simplificado 📋", emoji: "🥣", region: "LATAM", estimatedCost: "low", 
    description: "O icônico molho mexicano de chocolate e chili amargo",
    category: "Comida Mexicana",
    type: "dinner",
    prepTime: 30,
    cookTime: 60,
    difficulty: "difícil",
    servings: 6,
    ingredients: [
      "Pimentas ancho e mulato secas",
      "50g de chocolate amargo 70%",
      "Tomate assado",
      "Panela de pão ou biscoito",
      "Amendoim e gergelim",
      "Especiarias: cravo, canela, cominho, pimenta preta",
      "Caldo e banha",
      "Frango ou peru para acompanhar"
    ],
    steps: [
      "Corte as pimentas e remova as sementes, toste brevemente",
      "Hidrate em água quente",
      "Toste nozes e especiarias separadamente",
      "Toste o pão ou biscoito",
      "Bata tudo junto com tomate assado",
      "Frite o blend em banha por 10 min",
      "Adicione caldo e dejche simmer 30-40 min",
      "Adicione o chocolate ao final"
    ],
    tips: [
      "Mole é o prato mais trabalhoso da cozinha mexicana, mas incomparável",
      "Prepare em lote e congele — fica melhor com o tempo"
    ]
  },
  {
    id: "mexicana-019",
    name: "Torta Ahogada (Sanduíche Afogado) 📋", emoji: "🥩", region: "LATAM", estimatedCost: "low", 
    description: "Sanduíche mexicano mergulhado em molho de chili picante",
    category: "Comida Mexicana",
    type: "lunch",
    prepTime: 15,
    cookTime: 15,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "2 biroles ou pãezinhos crocantes",
      "300g de carnitas (carne de porco)",
      "Feijão refrito",
      "Molho de chile arbol",
      "Cebola crua em argolas",
      "Orégano e limão"
    ],
    steps: [
      "Monte o sanduíche com carnitas e feijão",
      "Mergulhe ou quase-mergulhe no molho de chile quente",
      "Deixe o pão absorver o molho por 1-2 min",
      "Sirva com cebola e orégano"
    ],
    tips: [
      "O pão deve ser resistente para não desintegrar no molho",
      "Molho deve ser picante - é a essência da torta ahogada"
    ]
  },
  {
    id: "mexicana-020",
    name: "Elote (Milho no Palito Mexicano) 📋", emoji: "🍖", region: "LATAM", estimatedCost: "low", 
    description: "Milho cozido na grelha com maionese, queijo e chili",
    category: "Comida Mexicana",
    type: "snack",
    prepTime: 5,
    cookTime: 15,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "4 espigasde milho",
      "Maionese",
      "Queijo cotija ralado (ou parmesão)",
      "Chili pó e páprica",
      "Suco de lima",
      "Sal"
    ],
    steps: [
      "Grelhe o milho na espiga por 10-15 min virando",
      "Espalhe maionese sobre o milho quente",
      "Passe no queijo cotija ralado",
      "Polvilhe chili, páprica e sal",
      "Finalize com suco de lima"
    ],
    tips: [
      "Churrasco ou frigideira grelhada dá sabor defumado",
      "Versão em tigela chamase esquites - milho na colher"
    ]
  },
  {
    id: "mexicana-021",
    name: "Carnitas ao Estilo Michoacán 📋", emoji: "🥩", region: "LATAM", estimatedCost: "low", 
    description: "Carne de porco cozida na própria gordura até desfiar",
    category: "Comida Mexicana",
    type: "meal-prep",
    prepTime: 15,
    cookTime: 120,
    difficulty: "médio",
    servings: 8,
    ingredients: [
      "1,5kg de paleta de porco",
      "Suco de laranja",
      "Suco de limão",
      "Alho",
      "Orégano e cominho",
      "Sal",
      "Banha de porco"
    ],
    steps: [
      "Corte a carne em pedaços de 7cm",
      "Tempere com sal, alho, cominho e orégano",
      "Cozinhe em banha em fogo médio-baixo por 1h30",
      "Adicione os sucos e deixe reduzir",
      "A carne deve ficar crocante por fora e macia por dentro",
      "Desfie e sirva em tacos"
    ],
    tips: [
      "Cozinhar na gordura cria sabor único diferente de fritar",
      "Carnitas pode ser congelada e reconfortada facilmente"
    ]
  },
  {
    id: "mexicana-022",
    name: "Chilaquiles Rojos 📋", emoji: "🍳", region: "LATAM", estimatedCost: "low", 
    description: "Café da manhã mexicano com chips de tortilla na salsa",
    category: "Comida Mexicana",
    type: "snack",
    prepTime: 15,
    cookTime: 15,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "6 tortillas de milho",
      "Óleo para fritar",
      "Salsa roja",
      "Creme azedo",
      "Queijo fresco",
      "Cebola",
      "2 ovos (opcional)"
    ],
    steps: [
      "Corte as tortillas em triângulos e frite até crocantes",
      "Em outra frigideira, aqueça a salsa",
      "Adicione os chips de tortilla na salsa quente",
      "Misture bem — os chips absorvem o molho",
      "Sirva imediatamente com creme, queijo e cebola"
    ],
    tips: [
      "Os chips devem ser adicionados no último minuto para não amolecer demais",
      "Versão verde usa salsa verde de tomatillo"
    ]
  },
  {
    id: "mexicana-023",
    name: "Chile Verde de Porco 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description: "Guisado de porco verde com tomatillo e peppers assados",
    category: "Comida Mexicana",
    type: "dinner",
    prepTime: 20,
    cookTime: 60,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "700g de paleta de porco em cubos",
      "500g de tomatillo",
      "Pimentas Anaheim ou Hatch",
      "Jalapeño",
      "Cebola e alho",
      "Cominho e orégano",
      "Caldo de porco ou frango"
    ],
    steps: [
      "Asse os tomatillos e pimentas no forno ou no grill",
      "Bata com cebola e alho assados",
      "Sele o porco até dourar bem",
      "Adicione o blend verde",
      "Adicione o caldo",
      "Simmer por 45-50 min até o porco desmanchar"
    ],
    tips: [
      "Tomatillo pode ser substituído por tomate verde aqui no Brasil",
      "Pimentas assadas têm sabor mais complexo"
    ]
  },
  {
    id: "mexicana-024",
    name: "Churros com Chocolate Quente 📋", emoji: "🍝", region: "LATAM", estimatedCost: "low", 
    description: "O pastelão frito mexicano em palito com molho de chocolate",
    category: "Comida Mexicana",
    type: "snack",
    prepTime: 15,
    cookTime: 15,
    difficulty: "médio",
    servings: 6,
    ingredients: [
      "1 xícara de água",
      "1 xícara de farinha",
      "1 ovo",
      "1 colher de manteiga",
      "Pitada de sal",
      "Óleo para fritar",
      "Açúcar e canela",
      "100g de chocolate amargo",
      "200ml de creme de leite"
    ],
    steps: [
      "Ferva a água com manteiga e sal",
      "Adicione a farinha de uma vez e mexa vigorosamente",
      "Fora do fogo, adicione o ovo e misture bem",
      "Coloque em saco com bico estrela",
      "Frite cordas de massa em óleo a 180°C por 3-4 min",
      "Escorra, role em açúcar com canela",
      "Faça o chocolate: derreta chocolate com creme"
    ],
    tips: [
      "O churro deve ficar crocante fora e macio por dentro",
      "Não deixe o óleo nem muito frio nem muito quente"
    ]
  },
  {
    id: "mexicana-025",
    name: "Tres Leches Cake 📋", emoji: "🍳", region: "LATAM", estimatedCost: "low", 
    description:
      "Bolo de leite triple embebido — a sobremesa mais viciante do México",
    category: "Comida Mexicana",
    type: "snack",
    prepTime: 30,
    cookTime: 30,
    difficulty: "médio",
    servings: 12,
    ingredients: [
      "4 ovos",
      "1 xícara de açúcar",
      "1 xícara de farinha",
      "1 lata de leite condensado",
      "1 lata de creme de leite",
      "1 xícara de leite integral",
      "Chantilly para cobertura"
    ],
    steps: [
      "Bata os ovos com açúcar até triplicar de volume",
      "Incorpore a farinha peneirada com cuidado",
      "Asse a 180°C por 25-30 min",
      "Deixe esfriar completamente",
      "Faça furos no bolo com garfo",
      "Misture as 3 caldas de leite e despeje sobre o bolo",
      "Refrigere por 2h mínimo",
      "Cubra com chantilly antes de servir"
    ],
    tips: [
      "O bolo embebe mais enquanto refrigerado overnight",
      "Deve ficar bem úmido e encharcado — é o objetivo"
    ]
  }
];
