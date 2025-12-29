using System.Reflection;
using ArchUnitNET.Loader;

using Architecture = ArchUnitNET.Domain.Architecture;

namespace PlantWatery.ArchitectureTests;

public abstract class ArchitectureTest
{
    protected static Assembly ApiLayer => typeof(Api.DependencyInjection).Assembly;
    protected static Assembly ApplicationLayer => typeof(Application.DependencyInjection).Assembly;
    protected static Assembly InfrastructureLayer => typeof(Infrastructure.DependencyInjection).Assembly;
    protected static Assembly DomainLayer => typeof(Domain.Interfaces.Services.IPlantService).Assembly;

    protected static Assembly[] AllAssemblies => [ApiLayer, ApplicationLayer, InfrastructureLayer, DomainLayer];


    protected static readonly Architecture Architecture = new ArchLoader()
                                                                .LoadAssembliesIncludingDependencies([.. AllAssemblies])
                                                                .Build();
}
