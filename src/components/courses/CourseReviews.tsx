import React, { useState } from 'react';
import { FaStar, FaThumbsUp } from 'react-icons/fa';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: Date;
  helpful: number;
}

interface CourseReviewsProps {
  courseId: string;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => Promise<void>;
  onMarkHelpful: (reviewId: string) => Promise<void>;
}

const CourseReviews = ({ courseId, reviews, onAddReview, onMarkHelpful }: CourseReviewsProps) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onAddReview({
        userId: 'current-user-id', // Replace with actual user ID
        userName: 'Current User', // Replace with actual user name
        userAvatar: 'https://example.com/avatar.jpg', // Replace with actual avatar
        rating,
        comment
      });
      setComment('');
      setRating(5);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <div className="mb-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl"
              >
                <FaStar className={star <= rating ? 'text-yellow-400' : 'text-gray-300'} />
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this course..."
          className="w-full p-3 border rounded min-h-[100px] mb-4"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded disabled:bg-blue-400"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>

      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{review.userName}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{review.comment}</p>
            <button
              onClick={() => onMarkHelpful(review.id)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600"
            >
              <FaThumbsUp />
              <span>Helpful ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseReviews;