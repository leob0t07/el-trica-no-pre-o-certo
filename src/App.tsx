import { useState, useEffect } from 'react';
import {
  STEP_ORDER,
  StepId,
  QUESTIONS,
  QuestionKey,
  QuizAnswers,
} from './data/quizData';
import { QuizHeader } from './components/QuizHeader';
import { CoverStep } from './components/CoverStep';
import { QuestionStep } from './components/QuestionStep';
import { InteractiveDemoStep } from './components/InteractiveDemoStep';
import { DiagnosisStep } from './components/DiagnosisStep';
import { SalesPage } from './components/SalesPage';

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
      {/* Container principal mobile-first max-width: 480px */}
      <main className="w-full max-w-[480px] min-h-screen sm:min-h-0 bg-[#F8FAFC] sm:rounded-3xl sm:border sm:border-slate-200/90 sm:shadow-xl overflow-x-hidden flex flex-col">
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
        </div>
      </main>
    </div>
  );
}
