export type StepId =
  | 'capa'
  | 'tempo-eletricista'
  | 'como-orca'
  | 'base-mao-de-obra'
  | 'cobrou-pouco'
  | 'reacao-preco'
  | 'orcamento-detalhado'
  | 'tempo-orcamento'
  | 'o-que-atrapalha'
  | 'usaria-app'
  | 'diagnostico'
  | 'oferta';

export type QuestionKey =
  | 'tempo-eletricista'
  | 'como-orca'
  | 'base-mao-de-obra'
  | 'cobrou-pouco'
  | 'reacao-preco'
  | 'tempo-orcamento'
  | 'o-que-atrapalha'
  | 'usaria-app';

export type QuizAnswers = Partial<Record<QuestionKey, string>>;

export interface QuestionOption {
  emoji: string;
  label: string;
}

export interface QuestionConfig {
  id: QuestionKey;
  stepNumber: number;
  totalQuestions: number;
  progressPercent: number;
  title: string;
  options: QuestionOption[];
}

export const STEP_ORDER: StepId[] = [
  'capa',
  'tempo-eletricista',
  'como-orca',
  'base-mao-de-obra',
  'cobrou-pouco',
  'reacao-preco',
  'orcamento-detalhado',
  'tempo-orcamento',
  'o-que-atrapalha',
  'usaria-app',
  'diagnostico',
  'oferta',
];

export const QUESTIONS: Record<QuestionKey, QuestionConfig> = {
  'tempo-eletricista': {
    id: 'tempo-eletricista',
    stepNumber: 1,
    totalQuestions: 8,
    progressPercent: 12.5,
    title: 'Há quanto tempo você trabalha como eletricista?',
    options: [
      { emoji: '🟢', label: 'Menos de 1 ano' },
      { emoji: '🟡', label: '1 a 3 anos' },
      { emoji: '🟠', label: '3 a 10 anos' },
      { emoji: '🔴', label: '+10 anos' },
    ],
  },
  'como-orca': {
    id: 'como-orca',
    stepNumber: 2,
    totalQuestions: 8,
    progressPercent: 25,
    title: 'Como você faz seus orçamentos de elétrica hoje? 📋',
    options: [
      { emoji: '🤦‍♂️', label: 'Faço de cabeça na obra mesmo' },
      { emoji: '📱', label: 'Uso calculadora e rascunho no celular' },
      { emoji: '📝', label: 'Anoto tudo na correria em um caderno' },
      { emoji: '🤔', label: 'Não sei calcular direito e acabo chutando' },
    ],
  },
  'base-mao-de-obra': {
    id: 'base-mao-de-obra',
    stepNumber: 3,
    totalQuestions: 8,
    progressPercent: 37.5,
    title: 'Na hora de definir o valor da sua mão de obra, em que você se baseia?',
    options: [
      { emoji: '😅', label: 'No que costumo cobrar por um serviço parecido' },
      { emoji: '🔧', label: 'No preço que vejo outros eletricistas cobrando' },
      { emoji: '⏰', label: 'No tempo e no trabalho pesado que vai dar' },
      { emoji: '📋', label: 'Em uma tabela ou valores que já tenho definidos' },
      { emoji: '🤷‍♂️', label: 'Ainda fico sem saber qual valor passar' },
    ],
  },
  'cobrou-pouco': {
    id: 'cobrou-pouco',
    stepNumber: 4,
    totalQuestions: 8,
    progressPercent: 50,
    title: 'Já terminou uma instalação e percebeu que cobrou pouco pela mão de obra ou gastou mais material do que imaginava?',
    options: [
      { emoji: '😬', label: 'Sim, já aconteceu várias vezes' },
      { emoji: '😰', label: 'Sim, principalmente quando a instalação deu mais trabalho do que eu esperava' },
      { emoji: '🤔', label: 'Às vezes fico na dúvida se o que cobrei compensou' },
      { emoji: '🛡️', label: 'Ainda não aconteceu comigo, mas quero evitar' },
    ],
  },
  'reacao-preco': {
    id: 'reacao-preco',
    stepNumber: 5,
    totalQuestions: 8,
    progressPercent: 62.5,
    title: 'Qual dessas situações mais acontece quando você passa o preço pra um cliente?',
    options: [
      { emoji: '😪', label: 'Ele pede desconto e eu acabo baixando o valor' },
      { emoji: '❌', label: 'Ele acha caro e eu tenho dificuldade para explicar o valor' },
      { emoji: '😟', label: 'Fico com receio de cobrar mais e perder o serviço' },
      { emoji: '👻', label: 'Recebe o preço no WhatsApp, mas depois some' },
      { emoji: '✅', label: 'Geralmente ele aceita, mas quero apresentar o orçamento de forma mais profissional' },
    ],
  },
  'tempo-orcamento': {
    id: 'tempo-orcamento',
    stepNumber: 6,
    totalQuestions: 8,
    progressPercent: 75,
    title: 'Quanto tempo você demora para fazer um orçamento completo? ⏱️',
    options: [
      { emoji: '🕐', label: 'Uns 30 minutos' },
      { emoji: '🕓', label: 'Mais de 1 hora' },
      { emoji: '📆', label: 'Mais de 1 dia' },
      { emoji: '❌', label: 'Às vezes nem faço orçamento formal' },
    ],
  },
  'o-que-atrapalha': {
    id: 'o-que-atrapalha',
    stepNumber: 7,
    totalQuestions: 8,
    progressPercent: 87.5,
    title: 'O que mais te atrapalha na hora de montar e enviar um orçamento?',
    options: [
      { emoji: '😪', label: 'Parar o serviço na obra para escrever toda a lista de materiais' },
      { emoji: '😬', label: 'Juntar tudo de cabeça, sem esquecer conectores, cabos ou disjuntores' },
      { emoji: '📲', label: 'Enviar de forma organizada e profissional no WhatsApp' },
      { emoji: '⚡', label: 'Já consigo fazer, mas queria simplificar e acelerar essa parte' },
    ],
  },
  'usaria-app': {
    id: 'usaria-app',
    stepNumber: 8,
    totalQuestions: 8,
    progressPercent: 100,
    title: 'Se existisse um aplicativo MUITO FÁCIL que calcula o orçamento do material, mão de obra e margem de lucro apenas gravando um áudio, você usaria? ⚡🔧',
    options: [
      { emoji: '✅', label: 'Com certeza usaria' },
      { emoji: '🤔', label: 'Talvez' },
      { emoji: '👊', label: 'Tenho interesse' },
    ],
  },
};

