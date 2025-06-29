using ArchUnitNET.Fluent.Syntax.Elements.Types;
using static ArchUnitNET.Fluent.ArchRuleDefinition;

namespace PlantWatery.ArchitectureTests;

public static class DependencyRuleChecker
{
    public static TypesShouldConjunction CheckDependencies(System.Reflection.Assembly source, IEnumerable<System.Reflection.Assembly> target, params string[] allowedNamespaces)
    {
        var allowedTypes = Types().That().ResideInAssembly(source);

        allowedTypes = target.Aggregate(allowedTypes, (current, assembly)
            => current.Or().ResideInAssembly(assembly));

        allowedTypes = allowedNamespaces.Aggregate(allowedTypes, (current, allowedNamespace)
            => current.Or().ResideInNamespace($"{allowedNamespace}.*", useRegularExpressions: true));

        var rule = Types()
                    .That()
                    .ResideInAssembly(source)
                    .Should()
                    .OnlyDependOn(allowedTypes);

        return rule;
    }
}
