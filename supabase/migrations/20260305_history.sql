-- Migration para adicionar a tabela de histórico de itens (atividade real)
CREATE TABLE IF NOT EXISTS item_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    item_id UUID, -- Not a strict foreign key as item might be deleted/consumed
    item_name TEXT NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('added', 'consumed', 'cooked', 'discarded', 'defrosted')),
    quantity NUMERIC NOT NULL,
    unit TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_name TEXT -- Name of the user who performed the action at that time
);

-- RLS
ALTER TABLE item_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own history" ON item_history;
CREATE POLICY "Users can view own history"
    ON item_history FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own history" ON item_history;
CREATE POLICY "Users can insert own history"
    ON item_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);
