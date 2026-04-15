// Banco de dados de produtos comuns para sugestões
export interface ProductSuggestion {
  name: string;
  category: 'market' | 'fair' | 'pharmacy';
  unit: string;
  defaultQuantity: number;
}

export const productDatabase: ProductSuggestion[] = [
  // Mercado - Laticínios
  { name: 'Leite', category: 'market', unit: 'L', defaultQuantity: 1 },
  { name: 'Leite Desnatado', category: 'market', unit: 'L', defaultQuantity: 1 },
  { name: 'Leite Condensado', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Creme de Leite', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Iogurte Natural', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Iogurte Grego', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Queijo Mussarela', category: 'market', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Queijo Prato', category: 'market', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Queijo Minas', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Queijo Coalho', category: 'market', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Requeijão', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Manteiga', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Margarina', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Cream Cheese', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Ricota', category: 'market', unit: 'un', defaultQuantity: 1 },

  // Mercado - Carnes
  { name: 'Frango Inteiro', category: 'market', unit: 'kg', defaultQuantity: 1.5 },
  { name: 'Peito de Frango', category: 'market', unit: 'kg', defaultQuantity: 1 },
  { name: 'Coxa e Sobrecoxa', category: 'market', unit: 'kg', defaultQuantity: 1 },
  { name: 'Carne Moída', category: 'market', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Alcatra', category: 'market', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Picanha', category: 'market', unit: 'kg', defaultQuantity: 1 },
  { name: 'Contrafilé', category: 'market', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Costela', category: 'market', unit: 'kg', defaultQuantity: 1 },
  { name: 'Linguiça', category: 'market', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Bacon', category: 'market', unit: 'kg', defaultQuantity: 0.3 },
  { name: 'Presunto', category: 'market', unit: 'kg', defaultQuantity: 0.3 },
  { name: 'Salsicha', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Carne de Porco', category: 'market', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Filé de Peixe', category: 'market', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Camarão', category: 'market', unit: 'kg', defaultQuantity: 0.5 },

  // Mercado - Grãos e Cereais
  { name: 'Arroz Branco', category: 'market', unit: 'kg', defaultQuantity: 5 },
  { name: 'Arroz Integral', category: 'market', unit: 'kg', defaultQuantity: 1 },
  { name: 'Feijão Preto', category: 'market', unit: 'kg', defaultQuantity: 1 },
  { name: 'Feijão Carioca', category: 'market', unit: 'kg', defaultQuantity: 1 },
  { name: 'Lentilha', category: 'market', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Grão de Bico', category: 'market', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Macarrão Espaguete', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Macarrão Parafuso', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Macarrão Penne', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Lasanha', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Farinha de Trigo', category: 'market', unit: 'kg', defaultQuantity: 1 },
  { name: 'Farinha de Mandioca', category: 'market', unit: 'kg', defaultQuantity: 1 },
  { name: 'Fubá', category: 'market', unit: 'kg', defaultQuantity: 1 },
  { name: 'Aveia', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Granola', category: 'market', unit: 'un', defaultQuantity: 1 },

  // Mercado - Óleos e Temperos
  { name: 'Óleo de Soja', category: 'market', unit: 'L', defaultQuantity: 1 },
  { name: 'Azeite', category: 'market', unit: 'ml', defaultQuantity: 500 },
  { name: 'Vinagre', category: 'market', unit: 'ml', defaultQuantity: 500 },
  { name: 'Sal', category: 'market', unit: 'kg', defaultQuantity: 1 },
  { name: 'Açúcar', category: 'market', unit: 'kg', defaultQuantity: 1 },
  { name: 'Açúcar Mascavo', category: 'market', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Adoçante', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Café', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Chá', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Mel', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Molho de Tomate', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Ketchup', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Maionese', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Mostarda', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Molho Shoyu', category: 'market', unit: 'ml', defaultQuantity: 500 },

  // Mercado - Pães e Padaria
  { name: 'Pão de Forma', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Pão Francês', category: 'market', unit: 'un', defaultQuantity: 10 },
  { name: 'Torrada', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Biscoito Cream Cracker', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Biscoito Recheado', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Bolo Pronto', category: 'market', unit: 'un', defaultQuantity: 1 },

  // Mercado - Bebidas
  { name: 'Água Mineral', category: 'market', unit: 'L', defaultQuantity: 5 },
  { name: 'Refrigerante', category: 'market', unit: 'L', defaultQuantity: 2 },
  { name: 'Suco de Laranja', category: 'market', unit: 'L', defaultQuantity: 1 },
  { name: 'Suco de Uva', category: 'market', unit: 'L', defaultQuantity: 1 },
  { name: 'Cerveja', category: 'market', unit: 'un', defaultQuantity: 6 },
  { name: 'Vinho', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Energético', category: 'market', unit: 'un', defaultQuantity: 1 },

  // Mercado - Enlatados e Conservas
  { name: 'Milho em Conserva', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Ervilha', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Atum', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Sardinha', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Palmito', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Azeitona', category: 'market', unit: 'un', defaultQuantity: 1 },

  // Mercado - Congelados
  { name: 'Pizza Congelada', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Lasanha Congelada', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Hambúrguer Congelado', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Nuggets', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Sorvete', category: 'market', unit: 'L', defaultQuantity: 1 },
  { name: 'Legumes Congelados', category: 'market', unit: 'kg', defaultQuantity: 0.5 },

  // Mercado - Ovos
  { name: 'Ovos', category: 'market', unit: 'dz', defaultQuantity: 1 },
  { name: 'Ovos Caipira', category: 'market', unit: 'dz', defaultQuantity: 1 },

  // Feira - Frutas
  { name: 'Banana', category: 'fair', unit: 'kg', defaultQuantity: 1 },
  { name: 'Maçã', category: 'fair', unit: 'kg', defaultQuantity: 1 },
  { name: 'Laranja', category: 'fair', unit: 'kg', defaultQuantity: 2 },
  { name: 'Limão', category: 'fair', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Mamão', category: 'fair', unit: 'un', defaultQuantity: 1 },
  { name: 'Manga', category: 'fair', unit: 'un', defaultQuantity: 2 },
  { name: 'Abacaxi', category: 'fair', unit: 'un', defaultQuantity: 1 },
  { name: 'Melancia', category: 'fair', unit: 'un', defaultQuantity: 1 },
  { name: 'Melão', category: 'fair', unit: 'un', defaultQuantity: 1 },
  { name: 'Morango', category: 'fair', unit: 'cx', defaultQuantity: 1 },
  { name: 'Uva', category: 'fair', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Pera', category: 'fair', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Abacate', category: 'fair', unit: 'un', defaultQuantity: 2 },
  { name: 'Goiaba', category: 'fair', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Coco', category: 'fair', unit: 'un', defaultQuantity: 1 },

  // Feira - Verduras e Legumes
  { name: 'Tomate', category: 'fair', unit: 'kg', defaultQuantity: 1 },
  { name: 'Cebola', category: 'fair', unit: 'kg', defaultQuantity: 1 },
  { name: 'Alho', category: 'fair', unit: 'un', defaultQuantity: 2 },
  { name: 'Batata', category: 'fair', unit: 'kg', defaultQuantity: 2 },
  { name: 'Batata Doce', category: 'fair', unit: 'kg', defaultQuantity: 1 },
  { name: 'Cenoura', category: 'fair', unit: 'kg', defaultQuantity: 1 },
  { name: 'Beterraba', category: 'fair', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Alface', category: 'fair', unit: 'un', defaultQuantity: 1 },
  { name: 'Rúcula', category: 'fair', unit: 'maço', defaultQuantity: 1 },
  { name: 'Couve', category: 'fair', unit: 'maço', defaultQuantity: 1 },
  { name: 'Espinafre', category: 'fair', unit: 'maço', defaultQuantity: 1 },
  { name: 'Brócolis', category: 'fair', unit: 'un', defaultQuantity: 1 },
  { name: 'Couve-flor', category: 'fair', unit: 'un', defaultQuantity: 1 },
  { name: 'Abobrinha', category: 'fair', unit: 'un', defaultQuantity: 2 },
  { name: 'Berinjela', category: 'fair', unit: 'un', defaultQuantity: 1 },
  { name: 'Pepino', category: 'fair', unit: 'un', defaultQuantity: 2 },
  { name: 'Pimentão', category: 'fair', unit: 'un', defaultQuantity: 2 },
  { name: 'Mandioca', category: 'fair', unit: 'kg', defaultQuantity: 1 },
  { name: 'Chuchu', category: 'fair', unit: 'un', defaultQuantity: 2 },
  { name: 'Quiabo', category: 'fair', unit: 'kg', defaultQuantity: 0.5 },
  { name: 'Vagem', category: 'fair', unit: 'kg', defaultQuantity: 0.3 },
  { name: 'Repolho', category: 'fair', unit: 'un', defaultQuantity: 1 },
  { name: 'Milho Verde', category: 'fair', unit: 'un', defaultQuantity: 4 },
  { name: 'Abóbora', category: 'fair', unit: 'kg', defaultQuantity: 1 },

  // Feira - Ervas e Temperos Frescos
  { name: 'Cheiro Verde', category: 'fair', unit: 'maço', defaultQuantity: 1 },
  { name: 'Coentro', category: 'fair', unit: 'maço', defaultQuantity: 1 },
  { name: 'Manjericão', category: 'fair', unit: 'maço', defaultQuantity: 1 },
  { name: 'Hortelã', category: 'fair', unit: 'maço', defaultQuantity: 1 },
  { name: 'Gengibre', category: 'fair', unit: 'un', defaultQuantity: 1 },

  // Farmácia - Higiene Pessoal
  { name: 'Papel Higiênico', category: 'pharmacy', unit: 'pct', defaultQuantity: 1 },
  { name: 'Shampoo', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Condicionador', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Sabonete', category: 'pharmacy', unit: 'un', defaultQuantity: 3 },
  { name: 'Desodorante', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Pasta de Dente', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Escova de Dente', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Fio Dental', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Absorvente', category: 'pharmacy', unit: 'pct', defaultQuantity: 1 },
  { name: 'Fralda', category: 'pharmacy', unit: 'pct', defaultQuantity: 1 },
  { name: 'Lenço de Papel', category: 'pharmacy', unit: 'cx', defaultQuantity: 1 },
  { name: 'Cotonete', category: 'pharmacy', unit: 'cx', defaultQuantity: 1 },
  { name: 'Protetor Solar', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Hidratante', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Álcool em Gel', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Barbeador', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Creme de Barbear', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },

  // Farmácia - Medicamentos Básicos
  { name: 'Dipirona', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Paracetamol', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Ibuprofeno', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Antialérgico', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Antiácido', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Vitamina C', category: 'pharmacy', unit: 'un', defaultQuantity: 1 },
  { name: 'Band-Aid', category: 'pharmacy', unit: 'cx', defaultQuantity: 1 },

  // Limpeza (Mercado)
  { name: 'Detergente', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Sabão em Pó', category: 'market', unit: 'kg', defaultQuantity: 1 },
  { name: 'Amaciante', category: 'market', unit: 'L', defaultQuantity: 1 },
  { name: 'Água Sanitária', category: 'market', unit: 'L', defaultQuantity: 1 },
  { name: 'Desinfetante', category: 'market', unit: 'L', defaultQuantity: 1 },
  { name: 'Limpador Multiuso', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Esponja de Limpeza', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Saco de Lixo', category: 'market', unit: 'pct', defaultQuantity: 1 },
  { name: 'Papel Toalha', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Luvas de Limpeza', category: 'market', unit: 'par', defaultQuantity: 1 },
  { name: 'Vassoura', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Rodo', category: 'market', unit: 'un', defaultQuantity: 1 },
  { name: 'Pano de Chão', category: 'market', unit: 'un', defaultQuantity: 2 },
];

export function searchProducts(query: string): ProductSuggestion[] {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  return productDatabase
    .filter(product => {
      const normalizedName = product.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return normalizedName.includes(normalizedQuery);
    })
    .slice(0, 8);
}
