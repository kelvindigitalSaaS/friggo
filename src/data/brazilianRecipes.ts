import { Recipe } from "@/types/friggo";

// Banco de dados com centenas de receitas brasileiras
export const brazilianRecipes: Omit<Recipe, "id" | "usesExpiringItems">[] = [
  // ALMOÇOS
  {
    name: "Arroz com Feijão",
    description: "O clássico brasileiro que não pode faltar",
    type: "lunch",
    ingredients: ["arroz", "feijão", "alho", "cebola", "óleo", "sal"],
    instructions: [
      "Lave 2 xícaras de arroz e deixe de molho por 15 min. Refogue 2 dentes de alho picados no óleo até dourar levemente.",
      "Adicione o arroz escorrido e refogue por 2 min. Despeje 3 xícaras de água quente, tempere com sal e deixe ferver.",
      "Quando a água secar na superfície, tampe a panela, reduza ao mínimo e cozinhe por 15 min sem abrir.",
      "Enquanto isso, cozinhe 2 xícaras de feijão carioca na pressão com 5 xícaras de água por 20–25 min após pegar pressão.",
      "Refogue cebola picada em azeite até amolecer, junte o feijão cozido com caldo, acerte o sal e deixe apurar por 5 min.",
      "Sirva o arroz soltinho ao lado do feijão caldoso. Finalize o feijão com coentro ou salsinha picada a gosto."
    ],
    prepTime: 40,
    servings: 4
  },
  {
    name: "Feijoada Completa",
    description: "O prato mais tradicional do Brasil",
    type: "lunch",
    ingredients: [
      "feijão preto",
      "carne seca",
      "linguiça",
      "bacon",
      "costela de porco",
      "couve",
      "laranja",
      "farinha de mandioca"
    ],
    instructions: [
      "Deixe 500 g de feijão preto de molho por pelo menos 8 horas (ou a noite toda). Escorra a água.",
      "Dessalgue a carne seca e o bacon em água fria por 12 h, trocando a água 2 vezes. Corte em pedaços médios.",
      "Frite o bacon em fogo médio até soltar gordura. Doure a linguiça e as carnes nessa gordura. Reserve.",
      "Na mesma panela de pressão, refogue 1 cebola grande e 4 dentes de alho picados até dourar. Adicione as carnes e o feijão escorrido.",
      "Cubra com água (aprox. 1,5 L), feche a panela e cozinhe por 40 min após pressão em fogo médio-baixo.",
      "Abra, verifique se o feijão está cremoso e as carnes macias. Refogue a couve fatiada com alho e sal por 3 min.",
      "Sirva a feijoada com arroz branco, couve refogada, farinha de mandioca, laranja fatiada e pimenta a gosto."
    ],
    prepTime: 180,
    servings: 8
  },
  {
    name: "Frango à Parmegiana",
    description: "Filé empanado com molho de tomate e queijo derretido",
    type: "lunch",
    ingredients: [
      "peito de frango",
      "farinha de trigo",
      "ovo",
      "farinha de rosca",
      "molho de tomate",
      "queijo muçarela",
      "presunto"
    ],
    instructions: [
      "Abra os filés de frango em manta fina ou bata levemente. Tempere com sal, limão e alho por 15 min.",
      "Passe cada filé na farinha de trigo, depois no ovo batido e por último na farinha de rosca, pressionando bem.",
      "Frite em óleo bem quente (180 °C) por 3–4 min de cada lado até dourar e crocante. Escorra sobre papel absorvente.",
      "Pré-aqueça o forno a 200 °C. Coloque os filés em refratário untado.",
      "Cubra cada filé com 2 colheres de molho de tomate, 1 fatia de presunto e queijo muçarela farto.",
      "Leve ao forno por 10–12 min até o queijo derreter e borbulhar. Sirva imediatamente com arroz e batata."
    ],
    prepTime: 45,
    servings: 4
  },
  {
    name: "Estrogonofe de Frango",
    description: "Cremoso e irresistível",
    type: "lunch",
    ingredients: [
      "peito de frango",
      "creme de leite",
      "ketchup",
      "mostarda",
      "champignon",
      "cebola"
    ],
    instructions: [
      "Corte 600 g de peito de frango em cubos médios. Tempere com sal, pimenta-do-reino e 2 dentes de alho.",
      "Aqueça 2 colheres de azeite em fogo alto. Doure os cubos de frango por 5–7 min, sem mexer muito para criar cor.",
      "Adicione 1 cebola picada e refogue por 3 min até amolecer. Junte 150 g de champignon fatiado.",
      "Misture 3 colheres de ketchup, 1 colher de mostarda e 1 colher de molho inglês. Despeje sobre o frango e mexa.",
      "Reduza o fogo para médio-baixo. Adicione 200 ml de creme de leite fresco e misture delicadamente.",
      "Cozinhe por mais 5 min, provando e ajustando o sal. Sirva sobre arroz branco com batata palha por cima."
    ],
    prepTime: 30,
    servings: 4
  },
  {
    name: "Bife à Milanesa",
    description: "Carne empanada crocante",
    type: "lunch",
    ingredients: [
      "bife de coxão mole",
      "farinha de trigo",
      "ovo",
      "farinha de rosca",
      "sal",
      "limão"
    ],
    instructions: [
      "Bata levemente os bifes com martelo de carne para uniformizar a espessura (aprox. 1 cm).",
      "Tempere com sal, pimenta e suco de 1 limão. Deixe descansar por 10 min.",
      "Prepare 3 tigelas: farinha de trigo, ovo batido com sal e farinha de rosca com salsinha.",
      "Passe cada bife na farinha (retire o excesso), depois no ovo e por fim na farinha de rosca. Pressione bem.",
      "Aqueça óleo abundante a 180 °C. Frite 2–3 bifes por vez por 3 min de cada lado até dourar.",
      "Escorra sobre papel absorvente. Sirva com arroz, feijão, salada e rodelas de limão."
    ],
    prepTime: 25,
    servings: 4
  },
  {
    name: "Picanha na Chapa",
    description: "Churrasco de picanha suculenta",
    type: "lunch",
    ingredients: ["picanha", "sal grosso", "alho", "manteiga"],
    instructions: [
      "Retire a picanha da geladeira 30 min antes. Corte em fatias de 2–3 cm seguindo as fibras, com gordura.",
      "Cubra generosamente com sal grosso dos dois lados. Não mexa mais até grelhar.",
      "Aqueça a chapa ou grelha em fogo máximo por 5 min até ficar muito quente (uma gota d'água deve evaporar instantaneamente).",
      "Coloque as fatias com a gordura voltada para baixo por 3 min para derreter e dourar. Vire para os lados cárneos.",
      "Grelhe 3–4 min de cada lado para mal passado (52–55 °C interno) ou 5–6 min para ao ponto (60–65 °C).",
      "Retire do fogo, coloque manteiga e alho frito por cima e deixe descansar 3 min antes de servir."
    ],
    prepTime: 20,
    servings: 4
  },
  {
    name: "Moqueca de Peixe",
    description: "Prato baiano cremoso com leite de coco",
    type: "lunch",
    ingredients: [
      "peixe",
      "leite de coco",
      "tomate",
      "pimentão",
      "cebola",
      "coentro",
      "dendê"
    ],
    instructions: [
      "Corte 600 g de peixe (cacao, robalo ou saint peter) em postas. Tempere com sal, limão e alho por 20 min.",
      "Numa tigela, misture tomate, pimentão e cebola fatiados em meia-lua. Adicione coentro picado e corante urucum.",
      "Em panela de barro ou funda, faça camadas: vegetais no fundo, depois o peixe, coberto com mais vegetais.",
      "Despeje 400 ml de leite de coco por cima e 2 colheres de azeite de dendê. Não misture.",
      "Cozinhe tampado em fogo médio-baixo por 20–25 min sem mexer para não desmanchar o peixe.",
      "Verifique o tempero e acrescente coentro fresco picado. Sirva diretamente na panela com arroz branco e pirou."
    ],
    prepTime: 50,
    servings: 6
  },
  {
    name: "Baião de Dois",
    description: "Arroz com feijão verde nordestino",
    type: "lunch",
    ingredients: [
      "arroz",
      "feijão verde",
      "charque",
      "queijo coalho",
      "manteiga de garrafa",
      "coentro"
    ],
    instructions: [
      "Cozinhe o arroz com feijão verde",
      "Adicione charque desfiado",
      "Misture queijo coalho",
      "Finalize com manteiga de garrafa"
    ],
    prepTime: 45,
    servings: 6
  },
  {
    name: "Escondidinho de Carne Seca",
    description: "Purê de mandioca com carne seca gratinada",
    type: "lunch",
    ingredients: [
      "mandioca",
      "carne seca",
      "creme de leite",
      "queijo",
      "manteiga",
      "cebola"
    ],
    instructions: [
      "Dessalgue 400 g de carne seca em água por 12 h. Cozinhe na pressão por 30 min. Desfie e reserve.",
      "Cozinhe 600 g de mandioca descascada por 20–25 min até ficar bem macia (quase se desfazendo).",
      "Drêne a mandioca, retire os fios centrais e amasse com 2 colheres de manteiga, 100 ml de creme de leite e sal. Reserve quente.",
      "Refogue 1 cebola grande e 2 dentes de alho na manteiga por 3 min. Adicione a carne desfiada e refogue por 5 min.",
      "Pré-aqueça o forno a 200 °C. Unte um refratário e faça camadas: purê de mandioca, carne refogada, mais purê.",
      "Cubra com 150 g de queijo muçarela ralado e leve ao forno por 15–20 min até gratinar. Sirva bem quente."
    ],
    prepTime: 60,
    servings: 6
  },
  {
    name: "Galinhada",
    description: "Arroz com frango e temperos",
    type: "lunch",
    ingredients: [
      "frango",
      "arroz",
      "açafrão",
      "cebola",
      "alho",
      "tomate",
      "salsinha"
    ],
    instructions: [
      "Refogue o frango em pedaços",
      "Adicione arroz e açafrão",
      "Cozinhe com água até secar",
      "Finalize com salsinha"
    ],
    prepTime: 50,
    servings: 6
  },
  {
    name: "Lombo Assado",
    description: "Carne de porco assada suculenta",
    type: "lunch",
    ingredients: [
      "lombo de porco",
      "alho",
      "mostarda",
      "mel",
      "laranja",
      "sal"
    ],
    instructions: [
      "Tempere o lombo e deixe marinar",
      "Asse em forno médio por 1 hora",
      "Regue com o molho da assadeira"
    ],
    prepTime: 90,
    servings: 6
  },
  {
    name: "Carne de Panela",
    description: "Músculo cozido lentamente",
    type: "lunch",
    ingredients: [
      "músculo bovino",
      "batata",
      "cenoura",
      "cebola",
      "alho",
      "tomate",
      "louro"
    ],
    instructions: [
      "Sele a carne em panela",
      "Adicione vegetais e água",
      "Cozinhe em fogo baixo por 2 horas"
    ],
    prepTime: 150,
    servings: 6
  },
  {
    name: "Virado à Paulista",
    description: "Prato típico paulista completo",
    type: "lunch",
    ingredients: [
      "feijão",
      "farinha de mandioca",
      "bisteca",
      "ovo",
      "banana",
      "couve"
    ],
    instructions: [
      "Cozinhe o feijão e misture com farinha",
      "Frite a bisteca e o ovo",
      "Refogue a couve",
      "Sirva tudo junto"
    ],
    prepTime: 60,
    servings: 4
  },
  {
    name: "Bobó de Camarão",
    description: "Camarão com creme de mandioca",
    type: "lunch",
    ingredients: [
      "camarão",
      "mandioca",
      "leite de coco",
      "dendê",
      "tomate",
      "cebola",
      "coentro"
    ],
    instructions: [
      "Cozinhe e amasse a mandioca",
      "Refogue o camarão",
      "Misture tudo com leite de coco",
      "Finalize com dendê"
    ],
    prepTime: 60,
    servings: 6
  },
  {
    name: "Costela no Bafo",
    description: "Costela assada lentamente",
    type: "lunch",
    ingredients: ["costela bovina", "sal grosso", "alho", "louro", "cerveja"],
    instructions: [
      "Tempere a costela com sal grosso",
      "Cubra bem com papel alumínio",
      "Asse por 4 horas em fogo baixo"
    ],
    prepTime: 240,
    servings: 8
  },
  {
    name: "Rabada",
    description: "Rabo de boi cozido até desmanchar",
    type: "lunch",
    ingredients: [
      "rabo de boi",
      "batata",
      "agrião",
      "tomate",
      "cebola",
      "alho"
    ],
    instructions: [
      "Cozinhe a rabada por 3 horas",
      "Adicione batatas no final",
      "Sirva com agrião"
    ],
    prepTime: 180,
    servings: 6
  },
  {
    name: "Coxinha de Frango",
    description: "Salgado brasileiro mais famoso",
    type: "snack",
    ingredients: [
      "frango desfiado",
      "farinha de trigo",
      "caldo de frango",
      "catupiry",
      "ovo",
      "farinha de rosca"
    ],
    instructions: [
      "Faça a massa com farinha e caldo",
      "Modele com recheio de frango",
      "Empane e frite"
    ],
    prepTime: 90,
    servings: 20
  },
  {
    name: "Empadão de Frango",
    description: "Torta recheada com frango cremoso",
    type: "lunch",
    ingredients: [
      "farinha de trigo",
      "manteiga",
      "frango",
      "azeitona",
      "palmito",
      "requeijão",
      "ovo"
    ],
    instructions: [
      "Prepare a massa",
      "Faça o recheio cremoso",
      "Monte e asse até dourar"
    ],
    prepTime: 90,
    servings: 8
  },
  {
    name: "Macarrão à Bolonhesa",
    description: "Massa com molho de carne moída",
    type: "lunch",
    ingredients: [
      "macarrão",
      "carne moída",
      "molho de tomate",
      "cebola",
      "alho",
      "cenoura",
      "queijo parmesão"
    ],
    instructions: [
      "Pique 1 cebola, 2 dentes de alho, 1 cenoura e 1 talo de salsão. Refogue em 2 col de azeite por 5 min.",
      "Adicione 400 g de carne moída ao fogo alto e mexa até perder a cor rosada (6–8 min).",
      "Despeje 100 ml de vinho tinto, mexa e deixe evaporar 2 min. Junte 400 g de molho de tomate.",
      "Reduza o fogo, tampe e cozinhe 20–25 min mexendo de vez em quando até engrossar. Acerte sal.",
      "Cozinhe 400 g de espaguete em água com sal (tempo da embalagem menos 1 min). Reserve 1 xíc da água.",
      "Escorra e misture na frigideira com o molho, adicionando um pouco da água do cozimento para unir.",
      "Sirva com queijo parmesão ralado na hora, manjericão fresco e pimenta-do-reino."
    ],
    prepTime: 40,
    servings: 4
  },
  {
    name: "Lasanha de Carne",
    description: "Camadas de massa, carne e queijo",
    type: "lunch",
    ingredients: [
      "massa de lasanha",
      "carne moída",
      "molho de tomate",
      "molho branco",
      "queijo muçarela",
      "presunto"
    ],
    instructions: [
      "Refogue 400 g de carne moída com cebola, alho e cenoura até dourar. Adicione 500 ml de molho de tomate e cozinhe 15 min.",
      "Molho branco: derreta 3 col de manteiga, adicione 3 col de farinha e mexa 1 min. Despeje 500 ml de leite quente aos poucos mexendo até engrossar. Tempere com sal e noz-moscada.",
      "Pré-aqueça o forno a 200 °C. Em refratário untado, espalhe uma fina camada de molho de carne.",
      "Monte camadas: placas de lasanha, molho de carne, molho branco, presunto e queijo muçarela. Repita pelo menos 3 vezes.",
      "Termine com molho branco generoso e queijo muçarela farto por cima.",
      "Cubra com papel-alumínio e asse 30 min. Retire o papel e asse mais 15 min até gratinar. Descansar 10 min antes de servir."
    ],
    prepTime: 90,
    servings: 8
  },
  {
    name: "Strogonoff de Carne",
    description: "Carne em molho cremoso",
    type: "lunch",
    ingredients: [
      "filé mignon",
      "creme de leite",
      "ketchup",
      "mostarda",
      "champignon",
      "cebola"
    ],
    instructions: [
      "Corte a carne em tiras",
      "Refogue com cebola",
      "Adicione os temperos",
      "Finalize com creme"
    ],
    prepTime: 30,
    servings: 4
  },
  {
    name: "Frango Xadrez",
    description: "Cubos de frango com legumes",
    type: "lunch",
    ingredients: [
      "peito de frango",
      "pimentão",
      "abobrinha",
      "cebola",
      "shoyu",
      "amendoim"
    ],
    instructions: [
      "Corte 500 g de peito de frango em cubos de 2 cm. Tempere com sal, pimenta e 2 col de shoyu. Marine 15 min.",
      "Corte 1 pimentão vermelho, 1 verde e 1 cebola em cubos iguais. Separe 3 col de amendoim torrado.",
      "Aqueça 2 col de óleo de gergelim em wok em fogo alto até quase fumegar.",
      "Doure o frango por 5–6 min sem mexer muito. Retire e reserve. Na mesma panela, refogue a cebola 2 min.",
      "Adicione os pimentões e refogue 2 min (devem ficar 'al dente'). Volte o frango.",
      "Misture 3 col de shoyu, 1 col de amido e 100 ml de água. Despeje e mexa até o molho encorpar.",
      "Finalize com amendoim e sirva sobre arroz branco com gergelim salpicado."
    ],
    prepTime: 25,
    servings: 4
  },
  {
    name: "Peixe Frito com Pirão",
    description: "Peixe crocante com pirão de caldo",
    type: "lunch",
    ingredients: [
      "peixe inteiro",
      "farinha de mandioca",
      "limão",
      "alho",
      "sal",
      "óleo"
    ],
    instructions: [
      "Tempere e frite o peixe",
      "Faça o pirão com o caldo",
      "Sirva com limão"
    ],
    prepTime: 40,
    servings: 4
  },
  {
    name: "Tutu de Feijão",
    description: "Feijão engrossado com farinha",
    type: "lunch",
    ingredients: [
      "feijão cozido",
      "farinha de mandioca",
      "bacon",
      "linguiça",
      "ovo",
      "couve"
    ],
    instructions: [
      "Amasse o feijão",
      "Adicione farinha aos poucos",
      "Sirva com acompanhamentos fritos"
    ],
    prepTime: 45,
    servings: 6
  },
  {
    name: "Vatapá",
    description: "Creme nordestino com camarão",
    type: "lunch",
    ingredients: [
      "camarão seco",
      "pão",
      "amendoim",
      "castanha de caju",
      "leite de coco",
      "dendê",
      "gengibre"
    ],
    instructions: [
      "Triture pão, amendoim e castanha",
      "Cozinhe com leite de coco",
      "Adicione camarão e dendê"
    ],
    prepTime: 60,
    servings: 6
  },
  {
    name: "Acarajé",
    description: "Bolinho de feijão fradinho frito",
    type: "snack",
    ingredients: [
      "feijão fradinho",
      "cebola",
      "camarão seco",
      "vatapá",
      "caruru",
      "dendê"
    ],
    instructions: [
      "Descasque e triture o feijão",
      "Frite em dendê",
      "Recheie com vatapá e camarão"
    ],
    prepTime: 90,
    servings: 12
  },
  {
    name: "Cuscuz Paulista",
    description: "Cuscuz com legumes e sardinha",
    type: "lunch",
    ingredients: [
      "farinha de milho",
      "sardinha",
      "tomate",
      "cebola",
      "ovo cozido",
      "azeitona",
      "palmito"
    ],
    instructions: [
      "Misture a farinha com caldo",
      "Adicione os ingredientes",
      "Cozinhe no vapor"
    ],
    prepTime: 60,
    servings: 8
  },
  {
    name: "Arroz Carreteiro",
    description: "Arroz com carne seca",
    type: "lunch",
    ingredients: [
      "arroz",
      "carne seca",
      "cebola",
      "alho",
      "tomate",
      "salsinha"
    ],
    instructions: [
      "Dessalgue a carne seca",
      "Refogue com arroz",
      "Cozinhe até secar"
    ],
    prepTime: 50,
    servings: 6
  },
  {
    name: "Risoto de Camarão",
    description: "Arroz cremoso com camarões",
    type: "lunch",
    ingredients: [
      "arroz arbóreo",
      "camarão",
      "vinho branco",
      "caldo de camarão",
      "manteiga",
      "parmesão"
    ],
    instructions: [
      "Tempere 400 g de camarão médio limpo com sal, limão e alho picado. Reserve. Mantenha 1 L de caldo de camarão quente.",
      "Refogue 1 cebola picada e 2 dentes de alho em 2 col de manteiga por 3 min sem dourar.",
      "Adicione 300 g de arroz arbóreo e refogue 2 min. Despeje 100 ml de vinho branco e mexa até absorver.",
      "Adicione o caldo quente concha a concha, mexendo constantemente, esperando absorver antes de mais. (18–20 min total.)",
      "Na última concha de caldo, junte os camarões. Cozinhe 3–4 min até ficarem rosados.",
      "Retire do fogo, incorpore 2 col de manteiga gelada e 50 g de parmesão ralado. Ajuste o sal.",
      "Deixe repousar 2 min. O risoto deve estar cremoso e fluido. Sirva imediatamente."
    ],
    prepTime: 40,
    servings: 4
  },
  {
    name: "Panqueca de Carne",
    description: "Crepes recheados com carne moída",
    type: "lunch",
    ingredients: [
      "farinha de trigo",
      "leite",
      "ovo",
      "carne moída",
      "molho de tomate",
      "queijo"
    ],
    instructions: [
      "Faça a massa das panquecas",
      "Prepare o recheio",
      "Enrole e cubra com molho e queijo"
    ],
    prepTime: 50,
    servings: 6
  },
  // LANCHES
  {
    name: "Pão de Queijo",
    description: "Bolinha mineira de polvilho e queijo",
    type: "snack",
    ingredients: [
      "polvilho azedo",
      "queijo minas",
      "ovo",
      "leite",
      "óleo",
      "sal"
    ],
    instructions: [
      "Escalde o polvilho com leite quente",
      "Adicione ovo e queijo",
      "Asse até dourar"
    ],
    prepTime: 30,
    servings: 20
  },
  {
    name: "Pastel de Feira",
    description: "Massa crocante com diversos recheios",
    type: "snack",
    ingredients: [
      "farinha de trigo",
      "cachaça",
      "sal",
      "carne moída",
      "queijo",
      "palmito"
    ],
    instructions: [
      "Prepare a massa com cachaça",
      "Recheie e feche",
      "Frite em óleo quente"
    ],
    prepTime: 45,
    servings: 12
  },
  {
    name: "Bolinha de Queijo",
    description: "Salgadinho frito crocante",
    type: "snack",
    ingredients: [
      "queijo muçarela",
      "farinha de trigo",
      "leite",
      "manteiga",
      "ovo",
      "farinha de rosca"
    ],
    instructions: [
      "Faça a massa cremosa",
      "Modele com queijo no centro",
      "Empane e frite"
    ],
    prepTime: 60,
    servings: 30
  },
  {
    name: "Esfiha de Carne",
    description: "Salgado árabe-brasileiro",
    type: "snack",
    ingredients: [
      "farinha de trigo",
      "fermento",
      "carne moída",
      "cebola",
      "tomate",
      "hortelã",
      "limão"
    ],
    instructions: [
      "Prepare a massa",
      "Faça o recheio temperado",
      "Modele e asse"
    ],
    prepTime: 90,
    servings: 24
  },
  {
    name: "Quibe Frito",
    description: "Bolinho de trigo e carne",
    type: "snack",
    ingredients: [
      "trigo para quibe",
      "carne moída",
      "cebola",
      "hortelã",
      "pimenta síria"
    ],
    instructions: [
      "Hidrate o trigo",
      "Misture com carne e temperos",
      "Modele e frite"
    ],
    prepTime: 60,
    servings: 20
  },
  {
    name: "Tapioca Recheada",
    description: "Crepe de tapioca versátil",
    type: "snack",
    ingredients: [
      "goma de tapioca",
      "queijo coalho",
      "manteiga",
      "coco",
      "leite condensado"
    ],
    instructions: [
      "Hidrate a goma",
      "Espalhe na frigideira",
      "Recheie e dobre"
    ],
    prepTime: 10,
    servings: 1
  },
  {
    name: "Empada de Palmito",
    description: "Tortinha recheada individual",
    type: "snack",
    ingredients: [
      "farinha de trigo",
      "manteiga",
      "palmito",
      "requeijão",
      "ovo",
      "azeitona"
    ],
    instructions: [
      "Faça a massa",
      "Prepare o recheio",
      "Monte nas forminhas e asse"
    ],
    prepTime: 60,
    servings: 12
  },
  {
    name: "Sanduíche Natural",
    description: "Lanche leve e saudável",
    type: "snack",
    ingredients: [
      "pão integral",
      "frango desfiado",
      "cenoura",
      "maionese",
      "alface",
      "tomate"
    ],
    instructions: [
      "Misture frango com cenoura e maionese",
      "Monte o sanduíche",
      "Corte em triângulos"
    ],
    prepTime: 20,
    servings: 4
  },
  {
    name: "Cachorro-Quente",
    description: "Hot dog brasileiro completo",
    type: "snack",
    ingredients: [
      "pão de hot dog",
      "salsicha",
      "molho de tomate",
      "milho",
      "batata palha",
      "maionese",
      "ketchup"
    ],
    instructions: [
      "Cozinhe a salsicha",
      "Monte no pão com todos os ingredientes"
    ],
    prepTime: 15,
    servings: 4
  },
  {
    name: "Misto Quente",
    description: "Sanduíche de queijo e presunto grelhado",
    type: "snack",
    ingredients: ["pão de forma", "queijo muçarela", "presunto", "manteiga"],
    instructions: ["Monte o sanduíche", "Grelhe com manteiga dos dois lados"],
    prepTime: 10,
    servings: 1
  },
  {
    name: "Bauru",
    description: "Sanduíche paulistano clássico",
    type: "snack",
    ingredients: [
      "pão francês",
      "rosbife",
      "queijo derretido",
      "tomate",
      "orégano"
    ],
    instructions: ["Recheie o pão", "Grelhe até o queijo derreter"],
    prepTime: 15,
    servings: 1
  },
  {
    name: "Pipoca",
    description: "Snack clássico brasileiro",
    type: "snack",
    ingredients: ["milho de pipoca", "óleo", "sal", "manteiga"],
    instructions: [
      "Aqueça óleo com milho",
      "Tampe e espere estourar",
      "Tempere a gosto"
    ],
    prepTime: 10,
    servings: 4
  },
  // SOBREMESAS
  {
    name: "Brigadeiro",
    description: "Docinho brasileiro mais querido",
    type: "dessert",
    ingredients: [
      "leite condensado",
      "chocolate em pó",
      "manteiga",
      "chocolate granulado"
    ],
    instructions: [
      "Cozinhe tudo em fogo baixo mexendo sempre",
      "Deixe esfriar",
      "Enrole em bolinhas"
    ],
    prepTime: 30,
    servings: 30
  },
  {
    name: "Beijinho",
    description: "Docinho de coco",
    type: "dessert",
    ingredients: ["leite condensado", "coco ralado", "manteiga", "cravo"],
    instructions: [
      "Cozinhe tudo mexendo sempre",
      "Deixe esfriar",
      "Enrole e decore com cravo"
    ],
    prepTime: 30,
    servings: 30
  },
  {
    name: "Pudim de Leite",
    description: "Sobremesa cremosa com calda de caramelo",
    type: "dessert",
    ingredients: ["leite condensado", "leite", "ovos", "açúcar"],
    instructions: [
      "Faça a calda de caramelo",
      "Bata os ingredientes",
      "Asse em banho-maria por 1 hora"
    ],
    prepTime: 90,
    servings: 10
  },
  {
    name: "Mousse de Maracujá",
    description: "Sobremesa leve e refrescante",
    type: "dessert",
    ingredients: [
      "polpa de maracujá",
      "leite condensado",
      "creme de leite",
      "gelatina"
    ],
    instructions: [
      "Bata tudo no liquidificador",
      "Adicione a gelatina hidratada",
      "Leve à geladeira"
    ],
    prepTime: 20,
    servings: 8
  },
  {
    name: "Bolo de Cenoura",
    description: "Bolo fofinho com cobertura de chocolate",
    type: "dessert",
    ingredients: [
      "cenoura",
      "óleo",
      "ovos",
      "açúcar",
      "farinha",
      "chocolate em pó",
      "leite"
    ],
    instructions: [
      "Bata cenoura, óleo e ovos",
      "Adicione os secos",
      "Asse e cubra com chocolate"
    ],
    prepTime: 50,
    servings: 12
  },
  {
    name: "Quindim",
    description: "Docinho de coco brilhante",
    type: "dessert",
    ingredients: ["gemas", "açúcar", "coco ralado", "manteiga"],
    instructions: [
      "Misture todos os ingredientes",
      "Asse em banho-maria",
      "Desenforme frio"
    ],
    prepTime: 60,
    servings: 20
  },
  {
    name: "Cocada",
    description: "Doce de coco tradicional",
    type: "dessert",
    ingredients: ["coco ralado", "açúcar", "água", "cravo", "canela"],
    instructions: [
      "Faça calda com açúcar e água",
      "Adicione coco e especiarias",
      "Cozinhe até soltar do fundo"
    ],
    prepTime: 30,
    servings: 20
  },
  {
    name: "Paçoca",
    description: "Doce de amendoim",
    type: "dessert",
    ingredients: ["amendoim torrado", "açúcar", "farinha de mandioca", "sal"],
    instructions: [
      "Triture o amendoim",
      "Misture com açúcar e farinha",
      "Prense em forminhas"
    ],
    prepTime: 15,
    servings: 20
  },
  {
    name: "Romeu e Julieta",
    description: "Combinação de queijo com goiabada",
    type: "dessert",
    ingredients: ["queijo minas", "goiabada"],
    instructions: ["Corte queijo e goiabada em fatias", "Sirva juntos"],
    prepTime: 5,
    servings: 4
  },
  {
    name: "Pavê de Chocolate",
    description: "Sobremesa em camadas",
    type: "dessert",
    ingredients: [
      "biscoito champanhe",
      "leite",
      "chocolate",
      "creme de leite",
      "leite condensado"
    ],
    instructions: [
      "Faça o creme de chocolate",
      "Monte camadas com biscoito molhado",
      "Leve à geladeira"
    ],
    prepTime: 30,
    servings: 12
  },
  {
    name: "Açaí na Tigela",
    description: "Sobremesa gelada amazônica",
    type: "dessert",
    ingredients: ["polpa de açaí", "banana", "granola", "mel", "morango"],
    instructions: ["Bata açaí com banana", "Sirva com granola e frutas"],
    prepTime: 10,
    servings: 2
  },
  {
    name: "Manjar de Coco",
    description: "Pudim branco de coco",
    type: "dessert",
    ingredients: [
      "leite de coco",
      "leite",
      "açúcar",
      "amido de milho",
      "calda de ameixa"
    ],
    instructions: [
      "Cozinhe até engrossar",
      "Coloque em forma untada",
      "Sirva com calda"
    ],
    prepTime: 30,
    servings: 10
  },
  {
    name: "Bolo de Fubá",
    description: "Bolo caipira cremoso",
    type: "dessert",
    ingredients: [
      "fubá",
      "farinha",
      "açúcar",
      "ovos",
      "leite",
      "queijo ralado",
      "erva-doce"
    ],
    instructions: [
      "Bata tudo no liquidificador",
      "Asse em forno médio por 40 minutos"
    ],
    prepTime: 50,
    servings: 12
  },
  {
    name: "Canjica",
    description: "Doce de milho branco cremoso",
    type: "dessert",
    ingredients: [
      "milho para canjica",
      "leite",
      "leite de coco",
      "açúcar",
      "canela",
      "cravo"
    ],
    instructions: [
      "Cozinhe o milho até ficar macio",
      "Adicione leite e temperos",
      "Sirva quente ou frio"
    ],
    prepTime: 120,
    servings: 10
  },
  {
    name: "Pé de Moleque",
    description: "Doce crocante de amendoim",
    type: "dessert",
    ingredients: ["amendoim", "açúcar", "água"],
    instructions: [
      "Faça rapadura com açúcar",
      "Misture amendoim",
      "Espalhe e corte em pedaços"
    ],
    prepTime: 20,
    servings: 20
  },
  {
    name: "Curau",
    description: "Creme de milho verde",
    type: "dessert",
    ingredients: ["milho verde", "leite", "açúcar", "canela", "leite de coco"],
    instructions: [
      "Bata o milho com leite",
      "Coe e cozinhe até engrossar",
      "Polvilhe canela"
    ],
    prepTime: 30,
    servings: 8
  },
  {
    name: "Bolo de Banana",
    description: "Bolo fofinho com bananas caramelizadas",
    type: "dessert",
    ingredients: [
      "banana",
      "açúcar",
      "canela",
      "farinha",
      "ovos",
      "óleo",
      "fermento"
    ],
    instructions: [
      "Caramelize bananas no fundo da forma",
      "Despeje a massa por cima",
      "Asse e desenforme"
    ],
    prepTime: 45,
    servings: 12
  },
  {
    name: "Rapadura",
    description: "Doce de cana sólido",
    type: "dessert",
    ingredients: ["açúcar mascavo", "água"],
    instructions: ["Cozinhe até ponto de bala dura", "Despeje em formas"],
    prepTime: 40,
    servings: 20
  },
  // SAUDÁVEIS
  {
    name: "Salada Caesar",
    description: "Salada clássica com frango grelhado",
    type: "healthy",
    ingredients: [
      "alface romana",
      "frango grelhado",
      "parmesão",
      "croutons",
      "molho caesar"
    ],
    instructions: [
      "Grelhe o frango",
      "Monte a salada",
      "Finalize com molho e queijo"
    ],
    prepTime: 20,
    servings: 2
  },
  {
    name: "Wrap de Frango",
    description: "Wrap saudável com vegetais",
    type: "healthy",
    ingredients: [
      "tortilla integral",
      "frango desfiado",
      "alface",
      "tomate",
      "cenoura",
      "iogurte"
    ],
    instructions: [
      "Espalhe iogurte na tortilla",
      "Adicione os ingredientes",
      "Enrole bem"
    ],
    prepTime: 15,
    servings: 2
  },
  {
    name: "Bowl de Quinoa",
    description: "Tigela nutritiva completa",
    type: "healthy",
    ingredients: [
      "quinoa",
      "abacate",
      "grão de bico",
      "tomate cereja",
      "pepino",
      "azeite",
      "limão"
    ],
    instructions: [
      "Cozinhe a quinoa",
      "Monte com os vegetais",
      "Tempere com azeite e limão"
    ],
    prepTime: 25,
    servings: 2
  },
  {
    name: "Sopa de Legumes",
    description: "Sopa leve e nutritiva",
    type: "healthy",
    ingredients: [
      "cenoura",
      "chuchu",
      "batata",
      "abobrinha",
      "cebola",
      "alho",
      "salsinha"
    ],
    instructions: [
      "Refogue cebola e alho",
      "Adicione legumes e água",
      "Cozinhe até macio"
    ],
    prepTime: 30,
    servings: 6
  },
  {
    name: "Omelete de Claras",
    description: "Café da manhã proteico",
    type: "healthy",
    ingredients: [
      "claras de ovo",
      "espinafre",
      "tomate",
      "queijo cottage",
      "sal",
      "pimenta"
    ],
    instructions: [
      "Bata as claras",
      "Adicione os vegetais",
      "Cozinhe dos dois lados"
    ],
    prepTime: 10,
    servings: 1
  },
  {
    name: "Salada de Grão de Bico",
    description: "Salada proteica vegetariana",
    type: "healthy",
    ingredients: [
      "grão de bico",
      "pepino",
      "tomate",
      "cebola roxa",
      "salsinha",
      "azeite",
      "limão"
    ],
    instructions: [
      "Misture todos os ingredientes",
      "Tempere com azeite e limão"
    ],
    prepTime: 15,
    servings: 4
  },
  {
    name: "Smoothie Verde",
    description: "Vitamina detox",
    type: "healthy",
    ingredients: ["espinafre", "banana", "maçã", "gengibre", "água de coco"],
    instructions: ["Bata tudo no liquidificador", "Sirva gelado"],
    prepTime: 5,
    servings: 2
  },
  {
    name: "Poke Bowl",
    description: "Tigela havaiana com peixe",
    type: "healthy",
    ingredients: [
      "salmão fresco",
      "arroz japonês",
      "pepino",
      "abacate",
      "edamame",
      "shoyu",
      "gergelim"
    ],
    instructions: [
      "Corte o salmão em cubos",
      "Monte sobre arroz",
      "Adicione vegetais e temperos"
    ],
    prepTime: 20,
    servings: 2
  },
  {
    name: "Legumes Grelhados",
    description: "Acompanhamento leve",
    type: "healthy",
    ingredients: [
      "abobrinha",
      "berinjela",
      "pimentão",
      "cebola",
      "azeite",
      "ervas"
    ],
    instructions: [
      "Corte os legumes",
      "Grelhe com azeite",
      "Tempere com ervas"
    ],
    prepTime: 20,
    servings: 4
  },
  {
    name: "Creme de Abóbora",
    description: "Sopa cremosa sem creme",
    type: "healthy",
    ingredients: [
      "abóbora",
      "cebola",
      "alho",
      "gengibre",
      "caldo de legumes",
      "noz-moscada"
    ],
    instructions: [
      "Cozinhe abóbora com temperos",
      "Bata até ficar cremoso",
      "Tempere a gosto"
    ],
    prepTime: 35,
    servings: 6
  },
  // MEAL PREP
  {
    name: "Marmita Fit de Frango",
    description: "Refeição completa para a semana",
    type: "meal-prep",
    ingredients: [
      "peito de frango",
      "arroz integral",
      "brócolis",
      "batata doce",
      "azeite"
    ],
    instructions: [
      "Grelhe o frango",
      "Cozinhe arroz e batata",
      "Monte em potinhos para a semana"
    ],
    prepTime: 60,
    servings: 5
  },
  {
    name: "Marmita de Carne com Legumes",
    description: "Preparação para semana toda",
    type: "meal-prep",
    ingredients: ["patinho moído", "arroz", "feijão", "cenoura", "vagem"],
    instructions: [
      "Prepare cada item separadamente",
      "Monte as marmitas",
      "Armazene na geladeira"
    ],
    prepTime: 90,
    servings: 5
  },
  {
    name: "Bowl Mexicano",
    description: "Marmita estilo tex-mex",
    type: "meal-prep",
    ingredients: [
      "arroz",
      "feijão preto",
      "frango desfiado",
      "milho",
      "pimentão",
      "guacamole"
    ],
    instructions: [
      "Prepare os ingredientes",
      "Monte em camadas",
      "Guarde separado o guacamole"
    ],
    prepTime: 60,
    servings: 5
  },
  {
    name: "Marmita Vegana",
    description: "Refeição plant-based completa",
    type: "meal-prep",
    ingredients: [
      "quinoa",
      "grão de bico",
      "espinafre",
      "tomate seco",
      "abobrinha",
      "tahine"
    ],
    instructions: [
      "Cozinhe quinoa e grão de bico",
      "Refogue os vegetais",
      "Monte com molho tahine"
    ],
    prepTime: 50,
    servings: 5
  },
  {
    name: "Marmita Asiática",
    description: "Preparação oriental para semana",
    type: "meal-prep",
    ingredients: [
      "macarrão de arroz",
      "frango teriyaki",
      "brócolis",
      "cenoura",
      "gergelim"
    ],
    instructions: [
      "Prepare o frango teriyaki",
      "Cozinhe o macarrão",
      "Monte com vegetais"
    ],
    prepTime: 45,
    servings: 5
  },
  {
    name: "Overnight Oats",
    description: "Café da manhã para a semana",
    type: "meal-prep",
    ingredients: ["aveia", "leite", "iogurte", "chia", "frutas", "mel"],
    instructions: [
      "Misture aveia com líquidos",
      "Deixe na geladeira overnight",
      "Adicione frutas antes de servir"
    ],
    prepTime: 10,
    servings: 5
  },
  {
    name: "Marmita de Peixe",
    description: "Refeição leve para a semana",
    type: "meal-prep",
    ingredients: [
      "tilápia",
      "arroz integral",
      "legumes variados",
      "limão",
      "ervas"
    ],
    instructions: [
      "Asse o peixe com limão e ervas",
      "Prepare arroz e legumes",
      "Monte as porções"
    ],
    prepTime: 45,
    servings: 5
  },
  {
    name: "Wraps Congelados",
    description: "Lanches prontos para esquentar",
    type: "meal-prep",
    ingredients: [
      "tortilla",
      "frango",
      "queijo",
      "pimentão",
      "cebola",
      "temperos mexicanos"
    ],
    instructions: [
      "Refogue o recheio",
      "Monte os wraps",
      "Congele embrulhados"
    ],
    prepTime: 40,
    servings: 10
  }
];

