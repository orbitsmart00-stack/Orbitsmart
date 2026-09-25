# Cronograma Bíblico

App web (React + TypeScript + Vite + Tailwind) para acompanhar a leitura da
Bíblia com planos de 3 meses, 6 meses ou 1 ano, estudo por versículo e um
diário de comentários pessoais. Especificação completa em
[`../PROMPT-APP-CRONOGRAMA-BIBLIA.md`](../PROMPT-APP-CRONOGRAMA-BIBLIA.md).

## Rodando localmente

```bash
npm install
npm run dev      # inicia o servidor de desenvolvimento (http://localhost:5173)
npm run build    # gera a versão de produção em dist/
npm run preview  # serve a build de produção localmente
```

Nenhuma conta ou backend é necessária: todo o progresso, marcações e
comentários ficam salvos no `localStorage` do navegador.

## Funcionalidades

- **Planos de leitura**: 3 meses, 6 meses ou 1 ano, no modo sequencial
  (Gênesis → Apocalipse) ou intercalado (Antigo e Novo Testamento avançando
  juntos). O cronograma é gerado automaticamente distribuindo os 1.189
  capítulos da Bíblia em capítulos inteiros por dia.
- **Cronograma diário**: lista de dias com livro(s)/capítulo(s), status
  (pendente, concluído, atrasado) e marcação de leitura por dia ou por
  versículo individual.
- **Estudo por versículo**: cada versículo pode ser expandido para mostrar uma
  explicação de estudo (nota específica quando disponível, ou o contexto do
  livro — autor, contexto histórico e tema central — como base geral).
- **Comentários pessoais**: campo de texto livre por versículo, com uma aba
  "Meus comentários" para buscar, editar e excluir todas as anotações.
- **Zerar dados**: em Ajustes é possível zerar apenas o progresso (mantendo
  comentários) ou apagar tudo (com opção de exportar um backup em `.json`
  antes).

## Texto bíblico

O texto de cada capítulo é buscado em tempo real, no navegador de quem usa o
app, na API pública [bible-api.com](https://bible-api.com) (tradução Almeida,
de domínio público) e fica em cache local após a primeira leitura. Caso a
busca falhe (sem internet, API fora do ar), a interface mostra uma mensagem
de erro com botão "Tentar novamente" e, enquanto isso, exibe o contexto geral
do livro para que o estudo não fique interrompido.

> Observação: dentro de sandboxes de desenvolvimento com política de rede
> restritiva, o domínio `bible-api.com` pode estar bloqueado — nesse caso a
> tela de erro descrita acima é o comportamento esperado. Em um navegador
> comum, com acesso normal à internet, o texto carrega normalmente.
