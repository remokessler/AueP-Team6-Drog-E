using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using bnl_dark_api.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace bnl_dark_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel user)
    {
        if (user is null)
        {
            return BadRequest("Invalid client request");
        }

        if (user.UserName == "test" && user.Password == "test")
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("drog-e@supersecret"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:44456",
                audience: "https://localhost:44456",
                claims: new []
                {
                    new Claim(ClaimTypes.Email, "test@test.ch")
                },
                expires: DateTime.MaxValue,
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

            return Ok(new AuthResponse { Token = tokenString });
        }

        return Unauthorized();
    }
}