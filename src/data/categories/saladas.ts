import { Recipe } from "@/types/friggo";

export const receitasSaladas: Omit<Recipe, "id" | "usesExpiringItems">[] = [
  {
    name: "Salada Caesar Clássica 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Alface romana crocante com molho Caesar cremoso, croutons e parmesão",
    category: "Saladas",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 10,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "2 pés de alface romana",
      "100 g de parmesão em lascas",
      "MOLHO: 2 gemas, 2 dentes alho, 4 filés anchovas, 1 colher mostarda, suco 1 limão, 100 ml azeite, parmesão",
      "CROUTONS: 4 fatias pão, azeite, alho, sal"
    ],
    instructions: [
      "CROUTONS: Corte o pão em cubos de 1,5 cm. Misture com azeite, alho em pó e sal. Espalhe em assadeira. Asse a 180°C por 12–15 min até dourar e crocante. Resfrie.",
      "MOLHO: Amasse as anchovas com o back da faca até virar pasta. Misture com alho amassado.",
      "Em tigela, bata as gemas com mostarda. Adicione o azeite em fio fino, batendo constantemente para emulsionar — como maionese.",
      "Adicione anchovas com alho, suco de limão e parmesão ralado. Ajuste sal e pimenta.",
      "Lave a alface, seque bem (folhas molhadas diluem o molho). Rasgue em pedaços grandes.",
      "Numa tigela grande, misture a alface com o molho, envolvendo bem cada folha.",
      "Sirva em pratos com lascas de parmesão e croutons por cima. Sirva imediatamente."
    ],
    tips: [
      "Folhas secas são essenciais — o molho não adere à alface molhada.",
      "Anchovas no molho são o sabor umami secreto — não se sentem como peixe.",
      "Molho Caesar dura até 3 dias na geladeira; croutons, 1 semana em recipiente fechado."
    ]
  },
  {
    name: "Salada Caprese 📋", emoji: "🥣", region: "INT", estimatedCost: "low", 
    description:
      "Tomate, mussarela de búfala e manjericão — simplicidade italiana perfeita",
    category: "Saladas",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 10,
    cookTime: 0,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "4 tomates maduros e grandes",
      "250 g de mussarela de búfala fresca",
      "folhas de manjericão fresco",
      "azeite extra virgem de qualidade",
      "vinagre balsâmico ou redução de balsâmico",
      "sal grosso e pimenta-do-reino"
    ],
    instructions: [
      "Escolha tomates no pico da maturação — é o coração da receita. Temperatura ambiente, nunca gelado.",
      "Fatie os tomates em rodelas de 0,8 cm. Fatie a mussarela na mesma espessura.",
      "Intercale rodelas de tomate e mussarela em um prato grande ou travessa.",
      "Distribua folhas de manjericão fresco entre as fatias.",
      "Tempere com sal grosso e pimenta moída na hora.",
      "Regue generosamente com azeite extra virgem de qualidade — é o tempero principal.",
      "Adicione pingos de redução de balsâmico por cima.",
      "Sirva imediatamente à temperatura ambiente. Geladeira mata o sabor dos tomates."
    ],
    tips: [
      "Tomate de qualidade e temperatura ambiente são absolutamente fundamentais.",
      "Azeite extra virgem de primeira qualidade é imprescindível — a salada literalmente depende dele.",
      "Não substitua mussarela de búfala por mussarela de vaca — textura e sabor são completamente diferentes."
    ]
  },
  {
    name: "Salada Niçoise 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description:
      "Salada francesa completa com atum, ovos cozidos, feijão verde e batata",
    category: "Saladas",
    type: "healthy",
    difficulty: "médio",
    prepTime: 30,
    cookTime: 20,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "200 g de feijão verde (vagem)",
      "4 batatas pequenas",
      "4 ovos",
      "200 g de atum em lata de qualidade",
      "tomate cereja, azeitonas pretas",
      "anchovas (opcional)",
      "VINAGRETE: mostarda dijon, vinagre, azeite, alho, sal"
    ],
    instructions: [
      "OVO MOLLET: Ferva água, mergulhe os ovos gelados por 6 min exatos. Transfira para água gelada. Descasque com cuidado — a gema fica mole.",
      "Cozinhe as batatas com casca por 15–18 min até macias. Resfrie, fatie.",
      "Feijão verde: branqueie em água fervente com sal por 3 min. Choque térmico em água gelada. Fica verde e crocante.",
      "Prepare o vinagrete: misture mostarda, vinagre, sal e alho. Emulsione com azeite em fio.",
      "Monte a salada organizando cada componente separado na travessa: vagem, batata, tomate cereja, azeitonas.",
      "Coloque o atum escorrido no centro. Distribua os ovos cortados ao meio por cima.",
      "Regue com o vinagrete. Adicione anchovas se usar.",
      "Sirva com pão baguete."
    ],
    tips: [
      "Ovo mollet (6 min) é característica da niçoise autêntica — gema cremosa.",
      "Cada componente é montado separado para apreciação visual.",
      "Versão tradicional não mistura os ingredientes no prato — apenas regados com molho."
    ]
  },
  {
    name: "Salada de Quinoa com Legumes Assados 📋", emoji: "🥣", region: "US", estimatedCost: "low", 
    description: "Quinoa nutritiva com abóbora, grão-de-bico e tahine",
    category: "Saladas",
    type: "healthy",
    difficulty: "fácil",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "200 g de quinoa",
      "300 g de abóbora em cubos",
      "1 lata de grão-de-bico",
      "MOLHO TAHINE: 3 colh tahine, suco 1 limão, alho, azeite, sal, água",
      "rúcula, salsinha",
      "azeite, cominho, páprica, sal"
    ],
    instructions: [
      "Cozinhe a quinoa: lave bem (remove o sabor amargo). Cozinhe em 2x o volume de água por 15 min. Solte com garfo.",
      "LEGUMES ASSADOS: Misture a abóbora e o grão-de-bico escorrido com azeite, cominho, páprica e sal. Asse a 200 °C por 25–30 min até caramelular.",
      "MOLHO TAHINE: Misture tahine, limão, alho amassado, sal e água aos poucos até consistência cremosa fluida.",
      "Misture a quinoa com os legumes assados. Deixe amornar.",
      "Adicione rúcula e salsinha picada. Misture.",
      "Sirva com o molho de tahine por cima. Pode ser servido morno ou frio."
    ],
    tips: [
      "Quinoa deve ser lavada em peneira fina — saponinas causam amargor.",
      "Legumes assados a 200 °C caramelizam e ficam mais saborosos.",
      "Molho tahine engrossa ao repousar — adicione água para afinar."
    ]
  },
  {
    name: "Salada de Frutas Tropicais com Calda de Limão 📋", emoji: "🥣", region: "BR", estimatedCost: "low", 
    description: "Frutas brasileiras em calda levemente adocicada com hortelã",
    category: "Saladas",
    type: "snack",
    difficulty: "fácil",
    prepTime: 20,
    cookTime: 5,
    servings: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1479796650946-3aa86a06e4f3?auto=format&fit=crop&q=80&w=600&h=400",
    ingredients: [
      "1 manga, 1 mamão, 2 kiwis",
      "1 xícara de morango, 1 xícara de uvas",
      "1 abacaxi pequeno",
      "CALDA: suco 2 limões, 2 colh mel, raspas limão, hortelã fresca"
    ],
    instructions: [
      "Prepare a calda primeiro: misture suco de limão, mel e raspas. Mexa até dissolver. Reserve com folhas de hortelã.",
      "Corte as frutas em cubos uniformes de 1,5–2 cm.",
      "Adicione os morangos cortados ao meio e as uvas inteiras (ou cortadas).",
      "Despeje a calda sobre as frutas e misture delicadamente.",
      "Refrigere por 30 min para os sabores se misturarem.",
      "Sirva gelada com folhas de hortelã fresca."
    ],
    tips: [
      "A calda com mel e limão realça o sabor das frutas sem açúcar em excesso.",
      "Limão evita escurecimento das frutas."
    ]
  }
];
