import { Recipe } from "@/types/friggo";

export const receitasPaes: Omit<Recipe, "id" | "usesExpiringItems">[] = [
  {
    name: "Pão Caseiro Básico 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Pão de forma macio e fofo — a primeira receita de quem quer aprender a fazer pão",
    category: "Pães",
    type: "snack",
    difficulty: "fácil",
    prepTime: 120,
    cookTime: 35,
    servings: 16,
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "500 g farinha de trigo",
      "10 g fermento biológico seco",
      "10 g sal",
      "30 g açúcar",
      "30 g manteiga amolecida",
      "280 ml leite morno",
      "1 ovo"
    ],
    instructions: [
      "ATIVAÇÃO DO FERMENTO: Misture o fermento com o açúcar e 100 ml do leite morno (40 °C — confortável ao toque). Espere 10 min até espumar.",
      "Em tigela grande: misture farinha e sal. Faça uma cova no centro. Adicione a mistura de fermento, ovo, manteiga e o resto do leite.",
      "Misture até formar massa. Transfira para superfície e sove por 10 min até lisa, elástica e não grudar nas mãos. Teste da janela: estique um pedaço — deve ficar translúcido sem rasgar.",
      "Forme uma bola, coloque em tigela untada. Cubra com filme plástico. Deixe crescer por 1 h ou até dobrar de volume.",
      "Amasse levemente para tirar o ar (degas). Modele no formato desejado (forma de pão ou bolas).",
      "Segunda fermentação: coloque na forma untada. Cubra e deixe crescer mais 45 min.",
      "Asse a 190 °C por 30–35 min até dourar. Som oco ao bater no fundo = cozido.",
      "Esfrie em grade antes de cortar — cortar quente resseca."
    ],
    tips: [
      "Leite a 40 °C ativa o fermento. Frio não ativa, quente demais mata.",
      "Sovar desenvolve glúten — é o que dá estrutura ao pão.",
      "Pão esfriando na grade é fundamental — vapor embaixo resseca a casca."
    ]
  },
  {
    name: "Pão de Queijo Mineiro 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Bolinha crocante por fora, elástica e queijuda por dentro — tradição mineira",
    category: "Pães",
    type: "snack",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 25,
    servings: 24,
    imageUrl:
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "500 g polvilho azedo",
      "200 ml leite",
      "100 ml óleo",
      "2 ovos",
      "200 g queijo meia-cura ou parmesão ralado",
      "sal a gosto"
    ],
    instructions: [
      "Em panela, ferva o leite com o óleo e sal. Assim que ferver, despeje de uma vez sobre o polvilho.",
      "Misture rapidamente com colher de pau — a massa ficará irregular. Deixe esfriar até morna.",
      "Adicione os ovos um a um, amassando bem após cada um.",
      "Adicione o queijo ralado e misture até incorporar completamente.",
      "A massa ficará pegajosa — é normal. Unte as mãos com óleo para modelar.",
      "Pré-aqueça o forno a 200 °C. Forme bolinhas de 3 cm. Disponha em assadeira untada.",
      "Asse por 20–25 min até dourar. Serão levemente ocos e elásticos.",
      "Sirva quente pois esfriando perdem a crocância externa."
    ],
    tips: [
      "Polvilho AZEDO é diferente do doce — muda completamente a textura.",
      "Queijo meia-cura é o tradicional; parmesão dá sabor mais intenso.",
      "Congelar antes de assar: congele as bolinhas cruas e asse diretamente do congelador."
    ]
  },
  {
    name: "Focaccia Italiana com Alecrim 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Pão plano italiano oleoso, crocante por baixo, macio dentro com buraquinhos",
    category: "Pães",
    type: "snack",
    difficulty: "médio",
    prepTime: 120,
    cookTime: 25,
    servings: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "500 g farinha de trigo",
      "350 ml água morna",
      "7 g fermento biológico seco",
      "10 g sal",
      "5 g açúcar",
      "80 ml azeite extra virgem",
      "alecrim fresco, sal grosso, flor de sal"
    ],
    instructions: [
      "Misture o fermento e o açúcar com a água morna. Espere 10 min.",
      "Na tigela: farinha + sal. Adicione a água com fermento e 40 ml do azeite. Misture até formar massa pegajosa — não sove muito (focaccia tem menos glúten que pão comum).",
      "Cubra e deixe fermentar 1 h. Faça 4 dobras na massa a cada 30 min (stretch and fold).",
      "Unte generosamente assadeira 30x40 cm com azeite. Transfira a massa e espalhe devagar.",
      "Cubra e deixe crescer mais 45 min até preencher a forma.",
      "BURAQUINHOS: com dedos untados, faça furinhos profundos por toda a superfície.",
      "Regue com o restante do azeite. Distribua alecrim fresco e flor de sal.",
      "Asse a 220 °C por 20–25 min até dourar por baixo e levemente por cima."
    ],
    tips: [
      "Azeite em abundância é o que define a focaccia — não economize.",
      "Os buraquinhos retêm o azeite e criam a textura característica.",
      "Coberturas adicionais: tomate cereja, azeitonas, cebola roxa, rosemary."
    ]
  },
  {
    name: "Chipa Paraguaia 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Pãozinho paraguaio de polvilho e queijo — similar ao pão de queijo, mais sabor",
    category: "Pães",
    type: "snack",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 20,
    servings: 16,
    imageUrl:
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "500 g polvilho doce",
      "200 g queijo parmesão ralado",
      "2 ovos",
      "100 g manteiga amolecida",
      "200 ml leite morno",
      "sal",
      "aniz em sementes (opcional)"
    ],
    instructions: [
      "Misture polvilho, queijo e sal numa vasilha.",
      "Adicione manteiga amolecida e misture com os dedos até formar farofa.",
      "Adicione os ovos e o leite aos poucos, sovando até obter massa homogênea. Não deve grudar nas mãos.",
      "Modele em rolinhos ou argolas (formato tradicional).",
      "Asse a 200 °C por 18–20 min até dourar. Não asse demais — perde a elasticidade interna."
    ],
    tips: [
      "Manteiga amolecida (não derretida) dá textura diferente.",
      "Formato de argola é tradicional e cozinha mais uniforme."
    ]
  }
];
