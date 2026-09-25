export interface BookIntro {
  autor: string
  contexto: string
  tema: string
}

/**
 * Introduções curtas (autoria tradicional, contexto histórico e tema central)
 * usadas como base de estudo sempre que não houver uma nota específica para
 * o versículo em `verseNotes.ts`. Redigidas como resumo de conhecimento geral,
 * não são citação de nenhuma tradução bíblica.
 */
export const BOOK_INTROS: Record<string, BookIntro> = {
  genesis: {
    autor: 'Tradicionalmente atribuído a Moisés.',
    contexto: 'Primeiro livro da Torá, narra as origens do mundo, da humanidade e do povo escolhido, dos patriarcas Abraão, Isaque, Jacó e José.',
    tema: 'As origens: criação, queda, promessa e aliança de Deus com um povo.',
  },
  exodo: {
    autor: 'Tradicionalmente atribuído a Moisés.',
    contexto: 'Relata a escravidão em Egito, o chamado de Moisés, as pragas, a saída de Israel e a entrega da Lei no monte Sinai.',
    tema: 'Libertação e aliança: Deus resgata seu povo e o constitui como nação.',
  },
  levitico: {
    autor: 'Tradicionalmente atribuído a Moisés.',
    contexto: 'Código de leis cerimoniais, sacrificiais e éticas dadas a Israel logo após o Êxodo.',
    tema: 'Santidade: como um povo se aproxima de um Deus santo.',
  },
  numeros: {
    autor: 'Tradicionalmente atribuído a Moisés.',
    contexto: 'Narra os censos, a organização do acampamento e os quarenta anos de peregrinação de Israel no deserto.',
    tema: 'Fidelidade em meio à incredulidade: a jornada até a terra prometida.',
  },
  deuteronomio: {
    autor: 'Tradicionalmente atribuído a Moisés.',
    contexto: 'Discursos finais de Moisés à nova geração de Israel, às portas da terra prometida, revendo a Lei e a aliança.',
    tema: 'Renovação da aliança: amar e obedecer a Deus para viver bem na terra.',
  },
  josue: {
    autor: 'Tradicionalmente atribuído a Josué, com edições posteriores.',
    contexto: 'A conquista e divisão da terra de Canaã sob a liderança de Josué, sucessor de Moisés.',
    tema: 'Deus cumpre suas promessas: a posse da terra prometida.',
  },
  juizes: {
    autor: 'Autor anônimo (tradição atribui a Samuel).',
    contexto: 'Ciclos de infidelidade, opressão, clamor e libertação de Israel por meio de líderes chamados juízes.',
    tema: 'O ciclo do pecado e da graça: "cada um fazia o que era reto aos seus próprios olhos".',
  },
  rute: {
    autor: 'Autor anônimo.',
    contexto: 'História de uma moabita que se torna ancestral do rei Davi, ambientada no período dos juízes.',
    tema: 'Lealdade (hesed) e redenção em meio a circunstâncias difíceis.',
  },
  '1samuel': {
    autor: 'Autor anônimo (profetas Samuel, Natã e Gade, segundo a tradição judaica).',
    contexto: 'Transição de Israel de uma confederação de tribos para uma monarquia: Samuel, Saul e a ascensão de Davi.',
    tema: 'Deus escolhe e rejeita líderes segundo o coração, não a aparência.',
  },
  '2samuel': {
    autor: 'Autor anônimo.',
    contexto: 'O reinado de Davi: suas vitórias, a aliança davídica e suas falhas morais e consequências.',
    tema: 'A aliança davídica e as consequências do pecado mesmo para um rei fiel.',
  },
  '1reis': {
    autor: 'Autor anônimo.',
    contexto: 'O reinado de Salomão, a construção do templo e a divisão do reino em Israel (norte) e Judá (sul).',
    tema: 'Sabedoria e apostasia: as consequências de seguir ou abandonar a aliança.',
  },
  '2reis': {
    autor: 'Autor anônimo.',
    contexto: 'História dos reinos de Israel e Judá até a queda de Samaria e o exílio babilônico de Judá.',
    tema: 'O juízo de Deus sobre a infidelidade persistente da nação.',
  },
  '1cronicas': {
    autor: 'Tradicionalmente atribuído a Esdras.',
    contexto: 'Genealogias e releitura do reinado de Davi, escrita após o exílio para o povo restaurado.',
    tema: 'Identidade e adoração: reconectar o povo pós-exílico à sua herança.',
  },
  '2cronicas': {
    autor: 'Tradicionalmente atribuído a Esdras.',
    contexto: 'Releitura da história dos reis de Judá com ênfase no templo e na fidelidade a Deus.',
    tema: 'Arrependimento e restauração: "se o meu povo... se humilhar e orar".',
  },
  esdras: {
    autor: 'Tradicionalmente atribuído a Esdras.',
    contexto: 'O retorno dos judeus do exílio babilônico e a reconstrução do templo em Jerusalém.',
    tema: 'Restauração da adoração e da comunidade após o exílio.',
  },
  neemias: {
    autor: 'Tradicionalmente atribuído a Neemias.',
    contexto: 'Reconstrução dos muros de Jerusalém e reforma espiritual do povo sob a liderança de Neemias.',
    tema: 'Liderança perseverante e reforma da comunidade de fé.',
  },
  ester: {
    autor: 'Autor anônimo.',
    contexto: 'Uma judia torna-se rainha da Pérsia e intervém para salvar seu povo de um extermínio planejado.',
    tema: 'A providência de Deus, mesmo quando seu nome não é mencionado diretamente.',
  },
  jo: {
    autor: 'Autor anônimo.',
    contexto: 'Diálogo poético sobre o sofrimento de um homem justo, Jó, e suas conversas com amigos e com Deus.',
    tema: 'Fé em meio ao sofrimento inexplicável e os limites da compreensão humana sobre Deus.',
  },
  salmos: {
    autor: 'Coleção de vários autores, especialmente Davi, Asafe e os filhos de Corá.',
    contexto: 'Hinário e livro de orações de Israel, cobrindo louvor, lamento, súplica e sabedoria.',
    tema: 'A vida devocional diante de Deus em todas as circunstâncias.',
  },
  proverbios: {
    autor: 'Atribuído principalmente a Salomão.',
    contexto: 'Coleção de ditos sábios sobre conduta prática, ética e temor do Senhor.',
    tema: '"O temor do Senhor é o princípio da sabedoria."',
  },
  eclesiastes: {
    autor: 'Tradicionalmente atribuído a Salomão.',
    contexto: 'Reflexão filosófica sobre o sentido da vida "debaixo do sol".',
    tema: 'A busca de sentido e a conclusão de que tudo aponta para temer a Deus e guardar seus mandamentos.',
  },
  canticos: {
    autor: 'Tradicionalmente atribuído a Salomão.',
    contexto: 'Poema lírico celebrando o amor e a intimidade entre um casal.',
    tema: 'A beleza do amor humano, lida por muitos também como figura do amor de Deus por seu povo.',
  },
  isaias: {
    autor: 'Tradicionalmente atribuído ao profeta Isaías.',
    contexto: 'Profecias de juízo e esperança para Judá, incluindo promessas messiânicas notáveis.',
    tema: 'Juízo e salvação: Deus julga a infidelidade, mas promete um Servo redentor.',
  },
  jeremias: {
    autor: 'Tradicionalmente atribuído ao profeta Jeremias (com Baruque como escriba).',
    contexto: 'Profecias nos últimos anos de Judá antes e durante a invasão babilônica.',
    tema: 'Advertência e uma nova aliança escrita no coração.',
  },
  lamentacoes: {
    autor: 'Tradicionalmente atribuído a Jeremias.',
    contexto: 'Poemas de luto sobre a destruição de Jerusalém e do templo em 586 a.C.',
    tema: 'Lamento honesto diante da tragédia, com um lampejo de esperança na fidelidade de Deus.',
  },
  ezequiel: {
    autor: 'Tradicionalmente atribuído ao profeta Ezequiel.',
    contexto: 'Visões e oráculos ao povo exilado na Babilônia, incluindo a visão do vale de ossos secos.',
    tema: 'A glória de Deus, o juízo e a promessa de restauração espiritual.',
  },
  daniel: {
    autor: 'Tradicionalmente atribuído a Daniel.',
    contexto: 'Narrativas de fidelidade de judeus exilados na corte babilônica e persa, e visões apocalípticas.',
    tema: 'A soberania de Deus sobre os impérios da história.',
  },
  oseias: {
    autor: 'Tradicionalmente atribuído ao profeta Oséias.',
    contexto: 'O casamento do profeta com uma mulher infiel serve de metáfora para a aliança entre Deus e Israel.',
    tema: 'O amor fiel de Deus por um povo infiel.',
  },
  joel: {
    autor: 'Tradicionalmente atribuído ao profeta Joel.',
    contexto: 'Uma praga de gafanhotos serve de ocasião para um chamado ao arrependimento e à promessa do Espírito.',
    tema: 'O "dia do Senhor" e o derramamento futuro do Espírito Santo.',
  },
  amos: {
    autor: 'Tradicionalmente atribuído ao profeta Amós.',
    contexto: 'Pastor de Judá que profetiza contra a injustiça social e a religiosidade vazia de Israel.',
    tema: 'Justiça social como expressão essencial da fé.',
  },
  obadias: {
    autor: 'Tradicionalmente atribuído ao profeta Obadias.',
    contexto: 'O menor livro do Antigo Testamento, um oráculo de juízo contra Edom por sua traição a Judá.',
    tema: 'Orgulho será humilhado; o Senhor julga as nações.',
  },
  jonas: {
    autor: 'Tradicionalmente atribuído ao profeta Jonas.',
    contexto: 'Narrativa de um profeta relutante enviado a pregar arrependimento a Nínive, capital assíria.',
    tema: 'A misericórdia de Deus alcança até os inimigos de seu povo.',
  },
  miqueias: {
    autor: 'Tradicionalmente atribuído ao profeta Miquéias.',
    contexto: 'Contemporâneo de Isaías, denuncia a injustiça e anuncia o nascimento do Messias em Belém.',
    tema: '"Praticar a justiça, amar a misericórdia e andar humildemente com o teu Deus."',
  },
  naum: {
    autor: 'Tradicionalmente atribuído ao profeta Naum.',
    contexto: 'Oráculo sobre a queda de Nínive, cerca de um século após o avivamento em Jonas.',
    tema: 'A justiça de Deus alcança até os impérios mais poderosos.',
  },
  habacuque: {
    autor: 'Tradicionalmente atribuído ao profeta Habacuque.',
    contexto: 'Diálogo do profeta com Deus questionando por que Ele usaria a violenta Babilônia para julgar Judá.',
    tema: '"O justo viverá pela sua fé", mesmo sem entender os caminhos de Deus.',
  },
  sofonias: {
    autor: 'Tradicionalmente atribuído ao profeta Sofonias.',
    contexto: 'Profecia do "dia do Senhor" como juízo, seguida de promessa de restauração para um remanescente.',
    tema: 'Juízo iminente e a alegria futura da restauração.',
  },
  ageu: {
    autor: 'Tradicionalmente atribuído ao profeta Ageu.',
    contexto: 'Exortação ao povo recém-retornado do exílio a retomar a reconstrução do templo.',
    tema: 'Prioridade: colocar a obra de Deus em primeiro lugar.',
  },
  zacarias: {
    autor: 'Tradicionalmente atribuído ao profeta Zacarias.',
    contexto: 'Visões e oráculos que encorajam a reconstrução do templo e apontam para o Messias vindouro.',
    tema: 'Esperança messiânica em meio à reconstrução da comunidade.',
  },
  malaquias: {
    autor: 'Tradicionalmente atribuído ao profeta Malaquias.',
    contexto: 'Último livro profético do Antigo Testamento, repreende a negligência espiritual do povo e dos sacerdotes.',
    tema: 'Fidelidade em pequenas coisas (dízimos, casamento, adoração) antes da vinda do "dia do Senhor".',
  },
  mateus: {
    autor: 'Tradicionalmente atribuído ao apóstolo Mateus.',
    contexto: 'Evangelho escrito com forte ênfase judaica, apresentando Jesus como o Messias prometido no Antigo Testamento.',
    tema: 'Jesus é o Rei prometido e o cumprimento das Escrituras.',
  },
  marcos: {
    autor: 'Tradicionalmente atribuído a João Marcos, associado a Pedro.',
    contexto: 'O evangelho mais curto e direto, com ritmo acelerado, escrito provavelmente para leitores romanos.',
    tema: 'Jesus, o Servo que age com poder e vai à cruz por amor.',
  },
  lucas: {
    autor: 'Tradicionalmente atribuído a Lucas, médico e companheiro de Paulo.',
    contexto: 'Relato cuidadosamente pesquisado da vida de Jesus, com atenção especial aos marginalizados.',
    tema: 'Jesus, Salvador de todos — pobres, mulheres, estrangeiros e pecadores.',
  },
  joao: {
    autor: 'Tradicionalmente atribuído ao apóstolo João.',
    contexto: 'Evangelho teológico centrado em sinais e discursos que revelam a identidade divina de Jesus.',
    tema: 'Jesus é o Filho de Deus; crer nele é ter vida eterna.',
  },
  atos: {
    autor: 'Tradicionalmente atribuído a Lucas.',
    contexto: 'Continuação do evangelho de Lucas, narra a expansão da igreja de Jerusalém até Roma pelo poder do Espírito.',
    tema: 'O Espírito Santo capacita a igreja para testemunhar "até os confins da terra".',
  },
  romanos: {
    autor: 'Apóstolo Paulo.',
    contexto: 'Carta doutrinária mais sistemática de Paulo, escrita à igreja de Roma antes de visitá-la.',
    tema: 'O evangelho: justificação pela fé, para judeus e gentios igualmente.',
  },
  '1corintios': {
    autor: 'Apóstolo Paulo.',
    contexto: 'Carta corretiva a uma igreja marcada por divisões, imoralidade e confusão sobre dons espirituais.',
    tema: 'Unidade, santidade e amor como marcas da igreja madura.',
  },
  '2corintios': {
    autor: 'Apóstolo Paulo.',
    contexto: 'Carta mais pessoal de Paulo, defendendo seu apostolado e falando de sofrimento e reconciliação.',
    tema: 'Força na fraqueza: "quando sou fraco, então sou forte".',
  },
  galatas: {
    autor: 'Apóstolo Paulo.',
    contexto: 'Carta enérgica contra falsos ensinadores que exigiam a lei mosaica além da fé em Cristo.',
    tema: 'Liberdade em Cristo: somos justificados pela fé, não pelas obras da lei.',
  },
  efesios: {
    autor: 'Apóstolo Paulo.',
    contexto: 'Carta circular sobre a identidade da igreja como corpo de Cristo, unindo judeus e gentios.',
    tema: 'Riquezas espirituais em Cristo e a vida nova que elas produzem.',
  },
  filipenses: {
    autor: 'Apóstolo Paulo.',
    contexto: 'Carta de gratidão e encorajamento escrita da prisão a uma igreja querida por Paulo.',
    tema: 'Alegria e contentamento em Cristo, mesmo em circunstâncias difíceis.',
  },
  colossenses: {
    autor: 'Apóstolo Paulo.',
    contexto: 'Carta que combate ensinos que diminuíam a suficiência de Cristo.',
    tema: 'A supremacia e suficiência de Cristo sobre todas as coisas.',
  },
  '1tessalonicenses': {
    autor: 'Apóstolo Paulo.',
    contexto: 'Uma das primeiras cartas de Paulo, incentivando uma jovem igreja perseguida.',
    tema: 'Viver em santidade e esperança à espera da volta de Cristo.',
  },
  '2tessalonicenses': {
    autor: 'Apóstolo Paulo.',
    contexto: 'Carta que corrige confusões sobre a segunda vinda de Cristo.',
    tema: 'Perseverança e trabalho enquanto se aguarda o retorno de Jesus.',
  },
  '1timoteo': {
    autor: 'Apóstolo Paulo.',
    contexto: 'Instruções pastorais a Timóteo sobre liderança e ordem na igreja de Éfeso.',
    tema: 'Sã doutrina e caráter piedoso na liderança da igreja.',
  },
  '2timoteo': {
    autor: 'Apóstolo Paulo.',
    contexto: 'Última carta de Paulo, escrita na prisão pouco antes de sua morte, exortando Timóteo a perseverar.',
    tema: '"Combati o bom combate": fidelidade até o fim.',
  },
  tito: {
    autor: 'Apóstolo Paulo.',
    contexto: 'Instruções a Tito para organizar a igreja em Creta e promover boas obras.',
    tema: 'A graça de Deus ensina a viver de forma piedosa.',
  },
  filemom: {
    autor: 'Apóstolo Paulo.',
    contexto: 'Bilhete pessoal pedindo que Filemom receba de volta seu escravo Onésimo como irmão em Cristo.',
    tema: 'Reconciliação e perdão transformados pelo evangelho.',
  },
  hebreus: {
    autor: 'Autor anônimo (tradições variam).',
    contexto: 'Argumento teológico para cristãos judeus tentados a abandonar a fé, mostrando a superioridade de Cristo.',
    tema: 'Cristo é superior aos anjos, a Moisés e ao sacerdócio levítico.',
  },
  tiago: {
    autor: 'Tradicionalmente atribuído a Tiago, irmão de Jesus.',
    contexto: 'Carta prática sobre como a fé genuína se expressa em ações concretas.',
    tema: '"A fé sem obras é morta": fé que se prova na prática.',
  },
  '1pedro': {
    autor: 'Apóstolo Pedro.',
    contexto: 'Carta de encorajamento a cristãos espalhados que enfrentavam sofrimento e perseguição.',
    tema: 'Esperança viva e perseverança no sofrimento por causa de Cristo.',
  },
  '2pedro': {
    autor: 'Apóstolo Pedro.',
    contexto: 'Advertência contra falsos mestres e lembrete da certeza da volta de Cristo.',
    tema: 'Crescimento no conhecimento de Cristo diante de falsos ensinos.',
  },
  '1joao': {
    autor: 'Tradicionalmente atribuído ao apóstolo João.',
    contexto: 'Carta pastoral que combate ensinos que negavam a humanidade de Cristo.',
    tema: 'Certeza da salvação através da fé, do amor e da obediência.',
  },
  '2joao': {
    autor: 'Tradicionalmente atribuído ao apóstolo João.',
    contexto: 'Bilhete curto alertando contra falsos mestres e incentivando a verdade e o amor.',
    tema: 'Andar na verdade e no amor, com discernimento.',
  },
  '3joao': {
    autor: 'Tradicionalmente atribuído ao apóstolo João.',
    contexto: 'Bilhete pessoal elogiando a hospitalidade de Gaio e repreendendo o orgulho de Diótrefes.',
    tema: 'Hospitalidade e apoio aos que servem a verdade.',
  },
  judas: {
    autor: 'Tradicionalmente atribuído a Judas, irmão de Tiago.',
    contexto: 'Carta breve e enérgica advertindo contra falsos mestres infiltrados na igreja.',
    tema: '"Contender pela fé que uma vez por todas foi dada aos santos."',
  },
  apocalipse: {
    autor: 'Tradicionalmente atribuído ao apóstolo João.',
    contexto: 'Visão apocalíptica dada a João no exílio em Patmos, revelando o triunfo final de Cristo.',
    tema: 'A vitória final de Deus sobre o mal e a renovação de todas as coisas.',
  },
}
