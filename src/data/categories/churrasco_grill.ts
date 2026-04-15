import { Recipe } from "@/types/friggo";

export const receitasChurrasco: Recipe[] = [
  {
    id: "churras-001",
    name: "Picanha na Brasa 📋", emoji: "🥩", region: "BR", estimatedCost: "low", 
    description: "A rainha do churrasco brasileiro na brasa na espicha",
    category: "Churrasco",
    type: "dinner",
    prepTime: 10,
    cookTime: 30,
    difficulty: "médio",
    servings: 6,
    ingredients: [
      "1 peça de picanha (1,2-1,5kg com gordura)",
      "Sal grosso abundante",
      "Brasa de carvão"
    ],
    steps: [
      "Com uma faca afiada, faça cortes em xadrez na gordura da picanha com espaçamento de 2 cm, cuidando para não atingir a carne — isso ajuda a gordura a derreter uniformemente e evita que a peça entorte na brasa.",
      "Cubra toda a peça generosamente com sal grosso, massageando bem na carne e na gordura — o sal grosso sela a superfície e cria a crosta característica do churrasco brasileiro.",
      "Espete a picanha no espeto em posição curvada (formato meia-lua), com a gordura voltada para baixo — isso permite que a gordura derreta e regue a carne naturalmente durante o cozimento.",
      "Posicione o espeto sobre a brasa forte e deixe a gordura para baixo por 10–15 minutos, até ela derreter bastante e a superfície da carne começar a selar com uma crosta dourada.",
      "Vire o espeto para que a face da carne (sem gordura) fique voltada para a brasa e sele por mais 10 minutos, até formar uma camada rosada uniformemente.",
      "Verifique a temperatura interna com um termômetro: 52–55°C para mal passado, 57–60°C para ao ponto, e 65°C para bem passado — retire do fogo assim que atingir o ponto desejado.",
      "Retire da espeto, deixe descansar sobre uma tábua por 5 minutos para que os sucos se redistribuam, depois fatie em cortes perpendiculares às fibras, com espessura de 1–2 cm."
    ],
    tips: [
      "Gordura para baixo primeiro para derreter e temperar naturalmente",
      "Temperatura alta cria a crosta; temperatura média termina o cozimento"
    ]
  },
  {
    id: "churras-002",
    name: "Costelinha de Porco ao Mel e Mostarda 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Costelinhas caindo do osso com glaze adocicado",
    category: "Churrasco",
    type: "dinner",
    prepTime: 20,
    cookTime: 180,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "1kg de costela de porco",
      "3 colheres de mel",
      "2 colheres de mostarda Dijon",
      "2 colheres de shoyu",
      "Alho, cebola em pó, páprica",
      "Sal e pimenta"
    ],
    steps: [
      "Vire as costelinhas para o lado interno e puxe a membrana fina prateada que cobre os ossos — use um papel toalha para pegar bem e retire-a completamente, pois ela impede a maciez e a absorção de tempero.",
      "Misture 2 colheres de sal, 1 de pimenta preta moída, 1 de alho em pó, 1 de páprica defumada e esfregue por toda a superfície da costela, pressionando para entrar nos sulcos entre os ossos.",
      "Embrulhe as costelinhas firmemente em folha de papel alumínio com o lado mais brilhante voltado para dentro, formando um pacote bem vedado. Leve ao forno pré-aquecido a 130°C e asse por 2,5 horas — a técnica low & slow desfaz o colágeno e torna a carne extremamente macia.",
      "Enquanto as costelas assam, misture 3 colheres de mel, 2 de mostarda Dijon, 2 de shoyu e uma pitada de pimenta até obter um glaze homogêneo e brilhante.",
      "Retire as costelas do forno, abra cuidadosamente o alumínio (cuidado com o vapor quente) e vire as costelinhas com a parte carnuda para cima. Pincele generosamente o glaze por toda a superfície.",
      "Volte ao forno sem cobrir a 200°C por 20 minutos, ou até o glaze caramelizar e ficar escuro e brilhante. As costelinhas devem soltar facilmente dos ossos ao tracionar com um garfo."
    ],
    tips: [
      "Low & slow é o segredo das costelas macias que soltam facilmente do osso",
      "O glaze aplicado só no final não queima"
    ]
  },
  {
    id: "churras-003",
    name: "Hamburguer Artesanal 200g 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Hamburguer suculento com blend de carnes e cheddar",
    category: "Churrasco",
    type: "dinner",
    prepTime: 20,
    cookTime: 10,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "800g de carne bovina com 20% de gordura (patinho+fraldinha)",
      "Queijo cheddar",
      "Pão de hamburguer brioche",
      "Bacon crocante",
      "Cebola grelhada",
      "Alface, tomate e molho especial"
    ],
    steps: [
      "Pique a carne na faca em pedaços grosseiros de aproximadamente 1 cm, ou passe pelo moedor uma única vez em disco grosso — nunca use processador, pois emulsiona demais a gordura e o hamburguer fica denso e seco.",
      "Adicione sal e pimenta preta moída na hora e misture delicadamente com as mãos por no máximo 30 segundos — misturar demais ativa as proteínas e deixa a textura borrachuda.",
      "Divida em porções de 200g e modele discos com altura de 2 cm, pressionando o centro levemente com o polegar para criar uma leve cavidade — isso evita que o hamburguer aboamine ao grelhar.",
      "Aqueça a chapa ou frigideira de ferro em fogo máximo até começar a fumaçar levemente. Coloque os hamburgeres sem engordurar e não mexa. Grelhe por 3–4 minutos até que a parte lateral mude de cor até a metade.",
      "Vire uma única vez, coloque o queijo cheddar por cima imediatamente e tampe a frigideira por 1–2 minutos para que o queijo derreta completamente no vapor.",
      "Monte o hamburguer no pão brioche levemente tostado com alface, tomate, bacon crocante, cebola grelhada e molho especial — sirva imediatamente para que o pão não umedeça."
    ],
    tips: [
      "Carne não pode ter menos de 20% de gordura para ficar suculento",
      "Smash burger: espalhe na chapa quente para máxima Maillard"
    ]
  },
  {
    id: "churras-004",
    name: "Alcatra ao Molho de Vinho 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description: "Alcatra maturada grelhada com molho de vinho reduzido",
    category: "Churrasco",
    type: "dinner",
    prepTime: 10,
    cookTime: 20,
    difficulty: "médio",
    servings: 4,
    ingredients: [
      "800g de alcatra em bifes grossos",
      "250ml de vinho tinto seco",
      "1 cebola picada",
      "2 dentes de alho",
      "Manteiga",
      "Tomilho",
      "Sal e pimenta"
    ],
    steps: [
      "Retire os bifes da geladeira pelo menos 30 minutos antes de cozinhar para que atinjam temperatura ambiente — bifes frios entram em choque térmico e ficam duros. Seque-os com papel toalha antes de temperar com sal e pimenta.",
      "Aqueça uma frigideira de fundo grosso (ferro ou inox) em fogo alto por 3–4 minutos até começar a soltar fumaça. Adicione uma colher de azeite, coloque os bifes e NÃO mexa — deixe selar por 3 minutos para formar uma crosta marrom-escura e saborosa.",
      "Vire os bifes, sele por mais 2–3 minutos dependendo da espessura desejada, depois transfira para uma tábua e cubra frouxamente com papel alumínio. Deixe descansar por 5 minutos — esse passo é indispensável.",
      "Reduza o fogo para médio e na mesma frigideira (não lave — o fundo queimado é ouro), adicione a cebola picada e refogue por 3–4 minutos, mexendo, até amolecer e dourar nas bordas.",
      "Adicione o alho e refoue por 30 segundos. Despeje o vinho tinto e raspe vigorosamente o fundo com uma colher de pau — esse processo (deglaçar) dissolve o caramelo de sabor desenvolvido pela carne.",
      "Adicione o tomilho e deixe o molho ferver em fogo médio, reduzindo pela metade (cerca de 5 minutos), até espessar ligeiramente e o álcool evaporar totalmente.",
      "Fora do fogo, adicione 1–2 colheres de manteiga gelada e gire a frigideira para que derreta e emulsifique no molho, dando brilho e cremosidade. Acerte o sal.",
      "Fatie os bifes contra as fibras e sirva regados com o molho ainda quente."
    ],
    tips: [
      "O fundo caramelizado da frigideira (fond) é o sabor do molho",
      "Manteiga no final dá brilho e redondeza ao molho"
    ]
  },
  {
    id: "churras-005",
    name: "Espetinho de Coração de Galinha 📋", emoji: "🍝", region: "INT", estimatedCost: "low", 
    description: "Coração grelhado no espeto estilo churrascaria",
    category: "Churrasco",
    type: "snack",
    prepTime: 20,
    cookTime: 15,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "500g de coração de galinha",
      "Sal grosso",
      "Alho espremido",
      "Pimenta do reino",
      "Limão",
      "Azeite"
    ],
    steps: [
      "Lave bem os corações de galinha em água corrente e remova o excesso de gordura externa e os vasos sanguíneos visíveis com uma tesoura — isso reduz o sabor forte e amargoso.",
      "Prepare a marinada: misture 3 dentes de alho amassados, suco de 1 limão, sal, pimenta do reino moída, azeite e opcionalmente uma pitada de páprica defumada. Mergulhe os corações e deixe marinar por mínimo 30 minutos (ou até 2 horas na geladeira para mais sabor).",
      "Enfile os corações nos espetinhos de metal ou bambu pré-molhado, alternando a direção para ficarem lado a lado — não empilhe mais de 8–10 por espeto para garantir cozimento uniforme.",
      "Posicione os espetos sobre brasa bem forte ou frigideira de ferro em fogo máximo pré-aquecida. A temperatura alta é crucial para grelhar rápido e manter a textura macia no interior.",
      "Vire os espetos a cada 2–3 minutos durante 12–15 minutos no total, até que os corações estejam completamente opacos por fora e com marcas de grelha dourada-escura — coraciones rosados por dentro são normais e seguros.",
      "Sirva imediatamente com gomos de limão e farinha de mandioca ou vinagrete para acompanhar."
    ],
    tips: [
      "Coração bem limpo tem sabor mais suave",
      "Fogo alto garante exterior grelhado e interior macio"
    ]
  },
  {
    id: "churras-006",
    name: "Maionese Caseira de Limão 📋", emoji: "🍳", region: "INT", estimatedCost: "low", 
    description: "Acompanhamento clássico do churrasco feito em casa",
    category: "Churrasco",
    type: "snack",
    prepTime: 10,
    cookTime: 0,
    difficulty: "fácil",
    servings: 10,
    ingredients: [
      "2 ovos inteiros (temperatura ambiente)",
      "200ml de óleo vegetal",
      "Suco de 1 limão",
      "1 colher de mostarda",
      "Sal e pimenta"
    ],
    steps: [
      "Certifique-se de que os ovos estão em temperatura ambiente — ovos gelados dificultam a emulsão. Coloque os 2 ovos inteiros no copo do liquidificador ou processador junto com a mostarda, o suco de limão, o sal e a pimenta. Bata por 30 segundos até tudo misturar.",
      "COM O LIQUIDIFICADOR LIGADO em velocidade baixa ou média, adicione o óleo vegetal em um fio extremamente fino e contínuo — o segredo da maionese caseira é a incorporação lentíssima do óleo para criar a emulsão estável.",
      "Continue adicionando o óleo lentamente, aumentando um pouco o volume quando a mistura já estiver cremosa e esbranquiçada — o processo total leva 3–5 minutos para os 200ml de óleo.",
      "Quando toda a maionese estiver firme e brilhante, prove e acerte com mais sal, limão ou pimenta a gosto. Se ficar muito espessa, adicione 1 colher de água morna e bata rapidamente.",
      "Transfira para um pote com tampa e refrigere por pelo menos 30 minutos antes de servir — a maionese caseira dura até 5 dias na geladeira."
    ],
    tips: [
      "Ovos em temperatura ambiente e óleo em fio fino são fundamentais para emulsionar",
      "Falhar na emulsão? Adicione um ovo novo e vá batendo com a mistura quebrada"
    ]
  },
  {
    id: "churras-007",
    name: "Linguiça de Toscana Grelhada 📋", emoji: "🍖", region: "INT", estimatedCost: "low", 
    description: "Linguiça toscana suculenta na grelha com vinagrete",
    category: "Churrasco",
    type: "dinner",
    prepTime: 5,
    cookTime: 20,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "800g de linguiça toscana",
      "Para o vinagrete: tomate, cebola, pimentão, vinagre, azeite",
      "Salsinha",
      "Sal e pimenta"
    ],
    steps: [
      "Prepare o vinagrete com pelo menos 1 hora de antecedência: pique o tomate, a cebola e o pimentão em cubinhos de 0,5 cm, transfira para uma tigela e tempere com 3 colheres de vinagre de vinho, 3 de azeite, sal e salsinha frescas picada. Misture e deixe descansar para os sabores se integrarem.",
      "Faça 6–8 furos na linguiça com um garfo ou faca, distribuídos por toda a extensão — esses furos permitem que parte da gordura escorra sem que a tripa estoure, mantendo a linguiça suculenta e evitando labaredas excessivas na brasa.",
      "Posicione a linguiça em grelha sobre brasa de intensidade média — fogo alto demais queima a tripa antes que o interior cozinhe. Vire a cada 3–4 minutos para dourar por igual.",
      "Grelhe por 18–20 minutos no total, até a tripa estar bem dourada e crocante e o suco interno borbulhar nos furos quando pressionada. Sirva imediatamente com o vinagrete, pão francês ou farofa."
    ],
    tips: [
      "Furar levemente permite que a gordura escorra sem perder suculência",
      "Vinagrete feito horas antes fica mais saboroso"
    ]
  },
  {
    id: "churras-008",
    name: "Brisket Defumado (Peito Bovino) 📋", emoji: "🥩", region: "US", estimatedCost: "low", 
    description: "Peito bovino low & slow defumado American BBQ style",
    category: "Churrasco",
    type: "dinner",
    prepTime: 20,
    cookTime: 480,
    difficulty: "difícil",
    servings: 8,
    ingredients: [
      "2kg de peito bovino com gordura",
      "Sal kosher e pimenta do reino",
      "Madeira para defumar (hickory ou cerejeira)",
      "Papel manteiga"
    ],
    steps: [
      "Na véspera, cubra toda a peça de brisket uniformemente com uma mistura de sal grosso e pimenta preta moída na proporção 1:1, pressionando para aderir ao tecido conjuntivo — use generosamente, pois a peça é grande e o tempero forma a casca (bark).",
      "Deixe a carne temperada descoberta na geladeira overnight (8–12 horas) para que o sal penetre nas fibras e a superfície seque, o que favorece a formação de casca durante a defumação.",
      "No dia seguinte, deixe a carne atingir temperatura ambiente por 1 hora. Pré-aqueça o defumador ou churrasqueira com sistema de calor indireto a 110–120°C constante. Adicione lenha ou lascas de hickory ou cerejeira para defumar. Coloque o brisket com a gordura para cima e monitore a temperatura.",
      "Defume a 110–120°C por 5–8 horas, monitorando a temperatura interna. Quando ela atingir 65–70°C, a carne entrará na 'fase platô' onde pode ficar horas sem subir — isso é normal e acontece pela evaporação da umidade.",
      "Para superar o platô, aplique a 'Texas Crutch': embrulhe apertadamente em 2 camadas de papel manteiga resistente ao calor. Volte ao defumador e continue até a temperatura interna atingir 93–96°C — neste ponto o colágeno se transformou em gelatina e a carne estará extremamente macia.",
      "Retire do defumador, deixe ainda embrulhado dentro de uma caixa de isopor (cooler) por 2–4 horas — esse descanso prolongado é fundamental para redistribuição dos sucos e melhora ainda mais a textura.",
      "Na hora de servir, desembrulhe sobre uma tábua e fatie perpendicular às fibras em fatias de 1 cm de espessura — o corte correto é crucial, pois a peça tem fibras em direções opostas na parte plana e na ponta."
    ],
    tips: [
      "A técnica 'texas crutch' (embrulhar) ajuda a passar a fase platô de temperatura",
      "Brisket é o prato mais técnico do churrasco americano"
    ]
  },
  {
    id: "churras-009",
    name: "Fraldinha com Chimichurri 📋", emoji: "🍖", region: "LATAM", estimatedCost: "low", 
    description: "Fraldinha Argentina na chapa com molho chimichurri",
    category: "Churrasco",
    type: "dinner",
    prepTime: 15,
    cookTime: 15,
    difficulty: "fácil",
    servings: 4,
    ingredients: [
      "800g de fraldinha grossa",
      "Para chimichurri: salsinha, orégano, alho, vinagre de maçã, azeite, pimenta vermelha",
      "Sal grosso"
    ],
    steps: [
      "Prepare o chimichurri com antecedência: pique finamente um maço de salsinha, orégano fresco (ou seco), 3 dentes de alho e pimenta vermelha fresca ou calabresa a gosto. Use a faca — o processador destrói as texturas.",
      "Misture as ervas picadas com 4 colheres de azeite extravirgem de qualidade, 2 de vinagre de maçã, 1 colher de sal, pimenta preta moída e uma pitada de açúcar. Misture bem e reserve — o ideal é fazer pelo menos 2 horas antes.",
      "Deixe o chimichurri descansar em temperatura ambiente por no mínimo 30 minutos para que os sabores se integrem — quanto mais tempo, mais complexo o sabor.",
      "Aqueça a brasa até estar bem forte e brilhante (sem labaredas). Tempere a fraldinha com sal grosso apenas. Coloque a peça inteira na grelha e sele por 4–5 minutos de cada lado sem mexer, criando marcas de grelha pronunciadas.",
      "Continue virando a fraldinha a cada 3–4 minutos, selando todos os lados até a temperatura interna atingir 50–55°C para ao ponto. Retire e deixe descansar 5 minutos sobre tábua.",
      "Corte a fraldinha em tiras finas (5mm) estritamente contra as fibras longas — esse corte transforma o corte de textura difícil em pedaços macios. Disponha em travessa e sirva com o chimichurri ao lado."
    ],
    tips: [
      "Fraldinha precisa ser cortada em tiras finas contra as fibras longas",
      "Chimichurri argentino não tem tomate — apenas ervas, alho, vinagre"
    ]
  },
  {
    id: "churras-010",
    name: "Costela de Boi no Fogo de Chão 📋", emoji: "🥩", region: "INT", estimatedCost: "low", 
    description:
      "Costela janelinha assada lentamente no fogo com galho de alecrim",
    category: "Churrasco",
    type: "dinner",
    prepTime: 30,
    cookTime: 240,
    difficulty: "difícil",
    servings: 8,
    ingredients: [
      "2kg de costela janelinha",
      "Sal grosso",
      "Alho",
      "Ramos de alecrim",
      "Brasa baixa e constante"
    ],
    steps: [
      "Na véspera ou pela manhã, esfregue sal grosso generosamente por toda a superfície da costela, massageando bem entre os ossos e em todos os lados — o sal vai extrair parte da umidade e depois ser re-absorvido, temperando as fibras internas.",
      "Adicione alho cortado em lâminas finas espetadas nos sulcos da carne e ramos de alecrim fresco distribuídos por toda a peça. Se desejar, adicione pimenta do reino e páprica defumada.",
      "Configure o fogo de chão ou churrasqueira para calor indireto e moderado — a brasa deve ser abundante mas o braseiro não pode estar embaixo direto da carne. Posicione a espicha bem alta, a pelo menos 50–60 cm das brasas.",
      "Asse pacientemente por 3–4 horas, mantendo a brasa constante e adicionando carvão conforme necessário. A temperatura da carne deve subir lentamente — esse processo desfaz o colágeno e transforma a costela em algo extremamente macio.",
      "Verifique o ponto a cada hora: quando os ossos começarem a se separar visivelmente da carne e um pedaço se soltar facilmente com os dedos, a costela está pronta. A superfície deve estar com uma casca escura e perfumada."
    ],
    tips: [
      "Paciência é a principal qualidade do churrasqueiro de costela",
      "Calor indireto e constante é mais importante que a temperatura exata"
    ]
  },
  {
    id: "churras-011",
    name: "Pão de Alho Grelhado 📋", emoji: "🍖", region: "INT", estimatedCost: "low", 
    description: "Pão italiano recheado de manteiga de alho e ervas",
    category: "Churrasco",
    type: "snack",
    prepTime: 10,
    cookTime: 15,
    difficulty: "fácil",
    servings: 6,
    ingredients: [
      "1 pão italiano ou ciabatta",
      "100g de manteiga amolecida",
      "6 dentes de alho",
      "Salsinha e cebolinha",
      "Azeite",
      "Sal e orégano"
    ],
    steps: [
      "Deixe a manteiga em temperatura ambiente por 30 minutos até amolecer completamente. Misture em uma tigela a manteiga amolecida, 4–6 dentes de alho espremidos, salsinha picada, cebolinha, uma pitada de sal extra e orégano seco. Prove e acerte o tempero — essa manteiga deve ter sabor intenso e perfumado.",
      "Com uma faca de pão afiada, faça cortes paralelos a cada 3 cm no sentido transversal do pão italiano, sem cortar até a base — mantenha 1–2 cm de pão intacto na base para que o pão não se desintegre ao remover do alumínio.",
      "Use uma espátula ou colher para empurrar a manteiga de alho generosamente dentro de cada corte, garantindo que chegue até a base. Se sobrar manteiga, espalhe por cima do pão também.",
      "Embrulhe firmemente em papel alumínio com o lado brilhante voltado para dentro, dobrando as extremidades para vedar bem e evitar que vapor escape — o vapor interno é que cria o interior macio e úmido.",
      "Coloque sobre a grelha em calor médio da brasa ou no forno a 200°C por 10 minutos — o pão deve estar quente e a manteiga completamente derretida e fervendo levemente dentro do pacote.",
      "Abra o alumínio dobrando as bordas para baixo e deixe o pão descoberto por mais 5 minutos para que a superfície doure e fique crocante. Sirva imediatamente direto no alumínio para manter o calor."
    ],
    tips: [
      "Embrulhado em alumínio, o vapor cria o interior macio",
      "Destampar nos últimos minutos crocantiza a casca"
    ]
  },
  {
    id: "churras-012",
    name: "Ancho Argentino com Flor de Sal 📋", emoji: "🥩", region: "LATAM", estimatedCost: "low", 
    description: "Corte premium argentino simples com flor de sal",
    category: "Churrasco",
    type: "dinner",
    prepTime: 5,
    cookTime: 10,
    difficulty: "médio",
    servings: 2,
    ingredients: [
      "400g de ancho bovino (ojo de bife)",
      "Flor de sal",
      "Pimenta do reino moída na hora",
      "Manteiga",
      "Tomilho"
    ],
    steps: [
      "Retire o ancho da geladeira com exatamente 1 hora de antecipação para que a carne atinja temperatura ambiente uniforme — carne fria no centro cozinha de forma irregular e pode ficar fria no meio mesmo com exterior perfeito. Seque com papel toalha.",
      "Aqueça uma frigideira de ferro fundido ou de fundo espesso em fogo alto por 4–5 minutos — ela deve estar tão quente que uma gota d'água evapore instantaneamente. Não adicione óleo: a gordura do próprio corte é suficiente. Coloque o ancho e não mexa pelo menos 3 minutos para criar a crosta de Maillard marrom-profunda.",
      "Vire o corte e imediatamente adicione uma colher generosa de manteiga sem sal e 2–3 ramos de tomilho fresco. Incline ligeiramente a frigideira para acumular a manteiga derretida em um lado.",
      "Com uma colher, regue continuamente a superfície do ancho com a manteiga quente e perfumada ao tomilho — esse processo (basting) acelera o cozimento da superfície superior e adiciona sabor intenso a cada regada.",
      "Monitore a temperatura interna com um termômetro: 52°C para malpassado (rare), 57°C para ao ponto para mal (medium rare), 60°C para ao ponto. Retire imediatamente do fogo 2°C antes do alvo, pois a carne continua cozinhando com o calor residual.",
      "Transfira o ancho para uma grelha sobre tábua (não poça de suco) e deixe descansar por exatamente 5 minutos — esse descanso é indispensável para redistribuir os sucos, que sem ele escorrem todos ao primeiro corte.",
      "Finalize com uma pitada de flor de sal por cima (nunca beforess — o sal comum desidrata a superfície antes do cozimento) e pimenta do reino moída na hora generosa. Sirva inteiro ou fatiado grosso."
    ],
    tips: [
      "Descanse SEMPRE — os sucos se redistribuem",
      "Temperatura interna medida com termômetro é a forma mais precisa"
    ]
  }
];
