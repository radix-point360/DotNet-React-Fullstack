using CRUD_Web_API.Data;
using CRUD_Web_API.Dtos;
using CRUD_Web_API.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUD_Web_API.Services;

public sealed class PersonService(ApplicationDbContext dbContext) : IPersonService
{
    public async Task<IReadOnlyList<PersonResponse>> GetAllAsync(
        CancellationToken cancellationToken)
    {
        return await dbContext.People
            .AsNoTracking()
            .OrderBy(person => person.Id)
            .Select(person => new PersonResponse(
                person.Id,
                person.Name,
                person.Email,
                person.PhoneNumber))
            .ToListAsync(cancellationToken);
    }

    public async Task<PersonResponse?> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        return await dbContext.People
            .AsNoTracking()
            .Where(person => person.Id == id)
            .Select(person => new PersonResponse(
                person.Id,
                person.Name,
                person.Email,
                person.PhoneNumber))
            .SingleOrDefaultAsync(cancellationToken);
    }

    public async Task<PersonResponse> CreateAsync(
        CreatePersonRequest request,
        CancellationToken cancellationToken)
    {
        var person = new Person
        {
            Name = request.Name,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber
        };

        dbContext.People.Add(person);
        await dbContext.SaveChangesAsync(cancellationToken);
        return ToResponse(person);
    }

    public async Task<PersonResponse?> UpdateAsync(
        int id,
        UpdatePersonRequest request,
        CancellationToken cancellationToken)
    {
        var person = await dbContext.People.FindAsync([id], cancellationToken);
        if (person is null)
        {
            return null;
        }

        person.Name = request.Name;
        person.Email = request.Email;
        person.PhoneNumber = request.PhoneNumber;
        await dbContext.SaveChangesAsync(cancellationToken);
        return ToResponse(person);
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken)
    {
        var person = await dbContext.People.FindAsync([id], cancellationToken);
        if (person is null)
        {
            return false;
        }

        dbContext.People.Remove(person);
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static PersonResponse ToResponse(Person person) =>
        new(person.Id, person.Name, person.Email, person.PhoneNumber);
}
