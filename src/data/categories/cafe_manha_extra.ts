import { Recipe } from "@/types/friggo";

// usesExpiringItems é opcional no tipo Recipe — definido pelo mapper em recipeDatabase.ts
export const receitasCafeManha2: Recipe[] = [
  {
    id: "cafe-extra-001",
    name: "French Toast com Frutas 📋", emoji: "🍳", region: "US", estimatedCost: "low", 
    description: "Rabanada americana dorada com frutas frescas da estação",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 10,
    cookTime: 10,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "4 fatias de pão brioche ou de forma espesso",
      "2 ovos",
      "80ml de leite",
      "1 colher de essência de baunilha",
      "Canela em pó",
      "Manteiga para fritar",
      "Frutas vermelhas",
      "Mel e açúcar de confeiteiro"
    ],
    steps: [
      "Bata os ovos com leite, baunilha e canela",
      "Mergulhe cada fatia de pão na mistura por 30 segundos",
      "Frite na manteiga por 2-3 min cada lado até dourar",
      "Sirva com frutas frescas",
      "Polvilhe açúcar de confeiteiro e regue com mel"
    ],
    tips: [
      "Pão brioche ou pullman espesso absorve melhor a mistura de ovos",
      "Deixe a fatia descansar uns 30 segundos antes de virar"
    ]
  },
  {
    id: "cafe-extra-002",
    name: "Avocado Toast Gourmet 📋", emoji: "🍳", region: "INT", estimatedCost: "low", 
    description: "Torrada com guacamole temperado e ovo pochê",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 15,
    cookTime: 5,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "2 fatias de pão integral tostado",
      "1 abacate maduro",
      "Suco de 1 limão",
      "Flor de sal e pimenta",
      "2 ovos para pocheá",
      "Pimenta calabresa",
      "Sementes de gergelim",
      "Vinagre de cidra para o ovo"
    ],
    steps: [
      "Amasse o abacate com suco de limão, sal e pimenta",
      "Toste bem o pão",
      "Espalhe o creme de abacate",
      "Para o ovo pochê: ferva água com vinagre, crie redemoinho e adicione o ovo",
      "Cozinhe por 3 min para gema mole",
      "Posicione o ovo sobre o abacate",
      "Finalize com flor de sal, pimenta calabresa e gergelim"
    ],
    tips: [
      "Abacate deve estar bem maduro",
      "Ovo pochê precisa ser bem fresco para manter a forma"
    ]
  },
  {
    id: "cafe-extra-003",
    name: "Granola Caseira de Mel e Amêndoas 📋", emoji: "🍽️", region: "INT", estimatedCost: "low", 
    description: "Granola crocante feita em casa sem conservantes",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 10,
    cookTime: 30,
    difficulty: "fácil",
    servings: 10,
    ingredients: [
      "3 xícaras de aveia em flocos",
      "1 xícara de amêndoas laminadas",
      "1/2 xícara de coco ralado",
      "4 colheres de mel",
      "3 colheres de azeite ou óleo de coco",
      "Canela em pó",
      "Sal",
      "Frutas secas para misturar depois"
    ],
    steps: [
      "Pré-aqueça o forno a 160°C",
      "Misture aveia, amêndoas e coco",
      "Misture mel, óleo, canela e sal separadamente",
      "Combine as misturas",
      "Espalhe em assadeira forrada com papel manteiga",
      "Asse por 25-30 min mexendo na metade",
      "Deixe esfriar completamente (fica crocante ao esfriar)",
      "Misture as frutas secas"
    ],
    tips: [
      "Não mexa após sair do forno — forme clusters ao deixar esfriar",
      "Guardar em vidro fechado por até 2 semanas"
    ]
  },
  {
    id: "cafe-extra-004",
    name: "Crepe Francês com Creme de Avelã 📋", emoji: "🍳", region: "INT", estimatedCost: "low", 
    description: "Crepe fino e macio com recheio de creme de avelã e banana",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 10,
    cookTime: 15,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "150g de farinha de trigo",
      "2 ovos",
      "300ml de leite",
      "1 colher de manteiga derretida",
      "Pitada de sal",
      "Creme de avelã",
      "Bananas fatiadas",
      "Açúcar de confeiteiro"
    ],
    steps: [
      "Bata farinha, ovos, leite, manteiga e sal até homogêneo",
      "Deixe descansar 30 min na geladeira",
      "Aqueça frigideira antiaderente, unte levemente",
      "Despeje porção fina, gire para cobrir o fundo",
      "Cozinhe 1-2 min por lado",
      "Recheie com creme de avelã e banana",
      "Dobre e polvilhe açúcar de confeiteiro"
    ],
    tips: [
      "Descanso na geladeira relaxa o glúten — crepes ficam mais elásticos",
      "A primeira crepe quase sempre é de teste — vai grudar um pouco"
    ]
  },
  {
    id: "cafe-extra-005",
    name: "Ovos Mexidos Trufados 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Ovos mexidos na manteiga com azeite trufado",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 5,
    cookTime: 8,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "4 ovos frescos",
      "30g de manteiga sem sal",
      "2 colheres de sopa de crème fraîche ou nata",
      "Cebolinha fina",
      "Azeite trufado",
      "Flor de sal e pimenta branca"
    ],
    steps: [
      "Bata os ovos levemente (não excessivamente)",
      "Em frigideira fria, adicione manteiga e os ovos",
      "Ligue o fogo BEM baixo",
      "Mexa com espátula continuamente, retirando do fogo às vezes",
      "Quando cremoso e ainda úmido, retire do fogo",
      "Adicione o crème fraîche fora do fogo",
      "Tempere com flor de sal e finalize com azeite trufado e cebolinha"
    ],
    tips: [
      "Fogo baixo e paciência são essenciais — leva 8 min",
      "Retire antes de parecer pronto — o calor da panela termina o cozimento"
    ]
  },
  {
    id: "cafe-extra-006",
    name: "Panquecas de Buttermilk 📋", emoji: "🍝", region: "US", estimatedCost: "low", 
    description: "Panquecas americanas classicamente fofas",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 10,
    cookTime: 20,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "2 xícaras de farinha",
      "2 colheres de açúcar",
      "2 colheres de fermento",
      "1/2 colher de sal",
      "2 ovos",
      "250ml de buttermilk (leite + vinagre de maçã)",
      "4 colheres de manteiga derretida",
      "Xarope de bordo para servir"
    ],
    steps: [
      "Misture leite com vinagre e deixe 5 min (buttermilk caseiro)",
      "Misture ingredientes secos separadamente",
      "Bata ovos com buttermilk e manteiga",
      "Combine úmido com seco — misture apenas até incorporar (não bata)",
      "Cozinhe em frigideira média passando manteiga",
      "Espere bolhas na superfície antes de virar",
      "Sirva com manteiga e xarope de bordo"
    ],
    tips: [
      "Não misturar demais a massa deixa as panquecas mais macias",
      "Bater demais desenvolve o glúten e elas ficam borrachudas"
    ]
  },
  {
    id: "cafe-extra-007",
    name: "Overnight Oats de Morango 📋", emoji: "🍽️", region: "INT", estimatedCost: "low", 
    description: "Mingau frio de aveia preparado na véspera",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 5,
    cookTime: 0,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "1/2 xícara de aveia em flocos",
      "200ml de leite de amêndoa",
      "1 colher de chia",
      "1 colher de mel",
      "Morangos fatiados",
      "Baunilha",
      "Granola para topping"
    ],
    steps: [
      "Misture aveia, leite, chia, mel e baunilha nun pote com tampa",
      "Mexa bem",
      "Refrigere overnight (mínimo 8 horas)",
      "Pela manhã, adicione os morangos e granola",
      "Pronto para consumir frio"
    ],
    tips: [
      "Chia incha e cria textura cremosa",
      "Pode preparar 3-4 potes para a semana toda"
    ]
  },
  {
    id: "cafe-extra-008",
    name: "Shakshuka (Ovos no Molho de Tomate) 📋", emoji: "🍳", region: "INT", estimatedCost: "low", 
    description: "Prato do Oriente Médio de ovos pochados em molho picante",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 10,
    cookTime: 20,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "1 lata de tomate pelado",
      "1 pimentão vermelho",
      "1 cebola",
      "4 ovos",
      "Cominho e páprica defumada",
      "Pimenta caiena",
      "Queijo feta (opcional)",
      "Pão pita para servir"
    ],
    steps: [
      "Refogue cebola e pimentão até murcharem",
      "Adicione as especiarias e frite 1 min",
      "Adicione o tomate e cozinhe 10 min",
      "Abra 4 cavidades no molho e quebre os ovos dentro",
      "Tampe e cozinhe por 5-7 min (gema mole)",
      "Finalize com feta e servir com pão pita"
    ],
    tips: [
      "Gema mole é o ponto ideal — mais tempo a gema endurece",
      "Pão pita ou baguete para mergulhar no molho é indispensável"
    ]
  },
  {
    id: "cafe-extra-009",
    name: "Bagel com Cream Cheese e Salmão 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Combinação clássica nova-iorquina",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 5,
    cookTime: 2,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "2 bagels",
      "100g de cream cheese",
      "150g de salmão defumado",
      "Cebola roxa finamente fatiada",
      "Alcaparras",
      "Endro (dill) fresco",
      "Limão"
    ],
    steps: [
      "Toste os bagels no forno por 2 min",
      "Espalhe cream cheese generosamente",
      "Adicione o salmão defumado",
      "Finalize com cebola roxa, alcaparras e endro",
      "Regue com suco de limão"
    ],
    tips: [
      "Cream cheese em temperatura ambiente espalha melhor",
      "Salmão de boa qualidade faz toda a diferença"
    ]
  },
  {
    id: "cafe-extra-010",
    name: "Bolo Integral de Banana com Castanhas 📋", emoji: "🍳", region: "INT", estimatedCost: "low", 
    description:
      "Bolo de banana sem açúcar refinado, ideal para o café da manhã",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 15,
    cookTime: 40,
    difficulty: "fácil",
    servings: 8,
    ingredients: [
      "3 bananas muito maduras",
      "2 ovos",
      "1/3 de xícara de mel ou açúcar demerara",
      "1/3 de xícara de óleo de coco",
      "1 1/2 xícara de farinha integral",
      "1 colher de fermento",
      "1 colher de canela",
      "100g de castanhas picadas ou nozes"
    ],
    steps: [
      "Amasse as bananas",
      "Bata com ovos, mel e óleo de coco",
      "Adicione farinha integral, fermento e canela",
      "Incorpore as castanhas picadas",
      "Asse a 180°C por 35-40 min",
      "Espete um palito para verificar o cozimento"
    ],
    tips: [
      "Bananas mais escuras (overripe) são mais doces e úmidas para bolos",
      "Óleo de coco pode ser substituído por outro óleo vegetal"
    ]
  },
  {
    id: "cafe-extra-011",
    name: "Smoothie Bowl de Manga e Coco 📋", emoji: "🍽️", region: "INT", estimatedCost: "low", 
    description: "Base cremosa de manga com cobertura tropical",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 10,
    cookTime: 0,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "1 manga congelada",
      "1/2 banana congelada",
      "50ml de leite de coco",
      "Abacaxi fresco em cubos",
      "Coco ralado seco",
      "Granola",
      "Frutas vermelhas",
      "Mel de agave"
    ],
    steps: [
      "Bata manga, banana e leite de coco até cremoso espesso",
      "Despeje numa tigela",
      "Adicione abacaxi, coco ralado e granola",
      "Distribua as frutas vermelhas",
      "Regue com mel"
    ],
    tips: [
      "Consistência deve ser de sorvete cremoso, não líquido",
      "Adicione pouco líquido de cada vez — menos é mais"
    ]
  },
  {
    id: "cafe-extra-012",
    name: "Egg Muffins de Legumes 📋", emoji: "🍳", region: "INT", estimatedCost: "low", 
    description: "Muffins proteicos de ovos assados com vegetais coloridos",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 15,
    cookTime: 25,
    difficulty: "fácil",
    servings: 12,
    ingredients: [
      "8 ovos",
      "100ml de leite",
      "1 pimentão",
      "Espinafre fresco",
      "Tomate cereja",
      "Queijo cottage ou rale",
      "Sal e pimenta",
      "Cebolinha"
    ],
    steps: [
      "Pré-aqueça a 180°C e unte a forma de muffin",
      "Bata os ovos com o leite, sal e pimenta",
      "Pique os vegetais finamente",
      "Distribua os vegetais nas forminhas",
      "Despeje a mistura de ovos sobre os vegetais",
      "Adicione o queijo por cima",
      "Asse por 20-25 min até firmar",
      "Deixe esfriar 5 min antes de desenformar"
    ],
    tips: [
      "Ótimos para meal prep — duram 4 dias na geladeira",
      "Variar os vegetais a cada lote evita monotonia"
    ]
  },
  {
    id: "cafe-extra-013",
    name: "Coffee Cake de Canela 📋", emoji: "🍝", region: "US", estimatedCost: "low", 
    description: "Bolo americano com streusel de canela, feito para o café",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 20,
    cookTime: 40,
    difficulty: "médio",
    servings: 10,
    ingredients: [
      "2 xícaras de farinha",
      "1 xícara de açúcar",
      "2 ovos",
      "1 xícara de sour cream ou iogurte",
      "1/2 xícara de manteiga",
      "2 colheres de fermento",
      "Para o streusel: açúcar mascavo, canela, manteiga fria, farinha",
      "Nozes opcionais"
    ],
    steps: [
      "Prepare o streusel misturando os ingredientes com os dedos até migalhas",
      "Para o bolo: bata manteiga e açúcar",
      "Adicione ovos e sour cream",
      "Incorpore farinha e fermento",
      "Despeje metade da massa na fôrma",
      "Espalhe metade do streusel",
      "Repita as camadas",
      "Asse a 175°C por 35-40 min"
    ],
    tips: [
      "Two layers of streusel — um no meio e um em cima — maximiza o sabor",
      "Sour cream deixa o bolo extremamente macio"
    ]
  },
  {
    id: "cafe-extra-014",
    name: "Açaí Tradicional com Granola 📋", emoji: "🍽️", region: "INT", estimatedCost: "low", 
    description: "Tigela de açaí autêntico da versão paraense",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 5,
    cookTime: 0,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "200g de açaí puro congelado",
      "1 banana",
      "Granola",
      "Mel",
      "Frutas variadas (quando disponível)"
    ],
    steps: [
      "Bata o açaí congelado com a banana no liquidificador (mínimo de líquido)",
      "Consistência deve ser de sorvete grosso",
      "Despeje na tigela",
      "Polvilhe granola",
      "Adicione as frutas e regue com mel"
    ],
    tips: [
      "Açaí puro sem adição de açúcar ou xarope tem sabor mais autêntico",
      "A banana congelada ajuda na consistência cremosa"
    ]
  },
  {
    id: "cafe-extra-015",
    name: "Pão de Queijo Mineiro Tradicional 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Bolinho de queijo minas, crocante por fora e mole por dentro",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 20,
    cookTime: 30,
    difficulty: "fácil",
    servings: 20,
    ingredients: [
      "500g de polvilho azedo",
      "200ml de leite",
      "100ml de óleo",
      "2 ovos",
      "200g de queijo minas padrão ralado",
      "200g de parmesão ralado",
      "Sal"
    ],
    steps: [
      "Ferva leite com óleo e sal",
      "Despeje sobre o polvilho e misture imediatamente",
      "Deixe amornar e adicione os ovos",
      "Adicione os queijos e misture bem",
      "Se a massa estiver pegajosa, molde com as mãos umedecidas",
      "Asse a 180°C por 30 min até dourar"
    ],
    tips: [
      "Polvilho azedo garante o efeito elástico e mole por dentro",
      "Não abra o forno antes de 20 min"
    ]
  },
  {
    id: "cafe-extra-016",
    name: "Cuscuz Nordestino Temperado 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Cuscuz de milho macio servido ao estilo nordestino",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 10,
    cookTime: 10,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "2 xícaras de cuscuz de milho",
      "Água quente (quantidade para hidratar)",
      "Sal",
      "Manteiga",
      "Queijo coalho",
      "Ovos mexidos temperados",
      "Carne seca (opcional)"
    ],
    steps: [
      "Tempere o cuscuz seco com sal",
      "Umedeça com água quente aos poucos — não encharque",
      "Deixe descansar por 5 min tapado",
      "Cozinhe a vapor na cuscuzeira por 5 min",
      "Desenforme",
      "Sirva com manteiga, queijo coalho grelhado e ovo mexido"
    ],
    tips: [
      "Ponto da água é crucial — o cuscuz deve ficar úmido mas sem escorrer",
      "Sirva quente logo após o cozimento"
    ]
  },
  {
    id: "cafe-extra-017",
    name: "Waffles Belgas com Chantilly 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Waffles crocantes e fofos com cobertura generosa",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 15,
    cookTime: 20,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "2 xícaras de farinha",
      "2 colheres de açúcar",
      "1 colher de fermento",
      "2 ovos separados",
      "250ml de leite",
      "100g de manteiga derretida",
      "Baunilha e sal",
      "Chantilly, frutas e mel para servir"
    ],
    steps: [
      "Misture ingredientes secos",
      "Bata gemas com leite e manteiga",
      "Combine úmido com seco",
      "Bata claras em neve e incorpore",
      "Aqueça a wafleira e unte",
      "Despeje a massa",
      "Cozinhe por 3-4 min por lado"
    ],
    tips: [
      "Claras em neve é o segredo dos waffles fofos por dentro",
      "Não abra a wafleira antes do tempo — o waffle pode rasgar"
    ]
  },
  {
    id: "cafe-extra-018",
    name: "Tapioca de Coco e Leite Condensado 📋", emoji: "🍽️", region: "INT", estimatedCost: "low", 
    description: "Tapioca nordestina adocicada de café da manhã",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 5,
    cookTime: 5,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "3 colheres de goma de tapioca hidratada",
      "2 colheres de coco ralado umido",
      "1 colher de leite condensado",
      "Banana ou morangos opcionais"
    ],
    steps: [
      "Espalhe a goma na frigideira seca aquecida",
      "Quando a tigela estiver transparente, vire",
      "Adicione coco e leite condensado de um lado",
      "Dobre ao meio"
    ],
    tips: [
      "A frigideira não deve estar quente demais — temperatura média",
      "Goma de tapioca pronta hidratada facilita o processo"
    ]
  },
  {
    id: "cafe-extra-019",
    name: "Bircher Muesli Suíço 📋", emoji: "🍰", region: "INT", estimatedCost: "low", 
    description: "O original muesli suíço frio preparado na véspera",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 10,
    cookTime: 0,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "1 xícara de aveia em flocos",
      "200ml de suco de maçã",
      "2 colheres de iogurte natural",
      "1 maçã grande ralada com casca",
      "Suco de 1 limão",
      "Nozes e amêndoas",
      "Mel",
      "Frutas frescas"
    ],
    steps: [
      "Misture aveia com suco de maçã na véspera",
      "Refrigere overnight",
      "Pela manhã, adicione iogurte e maçã ralada com limão",
      "Adicione as frutas e nozes",
      "Finalize com mel"
    ],
    tips: [
      "A maçã com limão previne oxidação (escurecimento)",
      "Original suíço não tem açúcar adicionado — adoce com a maçã"
    ]
  },
  {
    id: "cafe-extra-020",
    name: "Tapioca Fit de Frango e Queijo 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Tapioca proteica para um café da manhã mais sustentável",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 5,
    cookTime: 10,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "3 colheres de goma de tapioca",
      "100g de frango grelhado desfiado",
      "30g de queijo branco ralado",
      "Tomate seco",
      "Rúcula",
      "Sal e orégano"
    ],
    steps: [
      "Prepare a base de tapioca na frigideira seca",
      "Tempere o frango desfiado com sal e orégano",
      "Distribua o frango sobre a tapioca",
      "Adicione o queijo, tomate seco e rúcula",
      "Dobre ao meio"
    ],
    tips: [
      "Frango desfiado de sobra da véspera funciona muito bem",
      "Tapioca proteica ideal para alimentação fitness"
    ]
  },
  {
    id: "cafe-extra-021",
    name: "Dutch Baby (Panqueca Alemã de Forno) 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Panqueca gigante que cresce no forno, servida com frutas",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 10,
    cookTime: 25,
    difficulty: "fácil",
    servings: 3,
    ingredients: [
      "3 ovos",
      "100ml de leite",
      "70g de farinha",
      "Pitada de sal e açúcar",
      "2 colheres de manteiga",
      "Frutas e açúcar de confeiteiro para servir"
    ],
    steps: [
      "Pré-aqueça o forno a 220°C com frigideira de ferro dentro",
      "Bata ovos, leite, farinha, sal e açúcar no liquidificador",
      "Com cuidado, coloque manteiga na frigideira quente",
      "Despeje a massa imediatamente",
      "Asse por 20-25 min sem abrir o forno",
      "O Dutch Baby vai crescer dramaticamente",
      "Sirva imediatamente com frutas e açúcar de confeiteiro"
    ],
    tips: [
      "A frigideira precisa estar MUITO quente para o crescimento dramático",
      "Sirva imediatamente pois murcha após sair do forno"
    ]
  },
  {
    id: "cafe-extra-022",
    name: "Smoothie Verde Energizante 📋", emoji: "🍽️", region: "INT", estimatedCost: "low", 
    description: "Vitamina verde de kale, banana e gengibre",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 5,
    cookTime: 0,
    difficulty: "fácil",
    servings: 1,
    ingredients: [
      "1 mão de couve kale",
      "1 banana congelada",
      "1/2 maçã",
      "1 colher de gengibre fresco",
      "200ml de água de coco",
      "Hortelã fresca",
      "Mel"
    ],
    steps: [
      "Bata couve, banana, maçã, gengibre e água de coco",
      "Adicione hortelã e mel",
      "Bata até completamente liso",
      "Sirva imediatamente"
    ],
    tips: [
      "Banana congelada dá cremosidade sem necessidade de gelo",
      "Iniciar o liquidificador no baixo antes de aumentar garante melhor resultado"
    ]
  },
  {
    id: "cafe-extra-023",
    name: "Wrap de Ovos Mexidos com Legumes 📋", emoji: "🍳", region: "INT", estimatedCost: "low", 
    description: "Wrap proteico e colorido para o café da manhã",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 10,
    cookTime: 10,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "4 ovos",
      "2 tortillas integrais",
      "1/2 pimentão vermelho e amarelo",
      "Espinafre baby",
      "Queijo",
      "Sal, pimenta e ervas"
    ],
    steps: [
      "Salteie os pimentões rapidamente",
      "Adicione espinafre e deixe murchar",
      "Adicione os ovos batidos e faça ovos mexidos",
      "Aqueça as tortillas",
      "Distribua os ovos com legumes",
      "Adicione queijo e enrole",
      "Grelhe brevemente para fechar"
    ],
    tips: [
      "Esquentar a tortilla antes facilita enrolar sem rasgar",
      "Adicionar queijo quente antes de enrolar cola o wrap"
    ]
  },
  {
    id: "cafe-extra-024",
    name: "Chia Pudding de Frutas Vermelhas 📋", emoji: "🍰", region: "INT", estimatedCost: "low", 
    description: "Pudim de chia com calda de frutas vermelhas",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 10,
    cookTime: 0,
    difficulty: "fácil",
    servings: 2,
    ingredients: [
      "4 colheres de chia",
      "300ml de leite de coco ou amêndoa",
      "1 colher de mel",
      "Baunilha",
      "100g de frutas vermelhas frescas ou congeladas",
      "Açúcar para a calda"
    ],
    steps: [
      "Misture chia, leite, mel e baunilha",
      "Deixe descansar 30 min mexendo 2-3 vezes",
      "Refrigere overnight",
      "Cozinhe frutas vermelhas com açúcar até virar compota",
      "Sirva o pudim de chia com a compota por cima"
    ],
    tips: [
      "Mexer nas primeiras horas evita grumos de chia",
      "Pode deixar na geladeira por até 4 dias"
    ]
  },
  {
    id: "cafe-extra-025",
    name: "Bolinho de Fubá com Queijo 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Bolinho mineiro de fubá tradicional, cremoso por dentro",
    category: "Café da Manhã",
    type: "snack",
    prepTime: 15,
    cookTime: 30,
    difficulty: "fácil",
    servings: 12,
    ingredients: [
      "1 xícara de fubá",
      "1 xícara de farinha de trigo",
      "1/2 xícara de açúcar",
      "2 ovos",
      "1/2 xícara de manteiga derretida",
      "1 xícara de leite",
      "1 colher de fermento",
      "100g de queijo minas ou parmesão"
    ],
    steps: [
      "Bata ovos com açúcar e manteiga",
      "Adicione o leite",
      "Misture fubá e farinha",
      "Adicione o fermento",
      "Adicione o queijo ralado",
      "Asse em forminhas de muffin a 180°C por 25 min"
    ],
    tips: [
      "Queijo dentro da massa derrete and cria pockets deliciosos",
      "Bolinho de fubá pode ser servido salgado também — apenas omita o açúcar"
    ]
  }
];
