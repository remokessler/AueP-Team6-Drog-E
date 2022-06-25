using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using bnl_dark_api.DataBase;
using bnl_dark_api.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace bnl_dark_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _ctx;
    public AuthController(ILogger<AuthController> logger, ApplicationDbContext context)
    {
        _ctx = context;
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel user)
    {
        if (user is null)
        {
            return BadRequest("Invalid client request");
        }
        
        var dbUser = await _ctx.Users.FirstOrDefaultAsync((u => u.Email == user.UserName));
        if (dbUser.Password == user.Password)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, dbUser.Email),
                new Claim(ClaimTypes.NameIdentifier, dbUser.Id.ToString()),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: "bnl_dark_api",
                audience: "bnl_dark_api",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );
            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            });
        }
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("drog-e@supersecret"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                "https://localhost:44456",
                "https://localhost:44456",
                new []
                {
                    new Claim(ClaimTypes.Email, "test@test.ch")
                },
                expires: DateTime.MaxValue,
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

            return Ok(new AuthResponse { Token = tokenString });
        }
    }

    [HttpPost("resetpassword")]
    public IActionResult ResetPassword()
    {
        string to = "gateso8310@hbehs.com";
        string from = "nanojen129@roxoas.com";
        MailMessage message = new MailMessage(from, to);
        message.Subject = "Test";
        message.Body = @"Test 1234 code";
        SmtpClient client = new SmtpClient("smtp-relay.sendinblue.com");
        // Credentials are necessary if the server requires the client
        // to authenticate before it will send email on the client's behalf.
        // client.UseDefaultCredentials = true;
        client.Port = 587;
        client.Credentials = new NetworkCredential("nanojen129@roxoas.com", "TNVL4xXWdzHy9QUq");

        try
        {
            client.Send(message);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Exception caught in CreateTestMessage2(): {0}",
                ex.ToString());
        }

        return Ok();
    }
}