// Função para encontrar receitas por ingredientes
export function findRecipesByIngredients(
  availableIngredients: string[],
  expiringItems: string[] = []
): (Omit<Recipe, "id"> & { matchScore: number })[] {
  const normalizedIngredients = availableIngredients.map((i) =>
    i
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  );
  const normalizedExpiring = expiringItems.map((i) =>
    i
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  );

  return brazilianRecipes
    .map((recipe) => {
      const recipeIngredients = recipe.ingredients.map((i) =>
        i
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      );

      let matchCount = 0;
      let expiringMatch = 0;

      recipeIngredients.forEach((ing) => {
        if (
          normalizedIngredients.some(
            (available) => available.includes(ing) || ing.includes(available)
          )
        ) {
          matchCount++;
        }
        if (
          normalizedExpiring.some(
            (exp) => exp.includes(ing) || ing.includes(exp)
          )
        ) {
          expiringMatch++;
        }
      });

      const matchScore =
        (matchCount / recipeIngredients.length) * 100 + expiringMatch * 20;

      return {
        ...recipe,
        id: crypto.randomUUID(),
        usesExpiringItems: expiringMatch > 0,
        matchScore
      };
    })
    .filter((recipe) => recipe.matchScore > 30)
    .sort((a, b) => b.matchScore - a.matchScore);
}

