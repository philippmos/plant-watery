using ArchUnitNET.Domain.Extensions;
using ArchUnitNET.xUnit;

namespace PlantWatery.ArchitectureTests.DependencyRules;

public class DomainDependencyRules : ArchitectureTest
{
    [Fact]
    public void DomainLayer_ShouldOnlyDependOnItself()
    {
        var rule = DependencyRuleChecker.CheckDependencies(
            DomainLayer,
            [DomainLayer],
            "System");

        rule.Check(Architecture);
    }

    [Fact]
    public void DomainLayer_ShouldNotUseRepositories()
    {
        var classes = Architecture.Classes.Where(c => c.FullNameContains("Domain"));

        Assert.All(classes, c => Assert.Null(c.Dependencies.Find(d => d.Origin.FullName != d.Target.FullName
                                                                && d.Target.NameEndsWith("Repository"))));
    }

    [Fact]
    public void DomainLayer_ShouldNotUseServices()
    {
        var classes = Architecture.Classes.Where(c => c.FullNameContains("Domain"));

        Assert.All(classes, c => Assert.Null(c.Dependencies.Find(d => d.Origin.FullName != d.Target.FullName
                                                                && d.Target.NameEndsWith("Service"))));
    }
}
