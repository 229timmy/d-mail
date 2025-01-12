# D-Mail Server

The server component of D-Mail, handling email receiving and sending functionality.

## Features

- SMTP server for receiving emails
- Email sending via SMTP
- Spam detection
- Email threading
- Attachment handling
- REST API for frontend integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`:
- Set your Supabase credentials
- Configure SMTP settings for incoming and outgoing mail
- Adjust ports if needed

## Development

Run the development server:
```bash
npm run dev
```

## Production

Build and start the production server:
```bash
npm run build
npm start
```

## API Endpoints

### POST /api/email/send
Send an email from a verified address.

Request body:
```json
{
  "from": "your-address@d-mail.temp",
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "text": "Plain text content",
  "html": "<p>HTML content</p>",
  "attachments": [
    {
      "filename": "example.pdf",
      "content": "base64-encoded-content",
      "contentType": "application/pdf"
    }
  ]
}
```

### GET /api/email/thread/:threadId
Get all emails in a thread.

### POST /api/email/:id/spam
Mark an email as spam.

## SMTP Server

The SMTP server listens on port 2525 (configurable) and accepts incoming emails for your d-mail.temp addresses. It automatically:

- Parses email content
- Calculates spam scores
- Extracts attachments
- Stores emails in Supabase

## Security

- All sender addresses are verified against the user database
- Incoming SMTP server is configured for receiving only
- Outgoing emails require authentication
- API endpoints validate user ownership of email addresses 