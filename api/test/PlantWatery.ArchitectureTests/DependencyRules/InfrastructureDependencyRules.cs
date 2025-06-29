using ArchUnitNET.Domain.Dependencies;
using ArchUnitNET.Domain.Extensions;
using ArchUnitNET.xUnit;

namespace PlantWatery.ArchitectureTests.DependencyRules;

public class InfrastructureDependencyRules : ArchitectureTest
{
    [Fact]
    public void InfrastructureLayer_ShouldOnlyDependOnDomainAndInfrastructureLayer()
    {
        var rule = DependencyRuleChecker.CheckDependencies(
            InfrastructureLayer,
            [InfrastructureLayer, DomainLayer],
            "System", "Microsoft");

        rule.Check(Architecture);
    }

    [Fact]
    public void Repositories_ShouldNotUseOtherRepositories()
    {
        var repositories = Architecture.Classes.Where(c => c.FullNameContains("Repository") && !c.FullNameContains("Npgsql"));

        Assert.All(repositories, r => Assert.Null(r.Dependencies.Find(d =>
                                d is not ImplementsInterfaceDependency
                                && d.Origin.FullName != d.Target.FullName
                                && d.Target.NameEndsWith("Repository"))));
    }
}
