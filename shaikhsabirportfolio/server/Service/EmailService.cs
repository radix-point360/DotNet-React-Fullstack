using MailKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace server.Services;

public class EmailService(IConfiguration configuration, ILogger<EmailService> logger)
{
    public async Task SendContactNotificationAsync(
        string senderName,
        string senderEmail,
        string subject,
        string message,
        CancellationToken ct = default)
    {
        var smtp = configuration.GetSection("Smtp");
        var host = smtp["Host"] ?? throw new InvalidOperationException("Smtp:Host is missing.");
        var port = int.Parse(smtp["Port"] ?? "587");
        var username = smtp["Username"] ?? throw new InvalidOperationException("Smtp:Username is missing.");
        var password = smtp["Password"] ?? throw new InvalidOperationException("Smtp:Password is missing.");
        var fromEmail = smtp["FromEmail"] ?? username;
        var toEmail = smtp["ToEmail"] ?? username;

        var emailSubject = string.IsNullOrWhiteSpace(subject)
            ? $"Portfolio Contact from {senderName}"
            : $"Portfolio Contact: {subject} (from {senderName})";

        var emailBody =
            $"""
            You received a new message from your portfolio contact form:

            Name:    {senderName}
            Email:   {senderEmail}
            Subject: {(string.IsNullOrWhiteSpace(subject) ? "(None)" : subject)}

            Message:
            {message}
            """;

        var mimeMessage = new MimeMessage();
        var socketOptions = port == 465 ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.StartTls;
        mimeMessage.From.Add(MailboxAddress.Parse(fromEmail));
        mimeMessage.To.Add(MailboxAddress.Parse(toEmail));
        mimeMessage.ReplyTo.Add(MailboxAddress.Parse(senderEmail));
        mimeMessage.Subject = emailSubject;
        mimeMessage.Body = new TextPart("plain") { Text = emailBody };

        using var client = new SmtpClient();
        await client.ConnectAsync(host, port, socketOptions, ct);
        await client.AuthenticateAsync(username, password, ct);
        await client.SendAsync(mimeMessage, ct);
        await client.DisconnectAsync(true, ct);

        logger.LogInformation("Contact notification email sent for {SenderEmail}", senderEmail);
    }
}