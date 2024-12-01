export default async function getPostText(): Promise<string> {
  import tweets from "./tweets.json"; // Assuming the tweets JSON is properly imported
  import { log } from "mathjs"; // Use a math library for logarithmic calculations
  
  // Calculate weights using log(2 + favorites)
  const weights = tweets.map(tweet => Math.log(2 + tweet.favorites));

  // Normalize weights for probabilistic selection
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const normalizedWeights = weights.map(weight => weight / totalWeight);

  // Randomly select a tweet based on weights
  const randomValue = Math.random();
  let cumulativeWeight = 0;
  for (let i = 0; i < normalizedWeights.length; i++) {
    cumulativeWeight += normalizedWeights[i];
    if (randomValue <= cumulativeWeight) {
      return tweets[i].text; // Return the selected tweet's text
    }
  }

  // Fallback (should not occur with proper weighting)
  return tweets[0].text;
}
