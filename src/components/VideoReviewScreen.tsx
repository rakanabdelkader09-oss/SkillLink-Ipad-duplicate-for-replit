import { useState } from 'react';
import { ArrowLeft, CheckCircle, X, Video, Star, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface VideoSubmission {
  id: string;
  questTitle: string;
  questIcon: string;
  questPoints: number;
  childName: string;
  challengedWith: string[];
  videoFileName: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface VideoReviewScreenProps {
  onBack: () => void;
  onApprove?: (submissionId: string) => void;
  onReject?: (submissionId: string) => void;
}

export function VideoReviewScreen({ onBack, onApprove, onReject }: VideoReviewScreenProps) {
  const [submissions, setSubmissions] = useState<VideoSubmission[]>([
    {
      id: '1',
      questTitle: 'Brush your teeth',
      questIcon: '🪥',
      questPoints: 10,
      childName: 'Alex',
      challengedWith: ['Mom', 'Emma'],
      videoFileName: 'brushing_teeth_2025.mp4',
      submittedAt: 'Today, 8:45 AM',
      status: 'pending',
    },
    {
      id: '2',
      questTitle: 'Draw your favorite animal',
      questIcon: '🎨',
      questPoints: 25,
      childName: 'Alex',
      challengedWith: ['Dad'],
      videoFileName: 'drawing_animal.mp4',
      submittedAt: 'Today, 2:30 PM',
      status: 'pending',
    },
    {
      id: '3',
      questTitle: 'Do 10 jumping jacks',
      questIcon: '🤸',
      questPoints: 10,
      childName: 'Alex',
      challengedWith: ['Jake', 'Mia'],
      videoFileName: 'jumping_jacks.mp4',
      submittedAt: 'Yesterday, 4:15 PM',
      status: 'approved',
    },
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState<VideoSubmission | null>(null);

  const handleApprove = (submissionId: string) => {
    setSubmissions(submissions.map(sub => 
      sub.id === submissionId ? { ...sub, status: 'approved' as const } : sub
    ));
    if (onApprove) onApprove(submissionId);
    setSelectedSubmission(null);
  };

  const handleReject = (submissionId: string) => {
    setSubmissions(submissions.map(sub => 
      sub.id === submissionId ? { ...sub, status: 'rejected' as const } : sub
    ));
    if (onReject) onReject(submissionId);
    setSelectedSubmission(null);
  };

  const pendingSubmissions = submissions.filter(s => s.status === 'pending');
  const reviewedSubmissions = submissions.filter(s => s.status !== 'pending');

  if (selectedSubmission) {
    return (
      <div className="h-full bg-gradient-to-b from-indigo-50 to-white pb-20 overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg">
          <button 
            onClick={() => setSelectedSubmission(null)} 
            className="text-white mb-4 flex items-center gap-4"
          >
            <ArrowLeft size={20} />
            Back to Reviews
          </button>
          
          <div className="text-center">
            <div className="text-7xl mb-4">{selectedSubmission.questIcon}</div>
            <h2 className="text-white mb-3">{selectedSubmission.questTitle}</h2>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-flex items-center gap-4">
              <Star size={20} className="text-yellow-300" fill="currentColor" />
              <span className="text-white">{selectedSubmission.questPoints} points</span>
            </div>
          </div>
        </div>

        {/* Video Player Placeholder */}
        <div className="px-6 mt-6">
          <Card className="p-0 overflow-hidden border-2 border-indigo-200">
            <div className="bg-slate-900 aspect-video flex items-center justify-center">
              <div className="text-center">
                <Video className="text-slate-500 mx-auto mb-3" size={64} />
                <p className="text-slate-400">Video Player</p>
                <p className="text-slate-500 text-sm">{selectedSubmission.videoFileName}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Challenge Info */}
        {selectedSubmission.challengedWith.length > 0 && (
          <div className="px-6 mt-6">
            <Card className="p-5 border-2 border-purple-200 bg-purple-50">
              <div className="flex items-center gap-4 mb-3">
                <Users className="text-purple-600" size={20} />
                <h3 className="text-purple-700">Challenge Participants</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {selectedSubmission.challengedWith.map((person, idx) => (
                  <div key={idx} className="bg-white border-2 border-purple-300 rounded-full px-4 py-2">
                    <span className="text-purple-700">{person}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Submission Details */}
        <div className="px-6 mt-6">
          <Card className="p-5 border-2 border-blue-200">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Child:</span>
                <span className="text-slate-800">{selectedSubmission.childName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Submitted:</span>
                <span className="text-slate-800">{selectedSubmission.submittedAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Status:</span>
                <span className={`capitalize ${
                  selectedSubmission.status === 'approved' ? 'text-green-600' : 
                  selectedSubmission.status === 'rejected' ? 'text-red-600' : 
                  'text-orange-600'
                }`}>
                  {selectedSubmission.status}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        {selectedSubmission.status === 'pending' && (
          <div className="px-6 mt-8 space-y-3 mb-6">
            <Button
              onClick={() => handleApprove(selectedSubmission.id)}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-16 rounded-2xl shadow-lg"
            >
              <CheckCircle className="mr-2" size={24} />
              Approve & Award Points
            </Button>
            
            <Button
              onClick={() => handleReject(selectedSubmission.id)}
              variant="outline"
              className="w-full border-2 border-red-300 text-red-600 hover:bg-red-50 h-16 rounded-2xl"
            >
              <X className="mr-2" size={24} />
              Reject Submission
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-b from-indigo-50 to-white pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg">
        <button onClick={onBack} className="text-white mb-4 flex items-center gap-4">
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        
        <h2 className="text-white mb-2">Video Reviews</h2>
        <p className="text-indigo-100">Review your child's quest submissions</p>
        
        {pendingSubmissions.length > 0 && (
          <div className="mt-4 bg-orange-500 rounded-full px-4 py-2 inline-block">
            <span className="text-white">
              {pendingSubmissions.length} pending {pendingSubmissions.length === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        )}
      </div>

      {/* Pending Reviews */}
      {pendingSubmissions.length > 0 && (
        <div className="px-6 mt-6">
          <h3 className="text-slate-700 mb-4">⏳ Pending Reviews</h3>
          <div className="space-y-3">
            {pendingSubmissions.map((submission) => (
              <Card
                key={submission.id}
                className="p-6 border-2 border-orange-200 bg-orange-50 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{submission.questIcon}</div>
                  
                  <div className="flex-1">
                    <h4 className="text-slate-800">{submission.questTitle}</h4>
                    <p className="text-slate-500 text-sm">{submission.submittedAt}</p>
                    {submission.challengedWith.length > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Users size={14} className="text-orange-600" />
                        <p className="text-orange-600 text-sm">
                          With {submission.challengedWith.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <Video className="text-orange-600 mx-auto mb-1" size={20} />
                    <p className="text-orange-700 text-sm">Review</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Reviewed Submissions */}
      {reviewedSubmissions.length > 0 && (
        <div className="px-6 mt-6 mb-6">
          <h3 className="text-slate-700 mb-4">📋 Recent Reviews</h3>
          <div className="space-y-3">
            {reviewedSubmissions.map((submission) => (
              <Card
                key={submission.id}
                className={`p-4 border-2 cursor-pointer hover:shadow-md transition-shadow ${
                  submission.status === 'approved' 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{submission.questIcon}</div>
                  
                  <div className="flex-1">
                    <h4 className="text-slate-800">{submission.questTitle}</h4>
                    <p className="text-slate-500 text-sm">{submission.submittedAt}</p>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                    submission.status === 'approved' 
                      ? 'bg-green-200' 
                      : 'bg-red-200'
                  }`}>
                    {submission.status === 'approved' ? (
                      <CheckCircle size={16} className="text-green-700" />
                    ) : (
                      <X size={16} className="text-red-700" />
                    )}
                    <span className={`text-sm capitalize ${
                      submission.status === 'approved' 
                        ? 'text-green-700' 
                        : 'text-red-700'
                    }`}>
                      {submission.status}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {pendingSubmissions.length === 0 && reviewedSubmissions.length === 0 && (
        <div className="px-6 mt-12 text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h3 className="text-slate-600 mb-2">No video submissions yet</h3>
          <p className="text-slate-400">
            Your child hasn't submitted any quest videos for review
          </p>
        </div>
      )}
    </div>
  );
}
