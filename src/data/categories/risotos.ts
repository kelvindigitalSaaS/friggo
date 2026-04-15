import { Recipe } from "@/types/friggo";

export const receitasRisotos: Omit<Recipe, "id" | "usesExpiringItems">[] = [
  {
    name: "Risoto Clássico Parmigiano 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Risoto clássico cremoso com parmesão — a técnica base de todos os risotos",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "300 g de arroz arbório ou carnaroli",
      "1 litro de caldo de legumes ou frango (QUENTE)",
      "1 xícara de vinho branco seco",
      "1 cebola pequena bem picada",
      "2 dentes de alho",
      "100 g de parmesão ralado fino",
      "50 g de manteiga gelada",
      "azeite, sal, pimenta"
    ],
    instructions: [
      "REGRA DE OURO: O caldo deve estar sempre quente em panela ao lado. Nunca adicione caldo frio.",
      "Refogue a cebola em azeite por 5 min sem dourar — deve ficar translúcida. Adicione o alho.",
      "Adicione o arroz cru e toste por 2 min, mexendo, até os grãos ficarem translúcidos nas bordas.",
      "Adicione o vinho branco. Mexa continuamente até absorver completamente — o álcool evapora.",
      "Adicione 1 concha de caldo quente. Mexa constantemente até absorver. Repita concha por concha.",
      "Continue por 18–20 min, sempre adicionando caldo e mexendo. O amido liberado cria a cremosidade.",
      "Prove o ponto: grão al dente (levemente resistente ao dente). Retire do fogo.",
      "MANTECATURA: Adicione manteiga gelada e parmesão. Mexa vigorosamente por 2 min para emulsionar. O risoto deve escorrer levemente do prato — essa é a consistência correta."
    ],
    tips: [
      "Caldo quente é obrigatório — frio para o cozimento e prejudica a cremosidade.",
      "Não lave o arroz — os amidos são o que cria a cremosidade.",
      "Mantecatura (incorporar a manteiga fria) cria a textura aveludada final."
    ]
  },
  {
    name: "Risoto de Cogumelos Funghi Secchi 📋", emoji: "🥣", region: "INT", estimatedCost: "high", 
    description:
      "Risoto intensamente saboroso com funghi porcini reidratado e shiitake",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "300 g arroz arbório",
      "30 g funghi porcini seco",
      "200 g shiitake fresco",
      "1 litro caldo de legumes",
      "1 xícara vinho branco",
      "100 g parmesão",
      "50 g manteiga gelada",
      "tomilho, cebola, alho, azeite"
    ],
    instructions: [
      "Reidrate o funghi em 300 ml de água morna por 20 min. Esprema, reserve a água de reidratação (filtrada — tem areia).",
      "Aqueça o caldo com a água do funghi (enriquece o sabor) em panela separada.",
      "Refogue cebola em azeite. Adicione o funghi reidratado picado e o shiitake fatiado. Cozinhe 5 min.",
      "Adicione o arroz. Toste 2 min. Adicione vinho e espere absorver.",
      "Continue com caldo quente, concha por concha, mexendo por 18 min.",
      "Adicione tomilho fresco durante o cozimento.",
      "No ponto al dente, retire do fogo. Incorpore a manteiga e o parmesão vigorosamente.",
      "Sirva imediatamente polvilhado com mais parmesão e tomilho."
    ],
    tips: [
      "Água de reidratação do funghi = caldo de cogumelo concentrado — use-a!",
      "Filtre bem a água do funghi, pois contém sedimentos.",
      "Para intensificar: adicione pasta de funghi ou extrato de cogumelo."
    ]
  },
  {
    name: "Risoto de Camarão ao Limão Siciliano 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Risoto fresco e aromático com camarão salteado e raspas de limão siciliano",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "300 g arroz arbório",
      "500 g camarão limpo",
      "raspas e suco de 2 limões sicilianos",
      "1 litro caldo de peixe ou camarão",
      "1 xícara vinho branco",
      "100 g parmesão",
      "manteiga, azeite, alho",
      "salsinha, sal, pimenta"
    ],
    instructions: [
      "Faça o caldo: ferva cascas e cabeças do camarão com alho e louro por 15 min. Coe e mantenha quente.",
      "Tempere os camarões com sal, pimenta e suco de limão. Reserve.",
      "Refogue alho em azeite. Adicione o arroz. Toste 2 min. Adicione vinho.",
      "Risoto base: adicione caldo concha por concha por 18 min mexendo.",
      "Nos últimos 3 min, saltei os camarões em frigideira separada com manteiga por 2–3 min.",
      "Incorpore raspas de limão no risoto. Retire do fogo. Manteiga e parmesão.",
      "Adicione os camarões salteados por cima.",
      "Sirva com salsinha picada e raspas extras de limão."
    ],
    tips: [
      "Caldo de casca de camarão é gratuito e transforma o risoto.",
      "Camarão saltado separado evita cozimento excessivo no risoto.",
      "Raspas de limão no final dão frescor — não cozinhem junto."
    ]
  },
  {
    name: "Risoto de Abóbora com Gorgonzola 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Doçura da abóbora equilibrada com a pungência do gorgonzola",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 35,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "300 g arbório",
      "400 g abóbora cabotiá",
      "150 g gorgonzola",
      "50 g manteiga",
      "100 ml vinho branco",
      "1 litro caldo legumes",
      "cebola, alho, sálvia, noz-moscada"
    ],
    instructions: [
      "Asse a abóbora em cubos a 200 °C por 20 min até caramelizar. Amasse metade em purê.",
      "Refogue cebola. Adicione o arbório, toste. Despeje o vinho.",
      "Risoto base com caldo por 18 min. Na metade, adicione o purê de abóbora.",
      "No ponto, retire do fogo. Adicione manteiga e metade do gorgonzola. Misture.",
      "O gorgonzola derrete parcialmente criando contraste de sabor.",
      "Sirva com pedaços de abóbora assada por cima, resto do gorgonzola e folhas de sálvia frita."
    ],
    tips: [
      "Abóbora caramelizada concentra o sabor doce.",
      "Gorgonzola entra no final para não superaquecer e amargar."
    ]
  },
  {
    name: "Risoto de Aspargos com Taleggio 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto primaveril com aspargos verdes e queijo italiano de casca lavada",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arroz arbório",
      "400 g aspargos verdes (pontas reservadas)",
      "150 g queijo taleggio ou brie (sem casca)",
      "1 litro caldo de legumes quente",
      "100 ml vinho branco",
      "50 g manteiga, cebola, alho, azeite"
    ],
    instructions: [
      "Separe as pontas dos aspargos dos talos. Cozinhe os talos em água fervente por 3 minutos, escorra e processe com um pouco de caldo — formará um purê verde vibrante que dará cor ao risoto.",
      "Reserve as pontas cortadas em metades para decoração e adição no final.",
      "Refogue a cebola em azeite até translúcida, sem dourar. Adicione o alho picado e refogue mais 1 minuto.",
      "Adicione o arroz arbório. Toste por 2 minutos mexendo, até os grãos ficarem translúcidos nas bordas — esse tostamento fecha a superfície e garante que o grão cozinhe por dentro sem desmanchar.",
      "Adicione o vinho branco e mexa até absorver completamente — o álcool evaporará deixando apenas o sabor.",
      "Continue com caldo quente: concha por concha, sempre mexendo e esperando absorção antes de adicionar a próxima. Processo de 16 a 18 minutos.",
      "Nos últimos 3 minutos, incorpore o purê de aspargos verdes — o risoto assumirá cor verde vibrante.",
      "Retire do fogo. Manteiga gelada e taleggio sem casca. Mexa vigorosamente por 2 minutos. Sirva com as pontas de aspargos grelhadas por cima."
    ],
    tips: [
      "Purê dos talos dá cor ao risoto e aproveita toda a parte que seria descartada.",
      "Taleggio derrete suavemente e dá cremosidade intensa sem acidez do parmesão.",
      "Pontas de aspargos cruas no final mantêm crocância e cor viva."
    ]
  },
  {
    name: "Risoto Nero de Tinta de Lula 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Risoto negro dramático com tinta natural de lula e frutos do mar",
    category: "Risotos",
    type: "dinner",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "400 g lulas (limpe e reserve a tinta)",
      "200 g camarão médio",
      "2 sachês de tinta de lula",
      "1 litro caldo de peixe",
      "100 ml vinho branco, alho, azeite",
      "50 g manteiga"
    ],
    instructions: [
      "Se usar lulas frescas, perfure o saco de tinta cuidadosamente sobre uma tigela. A tinta de lula tem sabor de mar concentrado e é o ingrediente central desta receita.",
      "Saltei as lulas em tiras em azeite e alho por 2 minutos em fogo alto. Reserve junto com os sucos da frigideira.",
      "Na mesma frigideira, refogue o alho, adicione o arroz e toste por 2 minutos.",
      "Adicione o vinho e mexa até absorver.",
      "Dissolva a tinta de lula (dos sachês ou natural) em algumas colheres de caldo quente. Adicione ao risoto no início do cozimento com caldo.",
      "Continue adicionando caldo quente concha por concha por 18 minutos. O risoto ficará gradativamente negro e dramático.",
      "Nos últimos 2 minutos, adicione os camarões crús — cozinharão no calor do risoto.",
      "Retire do fogo. Manteiga gelada sem parmesão — não usar queijo com frutos do mar na culinária italiana. Servir com salsinha picada e azeite limão."
    ],
    tips: [
      "Risoto nero é espetacular visualmente — ideal para impressionar convidados.",
      "Parmesão NUNCA com frutos do mar na culinária italiana — usar mantecatura apenas com manteiga.",
      "Tinta de lula em sachê é amplamente disponível em supermercados especializados."
    ]
  },
  {
    name: "Risoto de Frango com Açafrão 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto amarelo-dourado aromático com frango cozido ao vinho",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 35,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "400 g peito de frango em cubos",
      "1 pitada generosa açafrão em fios",
      "1 litro caldo de frango quente",
      "200 ml vinho branco",
      "100 g parmesão, 50 g manteiga",
      "cebola, alho, salsinha"
    ],
    instructions: [
      "Hidrate o açafrão em 3 colheres de caldo quente por 10 minutos mínimo. Açafrão precisa de calor para liberar os pignementos carotenóides e o aroma único.",
      "Sele os cubos de frango em azeite em temperatura alta por 3 minutos cada lado. Retire e reserve — adicionaremos no final para não cozinhar demais.",
      "Na mesma panela, refogue a cebola. Toste o arroz 2 minutos. Adicione o vinho.",
      "Adicione o açafrão hidratado com seu líquido — o risoto começará a ficar amarelo-dourado imediatamente.",
      "Continue com caldo quente concha por concha por 18 minutos, mexendo constantemente.",
      "Retire do fogo. Adicione o frango selado. Manteiga e parmesão — mantecatura vigorosa por 2 minutos.",
      "O risoto deve ter cor amarelo-alaranjada uniforme e aroma floral característico do açafrão de qualidade.",
      "Sirva com salsinha picada e raspas de casca de limão que complementam o açafrão."
    ],
    tips: [
      "Açafrão autêntico é caro mas incomparável — o falso (cúrcuma) dá cor mas não o aroma.",
      "Hidratação prévia do açafrão libera muito mais cor e aroma que adicionar seco.",
      "Frango vai no final — evita excesso de cozimento que tornaria a carne seca."
    ]
  },
  {
    name: "Risoto de Ervilhas e Presunto San Daniele 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risi e Bisi veneziano — ervilhas frescas com presunto cru",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "400 g ervilhas frescas (ou congeladas)",
      "100 g presunto San Daniele ou parma em fatias",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "100 g parmesão, manteiga",
      "cebola, salsinha"
    ],
    instructions: [
      "Use ervilhas frescas quando possível — a diferença de sabor com as congeladas é significativa. Descasque e reserve as vagens para fazer o caldo, enriquecendo-o com sabor.",
      "Cozinhe metade das ervilhas no caldo por 5 minutos, processe e volte ao caldo — caldo de ervilha é a base perfeita para este risoto.",
      "Refogue a cebola picada. Toste o arroz. Adicione o vinho.",
      "Continue com caldo de ervilha quente, concha por concha, mexendo por 15 minutos.",
      "Na metade do cozimento, adicione as ervilhas inteiras restantes — ficarão al dente no risoto final.",
      "Retire do fogo. Manteiga e parmesão. Mantecatura vigorosa.",
      "Adicione o presunto cortado em tiras finas apenas ao final — o calor residual aquecerá sem cozinhar.",
      "Sirva com salsinha picada e pimenta-do-reino moída na hora."
    ],
    tips: [
      "Caldo de vagens de ervilha eleva o prato para outro nível — não descarte as vagens.",
      "Risi e Bisi é historicamente o prato servido ao Doge de Veneza no Dia de São Marcos.",
      "A consistência é mais fluida que risoto normal — quase uma sopa espessa."
    ]
  },
  {
    name: "Risoto de Beterraba com Queijo de Cabra 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto rosa vibrante com beterraba assada e queijo de cabra crumble",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 35,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "3 beterrabas médias (assadas e processadas)",
      "150 g queijo de cabra fresco",
      "1 litro caldo de legumes",
      "100 ml vinho tinto",
      "nozes tostadas, tomilho",
      "manteiga, cebola"
    ],
    instructions: [
      "Asse as beterrabas inteiras embrulhadas em papel alumínio a 200 °C por 45 minutos. Descasque ainda quentes — a pele sai facilmente. Reserve metade em cubos, processe a outra metade em purê.",
      "O purê de beterraba é a fonte da cor rosa vibrante que tingirá todo o risoto.",
      "Refogue a cebola em manteiga. Toste o arroz. Adicione vinho tinto — o risoto terá cor arroxeada que mudará com a adição da beterraba.",
      "Continue com caldo quente por 18 minutos, mexendo.",
      "Nos últimos 5 minutos, adicione o purê de beterraba ao risoto. A cor mudará para rosa vibrante quase fluorescente.",
      "Retire do fogo. Manteiga apenas (sem parmesão — o queijo de cabra virá como topo). Mantecatura.",
      "Sirva num prato branco para o contraste ser máximo. Adicione cubos de beterraba assada por cima.",
      "Esfarele queijo de cabra generosamente, polvilhe nozes tostadas e folhas de tomilho fresco."
    ],
    tips: [
      "Contraste visual: risoto rosa + queijo branco + nozes = prato visualmente espetacular.",
      "Beterraba assada tem sabor mais concentrado que cozida em água — essencial assar.",
      "Adicionar o purê no final preserva a cor rosa intensa — cozinha longo apaga a cor."
    ]
  },
  {
    name: "Risoto de Linguiça com Brócolis 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto rústico com linguiça artesanal e brócolis",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "200 g linguiça fresca artesanal (sem pele, esfarelada)",
      "300 g brócolis em floretes pequenos",
      "1 litro caldo de frango",
      "100 ml vinho branco",
      "100 g parmesão, 50 g manteiga",
      "alho, pimenta calabresa"
    ],
    instructions: [
      "Retire a linguiça da casca e esmigalhe — esfarelada, a linguiça distribui-se melhor pelo risoto do que em pedaços.",
      "Frite a linguiça esfarelada em frigideira seca até dourar completamente, retirando o excesso de gordura. Reserve.",
      "Na mesma frigideira, com a gordura da linguiça, refogue o alho fatiado. Adicione os floretes de brócolis e salteie por 2 minutos — devem manter a cor verde viva.",
      "Use a mesma frigideira para iniciar o risoto: refogue cebola na gordura da linguiça, toste o arroz 2 minutos e adicione o vinho.",
      "Continue com caldo quente por 18 minutos. Na metade, adicione a linguiça dourada.",
      "Nos últimos 2 minutos, adicione o brócolis — não cozinhe demais, deve manter cor e crocância.",
      "Retire do fogo. Parmesão, manteiga e pimenta calabresa. Mantecatura.",
      "A combinação linguiça + brócolis é popular e satisfatória — risoto completo sem acompanhamentos."
    ],
    tips: [
      "Linguiça esfarelada vs. em rodelas: distribui-se melhor e cada garfada tem um pouco.",
      "Brócolis nos últimos 2 minutos preserva cor, vitaminas e textura al dente.",
      "Gordura residual da linguiça no óleo do risoto adiciona sabor a todo o prato."
    ]
  },
  {
    name: "Risoto de Frutos do Mar Completo 📋", emoji: "🥣", region: "INT", estimatedCost: "high", 
    description: "Risoto generoso com mix de frutos do mar em caldo de casca",
    category: "Risotos",
    type: "dinner",
    difficulty: "médio",
    prepTime: 25,
    cookTime: 35,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "200 g camarão, 200 g lula, 150 g mariscos, 150 g vieiras",
      "CALDO: cascas de camarão + vinho + louro + aipo + cebola",
      "100 ml vinho branco, alho, azeite",
      "50 g manteiga, salsinha, pimenta"
    ],
    instructions: [
      "CALDO DE FRUTOS DO MAR: Ferva as cascas do camarão com cebola, aipo, louro e 1,5 litro de água por 20 minutos. Coe e mantenha quente — este caldo é a base de sabor de todo o risoto.",
      "Pré-cozinhe os mariscos em panela com vinho e tampe por 5 minutos até abrirem. Reserve o líquido e adicione ao caldo.",
      "Saltei cada tipo de fruto do mar separadamente por 1 a 2 minutos em fogo alto com alho. Retire e reserve — todos entrarão no final.",
      "Refogue alho no azeite. Toste o arroz 2 minutos. Adicione o vinho.",
      "Continue com o caldo de frutos do mar por 18 minutos concha por concha, mexendo.",
      "Nos últimos 3 minutos, adicione todos os frutos do mar pré-cozidos para aquecer sem cozinhar demais.",
      "Retire do fogo. Manteiga apenas (sem parmesão) em mantecatura vigorosa.",
      "Sirva imediatamente polvilhado com salsinha e pimenta. Azeite de qualidade por cima."
    ],
    tips: [
      "Pré-cozimento separado dos frutos do mar garante ponto perfeito para cada tipo.",
      "NUNCA parmesão com frutos do mar — regra italiana inquebrantável.",
      "Líquido dos mariscos no caldo multiplica o sabor do mar no prato."
    ]
  },
  {
    name: "Risoto de Codorna e Trufa Negra 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto elegante com perninhas confitadas de codorna e raspas de trufa",
    category: "Risotos",
    type: "dinner",
    difficulty: "difícil",
    prepTime: 30,
    cookTime: 60,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "4 codornas (ou 8 perninhas)",
      "10 g trufa negra fresca ou pasta de trufa",
      "1 litro caldo de frango",
      "200 ml vinho tinto",
      "100 g parmesão, 80 g manteiga"
    ],
    instructions: [
      "Confite as codornas: imersas em gordura de pato ou azeite a 80 °C por 1 hora e 30 minutos. Retire, desfolhe a carne e reserve. A carne de codorna confitada é incrivelmente macia.",
      "Reduza o vinho tinto pela metade em panelinha — concentra o sabor e o álcool evapora.",
      "Refogue cebola em manteiga. Toste o arroz. Adicione o vinho reduzido.",
      "Continue com caldo de frango quente por 18 minutos, mexendo no estilo clássico.",
      "Nos últimos 5 minutos, adicione a carne de codorna desfiada.",
      "Retire do fogo. Parmesão, manteiga e trufa ralada fina ou pasta de trufa — o calor do risoto libera os aromas da trufa.",
      "Manteiga gelada e mantecatura vigorosa por 2 minutos — o risoto deve ser fluido e brilhante.",
      "Sirva em prato aquecido e rale mais trufa por cima na hora de servir."
    ],
    tips: [
      "Trufa fresca sobre risoto quente libera aroma máximo — não misture antes de servir.",
      "Confit de codorna é técnica preservativa francesa — substitua por frango se não tiver codorna.",
      "Vinho tinto reduzido dá profundidade de sabor e cor ao risoto."
    ]
  },
  {
    name: "Risoto de Bacalhau com Grão-de-Bico 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Risoto lusitano com bacalhau dessalgado e grão-de-bico cozido",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 60,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "300 g bacalhau dessalgado em lascas",
      "200 g grão-de-bico cozido",
      "1 litro caldo de legumes",
      "azeite extravirgem, alho, cebola",
      "100 g parmesão, salsinha, ovos cozidos para decorar"
    ],
    instructions: [
      "Dessalgue o bacalhau em água por 24 horas na geladeira, trocando a água 3 vezes. Reserve a água de dessalga para não usar no caldo.",
      "Desfie o bacalhau em lascas, retirando espinhas e pele. O bacalhau fresco dessalgado tem textura completamente diferente do enlatado.",
      "Em panela larga, refogue abundante alho fatiado no azeite até dourar e perfumar — alho em quantidade é essencial com bacalhau.",
      "Adicione o arbório e toste por 2 minutos. Adicione vinho branco e espere absorver.",
      "Continue com caldo quente por 15 minutos mexendo. A metade do processo, adicione o bacalhau em lascas e o grão-de-bico.",
      "O bacalhau se desintegrará slightly ao longo do cozimento, distribuindo-se pelo risoto.",
      "Retire do fogo. Parmesão e azeite (não manteiga — este risoto tem caráter lusitano).",
      "Sirva com ovo cozido fatiado por cima, salsinha generosa e fio de azeite extravirgem."
    ],
    tips: [
      "Bacalhau dessalgado em casa é muito superior ao comprado pronto — controla o sal residual.",
      "Azeite ao final no lugar da manteiga é escolha portuguesa — muda o caráter do prato.",
      "Grão-de-bico cria contraste de textura interessante com o arroz cremoso."
    ]
  },
  {
    name: "Risoto de Ossobuco alla Milanese 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "O risoto alla milanese clássico servido com ossobuco de vitela braseado",
    category: "Risotos",
    type: "dinner",
    difficulty: "difícil",
    prepTime: 30,
    cookTime: 120,
    servings: 4,
    ingredients: [
      "4 pedaços ossobuco de vitela (~400 g cada)",
      "GREMOLATA: raspas limão + salsinha + alho",
      "RISOTO MILANESE: 300 g arbório + açafrão + vinho branco + caldo de carne + parmesão + manteiga"
    ],
    instructions: [
      "OSSOBUCO: Tempere e enfarinhe os pedaços. Sele em óleo quente por 3 minutos cada lado até dourar profundamente. Reserve.",
      "Na mesma panela refogue sobre mirepoix de cebola, cenoura e aipo. Adicione vinho, amasse tonates e caldo de vitela. Adicione o ossobuco. Braseie tamado a 160 °C por 2 horas.",
      "A carne estará se soltando do osso. A medula do osso virá a seu favor — pode ser retirada e misturada ao molho.",
      "RISOTO: Hidrate açafrão. Prepare risoto clássico com vinho branco e caldo de vitela do braseio (coado). Adicione o açafrão nos primeiros minutos.",
      "Finalize com mantecatura de manteiga e parmesão generosos.",
      "Prepare a gremolata: misture raspas de limão, salsinha picada finamente e alho amassado — adiciona frescor ao prato rico.",
      "Monte: risoto alla milanese dourado como base. Posicione o ossobuco por cima com molho de braseio reduzido.",
      "Polvilhe a gremolata generosamente. Sirva com espetinho de medula para quem quiser remover."
    ],
    tips: [
      "Ossobuco alla milanese com risoto milanese amarelo — essa dupla é um dos grandes clássicos italianos.",
      "Gremolata é ESSENCIAL — sem ela o prato fica excessivamente rico e pesado.",
      "Medula dentro do osso é a melhor parte — não desperdice."
    ]
  },
  {
    name: "Risoto de Espinafre e Nozes 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto verde nutricioso com espinafre fresco e nozes tostadas",
    category: "Risotos",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "300 g espinafre fresco",
      "100 g nozes grosseiramente picadas",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "100 g parmesão, 40 g manteiga",
      "noz-moscada, cebola, alho"
    ],
    instructions: [
      "Toast nozes numa frigideira seca por 3 minutos até perfumadas e levemente douradas. Reserve — o tostamento ativa óleos e cria sabor de nozes mais intenso.",
      "Branqueie metade do espinafre: mergulhe em água fervente por 1 minuto, transfira para água com gelo imediatamente. Processe com um pouco de caldo — purê verde brilhante.",
      "Refogue a cebola em azeite. Toste o arroz. Vinho.",
      "Continue com caldo quente por 18 minutos. Na metade, adicione o purê de espinafre.",
      "O risoto ficará verde vibrante. Na metade, adicione o espinafre fresco inteiro restante — murchará no calor.",
      "Adicione noz-moscada — complementa perfeitamente o espinafre.",
      "Retire do fogo. Parmesão e manteiga. Mantecatura.",
      "Sirva com nozes tostadas por cima criando contraste de tração com o risoto cremoso."
    ],
    tips: [
      "Purê de espinafre + folhas frescas = dupla textura e cor mais intensa.",
      "Noz-moscada e espinafre é combinação clássica italiana — não omita.",
      "Nozes ao final preservam a crocância — dentro do risoto amoleceriam."
    ]
  },
  {
    name: "Risoto de Alho Poró e Queijo Brie 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto delicado com alho poró caramelizado e brie cremoso",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "3 talos alho poró (parte branca e verde clara) em rodelas finas",
      "150 g queijo brie (sem casca)",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "50 g manteiga, azeite, pimenta branca"
    ],
    instructions: [
      "Refogue o alho poró em rodelas finas com manteiga e azeite em fogo médio-baixo por 10 minutos até amaciar e ficar levemente dourado — caramelização suave, não queimar.",
      "O alho poró caramelizado tem sabor adocicado muito diferente do cru — esse processo é fundamental.",
      "Reserve metade do alho poró caramelizado para decoração. Com o restante, adicione o arroz e toste por 2 minutos.",
      "Adicione o vinho. Continue com caldo por 18 minutos.",
      "Retire do fogo. Adicione o brie sem casca em pedaços — ele derreterá no calor do risoto criando cremosidade extra.",
      "Manteiga adicional e mantecatura vigorosa.",
      "Sirva decorado com o alho poró reservado e pimenta branca moída.",
      "A combinação alho poró + brie é delicada e sofisticada — risoto para ocasiões especiais."
    ],
    tips: [
      "Alho poró caramelizado leva 10 minutos em fogo baixo — não tente acelerar com fogo alto.",
      "Brie sem casca derrete suave e cremoso. Deixe a casca para não alterar o sabor.",
      "Pimenta branca em vez de preta: mais sutil e elegante para este prato delicado."
    ]
  },
  {
    name: "Risoto de Abacate e Limão 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Risoto fresco e moderno com creme de abacate e frescor de limão",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "2 abacates maduros",
      "suco e raspas de 2 limões sicilianos",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "pimenta calabresa, coentro, cebola, manteiga"
    ],
    instructions: [
      "Processe 1 abacate com suco de limão, sal e um fio de azeite até obter um creme liso. Reserve coberto com plástico em contato com a superfície para não oxidar.",
      "O segundo abacate fatiado servirá de decoração — fatie apenas no momento de servir.",
      "Prepare o risoto base: refogue cebola, toste arroz, vinho, caldo quente por 18 minutos mexendo.",
      "Retire do fogo. Adicione o creme de abacate imediatamente (não volte ao fogo — abacate cozido fica amargo).",
      "Manteiga gelada na mantecatura. Não usar parmesão — o sabor forte do queijo sobrepõe o abacate delicado.",
      "Ajuste de acidez: raspas de limão siciliano no final.",
      "Sirva em prato fundos com fatias de abacate fresco por cima, pimenta calabresa e coentro.",
      "Gotas de azeite extravirgem de qualidade finalizam o que é um risoto surpreendentemente refrescante."
    ],
    tips: [
      "Abacate entra off the heat — calor acima de 60 °C amarguenta o abacate.",
      "Creme de abacate substitui o parmesão criando cremosidade sem produto animal.",
      "Raspas de limão no final dão frescor — durante o cozimento o aroma volátil evaporaria."
    ]
  },
  {
    name: "Risoto de Pato Confitado com Laranja 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto elegante com carne de pato confitada e suco reduzido de laranja",
    category: "Risotos",
    type: "dinner",
    difficulty: "difícil",
    prepTime: 30,
    cookTime: 35,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "2 coxas de pato confitadas (ou compradas prontas)",
      "suco de 3 laranjas + raspas",
      "50 ml cointreau ou grand marnier",
      "1 litro caldo de pato ou frango",
      "100 g parmesão, 50 g manteiga"
    ],
    instructions: [
      "Desfie o pato confitado removendo toda a pele. A carne confitada é úmida e macia — desfie em fios grossos.",
      "Prepare a redução de laranja: cozinhe o suco des laranjas com o cointreau até reduzir a 1/3 — virou um glaze intenso e aromático.",
      "Refogue cebola no azeite. Toste o arroz. Adicione o cointreau restante e flambe rapidamente.",
      "Continue com caldo quente por 18 minutos. Na metade, adicione o pato desfiado.",
      "Adicione as raspas de laranja nos últimos 2 minutos — o calor libera os óleos cítricos.",
      "Retire do fogo. Parmesão e manteiga em mantecatura.",
      "Sirva com a redução de laranja regada por cima em fios — não misture, deixe o convidado ver o contraste.",
      "Folhas de tomilho fresco ou cebola crispy completam a apresentação."
    ],
    tips: [
      "Pato confitado pronto em lata ou embalagem a vácuo é opção prática de qualidade.",
      "Redução de laranja intensa equilibra a gordura rica do pato.",
      "Cointreau no flambe desaparece o álcool mas mantém o aroma — cuidado com superfícies próximas."
    ]
  },
  {
    name: "Risoto de Alcachofra ao Limão 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto mediterrâneo com alcachofras em conserva e limão fresco",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "400 g corações de alcachofra (em conserva, escorridos)",
      "suco e raspas de 1 limão siciliano",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "100 g parmesão, 50 g manteiga, salsinha, menta"
    ],
    instructions: [
      "Escorra bem as alcachofras em conserva e fatie em quartos. Reserve metade para adicionar ao final (manter textura) e pique a outra metade finamente para refogar.",
      "Refogue a porção picada de alcachofra em azeite e alho por 5 minutos. Adicione o arroz e toste.",
      "Adicione o vinho. Continue com caldo quente por 18 minutos. No meio, adicione os quartos de alcachofra reservados.",
      "Adicione raspas de limão nos minutos finais — aroma cítrico fresco que contrasta com a alcachofra.",
      "Retire do fogo. Parmesão, manteiga e suco de limão na mantecatura.",
      "A alcachofra tem sabor ligeiramente amargo e terroso que equilibra bem com queijo e limão.",
      "Sirva com salsinha e menta fresca picadas — a menta complementa a alcachofra.",
      "Fio de azeite extravirgem por cima ao servir."
    ],
    tips: [
      "Alcachofras em conserva são práticas — buena qualidade italiana azeite conservado.",
      "Menta com alcachofra é combinação clássica italiana da culinária romana.",
      "Lemon zest (raspas) nos últimos minutos do cozimento — antes perderia o aroma cítrico."
    ]
  },
  {
    name: "Risoto de Mortadela e Pistache 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto bolonhês com mortadela italiana e pistaches crocantes",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "200 g mortadela italiana de qualidade em cubos",
      "80 g pistaches descascados sem sal",
      "1 litro caldo de frango",
      "100 ml vinho branco",
      "100 g parmesão, manteiga"
    ],
    instructions: [
      "Toast os pistaches numa frigideira seca por 2 minutos até perfumados. Não deixe queimar — amargaria. Reserve.",
      "Dore levemente a mortadela em cubos em frigideira seca — a gordura própria é suficiente. Reserve.",
      "Prepare risoto base: cebola, arroz tostado, vinho, caldo por 18 minutos.",
      "Nos últimos 3 minutos, adicione a mortadela dourada ao risoto.",
      "Retire do fogo. Parmesão e manteiga em mantecatura.",
      "A mortadela de qualidade tem sabor de pistache e especiarias que complementarão os pistaches adicionais.",
      "Sirva com os pistaches tostados por cima — textura crocante contrastando com o risoto cremoso.",
      "Origem: Bolonha, cidade da mortadela e do ragu. Este risoto é homenagem à culinária emiliana."
    ],
    tips: [
      "Mortadela italiana de qualidade tem pistaches e especiarias — use a melhor disponível.",
      "Mortadela levemente dourada tem sabor mais intenso que crua.",
      "Pistaches crocantes são o elemento surpresa — não os cozinhe junto."
    ]
  },
  {
    name: "Risoto de Cebola Caramelizada e Thyme 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Risoto inspirado na sopa de cebola francesa com parmesão",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 60,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "6 cebolas grandes fatiadas finamente",
      "4 ramos tomilho fresco",
      "1 litro caldo de carne",
      "150 ml vinho branco",
      "100 g parmesão, 50 g manteiga",
      "50 ml cognac o conhaque"
    ],
    instructions: [
      "Caramelize as cebolas: coloque as fatias finas em frigideira com manteiga + azeite em fogo médio-baixo. Mexa ocasionalmente por 40 minutos até ficarem dourado-escuras e reduzidas a 1/4 do volume original.",
      "A caramelização transforma o açúcar natural das cebolas em compostos complexos de sabor — não existe atalho, 40 minutos é o mínimo.",
      "Adicione o cognac e flambe. Adicione as ramas de tomilho.",
      "Adicione o arroz nas cebolas caramelizadas. Toste por 2 minutos.",
      "Vinho branco. Continue com caldo de carne quente por 18 minutos.",
      "A cor do risoto será marrom-amendoado profundo por causa das cebolas caramelizadas.",
      "Retire do fogo. Parmesão abundante e manteiga — mantecatura.",
      "Sirva com croutons de pão por cima, mais parmesão e folhas de tomilho fresco."
    ],
    tips: [
      "Caramelização de 40 minutos não é opcional — cebolas não caramelizadas têm sabor completamente diferente.",
      "Flambar o cognac elimina álcool mas concentra o aroma — use com cuidado perto de superfícies.",
      "Caldo de carne em vez de legumes dá profundidade adequada para combinar com cebola caramelizada."
    ]
  },
  {
    name: "Risoto de Rúcula e Limão com Scamorza 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto fresco e apimentado com rúcula peppery e queijo scamorza defumado",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "200 g rúcula fresca",
      "150 g scamorza defumada ralada (ou mozzarella)",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "raspas de limão, azeite, alho",
      "pinhão tostado para finalizar"
    ],
    instructions: [
      "Branqueie metade da rúcula em água fervente por 30 segundos, transfira para gelo, processe com azeite e alho — creme de rúcula verde intenso.",
      "Reserve a outra metade da rúcula fresca para adicionar fria ao final.",
      "Prepare risoto base: cebola, arroz, vinho, caldo por 18 minutos.",
      "Nos últimos 3 minutos, adicione o creme de rúcula — o risoto ficará verde.",
      "Retire do fogo. Scamorza defumada ralada e manteiga. Mantecatura.",
      "Adicione as folhas de rúcula fresca fora do fogo — o calor residual as murchará levemente sem perder o sabor pungente.",
      "Sirva com raspas de limão, pinhão tostado e fio de azeite.",
      "Pimenta da rúcula + defumado da scamorza + acidez do limão = equilíbrio sofisticado."
    ],
    tips: [
      "Dupla de rúcula (creme + fresca) cria profundidade de sabor e textura.",
      "Scamorza defumada adiciona nota de fumaça que transforma o prato.",
      "Pinhão tostado + rúcula é combinação clássica italiana — pesto rúcula segue a mesma lógica."
    ]
  },
  {
    name: "Risoto Primavera de Legumes 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto colorido com legumes da estação — sabores de primavera",
    category: "Risotos",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "ervilhas, aspargos, abobrinha, ervas frescas variadas",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "100 g parmesão, 50 g manteiga",
      "raspas de limão, basílico"
    ],
    instructions: [
      "Prepare tous les légumes: ervilhas descascadas, aspargos em pedaços de 2 cm, abobrinha em cubos pequenos — todos de tamanho similar para cozimento uniforme.",
      "Branqueie os legumes mais duros (aspargos) brevemente. Os mais macios (ervilhas) podem ir crus.",
      "Prepare risoto base: cebola, arroz tostado, vinho, caldo por 18 minutos.",
      "Adicione os legumes em ordem de tempo de cozimento: primeiros os mais duros, últimos os mais delicados.",
      "Adicione basílico fresco nos últimos 2 minutos — o calor libera o aroma sem destruir.",
      "Retire do fogo. Parmesão, manteiga e raspas de limão.",
      "A leveza e frescor das ervas e legumes criam um risoto que é o oposto dos densos de inverno.",
      "Sirva imediatamente com flores comestíveis se disponível — visual de primavera."
    ],
    tips: [
      "Adicionar legumes em ordem de cozimento garante que todos fiquem al dente.",
      "Basílico fresco nos últimos 2 minutos: preserva enorme parte do aroma.",
      "Risoto primavera é diferente a cada estação — varie com os legumes disponíveis."
    ]
  },
  {
    name: "Risoto de Mozzarella de Búfala e Tomate 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto margherita com tomates confitados e mozzarella derretida",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "300 g tomates cereja confitados (ou no molho)",
      "250 g mozzarella de búfala",
      "1 litro caldo de legumes",
      "50 ml vinho branco",
      "basílico fresco, azeite",
      "50 g manteiga"
    ],
    instructions: [
      "Confite os tomates cereja: disponha numa travessa com azeite, alho, sal e orégano. Asse a 120 °C por 1 hora até murcharem e concentrarem sabor. A concentração de açúcares é intensa.",
      "Processe metade dos tomates confitados com o azeite em que assaram — molho de tomate concentrado.",
      "Refogue alho. Toste arroz. Vinho. Continue com caldo por 18 minutos. Na metade, adicione o purê de tomate confitado.",
      "O risoto tomará cor laranja intensa e sabor intenso de tomatada.",
      "Nos últimos 2 minutos, adicione os tomates inteiros restantes.",
      "Retire do fogo. Manteiga apenas (sem parmesão — seguindo o estilo margherita).",
      "Sirva com mozzarella de búfala rasgada em pedaços grandes por cima — o calor do risoto a derreterá parcialmente.",
      "Basílico fresco rasgado na hora e azeite extravirgem de qualidade. Pimenta-do-reino recém moída."
    ],
    tips: [
      "Tomate confitado a baixa temperatura concentra sabores sem caramelizar — diferente do assado em temperatura alta.",
      "Mozzarella de búfala é superior à comum — cremosidade e sabor são incomparáveis.",
      "Basílico rasgado (não cortado) libera mais óleos aromáticos."
    ]
  },
  {
    name: "Risoto de Manga e Camarão 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description: "Fusão tropical brasileira com camarão e manga madura",
    category: "Risotos",
    type: "dinner",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "400 g camarão médio limpo",
      "2 mangas maduras (1 para purê, 1 em cubos)",
      "1 litro caldo de camarão",
      "100 ml vinho branco",
      "coentro, pimenta dedo-de-moça, gengibre, limão"
    ],
    instructions: [
      "Faça caldo de camarão com cascas e cabeças fervidas com gengibre e capim-limão por 15 minutos.",
      "Processe 1 manga madura em purê liso — deve ser doce e aromática. Corte a segunda manga em cubos de 1,5 cm.",
      "Saltei os camarões em frigideira quente com pouco azeite por 1 minuto cada lado. Reserve.",
      "Refogue cebola e gengibre fresco ralado. Toste o arroz. Adicione o vinho.",
      "Continue com caldo de camarão por 18 minutos. Na metade, adicione o purê de manga.",
      "O risoto tomará cor amarela-amendoada e sabor adocicado tropical.",
      "Nos últimos 2 minutos, adicione os camarões e cubos de manga fresca.",
      "Retire do fogo. Manteiga (sem parmesão). Sirva com coentro fresco, pimenta dedo-de-moça e limão — o picante e ácido equilibram o doce da manga."
    ],
    tips: [
      "Manga Palmer ou Van Dyke são as melhores para cozinhar — menos fibrosas.",
      "NUNCA parmesão com versão de frutos do mar — manteiga apenas na mantecatura.",
      "Gengibre fresco é diferente do seco — sabor mais fresco e picante natural."
    ]
  },
  {
    name: "Risoto de Rabo de Boi 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto reconfortante com rabo de boi braseado por horas",
    category: "Risotos",
    type: "dinner",
    difficulty: "difícil",
    prepTime: 30,
    cookTime: 180,
    servings: 4,
    ingredients: [
      "1 kg rabo de boi em seções",
      "300 g arbório",
      "BRASEIRO: vinho tinto + tomate + cebola + cenoura + aipo + louro + alho",
      "1 litro do caldo do braseiro",
      "100 g parmesão, 50 g manteiga"
    ],
    instructions: [
      "Sele fortemente o rabo de boi em todos os lados em óleo bem quente — crosta profunda e escura é o que cria sabor de Maillard no caldo final.",
      "Braseie o rabo: refogue mirepoix, adicione conhaque e flambe, adicione tomate, vinho tinto e água. Cozinhe tampado a 150 °C por 3 horas até a carne se soltar do osso facilmente.",
      "Retire o rabo. Coe o caldo e reduza até ficar rico e encorpado. Desfie toda a carne do rabo, descartando ossos.",
      "Prepare risoto base: refogue cebola, toste arroz, adicione vinho, continue com caldo do braseiro passado por 18 minutos.",
      "No 15° minuto, adicione a carne desfiada — está pronto-cozida, apenas precisar incorporar.",
      "Retire do fogo. Parmesão e manteiga em mantecatura vigorosa.",
      "O risoto será profundamente colorido, rico e complexo — sabor de horas de cozimento concentrado.",
      "Sirva com parmesão extra e pimenta verde moída."
    ],
    tips: [
      "Rabo de boi exige tempo — não existe atalho para o colágeno virar gelatin.",
      "Caldo do braseiro é ouro — não jogar fora. É a base do risoto.",
      "Desfiar a carne ainda quente é mais fácil do que fria."
    ]
  },
  {
    name: "Risoto de Parmesão com Ervilhas e Menta 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Versão clássica simplificada com frescor da menta e ervilhas",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 5,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "200 g ervilhas congeladas",
      "10 folhas menta fresca",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "120 g parmesão envelhecido, 60 g manteiga"
    ],
    instructions: [
      "Prepare risoto clássico: cebola refogada, arroz tostado, vinho absorvido, caldo quente concha por concha por 18 minutos mexendo.",
      "2 minutos antes de terminar, adicione as ervilhas congeladas diretamente — descongelarão no calor do risoto sem cozinhar demais.",
      "Retire do fogo. Parmesão envelhecido (24 meses ou mais) ralado fino e manteiga gelada.",
      "Mexa vigorosamente por 2 minutos — o risoto deve movimentar como uma onda ao chacoalhar o prato leve.",
      "Rasgue as folhas de menta fresca e incorpore delicadamente ao final. O calor residual libera o aroma sem destruir.",
      "Sirva em prato fundo aquecido. O risoto deve escorrer levemente — all'onda é a consistência ideal.",
      "Parmesão extra por cima, pimenta moída na hora e as folhas de menta inteiras para decoração.",
      "Simplicidade elevada a excelência pela qualidade dos ingredientes."
    ],
    tips: [
      "Parmesão de qualidade (Parmigiano Reggiano 24 meses+) faz toda a diferença no risoto clássico.",
      "All'onda (como onda): o risoto perfeito oscila como uma onda ao mover o prato.",
      "Menta + ervilhas é combinação de primavera — leve e refrescante."
    ]
  },
  {
    name: "Risoto de Presunto Cru e Melão 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Combinação clássica italiana em forma de risoto — adocicado e salgado",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "100 g presunto cru parma em fatias",
      "200 g melão cantaloupe em cubos",
      "1 litro caldo de frango",
      "100 ml vinho branco espumante",
      "100 g pecorino romano, 50 g manteiga"
    ],
    instructions: [
      "O speck ou parma vai cru em algumas fatias e levemente grelhado em papelzinhos crocantes em outras — contraste de textura.",
      "Doure metade do presunto em frigideira seca até ficar crocante como chips. Reserve. A outra metade permanecerá crua.",
      "Prepare risoto base: cebola, arroz tostado, adicione o vinho espumante (prosecco ou champagne) — a acidez e as borbulhas criam leveza.",
      "Continue com caldo por 18 minutos.",
      "Nos últimos 2 minutos, adicione os cubos de melão — amaciará levemente no calor.",
      "Retire do fogo. Pecorino romano (mais picante que parmesão) e manteiga. Mantecatura.",
      "No prato: chips de presunto por cima criando contraste crocante, fatias cruas do presunto enroladas elegantemente.",
      "O dulçor do melão + salgado do presunto + picante do pecorino = equilíbrio perfeito."
    ],
    tips: [
      "Vinho espumante no risoto cria acidez delicada diferente do vinho branco estático.",
      "Presunto crocante + cru no mesmo prato: contraste de textura intencional.",
      "Pecorino romano é mais salgado e picante — use menos que parmesão."
    ]
  },
  {
    name: "Risoto de Tomate Seco e Pesto 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto intenso com tomates secos concentrados e pesto de manjericão",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "100 g tomates secos em azeite (escorridos)",
      "80 g pesto de manjericão",
      "1 litro caldo de legumes",
      "50 ml vinho branco",
      "100 g parmesão, 50 g manteiga",
      "pinhão tostado"
    ],
    instructions: [
      "Pique os tomates secos finamente — sabor concentrado se distribuirá pelo risoto inteiro.",
      "Refogue a cebola em azeite (do tomate seco — mais saboroso). Adicione os tomates picados. Toste o arroz.",
      "Adicione o vinho. Continue com caldo por 18 minutos.",
      "Retire do fogo. Pesto de manjericão fresco (não industrializado) e manteiga. Não aquecça o pesto — o calor escurece e amarga o basílico.",
      "Parmesão na mantecatura. Mexa vigorosamente.",
      "O risoto terá tonalidade rosada dos tomates secos e verde do pesto — contraste bonito.",
      "Sirva polvilhado com pinhão tostado grosseiramente picado e folhas de basílico fresco.",
      "Risoto de sabores mediterrâneos concentrados — tomate + basílico + pinhão é a Ligúria num prato."
    ],
    tips: [
      "Azeite do tomate seco é saboroso — use para refogar a cebola.",
      "Pesto fora do fogo: calor destrói cor e sabor do basílico fresco.",
      "Tomate seco puro (não industrializado) tem sabor incomparavelmente mais concentrado."
    ]
  },
  {
    name: "Risoto de Abóbora e Sálvia Crocante 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto de abóbora assada com folhas de sálvia crocantes fritas",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "500 g abóbora japonesa (sem semente)",
      "20 folhas sálvia fresca",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "100 g parmesão, 80 g manteiga",
      "noz-moscada"
    ],
    instructions: [
      "Asse a abóbora em cubos com um fio de azeite a 200 °C por 25 minutos até caramelizar e ficar levemente dourada. A caramelização concentra os açúcares.",
      "Processe 2/3 da abóbora assada com um pouco de caldo quente — purê denso e alaranjado.",
      "Frite as folhas de sálvia em manteiga até crocantes (30 segundos). Reserve em papel toalha — parecerão chips de sálvia.",
      "Prepare risoto base com a cebola. Toste o arroz. Adicione vinho. Continue com caldo por 15 minutos.",
      "Na metade do cozimento, incorpore o purê de abóbora — o risoto ficará laranja intenso.",
      "Nos últimos 3 minutos, adicione os cubos de abóbora assada reservados.",
      "Adicione noz-moscada. Retire do fogo. Parmesão e manteiga infusionada com sálvia (a manteiga onde fritou).",
      "Sirva com as folhas de sálvia crocantes por cima — textura e aroma inconfundíveis."
    ],
    tips: [
      "Sálvia crocante frita em manteiga: chips aromáticos que transformam a apresentação.",
      "Manteiga de sálvia (onde fritou) é saborosa — use toda na mantecatura.",
      "Abóbora japonesa (hokaido/cabotiá) tem carne mais densa e doce — ideal para risotos."
    ]
  },
  {
    name: "Risoto Bianco com Tartufo 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto branco minimalista que deixa a trufa brilhar",
    category: "Risotos",
    type: "dinner",
    difficulty: "médio",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "trufa branca fresca (ao menos 30g) ou óleo de trufa branca de qualidade",
      "1 litro caldo de frango clarificado",
      "100 ml vinho branco",
      "200 g parmesão Reggiano",
      "100 g manteiga de qualidade"
    ],
    instructions: [
      "A trufa branca é o ingrediente mais aromático do mundo — sua beleza exige um risoto neutro que não compete com ela.",
      "Use caldo de frango claro, sem especiarias fortes — apenas cebola, salsão e sal.",
      "Prepare o risoto mais simples possível: cebola refogada brevemente, arroz tostado, vinho branco seco.",
      "Continue com caldo claro por 18 minutos. Nenhum outro ingrediente — a trufa será adicionada fria no final.",
      "Retire do fogo. Parmesão Reggiano envelhecido e manteiga gelada de qualidade. Mantecatura vigorosa por 3 minutos.",
      "Sirva em prato branco aquecido. A consistência deve ser all'onda — fluida mas cremosa.",
      "À mesa, com ralo de trufa, rale generosamente sobre o risoto de cada convidado — o calor do prato libera os compostos aromáticos da trufa.",
      "Nunca cozinhe a trufa — o calor destrói os aromas."
    ],
    tips: [
      "Trufa branca de Alba (outubro-dezembro) é a mais valiosa — use apenas crua ralada na hora.",
      "Risoto neutro como tela em branco para a trufa brilhar — sem concorrência de sabores.",
      "Óleo de trufa real vs. sintético: o sintético (bis-metilthiomethane) tem aroma artificial —use com moderação."
    ]
  },
  {
    name: "Risoto de Feijão Preto e Couve 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description: "Risoto-feijoada: grãos de feijão preto e couve mineira transformados em risoto",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "200 g feijão preto cozido al dente",
      "100 g couve cortada finamente (chiffonade)",
      "1 litro caldo de feijão preto",
      "50 ml cachaça",
      "linguiça calabresa em cubos, alho, laranja"
    ],
    instructions: [
      "Reserve o caldo do cozimento do feijão — rico e escuro, é a base deste risoto com identidade brasileira.",
      "Doure cubos de linguiça em frigideira seca. Reserve.",
      "Flambe o alho fatiado com cachaça na panela do risoto — o aroma e o sabor brasileiro são impressionantes.",
      "Toste o arroz por 2 minutos. Continue com caldo de feijão quente por 18 minutos — o risoto ficará escuro como feijoada.",
      "No 15° minuto, adicione o feijão preto cozido e a linguiça dourada.",
      "Nos últimos 2 minutos, adicione a couve chiffonada fininha.",
      "Retire do fogo. Parmesão. Mantecatura com manteiga.",
      "Sirva com raspas de laranja por cima — a acidez cítrica corta a riqueza do feijão, exatamente como na feijoada tradicional."
    ],
    tips: [
      "Caldo de feijão preto é o segredo desta receita — não substitua por outro caldo.",
      "Cachaça flambe cria momento dramático e agrega sabor nacional.",
      "Raspas de laranja em vez de suco: o aroma cítrico sem a acidez excessiva."
    ]
  },
  {
    name: "Risoto de Palmito com Limão 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto delicado com palmito pupunha em conserva e frescor cítrico",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "300 g palmito pupunha em conserva (escorrido e fatiado)",
      "suco e raspas de 2 limões",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "100 g parmesão, manteiga, salsinha"
    ],
    instructions: [
      "Palmito pupunha (em conserva de qualidade, não de lata de qualidade duvidosa) tem textura firme e sabor levemente defumado — superior ao palmito junçara.",
      "Corte em rodelas de 0,5 cm. Reserve metade para adicionar no final mantendo textura.",
      "Tritura a outra metade grosseiramente — ficará incorporada ao risoto.",
      "Prepare risoto base: cebola, arroz tostado, vinho, caldo quente por 18 minutos.",
      "Na 10ª concha de caldo, adicione o palmito processado grosseiramente.",
      "Nos últimos 3 minutos, adicione as rodelas de palmito inteiras.",
      "Retire do fogo. Raspas de limão, suco de limão, parmesão e manteiga. Mexa vigorosamente.",
      "O limão corta a leveza do palmito e cria um risoto fresco e levemente ácido. Sirva com salsinha picada."
    ],
    tips: [
      "Palmito pupunha tem textura más firme que açaizeiro — melhor para risoto.",
      "Dupla de palmito: processado incorporado + inteiro preservado = texturas diferentes.",
      "Limão com palmito: combinação natural que realça o sabor delicado do palmito."
    ]
  },
  {
    name: "Risoto de Chorizo Espanhol 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto vermelho com chorizo espanhol em cubos, páprica e vinho",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "200 g chorizo espanhol curado em cubos",
      "páprica defumada espanhola",
      "1 litro caldo de frango",
      "150 ml vinho tinto",
      "100 g manchego ralado",
      "manteiga, alho"
    ],
    instructions: [
      "Doure os cubos de chorizo em frigideira seca — a gordura vermelha do chorizo (com páprica e pimentão) escorrerá tingindo a frigideira.",
      "Use essa gordura vermelha aromática para refogar o alho e a cebola — o sabor defumado e apimentado do chorizo penetra em tudo.",
      "Toste o arroz na gordura vermela do chorizo. Adicione o vinho tinto.",
      "Continue com caldo de frango por 18 minutos. O risoto será vermelho-alaranjado.",
      "Adicione uma colher de páprica defumada espanhola durante o cozimento.",
      "Nos últimos 5 minutos, adicione o chorizo dourado de volta.",
      "Retire do fogo. Manchego ralado (queijo espanhol que combina com o chorizo) e manteiga.",
      "Sirva com salsa (salsinha espanhola) picada e mais páprica defumada."
    ],
    tips: [
      "Gordura do chorizo é o ingrediente secreto — tingue e aromatiza todo o risoto.",
      "Manchego espanhol em vez de parmesão: consistência temática ibérica.",
      "Páprica defumada espanhola (pimentón de la Vera) é fundamentalmente diferente da doce."
    ]
  },
  {
    name: "Risoto de Limão Siciliano e Manjericão 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto fresco e aromático — leveza de verão num prato",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "raspas de 3 limões sicilianos + suco de 2",
      "1 maço grande manjericão fresco",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "100 g parmesão, 60 g manteiga"
    ],
    instructions: [
      "Prepare risoto base completo: cebola, arroz tostado, vinho, caldo por 18 minutos.",
      "Rasgue metade do manjericão e adicione nos últimos 3 minutos — o calor libera o aroma sem cozinhar.",
      "Adicione as raspas de limão nos últimos 2 minutos — raspa no calor libera óleos cítricos etéreos.",
      "Retire do fogo. Suco de limão, parmesão e manteiga. Mantecatura vigorosa.",
      "O suco de limão entra fora do fogo — cozido, o ácido reage com os amidos e cria sabor desagradável.",
      "Reserve o restante do manjericão para decoração fresca.",
      "Sirva em prato branco — o verde do manjericão e o amarelo-suave do risoto são visuais de primavera.",
      "Limão siciliano (mais aromático que o tahiti comum) é essencial nesta receita."
    ],
    tips: [
      "Limão siciliano tem casca mais aromática e sumo menos ácido que o tahiti — fundamental aqui.",
      "Suco de limão fora do fogo: dentro do fogo reage com amidos criando sabor amargo.",
      "Manjericão rasgado (não cortado): mais aroma. Cortado oxida e escurece."
    ]
  },
  {
    name: "Risoto de Milho Verde e Catupiry 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description: "Risoto com milho fresco e cream cheese catupiry — sabores do Brasil",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "400 g milho verde fresco (2 espigas) ou congelado",
      "200 g catupiry original",
      "1 litro caldo de frango",
      "100 ml vinho branco",
      "manteiga, sal, cebola"
    ],
    instructions: [
      "Cozinhe o milho fresco e corte os grãos da espiga. Reserve metade dos grãos inteiros. Processe a outra metade com um pouco de caldo — creme de milho.",
      "Alternativamente, bata 200 g de milho no liquidificador com 200 ml de leite — creme de milho caseiro.",
      "Prepare risoto base: cebola, arroz tostado, vinho, caldo por 15 minutos.",
      "No 10° minuto, adicione o creme de milho — o risoto ficará amarelo suave.",
      "Nos últimos 3 minutos, adicione os grãos inteiros reservados.",
      "Retire do fogo. Catupiry em pedaços — derreterá no calor criando cremosidade única.",
      "Mantecatura com o catupiry e um pouco de manteiga.",
      "O sabor é tipicamente brasileiro — milho verde + catupiry é combinação das pizzas e esfihas do Brasil. Sirva com salsinha."
    ],
    tips: [
      "Catupiry original (em embalagem redonda) é diferente do requeijão — use o verdadeiro.",
      "Dupla do milho: creme + grãos = textura rica e presença visual.",
      "Esse risoto é um sucesso garantido com públicos que nunca comeram risoto — sabores familiares."
    ]
  },
  {
    name: "Risoto de Peito Defumado e Ervilha-Torta 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto defumado com peito de frango defumado e ervilha-torta crocante",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "200 g peito de frango defumado em cubos (comprado pronto)",
      "200 g ervilha-torta",
      "1 litro caldo de frango",
      "100 ml vinho branco",
      "100 g parmesão, manteiga"
    ],
    instructions: [
      "Corte o peito de frango defumado em cubos de 1 cm — o sabor defumado já está incorporado e adicionará profundidade ao risoto.",
      "Branqueie as ervilhas-tortas inteiras por 1 minuto em água fervente, transfira para gelo — cor verde viva preservada.",
      "Prepare risoto base: cebola, arroz tostado, vinho, caldo por 18 minutos.",
      "No 15° minuto, adicione o frango defumado — apenas para aquecer e incorporar sabor.",
      "Retire do fogo. Parmesão e manteiga. Mantecatura.",
      "Adicione as ervilhas-tortas blanqueadas apenas ao final — cruas mantêm crocância.",
      "O smoke do frango defumado permeia o risoto inteiro sutilmente.",
      "Sirva com pimenta-do-reino e parmesão extra — risoto completo e satisfatório."
    ],
    tips: [
      "Frango defumado pronto é conveniência sem comprometer qualidade — use uma marca de qualidade.",
      "Ervilha-torta al final mantém crocância — dentro do risoto amolece e perde a graça.",
      "Defumado + ervilha: combinação clássica de sabores que se completam."
    ]
  },
  {
    name: "Risoto Verde de Brócolis com Grana Padano 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Risoto intensamente verde com brócolis e queijo envelhecido",
    category: "Risotos",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "500 g brócolis ninja (floretes e talos)",
      "100 g grana padano ou parmesão ralado",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "alho, azeite, pimenta calabresa, limão"
    ],
    instructions: [
      "Cozinhe os talos de brócolis (parte mais dura) por 5 minutos. Processe com caldo — purê verde intenso.",
      "Branqueie os floretes por 2 minutos. Reserve.",
      "Refogue alho fatiado em azeite — doure bem. Toste o arroz. Vinho.",
      "Continue com caldo por 15 minutos. Na metade, adicione o purê de brócolis — cor verde vibrante.",
      "No 16° minuto, adicione os floretes branqueados.",
      "Adicione pimenta calabresa — o picante equilibra o verde do brócolis.",
      "Retire do fogo. Grana padano e manteiga. Mantecatura.",
      "Sirva com raspas de limão por cima — o ácido cítrico realça a cor verde e o sabor do brócolis."
    ],
    tips: [
      "Talos do brócolis são deliciosos no purê — não jogue fora. Usam o vegetal inteiro.",
      "Verde vibrante é preservado pela acidez do limão no final.",
      "Pimenta calabresa com brócolis: combinação italiana clássica (orecchiette com cime di rapa segue essa lógica)."
    ]
  },
  {
    name: "Risoto de Figo e Gorgonzola 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto outonal com figos frescos caramelizados e gorgonzola picante",
    category: "Risotos",
    type: "dinner",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "8 figos frescos maduros",
      "150 g gorgonzola piccante",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "50 g manteiga, tomilho",
      "balsâmico reduzido, nozes"
    ],
    instructions: [
      "Corte 4 figos ao meio. Caramelize em frigideira com manteiga e açúcar mascavo por 3 minutos — o açúcar dos figos carameliza e fica dourado. Reserve.",
      "Os outros 4 figos ficam sem caramelizar — serão adicionados no final para sabor fresco.",
      "Prepare risoto base: cebola, tomilho, arroz tostado, vinho, caldo por 18 minutos.",
      "Nos últimos 3 minutos, adicione os figos frescos picados sem caramelizar.",
      "Retire do fogo. Gorgonzola piccante (ou dolce para mais suave) em pedaços e manteiga. Mantecatura.",
      "O gorgonzola derreterá parcialmente criando bolsões de sabor intenso entre os grãos.",
      "Monte: risoto na base, figos caramelizados por cima criando contraste visual e de sabor.",
      "Gotas de balsâmico reduzido, nozes grosseiramente tostadas e folhas de tomilho fresco."
    ],
    tips: [
      "Figo fresco de qualidade é essencial — figo farináceo e sem sabor arruína o prato.",
      "Gorgonzola piccante vs dolce: piccante tem sabor mais intenso, dolce mais suave.",
      "Balsâmico reduzido + figo + gorgonzola = combinação italiana clássica outonal."
    ]
  },
  {
    name: "Risoto de Queijo de Cabra e Beterraba Assada 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Risoto rosa com queijo de cabra cremoso — elegante e saboroso",
    category: "Risotos",
    type: "dinner",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 35,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "3 beterrabas assadas",
      "200 g queijo de cabra fresco (chèvre)",
      "1 litro caldo de legumes",
      "100 ml vinho rosé",
      "mel, nozes, tomilho, manteiga"
    ],
    instructions: [
      "Asse as beterrabas a 200 °C por 45 minutos embrulhadas em papel alumínio. Descasque quentes. Reserve metade em cubos, processe a outra metade com caldo.",
      "Prepare risoto base com vinho rosé — mais suave que o tinto, combina com o sabor terroso da beterraba.",
      "Continue com caldo, incorporando o purê de beterraba na metade do cozimento.",
      "O risoto ficará rosa vibrante por causa da betalaína da beterraba.",
      "Nos últimos 2 minutos, adicione os cubos de beterraba assada reservados.",
      "Retire do fogo. Manteiga e um pouco de parmesão (leve). Mantecatura.",
      "Sirva com queijo de cabra desfarelado generosamente — derreterá levemente no calor do risoto.",
      "Nozes tostadas, fio de mel e folhinhas de tomilho fresco completam o prato."
    ],
    tips: [
      "Vinho rosé para este risoto — combina cromaticamente e em sabor com a beterraba.",
      "Queijo de cabra (chèvre) fresco tem acidez que equilibra o doce da beterraba.",
      "Risoto rosa + queijo branco + nozes marrons = prato visualmente deslumbrante."
    ]
  },
  {
    name: "Risoto Acquarello com Mantecatura de Luxo 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Risoto premium usando arroz Acquarello envelhecido com mantecatura dupla",
    category: "Risotos",
    type: "dinner",
    difficulty: "difícil",
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arroz Acquarello 1 ano (ou Carnaroli premium)",
      "1 litro caldo de frango clarificado",
      "150 ml vinho branco seco de qualidade",
      "200 g parmesão Reggiano 36 meses",
      "120 g manteiga de alta qualidade (84% gordura)",
      "flor de sal, pimenta branca"
    ],
    instructions: [
      "Acquarello é arroz envelhecido 1 ano — grãos mais firmes que absorvem caldo sem se desfazer. A técnica de produção com gérmen reimplantado retorna nutrientes.",
      "Caldo de frango clarificado: caldo dourado e límpido sem impurezas. Clarificação com clara de ovo remove turbidez.",
      "Refogue cebola apenas em azeite neutro por exactamente 10 minutos — translúcida sem cor.",
      "Toste o arroz por 2 minutos. Vinho branco de qualidade.",
      "Continue com caldo quente por exatamente 16 minutos — Carnaroli/Acquarello precisa de menos tempo que arbório.",
      "Retire do fogo obrigatoriamente antes de adicionar queijo e manteiga.",
      "MANTECATURA DUPLA: Adicione metade da manteiga gelada e parmesão. Bata 2 minutos. Adicione o restante da manteiga gelada e bata mais 2 minutos. Resultado: consistência extra sedosa.",
      "Sirva all'onda em prato fundo aquecido. Apenas flor de sal e pimenta branca — a perfeição não precisa de decoração."
    ],
    tips: [
      "Acquarello envelhecido é considerado o melhor arroz do mundo para risoto por muitos chefs.",
      "Mantecatura dupla com mais manteiga do que o normal cria textura sedosa de restaurante estrelado.",
      "Simplicidade absoluta: quando os ingredientes são perfeitos, a técnica é o foco."
    ]
  },
  {
    name: "Risoto de Lentilha Vermelha e Cúrcuma 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto dourado e nutritivo com lentilhas vermelhas e especiarias indianas",
    category: "Risotos",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "150 g lentilha vermelha",
      "1 colher sopa cúrcuma",
      "1 colher chá cominho",
      "1 litro caldo de legumes",
      "iogurte grego, coentro, azeite"
    ],
    instructions: [
      "Lave as lentilhas vermelhas — não precisam de remolho. As vermelhas cozinham rápido e desintegram-se criando cremosidade natural.",
      "Tosta as especiarias (cúrcuma, cominho) em frigideira seca por 1 minuto — ativam os compostos aromáticos e reduzem o sabor cru.",
      "Refogue cebola e alho. Adicione as especiarias tostadas. Toste o arroz e as lentilhas juntos por 2 minutos.",
      "Continue com caldo quente por 18 minutos — as lentilhas vermelhas se dissolverão parcialmente, adicionando corpo.",
      "O risoto ficará dourado pela cúrcuma com textura duplamente cremosa pelo arroz e pelas lentilhas.",
      "Retire do fogo. Azeite de qualidade e limão espremido.",
      "Sirva com uma colher de iogurte grego no centro — o frio contrasta com o quente do risoto.",
      "Coentro fresco picado e uma pitada de sumac por cima completam o perfil de sabor."
    ],
    tips: [
      "Lentilha vermelha se dissolve parcialmente — cria espessura sem adicionar grãos duros.",
      "Cúrcuma + cominho tostados secos liberam muito mais sabor que adicionados crus.",
      "Iogurte frio no centro: contraste de temperatura que é revelação."
    ]
  },
  {
    name: "Risoto de Carne Moída com Pimenta 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto reconfortante estilo bolonhesa com carne moída suculenta",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "400 g carne moída (patinho ou acém)",
      "200 ml vinho tinto",
      "200 g tomate pelado",
      "1 litro caldo de carne",
      "100 g parmesão, manteiga",
      "cebola, alho, cenoura, salsão, pimenta"
    ],
    instructions: [
      "Doure a carne moída em frigideira quente com pouquíssimo óleo — mexa apenas para desfazer grumos e espere dourar por baixo. Carne dourada, não cozida no vapor.",
      "Adicione a cebola, cenoura e salsão picados finamente (soffritto) junto com a carne. Cozinhe por 5 minutos.",
      "Adicione o alho picado, vinho tinto — deglace e deixe absorver por 3 minutos.",
      "Adicione tomate pelado amassado com a mão. Cozinhe por 10 minutos reduzindo.",
      "Adicione o arroz arbório e toste por 2 minutos na mistura de carne.",
      "Continue com caldo quente por 18 minutos, mexendo.",
      "Retire do fogo. Parmesão generoso e manteiga. Mantecatura.",
      "Sirva com mais parmesão e pimenta-do-reino moída generosamente. Risoto ragu completo."
    ],
    tips: [
      "Soffritto (cebola, cenoura, salsão) é a base aromática italiana — não omita.",
      "Doure a carne SEM mexer primeiro — cria crosta de Maillard mais saborosa.",
      "Esse risoto é essencialmente um ragu bolonhese em forma de risoto."
    ]
  },
  {
    name: "Risoto de Cenoura e Gengibre 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto alaranjado com cenoura assada e canela picante de gengibre",
    category: "Risotos",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "400 g cenoura",
      "20 g gengibre fresco ralado",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "iogurte, parmesão, manteiga",
      "coentro, azeite"
    ],
    instructions: [
      "Asse as cenouras cortadas em rounds a 200 °C por 20 minutos até caramelizarem e ficarem douradas. A caramelização concentra o açúcar natural.",
      "Processe 2/3 da cenoura assada com caldo quente — purê alaranjado intenso.",
      "Refogue cebola. Adicione o gengibre ralado e refogue 1 minuto — o aroma picante preenche a cozinha.",
      "Toste o arroz. Vinho. Continue com caldo quente por 15 minutos.",
      "Na metade, adicione o purê de cenoura — o risoto ficará alaranjado.",
      "Nos últimos 3 minutos, adicione as cenouras assadas inteiras reservadas.",
      "Retire do fogo. Parmesão e manteiga.",
      "Sirva com coentro fresco picado, gotas de iogurte e fio de azeite. O picante do gengibre e o doce da cenoura formam par perfeito."
    ],
    tips: [
      "Gengibre fresco ralado no refogado: calor transforma o picante em suavidade complexa.",
      "Cenoura assada vs cozida: completamente diferente — a assada tem sabor de caramelo.",
      "Iogurte frio com gengibre: combinação do Oriente Médio que funciona maravilhosamente."
    ]
  },
  {
    name: "Risoto de Polvo Mediterrâneo 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto com polvo suculento, tomate e azeitonas — sabores do Mediterrâneo",
    category: "Risotos",
    type: "dinner",
    difficulty: "difícil",
    prepTime: 20,
    cookTime: 60,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "1 polvo médio (700 g) cozido e cortado",
      "200 g tomate cereja",
      "80 g azeitonas kalamata",
      "1 litro caldo de peixe",
      "150 ml vinho branco, alho, alcaparras, salsinha"
    ],
    instructions: [
      "Cozinhe o polvo: mergulhe em água fervente por 40 minutos a 1 hora até ficar macio ao inserir um garfo. Resfrie e corte em tentáculos de 3 cm.",
      "Grelhe os tentáculos em frigideira bem quente por 2 minutos até ficarem levemente carbonizados — cria textura crocante fora e macia dentro.",
      "Prepare caldo de peixe ou use o caldo do cozimento do polvo (saboroso, levemente escuro).",
      "Refogue alho fatiado em azeite. Toste arroz 2 minutos. Adicione vinho branco.",
      "Continue com caldo por 18 minutos. Na metade, adicione os tomates cereja cortados ao meio e as azeitonas.",
      "Nos últimos 3 minutos ao polvo grelhado fatiado.",
      "Retire do fogo. Apenas manteiga na mantecatura — sem parmesão com frutos do mar.",
      "Sirva with alcaparras, salsinha, raspas de limão e fio de azeite extravirgem."
    ],
    tips: [
      "Polvo deve ser cozido primeiro e depois grelhado — ordem inversa deixa borrachudo.",
      "Caldo do cozimento do polvo é escuro e saboroso — excelente base para o risoto.",
      "Kalamata e alcaparras: a acidez mediterrânea que equilibra o sabor rico do polvo."
    ]
  },
  {
    name: "Risoto de Caju e Queijo Coalho 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description: "Risoto nordestino com caju fresco, queijo coalho grelhado e coentro",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "4 cajus frescos (pedúnculos) ou 200 ml suco de caju",
      "200 g queijo coalho em cubo",
      "1 litro caldo de legumes",
      "50 ml cachaça",
      "coentro, pimenta de cheiro, manteiga"
    ],
    instructions: [
      "Corte os pedúnculos dos cajus em cubos de 1,5 cm. Reserve as castanhas assadas separadas para decoração.",
      "Grelhe os cubos de queijo coalho em frigideira seca em fogo alto por 1 a 2 minutos cada face — ficam dourados e levemente crocantes por fora, macios por dentro.",
      "Refogue cebola e pimenta de cheiro. Flambe com cachaça — brasileiríssimo.",
      "Toste o arroz por 2 minutos. Continue com caldo por 18 minutos.",
      "Na metade, adicione o caju em cubos — amolecerão levemente mas manterão textura.",
      "Se usar suco de caju, adicione como parte do caldo — dará cor amarela suave.",
      "Retire do fogo. Manteiga (sem parmesão). Mantecatura.",
      "Sirva com queijo coalho grelhado por cima, castanhas assadas, coentro fresco e gotas de limão."
    ],
    tips: [
      "Caju fresco (pedúnculo) é diferente da castanha — é a 'maçã' amarela/vermelha, suculenta e ácida.",
      "Queijo coalho grelhado na hora serve quente, crocante por fora, derretendo por dentro.",
      "Cachaça flambe: momento dramático, sabor tipicamente nordestino."
    ]
  },
  {
    name: "Risoto de Shimeji e Shoyu 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto japonês-italiano com shimeji dourado e toque umami de shoyu",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "400 g shimeji branco e preto",
      "3 colheres sopa shoyu",
      "1 litro caldo de kombu (ou legumes)",
      "100 ml sake seco",
      "manteiga, gengibre, cebolinha"
    ],
    instructions: [
      "Caldo de kombu: ferva 1 tira de alga kombu 10 cm em 1 litro de água por 10 minutos. Remova antes de ferver. Caldo umami natural.",
      "Separe os cogumelos shimeji em grupos de 3 a 4. Doure em frigideira bem quente com manteiga por 3 minutos — não mexa, deixe dourar.",
      "Acrescente o shoyu diretamente na frigideira dos cogumelos — carameliza e cria glaze umami.",
      "Refogue cebola e gengibre. Toste o arroz. Adicione o sake (substituição japonesa do vinho).",
      "Continue com caldo de kombu quente por 18 minutos.",
      "No 15° minuto, adicione os cogumelos com glaze de shoyu.",
      "Retire do fogo. Manteiga (sem parmesão) para mantecatura estilo japonês.",
      "Sirva com cebolinha picada e gergelim preto tostado — fusão japonesa-italiana harmoniosa."
    ],
    tips: [
      "Caldo de kombu é umami natural sem MSG artificial — diferencial de sabor notable.",
      "Sake no lugar do vinho é a virada japonesa desta fusão.",
      "Shimeji dourado sem mexer: cria textura crocante que se perderia se mexesse."
    ]
  },
  {
    name: "Risoto de Abóbora com Carne-Seca 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description: "Risoto com doce da abóbora equilibrado pela carne-seca dessalgada",
    category: "Risotos",
    type: "lunch",
    difficulty: "médio",
    prepTime: 120,
    cookTime: 35,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "400 g abóbora japonesa assada",
      "200 g carne-seca dessalgada e desfiada",
      "1 litro caldo de frango",
      "100 ml cachaça",
      "manteiga, cebola, alho, coentro"
    ],
    instructions: [
      "Dessalgue a carne-seca: cubra com água fria por 8 horas na geladeira trocando a água 2 vezes. Cozinhe na panela de pressão por 30 minutos. Desfie.",
      "Asse a abóbora em cubos a 200 °C por 25 minutos até caramelizar. Processe metade em purê com caldo.",
      "Doure a carne-seca desfiada em manteiga com alho por 5 minutos. Reserve.",
      "Refogue cebola. Flambe com cachaça. Toste o arroz.",
      "Continue com caldo por 15 minutos. Na metade, adicione o purê de abóbora.",
      "No 13° minuto, adicione os cubos de abóbora e a carne-seca dourada.",
      "Retire do fogo. Manteiga e parmesão. Mantecatura.",
      "O contraste doce da abóbora + salgado da carne-seca é tipicamente nordestino. Sirva com coentro fresco."
    ],
    tips: [
      "Dessalgue adequado da carne-seca é essencial — muito sal arruína o prato.",
      "Carne-seca dourada tem textura crocante que contrasta com o risoto cremoso.",
      "Flambar com cachaça é a alma brasileira deste risoto."
    ]
  },
  {
    name: "Risoto de Camarão com Leite de Coco 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto tropical inspirado no moqueca — camarão, leitede coco e coentro",
    category: "Risotos",
    type: "dinner",
    difficulty: "médio",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "400 g camarão médio limpo",
      "400 ml leite de coco",
      "600 ml caldo de camarão",
      "pimenta dedo-de-moça, coentro, dendê",
      "cebola, alho, tomate, limão"
    ],
    instructions: [
      "Tempere os camarões com limão, alho e sal por 15 minutos. Saltei em frigideira quente 1 a 2 minutos e reserve.",
      "Refogue cebola, alho e pimenta dedo-de-moça em azeite + 1 colher de dendê para cor e sabor.",
      "Adicione tomate amassado. Toste o arroz por 2 minutos.",
      "Misture o leite de coco com o caldo de camarão — use como líquido do risoto.",
      "Continue adicionando o líquido coco-camarão por 18 minutos mexendo. O risoto ficará cremoso e levemente amarelado.",
      "Nos últimos 2 minutos, adicione os camarões pré-cozidos.",
      "Retire do fogo. Manteiga (sem parmesão). Suco de limão.",
      "Sirva com coentro fresco, pimenta malagueta e arroz — este risoto carrega a alma da moqueca baiana."
    ],
    tips: [
      "Dendê em pequena quantidade dá cor e flavor autenticamente baiano sem engordar excessivamente.",
      "Leite de coco + caldo de camarão: base deliciosa que transforma o risoto.",
      "NUNCA parmesão com frutos do mar e especialmente não com moqueca."
    ]
  },
  {
    name: "Risoto de Pesto Siciliano 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Risoto com pesto vermelho siciliano de tomate cereja e amêndoas",
    category: "Risotos",
    type: "lunch",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    ingredients: [
      "300 g arbório",
      "PESTO ROSSO: 200 g tomate cereja assado + 50 g amêndoas tostadas + alho + basílico + pecorino + azeite",
      "1 litro caldo de legumes",
      "100 ml vinho branco",
      "50 g pecorino, manteiga"
    ],
    instructions: [
      "PESTO SICILIANO (alla Trapanese): processe tomate cereja assado com amêndoas tostadas, alho, basílico, pecorino e azeite até formar pasta grossa. Tempere.",
      "Prepare risoto base: cebola, arroz tostado, vinho, caldo por 18 minutos.",
      "Retire do fogo. Adicione o pesto siciliano em 2 a 3 colheres generosas.",
      "Pecorino ralado e manteiga na mantecatura.",
      "O pesto entra fora do fogo — calor destruiria o basílico fresco.",
      "O risoto terá cor vermelha-rosada do tomate e sabor de amêndoas tostadas.",
      "Sirva com folhas de basílico fresco, amêndoas tostadas por cima e fio de azeite.",
      "Pesto siciliano é diferente do genovese — mais rústico, sem pinhão, com amêndoas e tomate."
    ],
    tips: [
      "Pesto alla Trapanese origina de Trapani, Sicília — é a variante com amêndoas e tomate.",
      "Amêndoas tostadas dão sabor completamente diferente das cruas — tostamento é obrigatório.",
      "Pecorino siciliano é mais salgado que o romano — use com moderação."
    ]
  }
];
