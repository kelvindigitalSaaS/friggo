# Guia de Configuração dos Assistentes de Voz — Friggo

## 1. Google Assistant (Android)

### 1.1 O que já está configurado no projeto

- `android/app/src/main/res/xml/actions.xml` — Define as App Actions (intents) do Google
- `AndroidManifest.xml` — Meta-data `com.google.android.actions` referenciando o `actions.xml`
- Deep links registrados: `friggo://home`, `friggo://add-item`, `friggo://notifications`, etc.

### 1.2 Google Actions Console

1. Acesse [console.actions.google.com](https://console.actions.google.com)
2. Clique **New Project** → Nome: `Friggo`
3. Selecione **App Actions** como categoria
4. Vá em **Develop → App Actions → Configure**
5. Faça upload ou aponte para o arquivo `actions.xml` do projeto
6. Configure os seguintes **Built-in Intents**:
   - `actions.intent.OPEN_APP_FEATURE` → Abre o app em uma aba específica
   - `actions.intent.CREATE_THING` → Navega para tela de adicionar item
   - `actions.intent.GET_THING` → Abre a geladeira
   - `actions.intent.GET_FOOD_OBSERVATION` → Abre receitas
7. Em **Deploy → App info**, preencha:
   - Nome: Friggo
   - Descrição: Geladeira inteligente com controle por voz
   - Idioma: Português (Brasil)
8. **Testar**: No terminal, rode:
   ```bash
   gactions test --action-package android/app/src/main/res/xml/actions.xml --project friggo-7dfdd
   ```
9. No celular Android com Google Assistant, diga:
   - "Ok Google, abrir Friggo"
   - "Ok Google, adicionar leite no Friggo"

### 1.3 Comandos que já funcionam automaticamente

- **"Ok Google, abrir Friggo"** → Abre o app (não precisa de configuração extra)
- Os comandos avançados (adicionar item, ver receitas) dependem da publicação do Actions.

---

## 2. Amazon Alexa

### 2.1 Alexa Developer Console

1. Acesse [developer.amazon.com/alexa/console/ask](https://developer.amazon.com/alexa/console/ask)
2. Clique **Create Skill** → Nome: `Friggo` → Idioma: Portuguese (BR)
3. Tipo: **Custom** → Host: **Alexa-hosted (Node.js)**
4. No **Interaction Model → Intents**, adicione:
   - `CheckFridgeIntent` — "o que tem na geladeira", "mostrar minha geladeira"
   - `CheckExpiringIntent` — "o que está vencendo", "itens vencendo"
   - `AddItemIntent` (com slot `{itemName}`) — "adicionar {leite} na lista"
   - `SuggestRecipeIntent` — "sugerir receita", "o que posso cozinhar"
   - `ShoppingListIntent` — "minha lista de compras"
5. No **Endpoint**, configure como HTTPS apontando para:
   ```
   https://pylruhvqjyvbninduzod.supabase.co/functions/v1/alexa-webhook
   ```
   (Você precisará criar esta Edge Function no Supabase)
6. **Copie o Skill ID** (formato: `amzn1.ask.skill.xxx-xxx-xxx`)
7. Cole o Skill ID no app Friggo → Ajustes → Assistentes de Voz → Alexa
8. **Teste**: No Alexa Simulator ou app Alexa, diga "Alexa, abrir Friggo"

### 2.2 Exemplo de Intent Handler (Lambda/Node.js)

```javascript
const OpenFriggoHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Bem-vindo ao Friggo! Sua geladeira inteligente.")
      .withSimpleCard("Friggo", "Geladeira Inteligente")
      .getResponse();
  }
};

const CheckFridgeHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.intent.name === "CheckFridgeIntent"
    );
  },
  async handle(handlerInput) {
    // Chamar API do Supabase para buscar itens
    const response = await fetch(
      "https://pylruhvqjyvbninduzod.supabase.co/rest/v1/consumables?select=name,quantity",
      {
        headers: { apikey: "YOUR_ANON_KEY", Authorization: "Bearer USER_TOKEN" }
      }
    );
    const items = await response.json();
    const itemList = items.map((i) => `${i.name}: ${i.quantity}`).join(", ");
    return handlerInput.responseBuilder
      .speak(`Na sua geladeira tem: ${itemList}`)
      .getResponse();
  }
};
```

### 2.3 Publicação

- Para uso pessoal: Basta criar e testar
- Para a Alexa Skills Store: Preencha o formulário de publicação com descrição em PT-BR

---

## 3. Apple Siri

### 3.1 O que já funciona

- **"E aí Siri, abrir Friggo"** — Funciona automaticamente! A Siri reconhece o nome do app instalado e abre ele.
- Registrado `NSUserActivityTypes` no `Info.plist` com intents: `OpenFriggoIntent`, `CheckFridgeIntent`, `AddItemIntent`, `ViewRecipesIntent`, `ShoppingListIntent`

### 3.2 Atalhos Siri (Shortcuts)

Para comandos personalizados, o usuário cria atalhos no app **Atalhos** (Shortcuts):

1. Abrir app **Atalhos** no iPhone
2. Tocar **+** → **Adicionar Ação**
3. Buscar **Abrir URLs** (Open URLs)
4. Colar um deep link:
   - `friggo://home?tab=fridge` — Ver geladeira
   - `friggo://home?tab=recipes` — Ver receitas
   - `friggo://home?tab=shopping` — Lista de compras
   - `friggo://add-item` — Adicionar item
   - `friggo://notifications` — Notificações
5. Dar nome ao atalho (ex: "Receitas do Friggo")
6. Pronto! Agora basta dizer: **"E aí Siri, Receitas do Friggo"**

### 3.3 Siri Intents (Avançado - futura implementação)

Para integração nativa com SiriKit, seria necessário:

- Criar uma extensão de Intents no Xcode
- Implementar handlers de cada intent em Swift
- Registrar no `AppDelegate`

Isso é opcional e pode ser adicionado em uma versão futura.

---

## Resumo

| Assistente | Comando Básico            | Funciona Já?        | Console Necessário                                              |
| ---------- | ------------------------- | ------------------- | --------------------------------------------------------------- |
| Google     | "Ok Google, abrir Friggo" | ✅ Sim              | [Actions Console](https://console.actions.google.com)           |
| Alexa      | "Alexa, abrir Friggo"     | ⚠️ Precisa da Skill | [Alexa Console](https://developer.amazon.com/alexa/console/ask) |
| Siri       | "E aí Siri, abrir Friggo" | ✅ Sim              | Nenhum (automático)                                             |

**Nota**: Comandos avançados (adicionar item, ver receitas, lista de compras) requerem configuração nos respectivos consoles.
