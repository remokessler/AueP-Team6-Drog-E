using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
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

        return Unauthorized();
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