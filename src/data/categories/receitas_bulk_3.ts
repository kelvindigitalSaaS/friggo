import { Recipe } from "@/types/friggo";

type RecipeEntry = Omit<Recipe, "id" | "usesExpiringItems">;

function g(base: string, vars: string[], cat: string, type: Recipe["type"], ing: string[], inst: string[], prep: number, cook: number, srv: number, diff: Recipe["difficulty"]): RecipeEntry[] {
  return vars.map(v => ({
    name: `${base} ${v}`, emoji: "🥣", region: "LATAM", estimatedCost: "high",  description: `${base} com ${v.toLowerCase()} - sabor autêntico e preparo especial`,
    category: cat, type, ingredients: [...ing, v.toLowerCase()], instructions: inst,
    prepTime: prep, cookTime: cook, servings: srv, difficulty: diff,
  }));
}

export const receitasBulk3: RecipeEntry[] = [
  // COMIDA DE BOTECO - 25
  ...g("Boteco", [
    "Bolinho de Feijoada", "Bolinho de Aipim com Carne Seca",
    "Isca de Frango Crocante", "Calabresa Acebolada", "Batata Frita Trufada",
    "Polenta Frita com Molho", "Provolone à Milanesa", "Torresmo de Porco",
    "Pastel de Queijo e Presunto", "Caldo de Mocotó", "Caldo Verde",
    "Frango a Passarinho", "Espetinho de Carne na Brasa",
    "Mandioca Frita com Bacon", "Mini Coxinha de Frango",
    "Croquete de Carne Moída", "Sardinha Frita com Limão",
    "Rabada com Polenta", "Angu com Quiabo", "Linguiça na Cachaça",
    "Petisco de Amendoim Torrado", "Dadinho de Tapioca com Geleia",
    "Porção de Camarão Frito", "Carne de Sol Acebolada", "Churrasquinho de Gato"
  ], "Boteco", "snack", ["cerveja", "sal", "pimenta", "limão"],
  ["Prepare o ingrediente", "Empane ou tempere", "Frite ou grelhe", "Sirva com molho e limão"], 15, 15, 4, "easy"),

  // LOW CARB - 25
  ...g("Low Carb", [
    "Wrap de Alface com Frango", "Pizza de Frigideira de Couve-flor",
    "Espaguete de Abobrinha com Bolonhesa", "Lasanha de Berinjela",
    "Hambúrguer sem Pão com Salada", "Omelete de Queijo e Espinafre",
    "Camarão ao Alho e Óleo", "Salmão com Legumes Assados",
    "Frango Recheado com Cream Cheese", "Bife Acebolado com Salada",
    "Muffin de Ovo com Bacon", "Panqueca de Frango com Queijo",
    "Carne Moída com Abóbora", "Couve-flor Gratinada",
    "Quiche sem Massa de Espinafre", "Abobrinha Recheada com Carne",
    "Pimentão Recheado Low Carb", "Creme de Abóbora com Gengibre",
    "Fathead Pizza", "Chips de Parmesão", "Mousse de Abacate com Cacau",
    "Pudim de Chia e Coco", "Brigadeiro de Whey", "Bolo de Caneca Fit",
    "Sorvete de Banana e Cacau"
  ], "Low Carb", "lunch", ["vegetais", "proteína", "gordura boa"],
  ["Prepare substituições low carb", "Cozinhe com técnica saudável", "Monte o prato", "Sirva com guarnição verde"], 15, 20, 2, "easy"),

  // COMIDA ÁRABE - 20
  ...g("Receita Árabe", [
    "Kebab de Cordeiro com Homus", "Esfiha Aberta de Carne",
    "Kibe Frito Clássico", "Kibe Cru Premium", "Tabule Libanês Original",
    "Charuto de Folha de Uva", "Kafta na Grelha", "Shawarma de Frango",
    "Manakeesh com Zaatar", "Ful Medames", "Fatayer de Espinafre",
    "Musakhan de Frango", "Mujaddara de Lentilha", "Maqluba de Frango",
    "Knafeh de Queijo", "Basbousa de Semolina", "Halva de Gergelim",
    "Shish Tawook Grelhado", "Coalhada Seca com Azeite", "Lahmajun Turco"
  ], "Árabe", "lunch", ["tahine", "azeite", "especiarias árabes", "limão"],
  ["Prepare a massa ou base", "Tempere com especiarias árabes", "Cozinhe ou asse", "Sirva com molhos tradicionais"], 20, 25, 4, "medium"),

  // COMIDA AFRICANA - 15
  ...g("Receita Africana", [
    "Jollof Rice Nigeriano", "Injera com Doro Wat", "Tagine de Cordeiro Marroquino",
    "Bobotie Sul-Africano", "Thieboudienne Senegalês", "Bunny Chow",
    "Suya de Carne", "Egusi Soup", "Fufu com Sopa de Amendoim",
    "Shakshuka Marroquina", "Couscous Marroquino Real",
    "Pastilla de Frango", "Harira Marroquina", "Brik Tunisiano",
    "Chakalaka Sul-Africana"
  ], "Africana", "lunch", ["especiarias africanas", "pimenta", "tomate", "cebola"],
  ["Prepare especiarias frescas", "Cozinhe com técnica tradicional", "Monte o prato", "Sirva com acompanhamento típico"], 25, 45, 4, "medium"),

  // COLOMBIANA/VENEZUELANA - 15
  ...g("Receita Latina", [
    "Arepas com Queso", "Bandeja Paisa", "Ajiaco Bogotano",
    "Empanadas Colombianas", "Patacones com Guacamole",
    "Sancocho de Gallina", "Pabellón Criollo", "Cachapa Venezuelana",
    "Lechona Tolimense", "Tamales Colombianos", "Pandebono de Queijo",
    "Buñuelos Colombianos", "Arroz con Coco", "Mazamorra Chiquita",
    "Obleas com Arequipe"
  ], "Latina", "lunch", ["milho", "feijão", "banana-da-terra", "queijo"],
  ["Prepare ingredientes frescos", "Cozinhe com técnica latina", "Monte o prato", "Sirva com arepa ou arroz"], 20, 30, 4, "medium"),

  // COMIDAS RÁPIDAS GOURMET - 25
  ...g("Express Gourmet", [
    "Bruschetta de Tomate Cereja e Burrata", "Crostini de Figo e Gorgonzola",
    "Tartine de Abacate e Ovo Poché", "Panini de Presunto de Parma",
    "Wrap Caesar de Frango", "Piadina de Mozza e Rúcula",
    "Baguete de Brie e Geleia de Figo", "Toast de Salmão Defumado",
    "Bowl de Edamame e Quinoa", "Salada Niçoise Express",
    "Mini Hambúrguer de Wagyu", "Slider de Pulled Pork",
    "Ceviche Express de Salmão", "Carpaccio de Abobrinha",
    "Gazpacho em Shot", "Vichyssoise Express", "Sopa de Tomate com Pesto",
    "Poke Bowl Express", "Burrata com Tomate e Pesto",
    "Tábua de Frios Premium", "Fondue Express de Queijo",
    "Raclette Individual", "Caprese Trufada", "Prosciutto e Melão",
    "Tartare de Salmão com Chips"
  ], "Express", "snack", ["ingrediente premium", "azeite", "sal marinho"],
  ["Prepare ingredientes frescos", "Monte com elegância", "Tempere com sutileza", "Sirva imediatamente"], 10, 5, 2, "easy"),

  // NATAL/FESTAS - 20
  ...g("Receita Festiva", [
    "Chester Natalino com Frutas", "Peru de Natal com Farofa",
    "Tender com Abacaxi e Cravo", "Lombo com Ameixa e Bacon",
    "Salpicão de Natal", "Rabanada Natalina", "Pernil Assado com Laranja",
    "Arroz à Grega Festivo", "Farofa de Natal com Uva Passa",
    "Pavê de Chocolate Natalino", "Torta de Nozes", "Panettone Trufado",
    "Bolo Rei Português", "Stollen Alemão", "Gingerbread Cookies",
    "Eggnog Clássico", "Ceia de Bacalhau com Grão-de-Bico",
    "Leitoa de Natal", "Torta de Pecan Americana", "Yule Log de Chocolate"
  ], "Festiva", "lunch", ["ingrediente nobre", "manteiga", "ervas finas"],
  ["Prepare com antecedência", "Cozinhe com amor", "Decore festivamente", "Sirva em celebração"], 40, 90, 10, "medium"),

  // MASSAS ESPECIAIS - 20
  ...g("Massa Especial", [
    "Lasanha Bolonhesa Clássica", "Lasanha 4 Queijos", "Lasanha de Berinjela",
    "Cannelloni de Ricota e Espinafre", "Ravioli de Trufa",
    "Tortellini in Brodo", "Fettuccine com Camarão", "Pappardelle com Ragu de Pato",
    "Gnocchi di Patate", "Tagliatelle com Ragu alla Bolognese",
    "Bucatini all'Amatriciana", "Rigatoni alla Norma",
    "Linguine Alle Vongole", "Spaghetti alle Cozze",
    "Orecchiette con Cime di Rapa", "Paccheri con Ragù Napoletano",
    "Penne alla Vodka", "Fusilli con Pesto Trapanese",
    "Maltagliati con Fagioli", "Cavatelli con Broccoli"
  ], "Massas", "lunch", ["massa fresca", "azeite", "parmesão", "sal"],
  ["Prepare a massa fresca", "Prepare o molho", "Cozinhe a massa al dente", "Combine e sirva com queijo"], 30, 20, 4, "medium"),

  // LANCHES SAUDÁVEIS - 20
  ...g("Lanche Saudável", [
    "Bowl de Açaí Premium", "Smoothie Bowl de Morango",
    "Wrap Integral de Atum", "Sanduíche de Frango Desfiado Fit",
    "Toast de Abacate com Cottage", "Tapioca com Queijo e Tomate",
    "Crepioca de Frango com Queijo", "Bowl de Frutas com Granola",
    "Iogurte Grego com Mel e Nozes", "Overnight Oats de Chocolate",
    "Muffin Integral de Banana", "Barra de Cereal Caseira",
    "Chips de Batata-Doce Assada", "Homus com Palitos de Cenoura",
    "Bolinha de Tâmara e Cacau", "Smoothie Verde Detox",
    "Panqueca Integral de Banana", "Pão de Queijo de Batata-Doce",
    "Wrap de Salmão e Cream Cheese", "Bowl Proteico Pós-Treino"
  ], "Saudável", "snack", ["ingredientes integrais", "frutas", "sementes"],
  ["Prepare ingredientes frescos", "Monte com equilíbrio nutricional", "Decore com toppings", "Sirva como refeição leve"], 10, 5, 1, "easy"),

  // DRINKS E BEBIDAS - 20
  ...g("Bebida", [
    "Suco Verde Detox Premium", "Água Saborizada de Limão e Hortelã",
    "Limonada Suíça", "Chá Gelado de Pêssego", "Café Cold Brew",
    "Matcha Latte", "Chai Latte Especiado", "Chocolate Quente Cremoso",
    "Ponche de Frutas Tropicais", "Suco de Laranja com Cenoura",
    "Kombucha Caseira de Frutas", "Lassi de Manga",
    "Horchata Mexicana", "Água de Jamaica", "Limonada Rosa",
    "Suco de Açaí com Banana", "Vitamina de Abacate com Leite",
    "Cappuccino Cremoso", "Frappuccino Caseiro", "Chai Masala Indiano"
  ], "Bebidas", "snack", ["água", "gelo", "adoçante natural"],
  ["Prepare os ingredientes", "Combine no liquidificador ou método", "Ajuste doçura", "Sirva gelado ou quente"], 5, 0, 2, "easy"),

  // MASSAS RECHEADAS - 15
  ...g("Recheado", [
    "Panzerotti de Presunto e Queijo", "Calzone 4 Queijos",
    "Empanada de Carne Argentina", "Pastel de Vento",
    "Croquete de Jaca", "Arancini de Cogumelos",
    "Samosa de Batata com Ervilha", "Pirozhki Russo",
    "Börek Turco de Espinafre", "Coxinha de Catupiry",
    "Risole de Camarão", "Dumplings de Porco Chineses",
    "Pierogi Polonês", "Cornish Pasty", "Empada de Palmito"
  ], "Salgados", "snack", ["massa", "recheio", "ovo para empanar"],
  ["Prepare a massa", "Faça o recheio", "Monte e feche", "Frite ou asse até dourar"], 30, 15, 6, "medium"),

  // PRATOS ÚNICOS ELABORADOS - 20
  { name: "Ossobuco alla Milanese 📋", description: "Corte de canela de boi braseado com gremolata e risoto", category: "Italiana", type: "lunch", ingredients: ["ossobuco", "tomate", "cenoura", "aipo", "vinho branco", "caldo de carne", "gremolata", "risoto"], instructions: ["Sele o ossobuco", "Refogue vegetais", "Deglace com vinho", "Braseie por 2h no forno", "Prepare gremolata", "Sirva com risoto alla milanese"], prepTime: 20, cookTime: 120, servings: 4, difficulty: "hard" },
  { name: "Coq au Vin Borgonha 📋", emoji: "🍗", region: "INT", estimatedCost: "medium",  description: "Frango braseado em vinho tinto da Borgonha com cogumelos e bacon", category: "Francesa", type: "lunch", ingredients: ["frango caipira", "vinho tinto", "bacon", "cogumelos", "cebolas pérola", "tomilho", "louro", "farinha"], instructions: ["Marine o frango no vinho", "Sele bacon e frango", "Adicione vinho e ervas", "Cozinhe por 90min", "Sirva com purê"], prepTime: 720, cookTime: 90, servings: 6, difficulty: "hard" },
  { name: "Duck à l'Orange 📋", emoji: "🥣", region: "INT", estimatedCost: "medium",  description: "Pato assado com molho de laranja caramelizado, clássico francês", category: "Francesa", type: "lunch", ingredients: ["pato inteiro", "laranja", "Grand Marnier", "açúcar", "vinagre", "caldo de pato", "manteiga"], instructions: ["Prepare o pato", "Asse em temperatura média", "Prepare o caramelo cítrico", "Faça o molho de laranja", "Corte e sirva com molho"], prepTime: 30, cookTime: 120, servings: 4, difficulty: "hard" },
  { name: "Tandoori Mix Grill 📋", emoji: "🍗", region: "INT", estimatedCost: "medium",  description: "Seleção de carnes marinadas em especiarias e iogurte, assadas no tandoor", category: "Indiana", type: "lunch", ingredients: ["frango", "cordeiro", "camarão", "iogurte", "tandoori masala", "gengibre", "alho", "limão"], instructions: ["Marine todas as carnes", "Espete em metal", "Asse em fogo alto", "Sirva com naan e raita"], prepTime: 240, cookTime: 20, servings: 4, difficulty: "medium" },
  { name: "Porchetta Italiana 📋", emoji: "🍖", region: "INT", estimatedCost: "medium",  description: "Lombo de porco com barriga, temperado com ervas e assado até crocante", category: "Italiana", type: "lunch", ingredients: ["barriga de porco com lombo", "alecrim", "alho", "funcho", "sal grosso", "pimenta", "limão"], instructions: ["Tempere generosamente", "Enrole e amarre", "Asse em alta temperatura inicialmente", "Reduza e asse por 3h", "Descanse e fatie"], prepTime: 30, cookTime: 180, servings: 10, difficulty: "hard" },
  { name: "Beef Wellington Completo 📋", emoji: "🥩", region: "INT", estimatedCost: "medium",  description: "Filé mignon envolto em duxelles e massa folhada dourada", category: "Britânica", type: "lunch", ingredients: ["filé mignon", "massa folhada", "cogumelos", "presunto de parma", "mostarda dijon", "gema", "tomilho"], instructions: ["Sele o filé mignon", "Prepare duxelles de cogumelos", "Envolva com presunto e duxelles", "Envolva com massa folhada", "Asse até dourar"], prepTime: 45, cookTime: 25, servings: 6, difficulty: "hard" },
  { name: "Paella Mista Valenciana 📋", emoji: "🥣", region: "INT", estimatedCost: "medium",  description: "Arroz espanhol com frango, frutos do mar e chorizo", category: "Espanhola", type: "lunch", ingredients: ["arroz bomba", "frango", "camarão", "mexilhão", "chorizo", "açafrão", "pimentão", "ervilha", "tomate"], instructions: ["Prepare o caldo com açafrão", "Refogue carnes", "Adicione arroz e caldo", "Distribua frutos do mar", "Cozinhe sem mexer até socarrat"], prepTime: 30, cookTime: 25, servings: 6, difficulty: "medium" },
  { name: "Mole Poblano Autêntico 📋", emoji: "🍽️", region: "LATAM", estimatedCost: "high",  description: "Molho mexicano complexo com chocolate, chili e especiarias servido com peru", category: "Mexicana", type: "lunch", ingredients: ["peru", "chili ancho", "chili pasilla", "chocolate amargo", "anis", "canela", "amêndoa", "gergelim", "tortilla", "tomate"], instructions: ["Torre os chilis", "Frite especiarias e nuts", "Bata tudo em molho", "Cozinhe por horas", "Sirva com peru"], prepTime: 60, cookTime: 180, servings: 8, difficulty: "hard" },
  { name: "Peking Duck Completo 📋", emoji: "🥞", region: "INT", estimatedCost: "medium",  description: "Pato laqueado estilo Pequim com panquecas, cebolinha e hoisin", category: "Chinesa", type: "lunch", ingredients: ["pato inteiro", "mel", "vinagre", "molho hoisin", "cebolinha", "pepino", "panquecas mandarim"], instructions: ["Prepare o pato com mel", "Seque a pele por 24h", "Asse até pele crocante", "Fatie a pele separada", "Sirva com panquecas e hoisin"], prepTime: 1440, cookTime: 60, servings: 4, difficulty: "hard" },
  { name: "Feijoada Completa 📋", emoji: "🥩", region: "BR", estimatedCost: "high",  description: "O prato nacional brasileiro com carnes variadas e acompanhamentos tradicionais", category: "Brasileira", type: "lunch", ingredients: ["feijão preto", "linguiça", "paio", "costelinha", "charque", "orelha", "pé", "bacon", "louro", "alho", "arroz", "couve", "farofa", "laranja"], instructions: ["Dessalgue as carnes", "Cozinhe o feijão", "Refogue as carnes", "Combine tudo na panela", "Sirva com arroz, couve, farofa e laranja"], prepTime: 720, cookTime: 180, servings: 10, difficulty: "medium" },
  { name: "Carneiro Assado na Brasa 📋", emoji: "🥩", region: "INT", estimatedCost: "medium",  description: "Perna de carneiro inteira temperada e assada lentamente sobre brasa", category: "Churrasco", type: "lunch", ingredients: ["perna de carneiro", "alecrim", "alho", "vinho branco", "limão", "azeite", "sal grosso", "pimenta"], instructions: ["Marine por 12h", "Prepare a brasa", "Asse lentamente por 4h", "Regue com marinade", "Descanse e sirva"], prepTime: 720, cookTime: 240, servings: 12, difficulty: "hard" },
  { name: "Cuscuz Paulista Premium 📋", emoji: "🍳", region: "BR", estimatedCost: "medium",  description: "Cuscuz de milho recheado com sardinha, palmito, ovos e azeitonas", category: "Brasileira", type: "lunch", ingredients: ["farinha de milho", "sardinha", "palmito", "ovo cozido", "azeitona", "tomate", "ervilha", "pimentão", "cheiro-verde"], instructions: ["Cozinhe o refogado", "Misture com farinha de milho", "Monte na forma", "Desenforme", "Decore com ovos e palmito"], prepTime: 20, cookTime: 15, servings: 8, difficulty: "easy" },
  { name: "Cordeiro ao Molho de Menta 📋", emoji: "🥩", region: "INT", estimatedCost: "medium",  description: "Rack de cordeiro grelhado com molho fresco de menta e ervilha", category: "Britânica", type: "lunch", ingredients: ["rack de cordeiro", "hortelã fresca", "vinagre", "açúcar", "alho", "alecrim", "mostarda dijon", "ervilha"], instructions: ["Tempere e sele o rack", "Asse no forno até o ponto", "Prepare molho de menta", "Descanse a carne", "Fatie e sirva com molho"], prepTime: 15, cookTime: 25, servings: 4, difficulty: "medium" },
  { name: "Gyudon Japonês 📋", emoji: "🥣", region: "INT", estimatedCost: "medium",  description: "Tigela de arroz com carne bovina fatiada e cebola em molho doce", category: "Japonesa", type: "lunch", ingredients: ["carne bovina fatiada", "cebola", "arroz", "molho de soja", "mirin", "saquê", "dashi", "ovo", "gengibre"], instructions: ["Prepare o arroz", "Cozinhe cebola no caldo", "Adicione carne fina", "Cozinhe brevemente", "Monte sobre arroz com ovo"], prepTime: 10, cookTime: 10, servings: 2, difficulty: "easy" },
  { name: "Caldo de Sururu Alagoano 📋", emoji: "🥣", region: "BR", estimatedCost: "medium",  description: "Caldo típico de Alagoas com sururu fresco e temperos nordestinos", category: "Brasileira", type: "lunch", ingredients: ["sururu", "tomate", "cebola", "alho", "coentro", "pimenta-de-cheiro", "azeite de dendê", "leite de coco"], instructions: ["Limpe o sururu", "Refogue os temperos", "Adicione sururu e leite de coco", "Cozinhe rapidamente", "Sirva com farofa"], prepTime: 20, cookTime: 15, servings: 4, difficulty: "easy" },
  { name: "Kare Raisu Japonês 📋", emoji: "🍗", region: "INT", estimatedCost: "medium",  description: "Curry japonês espesso e adocicado com arroz e katsu", category: "Japonesa", type: "lunch", ingredients: ["carne ou frango", "batata", "cenoura", "cebola", "roux de curry", "arroz", "maçã"], instructions: ["Refogue legumes e carne", "Adicione água e cozinhe", "Adicione o roux de curry", "Engrossar o molho", "Sirva sobre arroz quente"], prepTime: 15, cookTime: 30, servings: 4, difficulty: "easy" },
  { name: "Wiener Schnitzel 📋", emoji: "🍳", region: "INT", estimatedCost: "medium",  description: "Escalope de vitela empanado e frito, clássico austríaco", category: "Austríaca", type: "lunch", ingredients: ["vitela", "farinha", "ovo", "farinha de rosca", "manteiga", "limão", "sal", "batata"], instructions: ["Bata a vitela finamente", "Empane em 3 etapas", "Frite em manteiga abundante", "Escorra em papel", "Sirva com limão"], prepTime: 15, cookTime: 10, servings: 2, difficulty: "easy" },
  { name: "Jerk Chicken Jamaicano 📋", emoji: "🍗", region: "INT", estimatedCost: "medium",  description: "Frango marinado em especiarias jamaicanas picantes e defumado", category: "Caribenha", type: "lunch", ingredients: ["frango", "pimenta scotch bonnet", "pimenta da jamaica", "tomilho", "alho", "gengibre", "shoyu", "açúcar mascavo", "limão"], instructions: ["Prepare a marinade jerk", "Marine o frango 24h", "Grelhe em fogo médio", "Defume com carvão e pimento", "Sirva com arroz e feijão"], prepTime: 1440, cookTime: 40, servings: 4, difficulty: "medium" },
  { name: "Goulash Húngaro 📋", emoji: "🥣", region: "INT", estimatedCost: "medium",  description: "Ensopado húngaro de carne com páprica, batata e massa", category: "Húngara", type: "lunch", ingredients: ["carne bovina", "páprica húngara", "cebola", "tomate", "pimentão", "batata", "cominho", "creme azedo"], instructions: ["Refogue muita cebola", "Adicione páprica generosamente", "Sele a carne", "Adicione líquido e legumes", "Cozinhe lentamente por 2h"], prepTime: 20, cookTime: 120, servings: 6, difficulty: "medium" },
  { name: "Pierogi Polonês com Requeijão 📋", emoji: "🍝", region: "INT", estimatedCost: "medium",  description: "Massa recheada polonesa fervida e depois salteada na manteiga", category: "Polonesa", type: "lunch", ingredients: ["farinha", "batata", "requeijão", "cebola", "manteiga", "creme azedo", "cebolinha"], instructions: ["Prepare a massa", "Cozinhe e amasse batata", "Misture com requeijão", "Recheie e feche", "Cozinhe em água", "Salteie na manteiga"], prepTime: 40, cookTime: 15, servings: 4, difficulty: "medium" },
];