export interface RiskResult {
  level: 'ALTO' | 'MÉDIO' | 'MODERADO';
  percent: number;
  colorClass: string;
  barClass: string;
}

export function getRiskResult(p4Answer?: string): RiskResult {
  if (p4Answer === 'Sim, já aconteceu várias vezes') {
    return {
      level: 'ALTO',
      percent: 88,
      colorClass: 'bg-red-100 text-red-700 border-red-200',
      barClass: 'bg-gradient-to-r from-amber-500 to-red-600',
    };
  }
  if (p4Answer === 'Sim, principalmente quando a instalação deu mais trabalho do que eu esperava') {
    return {
      level: 'ALTO',
      percent: 81,
      colorClass: 'bg-red-100 text-red-700 border-red-200',
      barClass: 'bg-gradient-to-r from-amber-500 to-red-600',
    };
  }
  if (p4Answer === 'Às vezes fico na dúvida se o que cobrei compensou') {
    return {
      level: 'MÉDIO',
      percent: 64,
      colorClass: 'bg-amber-100 text-amber-800 border-amber-200',
      barClass: 'bg-gradient-to-r from-yellow-400 to-amber-500',
    };
  }
  return {
    level: 'MODERADO',
    percent: 47,
    colorClass: 'bg-amber-50 text-amber-800 border-amber-200',
    barClass: 'bg-gradient-to-r from-amber-400 to-orange-500',
  };
}

export const FINDING_BY_P2: Record<string, string> = {
  'Faço de cabeça na obra mesmo':
    'Você calcula de cabeça, e é aí que metros de cabo, disjuntores e seu tempo somem da conta.',
  'Uso calculadora e rascunho no celular':
    'A calculadora soma, mas não lembra de todos os itens que entram numa instalação elétrica.',
  'Anoto tudo na correria em um caderno':
    'No caderno o orçamento demora e chega sem padrão profissional pro cliente.',
  'Não sei calcular direito e acabo chutando':
    'Sem um cálculo certo, você corre o risco de pagar para trabalhar.',
};

