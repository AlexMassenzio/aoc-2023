namespace Day4Tests;
using static Solution;
public class UnitTest1
{
    [Fact]
    public void TestExampleDataPart1()
    {
        int expectedValue = 13;

        string fileName = "../../../exampleinput.txt";

        Assert.Equal(expectedValue, Part1(fileName));
    }

    [Fact]
    public void TestFindMatchingNumbers_Standard()
    {
        int expectedValue = 8;
        HashSet<string> winningNumbers = new HashSet<string> { "41", "48", "83", "86", "17" };
        List<string> scratchoffResults = new List<string> { "83", "86", "", "6", "31", "17", "9", "48", "53" };

        int result = findMatchingNumbers(winningNumbers, scratchoffResults);

        Assert.Equal(expectedValue, result);
    }

    [Fact]
    public void TestFindMatchingNumbers_OneMatch()
    {
        int expectedValue = 1;
        HashSet<string> winningNumbers = new HashSet<string> { "1", "2", "3", "48", "5" };
        List<string> scratchoffResults = new List<string> { "83", "86", "6", "31", "17", "9", "48", "53" };

        int result = findMatchingNumbers(winningNumbers, scratchoffResults);

        Assert.Equal(expectedValue, result);
    }

    [Fact]
    public void TestFindMatchingNumbers_NoMatch()
    {
        int expectedValue = 0;
        HashSet<string> winningNumbers = new HashSet<string> { "87", "83", "26", "28", "32" };
        List<string> scratchoffResults = new List<string> { "88", "30", "70", "12", "93", "22", "82", "36" };

        int result = findMatchingNumbers(winningNumbers, scratchoffResults);

        Assert.Equal(expectedValue, result);
    }
}