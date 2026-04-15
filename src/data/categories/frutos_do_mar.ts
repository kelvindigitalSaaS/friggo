import { Recipe } from "@/types/friggo";

export const receitasFrutosMar: Omit<Recipe, "id" | "usesExpiringItems">[] = [
  {
    name: "Camarão na Moranga 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Camarão cremoso servido dentro de uma abóbora de pescoço assada — prato baiano icônico",
    category: "Frutos do Mar",
    type: "lunch",
    difficulty: "médio",
    prepTime: 30,
    cookTime: 60,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 abóbora moranga pequena (2 kg)",
      "700 g de camarão limpo temperado",
      "1 cebola, 3 dentes de alho",
      "1 lata de creme de leite",
      "200 g de cream cheese",
      "1 xícara de requeijão cremoso",
      "1 pimentão vermelho",
      "coentro, azeite, azeite de dendê",
      "pimenta dedo-de-moça, sal"
    ],
    instructions: [
      "Lave a moranga, corte a tampa. Retire as sementes e parte da polpa interna com colher, deixando paredes de 3–4 cm.",
      "Pincele o interior com azeite e sal. Tampe e leve ao forno a 180 °C por 40–50 min até amaciar (verifique espetando com faca).",
      "Enquanto a moranga assa: tempere o camarão com sal, limão e alho. Deixe por 15 min.",
      "Refogue cebola e alho no azeite de dendê por 3 min. Adicione o pimentão e a pimenta dedo-de-moça.",
      "Adicione o camarão e saltei em fogo alto por 3–4 min apenas — camarão passa do ponto rapidamente.",
      "Reduza o fogo. Adicione creme de leite, cream cheese e requeijão. Misture até homogêneo e cremoso.",
      "Ajuste sal e adicione coentro fresco. Retire a moranga do forno e, com cuidado, coloque o recheio de camarão dentro.",
      "Leve ao forno novamente por 10 min. Sirva na própria moranga, raspando a polpa junto ao servir."
    ],
    tips: [
      "O azeite de dendê é o elemento autêntico baiano — não substitua.",
      "Camarão cozinha em 3–4 min. Além disso fica borrachudo.",
      "Aqueço o cream cheese antes de adicionar para facilitar a mistura."
    ]
  },
  {
    name: "Moqueca de Camarão Baiana 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Ensopado de camarão com leite de coco e azeite de dendê — sabor da Bahia",
    category: "Frutos do Mar",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "600 g de camarão limpo (médio/grande)",
      "400 ml de leite de coco",
      "2 colheres de azeite de dendê",
      "1 cebola grande em rodelas",
      "2 tomates maduros en rodelas",
      "1 pimentão verde e 1 vermelho",
      "pimenta dedo-de-moça a gosto",
      "coentro fresco",
      "sal, suco de limão"
    ],
    instructions: [
      "Tempere o camarão com sal, suco de limão e alho amassado por 20 min. Reserve.",
      "Em panela de barro (tradicional) ou panela comum, aqueça o azeite de dendê.",
      "Faça camadas na panela: cebola → pimentões → tomates → metade do coentro. Cozinhe em fogo médio por 5 min sem mexer.",
      "Adicione os camarões temperados por cima. Despeje o leite de coco.",
      "Tampe e cozinhe em fogo médio por 8–10 min. Não mexa para manter as camadas.",
      "Adicione a pimenta dedo-de-moça e ajuste o sal.",
      "Abra a panela, adicione o restante do coentro fresco e mais azeite de dendê.",
      "Sirva com arroz branco e pirão (farofa de dendê). Pirão: dissolva farinha de mandioca no caldo quente."
    ],
    tips: [
      "Panela de barro distribui o calor uniformemente e é tradicional.",
      "Não mexa a moqueca — as camadas ficam bonitas e os sabores se preservam.",
      "Azeite de dendê não deve ser aquecido em temperatura muito alta."
    ]
  },
  {
    name: "Moqueca de Peixe Capixaba 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Moqueca do Espírito Santo — mais leve, sem dendê ou leite de coco",
    category: "Frutos do Mar",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "800 g de peixe firme (badejo, robalo, dourado) em postas",
      "2 cebolas em rodelas",
      "3 tomates maduros em rodelas",
      "1 pimentão verde, 1 amarelo",
      "urucum (colorau) a gosto",
      "coentro, salsinha frescos",
      "azeite, sal, pimenta",
      "1 limão"
    ],
    instructions: [
      "Tempere as postas de peixe com sal, pimenta, limão e alho. Marine por 20 min.",
      "Unte o fundo de uma panela de barro com azeite. Monte camadas: cebola → tomates → pimentões.",
      "Coloque as postas de peixe sobre as camadas de legumes.",
      "Misture azeite e urucum (para a cor laranja característica). Despeje sobre o peixe.",
      "Tampe e leve ao fogo médio por 15–20 min. O peixe cozinhará no vapor dos próprios vegetais.",
      "Verifique o ponto: peixe deve lascar facilmente com garfo. Não cozinhe demais.",
      "Adicione coentro e salsinha frescos. Sirva direto na panela.",
      "Acompanhe com arroz branco e pirão capixaba (caldo de peixe grosso com farinha)."
    ],
    tips: [
      "Capixaba não leva dendê nem coco — é a diferença fundamental da baiana.",
      "Urucum (bixina) dá a cor amarelo-alaranjada.",
      "Peixe de carne firme não desmancha — evite tilápia para moqueca."
    ]
  },
  {
    name: "Salmão Grelhado ao Molho de Manteiga Limão 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Filé de salmão com crosta dourada e molho de manteiga e alcaparras",
    category: "Frutos do Mar",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "2 filés de salmão (~200 g cada)",
      "50 g de manteiga",
      "suco de 1 limão",
      "2 colheres de alcaparras",
      "2 dentes de alho fatiados",
      "endro/dill fresco",
      "sal, pimenta, azeite"
    ],
    instructions: [
      "Retire o salmão da geladeira 15 min antes. Seque os filés com papel toalha.",
      "Tempere apenas com sal e pimenta. Não use ácido antes de grelhar — endurece a proteína.",
      "Aqueça frigideira antiaderente ou de ferro com um pouco de azeite em fogo alto.",
      "Coloque o salmão com a pele para baixo. Pressione levemente por 30 seg. Grelhe por 4–5 min SEM MOVER.",
      "Vire com espátula e grelhe por mais 2–3 min. Para salmão rosado no centro (ideal), pare por aqui.",
      "Retire o salmão. Reduza o fogo. Adicione a manteiga e o alho na mesma frigideira.",
      "Quando a manteiga espumar, adicione limão e alcaparras. Cozinhe por 1 min.",
      "Finalize com dill fresco. Despeje o molho sobre o salmão. Sirva com legumes cozidos no vapor."
    ],
    tips: [
      "Salmão bem passado perde suculência — o centro rosado é o ponto ideal.",
      "Pele crocante: frigideira muito quente e não mover o peixe nos primeiros 4 min.",
      "Manteiga queimada (beurre noisette) dá sabor de avelã — cuide para não passar do ponto."
    ]
  },
  {
    name: "Bacalhau à Brás 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Bacalhau desfiado com ovos mexidos, batata palha e azeitonas — Portugal em um prato",
    category: "Frutos do Mar",
    type: "lunch",
    difficulty: "médio",
    prepTime: 30,
    cookTime: 20,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1559967622-f40a2d1e81b2?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "400 g de bacalhau (dessalgado, cozido, desfiado)",
      "6 ovos",
      "2 cebolas grandes fatiadas",
      "4 dentes de alho",
      "100 g de batata palha",
      "azeitonas pretas",
      "salsinha",
      "azeite português, sal, pimenta"
    ],
    instructions: [
      "DESSALGAR O BACALHAU: Deixe em água fria por 24–48 h, trocando a água a cada 8 h. Depois cozinhe por 15 min em água. Escorra, retire pele e espinhas. Desfie em lascas.",
      "Refogue as cebolas em bastante azeite em fogo médio por 15 min até ficarem macias e translúcidas — nunca douradas.",
      "Adicione o alho fatiado e cozinhe por 2 min.",
      "Adicione o bacalhau desfiado e misture bem com a cebola. Cozinhe por 3 min.",
      "Bata os ovos levemente, tempere com pimenta. Despeje sobre o bacalhau.",
      "Mexa delicadamente em fogo baixo, como ovos mexidos cremosos. Para quando os ovos estiverem ainda úmidos — continuarão cozinhando no calor residual.",
      "Fora do fogo, adicione a batata palha e misture rapidamente para não amolecer totalmente.",
      "Finalize com salsinha picada e azeitonas. Sirva imediatamente."
    ],
    tips: [
      "O bacalhau deve estar bem dessalgado — prove antes de adicionar qualquer sal.",
      "Cebola MOLE, não dourada — é o diferencial do Brás.",
      "Batata palha deve ser adicionada no último segundo para manter a crocância."
    ]
  },
  {
    name: "Caldeirada de Frutos do Mar 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description: "Ensopado completo de frutos do mar com batatas e tomates",
    category: "Frutos do Mar",
    type: "lunch",
    difficulty: "médio",
    prepTime: 25,
    cookTime: 35,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "300 g de camarão médio",
      "300 g de mariscos na concha",
      "300 g de lula em anéis",
      "300 g de peixe em cubos",
      "4 batatas em cubos",
      "2 cebolas, 4 tomates",
      "pimentão, vinho branco",
      "coentro, sal, azeite"
    ],
    instructions: [
      "Refogue cebola em azeite até amolecer. Adicione pimentão e alho.",
      "Adicione tomates pelados e amassados. Cozinhe por 5 min até virar molho.",
      "Adicione vinho branco, deixe evaporar 2 min.",
      "Coloque as batatas em cubos. Adicione água ou caldo de peixe. Cozinhe por 15 min.",
      "Adicione a lula (cozinha mais rápido), depois o peixe. Cozinhe a cada 3 min.",
      "Adicione os mariscos na concha. Tampe por 5 min — abrirão no vapor.",
      "Por último, o camarão. Cozinhe 3–4 min.",
      "Finalize com coentro fresco e ajuste sal. Sirva com pão rústico."
    ],
    tips: [
      "Adicione os frutos do mar em ordem de tempo de cozimento — do mais demorado ao mais rápido.",
      "Mariscos fechados após cozimento devem ser descartados.",
      "Caldo deve ter sabor intenso — pode adicionar extrato de tomate."
    ]
  },
  {
    name: "Polvo à Lagareiro 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Polvo assado com azeite, alho e batatas cozidas — receita portuguesa premiada",
    category: "Frutos do Mar",
    type: "lunch",
    difficulty: "médio",
    prepTime: 20,
    cookTime: 90,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1559967622-f40a2d1e81b2?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 polvo de ~1,5 kg",
      "8 batatas pequenas",
      "8 dentes de alho com casca",
      "azeite extra virgem generoso",
      "sal grosso",
      "coentro ou salsinha",
      "pimenta-do-reino"
    ],
    instructions: [
      "Congele o polvo por 24 h (amacia as fibras) e descongele na véspera.",
      "Cozinhe o polvo: coloque em panela sem água. O próprio líquido do polvo cozinha. Tampe e leve ao fogo médio por 40–50 min até macio. Esfrie na própria panela.",
      "Cozinhe as batatas com casca em água salgada por 20 min. Escorra e amasse levemente com a palma (passe-les-froid).",
      "Ferva uma assadeira com azeite abundante e alho com casca por 5 min.",
      "Disponha o polvo e as batatas na assadeira. Regue generosamente com azeite e sal grosso.",
      "Leve ao forno a 220 °C por 20–25 min até o polvo e as batatas ficarem levemente caramelizados.",
      "Adicione mais azeite e alho amassado por cima ao sair do forno.",
      "Sirva com pão rústico para absorver o azeite de alho."
    ],
    tips: [
      "Congelo é obrigatório para polvo comprado fresco — amacia sem martelar.",
      "Azeite é o protagonista — use um de qualidade.",
      "Batatas amassadas absorvem mais azeite e ficam mais saborosas."
    ]
  },
  {
    name: "Tilápia Assada com Crosta de Ervas 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Filé de tilápia assado com crosta crocante de ervas e parmesão",
    category: "Frutos do Mar",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "4 filés de tilápia",
      "50 g de parmesão ralado",
      "50 g de farinha de rosca",
      "alho em pó, orégano, tomilho",
      "suco de 1 limão",
      "azeite, sal, pimenta"
    ],
    instructions: [
      "Tempere os filés com sal, pimenta e suco de limão. Descanse por 10 min.",
      "Misture parmesão, farinha de rosca, alho em pó e tomilho.",
      "Seque o excesso de líquido dos filés com papel toalha.",
      "Passe levemente cada filé em azeite. Cubra com a crosta de parmesão pressionando para aderir.",
      "Disponha em assadeira forrada com papel manteiga.",
      "Asse a 200 °C por 15–18 min até a crosta dourar e o peixe ficar opaco.",
      "Sirva com salada verde e limão."
    ],
    tips: [
      "Peixe mágico não precisa ser virado durante o assado.",
      "Crosta aderida graças ao azeite e à pressão dos dedos."
    ]
  },
  {
    name: "Lula Recheada ao Molho de Tomate 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Tubos de lula recheados com carne e frutos do mar, cozidos em molho",
    category: "Frutos do Mar",
    type: "lunch",
    difficulty: "difícil",
    prepTime: 40,
    cookTime: 40,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1559967622-f40a2d1e81b2?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "8 tubos de lula grandes limpos",
      "RECHEIO: camarão picado, carne de siri, arroz cozido, cebola, alho, coentro",
      "MOLHO: 400 g tomate pelado, vinho branco, cebola, alho, azeite",
      "sal, pimenta, pimenta calabresa"
    ],
    instructions: [
      "Prepare o recheio: refogue cebola e alho. Adicione camarão e siri picados. Cozinhe 3 min. Misture com arroz cozido e coentro. Resfrie.",
      "Recheie cada tubo até 2/3 da capacidade — o recheio expande ao cozinhar. Feche com palito.",
      "Faça o molho: refogue cebola e alho. Adicione vinho branco. Adicione tomates pelados amassados. Cozinhe 10 min.",
      "Tempere o molho com sal, pimenta e pimenta calabresa.",
      "Adicione as lulas recheadas ao molho. Tampe e cozinhe em fogo médio por 25–30 min.",
      "Lula ficará macia — a técnica é cozinhar lentamente. Lula cozida 3–5 min fica borrachuda, a partir de 20+ min fica macia.",
      "Sirva as lulas inteiras regadas com o molho, com pão ou arroz."
    ],
    tips: [
      "Lula tem apenas dois pontos: 3–5 min (macia) ou 20+ min (macia de novo).",
      "Não encha completamente — o arroz expande.",
      "O molho pode ser feito antes e congelado."
    ]
  }
];
