import { useState } from 'react';
import { ArrowLeft, Play, CheckCircle, Lock, Star, X, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface CourseDetailScreenProps {
  courseId: string;
  onBack: () => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface Step {
  heading: string;
  videoUrl: string;
  videoLabel: string;
  instructions: string;
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  steps: Step[];
  quiz: QuizQuestion[];
}

const courseData: Record<string, any> = {
  'ls-1': {
    title: 'Tying Your Shoes',
    emoji: '👟',
    description: 'Learn the bunny ears method to tie your shoes all by yourself!',
    duration: '5 min',
    points: 25,
    lessons: [
      {
        id: 1,
        title: 'Getting Ready',
        duration: '2 min',
        completed: false,
        steps: [
          {
            heading: 'Find Your Shoes',
            videoUrl: 'https://www.youtube.com/embed/s2sGVdkPBZA',
            videoLabel: 'Preparing to tie shoes',
            instructions: 'Pick up both shoes and sit in a comfortable spot. Make sure the laces are untangled before we start.',
          },
          {
            heading: 'Hold the Laces',
            videoUrl: 'https://www.youtube.com/embed/s2sGVdkPBZA',
            videoLabel: 'Holding the laces correctly',
            instructions: 'Hold one lace in each hand. Pull them out so they are the same length on each side of the shoe.',
          },
          {
            heading: 'Cross and Tuck',
            videoUrl: 'https://www.youtube.com/embed/s2sGVdkPBZA',
            videoLabel: 'Cross and tuck step',
            instructions: 'Cross the right lace over the left, then tuck it underneath and pull both ends tight. This is the first knot!',
          },
        ],
        quiz: [
          { question: 'What should you do before starting to tie your shoes?', options: ['Jump up and down', 'Make sure laces are untangled', 'Put on socks', 'Find a hat'], correct: 1 },
          { question: 'How should the lace lengths be?', options: ['One very long, one short', 'Both the same length', 'Does not matter', 'Both very short'], correct: 1 },
          { question: 'What is the first step with the laces?', options: ['Make a big loop', 'Cross one over the other', 'Pull one hard', 'Cut them'], correct: 1 },
        ],
      },
      {
        id: 2,
        title: 'The Bunny Ears Method',
        duration: '2 min',
        completed: false,
        steps: [
          {
            heading: 'Make the First Loop',
            videoUrl: 'https://www.youtube.com/embed/s2sGVdkPBZA',
            videoLabel: 'Making bunny ear loops',
            instructions: 'Take one lace and fold it into a loop - this is the first "bunny ear". Hold it between your thumb and finger.',
          },
          {
            heading: 'Make the Second Loop',
            videoUrl: 'https://www.youtube.com/embed/s2sGVdkPBZA',
            videoLabel: 'Second bunny ear loop',
            instructions: 'Do the same with the other lace - make a second loop. Now you have two bunny ears!',
          },
          {
            heading: 'Cross and Pull Through',
            videoUrl: 'https://www.youtube.com/embed/s2sGVdkPBZA',
            videoLabel: 'Finishing the knot',
            instructions: 'Cross one bunny ear over the other, tuck it through, and pull both ears tight. Your shoe is tied!',
          },
        ],
        quiz: [
          { question: 'What is the "bunny ear" in this method?', options: ['A real rabbit ear', 'A folded loop of lace', 'A knot in the middle', 'The toe of the shoe'], correct: 1 },
          { question: 'How many loops do you make?', options: ['One', 'Three', 'Two', 'Four'], correct: 2 },
          { question: 'After crossing the ears, what do you do?', options: ['Tie a new knot on top', 'Tuck one through and pull tight', 'Wrap them around the shoe', 'Start over'], correct: 1 },
        ],
      },
    ],
  },
  'cr-1': {
    title: 'Drawing Basics',
    emoji: '✏️',
    description: 'Discover the joy of drawing! Learn to draw simple shapes, animals, and characters step by step.',
    duration: '12 min',
    points: 45,
    lessons: [
      {
        id: 1,
        title: 'Lines & Circles',
        duration: '3 min',
        completed: true,
        steps: [
          {
            heading: 'Get Your Tools Ready',
            videoUrl: 'https://www.youtube.com/embed/ZlBFyMfPHlw',
            videoLabel: 'Art tools for beginners',
            instructions: 'Get a pencil and a blank piece of paper. Find a flat surface to draw on. Good preparation makes drawing easier!',
          },
          {
            heading: 'Draw Straight Lines',
            videoUrl: 'https://www.youtube.com/embed/ZlBFyMfPHlw',
            videoLabel: 'Drawing straight lines',
            instructions: 'Hold your pencil lightly and move your whole arm to draw a straight line. Practice 5 horizontal lines and 5 vertical lines.',
          },
          {
            heading: 'Draw Circles',
            videoUrl: 'https://www.youtube.com/embed/ZlBFyMfPHlw',
            videoLabel: 'Drawing perfect circles',
            instructions: 'Draw a circle slowly, keeping your hand steady. Try making 5 circles of different sizes. It is okay if they are wobbly - practice makes perfect!',
          },
        ],
        quiz: [
          { question: 'How should you hold the pencil when drawing lines?', options: ['Very tightly', 'Lightly', 'With two hands', 'Between your teeth'], correct: 1 },
          { question: 'What helps you draw a straighter line?', options: ['Moving only your fingers', 'Moving your whole arm', 'Drawing very fast', 'Closing one eye'], correct: 1 },
          { question: 'What should you do if your circles look wobbly?', options: ['Give up drawing', 'Use a ruler', 'Keep practicing', 'Start with squares'], correct: 2 },
        ],
      },
      {
        id: 2,
        title: 'Drawing a Cat',
        duration: '4 min',
        completed: false,
        steps: [
          {
            heading: 'Start with the Head',
            videoUrl: 'https://www.youtube.com/embed/cqwYi64dFzw',
            videoLabel: 'Drawing a cat step by step',
            instructions: 'Draw a big circle for the cat\'s head. Make it nice and round - this is the base for our cat!',
          },
          {
            heading: 'Add Ears and Face',
            videoUrl: 'https://www.youtube.com/embed/cqwYi64dFzw',
            videoLabel: 'Cat ears and face',
            instructions: 'Draw two small triangles on top for ears. Then add two circles for eyes, a small triangle nose, and a curved line for the mouth.',
          },
          {
            heading: 'Finish with Whiskers',
            videoUrl: 'https://www.youtube.com/embed/cqwYi64dFzw',
            videoLabel: 'Cat whiskers and details',
            instructions: 'Draw 3 lines on each side of the nose for whiskers. Add dots at the end of each whisker. Your cat is done - give it a name!',
          },
        ],
        quiz: [
          { question: 'What shape is the cat\'s head?', options: ['Square', 'Triangle', 'Circle', 'Rectangle'], correct: 2 },
          { question: 'What shape are the cat\'s ears?', options: ['Circles', 'Triangles', 'Rectangles', 'Ovals'], correct: 1 },
          { question: 'How many whiskers does a cat have on each side?', options: ['1', '2', '3', '5'], correct: 2 },
        ],
      },
    ],
  },
  'co-1': {
    title: 'Simple Cooking',
    emoji: '🍳',
    description: 'Learn to make simple, yummy meals safely with a grown-up nearby.',
    duration: '15 min',
    points: 50,
    lessons: [
      {
        id: 1,
        title: 'Kitchen Safety First',
        duration: '3 min',
        completed: false,
        steps: [
          {
            heading: 'Why Safety Matters',
            videoUrl: 'https://www.youtube.com/embed/H1XOb6OSEhE',
            videoLabel: 'Kitchen safety for kids',
            instructions: 'The kitchen is an exciting place but it can also be dangerous. Always have an adult nearby when you cook. Watch this video carefully!',
          },
          {
            heading: 'Washing Your Hands',
            videoUrl: 'https://www.youtube.com/embed/H1XOb6OSEhE',
            videoLabel: 'Hand washing before cooking',
            instructions: 'Before touching any food, wash your hands with soap for 20 seconds. Clean hands keep food safe and healthy!',
          },
          {
            heading: 'Hot Surfaces',
            videoUrl: 'https://www.youtube.com/embed/H1XOb6OSEhE',
            videoLabel: 'Staying safe around heat',
            instructions: 'Never touch the stove, oven, or microwave without an adult. Keep a towel nearby for spills and always turn pot handles inward so they do not get knocked over.',
          },
        ],
        quiz: [
          { question: 'What should you always do before touching food?', options: ['Put on an apron', 'Wash your hands', 'Put on gloves', 'Count to 10'], correct: 1 },
          { question: 'How long should you wash your hands?', options: ['5 seconds', '10 seconds', '20 seconds', '1 minute'], correct: 2 },
          { question: 'Who should always be nearby when you cook?', options: ['A friend', 'Your pet', 'An adult', 'Nobody - be independent!'], correct: 2 },
        ],
      },
    ],
  },
};

type LessonPhase = 'steps' | 'quiz' | 'results';

function getYouTubeId(videoUrl: string): string {
  return videoUrl.split('/embed/')[1]?.split('?')[0] || '';
}

export function CourseDetailScreen({ courseId, onBack }: CourseDetailScreenProps) {
  const course = courseData[courseId] || courseData['ls-1'];
  const [lessons, setLessons] = useState<Lesson[]>(course.lessons);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [phase, setPhase] = useState<LessonPhase>('steps');

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizPassed, setQuizPassed] = useState(false);

  const completedLessons = lessons.filter(l => l.completed).length;
  const progress = lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0;
  const nextLesson = lessons.find(l => !l.completed);

  const startLesson = (lesson: Lesson) => {
    const lessonIndex = lessons.findIndex(l => l.id === lesson.id);
    const previousCompleted = lessonIndex === 0 || lessons[lessonIndex - 1].completed;
    if (!previousCompleted) return;
    setActiveLesson(lesson);
    setActiveStep(0);
    setPhase('steps');
    setQuizAnswers([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizPassed(false);
  };

  const goNextStep = () => {
    if (!activeLesson) return;
    if (activeStep < activeLesson.steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setPhase('quiz');
      setCurrentQuestion(0);
      setSelectedAnswer(null);
    }
  };

  const submitQuizAnswer = () => {
    if (selectedAnswer === null || !activeLesson) return;
    const newAnswers = [...quizAnswers, selectedAnswer];
    setQuizAnswers(newAnswers);

    if (currentQuestion < activeLesson.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      const correctCount = newAnswers.filter((ans, i) => ans === activeLesson.quiz[i].correct).length;
      const score = Math.round((correctCount / activeLesson.quiz.length) * 100);
      setQuizScore(score);
      setQuizPassed(score >= 80);
      setPhase('results');
    }
  };

  const completeLesson = () => {
    if (!activeLesson) return;
    setLessons(prev => prev.map(l => l.id === activeLesson.id ? { ...l, completed: true } : l));
    setActiveLesson(null);
  };

  const retryQuiz = () => {
    setPhase('quiz');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizAnswers([]);
    setQuizScore(0);
  };

  if (activeLesson) {
    const steps = activeLesson.steps;
    const quiz = activeLesson.quiz;

    // Quiz phase
    if (phase === 'quiz') {
      const q = quiz[currentQuestion];
      return (
        <div className="h-full bg-white flex flex-col">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 pt-12 pb-6">
            <button onClick={() => setActiveLesson(null)} className="text-white mb-3 flex items-center gap-4">
              <X size={20} /> Close
            </button>
            <div className="flex items-center gap-4 mb-1">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">📝 Lesson Quiz</span>
            </div>
            <h2 className="text-white text-xl font-bold">{activeLesson.title}</h2>
            <div className="mt-3 bg-white/20 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full transition-all" style={{ width: `${((currentQuestion) / quiz.length) * 100}%` }} />
            </div>
            <p className="text-white/70 text-sm mt-1">Question {currentQuestion + 1} of {quiz.length}</p>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="bg-indigo-50 rounded-3xl p-6 mb-6 border-2 border-indigo-100">
              <p className="text-xl font-bold text-gray-800 leading-relaxed">{q.question}</p>
            </div>
            <div className="space-y-3">
              {q.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedAnswer(i)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border-2 font-semibold transition-all active:scale-95 ${
                    selectedAnswer === i
                      ? 'border-purple-500 bg-purple-50 text-purple-800'
                      : 'border-gray-200 bg-white text-gray-700'
                  }`}
                >
                  <span className="mr-3 text-purple-400 font-black">{String.fromCharCode(65 + i)}.</span>
                  {option}
                </button>
              ))}
            </div>

            <Button
              onClick={submitQuizAnswer}
              disabled={selectedAnswer === null}
              className="w-full mt-6 py-5 rounded-2xl text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white disabled:opacity-40"
            >
              {currentQuestion < quiz.length - 1 ? 'Next Question →' : 'Finish Quiz →'}
            </Button>
          </div>
        </div>
      );
    }

    // Results phase
    if (phase === 'results') {
      return (
        <div className="h-full bg-white flex flex-col">
          <div className={`bg-gradient-to-r ${quizPassed ? 'from-green-500 to-emerald-600' : 'from-orange-500 to-red-500'} px-6 pt-12 pb-8 rounded-b-[3rem]`}>
            <button onClick={() => setActiveLesson(null)} className="text-white mb-4 flex items-center gap-4">
              <X size={20} /> Close
            </button>
            <div className="text-center text-white">
              <div className="text-7xl mb-4">{quizPassed ? '🏆' : '😅'}</div>
              <h2 className="text-3xl font-black mb-2">{quizPassed ? 'Passed!' : 'Not quite!'}</h2>
              <p className="text-white/80 text-lg mb-1">You scored <span className="font-black text-yellow-300">{quizScore}%</span></p>
              <p className="text-white/60 text-sm">{quizPassed ? 'You need 80% or more - great work!' : 'You need 80% or more to pass. Try again!'}</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
            <div className="w-full bg-gray-50 rounded-3xl p-5 border-2 border-gray-100">
              <p className="text-gray-500 font-semibold text-sm mb-3">Quiz Breakdown</p>
              {quiz.map((q, i) => {
                const userAns = quizAnswers[i];
                const isCorrect = userAns === q.correct;
                return (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl mb-2 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${isCorrect ? 'bg-green-500' : 'bg-red-400'}`}>
                      {isCorrect ? '✓' : '✕'}
                    </span>
                    <span className="text-gray-700 text-sm flex-1">{q.question}</span>
                  </div>
                );
              })}
            </div>

            {quizPassed ? (
              <Button
                onClick={completeLesson}
                className="w-full py-5 rounded-2xl text-lg font-black bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl"
              >
                <ChevronRight size={20} className="mr-1" /> Next Lesson
              </Button>
            ) : (
              <Button
                onClick={retryQuiz}
                className="w-full py-5 rounded-2xl text-lg font-black bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl"
              >
                Retry Quiz 🔄
              </Button>
            )}
          </div>
        </div>
      );
    }

    // Steps phase
    const step = steps[activeStep];
    const stepProgressPct = ((activeStep + 1) / steps.length) * 100;
    const ytId = getYouTubeId(step.videoUrl);

    return (
      <div className="h-full bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 pt-12 pb-6 flex-shrink-0">
          <button onClick={() => setActiveLesson(null)} className="text-white mb-3 flex items-center gap-4">
            <X size={20} /> Close
          </button>
          <h2 className="text-white text-xl font-bold">{activeLesson.title}</h2>
          <div className="mt-2 bg-white/20 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stepProgressPct}%` }}
            />
          </div>
          <p className="text-white/70 text-sm mt-1">Step {activeStep + 1} of {steps.length}</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <h3 className="text-2xl font-black text-gray-800 mb-4">{step.heading}</h3>

          {/* Video Player - iOS compatible thumbnail + YouTube link */}
          <div className="rounded-3xl overflow-hidden border-2 border-purple-100 shadow-lg mb-4 bg-black relative">
            <img
              src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
              alt={step.videoLabel}
              className="w-full h-44 object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/320x180/a855f7/ffffff?text=Watch+Video'; }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href={`https://www.youtube.com/watch?v=${ytId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg active:scale-90 transition-transform"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
              </a>
            </div>
          </div>
          <p className="text-gray-400 text-xs text-center mb-5 italic">{step.videoLabel}</p>

          {/* Instructions */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-5 border-2 border-purple-100 mb-6">
            <p className="text-base text-gray-700 leading-relaxed">{step.instructions}</p>
          </div>

          {/* Step dots */}
          <div className="flex justify-center gap-4 mb-4">
            {steps.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeStep ? 24 : 8,
                  height: 8,
                  background: i < activeStep ? '#a855f7' : i === activeStep ? '#ec4899' : '#e5e7eb',
                }}
              />
            ))}
          </div>

          <Button
            onClick={goNextStep}
            className="w-full py-5 rounded-2xl text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-6"
          >
            {activeStep < steps.length - 1 ? 'Next Step →' : 'Take Quiz 📋'}
          </Button>
        </div>
      </div>
    );
  }

  // Course Overview
  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-white pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 pt-12 pb-6 rounded-b-[3rem] shadow-lg">
        <button onClick={onBack} className="text-white mb-4 flex items-center gap-4">
          <ArrowLeft size={20} /> Back
        </button>
        <div className="flex items-center gap-5">
          <span className="text-5xl">{course.emoji}</span>
          <div>
            <h2 className="text-white mb-1 font-bold text-xl">{course.title}</h2>
            <Badge className="bg-white/20 text-white border-0">+{course.points} SC coins</Badge>
          </div>
        </div>
        <p className="text-purple-100 text-sm mt-3">{course.description}</p>
      </div>

      {/* How it works */}
      <div className="px-6 mt-5">
        <div className="bg-indigo-50 border-2 border-indigo-100 rounded-3xl p-6">
          <p className="text-indigo-700 font-bold text-sm mb-2">📋 How it works</p>
          <div className="flex items-center gap-4 text-indigo-600 text-xs">
            <span className="bg-indigo-200 rounded-full px-2 py-0.5 font-semibold">Step Videos</span>
            <span>→</span>
            <span className="bg-purple-200 rounded-full px-2 py-0.5 font-semibold">Lesson Quiz</span>
            <span>→</span>
            <span className="bg-green-200 rounded-full px-2 py-0.5 font-semibold">Next Lesson</span>
          </div>
          <p className="text-indigo-500 text-xs mt-2">Pass the quiz (80%+) to unlock the next lesson!</p>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 mt-4">
        <div className="bg-white border-2 border-purple-100 rounded-3xl p-5 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Your Progress</span>
            <span className="text-purple-600 font-bold">{completedLessons}/{lessons.length} done</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </div>

      {/* Start next lesson button */}
      {nextLesson && (
        <div className="px-6 mt-4">
          <Button
            onClick={() => startLesson(nextLesson)}
            className="w-full py-5 rounded-2xl text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
          >
            <Play size={20} className="mr-2" fill="white" />
            Start Lesson {nextLesson.id}: {nextLesson.title}
          </Button>
        </div>
      )}

      {completedLessons === lessons.length && (
        <div className="px-6 mt-4">
          <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-5 text-center">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-green-700 font-bold text-lg">Course Complete!</p>
            <p className="text-green-600 text-sm">You earned {course.points} SC coins!</p>
          </div>
        </div>
      )}

      {/* Lessons list */}
      <div className="px-6 mt-4">
        <h3 className="text-gray-700 font-bold mb-3">All Lessons</h3>
        <div className="space-y-3">
          {lessons.map((lesson, index) => {
            const isUnlocked = index === 0 || lessons[index - 1].completed;
            return (
              <button
                key={lesson.id}
                onClick={() => startLesson(lesson)}
                disabled={!isUnlocked}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                  lesson.completed
                    ? 'bg-green-50 border-green-200'
                    : isUnlocked
                    ? 'bg-white border-purple-200 shadow-md'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className={`rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 ${
                  lesson.completed ? 'bg-green-500' : isUnlocked ? 'bg-purple-500' : 'bg-gray-300'
                }`}>
                  {lesson.completed ? (
                    <CheckCircle size={24} className="text-white" />
                  ) : isUnlocked ? (
                    <Play size={20} className="text-white" fill="white" />
                  ) : (
                    <Lock size={20} className="text-white" />
                  )}
                </div>
                <div className="text-left flex-1">
                  <p className={`font-semibold ${lesson.completed ? 'text-green-700' : isUnlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                    Lesson {lesson.id}: {lesson.title}
                  </p>
                  <p className="text-gray-400 text-sm">{lesson.duration} • {lesson.steps.length} steps + quiz</p>
                </div>
                {lesson.completed && <Star size={20} className="text-yellow-400 flex-shrink-0" fill="#facc15" />}
                {isUnlocked && !lesson.completed && <ChevronRight size={20} className="text-purple-400 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
