using ArchUnitNET.xUnit;

namespace PlantWatery.ArchitectureTests.DependencyRules;

public class ApplicationDependencyRules : ArchitectureTest
{
    [Fact]
    public void ApplicationLayer_ShouldOnlyDependOnDomainAndApplicationLayer()
    {
        var rule = DependencyRuleChecker.CheckDependencies(
            ApplicationLayer,
            [ApplicationLayer, DomainLayer],
            "System", "Microsoft");

        rule.Check(Architecture);
    }
}
