<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Portfolio Contact</title>
</head>

<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
    <h2 style="color: #1a1a1a;">New message from your portfolio</h2>

    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #555; width: 80px;">Name:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">{{ $data['name'] }}</td>
        </tr>
        <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #555;">Email:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">
                <a href="mailto:{{ $data['email'] }}">{{ $data['email'] }}</a>
            </td>
        </tr>
    </table>

    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">

    <h3 style="color: #555; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
    <p style="color: #1a1a1a; line-height: 1.7; white-space: pre-wrap;">{{ $data['message'] }}</p>
</body>

</html>