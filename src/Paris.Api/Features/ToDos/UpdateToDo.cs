using FluentValidation;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Paris.Api.Core;
using Paris.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Paris.Api.Features
{
    public class UpdateToDo
    {
        public class Validator: AbstractValidator<Request>
        {
            public Validator()
            {
                RuleFor(request => request.ToDo).NotNull();
                RuleFor(request => request.ToDo).SetValidator(new ToDoValidator());
            }
        
        }

        public class Request: IRequest<Response>
        {
            public ToDoDto ToDo { get; set; }
        }

        public class Response: ResponseBase
        {
            public ToDoDto ToDo { get; set; }
        }

        public class Handler: IRequestHandler<Request, Response>
        {
            private readonly IParisDbContext _context;
        
            public Handler(IParisDbContext context)
                => _context = context;
        
            public async Task<Response> Handle(Request request, CancellationToken cancellationToken)
            {
                var toDo = await _context.ToDos.SingleAsync(x => x.ToDoId == request.ToDo.ToDoId);
                
                await _context.SaveChangesAsync(cancellationToken);
                
                return new Response()
                {
                    ToDo = toDo.ToDto()
                };
            }
            
        }
    }
}
