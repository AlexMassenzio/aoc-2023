internal class Program
{
    private static void Main(string[] args)
    {
        Console.Write("Part 1: ");
        Part1();
        Console.Write("Part 2: ");
        Part2();
    }

    public static void Part1()
    {
        string fileName = "../../../input.txt";
        IEnumerable<string> lines = File.ReadLines(fileName);

        int validBagIDSum = 0;

        foreach (string line in lines)
        {
            bool isValidBag = true;
            string[] words = line.Split(' ');

            int gameNumber = int.Parse(words[1].Remove(words[1].Length - 1));
            Dictionary<string, int> cubes = new Dictionary<string, int>();

            // parse over each pair of words; a number and a color
            for (int i = 2; i < words.Length - 1; i += 2)
            {
                string color = words[i + 1].Replace(';', ' ').Replace(',', ' ').TrimEnd();
                int value = int.Parse(words[i]);
                cubes.Add(color, value);

                // checks for the end of the bag pull (either a semicolon or the end of the line)
                if (words[i + 1][words[i + 1].Length - 1] != ',')
                {
                    if (!IsValid(cubes))
                    {
                        isValidBag = false;
                        cubes.Clear();
                        break;
                    }
                    cubes.Clear();
                }
            }

            cubes.Clear();

            if (isValidBag)
            {
                validBagIDSum += gameNumber;
            }
        }

        Console.WriteLine(validBagIDSum);
    }

    public static void Part2()
    {
        string fileName = "../../../input.txt";
        IEnumerable<string> lines = File.ReadLines(fileName);

        int sumOfSets = 0;

        foreach (string line in lines)
        {
            string[] words = line.Split(' ');

            int gameNumber = int.Parse(words[1].Remove(words[1].Length - 1));
            Dictionary<string, int> cubes = new Dictionary<string, int>();

            // parse over each pair of words; a number and a color
            for (int i = 2; i < words.Length - 1; i += 2)
            {
                string color = words[i + 1].Replace(';', ' ').Replace(',', ' ').TrimEnd();
                int value = int.Parse(words[i]);

                if (!cubes.ContainsKey(color) || cubes[color] < value)
                {
                    cubes[color] = value;
                }
            }

            int powerOfSet = cubes.ContainsKey("red") ? cubes["red"] : 0;
            powerOfSet *= cubes.ContainsKey("blue") ? cubes["blue"] : 0;
            powerOfSet *= cubes.ContainsKey("green") ? cubes["green"] : 0;

            sumOfSets += powerOfSet;
        }

        Console.WriteLine(sumOfSets);
    }

    private static bool IsValid(Dictionary<string, int> cubes)
    {
        int maxRed = 12;
        int maxGreen = 13;
        int maxBlue = 14;

        if (cubes.ContainsKey("red") && cubes["red"] > maxRed)
        {
            return false;
        }
        else if (cubes.ContainsKey("blue") && cubes["blue"] > maxBlue)
        {
            return false;
        }
        else if (cubes.ContainsKey("green") && cubes["green"] > maxGreen)
        {
            return false;
        }
        return true;
    }
}
