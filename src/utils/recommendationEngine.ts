interface Recommendation {
  id: string;
  title: string;
  score: number;
}

export const getRecommendations = (
  userInterests: string[],
  userHistory: string[]
): Recommendation[] => {
  // Placeholder implementation
  return [
    {
      id: '1',
      title: 'AI Transformation Strategy',
      score: 0.95
    },
    {
      id: '2',
      title: 'Machine Learning Implementation',
      score: 0.85
    },
    {
      id: '3',
      title: 'Data Science Solutions',
      score: 0.75
    }
  ];
};