// Banco de dados de vencimento inteligente por categoria
export const smartExpirationDays: Record<
  string,
  {
    name: string;
    fridge: number;
    freezer: number;
    pantry: number;
    opened?: number;
    cooked?: number;
  }
> = {
  // Carnes
  frango: { name: "Frango", fridge: 2, freezer: 180, pantry: 0, cooked: 3 },
  carne: { name: "Carne", fridge: 3, freezer: 180, pantry: 0, cooked: 3 },
  "carne moida": {
    name: "Carne Moída",
    fridge: 1,
    freezer: 120,
    pantry: 0,
    cooked: 2
  },
  peixe: { name: "Peixe", fridge: 1, freezer: 90, pantry: 0, cooked: 2 },
  linguica: { name: "Linguiça", fridge: 5, freezer: 60, pantry: 0 },
  bacon: { name: "Bacon", fridge: 7, freezer: 30, pantry: 0, opened: 5 },
  presunto: { name: "Presunto", fridge: 5, freezer: 60, pantry: 0, opened: 3 },

  // Laticínios
  leite: { name: "Leite", fridge: 7, freezer: 30, pantry: 0, opened: 3 },
  queijo: { name: "Queijo", fridge: 14, freezer: 60, pantry: 0, opened: 7 },
  iogurte: { name: "Iogurte", fridge: 14, freezer: 0, pantry: 0, opened: 3 },
  manteiga: {
    name: "Manteiga",
    fridge: 60,
    freezer: 120,
    pantry: 0,
    opened: 30
  },
  requeijao: {
    name: "Requeijão",
    fridge: 30,
    freezer: 0,
    pantry: 0,
    opened: 7
  },
  "creme de leite": {
    name: "Creme de Leite",
    fridge: 14,
    freezer: 0,
    pantry: 180,
    opened: 3
  },
  ovo: { name: "Ovo", fridge: 30, freezer: 0, pantry: 0, cooked: 7 },

  // Frutas
  maca: { name: "Maçã", fridge: 30, freezer: 240, pantry: 7 },
  banana: { name: "Banana", fridge: 7, freezer: 60, pantry: 5 },
  laranja: { name: "Laranja", fridge: 21, freezer: 120, pantry: 7 },
  limao: { name: "Limão", fridge: 30, freezer: 120, pantry: 7 },
  morango: { name: "Morango", fridge: 5, freezer: 180, pantry: 0 },
  uva: { name: "Uva", fridge: 7, freezer: 180, pantry: 0 },
  melancia: { name: "Melancia", fridge: 5, freezer: 180, pantry: 7 },
  manga: { name: "Manga", fridge: 7, freezer: 180, pantry: 5 },
  abacaxi: { name: "Abacaxi", fridge: 5, freezer: 180, pantry: 3 },
  mamao: { name: "Mamão", fridge: 5, freezer: 180, pantry: 3 },
  abacate: { name: "Abacate", fridge: 4, freezer: 120, pantry: 3 },

  // Legumes e Verduras
  couve: { name: "Couve", fridge: 7, freezer: 60, pantry: 0 },
  brocolis: { name: "Brócolis", fridge: 5, freezer: 180, pantry: 0 },
  abobrinha: { name: "Abobrinha", fridge: 7, freezer: 180, pantry: 0 },
  berinjela: { name: "Berinjela", fridge: 7, freezer: 180, pantry: 3 },
  pimentao: { name: "Pimentão", fridge: 7, freezer: 180, pantry: 3 },
  pepino: { name: "Pepino", fridge: 7, freezer: 0, pantry: 0 },
  espinafre: { name: "Espinafre", fridge: 5, freezer: 180, pantry: 0 },

  // Comidas Prontas
  "arroz cozido": { name: "Arroz Cozido", fridge: 4, freezer: 90, pantry: 0 },
  "feijao cozido": { name: "Feijão Cozido", fridge: 4, freezer: 90, pantry: 0 },
  "macarrao cozido": {
    name: "Macarrão Cozido",
    fridge: 3,
    freezer: 60,
    pantry: 0
  },
  marmita: { name: "Marmita", fridge: 3, freezer: 30, pantry: 0 },
  sopa: { name: "Sopa", fridge: 4, freezer: 90, pantry: 0 },
  strogonoff: { name: "Strogonoff", fridge: 3, freezer: 30, pantry: 0 },
  lasanha: { name: "Lasanha", fridge: 3, freezer: 60, pantry: 0 },

  // Dispensa
  arroz: { name: "Arroz", fridge: 365, freezer: 365, pantry: 365 },
  feijao: { name: "Feijão", fridge: 365, freezer: 365, pantry: 365 },
  macarrao: { name: "Macarrão", fridge: 365, freezer: 365, pantry: 365 },
  farinha: { name: "Farinha", fridge: 365, freezer: 365, pantry: 180 },
  acucar: { name: "Açúcar", fridge: 730, freezer: 730, pantry: 730 },
  sal: { name: "Sal", fridge: 1825, freezer: 1825, pantry: 1825 },
  oleo: { name: "Óleo", fridge: 365, freezer: 365, pantry: 365, opened: 90 },
  azeite: { name: "Azeite", fridge: 365, freezer: 0, pantry: 365, opened: 180 },

  // Bebidas
  suco: { name: "Suco", fridge: 7, freezer: 180, pantry: 365, opened: 3 },
  refrigerante: {
    name: "Refrigerante",
    fridge: 90,
    freezer: 0,
    pantry: 180,
    opened: 3
  },
  cerveja: { name: "Cerveja", fridge: 180, freezer: 0, pantry: 180 },
  cafe: { name: "Café", fridge: 30, freezer: 180, pantry: 180, opened: 14 },

  // Higiene e Limpeza
  "papel higienico": {
    name: "Papel Higiênico",
    fridge: 0,
    freezer: 0,
    pantry: 1825
  },
  sabonete: { name: "Sabonete", fridge: 0, freezer: 0, pantry: 1095 },
  detergente: { name: "Detergente", fridge: 0, freezer: 0, pantry: 730 },
  desinfetante: { name: "Desinfetante", fridge: 0, freezer: 0, pantry: 730 },
  "sabao em po": { name: "Sabão em Pó", fridge: 0, freezer: 0, pantry: 730 },
  amaciante: { name: "Amaciante", fridge: 0, freezer: 0, pantry: 730 },
  shampoo: {
    name: "Shampoo",
    fridge: 0,
    freezer: 0,
    pantry: 1095,
    opened: 365
  },
  "creme dental": { name: "Creme Dental", fridge: 0, freezer: 0, pantry: 730 }
};

