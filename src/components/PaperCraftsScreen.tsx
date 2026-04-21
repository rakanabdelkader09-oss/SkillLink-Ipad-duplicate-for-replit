import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ChevronRight, CheckCircle, Star, Lock } from 'lucide-react';
import { Progress } from './ui/progress';
import { SkillCoin } from './CurrencyIcons';

function ytEmbedUrl(id: string) {
  return `https://www.youtube.com/embed/${id}?playsinline=1&rel=0&modestbranding=1&enablejsapi=1`;
}

interface PaperCraftsScreenProps {
  onBack: () => void;
}

interface OrigamiStep {
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
}

interface OrigamiCourse {
  id: string;
  title: string;
  emoji: string;
  difficulty: 'easy' | 'intermediate' | 'advanced';
  steps: OrigamiStep[];
  points: number;
  locked?: boolean;
  completed?: boolean;
}

const COURSES: OrigamiCourse[] = [
  {
    id: 'paper-boat',
    title: 'Paper Boat',
    emoji: '⛵',
    difficulty: 'easy',
    points: 20,
    completed: false,
    steps: [
      { title: 'Fold in half', description: 'Take your paper and fold it in half horizontally.', youtubeId: 'OBuP0DV7dGA', thumbnail: 'https://img.youtube.com/vi/OBuP0DV7dGA/mqdefault.jpg' },
      { title: 'Fold corners down', description: 'Fold both top corners down to the center crease.', youtubeId: 'OBuP0DV7dGA', thumbnail: 'https://img.youtube.com/vi/OBuP0DV7dGA/mqdefault.jpg' },
      { title: 'Fold bottom strips up', description: 'Fold the bottom strip up on both sides.', youtubeId: 'OBuP0DV7dGA', thumbnail: 'https://img.youtube.com/vi/OBuP0DV7dGA/mqdefault.jpg' },
      { title: 'Open and shape', description: 'Open the bottom and press corners together to form the boat.', youtubeId: 'OBuP0DV7dGA', thumbnail: 'https://img.youtube.com/vi/OBuP0DV7dGA/mqdefault.jpg' },
    ],
  },
  {
    id: 'paper-airplane',
    title: 'Paper Airplane',
    emoji: '✈️',
    difficulty: 'easy',
    points: 20,
    completed: false,
    steps: [
      { title: 'Fold lengthwise', description: 'Fold the paper in half lengthwise and unfold.', youtubeId: 'veyZNyurlwU', thumbnail: 'https://img.youtube.com/vi/veyZNyurlwU/mqdefault.jpg' },
      { title: 'Fold top corners', description: 'Fold both top corners to the center line.', youtubeId: 'veyZNyurlwU', thumbnail: 'https://img.youtube.com/vi/veyZNyurlwU/mqdefault.jpg' },
      { title: 'Fold sides inward', description: 'Fold the slanted edges to the center again.', youtubeId: 'veyZNyurlwU', thumbnail: 'https://img.youtube.com/vi/veyZNyurlwU/mqdefault.jpg' },
      { title: 'Form wings', description: 'Fold both sides down to create the wings.', youtubeId: 'veyZNyurlwU', thumbnail: 'https://img.youtube.com/vi/veyZNyurlwU/mqdefault.jpg' },
      { title: 'Fly!', description: 'Open the wings and test your plane!', youtubeId: 'veyZNyurlwU', thumbnail: 'https://img.youtube.com/vi/veyZNyurlwU/mqdefault.jpg' },
    ],
  },
  {
    id: 'paper-cup',
    title: 'Paper Cup',
    emoji: '🥤',
    difficulty: 'easy',
    points: 20,
    steps: [
      { title: 'Fold diagonally', description: 'Fold the square paper diagonally to make a triangle.', youtubeId: 'kF-yGVRuuVk', thumbnail: 'https://img.youtube.com/vi/kF-yGVRuuVk/mqdefault.jpg' },
      { title: 'Fold right corner', description: 'Fold the right corner to the left edge.', youtubeId: 'kF-yGVRuuVk', thumbnail: 'https://img.youtube.com/vi/kF-yGVRuuVk/mqdefault.jpg' },
      { title: 'Fold left corner', description: 'Fold the left corner to the right edge.', youtubeId: 'kF-yGVRuuVk', thumbnail: 'https://img.youtube.com/vi/kF-yGVRuuVk/mqdefault.jpg' },
      { title: 'Fold top flaps', description: 'Fold down the front flap, flip and fold the back flap.', youtubeId: 'kF-yGVRuuVk', thumbnail: 'https://img.youtube.com/vi/kF-yGVRuuVk/mqdefault.jpg' },
      { title: 'Open the cup', description: 'Push your fingers inside and open the cup shape.', youtubeId: 'kF-yGVRuuVk', thumbnail: 'https://img.youtube.com/vi/kF-yGVRuuVk/mqdefault.jpg' },
    ],
  },
  {
    id: 'origami-crane',
    title: 'Origami Crane',
    emoji: '🕊️',
    difficulty: 'intermediate',
    points: 35,
    steps: [
      { title: 'Start with square base', description: 'Fold your square paper into the preliminary base.', youtubeId: 'FxgQVDjXnU4', thumbnail: 'https://img.youtube.com/vi/FxgQVDjXnU4/mqdefault.jpg' },
      { title: 'Petal fold', description: 'Perform the petal fold on the front and back.', youtubeId: 'FxgQVDjXnU4', thumbnail: 'https://img.youtube.com/vi/FxgQVDjXnU4/mqdefault.jpg' },
      { title: 'Form the body', description: 'Fold the sides inward to narrow the body.', youtubeId: 'FxgQVDjXnU4', thumbnail: 'https://img.youtube.com/vi/FxgQVDjXnU4/mqdefault.jpg' },
      { title: 'Shape the neck and tail', description: 'Fold one point up for the neck, the other for the tail.', youtubeId: 'FxgQVDjXnU4', thumbnail: 'https://img.youtube.com/vi/FxgQVDjXnU4/mqdefault.jpg' },
      { title: 'Fold the head', description: 'Inside-reverse fold the top of the neck to make the head.', youtubeId: 'FxgQVDjXnU4', thumbnail: 'https://img.youtube.com/vi/FxgQVDjXnU4/mqdefault.jpg' },
      { title: 'Open the wings', description: 'Gently pull the wings apart and puff the body.', youtubeId: 'FxgQVDjXnU4', thumbnail: 'https://img.youtube.com/vi/FxgQVDjXnU4/mqdefault.jpg' },
    ],
  },
  {
    id: 'origami-frog',
    title: 'Jumping Frog',
    emoji: '🐸',
    difficulty: 'intermediate',
    points: 35,
    steps: [
      { title: 'Fold and crease', description: 'Create valley and mountain folds to form the base.', youtubeId: '2HLwnynrMFQ', thumbnail: 'https://img.youtube.com/vi/2HLwnynrMFQ/mqdefault.jpg' },
      { title: 'Form the front legs', description: "Create the frog's two front legs from the top section.", youtubeId: '2HLwnynrMFQ', thumbnail: 'https://img.youtube.com/vi/2HLwnynrMFQ/mqdefault.jpg' },
      { title: 'Form the back legs', description: 'Fold the bottom section to create the back legs.', youtubeId: '2HLwnynrMFQ', thumbnail: 'https://img.youtube.com/vi/2HLwnynrMFQ/mqdefault.jpg' },
      { title: 'Make it jump!', description: 'Press the back and release — your frog jumps!', youtubeId: '2HLwnynrMFQ', thumbnail: 'https://img.youtube.com/vi/2HLwnynrMFQ/mqdefault.jpg' },
    ],
  },
];

const DIFFICULTY_CONFIG = {
  easy: { label: 'Easy', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-200 dark:border-green-800', gradient: 'from-green-400 to-emerald-500' },
  intermediate: { label: 'Intermediate', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-200 dark:border-yellow-800', gradient: 'from-yellow-400 to-orange-400' },
  advanced: { label: 'Advanced', color: 'bg-red-500', textColor: 'text-red-700', bgColor: '
