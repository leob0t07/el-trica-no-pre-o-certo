import { useState, useEffect, lazy, Suspense } from 'react';
import {
  STEP_ORDER,
  StepId,
  QUESTIONS,
  QuestionKey,
  QuizAnswers,
} from './data/quizData';
import { QuizHeader } from './components/QuizHeader';
import { CoverStep } from './components/CoverStep';

// Lazy-load secondary funnel steps so initial landing bundle loads instantly
const QuestionStep = lazy(() =>
  import('./components/QuestionStep').then((m) => ({ default: m.QuestionStep }))
);
const InteractiveDemoStep = lazy(() =>
  import('./components/InteractiveDemoStep').then((m) => ({
    default: m.InteractiveDemoStep,
  }))
);
const DiagnosisStep = lazy(() =>
  import('./components/DiagnosisStep').then((m) => ({ default: m.DiagnosisStep }))
);
const SalesPage = lazy(() =>
  import('./components/SalesPage').then((m) => ({ default: m.SalesPage }))
);

const STORAGE_KEY = 'eletrica_preco_certo_state_v1';

interface PersistedState {
  stepId: StepId;
  answers: QuizAnswers;
}

function loadPersistedState(): PersistedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { stepId: 'capa', answers: {} };
    const parsed = JSON.parse(raw) as { stepId?: string; answers?: QuizAnswers };
    let mappedStep: string | undefined = parsed.stepId;
    if (mappedStep === 'perdendo-dinheiro') mappedStep = 'diagnostico';
    if (mappedStep === 'como-usar') mappedStep = 'oferta';
    const validStep =
      mappedStep && STEP_ORDER.includes(mappedStep as StepId)
        ? (mappedStep as StepId)
        : 'capa';
    const validAnswers =
      parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {};
    return { stepId: validStep, answers: validAnswers };
  } catch {
    return { stepId: 'capa', answers: {} };
  }
}

export default function App() {
  const initial = loadPersistedState();
  const [stepId, setStepId] = useState<StepId>(initial.stepId);
  const [answers, setAnswers] = useState<QuizAnswers>(initial.answers);

  useEffect(() => {
    try {
      const payload: PersistedState = { stepId, answers };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota / privacy mode errors
    }
  }, [stepId, answers]);

  // Silent background prefetch of upcoming steps for zero-delay transitions
  useEffect(() => {
    if (stepId === 'capa') {
      const timer = window.setTimeout(() => {
        void import('./components/QuestionStep');
      }, 300);
      return () => window.clearTimeout(timer);
    }
    if (stepId === 'reacao-preco') {
      void import('./components/InteractiveDemoStep');
    }
    if (stepId === 'usaria-app') {
      void import('./components/DiagnosisStep');
    }
    if (stepId === 'diagnostico') {
      void import('./components/SalesPage');
    }
  }, [stepId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stepId]);

  const currentIndex = STEP_ORDER.indexOf(stepId);

  const goNext = () => {
    if (currentIndex < STEP_ORDER.length - 1) {
      setStepId(STEP_ORDER[currentIndex + 1]);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setStepId(STEP_ORDER[currentIndex - 1]);
    }
  };

  const handleAnswerSelect = (questionKey: QuestionKey, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionKey]: answer,
    }));
    goNext();
  };

  const handleRestartQuiz = () => {
    setAnswers({});
    setStepId('capa');
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const isQuestionStep = stepId in QUESTIONS;
  const currentQuestion = isQuestionStep ? QUESTIONS[stepId as QuestionKey] : null;
  const isSalesPage = stepId === 'oferta';

  return (
    <div className="min-h-screen bg-[#F1F5F9] sm:py-6 flex flex-col items-center">
      {/* Container principal mobile-first (expande no desktop na Página de Vendas) */}
      <main
        className={`w-full min-h-screen sm:min-h-0 bg-[#F8FAFC] sm:rounded-3xl sm:border sm:border-slate-200/90 sm:shadow-xl overflow-x-hidden flex flex-col transition-all ${
          isSalesPage
            ? 'max-w-[480px] md:max-w-[780px] lg:max-w-[980px]'
            : 'max-w-[480px]'
        }`}
      >
        {!isSalesPage && (
          <QuizHeader
            canGoBack={currentIndex > 0}
            onBack={goBack}
            progress={
              currentQuestion
                ? {
                    current: currentQuestion.stepNumber,
                    total: currentQuestion.totalQuestions,
                    percent: currentQuestion.progressPercent,
                  }
                : undefined
            }
          />
        )}

        <div className="flex-1">
          {stepId === 'capa' && <CoverStep onStart={goNext} />}

          <Suspense
            fallback={
              <div className="px-4 py-12 flex justify-center">
                <div className="w-7 h-7 rounded-full border-3 border-slate-200 border-t-[#0B4FC0] animate-spin" />
              </div>
            }
          >
            {currentQuestion && (
              <QuestionStep
                question={currentQuestion}
                selectedAnswer={answers[currentQuestion.id]}
                onSelect={(answer) => handleAnswerSelect(currentQuestion.id, answer)}
              />
            )}

            {stepId === 'orcamento-detalhado' && <InteractiveDemoStep onNext={goNext} />}

            {stepId === 'diagnostico' && (
              <DiagnosisStep answers={answers} onNext={goNext} />
            )}

            {stepId === 'oferta' && <SalesPage onRestartQuiz={handleRestartQuiz} />}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