export const foodCategories: Record<string, string> = {
  maca: "fruit",
  banana: "fruit",
  uva: "fruit",
  laranja: "fruit",
  limao: "fruit",
  tomate: "vegetable",
  alface: "vegetable",
  cebola: "vegetable",
  alho: "vegetable",
  cenoura: "vegetable",
  batata: "vegetable",
  brocolis: "vegetable",
  couve: "vegetable",
  leite: "dairy",
  queijo: "dairy",
  iogurte: "dairy",
  manteiga: "dairy",
  requeijao: "dairy",
  carne: "meat",
  frango: "meat",
  peixe: "meat",
  presunto: "meat",
  ovos: "dairy",
  arroz: "pantry",
  feijao: "pantry",
  macarrao: "pantry",
  farinha: "pantry",
  acucar: "pantry",
  cafe: "pantry",
  suco: "beverage",
  cerveja: "beverage",
  refrigerante: "beverage",
  agua: "beverage",
  detergente: "cleaning",
  sabonete: "hygiene",
  shampoo: "hygiene"
};

export const getFoodMetadata = (name: string) => {
  const normalized = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const expiration = Object.entries(smartExpirationDays).find(([key]) =>
    normalized.includes(key)
  );
  const consumption = Object.entries(dailyConsumptionDefaults).find(([key]) =>
    normalized.includes(key)
  );
  const category = Object.entries(foodCategories).find(([key]) =>
    normalized.includes(key)
  );

  return {
    expiration: expiration?.[1],
    unit: consumption?.[1].unit || "un",
    category: category?.[1] || "pantry",
    dailyConsumption: consumption?.[1].perPerson
  };
};

