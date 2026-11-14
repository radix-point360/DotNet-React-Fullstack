namespace CRUD_Web_API.Models;

public sealed class Person
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required string Email { get; set; }

    public string? PhoneNumber { get; set; }
}
