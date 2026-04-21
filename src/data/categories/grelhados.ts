import { Recipe } from "@/types/kaza";

export const receitasGrelhados: Omit<Recipe, "id" | "usesExpiringItems">[] = [
  {
    name: "Picanha na Brasa Perfeita 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description:
      "A rainha dos churrascos brasileiros — técnica, temperatura e descanso corretos",
    category: "Grelhados",
    type: "lunch",
    difficulty: "médio",
    prepTime: 10,
    cookTime: 25,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 peça de picanha de ~1,2 kg",
      "sal grosso",
      "pimenta-do-reino moída na hora",
      "carvão de qualidade"
    ],
    instructions: [
      "A picanha perfeita começa na escolha: ponta da picanha, gordura UNIFORME, até 1,2 kg (maior = músculo diferente).",
      "Modele a gordura com faca, mas mantenha toda ela — é onde está o sabor.",
      "Tempero apenas com sal grosso antes de grelhar — nada mais. O sal excessivo antes por mais de 20 min puxa umidade.",
      "Brasa bem formada: carvão deve estar cinzento, brasa bem vermelha. Mão a 10 cm = 2–3 seg de tolerância = temperatura ideal.",
      "Grelhe a picanha inteira com a gordura PARA BAIXO por 5 min. A gordura vai derreter e caramelizar.",
      "Vire e grelhe pelo lado da carne por 5–7 min para mal passado (52–55 °C) ou 10 min para ao ponto (60 °C).",
      "DESCANSO OBRIGATÓRIO: Retire e deixe descansar por 10 min emborcada com a gordura para cima — os sucos redistribuirão.",
      "Corte EM FATIAS FINAS contra a fibra. Jamais fatie antes de descansar."
    ],
    tips: [
      "Picanha bem temperada só com sal grosso — outros temperos mascaram o sabor nobre.",
      "Descanso é inegociável — corte antes = perde todo o suco.",
      "A gordura vai para baixo primeiro pois regula a temperatura e cria sabor."
    ]
  },
  {
    name: "Costela de Porco Grelhada com BBQ 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Porco baby back ribs com marinada seca e molho barbecue caseiro",
    category: "Grelhados",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 180,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 rack de costela baby back (~1,5 kg)",
      "DRY RUB: páprica, alho em pó, cebola em pó, açúcar mascavo, cominho, pimenta cayenne, sal",
      "MOLHO BBQ: ketchup, açúcar mascavo, molho inglês, vinagre, fumaça líquida, alho, mostarda"
    ],
    instructions: [
      "Retire a membrana da parte interna da costela: levante com faca, puxe com papel toalha. Remove para melhor absorção.",
      "Misture todos os ingredientes do dry rub. Aplique generosamente pelos dois lados pressionando para aderir.",
      "Envolva em papel alumínio e deixe marinar mínimo 4 h, ideal 24 h na geladeira.",
      "MOLHO BBQ: Refogue alho, adicione ketchup, açúcar, molho inglês, vinagre e fumaça líquida. Cozinhe 20 min.",
      "PRÉ-COZIMENTO: Asse embrulhada a 150 °C por 2,5 h. Isso amacia sem ressecar.",
      "Desembale, aplique molho BBQ generosamente por todos os lados.",
      "Grelhe em brasa ou grill a alta temperatura por 5–8 min de cada lado para caramelização.",
      "Aplique mais molho durante a grelha. Descanse 10 min. Sirva com a carne se desprendendo do osso."
    ],
    tips: [
      "Técnica low-and-slow (baixa temp + longo tempo) é o segredo da costela macia.",
      "Fumaça líquida cria sabor defumado sem defumador.",
      "Retirar a membrana é etapa crítica."
    ]
  },
  {
    name: "Legumes Grelhados ao Azeite e Ervas 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Mix de legumes coloridos grelhados na chapa com temperos mediterrâneos",
    category: "Grelhados",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "2 abobrinhas, 2 pimentões coloridos",
      "1 berinjela, 1 cebola roxa",
      "cogumelos portobelo",
      "TEMPERO: azeite, alho, tomilho, alecrim, raspas de limão",
      "parmesão para servir"
    ],
    instructions: [
      "Corte todos os legumes de forma que tenham espessura similar (0,8 cm). Espessura uniforme = cozimento uniforme.",
      "Misture azeite, alho amassado, tomilho, alecrim e raspas de limão.",
      "Marine os legumes por 20 min.",
      "Aqueça grill ou frigideira de ferro em fogo alto por 3 min até bem quente.",
      "Grelhe os legumes em lotes — não lotar. Cada lado por 3–4 min. Não mova — deixe as marcas de grelha se formarem.",
      "Cogumelo portobelo com a guelra para cima recebe azeite extra na cavidade.",
      "Disponha em travessa, regue com mais azeite e raspas de limão.",
      "Finalize com parmesão ralado grosso e ervas frescas."
    ],
    tips: [
      "Grill ou chapa muito quente = marcas bonitas e caramelização.",
      "Não mova os legumes — o contato contínuo cria as marcas e acumula calor.",
      "Marinada curta de 20 min é suficiente para legumes."
    ]
  },
  {
    name: "Frango Grelhado Mariposa ao Limão 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Técnica spatchcock — frango aberto grelhado uniformemente com manteiga de ervas",
    category: "Grelhados",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 40,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 frango inteiro ~1,5 kg",
      "MANTEIGA DE ERVAS: 100 g manteiga + alho + tomilho + alecrim + rallado de limão",
      "sal grosso, pimenta"
    ],
    instructions: [
      "SPATCHCOCK: Coloque o frango com o peito para baixo. Com tesoura de cozinha, corte a espinha (os dois lados). Remova a espinha.",
      "Abra o frango como livro e pressione firmemente o peito para achatar. Você ouvirá um estalo.",
      "Prepare a manteiga de ervas misturando tudo.",
      "Separe a pele do peito com os dedos. Esfregue manteiga de ervas diretamente na carne.",
      "Tempere o exterior com sal grosso e pimenta. Deixe marinar 30 min.",
      "Grelhe com o peito para baixo em grill médio-alto por 15–20 min. A gordura do costas vai para baixo.",
      "Vire e grelhe mais 15–20 min com tampa fechada ou embrulhado parcialmente.",
      "Temperatura interna: 74 °C. Descanse 10 min antes de servir."
    ],
    tips: [
      "Spatchcock reduz o tempo de grelha à metade e cria cozimento mais uniforme.",
      "Manteiga sob a pele protege o peito — nunca fica seco.",
      "Espinha removida pode virar caldo."
    ]
  },
  {
    name: "Contrafilé com Manteiga de Ervas Aromáticas 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Bife alto de contrafilé com crosta dourada e manteiga de alho e ervas dissolvendo por cima",
    category: "Grelhados",
    type: "lunch",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 12,
    servings: 2,
    ingredients: [
      "2 bifes de contrafilé (~300 g cada, 2,5 cm de espessura)",
      "MANTEIGA DE ERVAS: 80 g manteiga sem sal + 4 dentes alho + tomilho + alecrim + salsinha",
      "sal grosso e pimenta-do-reino moída na hora",
      "azeite para selar"
    ],
    instructions: [
      "Retire a carne da geladeira 45 minutos antes de grelhar — carne em temperatura ambiente sela muito mais uniformemente do que carne fria, que perde calor e cozinha desigualmente.",
      "Prepare a manteiga composta: amoleça a manteiga em temperatura ambiente, misture o alho amassado, tomilho, alecrim e salsinha picados, enrole em papel filme em formato de rolo e leve ao freezer por 20 minutos.",
      "Seque os bifes com papel toalha — umidade superficial gera vapor e impede a formação de crosta. Tempere com sal grosso dos dois lados, pressionando suavemente para aderir.",
      "Aqueça frigideira de ferro fundido em fogo alto por 4 a 5 minutos até ver uma tênue fumaça — esse é o sinal de temperatura ideal para selar. Adicione apenas um fio de azeite.",
      "Coloque os bifes sem mover por 3 minutos — o chiado alto é normal. Não pressione a carne. Adicione pimenta-do-reino apenas agora para ela não queimar durante o aquecimento.",
      "Vire uma única vez e sele por mais 2 a 3 minutos para malpassado. Se houver gordura lateral, segure o bife de pé com pinças por 1 minuto para derreter e crocantear.",
      "Transfira para uma grade aquecida. Imediatamente coloque um disco de manteiga composta gelada sobre cada bife — ela derreterá lentamente, criando um molho aromático.",
      "Descanse 5 minutos antes de servir — esse tempo permite que os sucos redistribuam. Cortar antes faz perder até 40% dos líquidos internos acumulados durante o cozimento."
    ],
    tips: [
      "Frigideira de ferro fundido retém calor uniforme e é insubstituível para um sear perfeito.",
      "Temperatura interna: 52 °C malpassado, 57 °C ao ponto, 63 °C bem passado. Use termômetro.",
      "Carne seca antes de selar = crosta dourada. Carne úmida = vapor = sem crosta."
    ]
  },
  {
    name: "Fraldinha com Chimichurri Verde 📋", emoji: "🥩", region: "LATAM", estimatedCost: "low", 
    description: "Corte suculento grelhado no ponto certo com molho argentino de ervas frescas",
    category: "Grelhados",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    ingredients: [
      "1,2 kg de fraldinha inteira",
      "CHIMICHURRI: 1 maço salsinha + 6 ramos orégano + 4 dentes alho + 1 pimenta vermelha + 100 ml azeite + 40 ml vinagre de vinho tinto + sal",
      "sal grosso e pimenta-do-reino"
    ],
    instructions: [
      "Prepare o chimichurri com pelo menos 2 horas de antecedência: pique finamente a salsinha, orégano, alho e pimenta. Misture com azeite e vinagre, tempere com sal e deixe descansar para os sabores se integrarem.",
      "Encontre a direção das fibras da fraldinha — elas correm diagonalmente. Lembrar isso é crucial para o corte final ficar macio.",
      "Tempere a fraldinha com sal grosso generoso dos dois lados e deixe 30 minutos em temperatura ambiente. O sal começa a amaciar a superfície e se dissolve uniformemente.",
      "Prepare brasa bem formada ou aqueça a grelha a temperatura alta — grelha limpa e quente evita que a carne grude e cria as marcas características.",
      "Grelhe a fraldinha inteira por 5 a 7 minutos cada lado para malpassado, mantendo a tampa fechada se possível para criar um efeito de convecção e acelerar o cozimento.",
      "Use um termômetro de carne: 55 °C é o ponto ideal para fraldinha — malpassada para ao ponto — que preserva a suculência e os sucos internos.",
      "Retire e cubra frouxamente com papel alumínio. Descanse obrigatoriamente 10 minutos — é o tempo mínimo para os sucos se redistribuirem após o choque térmico da grelha.",
      "Corte CONTRA as fibras em fatias de 0,5 cm — fatias no sentido das fibras ficarão duras. Sirva imediatamente com chimichurri regado generosamente."
    ],
    tips: [
      "Fraldinha é o corte mais saboroso para grelha — gordura entre as fibras derrete durante o cozimento.",
      "Chimichurri feito no dia anterior fica muito mais saboroso pela maturação dos sabores.",
      "Jamais fatie antes do descanso — perde todo o suco que faz a diferença."
    ]
  },
  {
    name: "T-bone Estilo Argentino 📋", emoji: "🥩", region: "LATAM", estimatedCost: "low", 
    description: "O corte com contrafilé e filé mignon separados pelo osso, grelhado ao ponto perfeito",
    category: "Grelhados",
    type: "lunch",
    difficulty: "difícil",
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    ingredients: [
      "1 T-bone de 600–800 g (4 cm de espessura)",
      "sal grosso, pimenta-do-reino",
      "manteiga, tomilho e alho para aromatizar",
      "azeite extravirgem"
    ],
    instructions: [
      "Retire o T-bone da geladeira 1 hora antes — a espessura de 4 cm exige temperatura interna elevada antes de entrar na brasa para cozinhar sem queimar a superfície.",
      "Tempere com sal grosso abundante dos dois lados e nas bordas. Não use pimenta ainda — queima em alta temperatura.",
      "Prepare brasa em duas zonas diferentes: uma zona de calor intenso (brasa vermelha, grelha a 5 cm) e uma zona de calor médio para terminar o cozimento.",
      "Inicie na zona quente: 3 minutos de cada lado para criar a crosta — não mova. Os pingos de gordura no carvão criam fumaça que adiciona sabor.",
      "Mova para a zona de calor médio. Continue por 4 a 5 minutos por lado para malpassado (52 °C no lado do contrafilé — o filé cozinha mais rápido).",
      "Adicione pimenta-do-reino agora. Aromatize colocando um ramo de tomilho e alho amassado sobre a carne e borrife com azeite — o vapor das ervas penetra na carne.",
      "Temperatura interna no contrafilé: 55–57 °C. O filé estará um ponto acima automaticamente — é a característica do T-bone.",
      "Descanse 8 minutos obrigatórios antes de fatiar. Sirva com o osso para impressionar — ele adiciona sabor durante o descanso."
    ],
    tips: [
      "O osso no centro faz o contrafilé e o filé cozinharem em tempos ligeiramente diferentes — característico do corte.",
      "Duas zonas de calor são essenciais para o T-bone — primeiro crosta, depois cozimento interior.",
      "Temperatura alta de início cria crosta. Temperatura média termina sem queimar."
    ]
  },
  {
    name: "Maminha Grelhada com Alho Confit 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Corte macio e saboroso com alho lentamente confitado em azeite",
    category: "Grelhados",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 20,
    servings: 4,
    ingredients: [
      "1,2 kg de maminha",
      "ALHO CONFIT: 2 cabeças de alho + 200 ml azeite + tomilho",
      "sal grosso, pimenta-do-reino",
      "salsinha para finalizar"
    ],
    instructions: [
      "Prepare o alho confit com antecedência: separe os dentes com casca, coloque numa pequena panela com azeite e tomilho. Cozinhe em fogo mínimo por 40 minutos até os dentes ficarem macios e dourados suavemente.",
      "Esprema os dentes confitados para fora das cascas — viram uma pasta macia e adocicada com sabor muito mais suave que alho cru. Reserve o azeite aromatizado.",
      "Retire a maminha da geladeira 30 minutos antes. Seque bem com papel toalha. Tempere com sal grosso dos dois lados.",
      "Aqueça a grelha ou frigideira de ferro em fogo alto. Grelhe a maminha inteira por 6 a 8 minutos por lado, criando crosta dourada uniforme.",
      "Temperatura interna ideal para maminha: 60 °C (ao ponto). Maminha bem passada perde a maciez e oleosidade naturais do corte.",
      "Retire da grelha. Pincele imediatamente com o azeite aromatizado do confit enquanto a carne ainda está quente — o calor abre os poros e o azeite penetra.",
      "Descanse 8 minutos coberto frouxamente com papel alumínio para os sucos se redistribuírem uniformemente.",
      "Fatia contra as fibras em tiras de 1 cm. Sirva com a pasta de alho confit espalhada por cima e salsinha fresca picada."
    ],
    tips: [
      "Alho confit transforma o sabor pungente em doce e suave — ideal para quem não gosta de alho cru.",
      "Maminha é um corte naturalmente macio — não cozinhe demais ou perde essa qualidade.",
      "O azeite do confit dura 2 semanas na geladeira — use em outros pratos."
    ]
  },
  {
    name: "Carne de Sol Grelhada com Nata da Terra 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Clássico nordestino com carne salgada e curada grelhada com nata fresca",
    category: "Grelhados",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 720,
    cookTime: 15,
    servings: 4,
    ingredients: [
      "800 g de carne de sol (dessalgada)",
      "nata da terra (creme de leite fresco espesso)",
      "manteiga de garrafa",
      "alho, pimenta"
    ],
    instructions: [
      "Dessalgue a carne de sol: deixe submersa em água na geladeira por 12 horas, trocando a água 3 vezes. A carne ainda terá sal suficiente para tempero — não se preocupe em dessalgar completamente.",
      "Seque a carne com papel toalha. Leve à geladeira descoberta por 2 horas para ressecar a superfície — isso cria uma crosta melhor durante a grelha.",
      "Aqueça a brasa ou chapa bem quente — a carne de sol exige temperatura alta para selar rápido sem ressecar o interior.",
      "Grelhe a carne inteira por 5 a 7 minutos cada lado até a superfície ficar bem dourada com pontos levemente carbonizados — esses pontos são o sabor característico.",
      "Retire da grelha. Cubra a superfície com manteiga de garrafa imediatamente enquanto a carne está quente.",
      "Fatie em tiras de 1,5 cm contra as fibras. Disponha numa chapa ainda quente.",
      "Despeje a nata da terra (não ferva, apenas aqueça levemente) sobre as fatias. O contraste do frio da nata com a carne quente é o segredo do prato.",
      "Sirva imediatamente com arroz, feijão verde e tapioca — a nata não pode ser aquecida demais pois talharia."
    ],
    tips: [
      "Dessalgar em água fria na geladeira é mais seguro e uniforme que em temperatura ambiente.",
      "Nata da terra é produto nordestino específico — fora do Nordeste substitua por creme de leite fresco bem espesso.",
      "Manteiga de garrafa é a gordura amarela líquida nordestina — essencial neste prato."
    ]
  },
  {
    name: "Linguiça Artesanal na Brasa 📋", emoji: "🥩", region: "US", estimatedCost: "low", 
    description: "Linguiça fresca defumada artesanalmente com especiarias e ervas",
    category: "Grelhados",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 25,
    servings: 6,
    ingredients: [
      "1,5 kg linguiça artesanal fresca (toscana ou calabresa fresca)",
      "azeite",
      "pimentas variadas para acompanhar",
      "pão francês para servir"
    ],
    instructions: [
      "Deixe a linguiça em temperatura ambiente por 20 minutos antes de grelhar — linguiça fria estoura mais facilmente na grelha quente por causa da diferença de temperatura entre o exterior e o recheio.",
      "Faça furos superficiais com palito em toda a extensão de cada linguiça — 6 a 8 furos por peça. Isso controla a pressão interna e evita que estourem, sem perder os sucos.",
      "Não corte a linguiça em pedaços antes — a peça inteira retém suculência melhor durante a grelha.",
      "Disponha a linguiça sobre grelha a calor médio-alto — fogo alto queima a pele antes de cozinhar o interior. Distância de 15 cm do carvão é ideal.",
      "Grelhe por 10 a 12 minutos virando a cada 3 minutos para dourar uniformemente todos os lados. A gordura que escorre alimenta o carvão criando chamas — afaste brevemente se as chamas subirem.",
      "A linguiça está pronta quando muda de cor rosada para dourada acastanhada e o suco que escoa pelos furos estiver claro (não rosado) — isso indica que o recheio de carne está cozido.",
      "Retire da grelha. Deixe descansar 3 minutos antes de cortar — o descanso evita que todo o suco escorra na hora do corte.",
      "Sirva em pedaços ou inteira com pimentas assadas, pão e molho vinagrete feito na hora."
    ],
    tips: [
      "Linguiça artesanal tem mais gordura que industrial — isso é bom, cria mais sabor na grelha.",
      "Furos controlados previnem estouro sem perder suculência — não exagere na quantidade.",
      "Fogo médio é melhor — queimar a casca antes de cozinhar o interior é erro comum."
    ]
  },
  {
    name: "Costeleta de Porco com Maçã Caramelizada 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Costeleta grelhada com o clássico acompanhamento agridoce de maçã",
    category: "Grelhados",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 20,
    servings: 4,
    ingredients: [
      "4 costeletas de porco com osso (~250 g cada, 2 cm de espessura)",
      "MAÇÃ CARAMELIZADA: 3 maçãs + 50 g manteiga + 50 g açúcar mascavo + canela + calvados ou suco de maçã",
      "mostarda de Dijon, mel, alho",
      "sal e pimenta-do-reino"
    ],
    instructions: [
      "Prepare a marinada: misture mostarda, mel, alho amassado, sal e pimenta. Besunte as costeletas e deixe marinar 30 minutos — a mostarda amacia a carne e cria crosta aromática.",
      "Prepare a maçã caramelizada: descasque e corte em fatias de 1 cm. Na frigideira, derreta manteiga com açúcar mascavo até borbulhar. Adicione as maçãs e cozinhe 5 minutos cada lado até dourar e amaciar. Adicione canela e calvados.",
      "Retire as costeletas da marinada e seque levemente com papel toalha — excesso de marinada queima antes de caramelizar.",
      "Aqueça grelha ou frigideira de ferro a temperatura alta. Grelhe as costeletas por 4 minutos sem mover — a crosta da mostarda carameliza lindamente.",
      "Vire uma única vez. Grelhe por mais 3 a 4 minutos. Temperatura interna: 63 °C para porco — bem passado mas ainda suculento.",
      "Se as costeletas forem espessas, cubra ou leve ao forno a 180 °C por 5 minutos após selar para terminar o cozimento interno sem queimar exterior.",
      "Descanse 5 minutos num prato aquecido — o calor residual termina o cozimento e os sucos se redistribuem.",
      "Sirva a costeleta com a maçã caramelizada por cima — o dulçor equilibra a carne de porco."
    ],
    tips: [
      "Porco não precisa mais ser servido bem passado — 63 °C interno é seguro e suculento.",
      "Costeleta com osso sempre fica mais saborosa que desossada.",
      "Calvados é conhaque de maçã normanda — substitua por suco de maçã concentrado."
    ]
  },
  {
    name: "Lombo de Porco Marinado com Ervas 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Lombo inteiro grelhado lentamente com marinada de alho e ervas mediterrâneas",
    category: "Grelhados",
    type: "lunch",
    difficulty: "médio",
    prepTime: 480,
    cookTime: 30,
    servings: 6,
    ingredients: [
      "1,5 kg de lombo de porco inteiro",
      "MARINADA: azeite + alho + alecrim + sálvia + limão + mostarda + sal + pimenta",
      "vinho branco seco para regar"
    ],
    instructions: [
      "Prepare a marinada misturando o azeite, alho amassado, alecrim e sálvia picados, raspas de limão, mostarda, sal e pimenta. A acidez do limão e a mostarda começam a amaciar as proteínas superficiais.",
      "Faça furos profundos no lombo com faca fina e insira pedaços de alho e raminhos de alecrim dentro — tempero que vai para dentro da carne, não só na superfície.",
      "Besunte o lombo inteiro com a marinada, envolva em filme plástico e refrigere por mínimo 8 horas, idealmente 24 horas.",
      "Retire da geladeira 45 minutos antes. A carne deve estar próxima da temperatura ambiente para cozinhar uniformemente.",
      "Prepare grelha com duas zonas: zona quente para selar e zona média para terminar. Sele o lombo inteiro por 2 minutos em cada face (são 4 faces) em fogo alto.",
      "Mova para a zona de calor médio. Cubra e cozinhe por 20 a 25 minutos total, virando a cada 5 minutos e regando com vinho branco.",
      "Temperatura interna: 68 °C para porco seguro e suculento. Acima de 75 °C o lombo resseca.",
      "Cubra com papel alumínio e descanse 15 minutos — a carne continuará cozinhando mais 2 a 3 °C. Fatie em medalhões de 1,5 cm e sirva com o suco da bandeja."
    ],
    tips: [
      "Furos e raminhos inseridos dentro da carne criam sabor do interior para fora.",
      "Lombo é magro — não ultrapasse 70 °C interno para não ressecar.",
      "Tempere na véspera para sabor mais profundo — marinada de 24h faz diferença enorme."
    ]
  },
  {
    name: "Carré de Cordeiro com Ervas Provençais 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Rack de cordeiro com crosta de ervas aromáticas, ponto rosado perfeito",
    category: "Grelhados",
    type: "dinner",
    difficulty: "difícil",
    prepTime: 30,
    cookTime: 20,
    servings: 4,
    ingredients: [
      "2 racks de cordeiro (~8 costelas cada)",
      "CROSTA: farinha panko + salsinha + alecrim + alho + mostarda de Dijon + azeite",
      "sal grosso, pimenta-do-reino",
      "molho de hortelã para acompanhar"
    ],
    instructions: [
      "Faça o frenching dos ossos: limpe os ossos até 3 cm além da carne para apresentação elegante. Seque toda a carne com papel toalha meticulosamente.",
      "Tempere com sal grosso generoso dos dois lados e deixe 30 minutos em temperatura ambiente. O sal na superfície absorve umidade e sela melhor.",
      "Prepare a crosta: misture panko, salsinha e alecrim picados finamente, alho amassado e azeite até obter textura de farofa úmida. Reserve.",
      "Sele o rack de cordeiro em frigideira de ferro fumegante, 2 minutos por cada lado, incluindo as bordas — esse processo carameliza as proteínas e cria sabor de grelha.",
      "Cubra toda a superfície da carne com mostarda de Dijon (age como cola para a crosta). Em seguida, pressione a crosta de ervas uniformemente.",
      "Leve ao forno pré-aquecido a 220 °C por 12 a 15 minutos para malpassado — temperatura interna 55 °C. A crosta ficará dourada e perfumada.",
      "Retire do forno. Descanse 8 minutos coberto frouxamente — essencial para o suco se redistribuir na carne rosada.",
      "Corte entre os ossos para separar as costelas individuais. Sirva 4 a 5 ossos por pessoa com o molho de hortelã e legumes grelhados."
    ],
    tips: [
      "Frenching dos ossos é estético mas importante — ossos limpos não queimam e a apresentação passa profissionalismo.",
      "Temperatura 55 °C = malpassado rosado, ideal para cordeiro de qualidade — bem passado perde todo o sabor.",
      "Mostarda de Dijon como adesivo da crosta é técnica clássica francesa."
    ]
  },
  {
    name: "Salmão Grelhado com Crosta de Gergelim 📋", emoji: "🐟", region: "INT", estimatedCost: "low", 
    description: "Filé de salmão com crosta crocante de gergelim e molho de soja e gengibre",
    category: "Grelhados",
    type: "dinner",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    ingredients: [
      "4 filés de salmão (~180 g cada, com pele)",
      "CROSTA: gergelim preto e branco misturados",
      "MOLHO: soja reduzida + mel + gengibre fresco + suco de limão",
      "azeite de gergelim, coentro"
    ],
    instructions: [
      "Prepare o molho com antecedência: misture soja, mel e gengibre ralado numa panela pequena. Reduza em fogo médio por 5 minutos até engrossar levemente como um glaze. Reserve para esfriar.",
      "Seque os filés de salmão meticulosamente com papel toalha — especialmente o lado da pele. Umidade impede a crosta de gergelim de aderir.",
      "Pincele levemente uma fina camada do molho redutor sobre o lado sem pele do salmão. Pressione o gergelim misturado diretamente sobre essa superfície — o molho age como cola.",
      "Aqueça frigideira antiaderente com azeite de gergelim em fogo médio-alto. Quando começar a fumegar levemente, adicione o salmão com o lado do gergelim para baixo.",
      "Cozinhe por 2 a 3 minutos sem tocar — o gergelim dourará formando crosta crocante. Observe: quando as bordas do filé mudarem para rosa-opaco, está na hora de virar.",
      "Vire delicadamente com espátula larga. Cozinhe por mais 2 minutos pelo lado da pele — a pele ficará crocante e se soltará facilmente.",
      "O centro do salmão deve permanecer levemente translúcido e rosado — esse é o ponto perfeito que garante textura sedosa e umidade.",
      "Sirva com um fio do molho de soja sobre o prato, não sobre o peixe — para não amolecer a crosta crocante de gergelim."
    ],
    tips: [
      "Salmão com pele: a pele crocante é comestível e deliciosa — inicie pelo lado do gergelim.",
      "Centro translúcido é o ponto ideal — cozinhar demais resulta em textura seca e dura.",
      "Azeite de gergelim tostado tem sabor mais intenso que o normal — use em quantidade pequena."
    ]
  },
  {
    name: "Robalo Inteiro Grelhado à Portuguesa 📋", emoji: "🥩", region: "US", estimatedCost: "low", 
    description: "Robalo fresco inteiro assado na brasa com tempero simples que exalta o sabor do peixe",
    category: "Grelhados",
    type: "dinner",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "1 robalo inteiro de ~1,5 kg (limpo e eviscerado)",
      "8 dentes de alho fatiados",
      "tomilho e salsinha fresca",
      "azeite extravirgem, sal grosso, limão"
    ],
    instructions: [
      "Faça cortes diagonais profundos dos dois lados do peixe, espaçados 3 cm — esses cortes permitem que o tempero penetre na carne densa e aceleram o cozimento uniforme.",
      "Crave fatias de alho dentro dos cortes e na cavidade abdominal. Coloque ramos de tomilho e salsinha dentro da cavidade — elas aromatizarão o peixe durante o cozimento a vapor interno.",
      "Tempere generosamente com sal grosso por fora e por dentro, regue com azeite pela superfície inteira. Deixe marinar 20 minutos.",
      "Prepare grelha dupla específica para peixe (grade em formato de peixe) ou utilize duas grades paralelas — o peixe inteiro é delicado e precisa de suporte total para não partir.",
      "Grelhe a calor médio-alto a 15 cm da brasa. Os primeiros 8 a 10 minutos, não mexa — uma crosta dourada se formará e o peixe naturalmente se soltará da grelha quando estiver pronto.",
      "Vire com cuidado usando duas espátulas ou a grade dupla. Mais 8 a 10 minutos pelo outro lado. O olho do peixe ficará branco e opaco quando estiver pronto.",
      "A carne está cozida quando descama facilmente ao toque de garfo na parte mais grossa, próxima à espinha. Puxe a carne da espinha — deve sair limpa.",
      "Transfira para travessa. Regue com azeite fresco e suco de limão. Sirva à mesa com o peixe inteiro para fatiamento elegante."
    ],
    tips: [
      "Peixe fresco tem olho brilhante, branquias vermelhas e cheiro de mar, não de peixe forte.",
      "Grade específica para peixe evita que descame e parta ao virar.",
      "Peixe inteiro fica mais suculento que filé — a espinha regula o cozimento."
    ]
  },
  {
    name: "Atum Selado ao Estilo Japonês 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Atum fresco selado rapidamente no exterior, cru no centro, com molho ponzu",
    category: "Grelhados",
    type: "dinner",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 4,
    servings: 2,
    ingredients: [
      "2 postas de atum fresco grau sashimi (~200 g cada)",
      "MOLHO PONZU: soja + suco de limão + mirin + katsuobushi (flocos de atum)",
      "sementes de gergelim, cebolinha",
      "azeite de gergelim, wasabi"
    ],
    instructions: [
      "Use apenas atum com certificação de qualidade para sashimi — o centro ficará completamente cru. Verifique a cor: deve ser vermelho vivo sem manchas acinzentadas.",
      "Prepare o molho ponzu: misture soja, suco de limão e mirin. Opcional: adicione katsuobushi e deixe infusionar por 15 minutos. Coe e reserve.",
      "Seque o atum com papel toalha. Pressione gergelim misturado (preto e branco) em todos os lados — a crosta de gergelim criará textura contrastante com o interior cru.",
      "Aqueça frigideira de ferro em fogo máximo por 5 minutos — deve ser extremamente quente. Adicione azeite de gergelim apenas segundos antes do atum.",
      "Sele cada lado por apenas 45 segundos a 1 minuto — o objetivo é exterior levemente cozido e interior completamente cru e frio.",
      "O gergelim dourar e o exterior mudar para cinza-claro indica que está na hora de virar. O centro deve permanecer vermelho vivo.",
      "Retire imediatamente. Fatie em fatias de 1 cm com faca muito afiada — facas cegas amassam em vez de cortar o atum delicado.",
      "Disponha as fatias mostrando o interior vermelho vivo. Sirva com ponzu para mergulhar, wasabi e cebolinha."
    ],
    tips: [
      "Qualidade do atum é tudo — use apenas grau sashimi certificado para consumo cru.",
      "Frigideira a temperatura máxima é essencial — temperatura baixa cozinha o interior antes de selar.",
      "Fatiamento com faca afiada em ângulo preserva a textura delicada."
    ]
  },
  {
    name: "Camarão Jumbo Grelhado na Manteiga 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Camarões grandes dourados na manteiga com alho e pimenta calabresa",
    category: "Grelhados",
    type: "dinner",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 8,
    servings: 4,
    ingredients: [
      "1 kg de camarão jumbo (com casca, sem cabeça)",
      "100 g de manteiga sem sal",
      "8 dentes de alho fatiados",
      "pimenta calabresa, salsinha, limão",
      "sal e pimenta-do-reino"
    ],
    instructions: [
      "Faça um corte raso longitudinal pela parte superior do camarão sem remover a casca — isso expõe a carne ao tempero e calor enquanto a casca protege da ressecação e adiciona sabor.",
      "Tempere com sal e pimenta-do-reino. Reserve.",
      "Em grelha ou frigideira de ferro bem quente, posicione os camarões com o lado cortado para baixo. Grelhe por 2 minutos sem mover — eles naturalmente se soltarão quando estiverem prontos para virar.",
      "Vire quando a casca do lado de baixo estiver rosada e a carne ao redor do corte estiver opaca. Grelhe mais 2 minutos pelo outro lado.",
      "Em frigideira separada, derreta a manteiga em fogo médio. Adicione o alho fatiado e cozinhe até dourar levemente, cerca de 2 minutos. Adicione pimenta calabresa.",
      "Adicione os camarões grelhados diretamente à frigideira com a manteiga. Mexa rapidamente por 30 segundos para cobrir tudo.",
      "Camarão está pronto quando a casca ficou completamente rosada/alaranjada e a carne está opaca sem transparência. Cozinhar demais resulta em textura borrachuda.",
      "Transfira para prato. Regue com a manteiga de alho da frigideira. Esprema limão fresco e polvilhe salsinha. Sirva com pão para enxugar a manteiga."
    ],
    tips: [
      "Camarão com casca na grelha fica muito mais suculento — a casca protege e adiciona sabor.",
      "O sinal certeiro: camarão enrola formando um 'C' perfeito = cozido. 'O' = cozido demais.",
      "Manteiga de alho aromatiza todos os ingredientes ao final — não pule."
    ]
  },
  {
    name: "Lula Grelhada com Alho e Limão Siciliano 📋", emoji: "🍽️", region: "INT", estimatedCost: "low", 
    description: "Lulas grandes grelhadas rapidamente mantendo textura macia",
    category: "Grelhados",
    type: "dinner",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 5,
    servings: 4,
    ingredients: [
      "800 g de lulas médias a grandes (limpas)",
      "4 dentes de alho picados",
      "raspas e suco de 2 limões sicilianos",
      "azeite extravirgem, salsinha",
      "pimenta calabresa, sal"
    ],
    instructions: [
      "Limpe as lulas removendo a película transparente externa, a cartilagem interna e a tinta. Separe o tubo dos tentáculos. Enxágue bem em água fria corrente e seque completamente.",
      "Faça cortes em cruz na parte interna do tubo — essa técnica faz a lula enrolar e expõe mais superfície à grelha. A lula enrolada é característica visual do prato.",
      "Tempere com azeite, alho picado, raspas de limão e pimenta calabresa. Marine por apenas 15 minutos — lula marinada por muito tempo amolece excessivamente.",
      "Aqueça a grelha ou frigideira de ferro em fogo máximo. Lula exige temperatura altíssima e rapidez — temperaturas baixas retiram umidade e resultam em textura borrachuda.",
      "Grelhe os tubos por 1 a 2 minutos cada lado, os tentáculos por 1 minuto virando frequentemente. A lula ficará opaca e levemente dourada.",
      "REGRA DE OURO DA LULA: ou 2 minutos ou 20 minutos. Menos de 20 min em fogo lento = borracha. Mais de 2 min em fogo alto = borracha. Na grelha, são 2 minutos.",
      "Retire imediatamente da grelha. Não continue cozinhando.",
      "Esprema limão fresco imediatamente sobre as lulas quentes. Polvilhe salsinha e sirva com azeite extra."
    ],
    tips: [
      "REGRA FUNDAMENTAL: Lula = 2 minutos em fogo altíssimo ou 20 minutos em fogo baixo. O meio-termo resultará em borracha.",
      "Cortes em cruz fazem a lula enrolar e expõem mais área à grelha — técnica clássica.",
      "Secar completamente a lula antes de grelhar é essencial — úmida, ela cozinha no vapor em vez de grelhar."
    ]
  },
  {
    name: "Polvo à Lagareiro Grelhado 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Polvo cozido e depois grelhado no azeite com batata amassada — tradição portuguesa",
    category: "Grelhados",
    type: "dinner",
    difficulty: "médio",
    prepTime: 30,
    cookTime: 90,
    servings: 4,
    ingredients: [
      "1 polvo de ~1,5 kg (congelado e descongelado — amacia as fibras)",
      "COZIMENTO: cebola + louro + pimenta-do-reino + sal",
      "LAGAREIRO: batatas médias + azeite extravirgem generoso + alho + páprica defumada",
      "salsinha e coentro fresco"
    ],
    instructions: [
      "Polvo congelado é preferível a fresco — o congelamento rompe as fibras musculares e amaicia a carne. Descongele naturalmente na geladeira por 24 horas.",
      "Cozinhe o polvo: numa panela alta, coloque cebola, louro, pimenta em grãos e sal. Adicione o polvo sem água extra — ele soltará bastante líquido. Cozinhe tampado em fogo médio por 60 minutos.",
      "Teste de cozimento: espete um garfo na parte mais grossa do tentáculo — deve entrar sem resistência da fibra. Se ainda resistir, cozinhe mais 15 minutos.",
      "Retire o polvo da panela. Cozinhe as batatas na água do polvo — está rica em sabor. Escorra e amasse com azeite e alho — não coloque leite ou manteiga.",
      "Aqueça a grelha em temperatura alta. Pincele os tentáculos do polvo com azeite. Grelhe por 3 a 4 minutos cada lado até ficar levemente carbonizado e crocante na superfície.",
      "As pontas finas dos tentáculos ficarão crocantes e levemente tostadas — essa é a característica desejada do prato.",
      "Disponha as batatas amassadas num prato. Posicione o polvo grelhado por cima.",
      "Regue generosamente com azeite extravirgem de qualidade, páprica defumada e ervas frescas."
    ],
    tips: [
      "Congelamento natural é o melhor amaciador para polvo — rompe as fibras sem aditivos químicos.",
      "A água de cozimento do polvo é muito saborosa — use para cozinhar as batatas.",
      "Azeite generoso e de qualidade é o que define o 'lagareiro' — não economize."
    ]
  },
  {
    name: "Vieira Grelhada na Manteiga de Sálvia 📋", emoji: "🍤", region: "INT", estimatedCost: "high", 
    description: "Vieiras com crosta dourada perfeita em manteiga aromatizada com sálvia",
    category: "Grelhados",
    type: "dinner",
    difficulty: "médio",
    prepTime: 10,
    cookTime: 6,
    servings: 4,
    ingredients: [
      "16 vieiras grandes (sem coral)",
      "80 g de manteiga sem sal",
      "10 folhas de sálvia fresca",
      "flor de sal, pimenta branca",
      "limão para finalizar"
    ],
    instructions: [
      "Seque as vieiras meticulosamente com papel toalha por pelo menos 5 minutos — esse passo é mais crítico que qualquer tempero. Qualquer umidade superficial criará vapor e impedirá a crosta dourada.",
      "Tempere apenas com flor de sal no último momento — sal com antecedência extrai umidade e arruína a crosta.",
      "Aqueça frigideira de inox ou ferro fundido em fogo alto até aparecer fumaça leve. Não use antiaderente — não atinge temperatura suficiente para crosta adequada.",
      "Adicione metade da manteiga e espere espumar. Coloque as vieiras com espaço entre elas — lotar a frigideira reduz temperatura e resulta em vapor em vez de selagem.",
      "Não toque por 2 minutos — a vieira se soltará naturalmente quando estiver pronta para virar. Forçar antes desfaz a crosta em formação.",
      "A vieira está pronta para virar quando a parte inferior estiver completamente dourada — quase caramelizada. Vire rapidamente.",
      "Adicione o resto da manteiga e as folhas de sálvia. Cozinhe apenas 1 minuto pelo outro lado enquanto colhe manteiga com colher sobre as vieiras.",
      "Retire imediatamente — cozidas demais ficam borrachudas. Interior deve estar morno ao toque e levemente translúcido no centro. Sirva com flor de sal e limão."
    ],
    tips: [
      "Vieiras secas + frigideira fumegante = crosta perfeita. Vieiras úmidas + frigideira fria = cinza e sem gosto.",
      "Espaço entre as vieiras é obrigatório — muitas juntas baixam a temperatura e vaporizarão.",
      "Interior levemente translúcido é o ponto: completamente opaco = cozidas demais."
    ]
  },
  {
    name: "Frango Tikka Masala na Brasa 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Frango marinado no iogurte e especiarias indianas grelhado na brasa",
    category: "Grelhados",
    type: "lunch",
    difficulty: "médio",
    prepTime: 480,
    cookTime: 20,
    servings: 4,
    ingredients: [
      "1 kg de peito ou coxa de frango em cubos",
      "MARINADA: 200 g iogurte grego + cominho + coentro + garam masala + cúrcuma + páprica + alho + gengibre + suco de limão + sal",
      "ghee ou manteiga para finalizar"
    ],
    instructions: [
      "Prepare a marinada: misture o iogurte com todas as especiarias, alho e gengibre ralados e suco de limão. O iogurte age como tenderizante — as enzimas lácticas amolecem as proteínas do frango.",
      "Adicione os cubos de frango à marinada, envolva completamente e refrigere por mínimo 8 horas, idealmente 24 horas. A cor laranja-avermelhada da páprica será visível.",
      "Escorra o excesso de marinada antes de montar os espetinhos — excesso queima antes de caramelizar, amargando o exterior.",
      "Monte em espetinhos metálicos ou de bambu pré-molhados. Alterne pedaços de frango com cebola e pimentão verde — o vegetal amolece durante a grelha.",
      "Grelhe na brasa bem quente ou em grelha a gás alta: 4 minutos de cada lado virando regularmente. O frango deve ter pontos levemente carbonizados — característico do tandoor.",
      "A marinada caramelizará criando uma crosta aromática e levemente crocante. Os aromas das especiarias na brasa são inconfundíveis.",
      "Temperatura interna: 74 °C para frango seguro. A carne deve estar branca e suculenta por dentro.",
      "Retire dos espetinhos, pincele com ghee derretido e sirva com naan, arroz basmati e molho raita de pepino."
    ],
    tips: [
      "Marinada de iogurte por 24h é o segredo da maciez — não pule o tempo de marinada.",
      "Pontos carbonizados são desejáveis — são o sabor característico do tikka.",
      "Ghee no final em vez de manteiga dá sabor mais autêntico e tolera temperatura mais alta."
    ]
  },
  {
    name: "Sobrecoxa Crocante com Páprica Defumada 📋", emoji: "🍗", region: "US", estimatedCost: "low", 
    description: "Sobrecoxa marinada com especiarias e pele crocante perfeita na grelha",
    category: "Grelhados",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 120,
    cookTime: 35,
    servings: 4,
    ingredients: [
      "8 sobrecoxas com osso e pele",
      "TEMPERO SECO: páprica defumada + alho em pó + cebola em pó + cominho + orégano + sal + pimenta",
      "limão para marinar, manteiga"
    ],
    instructions: [
      "Marque a pele das sobrecoxas com cortes superficiais em xadrez — isso permite que o tempero penetre, a gordura escoe durante o cozimento e a pele fique crocante.",
      "Misture todos os temperos secos. Esfregue generosamente por baixo e sobre a pele, pressionando nos cortes. Regue com suco de limão e deixe marinar por 2 horas.",
      "A pele deve estar completamente seca antes de grelhar — seque com papel toalha se necessário. Pele úmida não ficará crocante.",
      "Inicie com a pele para baixo na grelha em temperatura médio-alta — muito forte queima antes da gordura escorrer. O objetivo inicial é derreter a gordura subcutânea.",
      "Grelhe com a pele para baixo por 12 a 15 minutos sem mexer — a gordura derreterá e escorrerá, criando chamas ocasionais. Afaste brevemente se as chamas subirem muito.",
      "Vire quando a pele estiver dourada e crocante. Grelhe do outro lado por 15 a 20 minutos — sobrecoxa leva mais tempo que peito por causa da diferença de densidade.",
      "Temperatura interna: 74 °C mínimo para frango com osso. Perto do osso é sempre o último ponto a cozinhar.",
      "Pincele com manteiga no último minuto para brilho. Descanse 5 minutos antes de servir."
    ],
    tips: [
      "Pele seca é o segredo da crocância — qualquer umidade vira vapor e amolece.",
      "Sobrecoxa com osso tem mais sabor que peito — o osso troca sabor durante o cozimento.",
      "Chamas moderadas durante a grelha adicionam sabor defumado — não apague, apenas controle."
    ]
  },
  {
    name: "Asa de Frango Buffalo com Molho Picante 📋", emoji: "🍗", region: "US", estimatedCost: "low", 
    description: "Asas de frango grelhadas crocantes com molho picante americano",
    category: "Grelhados",
    type: "snack",
    difficulty: "fácil",
    prepTime: 60,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "1,5 kg de asas de frango (divididas em drumette e flat)",
      "MOLHO BUFFALO: hot sauce (Frank's) + manteiga derretida + alho",
      "sal, pimenta, pó de alho, papel manteiga"
    ],
    instructions: [
      "Seque as asas completamente com papel toalha e leve à geladeira descobertas por 1 hora — esse processo de secagem a frio é o segredo das asas crocantes sem fritar.",
      "Tempere com sal, pimenta e alho em pó. A superfície completamente seca absorve o tempero seco e ficará crocante na grelha.",
      "Grelhe as asas em temperatura média — não alta. Temperatura excessiva queima por fora antes de cozinhar o interior. Calor médio permite o cozimento uniforme.",
      "Grelhe por 10 a 12 minutos de cada lado virando uma vez, totalizando 20 a 25 minutos. A pele ficará dourada e enrugada — sinal de que a gordura subcutânea escorreu.",
      "Prepare o molho buffalo: derreta a manteiga e misture com hot sauce e alho em pó. A proporção clássica é 70% hot sauce e 30% manteiga.",
      "Transfira as asas para uma tigela grande. Despeje o molho buffalo sobre as asas quentes e agite a tigela para cobrir todas as peças uniformemente.",
      "Retorne as asas molhadas à grelha por mais 2 a 3 minutos — o calor caramelizará o molho e criará uma camada glaceada característica.",
      "Sirva imediatamente com molho ranch ou blue cheese e talos de aipo e cenoura."
    ],
    tips: [
      "Geladeira a 1 hora descoberta é a técnica secreta para asas crocantes sem fritar.",
      "Molho buffalo entra depois da grelha e carameliza brevemente — não grelhe com o molho ab initio.",
      "Temperatura média, não alta, garante cozimento uniforme das asas densas."
    ]
  },
  {
    name: "Espetinho de Coração de Frango 📋", emoji: "🍗", region: "US", estimatedCost: "low", 
    description: "Chispe estilo yakitori japonês com coração marinado no shoyu",
    category: "Grelhados",
    type: "snack",
    difficulty: "fácil",
    prepTime: 30,
    cookTime: 10,
    servings: 4,
    ingredients: [
      "600 g de coração de frango (limpos)",
      "MARINADA: shoyu + sake ou cachaça + açúcar + alho + gengibre",
      "cebolinha verde para montar no espeto",
      "flor de sal para finalizar"
    ],
    instructions: [
      "Limpe os corações: retire o excesso de gordura e os vasos sanguíneos visíveis. Corte ao meio longitudinalmente — isso expõe mais superfície à marinada e à grelha.",
      "Prepare a marinada japonesa: misture partes iguais de shoyu e sake, adicione açúcar mascavo, alho e gengibre ralado. Cozinhe rapidamente para dissolver o açúcar e deixe esfriar.",
      "Marine os corações por 30 minutos — não mais, pois o shoyu é salgado e salga demais se marinado longo.",
      "Monte nos espetinhos: 4 a 5 meias-corações por espeto intercalados com pedaços de cebolinha verde.",
      "Grelhe sobre brasa intensa a 8 cm do carvão. Os corações são pequenos e cozinham rápido — 2 a 3 minutos cada lado.",
      "Durante a grelha, besunte com a marinada restante usando um pincel — cria camadas de sabor glaceado.",
      "O coração deve ter leve crocância por fora e interior macio sem ser cru. Cor rosada no centro é normal e segura.",
      "Finalize com flor de sal. Sirva imediatamente com o calor da grelha."
    ],
    tips: [
      "Coração de frango tem textura densa e resistente — grelha rápida em alta temperatura é o método correto.",
      "Marinada yakitori é a base perfeita — shoyu, sake e açúcar é a tríade clássica japonesa.",
      "Rosado levemente no centro é seguro para coração — diferente do músculo principal que precisa chegar a 74 °C."
    ]
  },
  {
    name: "Halloumi Grelhado com Mel e Romã 📋", emoji: "🍽️", region: "US", estimatedCost: "low", 
    description: "Queijo cipriota grelhado sem derreter, com mel e grãos de romã",
    category: "Grelhados",
    type: "snack",
    difficulty: "fácil",
    prepTime: 5,
    cookTime: 8,
    servings: 4,
    ingredients: [
      "400 g de queijo halloumi (2 blocos)",
      "mel de qualidade",
      "grãos de romã",
      "hortelã fresca, azeite com pimenta"
    ],
    instructions: [
      "Fatie o halloumi em fatias de 1 cm de espessura. Não tempere, não marine — o halloumi tem sal próprio suficiente.",
      "Seque as fatias com papel toalha. Halloumi tem alta umidade e precisa estar seco para dourar em vez de cozinhar no vapor.",
      "Aqueça frigideira antiaderente ou grelha de ferro sem óleo em temperatura média-alta — o halloumi tem gordura própria suficiente para não grudar.",
      "Grelhe as fatias por 2 minutos sem mover — marcas de grelha douradas se formarão. A propriedade única do halloumi é que ele não derrete como outros queijos.",
      "Vire e grelhe por mais 2 minutos. O halloumi deve estar completamente dourado com marcas de grelha dos dois lados e interior macio.",
      "Prato aquecido: Disponha as fatias ainda quentes. Regue mel por cima imediatamente — o calor do queijo faz o mel correr levemente.",
      "Espalhe os grãos de romã que darão frescor ácido, acidez e cor contrastante ao dourado do queijo.",
      "Finalize com folhas de hortelã fresca e um fio de azeite apimentado. Sirva imediatamente — halloumi grelhado esfria rapidamente e perde a textura."
    ],
    tips: [
      "Halloumi não derrete por causa da sua alta temperatura de fusão — ideal estritamente para grelha.",
      "Servir imediatamente é obrigatório — halloumi frio endurece e perde a textura elástica.",
      "Mel + queijo salgado = combinação clássica que equilibra os sabores."
    ]
  },
  {
    name: "Espetinho Misto Artesanal 📋", emoji: "🍗", region: "US", estimatedCost: "low", 
    description: "Espeto com carnes variadas e vegetais intercalados em marinada caseira",
    category: "Grelhados",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 30,
    cookTime: 15,
    servings: 6,
    ingredients: [
      "400 g patinho ou coxão mole em cubos de 3 cm",
      "400 g peito de frango em cubos de 3 cm",
      "VEGETAIS: pimentão amarelo + vermelho + cebola roxa + tomate cereja",
      "MARINADA: azeite + alho + páprica + orégano + limão + sal"
    ],
    instructions: [
      "Prepare a marinada misturando todos os ingredientes. Cubos de carne marinada por 2 horas absorvem mais tempero do que marinadas rápidas.",
      "Carne e frango devem ser marinados separadamente se usar marinadas diferentes — frango absorve mais rápido. Se usar a mesma marinada, podem ser juntos.",
      "Corte os vegetais em pedaços do mesmo tamanho dos cubos de carne — espessura similar garante cozimento uniforme de todos os elementos.",
      "Monte nos espetos metálicos alternando carne bovina, pimentão, frango, cebola, tomate cereja — a variedade de cores e sabores é o diferencial do espeto misto.",
      "Verifique que os cubos estão bem presos mas não esmagados — esmagados cozinharão mais rápido e podem despencar.",
      "Grelhe sobre brasa ou gás a temperatura média-alta, virando a cada 3 minutos para dourar uniformemente todos os lados.",
      "Total de 12 a 15 minutos. Os tomates cereja ficarão macios e quase caramelizados. As cebolas ficarão translúcidas e levemente carbonizadas nas bordas.",
      "Temperatura interna do frango: 74 °C. Carne bovina: 57 °C para ao ponto. Sirva em arroz ou pão de alho."
    ],
    tips: [
      "Tamanhe uniforme de todos os elementos é fundamental para cozimento simultâneo.",
      "Espetos metálicos transferem calor ao interior da carne pelo núcleo — cozinham mais rápido.",
      "Molhar espetos de bambu por 30 min impede que queimem durante a grelha."
    ]
  },
  {
    name: "Espeto de Frango com Abacaxi 📋", emoji: "🥗", region: "INT", estimatedCost: "low", 
    description: "Frango marinado no abacaxi com gengibre, uma combinação tropical perfeita",
    category: "Grelhados",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 120,
    cookTime: 15,
    servings: 4,
    ingredients: [
      "600 g peito de frango em cubos",
      "200 g abacaxi fresco em cubos iguais",
      "MARINADA: suco de abacaxi + shoyu + gengibre + alho + mel",
      "cebolinha verde"
    ],
    instructions: [
      "Enzima bromelina do suco de abacaxi fresco amacia o frango quimicamente — marine por exatamente 2 horas. Mais tempo desmanchaça a textura da carne excessivamente.",
      "Prepare a marinada: misture suco de abacaxi fresco (não de caixinha), shoyu, mel, gengibre e alho ralados.",
      "Cubra o frango com a marinada e refrigere por 2 horas. O frango absorverá a cor amarelo-âmbar da marinada.",
      "Corte o abacaxi em cubos do mesmo tamanho do frango. O abacaxi carameliza durante a grelha e adiciona dulçor.",
      "Monte nos espetos alternando frango, abacaxi e cebolinha (talo verde dobrado). A alternância cria equilíbrio de sabores em cada mordida.",
      "Grelhe a temperatura média-alta por 4 a 5 minutos cada lado. O abacaxi caramelizará e ficará dourado, soltando açúcar que flambeia brevemente.",
      "Besunte com marinada residual durante a grelha — cria glaze brilhante e saboroso na superfície.",
      "Sirva sobre arroz de coco ou com salada de coentro e limão."
    ],
    tips: [
      "Suco de abacaxi FRESCO é necessário — o pasteurizado não tem a enzima bromelina ativa.",
      "2 horas é o limite — mais tempo desfaz o frango. Menos tempo não amacia.",
      "Abacaxi caramelizado na grelha é um dos melhores acompanhamentos — não retire do espeto cedo."
    ]
  },
  {
    name: "Cogumelo Portobello Recheado com Queijo 📋", emoji: "🌱", region: "INT", estimatedCost: "low", 
    description: "Portobello como prato principal vegetariano, recheado e grelhado",
    category: "Grelhados",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    ingredients: [
      "4 cogumelos portobello grandes (12–15 cm)",
      "RECHEIO: queijo mozzarella + tomate seco + espinafre + alho + pinhão tostado",
      "azeite, balsâmico, sal, pimenta",
      "parmesão para finalizar"
    ],
    instructions: [
      "Limpe os portobettos com papel úmido — nunca em água corrente. Remova o pé central e raspe as lamelas com colher, criando espaço para o recheio.",
      "Besunte o interior (lado das lamelas) e exterior com azeite e alho laminado. Tempere levemente com sal e pimenta.",
      "Disponha os cogumelos com a abertura para cima numa grelha a temperatura média. Grelhe por 8 minutos — o cogumelo soltará líquido e murchará levemente.",
      "Enquanto grelharam, prepare o recheio: refogue espinafre rapidamente com alho. Misture com tomate seco picado, pinhão tostado e tempere.",
      "Escorra o líquido que se formou dentro dos cogumelos — se não escorrer, o recheio nadará em água.",
      "Recheie os cogumelos com a mistura de espinafre. Cubra com mozzarella fatiada.",
      "Volte à grelha tampada ou leve ao forno a 200 °C por 10 minutos até o queijo derreter e dourar.",
      "Finalize com parmesão ralado, balsâmico reduzido e pinceladas de azeite. Sirva como prato principal vegetariano."
    ],
    tips: [
      "Portobello solta muito líquido durante o cozimento — escorra antes de rechear.",
      "Grade a temperatura média, não alta — cogumelo queima facilmente na superfície.",
      "Como prato principal vegetariano, portobello é completo e satisfatório."
    ]
  },
  {
    name: "Berinjela ao Miso e Gergelim 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Berinjela grelhada cortada ao meio com glaze de miso e gergelim — estilo japonês",
    category: "Grelhados",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    ingredients: [
      "2 berinjelas japonesas longas",
      "GLAZE MISO: pasta de miso (4 col) + mirin (3 col) + sake (2 col) + açúcar (2 col) + azeite gergelim",
      "gergelim tostado, cebolinha"
    ],
    instructions: [
      "Corte as berinjelas ao meio longitudinalmente. Faça cortes em xadrez com faca na superfície da carne até 1 cm de profundidade — facilita a absorção do miso e o cozimento interno.",
      "Prepare o glaze miso: misture pasta de miso, mirin, sake e açúcar numa panela pequena. Cozinhe em fogo médio por 2 a 3 minutos mexendo constantemente até engrossar e brilhar. Adicione azeite de gergelim ao final fora do fogo.",
      "Aqueça grelha a temperatura média. Pincele o lado cortado das berinjelas com azeite e coloque com a carne para baixo.",
      "Grelhe por 8 a 10 minutos sem mexer — a carne da berinjela deve amaciar completamente e desenvolver marcas de grelha.",
      "Vire com cuidado para o lado da casca. A berinjela deve estar bem macia e quase desmanchando — isso é o correto.",
      "Aplique o glaze de miso generosamente sobre o lado cortado. Volte com o lado do miso para baixo na grelha por 2 minutos para caramelizar.",
      "O açúcar do miso caramelizará criando uma crosta levemente carbonizada e intensa — o sabor umami do miso se intensifica no calor.",
      "Sirva polvilhada com gergelim tostado, cebolinha fatiada e gotinhas de azeite de gergelim."
    ],
    tips: [
      "Este prato é inspirado no Nasu Dengaku japonês — clássico da culinária zen budista.",
      "Berinjela deve estar completamente macia antes do miso — não adiante o processo.",
      "Miso caramelizado tem sabor muito intenso — é um prato que surpreende vegetarianos e carnívoros."
    ]
  },
  {
    name: "Milho na Brasa com Manteiga Defumada 📋", emoji: "🍝", region: "LATAM", estimatedCost: "low", 
    description: "Milho grelhado inteiro com manteiga temperada e queijo",
    category: "Grelhados",
    type: "snack",
    difficulty: "fácil",
    prepTime: 5,
    cookTime: 20,
    servings: 4,
    ingredients: [
      "4 espigas de milho com palha",
      "MANTEIGA DEFUMADA: 100 g manteiga + páprica defumada + alho + sal + limão",
      "queijo parmesão ou cheddar ralado",
      "coentro ou salsinha"
    ],
    instructions: [
      "Deixe as espigas com toda a palha intacta — a palha cria um vapor natural que cozinha o milho por dentro antes de grelhar, resultando em milho mais suculento.",
      "Deixe as espigas de molho em água fria por 30 minutos — a palha úmida cria mais vapor e não queima na grelha.",
      "Prepare a manteiga defumada: in temperatura ambiente, misture a manteiga com páprica defumada, alho amassado e sal. Enrole em filme plástico e leve ao freezer.",
      "Disponha as espigas diretamente sobre a brasa. Grelhe por 15 a 18 minutos virando a cada 5 minutos — a palha ficará carbonizada por fora, protegendo o milho.",
      "Quando a palha estiver completamente dourada a carbonizada, retire da brasa com pinças protegendo as mãos.",
      "Abra a palha com cuidado — muito vapor sairá. Não amole a palha completamente — use-a como suporte para segurar.",
      "Passe a manteiga defumada gelada sobre toda a superfície do milho ainda quente — derrete na hora e penetra entre os grãos.",
      "Polvilhe queijo ralado por cima, suco de limão e ervas frescas. Sirva ainda na palha para manter o calor."
    ],
    tips: [
      "Palha molhada cria vapor natural — o milho cozinha por dentro antes de tostar por fora.",
      "Manteiga gelada sobre milho quente = derrete instantaneamente e penetra entre os grãos.",
      "Versão mexicana: acrescente maionese, queijo cotija e pimenta — é o elote."
    ]
  },
  {
    name: "Aspargos Grelhados com Limão e Parmesão 📋", emoji: "🍽️", region: "US", estimatedCost: "low", 
    description: "Aspargos verdes grelhados rapidamente com frescor de limão",
    category: "Grelhados",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 8,
    servings: 4,
    ingredients: [
      "500 g aspargos verdes frescos (grossos)",
      "azeite extravirgem",
      "raspas e suco de limão siciliano",
      "parmesão em lascas",
      "flor de sal, pimenta"
    ],
    instructions: [
      "Quebre os aspargos na base — naturalmente a parte lenhosa e seca se separará da parte macia. Não é necessário medir ou usar faca.",
      "Seque completamente com papel toalha. Em seguida, misture no azeite com sal e pimenta.",
      "Aqueça grelha em temperatura altíssima — aspargos precisam de calor intenso para grelhar rápido e não virar musgo.",
      "Disponha os aspargos perpendicularmente às grades para não cair. Grelhe por 2 a 3 minutos sem mover — marcas de grelha se formerão.",
      "Vire e grelhe mais 2 minutos. Os aspargos devem estar macios mas ainda com leve crocância — al dente. Amolecidos em excesso = perdem todo o sabor.",
      "Retire da grelha para uma travessa aquecida. Imediatamente regue com suco de limão fresco — o ácido reage com os compostos verdes e mantém a cor viva.",
      "Adicione raspas de limão siciliano que dão aroma intenso e frescor.",
      "Coloque lascas de parmesão por cima e termine com flor de sal. Sirva imediatamente."
    ],
    tips: [
      "Aspargos verdes espessos funcionam melhor na grelha sem amolecer demais.",
      "Calor altíssimo é essencial — aspargos em calor médio ficam moles antes de dourar.",
      "Suco de limão imediatamente ao sair da grelha preserva a cor verde brilhante."
    ]
  },
  {
    name: "Shish Kebab à Turca 📋", emoji: "🥗", region: "US", estimatedCost: "low", 
    description: "Espeto de carne moída temperada com especiarias otomanas, grelhado",
    category: "Grelhados",
    type: "lunch",
    difficulty: "médio",
    prepTime: 30,
    cookTime: 12,
    servings: 4,
    ingredients: [
      "600 g de carne bovina moída (patinho 80/20)",
      "TEMPERO: cebola ralada + alho + páprica + cominho + coentro em pó + pimenta síria + salsinha + hortelã + sal",
      "espetos metálicos planos (importantes)"
    ],
    instructions: [
      "Misture a carne com todos os temperos, incluindo a cebola bem ralada e espremida para remover excesso de líquido — muito líquido faz a carne escorregar do espeto.",
      "Amasse energeticamente a mistura por 5 minutos — isso desenvolve as proteínas e cria uma massa coesa que adere ao espeto sem despencar.",
      "Refrigere a mistura por 30 minutos para firmar — a gordura resfria e mantém a carne mais firme durante a moldagem.",
      "Molhe as mãos em água fria. Pegue uma porção equivalente a um ovo grande e molde em torno do espeto metálico plano, pressionando firmemente para aderir. O espeto plano (não redondo) garante que a carne não gire.",
      "Grelhe sobre brasa bem quente por 4 a 5 minutos sem mover — deixar a crosta se formar antes de virar evita que desmanche.",
      "Vire com cuidado usando espátula, não apenas girando o espeto — a carne mole precisa ser suportada.",
      "Mais 4 a 5 minutos pelo outro lado. Temperatura interna: 72 °C para carne moída.",
      "Sirva com pão sírio aquecido, homus, salada de tomate e cebola roxa com salsinha, e iogurte temperado."
    ],
    tips: [
      "Espeto PLANO é essencial para o kebab de carne moída — espeto redondo faz a carne girar.",
      "Amassamento vigoroso cria textura coesa — não pule esse passo.",
      "Cebola deve ser ralada e espremida — líquido em excesso desfaz a estrutura."
    ]
  },
  {
    name: "Satay de Frango com Molho de Amendoim 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Espetinhos de frango indonésios com molho de amendoim picante",
    category: "Grelhados",
    type: "snack",
    difficulty: "médio",
    prepTime: 120,
    cookTime: 10,
    servings: 4,
    ingredients: [
      "600 g filé de frango em tiras finas",
      "MARINADA: soja + açúcar mascavo + alho + coentro em pó + cúrcuma + suco de limão + leite de coco",
      "MOLHO AMENDOIM: pasta de amendoim + leite de coco + soja + alho + gengibre + pimenta + limão"
    ],
    instructions: [
      "Prepare a marinada misturando todos os ingredientes. Corte o frango em tiras finas de 1 cm de espessura contra as fibras — mais fino absorve marinada melhor.",
      "Marine por 2 horas: a cúrcuma tingirá o frango de amarelo dourado, cor característica do satay.",
      "Para o molho: cozinhe a pasta de amendoim com leite de coco em fogo médio, adicionando os outros ingredientes e ajustando consistência com água morna. Deve ser cremoso e escorrer lentamente.",
      "Monte nos espetinhos de bambu pré-molhados, passando o espeto ao longo da tira de frango como se fosse costurar — isso garante que a tira não dobre nem caia.",
      "Grelhe sobre brasa intensa: 2 a 3 minutos cada lado. As tiras finas cozinham rápido — não grelhe demais.",
      "O frango deve ter pontos levemente tostados com a cúrcuma caramelizada — cor dourada intensa e perfume característico do satay autêntico.",
      "Sirva imediatamente com molho de amendoim quente numa tigela separada para mergulhar.",
      "Acompanhe com arroz comprimido (ketupat) ou pepino em fatias finas com molho de vinagre."
    ],
    tips: [
      "Tiras finas em marinada rica = satay autêntico. Peças grossas refletem adaptação incorreta.",
      "Molho de amendoim deve estar quente — frio gruda e não escorrega corretamente.",
      "Espeto de bambu molhado não queima — molhe 30 minutos antes."
    ]
  },
  {
    name: "Yakitori de Frango à Moda Japonesa 📋", emoji: "🍗", region: "US", estimatedCost: "low", 
    description: "Espetinhos japoneses de frango laqueados no molho tare",
    category: "Grelhados",
    type: "snack",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 12,
    servings: 4,
    ingredients: [
      "600 g sobrecoxa de frango (sem osso, com pele)",
      "MOLHO TARE: shoyu + mirin + sake + açúcar (proporção 1:1:1:0,5)",
      "cebolinha verde (talo) em pedaços para intercalar",
      "sal (para yakitori 'shio') como alternativa"
    ],
    instructions: [
      "Prepare o molho tare: combine shoyu, mirin, sake e açúcar numa panela pequena. Cozinhe em fogo médio mexendo até reduzir pela metade e engrossar como mel líquido. Esfrie e reservo.",
      "Corte a sobrecoxa em cubos de 2 cm mantendo a pele — ela é fundamental no yakitori para crocância e gordura.",
      "Monte os espetos: 3 a 4 cubos por espeto de bambu, intercalando com pedaços de cebolinha (talo branco e verde em partes iguais).",
      "Grelhe sobre brasa intensa com os espetos a 5 cm do carvão — yakitori exige calor direto intenso.",
      "Primeiros 2 minutos sem molho — deixe a crosta se firmar. Vire e mais 2 minutos no outro lado.",
      "Aplique molho tare com pincel. Continue grelhando 2 minutos virando frequentemente. Aplique mais tare. Repita por 2 a 3 rodadas — as camadas de tare glasseiam sobre o frango.",
      "Cada aplicação de tare deve caramelizar antes da próxima camada — cerca de 1 a 2 minutos entre aplicações.",
      "O yakitori pronto tem aparência laceada e brilhante, com aroma adocicado. Sirva com cerveja gelada ou chá verde."
    ],
    tips: [
      "Pele da sobrecoxa é obrigatória no tare yakitori — garante sabor e protege a carne do ressecamento.",
      "Múltiplas camadas de tare são o diferencial — cada camada carameliza sobre a anterior.",
      "Versão 'shio' (sal) usa apenas sal — mais simples e mostra a qualidade do frango."
    ]
  },
  {
    name: "Entrecote com Flor de Sal 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Corte nobre de alta gordura marmoreada, simples e perfeito",
    category: "Grelhados",
    type: "dinner",
    difficulty: "médio",
    prepTime: 10,
    cookTime: 12,
    servings: 2,
    ingredients: [
      "1 entrecote de 800 g (3 cm de espessura)",
      "flor de sal",
      "pimenta-do-reino em grãos (moída na hora)",
      "manteiga e tomilho para aromatizar"
    ],
    instructions: [
      "O entrecote é um corte naturalmente marmoreado — a gordura entremeada na carne é o que faz toda a diferença. Não remova qualquer gordura.",
      "Retire da embalagem e deixe descoberto na geladeira por 1 hora — a superfície irá secar levemente, criando crosta melhor.",
      "Tempere com pimenta-do-reino moída na hora dos dois lados. A flor de sal apenas ao final.",
      "Frigideira de ferro fundido fumegante: sele por 3 minutos de cada lado apenas — o entrecote é mais fino que a picanha e cozinha mais rápido.",
      "Adicione manteiga e tomilho na frigideira. Incline levemente e colhe a manteiga aromatizada sobre a carne por 1 minuto — técnica de basting que adiciona sabor.",
      "Para a temperatura ideal: 52 °C malpassado, 57 °C ao ponto — entrecote é muito melhor malpassado pela gordura marmoreada que derrete no interior.",
      "Descanse 5 minutos numa grade — o calor residual elevará mais 2 a 3 °C.",
      "Tempere com flor de sal apenas agora — sal estruturado que não dissolve e dá crocância ao primeiro mordisco."
    ],
    tips: [
      "Flor de sal só ao final — sal estruturado crocante que desaparece se aplicado antes.",
      "Entrecote malpassado exalta a gordura marmoreada — bem passado desperdiça o corte.",
      "Basting (colher manteiga sobre a carne) é a técnica de bistrô francês."
    ]
  },
  {
    name: "Short Rib Glaceado no Açúcar Mascavo 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Costela bovina no estilo coreano com glaze de açúcar e gergelim",
    category: "Grelhados",
    type: "dinner",
    difficulty: "médio",
    prepTime: 180,
    cookTime: 20,
    servings: 4,
    ingredients: [
      "1,2 kg short rib (Galbi coreano - cortado transversal, fino)",
      "MARINADA: soja + açúcar mascavo + pera ralada + alho + gengibre + azeite gergelim + pimenta",
      "gergelim, cebolinha"
    ],
    instructions: [
      "A pera ralada contém enzimas que amaciam proteínas cárneas — fundamental na marinada galbi. Rale 1 pera asiática ou maçã verde e misture à marinada.",
      "Prepare a marinada combinando soja, açúcar mascavo, alho e gengibre ralados, azeite de gergelim e pimenta. A proporção doce-salgada cria o glaze característico.",
      "Adicione o short rib cortado transversalmente (thin-cut galbi) à marinada. Marine mínimo 3 horas, ideal 24 horas. A carne mudará de cor para marrom amarronzado.",
      "Retire da marinada e escorra o excesso — líquido extra queima antes de caramelizar.",
      "Grelhe em temperatura alta por 3 a 4 minutos cada lado. O açúcar na marinada caramelizará criando crosta escurecida e aromática.",
      "As chamas podem subir pela gordura e açúcar — isso é esperado no galbi coreano e adiciona sabor defumado característico.",
      "Aplique marinada adicional durante a grelha para intensificar o glaze. A superfície deve ficar lacada e brilhante.",
      "Polvilhe gergelim tostado e cebolinha fatiada. Sirva com arroz branco, kimchi e banchan (acompanhamentos coreanos)."
    ],
    tips: [
      "Pera asiática ou maçã verde na marinada é o amaciante natural tradicional coreano.",
      "Thin-cut galbi (fino) é o corte específico — fat-cut ficaria cru por dentro.",
      "Chamas durante a grelha do galbi são características — adicionam sabor defumado único."
    ]
  },
  {
    name: "Prime Rib na Brasa com Crosta de Sal 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Costela mestre no osso assada na brasa com crosta de sal grosso",
    category: "Grelhados",
    type: "dinner",
    difficulty: "difícil",
    prepTime: 60,
    cookTime: 120,
    servings: 6,
    ingredients: [
      "Peça de prime rib de 2,5–3 kg (2 ossos)",
      "CROSTA DE SAL: sal grosso + ervas secas + pimenta + azeite",
      "alho, alecrim, tomilho"
    ],
    instructions: [
      "Retire o prime rib da geladeira 2 horas antes — peça grande necessita de temperatura ambiente para cozinhar uniformemente até o centro.",
      "Faça furos profundos com faca e insira dentes de alho inteiros e raminhos de alecrim — o tempero migra para o interior durante o cozimento lento.",
      "Prepare a crosta de sal: misture sal grosso, ervas secas, pimenta e azeite até formar pasta. Cubra toda a superfície da carne generosamente.",
      "Prepare brasa de cozimento indireto: brasa concentrada de um lado apenas. A carne fica do lado sem brasa para cozimento lento por convecção.",
      "Inicie com o lado da gordura para baixo sobre calor direto por 10 minutos para selar e derreter gordura superficial.",
      "Mova para calor indireto com a tampa fechada. Cozinhe por 90 a 120 minutos para temperatura interna de 52 °C (malpassado) — prime rib exige cozimento lento.",
      "A crosta de sal endurece e protege a carne, funcionando como um forno de sal natural.",
      "Descanse 20 minutos mínimo cobrindo com pano limpo. Quebre a crosta de sal na mesa para apresentação dramática. Fatie entre os ossos."
    ],
    tips: [
      "Crosta de sal regula a temperatura e protege a carne — resulta em cozimento mais uniforme.",
      "Cozimento indireto é obrigatório para peças grandes — calor direto carbonizaria o exterior.",
      "52 °C malpassado para prime rib — bem cortado com gordura marmoreada, comer bem passado é desperdício."
    ]
  },
  {
    name: "Flat Iron Steak com Pesto de Rúcula 📋", emoji: "🥩", region: "US", estimatedCost: "low", 
    description: "Corte americano de paleta com pesto espesso de rúcula e nozes",
    category: "Grelhados",
    type: "dinner",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 12,
    servings: 2,
    ingredients: [
      "2 flat iron steaks (~250 g cada)",
      "PESTO DE RÚCULA: rúcula + nozes + alho + parmesão + azeite + limão",
      "sal grosso, pimenta-do-reino"
    ],
    instructions: [
      "Prepare o pesto de rúcula: processe a rúcula no processador com nozes levemente tostadas, alho cru, parmesão e azeite. A rúcula crua dá pungência ao pesto. Ajuste acidez com limão.",
      "O flat iron tem uma linha de nervo no centro que separa os dois músculos — muita vezes vem já removida na versão americana. Se presente, marque para fatiamento posterior.",
      "Tempere com sal grosso e pimenta generosamente. Deixe 20 minutos em temperatura ambiente.",
      "Frigideira de ferro fundido a temperatura máxima. Sele por 3 minutos sem mexer — o flat iron tem pouca gordura superficial mas muito marmoreado interno.",
      "Vire uma vez: mais 3 minutos para malpassado. Temperatura interna: 52 a 55 °C.",
      "O flat iron é um corte com grão laxo — não exige marinada e tem sabor intenso naturalmente.",
      "Descanse 5 minutos numa grade. Fatie contra as fibras em ângulo de 45° — fatias em diagonal são mais longas e apresentação mais elegante.",
      "Disponha as fatias em leque. Sirva com pesto de rúcula ao lado ou como caminho de molho embaixo das fatias."
    ],
    tips: [
      "Flat iron é um dos cortes mais subestimados — sabor próximo ao filé mignon por preço muito menor.",
      "Grão laxo significa fatiar contra as fibras é ainda mais importante que em outros cortes.",
      "Pesto de rúcula em vez de manjericão traz pungência que complementa a carne."
    ]
  },
  {
    name: "Mexilhão Grelhado com Vinho Branco 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Mexilhões abertos na grelha com caldo aromático de vinho branco",
    category: "Grelhados",
    type: "snack",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    ingredients: [
      "1 kg mexilhões frescos (limpos e com barba removida)",
      "100 ml vinho branco seco",
      "manteiga e alho",
      "salsinha, limão",
      "pão rústico para servir"
    ],
    instructions: [
      "Limpe os mexilhões: esfregue as conchas com escovinha para remover incrustações e puxe a 'barba' (filamentos) com movimento firme para baixo e para fora.",
      "Descarte qualquer mexilhão com conchas quebradas ou que permaneça aberto — sinal de que já morreu e não é seguro para consumo.",
      "Aqueça uma frigideira larga ou panela rasa adequada para ir à brasa, com manteiga e alho fatiado.",
      "Despeje os mexilhões e em seguida o vinho branco. Tampa imediatamente — o vapor criado abrirá os mexilhões.",
      "Cozinhe por 3 a 5 minutos até todos abrirem. Descarte qualquer mexilhão que não abrir após esse tempo.",
      "Em alternativa, coloque diretamente sobre a grelha — em 2 a 4 minutos abrirão naturalmente com o calor da brasa.",
      "O líquido acumulado nas conchas abertas é o caldo mais saboroso — não descarte.",
      "Sirva na panela ou em tigelão, polvilhado com salsinha, gotas de limão e com muito pão rústico para absorver o caldo."
    ],
    tips: [
      "Mexilhão fechado ANTES de cozinhar = vivo e fresco. Aberto antes = descartar.",
      "Mexilhão fechado DEPOIS de cozinhar = descartar sempre. Indica que morreu antes de cozinhar.",
      "O líquido das conchas é puro sabor do mar — pão para absorver é obrigatório."
    ]
  },
  {
    name: "Peito de Frango Grelhado Recheado 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Peito de frango aberto e recheado com queijo e tomate seco, grelhado",
    category: "Grelhados",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 20,
    servings: 4,
    ingredients: [
      "4 peitos de frango grandes",
      "RECHEIO: mozzarella fatiada + tomate seco + manjericão + alho",
      "temperos: orégano + alho + limão + azeite + sal + pimenta",
      "palitos de dente para fechar"
    ],
    instructions: [
      "Abra o peito em borboleta: corte horizontalmente quase até o final sem separar, abra como livro. Bata levemente com martelo de carne para uniformizar a espessura — peito mais fino cozinha mais uniformemente.",
      "Tempere internamente e externamente com alho amassado, limão, orégano, azeite, sal e pimenta. Marine 30 minutos.",
      "Distribua o recheio sobre metade do peito aberto: fatias de mozzarella, tomate seco escorrido (não oleoso demais), folhas de manjericão e alho laminado.",
      "Dobre a outra metade sobre o recheio. Feche com 3 a 4 palitos de dente para não abrir durante a grelha.",
      "Grelhe em temperatura média — não alta. Peito recheado é mais espesso e precisa de calor moderado para cozinhar o interior sem queimar o exterior.",
      "Grelhe por 8 a 10 minutos de cada lado com grelha tampada se possível.",
      "Temperatura interna: 74 °C no centro da carne (não no recheio). O queijo estará completamente derretido.",
      "Retire os palitos antes de servir. Fatie em rodelas mostrando o recheio derretido. Sirva imediatamente."
    ],
    tips: [
      "Espessura uniforme no peito aberto é fundamental — use martelo de carne.",
      "Tomate seco oleoso em excesso deixa o recheio escorrer — escorra bem.",
      "Temperatura média (não alta) para peito recheado — calor intenso queima antes de cozinhar o interior."
    ]
  },
  {
    name: "Peixe Inteiro na Brasa com Ervas 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Técnica de assar peixe inteiro diretamente sobre brasa com ervas aromáticas",
    category: "Grelhados",
    type: "dinner",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "1 peixe fresco inteiro de 1,2 kg (garoupa, pampo ou robalo)",
      "limão fatiado, tomilho, alecrim, salsinha",
      "sal grosso, pimenta, azeite generoso",
      "alho fatiado"
    ],
    instructions: [
      "Eviscere o peixe se necessário. Lave e seque completamente por dentro e por fora — umidade é inimiga da crosta.",
      "Recheie a cavidade abdominal generosamente com fatias de limão, ramos de tomilho e alecrim, dentes de alho fatiados e salsinha — as ervas aromatizarão a carne durante o cozimento a vapor interno.",
      "Faça incisões diagonais dos dois lados de 1 cm de profundidade, espaçadas 3 cm. Isso acelera o cozimento, permite que temperos penetrem e cria pontos de crosta adicionais.",
      "Pincele generosamente com azeite por fora e dentro das incisões. Tempere com sal grosso por toda a superfície.",
      "Use grelha dupla de peixe (grade em forma de peixe) ou monte sobre duas barras de ferro paralelas para suporte total.",
      "Grelhe sobre brasa média a 15 cm por 8 a 10 minutos sem mover — deixe a crosta se firmar completamente.",
      "Vire com auxílio da grade dupla. Mais 8 a 10 minutos pelo outro lado.",
      "Peixe pronto: olho branco opaco, carne que escama facilmente com garfo, pele crocante que sai naturalmente. Sirva inteiro à mesa."
    ],
    tips: [
      "Peixe inteiro sempre fica mais suculento que filé — a espinha distribui calor e protege a carne.",
      "Grade dupla específica para peixe evita que quebre ao virar.",
      "Olho branco = peixe cozido. Olho ainda translúcido = cozinhar mais."
    ]
  },
  {
    name: "Batata Doce Assada na Brasa 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Batata doce assada diretamente nas brasas para doçura caramelizada",
    category: "Grelhados",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 5,
    cookTime: 50,
    servings: 4,
    ingredients: [
      "4 batatas doces médias inteiras (com casca)",
      "manteiga com ervas ou creme de leite",
      "flor de sal, pimenta",
      "cebolinha e queijo de cabra (opcional)"
    ],
    instructions: [
      "Lave bem as batatas doces esfregando a casca — ela será preservada durante o cozimento e pode ser comida.",
      "Fure as batatas com garfo em 6 a 8 pontos — isso permite que vapor saia e evita que estourem pelo acúmulo de pressão interna.",
      "Envolva cada batata individualmente em papel alumínio duplo — duas camadas protegem da carbonização excessiva.",
      "Separe a brasa a um lado criando espaço para as batatas. Enterre-as diretamente nas cinzas quentes ao lado da brasa — não no fogo direto.",
      "Cozinhe por 40 a 50 minutos, virando a cada 15 minutos com pinças. Menor = 40 min, maior = 60 min.",
      "Teste de cozimento: pressione a batata com pinças protegidas — deve ceder completamente como fruta madura. Garfo entra sem resistência.",
      "Retire das brasas com pinças. Deixe esfriar 5 minutos antes de abrir.",
      "Abra com faca ao meio. A carne será alaranjada e extremamente doce. Adicione manteiga com ervas, flor de sal e acompanhamentos desejados."
    ],
    tips: [
      "Cinzas quentes cozinham lentamente e uniformemente — melhor que brasa direta para batata.",
      "Papel alumínio duplo protege mas ainda permite calor das cinzas penetrar.",
      "Batata doce nas brasas tem sabor de caramelo natural — muito superior ao forno elétrico."
    ]
  },
  {
    name: "Queijo Coalho Grelhado 📋", emoji: "🍰", region: "INT", estimatedCost: "low", 
    description: "O queijo nordestino clássico em espeto grelhado até dourar",
    category: "Grelhados",
    type: "snack",
    difficulty: "fácil",
    prepTime: 5,
    cookTime: 8,
    servings: 4,
    ingredients: [
      "400 g de queijo coalho (cortado em palitos ou já em espeto)",
      "mel de abelha para finalizar",
      "orégano seco"
    ],
    instructions: [
      "Queijo coalho deve estar em temperatura ambiente antes de grelhar — saído da geladeira tende a não dourar uniformemente.",
      "Se não comprou em espeto, monte em palitos de madeira encaixando firmemente o queijo para não escorregar na grelha.",
      "Aqueça grelha ou frigideira a temperatura média — queijo coalho queima facilmente.",
      "Grelhe por 2 a 3 minutos de cada lado sem mover. O queijo tem ponto de fusão alto — não derrete, apenas forma crosta dourada.",
      "Observe: quando as bordas do queijo ficarem dourado-escuras e a superfície apresentar marcas de grelha, está pronto para virar.",
      "Vire uma única vez. Mais 2 minutos pelo outro lado.",
      "O queijo sairá levemente crocante por fora e cremoso-elástico por dentro com sabor tostado característico.",
      "Transfira para prato. Imediatamente regue mel de abelha por cima e polvilhe orégano seco. O contraste do mel doce com o queijo salgado e tostado é irresistível."
    ],
    tips: [
      "Queijo coalho não derrete — é indicado para grelha justamente por essa propriedade.",
      "Mel imediatamente ao sair da grelha enquanto quente — absorve melhor.",
      "Não exagere no calor — médio é suficiente para dourar sem queimar."
    ]
  },
  {
    name: "Pimentão Assado Recheado com Carne 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Pimentões coloridos recheados com carne moída na grelha",
    category: "Grelhados",
    type: "lunch",
    difficulty: "médio",
    prepTime: 25,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "4 pimentões grandes (vermelho e amarelo)",
      "RECHEIO: 400 g carne moída + cebola + alho + tomate + orégano + sal + pimenta",
      "queijo mozzarella para gratinar"
    ],
    instructions: [
      "Corte o topo dos pimentões preservando a tampa. Remova as sementes e membranas brancas internas sem danificar as paredes — elas devem ser estruturais para segurar o recheio.",
      "Prepare o recheio: refogue cebola e alho, adicione a carne moída e cozinhe desfazendo os grumos. Adicione tomate picado, orégano, sal e pimenta. Cozinhe até o recheio ficar mais seco — recheio muito úmido amolece o pimentão excessivamente.",
      "Pré-grelhe os pimentões vazios por 5 minutos sobre brasa média para amaciar levemente antes de rechear.",
      "Recheie cada pimentão apertando bem mas sem forçar as paredes. Finalize com mozzarella ralada por cima.",
      "Disponha na grelha em zona de calor indireto ou em travessa sobre a grelha. Taxa no pimentão médio-baixo para não queimar.",
      "Grelhe por 20 a 25 minutos com tampa fechada até os pimentões amolecerem completamente e o queijo derreter e dourar.",
      "Opcional: doure rapidamente no final em calor direto por 2 minutos para dar cor à base.",
      "Sirva com a tampa decorativa e arroz ao lado."
    ],
    tips: [
      "Recheio seco antes de usar é fundamental — úmido amolece o pimentão e vira sopa.",
      "Calor indireto é ideal para estruturas recheadas — direto queima antes de cozinhar o interior.",
      "Pimentão vermelho e amarelo são mais doces que o verde — melhor para esta receita."
    ]
  },
  {
    name: "Fraldinha Roul com Recheio de Alho 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Fraldinha enrolada com pasta de alho e ervas frescas assada na grelha",
    category: "Grelhados",
    type: "dinner",
    difficulty: "médio",
    prepTime: 30,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "1 kg fraldinha aberta em manta fina",
      "RECHEIO: pasta de alho tostado + salsinha + tomilho + pimenta + queijo feta",
      "barbante culinário para amarrar",
      "sal grosso, azeite"
    ],
    instructions: [
      "Peça ao açougueiro para abrir a fraldinha em manta plana ou faça você mesmo: corte paralelamente às fibras, abrindo como livro, até ter uma manta de 1 cm de espessura.",
      "Toste os dentes de alho inteiros em frigideira seca por 5 minutos virando até ficarem dourados e macios. Amasse com garfo formando pasta.",
      "Espalhe a pasta de alho uniformemente sobre a face interna da manta. Distribua salsinha e tomilho picados. Adicione feta desfarelado e pimenta.",
      "Enrole firmemente como rocambole, mantendo o preenchimento interno. Amarre com barbante culinário a cada 3 cm para manter a forma durante a grelha.",
      "Tempere o exterior do roulade com sal grosso e azeite.",
      "Grelhe sobre brasa média-alta por 5 a 6 minutos, virando regularmente para dourar todos os lados uniformemente.",
      "Mova para calor indireto e termine o cozimento por mais 15 a 20 minutos com tampa fechada — temperatura interna: 60 °C.",
      "Descanse 10 minutos antes de remover o barbante e fatiar em rodelas de 2 cm mostrando o espiral interno."
    ],
    tips: [
      "Amarre a cada 3 cm — mais espaçado e o roulade deforma durante o cozimento.",
      "Dois momentos de calor: direto para crosta, indireto para cozimento interno.",
      "Recheio de alho tostado (não cru) é mais suave e não queima durante o cozimento."
    ]
  },
  {
    name: "Abacaxi Caramelizado com Canela e Sorvete 📋", emoji: "🍰", region: "INT", estimatedCost: "low", 
    description: "Abacaxi grelhado com especiarias transformado em sobremesa",
    category: "Grelhados",
    type: "snack",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 10,
    servings: 4,
    ingredients: [
      "1 abacaxi médio maduro (cortado em rodelas de 2 cm)",
      "50 g açúcar mascavo",
      "1 col chá canela em pó",
      "noz-moscada, pimenta do reino levemente",
      "manteiga, sorvete de creme para servir"
    ],
    instructions: [
      "Descasque e corte o abacaxi em rodelas de 2 cm. Remova o miolo central se desejar, mas a rodela inteira é mais resistente ao calor.",
      "Misture açúcar mascavo, canela, noz-moscada e uma pitada de pimenta-do-reino — o contraste da pimenta com o doce é surpreendente.",
      "Passe levemente manteiga na superfície de cada rodela. Em seguida, passe pela mistura de açúcar especia pressionando levemente para aderir.",
      "Grelhe em frigideira de ferro aquecida a temperatura média-alta por 3 minutos sem mover — o açúcar caramelizará criando uma crosta escurecida perfumada.",
      "Vire com cuidado — a rodela está quente e o caramelo pode grudar. Mais 2 a 3 minutos pelo outro lado.",
      "O abacaxi ficará dourado-escuro com caramelização profunda. A bromelina da fruta também amolece durante o calor.",
      "Transfira para prato aquecido. Sirva de imediato com bola de sorvete de creme por cima.",
      "O contraste quente x frio, doce x ácido, cremoso x tostado é o que faz essa sobremesa simples ser memorável."
    ],
    tips: [
      "Abacaxi maduro tem mais açúcar natural e carameliza melhor — abacaxi verde não funciona igual.",
      "Pimenta-do-reino no açúcar de tempero é o segredo que muda a sobremesa.",
      "Serve imediatamente — sorvete sobre fruta quente deve ser servido na hora."
    ]
  },
  {
    name: "Costeleta de Borrego ao Alecrim 📋", emoji: "🍳", region: "INT", estimatedCost: "low", 
    description: "Costeletas de borrego jovem marinadas em alecrim e lentamente grelhadas",
    category: "Grelhados",
    type: "dinner",
    difficulty: "médio",
    prepTime: 60,
    cookTime: 15,
    servings: 4,
    ingredients: [
      "8 costeletas de borrego jovem (lamb chops)",
      "MARINADA: alecrim + alho + azeite + mostarda + raspas de limão + sal + pimenta",
      "molho de menta para acompanhar"
    ],
    instructions: [
      "Costeletas de borrego jovem são mais macias e de sabor mais suave que cordeiro adulto — bom ponto de entrada para quem nunca provou.",
      "Prepare a marinada: pique alecrim finamente, amasse alho, misture com azeite, mostarda e raspas de limão. A mostarda funciona como emulsificante e adiciona nota aromática.",
      "Marine as costeletas por 1 hora — não mais que 4 horas. Costeletas são finas e marinada longa modifica demais a textura.",
      "Retire e escorra o excesso de marinada. Tempere com sal e pimenta.",
      "Grelha em temperatura alta: costeletas finas cozinham muito rápido — 2 a 3 minutos cada lado para malpassado-ao ponto.",
      "A gordura das bordas deve dourar e criar uma leve crosta — é o sabor característico do borrego.",
      "Temperatura interna: 55 a 60 °C. Borrego é melhor ao ponto — bem passado perde toda a suculência e sabor característico.",
      "Descanse 3 minutos. Sirva com molho de menta fresca, cuscuz marroquino e legumes assados."
    ],
    tips: [
      "Costeleta de borrego é fina — controle rigoroso do tempo: 2 a 3 min por lado máximo.",
      "Gordura lateral do borrego deve dourar — é onde está grande parte do sabor característico.",
      "Molho de menta é o acompanhamento clássico britânico-australiano para o borrego."
    ]
  },
  {
    name: "Sardinha Fresca na Brasa 📋", emoji: "🥩", region: "BR", estimatedCost: "low", 
    description: "Sardinhas frescas inteiras grelhadas na brasa — tradição portuguesa e brasileira",
    category: "Grelhados",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 10,
    servings: 4,
    ingredients: [
      "1,5 kg sardinhas frescas inteiras",
      "sal grosso abundante",
      "azeite extravirgem",
      "coentro ou salsinha",
      "limão"
    ],
    instructions: [
      "Sardinhas frescas não precisam de limpeza interna para preparo na brasa — as entranhas contribuem para o sabor característico. Lave apenas externamente.",
      "Seque com papel toalha. Salgue generosamente com sal grosso por fora e por dentro da guelra — a quantidade de sal parece excessiva mas parte escorrerá.",
      "Regue azeite por cima e deixe marinar 15 minutos no sal.",
      "Grelha deve estar muito quente e limpa. Pincele a grade com óleo para sardinha não grudar.",
      "Grelhe por 3 a 4 minutos cada lado em calor alto. A sardinha está pronta quando a pele estiver crocante e a carne ao lado da espinha central sair facilmente.",
      "Não vire mais de uma vez — sardinha fresca é delicada e desmancha facilmente.",
      "Para verificar o cozimento: a carne deve estar opaca até o osso central e se soltar facilmente com garfo.",
      "Sirva inteira na travessa com coentro fresco, limão cortado e azeite cru. Pão rústico é fundamental para enxugar os sucos."
    ],
    tips: [
      "Sardinha fresca tem sabor completamente diferente da enlatada — não substitua.",
      "Sal grosso abundante cria crosta e remove excesso de umidade da pele.",
      "A gordura da sardinha que pinga na brasa cria fumaça aromática que perfuma a carne."
    ]
  },
  {
    name: "Frango Inteiro no Espeto com Limão 📋", emoji: "🍗", region: "INT", estimatedCost: "low", 
    description: "Frango girando no espeto, lentamente dourado por todos os lados",
    category: "Grelhados",
    type: "lunch",
    difficulty: "difícil",
    prepTime: 60,
    cookTime: 90,
    servings: 4,
    ingredients: [
      "1 frango caipira inteiro de 1,5 kg",
      "MARINADA INTERNA: manteiga + alho + limão + tomilho + pimenta",
      "EXTERNA: azeite + sal grosso + páprica",
      "espeto giratório (rotisserie)"
    ],
    instructions: [
      "Marine internamente: derreta manteiga com alho e tomilho. Separe a pele do peito com os dedos sem rasgar. Introduza a manteiga aromatizada debaixo da pele uniformemente.",
      "Recheie a cavidade com limão cortado, tomilho e alho — durante o cozimento, o vapor aromático circulará internamente.",
      "Amarre as pernas com barbante culinário para compactar. Pressione as asas contra o corpo e amarre também — peças soltas giram irregularmente.",
      "Marine externamente com azeite, sal grosso e páprica por pelo menos 1 hora.",
      "Espete o frango no espeto rotisserie passando pelo centro perfeitamente — equilíbrio correto garante rotação uniforme.",
      "Grelhe no espeto girando continuamente a temperatura média sobre brasa indireta. O frango constantemente banhado pela própria gordura.",
      "Cozinhe por 80 a 90 minutos. A cada 20 minutos, besunte com os sucos que escorreram para a bandeja coletora.",
      "Temperatura interna da coxa: 74 °C, do peito: 72 °C. A pele estará uniformemente dourada por todos os lados. Descanse 15 minutos."
    ],
    tips: [
      "Manteiga sob a pele do peito protege o músculo magro e garante suculência.",
      "Equilíbrio no espeto é crucial — peso irregular trava o motor ou faz o frango girar erraticamente.",
      "Basting com os sucos coletados intensifica a crosta a cada meia hora."
    ]
  },
  {
    name: "Tomate Grelhado com Gorgonzola 📋", emoji: "🍰", region: "INT", estimatedCost: "low", 
    description: "Tomates grandes grelhados com queijo gorgonzola derrretendo",
    category: "Grelhados",
    type: "snack",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    ingredients: [
      "4 tomates grandes e firmes (caqui ou italiano)",
      "100 g gorgonzola ou queijo azul",
      "azeite, orégano fresco",
      "nozes para crocância",
      "mel e pimenta-do-reino"
    ],
    instructions: [
      "Escolha tomates firmes — muito maduros desmancharão na grelha. Corte ao meio horizontalmente.",
      "Com colher, remova levemente algumas sementes e o gel interno — cria espaço para o queijo e remove excesso de umidade.",
      "Regue azeite, tempere com sal e pimenta. Deixe 10 minutos.",
      "Grelhe com o lado cortado para baixo em temperatura média-alta por 5 minutos — as sementes caramelizarão formando sabor intenso.",
      "Vire com cuidado. No lado aberto, coloque pedaços de gorgonzola. Feche a grelha ou tampe para derreter o queijo.",
      "Mais 3 a 5 minutos até gorgonzola derreter e levemente dourar — o calor suave do gorgonzola derretido penetra no tomate assado.",
      "O tomate estará macio mas manterá a forma — não desmanchado.",
      "Finalize com nozes tostadas grosseiramente picadas, fio de mel, orégano fresco e pimenta extra."
    ],
    tips: [
      "Tomate firme é essencial — maduro demais não suporta a estrutura na grelha.",
      "Gorgonzola com mel é combinação clássica — o doce equilibra o picante do queijo azul.",
      "Como entrada vegetariana sofisticada o tomate grelhado surpreende os convidados."
    ]
  }
];