// Função para obter vencimento inteligente
export function getSmartExpiration(
  itemName: string,
  location: "fridge" | "freezer" | "pantry" | "cleaning",
  isCooked: boolean = false,
  isOpened: boolean = false
): number {
  const normalizedName = itemName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Procura correspondência no banco de dados
  const match = Object.entries(smartExpirationDays).find(
    ([key]) => normalizedName.includes(key) || key.includes(normalizedName)
  );

  if (match) {
    const [, data] = match;

    if (isCooked && data.cooked) {
      return data.cooked;
    }

    if (isOpened && data.opened) {
      return data.opened;
    }

    switch (location) {
      case "fridge":
        return data.fridge;
      case "freezer":
        return data.freezer;
      case "pantry":
      case "cleaning":
        return data.pantry;
      default:
        return data.fridge;
    }
  }

  // Valores padrão por localização
  switch (location) {
    case "fridge":
      return 7;
    case "freezer":
      return 90;
    case "pantry":
      return 180;
    case "cleaning":
      return 365;
    default:
      return 7;
  }
}

// Sugestão de consumo diário por item
export const dailyConsumptionDefaults: Record<
  string,
  { perPerson: number; unit: string }
> = {
  "papel higienico": { perPerson: 0.5, unit: "rolos" },
  leite: { perPerson: 0.2, unit: "litros" },
  pao: { perPerson: 1, unit: "un" },
  arroz: { perPerson: 0.1, unit: "kg" },
  feijao: { perPerson: 0.08, unit: "kg" },
  ovo: { perPerson: 1, unit: "un" },
  manteiga: { perPerson: 0.01, unit: "kg" },
  carne: { perPerson: 0.15, unit: "kg" },
  frango: { perPerson: 0.15, unit: "kg" },
  cafe: { perPerson: 0.02, unit: "kg" },
  acucar: { perPerson: 0.02, unit: "kg" },
  oleo: { perPerson: 0.01, unit: "litros" },
  sabonete: { perPerson: 0.1, unit: "unidades" },
  detergente: { perPerson: 0.05, unit: "unidades" },
  shampoo: { perPerson: 0.01, unit: "unidades" },
  "creme dental": { perPerson: 0.02, unit: "unidades" }
};
