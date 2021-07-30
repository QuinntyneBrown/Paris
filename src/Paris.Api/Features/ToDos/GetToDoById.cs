using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Paris.Api.Core;
using Paris.Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Paris.Api.Features
{
    public class GetToDoById
    {
        public class Request: IRequest<Response>
        {
            public Guid ToDoId { get; set; }
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
                return new () {
                    ToDo = (await _context.ToDos.SingleOrDefaultAsync(x => x.ToDoId == request.ToDoId)).ToDto()
                };
            }
            
        }
    }
}
