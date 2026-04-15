import { Recipe } from "@/types/friggo";

export const receitasBolos: Omit<Recipe, "id" | "usesExpiringItems">[] = [
  {
    name: "Bolo de Cenoura com Cobertura de Chocolate 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "O bolo mais amado do Brasil — fofo, úmido, com ganache que escorre pelas bordas",
    category: "Bolos",
    type: "snack",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 40,
    servings: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "BOLO: 3 cenouras médias picadas, 3 ovos, 1 xícara óleo, 2 xícaras açúcar, 2 xícaras farinha, 1 colher fermento",
      "COBERTURA: 200 g chocolate meio amargo, 100 ml creme de leite, 1 colher manteiga"
    ],
    instructions: [
      "Pré-aqueça o forno a 180 °C. Unte e enfarinhe forma de furo de 26 cm.",
      "No liquidificador: bata as cenouras descascadas e cortadas com os ovos e o óleo até completamente liso.",
      "Em tigela grande: misture açúcar com a mistura do liquidificador.",
      "Peneire a farinha e adicione à mistura. Misture até incorporar, sem bater demais.",
      "Adicione o fermento e misture gentilmente — bater libera o gás.",
      "Despeje na forma. Asse por 35–40 min. Palito seco = pronto.",
      "COBERTURA (GANACHE): Ferva o creme de leite. Despeje sobre o chocolate picado. Espere 1 min. Mexa até liso. Adicione manteiga.",
      "Desenforme o bolo morno. Despeje a ganache fervendo para que escorra pelas laterais."
    ],
    tips: [
      "Liquidificador é a chave — cenoura completamente processada = bolo mais úmido.",
      "Ganache quente escorre. Ganache fria cobre. Escolha conforme preferência.",
      "Bolo de cenoura dura 4 dias em temperatura ambiente coberto."
    ]
  },
  {
    name: "Bolo de Chocolate Úmido 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Bolo de chocolate denso e úmido com café para intensificar o sabor",
    category: "Bolos",
    type: "snack",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 45,
    servings: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "2 xícaras farinha, 2 xícaras açúcar",
      "1 xícara cacau em pó",
      "1 colher bicarbonato, 2 colh fermento, 1 colh sal",
      "2 ovos, 1 xícara leite, 100 ml óleo",
      "1 colher extrato baunilha",
      "1 xícara café quente forte"
    ],
    instructions: [
      "Pré-aqueça o forno a 175 °C. Unte 2 formas redondas de 22 cm.",
      "INGREDIENTES SECOS: Misture farinha, açúcar, cacau, bicarbonato, fermento e sal.",
      "INGREDIENTES ÚMIDOS: Bata ovos, leite, óleo e baunilha.",
      "Misture os secos nos úmidos. Adicione por último o café quente. A mistura ficará muito líquida — normal.",
      "Divida entre as duas formas.",
      "Asse por 30–35 min. Palito seco.",
      "Esfrie completamente antes de cobrir.",
      "COBERTURA: Ganache ou buttercream de chocolate. Monte as camadas com recheio no meio."
    ],
    tips: [
      "Café quente ativa o cacau e aprofunda o sabor de chocolate.",
      "Massa líquida é característica deste bolo — não adicione farinha.",
      "Para mais úmido: adicione 100 ml de óleo a mais."
    ]
  },
  {
    name: "Bolo de Banana com Canela 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Bolo úmido de banana madura — quanto mais madura a banana, mais saboroso",
    category: "Bolos",
    type: "snack",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 40,
    servings: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1587254952839-6b30bf5b0630?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "4 bananas-nanicas bem maduras",
      "2 ovos, 100 ml óleo",
      "1 xícara açúcar",
      "2 xícaras farinha",
      "1 colher fermento",
      "1 colher canela, 1 pitada noz-moscada",
      "pitada de sal"
    ],
    instructions: [
      "Amasse as bananas com garfo até purê — devem estar bem maduras (manchadas de preto).",
      "Bata os ovos com o açúcar e o óleo por 2 min.",
      "Adicione o purê de banana. Misture.",
      "Peneire a farinha, fermento, canela e sal. Incorpore à mistura de banana.",
      "Despeje em forma untada e enfarinhada.",
      "Asse a 180 °C por 35–40 min. Palito seco.",
      "Opcional: cubra com fatias de banana e polvilhe açúcar e canela antes de assar para caramelizar."
    ],
    tips: [
      "Banana preta/super madura = mais doce e aromática.",
      "Não misture demais após adicionar a farinha — glúten deixa o bolo borrachento.",
      "Excelente para fazer banana-bread no formato de pão inglês."
    ]
  },
  {
    name: "Pão de Ló Tradicional 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "Base clássica da confeitaria brasileira — massa aerada de ovos batidos",
    category: "Bolos",
    type: "snack",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 30,
    servings: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "6 ovos inteiros",
      "200 g açúcar refinado",
      "200 g farinha de trigo peneirada",
      "1 colher extrato baunilha",
      "pitada de sal"
    ],
    instructions: [
      "Pré-aqueça o forno a 170 °C. Unte e enfarinhe forma de 26 cm. FORnose sem furo para pão de ló.",
      "Bata ovos inteiros com açúcar na batedeira em velocidade alta por 10–12 min até quadruplicar de volume.",
      "A mistura estará pronta quando 'escrever' — ao levantar a batedeira, o fio se mantém por 3 seg.",
      "Desligue a batedeira. Adicione a farinha peneirada em 3 partes, incorporando com espátula em movimentos delicados de baixo para cima.",
      "Não mexa em círculos — perde o ar batido.",
      "Despeje gentilmente na forma.",
      "Asse por 25–30 min. NÃO abra o forno nos primeiros 20 min.",
      "Espere esfriar completamente antes de cortar para montar tortas."
    ],
    tips: [
      "O segredo é bater os ovos corretamente — não há outra gordura nesta receita.",
      "Farinha peneirada incorpora mais facilmente.",
      "Pão de ló murcha se forno abrir antes do tempo ou se desenformado quente."
    ]
  }
];
