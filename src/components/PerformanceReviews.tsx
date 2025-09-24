import { motion } from 'framer-motion';
import { TrendingUp, Award, Star } from 'lucide-react';
import type { PerformanceReview } from '../types';

interface PerformanceReviewsProps {
  reviews: PerformanceReview[];
}

const getRatingConfig = (rating: string) => {
  switch (rating) {
    case 'green':
      return { color: 'bg-green-500', textColor: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-500/10', icon: Award };
    case 'yellow':
      return { color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50 dark:bg-yellow-500/10', icon: Star };
    case 'red':
      return { color: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-500/10', icon: TrendingUp };
    default:
      return { color: 'bg-gray-500', textColor: 'text-gray-600', bgColor: 'bg-gray-50 dark:bg-gray-500/10', icon: Star };
  }
};

export const PerformanceReviews = ({ reviews }: PerformanceReviewsProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Reviews</h3>
      </div>
      
      <div className="space-y-4">
        {reviews.map((review, index) => {
          const config = getRatingConfig(review.rating);
          const Icon = config.icon;
          
          return (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg ${config.bgColor} border-l-4 ${config.color}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${config.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{review.period}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{review.reviewer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{review.score}</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < Math.round(review.score) ? config.textColor : 'text-gray-300'}`}
                        fill={i < Math.round(review.score) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};