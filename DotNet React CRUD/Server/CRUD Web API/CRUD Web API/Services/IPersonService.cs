using CRUD_Web_API.Dtos;

namespace CRUD_Web_API.Services;

public interface IPersonService
{
    Task<IReadOnlyList<PersonResponse>> GetAllAsync(CancellationToken cancellationToken);

    Task<PersonResponse?> GetByIdAsync(int id, CancellationToken cancellationToken);

    Task<PersonResponse> CreateAsync(
        CreatePersonRequest request,
        CancellationToken cancellationToken);

    Task<PersonResponse?> UpdateAsync(
        int id,
        UpdatePersonRequest request,
        CancellationToken cancellationToken);

    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken);
}
