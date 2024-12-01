export default async function getPostText(): Promise<string> {
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
