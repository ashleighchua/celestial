'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { mbtiQuestions, scoreMBTI } from '@/lib/calculators/mbti';

const PURPLE = '#8B5CF6';
const TOTAL_QUESTIONS = mbtiQuestions.length;

export default function MBTIQuizPage() {
  const router = useRouter();
  const { profile, setProfile } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  if (!profile) {
    router.push('/profile');
    return <div className="min-h-screen bg-white" />;
  }

  const question = mbtiQuestions[currentIndex];
  const progress = ((currentIndex + 1) / TOTAL_QUESTIONS) * 100;
  const isLastQuestion = currentIndex === TOTAL_QUESTIONS - 1;
  const canGoBack = currentIndex > 0;

  const handleAnswer = (choice: 'A' | 'B') => {
    const newAnswers = { ...answers, [question.id]: choice };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate result and save
      const result = scoreMBTI(newAnswers);
      setProfile({ ...profile, mbtiType: result.type });
      router.push('/mbti');
    } else {
      // Go to next question
      setDirection('forward');
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 150);
    }
  };

  const handleBack = () => {
    if (canGoBack) {
      setDirection('backward');
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
      }, 150);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-gray-100">
        <div className="flex items-center px-4 py-3">
          <Link href="/mbti" className="mr-3 text-gray-600 hover:text-gray-900">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold" style={{ color: PURPLE }}>MBTI Quiz</h1>
          </div>
          <div className="w-6" />
        </div>

        {/* Progress bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-500">
              Question {currentIndex + 1} of {TOTAL_QUESTIONS}
            </span>
            <span className="text-xs font-medium" style={{ color: PURPLE }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, backgroundColor: PURPLE }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="px-5 pt-8 pb-6">
        <div
          key={question.id}
          className={`transition-all duration-300 ease-out ${
            direction === 'forward'
              ? 'animate-[slideInRight_0.3s_ease-out]'
              : 'animate-[slideInLeft_0.3s_ease-out]'
          }`}
        >
          {/* Question text */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 text-white font-bold text-lg"
              style={{ backgroundColor: PURPLE }}
            >
              {currentIndex + 1}
            </div>
            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              {question.text}
            </h2>
          </div>

          {/* Option Cards */}
          <div className="space-y-4">
            {/* Option A */}
            <button
              onClick={() => handleAnswer('A')}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 active:scale-[0.98] ${
                answers[question.id] === 'A'
                  ? 'border-purple-400 bg-purple-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-purple-200 hover:bg-purple-50/30'
              }`}
              style={
                answers[question.id] === 'A'
                  ? { borderColor: PURPLE, backgroundColor: '#F3E8FF' }
                  : undefined
              }
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    answers[question.id] === 'A'
                      ? 'text-white'
                      : 'text-gray-400 bg-gray-100'
                  }`}
                  style={
                    answers[question.id] === 'A'
                      ? { backgroundColor: PURPLE }
                      : undefined
                  }
                >
                  A
                </div>
                <p className={`text-sm leading-relaxed pt-1 ${
                  answers[question.id] === 'A' ? 'text-gray-900 font-medium' : 'text-gray-700'
                }`}>
                  {question.optionA.text}
                </p>
              </div>
            </button>

            {/* Option B */}
            <button
              onClick={() => handleAnswer('B')}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 active:scale-[0.98] ${
                answers[question.id] === 'B'
                  ? 'border-purple-400 bg-purple-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-purple-200 hover:bg-purple-50/30'
              }`}
              style={
                answers[question.id] === 'B'
                  ? { borderColor: PURPLE, backgroundColor: '#F3E8FF' }
                  : undefined
              }
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    answers[question.id] === 'B'
                      ? 'text-white'
                      : 'text-gray-400 bg-gray-100'
                  }`}
                  style={
                    answers[question.id] === 'B'
                      ? { backgroundColor: PURPLE }
                      : undefined
                  }
                >
                  B
                </div>
                <p className={`text-sm leading-relaxed pt-1 ${
                  answers[question.id] === 'B' ? 'text-gray-900 font-medium' : 'text-gray-700'
                }`}>
                  {question.optionB.text}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100">
        <div className="max-w-md mx-auto px-5 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={!canGoBack}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              canGoBack
                ? 'text-gray-700 hover:bg-gray-100 active:scale-95'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </button>

          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    i === currentIndex
                      ? PURPLE
                      : answers[mbtiQuestions[i].id]
                      ? PURPLE + '60'
                      : '#E5E7EB',
                  transform: i === currentIndex ? 'scale(1.5)' : 'scale(1)',
                }}
              />
            ))}
          </div>

          <div className="w-16" />
        </div>
      </div>

      {/* CSS animation keyframes */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
