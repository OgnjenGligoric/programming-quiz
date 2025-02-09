﻿using Konteh.Domain.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Konteh.BackOfficeApi.Features.Questions.GetQuestionStatistics;

namespace Konteh.BackOfficeApi.Features.Questions;

[ApiController]
[Route("questions")]
[Authorize]
public class QuestionsController : ControllerBase
{
    private readonly IMediator _mediator;

    public QuestionsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("search")]
    public async Task<ActionResult<SearchQuestions.Response>> Paginate([FromQuery] SearchQuestions.Query request)
    {
        var response = await _mediator.Send(request);
        return Ok(response);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(GetQuestionById.Response), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GetQuestionById.Response>> GetQuestionById(long id)
    {
        var response = await _mediator.Send(new GetQuestionById.Query { Id = id });
        return Ok(response);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> CreateOrUpdateQuestion(CreateOrUpdateQuestionCommand command)
    {
        await _mediator.Send(command);
        return Ok();
    }

    [HttpDelete("{questionId:long}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteById(long questionId)
    {
        await _mediator.Send(new DeleteQuestion.Command { Id = questionId });
        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GetAllQuestions.Response>>> GetAll()
    {
        var response = await _mediator.Send(new GetAllQuestions.Query());
        return Ok(response);
    }

    [HttpGet("statistics")]
    public async Task<ActionResult<QuestionStatistics>> GetQuestionStatistics([FromQuery] QuestionStatisticsQuery request)
    {
        var response = await _mediator.Send(request);
        return Ok(response);
    }
}
