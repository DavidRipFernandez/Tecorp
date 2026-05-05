using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string entity, object id) : base($"{entity} con id '{id}' no fue encontrado.") { }
    }
}
