import { Recipe } from "@/types/kaza";

export const receitasCarnes: Omit<Recipe, "id" | "usesExpiringItems">[] = [
  {
    name: "Picanha na Brasa 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description: "A rainha do churrasco brasileiro — sal grosso e fogo alto",
    category: "Carnes",
    type: "lunch",
    difficulty: "médio",
    prepTime: 10,
    cookTime: 35,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1558030137-a56c1b501912?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 peça de picanha (1,2–1,5 kg)",
      "sal grosso a gosto",
      "pimenta-do-reino grossa (opcional)"
    ],
    instructions: [
      "Retire a picanha da geladeira 30–45 min antes de grelhar — carne em temperatura ambiente cozinha mais uniformemente.",
      "Corte em fatias de 2–3 cm NO SENTIDO de manter a capa de gordura e as fibras perpendiculares ao corte final. Cada fatia deve ter a capa de gordura na parte de cima.",
      "Tempere generosamente com sal grosso por todos os lados. Massageie levemente. Não use sal fino — o grosso forma uma crosta e não penetra demais.",
      "Coloque as espetadas ou posicione na grelha com a capa de gordura PARA CIMA em fogo alto por 3–4 min. A gordura derrete lentamente e rega a carne.",
      "Vire a carne e sele o outro lado por 3 min. A capa de gordura deve estar levemente dourada, não preta.",
      "Para mal passado: 3–4 min cada lado, temperatura interna 52 °C. Ao ponto: 5–6 min cada lado, 60 °C. Bem passado: 7–8 min, 70 °C.",
      "Retire do fogo e deixe DESCANSAR em tábua por 5 min, coberta com papel alumínio frouxo — o descanso redistribui os sucos e evita perda ao cortar.",
      "Corte contra as fibras em fatias finas para servir. Sirva com farofa, vinagrete, mandioca frita e pão de alho."
    ],
    tips: [
      "Picanha brasileira tem capa de gordura espessa — não a remova antes de grelhar.",
      "Nunca espete até o final na brasa — deixe distância para controlar o calor.",
      "Fogo muito baixo ou muito alto estraga — chama moderada é o ideal."
    ]
  },
  {
    name: "Bife à Milanesa 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Bife de bovino empanado crocante frito na frigideira",
    category: "Carnes",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "8 bifes de alcatra ou coxão mole (finos, ~1 cm)",
      "2 ovos batidos",
      "200 g de farinha de rosca temperada",
      "100 g de farinha de trigo",
      "alho amassado",
      "suco de limão",
      "sal e pimenta-do-reino",
      "óleo para fritar"
    ],
    instructions: [
      "Bata os bifes com o martelo de carne (ou fundo de frigideira) entre dois plásticos para afinar para ~0,5 cm. Bifes mais finos ficam mais crocantes.",
      "Tempere com sal, pimenta e alho amassado. Regue com suco de limão e deixe marinar por 15 min em geladeira.",
      "Prepare a linha de empanamento: prato com farinha de trigo → tigela com ovos batidos → prato com farinha de rosca.",
      "Passe cada bife: primeiro na farinha de trigo (pressione para grudar, retire o excesso), depois no ovo, depois na farinha de rosca. Pressione bem para a farinha de rosca aderir.",
      "Para empanamento mais espesso e crocante, repita: ovo → rosca novamente.",
      "Aqueça óleo suficiente para cobrir metade do bife (~1 cm de profundidade) a 180 °C. O óleo está certo quando um pedacinho de pão borbulha e sobe rapidamente.",
      "Frite 2 bifes por vez por 2–3 min de cada lado até ficarem dourado-âmbar. Frite em levas pequenas para não baixar a temperatura do óleo.",
      "Escorra em papel absorvente. Sirva imediatamente com limão, arroz com feijão e salada."
    ],
    tips: [
      "Nunca tampe a frigideira durante a fritura — cria vapor e amolece a casca.",
      "Alcatra ligeiramente congelada é mais fácil de fatiar fino.",
      "Para versão assada: pincele com azeite e asse a 220 °C por 15 min."
    ]
  },
  {
    name: "Estrogonofe de Carne 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description:
      "Filé mignon em molho cremoso de creme de leite, champignon e mostarda",
    category: "Carnes",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "600 g de filé mignon em tiras",
      "1 cebola picada",
      "3 dentes de alho",
      "200 g de champignon fatiado",
      "300 ml de creme de leite",
      "2 colheres de conhaque (opcional)",
      "1 colher de mostarda dijon",
      "1 colher de ketchup",
      "sal, pimenta, manteiga"
    ],
    instructions: [
      "Corte o filé mignon em tiras de 1×5 cm no sentido contrário às fibras. Tempere com sal e pimenta generosamente.",
      "Aqueça manteiga + azeite em frigideira bem quente. Sele as tiras de carne em fogo alto, sem mexer, por 1–2 min de cada lado. Não lotam a frigideira — sele em levas pequenas. Reserve.",
      "Na mesma frigideira, refogue a cebola em fogo médio por 4 min. Adicione o alho e mexa por 1 min.",
      "Adicione o champignon e cozinhe por 5 min até dourar.",
      "Se usar conhaque: despeje e incline para flambar (ou apenas deixe evaporar por 2 min).",
      "Adicione a mostarda e o ketchup, misture bem.",
      "Despeje o creme de leite, mexa e cozinhe em fogo médio por 5 min até o molho encorpar levemente.",
      "Volte a carne ao molho, aqueça por 2 min (não mais — para não endurecer). Ajuste temperos. Sirva com arroz branco e batata palha."
    ],
    tips: [
      "A carne selada em fogo alto não fica dura — o segredo é fogo alto e não mexer.",
      "Creme de leite fresco dá mais resultado que o de lata, mas ambos funcionam.",
      "Substitua filé por alcatra ou contrafilé para versão mais econômica."
    ]
  },
  {
    name: "Carne de Panela 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Carne brava cozida lentamente em molho saboroso até desmanchar",
    category: "Carnes",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 90,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1,5 kg de patinho ou acém em cubos grandes",
      "1 cebola grande picada",
      "4 dentes de alho",
      "2 tomates maduros picados",
      "1 pimentão vermelho",
      "2 cenouras em rodelas",
      "caldo de carne ou água",
      "louro, páprica, cominho, sal, pimenta",
      "mandioca ou batata para acompanhar"
    ],
    instructions: [
      "Seque bem os cubos de carne com papel toalha. Tempere com sal, pimenta, páprica e cominho. A carne seca sela melhor.",
      "Em panela de fundo grosso ou pressão, aqueça azeite em fogo alto. Sele os cubos em levas sem mexer por 3–4 min por lado até dourar bem. Essa etapa é fundamental para sabor.",
      "Reserve a carne. Na mesma panela, refogue cebola, alho, tomate e pimentão em fogo médio por 5 min.",
      "Volte a carne, adicione o louro e caldo suficiente para cobrir 2/3 da carne.",
      "Na panela de pressão: 30–35 min após pressão. Na panela comum: 1,5–2 h em fogo baixo com tampa.",
      "Adicione as cenouras nos últimos 15 min de cozimento para não desmanchar.",
      "Quando a carne estiver cedendo facilmente ao garfo, verifique o molho. Se estiver ralo, reduza descoberto por 10 min em fogo médio.",
      "Sirva com arroz, feijão, farofa e mandioca cozida."
    ],
    tips: [
      "Selar a carne em levas pequenas é fundamental — muita carne na panela cria vapor e cozinha em vez de selar.",
      "Para versão desfiada: cozinhe até desmanchar e desfie na carne.",
      "Acém tem mais colágeno que patinho — fica mais meloso e gelatinoso."
    ]
  },
  {
    name: "Ossobuco à Milanesa 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Canela de vitela cozida lentamente com gremolata de limão e salsinha",
    category: "Carnes",
    type: "dinner",
    difficulty: "difícil",
    prepTime: 20,
    cookTime: 120,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1607478900766-efe13248b125?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "4 peças de ossobuco (canela de vitela)",
      "farinha de trigo para empanar",
      "1 cebola, 2 cenouras, 3 talos salsão",
      "3 dentes de alho",
      "300 ml de vinho branco seco",
      "400 g de tomate pelado",
      "500 ml de caldo de vitela ou frango",
      "louro, tomilho",
      "GREMOLATA: raspa de limão, salsinha, alho",
      "manteiga, azeite, sal, pimenta"
    ],
    instructions: [
      "Faça 3–4 cortes rasos na borda do ossobuco (impede que enrole durante o cozimento). Tempere com sal e pimenta, empane levemente em farinha.",
      "Em panela de fundo grosso, aqueça manteiga e azeite em fogo alto. Sele o ossobuco por 4 min de cada lado até dourar bem. Reserve.",
      "Na mesma panela, refogue cebola, cenoura e salsão picados (soffritto) por 8 min. Adicione o alho e mexa por 1 min.",
      "Despeje o vinho branco. Deixe evaporar por 3 min, raspando o fundo.",
      "Adicione os tomates esmagados, o caldo e as ervas. Volte o ossobuco — o líquido deve cobrir metade da peça.",
      "Tampe e cozinhe em fogo muito baixo por 1,5–2 h (ou pressão 40 min). Vire o ossobuco uma vez na metade.",
      "Estará pronto quando a carne ceder ao garfo e estar levemente destacando do osso. A medula do osso deve estar mole.",
      "GREMOLATA: misture raspa de limão, salsinha picada e alho muito picado. Polvilhe por cima na hora de servir. Sirva com risoto de açafrão ou polenta cremosa."
    ],
    tips: [
      "Gremolata é obrigatória — o contraste ácido e fresco equilibra o prato rico.",
      "A medula dentro do osso é considerada iguaria — sirva com colherinha.",
      "Pode ser preparado 1 dia antes e fica melhor reaquecido."
    ]
  },
  {
    name: "Boeuf Bourguignon 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description:
      "Ensopado francês de carne ao vinho tinto com cogumelos e cebolas",
    category: "Carnes",
    type: "dinner",
    difficulty: "difícil",
    prepTime: 30,
    cookTime: 180,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1,5 kg de acém ou coxão duro em cubos grandes",
      "200 g de bacon em pedaços",
      "1 garrafa de vinho tinto Borgonha ou Merlot",
      "400 ml de caldo de carne",
      "2 cenouras, 1 cebola, 3 dentes de alho",
      "300 g de cebola pérola inteira",
      "300 g de champignon inteiro",
      "tomilho, louro, salsinha",
      "farinha, manteiga, azeite"
    ],
    instructions: [
      "Marine a carne no vinho com cenoura picada, cebola, alho e ervas por pelo menos 4 h (ou 12 h). A marinada amaciante e adiciona sabor.",
      "Escorra a carne, seque bem. Reserve a marinada. Em panela de fundo grosso, frite o bacon até dourar. Reserve.",
      "No mesmo azeite/gordura, sele a carne em levas, 3–4 min por lado até dourar bem. Reserve.",
      "Refogue os legumes da marinada por 5 min. Polvilhe 2 colheres de farinha, misture bem. Adicione a marinada e o caldo.",
      "Volte a carne e o bacon, adicione ervas. Ferva, depois tampe e cozinhe no forno a 160 °C ou fogo muito baixo por 2,5–3 h.",
      "Na última hora: em frigideira separada, doure as cebolinhas pérola em manteiga com açúcar até caramelizar. Reserve. Saltei o champignon em manteiga.",
      "Adicione os cogumelos e cebolas pérola ao ensopado. Cozinhe mais 30 min.",
      "Ajuste o molho (deve estar encorpado e brilhante). Sirva com purê de batatas, massa larga ou pão rústico."
    ],
    tips: [
      "Use vinho que você beberia — vinho ruim dá molho ruim.",
      "Este prato melhora muito ao repouso de 1 dia — faça com antecedência.",
      "A clássica receita da Julia Child usa este método."
    ]
  },
  {
    name: "Costela de Boi no Forno 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description:
      "Costela bovina assada lentamente até desmanchar, com crosta caramelizada",
    category: "Carnes",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 360,
    servings: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1558030137-a56c1b501912?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "2–3 kg de costela bovina janela ou fraldinha",
      "4 dentes de alho amassados",
      "2 colheres de mostarda dijon",
      "2 colheres de mel",
      "páprica defumada",
      "cominho, sal, pimenta, orégano",
      "1 cebola e 1 cenoura em rodelas",
      "400 ml de caldo de carne ou cerveja"
    ],
    instructions: [
      "Com 12 h de antecedência, prepare a pasta de tempero: misture alho, mostarda, mel, páprica, cominho, sal, pimenta e orégano. Esfregue por toda a costela. Cubra e refrigere.",
      "Retire da geladeira 1 h antes de assar. Pré-aqueça o forno a 160 °C.",
      "Em assadeira funda, distribua as rodelas de cebola e cenoura — servem como cama para a costela e adicionam sabor ao caldo.",
      "Coloque a costela com o osso para baixo. Despeje caldo ou cerveja ao redor (não por cima). Cubra hermeticamente com papel alumínio duplo.",
      "Asse por 4–5 horas a 160 °C. A carne está pronta quando você consegue separar os ossos facilmente com as mãos.",
      "Retire o alumínio, aumente o forno para 220 °C ou use o grill. Pincele com o molho da assadeira e asse por mais 20–30 min para caramelizar e formar crosta.",
      "Deixe descansar por 15 min antes de servir. O caldo da assadeira pode ser reduzido em panelinha para servir como molho.",
      "Sirva com farofa, mandioca frrita ou purê de batatas."
    ],
    tips: [
      "Temperatura baixa + tempo longo é o segredo do colágeno que vira gelatina.",
      "Cerveja preta adiciona malte e doçura ao molho.",
      "Se usar a costela com osso de corte de açougue, peça para serrar em pedaços menores."
    ]
  },
  {
    name: "Stroganoff de Filé na Chaleira 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "Filé ao molho de tomate, creme e catchup — versão brasileira tradicional",
    category: "Carnes",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "600 g de filé mignon em cubos",
      "1 cebola picada",
      "2 dentes de alho",
      "3 colheres de ketchup",
      "1 colher de mostarda",
      "300 ml de creme de leite",
      "200 g de champignon em fatias",
      "sal, pimenta, manteiga",
      "batata palha para servir"
    ],
    instructions: [
      "Tempere os cubos de filé com sal e pimenta. Reserve em temperatura ambiente enquanto prepara os outros ingredientes.",
      "Aqueça manteiga em frigideira grande em fogo alto. Sele os cubos rapidamente, 1–2 min por lado, em levas pequenas. Reserve.",
      "Na mesma frigideira, refogue cebola por 3 min e alho por 1 min em fogo médio.",
      "Adicione o champignon e cozinhe por 4–5 min até dourar.",
      "Adicione ketchup e mostarda. Mexa bem por 1 min.",
      "Despeje o creme de leite, misture e deixe engrossar levemente por 5 min em fogo médio.",
      "Volte a carne ao molho por 2–3 min apenas para aquecer. Ajuste temperos.",
      "Sirva sobre arroz branco, coberto com batata palha crocante. Clássico brasileiro."
    ],
    tips: [
      "A batata palha é indispensável na versão brasileira — diferencia do europeu.",
      "Não cozinhe a carne no molho por muito tempo — fica dura.",
      "Para versão mais light, use cream cheese no lugar do creme de leite."
    ]
  },
  {
    name: "Medalhão de Filé com Molho de Vinho 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Filé mignon grelhado com redução de vinho tinto e manteiga",
    category: "Carnes",
    type: "dinner",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "2 medalhões de filé mignon (~200 g cada, 4 cm espessura)",
      "sal grosso e pimenta-do-reino",
      "2 colheres de manteiga",
      "2 ramos de tomilho",
      "2 dentes de alho esmagados",
      "MOLHO: 200 ml vinho tinto, 1 cebola roxa, 200 ml caldo de carne, manteiga gelada"
    ],
    instructions: [
      "Retire os medalhões da geladeira 1 hora antes. Tempere generosamente com sal grosso e pimenta moída na hora.",
      "Aqueça frigideira de ferro (ou inox) em fogo alto por 3–4 min até ficar muito quente. Adicione um fio de óleo de sabor neutro.",
      "Coloque os medalhões e NÃO TOQUE por 3 min. Uma crosta marrom-escura vai se formar. Vire e cozinhe outros 3 min (ao ponto mal passado).",
      "Reduza o fogo. Adicione manteiga, alho e tomilho. Faça o 'basting': incline a frigideira e use colher para regar continuamente os medalhões com a manteiga por 2 min.",
      "Transfira para tábua e descanse 5 min coberto com alumínio.",
      "MOLHO: Na mesma frigideira, refogue cebola roxa fatiada em fio de azeite por 5 min. Adicione o vinho e reduza 2/3 (5 min). Adicione caldo e reduza pela metade.",
      "Retire do fogo, incorpore 2–3 colheres de manteiga gelada em cubinhos (monte au beurre) mexendo até emulsificar e obter molho brilhante.",
      "Sirva os medalhões com o molho por cima e o resto na molheira. Purê de batatas e aspargos completam o prato."
    ],
    tips: [
      "A técnica do 'basting' com manteiga aromatiza e finaliza a carne.",
      "Temperatura interna: 52 °C mal passado, 57 °C médio, 63 °C ao ponto.",
      "O descanso é obrigatório — o suco redistribui e a carne fica muito mais suculenta."
    ]
  },
  {
    name: "Carne Louca 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Carne bovina desfiada temperada com vinagrete — recheio de sanduíches",
    category: "Carnes",
    type: "snack",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 45,
    servings: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 kg de músculo ou coxão mole",
      "1 cebola, 3 dentes de alho",
      "louro, sal, pimenta",
      "VINAGRETE: tomate, cebola, pimentão, salsinha",
      "vinagre, azeite, sal"
    ],
    instructions: [
      "Corte a carne em pedaços maiores. Na pressão, coloque a carne com cebola, alho, louro, sal e água para cobrir.",
      "Cozinhe sob pressão por 35–40 min ou até desmanchar completamente.",
      "Escorra (guarde o caldo para sopas) e desfie a carne com dois garfos enquanto ainda quente.",
      "Prepare o vinagrete: pique tomate, cebola, pimentão e salsinha em pedaços pequenos. Tempere com vinagre, azeite e sal.",
      "Misture o vinagrete à carne desfiada. Ajuste temperos.",
      "Deixe descansar por 15–20 min para a carne absorver o vinagrete.",
      "Sirva em pão francês, ciabatta ou pão de forma. Ótimo para festas e grandes eventos.",
      "Guarda na geladeira por 4–5 dias."
    ],
    tips: [
      "Quantidade maior fica mais saborosa — temperos se multiplicam.",
      "Adicione pimenta malagueta para versão apimentada."
    ]
  },
  {
    name: "Bife Acebolado 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Bife grelhado na frigideira com cebolas douradas e caramelizadas",
    category: "Carnes",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "4 bifes de contrafilé ou alcatra (~180 g cada)",
      "2 cebolas grandes em rodelas",
      "4 dentes de alho",
      "manteiga, azeite",
      "sal grosso, pimenta-do-reino",
      "salsinha para finalizar"
    ],
    instructions: [
      "Tempere os bifes com sal grosso e pimenta-do-reino moída na hora. Não use sal fino — extrai umidade e impede a selagem.",
      "Aqueça frigideira de ferro ou inox em fogo alto até extremamente quente. Adicione fio de azeite.",
      "Frite os bifes SEM MOVER por 3–4 min para mal passado (varie conforme espessura). Vire e cozinhe mais 2–3 min.",
      "Nos últimos 2 min, adicione manteiga e alho esmagado. Use colher para regar o bife com a manteiga derretida.",
      "Retire os bifes e descanse em tábua por 3 min.",
      "Na mesma frigideira, com o fogo em médio, adicione mais fio de azeite e a cebola em rodelas. Refogue por 12–15 min até dourar e caramelizar, mexendo a cada 3 min.",
      "Na última colher de mostarda e sal. Mexa mais 2 min.",
      "Sirva os bifes cobertos com as cebolas. Arroz, feijão e farofa completam."
    ],
    tips: [
      "Frigideira muito quente é essencial — bifes em frigideira fria cozinham, não selam.",
      "Contrafilé com a gordura lateral — não corte antes de grelhar, ela protege.",
      "Para cebola caramelizada, o segredo é paciência e fogo baixo."
    ]
  },
  {
    name: "Ragu de Carne para Polenta 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Molho encorpado de carne desfiada para acompanhar polenta cremosa",
    category: "Carnes",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 100,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1574652276286-2fc75a89c3d4?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 kg de acém ou coxão duro",
      "1 cebola, 2 cenouras, 2 talos salsão",
      "1 lata tomate pelado",
      "200 ml vinho tinto",
      "caldo de carne",
      "louro, tomilho, alho",
      "POLENTA: 300 g fubá, 1,2 L leite, caldo, manteiga, parmesão"
    ],
    instructions: [
      "Sele a carne em pedaços grandes por todos os lados em fogo alto. Reserve.",
      "Refogue cebola, cenoura e salsão picados por 7 min. Adicione alho e ervas.",
      "Adicione vinho, deixe evaporar. Adicione tomates e caldo para cobrir.",
      "Volte a carne. Cozinhe em fogo baixo por 2 h (pressão 50 min) até desmanchar.",
      "Desfie a carne no molho. Reduza o molho se necessário.",
      "POLENTA: Ferva o leite com caldo e sal. Despeje o fubá em chuva mexendo. Cozinhe 25 min em fogo baixo mexendo. Finalize com manteiga e parmesão.",
      "Sirva a polenta no fundo, regue com o ragù e parmesão ralado."
    ],
    tips: [
      "Polenta cremosa exige mexer constantemente — use panela antiaderente.",
      "Reste alho da polenta sobre a mesa para cada comensal."
    ]
  }
];
