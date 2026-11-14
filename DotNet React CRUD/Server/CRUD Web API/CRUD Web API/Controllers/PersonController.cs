using CRUD_Web_API.Dtos;
using CRUD_Web_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CRUD_Web_API.Controllers;

[Route("api/[controller]")]
[ApiController]
public sealed class PersonController(IPersonService personService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType<IReadOnlyList<PersonResponse>>(StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<PersonResponse>>> GetAll(
        CancellationToken cancellationToken)
    {
        var people = await personService.GetAllAsync(cancellationToken);
        return Ok(people);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType<PersonResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PersonResponse>> GetById(
        int id,
        CancellationToken cancellationToken)
    {
        var person = await personService.GetByIdAsync(id, cancellationToken);
        return person is null ? NotFound() : Ok(person);
    }

    [HttpPost]
    [ProducesResponseType<PersonResponse>(StatusCodes.Status201Created)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PersonResponse>> Create(
        CreatePersonRequest request,
        CancellationToken cancellationToken)
    {
        var person = await personService.CreateAsync(request, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = person.Id }, person);
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType<PersonResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PersonResponse>> Update(
        int id,
        UpdatePersonRequest request,
        CancellationToken cancellationToken)
    {
        var person = await personService.UpdateAsync(id, request, cancellationToken);
        return person is null ? NotFound() : Ok(person);
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var deleted = await personService.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
