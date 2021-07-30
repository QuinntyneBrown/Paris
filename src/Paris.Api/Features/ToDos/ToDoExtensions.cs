using System;
using Paris.Api.Models;

namespace Paris.Api.Features
{
    public static class ToDoExtensions
    {
        public static ToDoDto ToDto(this ToDo toDo)
        {
            return new ()
            {
                ToDoId = toDo.ToDoId
            };
        }
        
    }
}