export const FINDING_BY_P3: Record<string, string> = {
  'No que costumo cobrar por um serviço parecido':
    'Sua mão de obra está presa ao que você sempre cobrou, mesmo quando a infraestrutura dá mais trabalho.',
  'No preço que vejo outros eletricistas cobrando':
    'Copiar o preço de outro eletricista ignora os seus custos, ferramentas e deslocamento.',
  'No tempo e no trabalho pesado que vai dar':
    'Você pensa no esforço da instalação, mas isso não aparece detalhado para o cliente.',
  'Em uma tabela ou valores que já tenho definidos':
    'Você já tem base de valores, mas falta apresentar isso de forma que gere autoridade.',
  'Ainda fico sem saber qual valor passar':
    'Sem um critério definido, cada orçamento vira um chute inseguro.',
};

export const FINDING_BY_P5: Record<string, string> = {
  'Ele pede desconto e eu acabo baixando o valor':
    'Quando o cliente não vê o detalhe técnico, ele pede desconto e você acaba cedendo.',
  'Ele acha caro e eu tenho dificuldade para explicar o valor':
    'Sem o orçamento discriminado, fica difícil mostrar por que uma elétrica segura custa o que custa.',
  'Fico com receio de cobrar mais e perder o serviço':
    'O medo de perder o cliente está segurando o seu lucro lá embaixo.',
  'Recebe o preço no WhatsApp, mas depois some':
    'Preço solto em texto no WhatsApp não passa confiança, e o cliente some.',
  'Geralmente ele aceita, mas quero apresentar o orçamento de forma mais profissional':
    'Seu cliente já confia no seu trabalho. Com um PDF profissional, dá pra cobrar o valor justo.',
};

export const SERVICE_CHIPS = [
  'Quadro de distribuição',
  'Troca de fiação',
  'Chuveiro 220v',
  'Tomadas e interruptores',
  'Iluminação LED',
  'Padrão de entrada',
  'Disjuntor DR',
  'Aterramento',
  'Manutenção preventiva',
  'Automação residencial',
];

export const SEM_LIST = [
  'Faz orçamento de cabeça na obra',
  'Esquece cabo, disjuntor, conector e fita isolante',
  'Não sabe se realmente teve lucro no final',
  'Demora horas para passar um preço',
  'Manda mensagem bagunçada no WhatsApp',
  'Cliente acha caro e pede desconto',
  'Tudo anotado em caderno que se perde',
  'Trabalha pesado e não vê o dinheiro sobrar',
];

export const COM_LIST = [
  'Orçamento pronto em menos de 1 minuto',
  'Lista de materiais calculada automaticamente',
  'Cálculo de mão de obra com precisão',
  'Lucrando muito mais em cada serviço',
  'Orçamento profissional em PDF com seus dados',
  'Envio direto com 1 clique pelo WhatsApp',
  'Mais autoridade e profissionalismo',
  'Fecha muito mais serviços sem pechincha',
];

export const FAQ_ITEMS = [
  {
    q: 'Como eu recebo o acesso?',
    a: 'Na hora. Assim que o pagamento é aprovado, o link de acesso chega no seu WhatsApp e no seu e-mail.',
  },
  {
    q: 'Funciona em qualquer celular?',
    a: 'Sim. Funciona em qualquer Android ou iPhone, mesmo nos celulares mais simples. Não ocupa memória e não precisa baixar na loja: você abre pelo link e salva o ícone na tela inicial.',
  },
  {
    q: 'Eu não sei mexer muito com tecnologia. Vou conseguir usar?',
    a: 'Sim! Foi feito para usar com uma mão só na obra: você aperta o botão, fala o que vai instalar e o orçamento aparece pronto.',
  },
  {
    q: 'O aplicativo calcula os materiais elétricos também?',
    a: 'Calcula. Ele lista cabos, disjuntores, tomadas, eletrodutos e acessórios de acordo com o que você falar no áudio, e você pode editar qualquer preço ou quantidade.',
  },
  {
    q: 'Posso colocar meu nome e telefone no PDF?',
    a: 'Sim, o orçamento sai personalizado com seus dados profissionais para enviar no WhatsApp do cliente.',
  },
  {
    q: 'Preciso pagar mensalidade?',
    a: 'Não. Você paga R$ 29,90 apenas uma vez e o acesso é vitalício.',
  },
  {
    q: 'Eu realmente vou conseguir ganhar mais dinheiro com isso?',
    a: 'O app impede que você esqueça materiais no cálculo e faz o cliente enxergar valor profissional no seu orçamento — o que reduz pedidos de desconto e aumenta sua taxa de fechamento.',
  },
];
