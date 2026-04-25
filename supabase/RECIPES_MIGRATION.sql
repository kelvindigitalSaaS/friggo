-- =============================================================================
-- KAZA — Migration de 5800 receitas brasileiras
-- =============================================================================
-- Execução: Supabase Dashboard > SQL Editor
-- =============================================================================

BEGIN;

-- =============================================================================
-- 1. CRIAR TABELA
-- =============================================================================

DROP TABLE IF EXISTS public.recipes CASCADE;

CREATE TABLE public.recipes (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id         text UNIQUE NOT NULL,
  name              text NOT NULL,
  category          text NOT NULL,
  difficulty        text NOT NULL CHECK (difficulty IN ('fácil', 'médio', 'difícil')),
  prep_time         integer,
  cook_time         integer,
  servings          integer,
  emoji             text,
  ingredients       jsonb NOT NULL DEFAULT '[]'::jsonb,
  instructions      jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at        timestamptz DEFAULT now(),
  updated_at        timestamptz DEFAULT now()
);

-- =============================================================================
-- 2. ÍNDICES PARA BUSCA E FILTROS
-- =============================================================================

CREATE INDEX idx_recipes_category ON public.recipes(category);
CREATE INDEX idx_recipes_difficulty ON public.recipes(difficulty);
CREATE INDEX idx_recipes_name ON public.recipes USING gin(to_tsvector('portuguese', name));

-- =============================================================================
-- 3. RLS (opicional — sem permissões, apenas leitura pública)
-- =============================================================================

ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Todos podem ler receitas
CREATE POLICY "recipes_select_public"
  ON public.recipes FOR SELECT
  USING (true);

-- Apenas admin pode inserir/atualizar (via service_role)
CREATE POLICY "recipes_write_admin_only"
  ON public.recipes FOR INSERT
  WITH CHECK (false);

-- =============================================================================
-- 4. TRIGGER PARA ATUALIZAR updated_at
-- =============================================================================

CREATE OR REPLACE FUNCTION public.update_recipes_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_recipes_updated_at
  BEFORE UPDATE ON public.recipes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_recipes_updated_at();

-- =============================================================================
-- 5. FUNÇÃO DE BUSCA COM FILTROS
-- =============================================================================

CREATE OR REPLACE FUNCTION public.search_recipes(
  p_query text DEFAULT NULL,
  p_category text DEFAULT NULL,
  p_difficulty text DEFAULT NULL,
  p_limit int DEFAULT 50,
  p_offset int DEFAULT 0
)
RETURNS TABLE (
  id uuid,
  recipe_id text,
  name text,
  category text,
  difficulty text,
  prep_time integer,
  cook_time integer,
  servings integer,
  emoji text,
  ingredients jsonb,
  instructions jsonb,
  total_count bigint
) LANGUAGE plpgsql AS $$
DECLARE
  v_total bigint;
BEGIN
  -- Contar total com filtros
  SELECT COUNT(*) INTO v_total
  FROM public.recipes
  WHERE
    (p_query IS NULL OR name ILIKE '%' || p_query || '%')
    AND (p_category IS NULL OR category = p_category)
    AND (p_difficulty IS NULL OR difficulty = p_difficulty);

  -- Retornar resultados paginados
  RETURN QUERY
  SELECT
    r.id,
    r.recipe_id,
    r.name,
    r.category,
    r.difficulty,
    r.prep_time,
    r.cook_time,
    r.servings,
    r.emoji,
    r.ingredients,
    r.instructions,
    v_total as total_count
  FROM public.recipes r
  WHERE
    (p_query IS NULL OR r.name ILIKE '%' || p_query || '%')
    AND (p_category IS NULL OR r.category = p_category)
    AND (p_difficulty IS NULL OR r.difficulty = p_difficulty)
  ORDER BY r.name ASC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;

-- =============================================================================
-- 6. FUNÇÃO PARA LISTAR CATEGORIAS DISPONÍVEIS
-- =============================================================================

CREATE OR REPLACE FUNCTION public.get_recipe_categories()
RETURNS TABLE (
  category text,
  count bigint
) LANGUAGE SQL AS $$
  SELECT category, COUNT(*) as count
  FROM public.recipes
  GROUP BY category
  ORDER BY category;
$$;

-- =============================================================================
-- 7. VERIFICAÇÃO INICIAL
-- =============================================================================

SELECT 'Tabela criada. Aguardando inserção de receitas.' as status;

COMMIT;
