-- =============================================================================
-- KAZA — Relatórios de Feedback (VERSÃO CORRIGIDA)
-- =============================================================================
-- Execute estas queries no Supabase SQL Editor para analisar feedback
-- Copie UMA query por vez e execute

-- =============================================================================
-- 1. RESUMO GERAL DO FEEDBACK
-- =============================================================================

SELECT
  COUNT(*) AS total_respostas,
  COUNT(DISTINCT user_id) AS usuarios_respondidos,
  ROUND(AVG(rating)::numeric, 2) AS nota_media,
  COUNT(*) FILTER (WHERE rating >= 4) AS usuarios_satisfeitos,
  COUNT(*) FILTER (WHERE rating <= 2) AS usuarios_insatisfeitos,
  COUNT(*) FILTER (WHERE rating = 1) AS rating_1_estrela,
  COUNT(*) FILTER (WHERE rating = 2) AS rating_2_estrelas,
  COUNT(*) FILTER (WHERE rating = 3) AS rating_3_estrelas,
  COUNT(*) FILTER (WHERE rating = 4) AS rating_4_estrelas,
  COUNT(*) FILTER (WHERE rating = 5) AS rating_5_estrelas
FROM public.feedback_surveys;

-- =============================================================================
-- 2. FEATURES QUE MAIS GOSTARAM (ranking)
-- =============================================================================

SELECT
  unnest(liked_features) AS feature,
  COUNT(*) AS vezes_citada,
  ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM public.feedback_surveys), 1) AS percentual
FROM public.feedback_surveys
WHERE array_length(liked_features, 1) > 0
GROUP BY feature
ORDER BY vezes_citada DESC;

-- =============================================================================
-- 3. ÁREAS DE MELHORIA (ranking)
-- =============================================================================

SELECT
  unnest(improvement_areas) AS area_melhoria,
  COUNT(*) AS vezes_citada,
  ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM public.feedback_surveys), 1) AS percentual
FROM public.feedback_surveys
WHERE array_length(improvement_areas, 1) > 0
GROUP BY area_melhoria
ORDER BY vezes_citada DESC;

-- =============================================================================
-- 4. MOTIVOS PARA NÃO ASSINAR (análise de churn)
-- =============================================================================

SELECT
  no_purchase_reason,
  COUNT(*) AS total,
  ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM public.feedback_surveys WHERE no_purchase_reason IS NOT NULL), 1) AS percentual
FROM public.feedback_surveys
WHERE no_purchase_reason IS NOT NULL
GROUP BY no_purchase_reason
ORDER BY total DESC;

-- =============================================================================
-- 5. DISTRIBUIÇÃO POR NOTA (para visualizar curva)
-- =============================================================================

SELECT
  rating,
  COUNT(*) AS total,
  ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM public.feedback_surveys), 1) AS percentual
FROM public.feedback_surveys
GROUP BY rating
ORDER BY rating DESC;

-- =============================================================================
-- 6. FEEDBACK COM TEXTO LIVRE (comentários importantes)
-- =============================================================================

SELECT
  user_id,
  submitted_at,
  rating,
  liked_freetext,
  improvement_freetext,
  no_purchase_reason
FROM public.feedback_surveys
WHERE
  liked_freetext IS NOT NULL
  OR improvement_freetext IS NOT NULL
ORDER BY submitted_at DESC;

-- =============================================================================
-- 7. ANÁLISE DE USUÁRIOS SATISFEITOS vs INSATISFEITOS
-- =============================================================================

WITH sentimentos AS (
  SELECT
    CASE
      WHEN rating >= 4 THEN 'Satisfeito'
      WHEN rating = 3 THEN 'Neutro'
      ELSE 'Insatisfeito'
    END AS sentimento,
    rating
  FROM public.feedback_surveys
)
SELECT
  sentimento,
  COUNT(*) AS total,
  ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM public.feedback_surveys), 1) AS percentual
FROM sentimentos
GROUP BY sentimento
ORDER BY
  CASE sentimento
    WHEN 'Satisfeito' THEN 1
    WHEN 'Neutro' THEN 2
    ELSE 3
  END;

-- =============================================================================
-- 8. TIMELINE DE FEEDBACK (respostas ao longo do tempo)
-- =============================================================================

SELECT
  DATE(submitted_at) AS data,
  COUNT(*) AS total_respostas,
  ROUND(AVG(rating)::numeric, 2) AS nota_media_dia,
  COUNT(*) FILTER (WHERE rating >= 4) AS satisfeitos_dia
FROM public.feedback_surveys
GROUP BY DATE(submitted_at)
ORDER BY data DESC;

-- =============================================================================
-- 9. RELAÇÃO ENTRE NOTA E RAZÃO PARA NÃO ASSINAR
-- =============================================================================

SELECT
  rating,
  no_purchase_reason,
  COUNT(*) AS total
FROM public.feedback_surveys
WHERE no_purchase_reason IS NOT NULL
GROUP BY rating, no_purchase_reason
ORDER BY rating DESC, total DESC;

-- =============================================================================
-- 10. EXPORT CSV — Todos os feedbacks com dados estruturados
-- =============================================================================

SELECT
  user_id,
  submitted_at,
  rating,
  array_to_string(liked_features, '|') AS liked_features,
  array_to_string(improvement_areas, '|') AS improvement_areas,
  no_purchase_reason,
  liked_freetext,
  improvement_freetext,
  trial_days_used,
  platform
FROM public.feedback_surveys
ORDER BY submitted_at DESC;

-- =============================================================================
-- 11. QUICK CHECK — Verificar se tabela tem dados
-- =============================================================================

SELECT 'Total de respostas' AS metrica, COUNT(*)::text AS valor
FROM public.feedback_surveys
UNION ALL
SELECT 'Última resposta', MAX(submitted_at)::text
FROM public.feedback_surveys;
