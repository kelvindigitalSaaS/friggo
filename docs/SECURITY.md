Segurança — Ações imediatas

1) Rotacionar chaves comprometidas
- Registre-se no Supabase e rotacione a `SERVICE_ROLE_KEY` imediatamente.
- Rotacione quaisquer chaves do Stripe ou serviços terceiros que possam ter sido comprometidos.

2) Remover segredos do repositório
- Não confie apenas em commits: embora tenhamos removido valores do arquivo `.env`, se as chaves já foram commitadas você deve:
  - Rotacionar as chaves (passo 1).
  - Considerar reescrever o histórico Git para remover os valores (ex: `git filter-repo` ou `git filter-branch`) — cuidado, isto altera histórico.

3) Boas práticas para segredos
- Nunca comite variáveis sensíveis. Use `.env` local ignorado por Git e mantenha um `.env.example` com placeholders.
- Armazene chaves de servidor (ex: `SUPABASE_SERVICE_ROLE_KEY`) apenas em servidores/CI/CD (Secrets Manager, GitHub Actions secrets, etc.).
- Para produção, nunca exponha `SERVICE_ROLE_KEY` no cliente (web/mobile). O frontend só deve usar chaves públicas (VITE_ prefixadas) e delegar operações sensíveis ao backend.

4) Verificação automática
- Procure por qualquer outro arquivo contendo padrões de chaves (JWTs, longas strings Base64). Remova se encontrar e rotacione onde aplicável.

5) Passos após rotacionar
- Atualize os ambientes (servidor, CI, Vercel/Netlify) com as novas chaves.
- Revogue as chaves antigas.

Se quiser, eu posso:
- Remover outros arquivos que contenham chaves (procuro por padrões e crio um relatório).
- Criar um script de verificação que alerta se arquivos com padrões de chaves forem adicionados.
