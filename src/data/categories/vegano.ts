import { Recipe } from "@/types/kaza";

export const receitasVegano: Recipe[] = [
  {
    id: "vegano-001",
    name: "Pasta de Abóbora com Nozes 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Prato vegano rico em nutrientes com abóbora cremosa",
    category: "Vegano",
    type: "dinner",
    prepTime: 15,
    cookTime: 30,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "400g de espaguete",
      "500g de abóbora cabotiá",
      "100g de nozes picadas",
      "4 dentes de alho",
      "Azeite",
      "Sálvia fresca",
      "Sal e pimenta",
      "Noz-moscada"
    ],
    steps: [
      "Asse a abóbora com azeite a 200°C por 25 min",
      "Bata a abóbora com alho, azeite, sal e noz-moscada até cremoso",
      "Cozinhe a massa al dente, reserve 1 xícara da água do cozimento",
      "Misture o molho com a massa, ajuste com a água reservada",
      "Torre as nozes numa frigideira",
      "Sirva com nozes e sálvia frita no azeite"
    ],
    tips: [
      "Água da massa deixa o molho mais sedoso",
      "Nozes podem ser substituídas por castanhas do Pará"
    ]
  },
  {
    id: "vegano-002",
    name: "Curry de Grão-de-Bico e Espinafre 📋", emoji: "🍚", region: "INT", estimatedCost: "low", 
    description: "Chana saag vegano, rico em ferro e proteína vegetal",
    category: "Vegano",
    type: "dinner",
    prepTime: 10,
    cookTime: 25,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "2 latas de grão-de-bico",
      "200g de espinafre fresco",
      "1 lata de tomate pelado",
      "1 cebola",
      "3 dentes de alho",
      "1 colher de gengibre ralado",
      "1 colher de garam masala",
      "Cúrcuma e cominho",
      "Leite de coco"
    ],
    steps: [
      "Refogue cebola, alho e gengibre",
      "Adicione as especiarias e frite 1 min",
      "Adicione tomate e cozinhe 5 min",
      "Adicione grão-de-bico e leite de coco",
      "Cozinhe por 15 min",
      "Adicione espinafre e misture até murchar",
      "Sirva com arroz basmati e pão naan"
    ],
    tips: [
      "Garam masala deve ser adicionado no final para preservar aromas",
      "Espinafre fresco murcha em segundos"
    ]
  },
  {
    id: "vegano-003",
    name: "Bowl de Buddha Arco-Íris 📋", emoji: "🌱", region: "INT", estimatedCost: "low", 
    description: "Bowl colorido e nutritivo com grãos, legumes e húmus",
    category: "Vegano",
    type: "lunch",
    prepTime: 20,
    cookTime: 30,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "1 xícara de quinoa",
      "Beterraba assada",
      "Cenoura roxa assada",
      "Grão-de-bico assado temperado",
      "Abacate",
      "Pepino",
      "Edamame",
      "Húmus",
      "Molho tahine"
    ],
    steps: [
      "Cozinhe a quinoa conforme instruções",
      "Asse beterraba e cenoura com azeite por 25 min",
      "Asse o grão-de-bico com páprica e sal por 20 min",
      "Monte o bowl em seções coloridas",
      "Adicione húmus e molho tahine",
      "Finalize com gergelim"
    ],
    tips: [
      "A disposição visual colorida é parte da experiência",
      "Prepare os componentes com antecedência para agilizar a montagem"
    ]
  },
  {
    id: "vegano-004",
    name: "Escondidinho Vegano de Lentilha 📋", emoji: "🥩", region: "BR", estimatedCost: "low", 
    description:
      "Versão vegana do clássico brasileiro com lentilha no lugar da carne",
    category: "Vegano",
    type: "dinner",
    prepTime: 20,
    cookTime: 35,
    difficulty: "médio",
    servings: 6,
    ingredients: [
      "1,5 xícaras de lentilha verde",
      "4 batatas ou aipim cozido",
      "Shoyu",
      "Fumaça líquida",
      "Cebola e alho",
      "Tomate",
      "Páprica defumada",
      "Leite vegetal para o purê"
    ],
    steps: [
      "Cozinhe a lentilha com shoyu, páprica defumada e fumaça líquida",
      "Refogue cebola, alho e tomate, adicione a lentilha",
      "Amasse o aipim cozido com leite vegetal e margarina vegana",
      "Numa assadeira, camadas: lentilha, purê de aipim",
      "Finalize com purê e leve ao forno para dourar"
    ],
    tips: [
      "Fumaça líquida simula o sabor defumado da carne seca",
      "Aipim faz um purê mais rústico e gostoso que batata"
    ]
  },
  {
    id: "vegano-005",
    name: "Hamburguer de Beterraba e Feijão Preto 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Hamburguer vegano suculento e colorido",
    category: "Vegano",
    type: "dinner",
    prepTime: 20,
    cookTime: 15,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "1 lata de feijão preto",
      "1 beterraba média cozida",
      "1 xícara de aveia em flocos",
      "1 cebola",
      "Alho e temperos",
      "Shoyu",
      "Pão de hamburguer vegano"
    ],
    steps: [
      "Rale a beterraba cozida",
      "Processe parcialmente o feijão (deixe alguns grãos inteiros)",
      "Misture feijão, beterraba, aveia, cebola ralada e temperos",
      "Deixe na geladeira por 30 min para firmar",
      "Molde hamburgueres e grelhe por 5-6 min cada lado",
      "Sirva com guacamole, alface e tomate"
    ],
    tips: [
      "Beterraba dá cor avermelhada similar à carne",
      "Refrigerar a mistura é fundamental para ficar firme"
    ]
  },
  {
    id: "vegano-006",
    name: "Moqueca Vegana de Banana da Terra 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description:
      "A moqueca sem peixe — banana da terra no dendê com leite de coco",
    category: "Vegano",
    type: "dinner",
    prepTime: 15,
    cookTime: 25,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "4 bananas da terra verdes",
      "1 lata de leite de coco integral",
      "2 tomates",
      "1 pimentão amarelo",
      "Cebola e alho",
      "Coentro",
      "Azeite de dendê",
      "Sal e pimenta"
    ],
    steps: [
      "Descasque e corte as bananas em rodelas grossas",
      "Refogue cebola, alho e pimentão",
      "Adicione o tomate picado",
      "Adicione a banana e mexa com cuidado",
      "Despeje o leite de coco",
      "Cozinhe por 15 min",
      "Finalize com dendê e coentro",
      "Sirva com arroz"
    ],
    tips: [
      "Banana da terra verde não desmancha com o cozimento",
      "Dendê dá cor e sabor autêntico nordestino"
    ]
  },
  {
    id: "vegano-007",
    name: "Ceviche Vegano de Palmito 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Versão vegetal do ceviche com palmito e limão",
    category: "Vegano",
    type: "snack",
    prepTime: 20,
    cookTime: 0,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "400g de palmito pupunha em cubos",
      "Suco de 4 limões",
      "1 pepino",
      "Tomate cereja",
      "Cebola roxa",
      "Coentro",
      "Pimenta dedo-de-moça",
      "Sal"
    ],
    steps: [
      "Corte o palmito em cubos pequenos",
      "Marine no suco de limão com sal por 15 min",
      "Adicione pepino, tomate e cebola picados",
      "Tempere com pimenta e coentro",
      "Sirva gelado"
    ],
    tips: [
      "Palmito firme absorve o ácido do limão simulando peixe",
      "Sirva imediatamente após o marinado"
    ]
  },
  {
    id: "vegano-008",
    name: "Lasanha de Berinjela e Tofu 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Lasanha italiana sem carne nem queijo animal",
    category: "Vegano",
    type: "dinner",
    prepTime: 30,
    cookTime: 45,
    difficulty: "médio",
    servings: 6,
    ingredients: [
      "3 berinjelas grandes",
      "400g de tofu firme",
      "Molho de tomate",
      "Levedura nutricional",
      "Azeite",
      "Oregano e manjericão",
      "Alho e sal"
    ],
    steps: [
      "Fatie as berinjelas longitudinalmente e grelhe",
      "Desfaça o tofu com um garfo",
      "Tempere o tofu com alho, sal e levedura nutricional",
      "Monte camadas: molho, berinjela, tofu, molho",
      "Finalize com bastante molho e levedura",
      "Asse tampado a 180°C por 30 min"
    ],
    tips: [
      "Levedura nutricional dá sabor umami semelhante ao queijo",
      "Berinjela grelhada remove a amargura"
    ]
  },
  {
    id: "vegano-009",
    name: "Taco Bowl de Feijão e Milho 📋", emoji: "🍚", region: "LATAM", estimatedCost: "low", 
    description: "Tigela estilo mexicano 100% vegana e nutritiva",
    category: "Vegano",
    type: "lunch",
    prepTime: 15,
    cookTime: 15,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "1 lata de feijão preto",
      "1 lata de milho",
      "Arroz cozido",
      "Guacamole",
      "Salsa fresca",
      "Chips de tortilla",
      "Pimenta jalapeño",
      "Coentro e limão"
    ],
    steps: [
      "Tempere e aqueça o feijão com cominho",
      "Aqueça o milho com um pouco de azeite",
      "Monte o bowl com arroz na base",
      "Adicione feijão, milho e guacamole",
      "Coloque a salsa e os chips ao redor",
      "Finalize com jalapeño, coentro e limão"
    ],
    tips: [
      "Refeição completa em proteína vegetal",
      "Ótima opção para meal prep"
    ]
  },
  {
    id: "vegano-010",
    name: "Sopa de Tomate com Manjericão 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Clássica sopa italiana cremosa feita 100% vegana",
    category: "Vegano",
    type: "dinner",
    prepTime: 10,
    cookTime: 30,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "6 tomates maduros ou 2 latas de tomate pelado",
      "1 cebola",
      "4 dentes de alho",
      "Manjericão fresco abundante",
      "Azeite",
      "Caldo de legumes",
      "Sal e pimenta"
    ],
    steps: [
      "Refogue cebola e alho no azeite",
      "Adicione os tomates e cozinhe 10 min",
      "Despeje o caldo e cozinhe mais 15 min",
      "Bata tudo no liquidificador com o manjericão",
      "Coe se preferir mais suave",
      "Ajuste o sal e sirva com azeite"
    ],
    tips: [
      "A sopa deve ser intensamente vermelha e perfumada",
      "Sirva com torradinhas de azeite"
    ]
  },
  {
    id: "vegano-011",
    name: "Risoto Vegano de Cogumelos 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto cremoso apenas com ingredientes vegetais",
    category: "Vegano",
    type: "dinner",
    prepTime: 15,
    cookTime: 35,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "2 xícaras de arroz arbóreo",
      "300g de cogumelos variados",
      "1 cebola",
      "Vinho branco seco",
      "Caldo de legumes quente",
      "Levedura nutricional",
      "Requeijão vegano ou caju cremoso",
      "Salsinha"
    ],
    steps: [
      "Salteie os cogumelos até dourar, reserve",
      "Refogue a cebola no azeite, adicione o arroz",
      "Adicione o vinho e espere evaporar",
      "Adicione o caldo quente concha a concha",
      "Continue adicionando caldo e mexendo por 20 min",
      "Adicione cogumelos, levedura e creme vegano",
      "Ajuste o sal e finalize com salsinha"
    ],
    tips: [
      "O risoto deve ficar cremoso e 'all'onda' — soltinho mas cremoso",
      "Levedura nutricional é o 'queijo' vegano aqui"
    ]
  },
  {
    id: "vegano-012",
    name: "Salada César Vegana 📋", emoji: "🥗", region: "INT", estimatedCost: "low", 
    description:
      "A salada mais famosa do mundo na versão completamente vegetal",
    category: "Vegano",
    type: "lunch",
    prepTime: 15,
    cookTime: 10,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "Alface romana",
      "Croutons caseiros",
      "2 colheres de tahine",
      "1 colher de alcaparra",
      "1 colher de mostarda Dijon",
      "Suco de limão",
      "Alho",
      "Levedura nutricional",
      "Azeite"
    ],
    steps: [
      "Toste cubinhos de pão com azeite para os croutons",
      "Para o molho: processe tahine, alcaparra, mostarda, limão, alho e azeite",
      "Rasgue a alface romana",
      "Misture com o molho",
      "Adicione os croutons",
      "Polvilhe levedura nutricional"
    ],
    tips: [
      "Tahine substitui o ovo e peixe do molho clássico",
      "Alcaparra dá o toque salgado e umami que substitui o peixe"
    ]
  },
  {
    id: "vegano-013",
    name: "Bolinho de Abobrinha e Aveia 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Lanche vegano sequinho e saboroso",
    category: "Vegano",
    type: "snack",
    prepTime: 15,
    cookTime: 20,
    difficulty: "fácil",
    servings: 16,
    ingredients: [
      "2 abobrinhas médias",
      "1 xícara de aveia em flocos",
      "2 colheres de sopa de farinha de grão-de-bico",
      "Cebolinha e ervas",
      "Alho em pó",
      "Sal e pimenta"
    ],
    steps: [
      "Rale a abobrinha e esprema para remover o excesso de água",
      "Misture com aveia, farinha, temperos e ervas",
      "Forme bolinhos com as mãos",
      "Grelhe em frigideira com azeite por 4 min cada lado",
      "Sirva com homus ou molho vegano"
    ],
    tips: [
      "Espremer bem a abobrinha é fundamental para os bolinhos ficarem firmes",
      "Farinha de grão-de-bico funciona como ligante vegano"
    ]
  },
  {
    id: "vegano-014",
    name: "Feijoada Vegana 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "A feijoada sem nenhuma carne, igualmente saborosa",
    category: "Vegano",
    type: "dinner",
    prepTime: 20,
    cookTime: 90,
    difficulty: "médio",
    servings: 8,
    ingredients: [
      "500g de feijão preto",
      "Cogumelos shiitake secos",
      "Proteína de soja texturizada",
      "Cebola, alho e louro",
      "Páprica defumada e fumaça líquida",
      "Couve manteiga",
      "Arroz e laranja para servir"
    ],
    steps: [
      "Deixe o feijão de molho por 8 horas",
      "Hidrate os cogumelos em água quente, reserve a água",
      "Cozinhe o feijão na panela de pressão por 35 min",
      "Refogue alho, cebola e louro",
      "Adicione cogumelos, PST e temperos defumados",
      "Misture com o feijão cozido",
      "Cozinhe por mais 20-30 min",
      "Sirva com arroz, couve e laranja"
    ],
    tips: [
      "Cogumelos secos e fumaça líquida criam umami defumado",
      "A água do cogumelo enriquece o caldo"
    ]
  },
  {
    id: "vegano-015",
    name: "Smoothie Bowl de Açaí Vegano 📋", emoji: "🌱", region: "INT", estimatedCost: "low", 
    description:
      "Base de açaí congelado com cobertura farta de frutas e sementes",
    category: "Vegano",
    type: "snack",
    prepTime: 10,
    cookTime: 0,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "200g de açaí puro congelado",
      "1 banana congelada",
      "50ml de leite de amêndoa",
      "Granola vegana",
      "Frutas frescas variadas",
      "Sementes de chia e linhaça",
      "Coco ralado seco",
      "Mel de agave"
    ],
    steps: [
      "Bata açaí, banana e leite de amêndoa até cremoso",
      "Despeje numa tigela",
      "Adicione granola",
      "Distribua as frutas frescas",
      "Polvilhe chia, linhaça e coco",
      "Regue com mel de agave"
    ],
    tips: [
      "Não bata demais — consistência de gelado grosso é o ideal",
      "Agave é o adoçante vegano por excelência"
    ]
  },
  {
    id: "vegano-016",
    name: "Pad Thai Vegano 📋", emoji: "🍤", region: "INT", estimatedCost: "low", 
    description: "Versão tailandesa sem camarão nem ovo, igualmente deliciosa",
    category: "Vegano",
    type: "dinner",
    prepTime: 20,
    cookTime: 15,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "200g de macarrão de arroz",
      "150g de tofu firme",
      "Broto de feijão",
      "Cebolinha e amendoim",
      "2 colheres de molho de soja",
      "1 colher de pasta tamarindo",
      "1 colher de açúcar mascavo",
      "Pimenta seca e limão"
    ],
    steps: [
      "Hidrate o macarrão de arroz em água fria por 30 min",
      "Frite o tofu em cubos até crocante, reserve",
      "Em wok quente, frite o macarrão escorrido",
      "Misture molho de soja, tamarindo e açúcar",
      "Adicione o molho ao wok com broto de feijão",
      "Adicione o tofu e cebolinha",
      "Sirva com amendoim e limão"
    ],
    tips: [
      "Tofu frito é o substituto proteico perfeito",
      "Wok precisa estar muito quente para o sabor correto"
    ]
  },
  {
    id: "vegano-017",
    name: "Torta Salgada Vegana de Legumes 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Torta cremosa de vegetais com massa integral",
    category: "Vegano",
    type: "dinner",
    prepTime: 30,
    cookTime: 40,
    difficulty: "médio",
    servings: 6,
    ingredients: [
      "2 xícaras de farinha integral",
      "100ml de azeite",
      "Alho em pó e sal na massa",
      "Água gelada",
      "400g de legumes variados",
      "1 lata de creme de caju ou leite de coco",
      "Farinha de grão-de-bico",
      "Temperos"
    ],
    steps: [
      "Misture farinha com azeite, sal e água gelada até formar massa",
      "Refriger por 30 min",
      "Refogue os legumes e tempere",
      "Misture com o creme e farinha de grão-de-bico",
      "Forre a forma com a massa",
      "Coloque o recheio",
      "Asse a 180°C por 35-40 min"
    ],
    tips: [
      "Massa integral é crocante e nutritiva",
      "Creme de caju pode ser feito batendo castanhas com água"
    ]
  },
  {
    id: "vegano-018",
    name: "Brigadeiro Vegano de Cacau 📋", emoji: "🌱", region: "INT", estimatedCost: "low", 
    description: "O brigadeiro clássico sem leite nem manteiga de vaca",
    category: "Vegano",
    type: "snack",
    prepTime: 10,
    cookTime: 15,
    difficulty: "fácil",
    servings: 20,
    ingredients: [
      "1 lata de leite condensado vegano ou de coco",
      "3 colheres de cacau em pó",
      "1 colher de margarina vegana",
      "Granulado vegano para enrolar"
    ],
    steps: [
      "Misture leite condensado, cacau e margarina na panela",
      "Cozinhe em fogo médio mexendo sempre",
      "Quando soltar do fundo, está no ponto",
      "Despeje em prato untado",
      "Deixe esfriar completamente",
      "Enrole bolinhas e passe no granulado"
    ],
    tips: [
      "Leite condensado de coco dá sabor exótico",
      "Ponto igual ao brigadeiro tradicional"
    ]
  },
  {
    id: "vegano-019",
    name: "Nhoque de Batata Doce Vegano 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Massa italiana leve e colorida sem ovo",
    category: "Vegano",
    type: "dinner",
    prepTime: 30,
    cookTime: 20,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "600g de batata doce cozida",
      "1,5 xícaras de farinha de trigo (ou arroz)",
      "Sal e noz-moscada",
      "Molho de tomate ou pesto vegano"
    ],
    steps: [
      "Amasse a batata doce cozida até ficar bem lisa",
      "Misture com farinha, sal e noz-moscada",
      "Trabalhe até formar massa homogênea",
      "Enrole em cordas e corte em pedaços",
      "Cozinhe em água fervente com sal até subirem",
      "Retire com escumadeira e sirva com o molho"
    ],
    tips: [
      "Batata doce não precisa de ovo para ligar a massa",
      "Não sove demais para o nhoque não ficar borrachudo"
    ]
  },
  {
    id: "vegano-020",
    name: "Sopa de Ervilha Amarela com Cúrcuma 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Sopa cremosa e reconfortante à base de leguminosa",
    category: "Vegano",
    type: "dinner",
    prepTime: 10,
    cookTime: 35,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "2 xícaras de ervilha amarela partida",
      "1 cebola",
      "3 dentes de alho",
      "1 colher de cúrcuma",
      "Gengibre ralado",
      "Azeite",
      "Sal e suco de limão"
    ],
    steps: [
      "Refogue cebola, alho e gengibre",
      "Adicione cúrcuma e mexa 1 min",
      "Adicione a ervilha e cubra com 1,5L de água",
      "Cozinhe por 30 min até desmanchar",
      "Bata para cremoso",
      "Ajuste sal e adicione limão"
    ],
    tips: [
      "Ervilha amarela partida cozinha mais rápido que a verde",
      "Excelente para dias frios"
    ]
  },
  {
    id: "vegano-021",
    name: "Bowl de Tofu Grelhado com Teriyaki 📋", emoji: "🍚", region: "INT", estimatedCost: "low", 
    description: "Proteína vegetal japonesa com molho teriyaki sobre arroz",
    category: "Vegano",
    type: "dinner",
    prepTime: 15,
    cookTime: 15,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "400g de tofu extra firme",
      "2 xícaras de arroz japonês",
      "3 colheres de shoyu",
      "2 colheres de mel de agave",
      "1 colher de amido de milho",
      "Edamame e cenoura",
      "Cebolinha"
    ],
    steps: [
      "Seque bem o tofu e corte em cubos",
      "Grelhe em frigideira antiaderente até dourar todos os lados",
      "Misture shoyu, agave e amido para o teriyaki",
      "Adicione o molho ao tofu e glasear",
      "Monte o bowl com arroz, tofu e vegetais",
      "Decore com cebolinha"
    ],
    tips: [
      "Tofu seco frita bem, úmido fica mole",
      "Glacear o tofu no molho teriyaki cria uma camada deliciosa"
    ]
  },
  {
    id: "vegano-022",
    name: "Macarrão ao Pesto Vegano 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Pesto sem queijo feito com levedura nutricional",
    category: "Vegano",
    type: "lunch",
    prepTime: 10,
    cookTime: 10,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "400g de espaguete",
      "3 xícaras de manjericão fresco",
      "1/2 xícara de castanhas de caju ou pinhão",
      "3 dentes de alho",
      "3 colheres de levedura nutricional",
      "1/2 xícara de azeite",
      "Sal e pimenta"
    ],
    steps: [
      "Cozinhe a massa al dente",
      "Processe manjericão, castanhas, alho e levedura",
      "Adicione o azeite em fio batendo",
      "Tempere com sal e pimenta",
      "Misture o pesto com a massa quente",
      "Sirva com pinhão ou castanhas tostados"
    ],
    tips: [
      "Levedura substitui perfeitamente o parmesão",
      "Não aqueça o pesto para preservar a cor verde vibrante"
    ]
  },
  {
    id: "vegano-023",
    name: "Panqueca Americana de Banana Vegana 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Panquecas fofas e douradas sem ovos nem leite animal",
    category: "Vegano",
    type: "snack",
    prepTime: 10,
    cookTime: 15,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 bananas maduras",
      "1 xícara de farinha de aveia",
      "1/2 xícara de leite de aveia",
      "1 colher de sopa de vinagre de maçã",
      "1 colher de fermento",
      "Canela e baunilha"
    ],
    steps: [
      "Amasse as bananas",
      "Adicione leite de aveia e vinagre (cria 'buttermilk' vegano)",
      "Misture com farinha de aveia, fermento e especiarias",
      "Aqueça frigideira antiaderente",
      "Despeje porções e cozinhe até formar bolhas na superfície",
      "Vire e doure o outro lado"
    ],
    tips: [
      "Vinagre de maçã ativa o fermento, deixando as panquecas fofas",
      "Banana madura é suficiente para adoçar"
    ]
  },
  {
    id: "vegano-024",
    name: "Strogonoff Vegano de Cogumelos 📋", emoji: "🥩", region: "BR", estimatedCost: "low", 
    description: "O clássico brasileiro sem carne, mas com cogumelos carnudos",
    category: "Vegano",
    type: "dinner",
    prepTime: 15,
    cookTime: 25,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "500g de cogumelos portobello ou shitake",
      "1 cebola",
      "2 dentes de alho",
      "1 lata de creme de coco",
      "2 colheres de mostarda",
      "2 colheres de ketchup",
      "Conhaque ou vinho branco",
      "Salsinha"
    ],
    steps: [
      "Fatie os cogumelos em pedaços grandes",
      "Refogue cebola e alho no azeite",
      "Adicione os cogumelos em fogo alto para dourar",
      "Flame com conhaque ou adicione o vinho e deixe evaporar",
      "Adicione mostarda, ketchup e creme de coco",
      "Simmer por 10 min",
      "Finalize com salsinha"
    ],
    tips: [
      "Cogumelos portobello são os mais carnudos e saborosos",
      "Creme de coco engrossa naturalmente como o creme de leite"
    ]
  },
  {
    id: "vegano-025",
    name: "Chips de Couve Assada 📋", emoji: "🌱", region: "INT", estimatedCost: "low", 
    description: "Snack crocante e nutritivo de couve temperada no forno",
    category: "Vegano",
    type: "snack",
    prepTime: 10,
    cookTime: 20,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "1 maço de couve manteiga",
      "2 colheres de azeite",
      "Sal grosso",
      "Páprica ou limão"
    ],
    steps: [
      "Remova o talo central das folhas de couve",
      "Rasgue em pedaços médios",
      "Misture com azeite e sal",
      "Espalhe em assadeira sem sobrepor",
      "Asse a 150°C por 15-20 min",
      "Sirva imediatamente"
    ],
    tips: [
      "Temperatura baixa é essencial para crispar sem queimar",
      "Store em pote por até 2 dias mantendo crocância"
    ]
  }
];
