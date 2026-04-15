import { Recipe } from "@/types/friggo";

export const receitasVegetariano: Omit<Recipe, "id" | "usesExpiringItems">[] = [
  {
    name: "Shakshuka — Ovos no Molho de Tomate 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Prato israelense/mediterrâneo de ovos pochados em molho de tomate temperado",
    category: "Vegetariano",
    type: "snack",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1605908502724-9093a79a6cf6?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "6 ovos",
      "400 g tomate pelado em lata",
      "1 cebola grande",
      "1 pimentão vermelho",
      "3 dentes alho",
      "1 colher cominho",
      "1 colher páprica defumada",
      "pimenta cayenne",
      "sal, azeite",
      "feta e salsinha para servir"
    ],
    instructions: [
      "Refogue cebola e pimentão em azeite em fogo médio por 8 min, mexendo, até amolecerem completamente.",
      "Adicione o alho fatiado e os temperos (cominho, páprica, cayenne). Cozinhe por 1 min — o aroma ficará incrível.",
      "Adicione os tomates pelados amassados. Tempere com sal. Cozinhe por 10 min até o molho engrossar.",
      "Faça 6 cavidades no molho com uma colher.",
      "Quebre gentilmente 1 ovo por cavidade. Tampe a frigideira.",
      "Cozinhe por 5–7 min para clara firme e gema líquida. Menos tempo para gema bem mole.",
      "Acrescente queijo feta esmigalhado por cima.",
      "Polvilhe salsinha e sirva diretamente na frigideira com pão pita ou torradas."
    ],
    tips: [
      "Cada ovo pode ser monitorado individualmente removendo com colher.",
      "Para clara firme, coloque um pouco de água e tampe.",
      "Prato excelente para brunch ou jantar rápido."
    ]
  },
  {
    name: "Curry de Grão-de-Bico com Espinafre (Chana Masala) 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Curry indiano rico de grão-de-bico — vegano, saboroso e nutritivo",
    category: "Vegetariano",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "2 latas de grão-de-bico",
      "1 maço espinafre",
      "1 cebola grande",
      "2 dentes alho, 1 pedaço gengibre",
      "400 g tomate pelado",
      "400 ml leite de coco",
      "2 colh curry em pó",
      "1 colh cominho, 1 colh cúrcuma",
      "1 colh garam masala",
      "azeite, sal, coentro fresco"
    ],
    instructions: [
      "Refogue a cebola em azeite por 8 min até amolecer e levemente dourar.",
      "Adicione alho e gengibre ralados. Cozinhe 1 min.",
      "Adicione todos os temperos secos. Toste por 1 min mexendo — libera os óleos aromáticos.",
      "Adicione os tomates e cozinhe por 5 min até engrossar.",
      "Adicione o grão-de-bico escorrido e lavado. Misture bem.",
      "Despeje leite de coco. Cozinhe em fogo médio por 15 min.",
      "Esmague levemente 1/4 do grão — engrossa o molho naturalmente.",
      "Adicione espinafre no final, mexa e cozinhe 2 min.",
      "Finalize com garam masala e coentro fresco. Sirva com arroz basmati e pão naan."
    ],
    tips: [
      "Temperos tostados antes do tomate = sabor mais profundo (técnica bloom spices).",
      "Garam masala no final preserva seu aroma.",
      "Grão-de-bico de lata funciona perfeitamente — economiza tempo."
    ]
  },
  {
    name: "Berinjela à Parmegiana 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Clássico italiano vegetariano — fatias de berinjela empanadas com molho e queijo",
    category: "Vegetariano",
    type: "lunch",
    difficulty: "médio",
    prepTime: 30,
    cookTime: 35,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1618509360480-d73d9016fce6?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "2 berinjelas grandes",
      "sal para tirar amargura",
      "300 g molho de tomate",
      "250 g mussarela",
      "parmesão ralado",
      "EMPANAMENTO: farinha, ovo, farinha de rosca",
      "azeite ou óleo para fritar",
      "manjericão fresco"
    ],
    instructions: [
      "Fatie as berinjelas em rodelas de 1 cm. Polvilhe sal por cima e deixe por 20 min — o sal remove o amargo e o excesso de água.",
      "Seque bem as fatias com papel toalha — água restante faz o óleo espirrar.",
      "Empane: farinha → ovo batido → farinha de rosca. Frite em azeite ou óleo por 3 min de cada lado. Escorra.",
      "Monte o prato em assadeira: camada de molho → fatia de berinjela → fatia mussarela → molho → repita.",
      "Polvilhe parmesão generosamente por cima.",
      "Asse a 180 °C por 25–30 min até borbulhar e dourar.",
      "Descanse 5 min antes de cortar. Finalize com manjericão fresco."
    ],
    tips: [
      "Tirar o amargor com sal é um passo que não deve ser pulado.",
      "Para versão mais leve: grelhe a berinjela em vez de fritar.",
      "Montagem em camadas distribui sabor uniformemente."
    ]
  },
  {
    name: "Nhoque de Batata-Doce ao Pesto 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Nhoque dourado de batata-doce com pesto caseiro de manjericão",
    category: "Vegetariano",
    type: "lunch",
    difficulty: "médio",
    prepTime: 40,
    cookTime: 20,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "500 g batata-doce",
      "200 g farinha de trigo",
      "1 ovo",
      "sal, noz-moscada",
      "PESTO: 2 maços manjericão, 50 g pinholi ou castanha, 50 g parmesão, 1 dente alho, azeite"
    ],
    instructions: [
      "Cozinhe as batatas-doces com casca até macias (~25 min). Descasque ainda quentes e amasse completamente.",
      "Espalhe o purê em superfície limpa para esfriar e secar um pouco — umidade excessiva exige mais farinha.",
      "Adicione ovo, sal, noz-moscada. Misture. Adicione a farinha aos poucos até massa homogênea, macia mas que não grude.",
      "Divida em rolos de 2 cm de diâmetro. Corte em pedaços de 2 cm. Passe no garfo para o tradicional estriado.",
      "PESTO: Processe manjericão, pinholi, parmesão, alho e azeite. Não processe demais — deve ter textura.",
      "Ferva água com bastante sal. Cozinhe o nhoque em lotes — quando subirem à superfície, espere 30 seg e retire.",
      "Saltei levemente em azeite por 1 min para crosta.",
      "Misture com o pesto e sirva com parmesão extra."
    ],
    tips: [
      "Quanto mais seca a batata, menos farinha precisa — nhoque fico mais leve.",
      "Nhoque sobe à superfície quando cozido — sinal de ponto.",
      "Pesto caseiro tem validade de 1 semana na geladeira coberto com azeite."
    ]
  },
  {
    name: "Estrogonofe Vegetariano de Cogumelos 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Estrogonofe cremoso com mix de cogumelos no lugar da carne",
    category: "Vegetariano",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "600 g mix cogumelos (paris, shimeji, shitake, portobelo)",
      "1 cebola, 2 dentes alho",
      "300 ml creme de leite",
      "2 colheres ketchup",
      "1 colher mostarda",
      "conhaque ou vinho branco",
      "manteiga, sal, pimenta",
      "batata palha, arroz"
    ],
    instructions: [
      "Fatie os cogumelos grosso — reduzem muito ao cozinhar. Separe por tipo.",
      "Aqueça frigideira grande sem gordura em fogo alto. Saltei os cogumelos em lotes (não lotar!).",
      "Cada lote deve dourar e perder umidade antes do próximo — leva ~4 min por lote.",
      "Quando todos dourados, reduza o fogo. Adicione manteiga, cebola e alho. Refogue 3 min.",
      "Flambé com conhaque (opcional): adicione conhaque e incline a frigideira ou acenda com isqueiro.",
      "Adicione ketchup e mostarda. Misture. Despeje o creme de leite.",
      "Cozinhe por 5 min até encorpar. Ajuste sal.",
      "Sirva com arroz e batata palha — generosa."
    ],
    tips: [
      "Cogumelos devem ser salteados sem gordura inicialmente — a gordura impede o douramento.",
      "Não lote a frigideira — os cogumelos cozinharão em vez de dourar.",
      "Shitake e portobelo dão sabor mais intenso e 'carnudo'."
    ]
  },
  {
    name: "Buddha Bowl Colorido 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Tigela nutritiva completa com grãos, legumes e molho",
    category: "Vegetariano",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 30,
    cookTime: 25,
    servings: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 xícara arroz integral ou quinoa",
      "1 lata grão-de-bico",
      "1 beterraba, 1 cenoura",
      "1 abacate maduro",
      "folhas verdes variadas",
      "sementes de girassol e gergelim",
      "MOLHO: tahine, limão, alho, azeite, sal"
    ],
    instructions: [
      "Cozinhe o grão: arroz ou quinoa conforme instruções. Resfrie levemente.",
      "Asse beterraba (30 min a 200 °C, embrulhada em papel alumínio) e cenoura em palitos (20 min).",
      "Prepare o grão-de-bico: escorra, seque, asse a 200 °C com azeite e temperos por 20 min até crocante.",
      "Monte a tigela em seções: grão no centro, legumes assados, folhas verdes, abacate fatiado.",
      "Adicione o grão-de-bico crocante por cima.",
      "Polvilhe sementes. Regue com o molho de tahine."
    ],
    tips: [
      "Monte tudo separado — visual é parte da experiência.",
      "Beterraba deve ser assada, não cozida, para concentrar sabor."
    ]
  }
];
