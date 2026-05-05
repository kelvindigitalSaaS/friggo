-- ============================================================================
-- Backfill next_fire_at para garbage_reminders existentes
-- Função auxiliar para calcular próximo disparo com base em dias e horário
-- ============================================================================

-- Função PL/pgSQL para calcular o próximo próximo disparo de lixo
CREATE OR REPLACE FUNCTION calculate_next_garbage_fire(
  selected_days smallint[],
  reminder_time time,
  tz text DEFAULT 'America/Sao_Paulo'
)
RETURNS timestamptz AS $$
DECLARE
  v_now timestamptz;
  v_current_date date;
  v_next_date date;
  v_next_fire timestamptz;
  i int;
  v_day_of_week smallint;
BEGIN
  -- Sempre usar a timezone configurada
  v_now := now() AT TIME ZONE tz AT TIME ZONE 'UTC';
  v_current_date := (v_now AT TIME ZONE tz)::date;
  v_next_date := v_current_date;

  -- Loop para encontrar o próximo dia na lista selected_days
  FOR i IN 0..7 LOOP
    v_day_of_week := EXTRACT(DOW FROM v_next_date);
    IF v_day_of_week = ANY(selected_days) THEN
      -- Combinar a data com o horário configurado
      v_next_fire := (v_next_date || ' ' || reminder_time)::timestamp AT TIME ZONE tz AT TIME ZONE 'UTC';

      -- Se já passou hoje, ir para a próxima semana
      IF v_next_fire <= v_now THEN
        v_next_date := v_next_date + INTERVAL '7 days';
        v_day_of_week := EXTRACT(DOW FROM v_next_date);
        IF v_day_of_week = ANY(selected_days) THEN
          v_next_fire := (v_next_date || ' ' || reminder_time)::timestamp AT TIME ZONE tz AT TIME ZONE 'UTC';
        END IF;
      END IF;

      RETURN v_next_fire;
    END IF;

    v_next_date := v_next_date + INTERVAL '1 day';
  END LOOP;

  -- Fallback: próxima ocorrência em 7 dias (em caso de erro)
  RETURN (v_current_date + INTERVAL '7 days' || ' ' || reminder_time)::timestamp AT TIME ZONE tz AT TIME ZONE 'UTC';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================================================
-- Backfill: preencher next_fire_at para registros onde está NULL
-- ============================================================================

UPDATE garbage_reminders
SET next_fire_at = calculate_next_garbage_fire(
  selected_days,
  reminder_time,
  COALESCE(timezone, 'America/Sao_Paulo')
)
WHERE next_fire_at IS NULL
  AND enabled = true;

-- ============================================================================
-- Trigger para atualizar next_fire_at automaticamente quando garbage_reminders muda
-- ============================================================================

CREATE OR REPLACE FUNCTION garbage_reminders_update_next_fire()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.enabled AND NEW.selected_days IS NOT NULL) THEN
    NEW.next_fire_at := calculate_next_garbage_fire(
      NEW.selected_days,
      NEW.reminder_time,
      COALESCE(NEW.timezone, 'America/Sao_Paulo')
    );
  ELSE
    NEW.next_fire_at := NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop se existir (para idempotência)
DROP TRIGGER IF EXISTS garbage_reminders_before_insert_update ON garbage_reminders;

-- Criar trigger BEFORE INSERT or UPDATE
CREATE TRIGGER garbage_reminders_before_insert_update
BEFORE INSERT OR UPDATE ON garbage_reminders
FOR EACH ROW
EXECUTE FUNCTION garbage_reminders_update_next_fire();
