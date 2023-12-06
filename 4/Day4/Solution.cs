public class Solution
{
    public static int Part1(string fileName)
    {
        IEnumerable<string> lines = File.ReadLines(fileName);
        int scratchcardSum = 0;

        foreach (string line in lines)
        {
            List<string> words = new List<string>();
            words = line.Substring(line.IndexOf(':')).Split(' ').ToList();

            HashSet<string> winningNumbers = new HashSet<string>();
            int scratchoffStartIndex = 0;

            //Load winning numbers into hashset for fast lookup
            for (int i = 2; i < words.Count; i++)
            {
                if (words[i] == "|")
                {
                    scratchoffStartIndex = i + 1;
                    break;
                }
                winningNumbers.Add(words[i]);
            }

            winningNumbers.Remove("");

            words.RemoveRange(0, scratchoffStartIndex);

            scratchcardSum += findMatchingNumbers(winningNumbers, words);
        }

        return scratchcardSum;
    }

    public static int Part2(string fileName)
    {
        IEnumerable<string> lines = File.ReadLines(fileName);
        return 0;
    }

    public static int findMatchingNumbers(HashSet<string> winningNumbers, List<string> scratchoffResults)
    {
        int matchingNumbers = 0;
        for (int i = 0; i < scratchoffResults.Count; i++)
        {
            if (winningNumbers.Contains(scratchoffResults[i]))
            {
                matchingNumbers++;
            }
        }

        if (matchingNumbers > 1)
        {
            matchingNumbers = (int)Math.Pow(2, matchingNumbers - 1);
        }

        return matchingNumbers;
    }
}