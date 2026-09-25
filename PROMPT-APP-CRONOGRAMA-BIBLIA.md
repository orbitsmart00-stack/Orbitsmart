# Prompt para criação do app — Cronograma de Leitura da Bíblia

> Use este texto como prompt em uma ferramenta de criação de apps por IA (Base44, Lovable, Replit, Bolt, etc.) ou entregue a um desenvolvedor/outra sessão do Claude Code para implementar o aplicativo do zero.

---

## Prompt (copiar e colar)

Crie um aplicativo web responsivo (mobile-first) chamado **"Cronograma Bíblico"**, um plano de leitura da Bíblia com estudo e diário pessoal. O app deve funcionar totalmente no navegador, salvando os dados localmente (localStorage/IndexedDB) sem necessidade de login, mas com uma estrutura de dados pronta para futuramente sincronizar com um backend (ex.: Supabase).

### 1. Seleção do plano de leitura

Na primeira abertura, o usuário escolhe um dos três planos:

- **3 meses (90 dias)** — leitura intensiva, ~13,3 capítulos/dia
- **6 meses (183 dias)** — leitura moderada, ~6,5 capítulos/dia
- **1 ano (365 dias)** — leitura tranquila, ~3,3 capítulos/dia

A Bíblia tem 66 livros e 1.189 capítulos (Antigo Testamento: 39 livros / 929 capítulos; Novo Testamento: 27 livros / 260 capítulos). Distribua os capítulos entre os dias do plano escolhido de forma:

- **Sequencial e por livro inteiro** (não interromper um livro no meio de um dia, sempre que possível; ajustar quantidade de capítulos/dia para fechar livros de forma equilibrada).
- **Alternando** Antigo e Novo Testamento (ex.: um bloco de AT e um bloco menor de NT por semana), para não deixar o Novo Testamento só pro final — mas isso deve ser configurável (opção "sequencial clássico" vs. "intercalado AT/NT").
- Gerar automaticamente a tabela de leitura diária com: **data prevista, dia do plano (ex. Dia 12/90), livro(s), capítulo(s) inicial e final**.
- Permitir trocar de plano depois (com aviso de que o progresso será recalculado).

### 2. Cronograma / Tela principal

- Lista/calendário com todos os dias do plano, agrupados por semana e por livro.
- Cada item do cronograma mostra: livro + capítulos do dia, status (pendente / concluído / atrasado), e um checkbox/botão **"Marcar como lido"**.
- Barra de progresso geral (%, capítulos lidos / total, dias concluídos / total, sequência atual de dias — "streak").
- Filtro para ver: tudo, pendentes, concluídos, atrasados.
- Ao marcar um dia como concluído, registrar a data/hora da conclusão.

### 3. Estudo por versículo

- Ao abrir um dia do cronograma, o usuário vê os capítulos do dia divididos em versículos.
- Cada versículo exibe:
  - Texto do versículo (buscar de uma API/fonte de texto bíblico em português, ex. ACF ou NVI, com atribuição correta da tradução).
  - Um botão/seção **"Explicação"** com comentário/estudo daquele versículo (contexto histórico, significado, aplicação prática). Esse conteúdo pode vir de uma base de comentários local (curada) ou ser gerado sob demanda; deixar preparado um campo `explicacao` por versículo no modelo de dados.
- Cada versículo pode ser marcado individualmente como lido (opcional, além da marcação por dia inteiro).

### 4. Comentários pessoais (diário de estudo)

- Em cada versículo, um campo de **texto livre** onde o usuário escreve sua reflexão/experiência pessoal.
- Os comentários ficam salvos e podem ser revisados depois em uma aba **"Meus comentários"**, listando todos os comentários feitos, com busca por livro/capítulo/versículo/palavra-chave e data.
- Permitir editar ou excluir um comentário individualmente.

### 5. Reset de dados

- Botão em **Configurações** chamado **"Zerar progresso"** com confirmação (modal do tipo "Tem certeza? Isso apagará todo o progresso de leitura, marcações e comentários. Esta ação não pode ser desfeita.").
- Opções de reset:
  - **Reset total**: apaga progresso, comentários e volta para a tela de escolha do plano.
  - **Reset apenas do progresso** (mantém os comentários salvos).
  - **Exportar antes de zerar** (baixar um JSON/backup dos dados antes de resetar), como proteção extra.

### 6. Modelo de dados sugerido

```json
{
  "plano": { "duracao": "3m|6m|1a", "modo": "sequencial|intercalado", "dataInicio": "ISO date" },
  "cronograma": [
    { "dia": 1, "data": "ISO date", "livro": "Gênesis", "capituloInicio": 1, "capituloFim": 3, "concluido": false, "concluidoEm": null }
  ],
  "versiculos": [
    { "livro": "Gênesis", "capitulo": 1, "versiculo": 1, "texto": "...", "explicacao": "...", "lido": false }
  ],
  "comentarios": [
    { "id": "uuid", "livro": "Gênesis", "capitulo": 1, "versiculo": 1, "texto": "minha reflexão...", "criadoEm": "ISO date", "atualizadoEm": "ISO date" }
  ]
}
```

### 7. Telas do app

1. **Onboarding**: escolha do plano (3m/6m/1a) e modo de distribuição.
2. **Home/Cronograma**: progresso geral + lista de dias.
3. **Detalhe do dia**: capítulos do dia, versículos, explicação e campo de comentário.
4. **Meus comentários**: lista/busca de todas as anotações.
5. **Configurações**: trocar plano, exportar dados, zerar progresso.

### 8. Requisitos não funcionais

- Interface simples, legível, adequada para leitura (boa tipografia, modo claro/escuro).
- Totalmente funcional offline após o primeiro carregamento (PWA opcional).
- Dados persistidos localmente; nenhuma informação enviada a servidores externos sem autorização explícita.

---

## Observações de implementação

- **Fonte do texto bíblico**: como a maioria das traduções em português tem direitos autorais, verificar licenciamento antes de embutir o texto completo (ex.: usar tradução de domínio público como a **João Ferreira de Almeida (versão original, 1898/1917)** ou uma API que já trate isso, como a `bible-api.com` ou `abibliadigital.com.br`).
- O texto **"explicação do versículo"** pode começar com um conjunto pequeno e curado (livros/capítulos de maior interesse) e crescer com o tempo, ou ser gerado por IA sob demanda e cacheado.
- A regra de distribuição de capítulos por dia pode ser implementada com um algoritmo simples: `capitulosPorDia = totalCapitulos / totalDias`, ajustando o arredondamento por livro para não fragmentar demais.
