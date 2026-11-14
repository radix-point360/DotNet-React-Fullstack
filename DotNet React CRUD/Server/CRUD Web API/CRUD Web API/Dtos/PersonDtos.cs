using System.ComponentModel.DataAnnotations;

namespace CRUD_Web_API.Dtos;

/// <summary>Request data for creating a person.</summary>
public sealed record CreatePersonRequest
{
    [Required, StringLength(100)]
    public required string Name { get; init; }

    [Required, EmailAddress, StringLength(256)]
    public required string Email { get; init; }

    [StringLength(32)]
    public string? PhoneNumber { get; init; }
}

/// <summary>Request data for replacing a person's details.</summary>
public sealed record UpdatePersonRequest
{
    [Required, StringLength(100)]
    public required string Name { get; init; }

    [Required, EmailAddress, StringLength(256)]
    public required string Email { get; init; }

    [StringLength(32)]
    public string? PhoneNumber { get; init; }
}

/// <summary>A person returned by the API.</summary>
public sealed record PersonResponse(int Id, string Name, string Email, string? PhoneNumber);
