using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs
{
  public class RegisterDTO : LoginDTO
  {
    public string Email { get; set; }

  }
}