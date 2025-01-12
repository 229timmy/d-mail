import { SMTPServer, SMTPServerDataStream, SMTPServerSession } from 'smtp-server';
import { simpleParser } from 'mailparser';
import { createClient } from '@supabase/supabase-js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import type { Database } from './types/supabase.js';
import emailRoutes from './routes/emailRoutes.js';
import { verifyConnection } from './services/emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${dirname(__dirname)}/.env` });

console.log('Environment variables:', {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
  API_PORT: process.env.API_PORT,
  SMTP_PORT: process.env.SMTP_PORT,
});

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/email', emailRoutes);

// Initialize SMTP server
const server = new SMTPServer({
  secure: false,
  authOptional: true,
  disabledCommands: ['AUTH'],
  
  // Handle incoming emails
  async onData(stream: SMTPServerDataStream, session: SMTPServerSession, callback: (error?: Error) => void) {
    try {
      // Parse email
      const email = await simpleParser(stream);
      
      // Extract attachments
      const attachments = email.attachments.map(attachment => ({
        filename: attachment.filename,
        contentType: attachment.contentType,
        size: attachment.size,
      }));

      // Calculate basic spam score (can be enhanced later)
      const spamScore = calculateSpamScore(email);
      const isSpam = spamScore > 0.7;

      // Type assertion since we know these will exist due to SMTP protocol
      const recipientAddress = (session.envelope.rcptTo[0] as any).address as string;
      const senderAddress = (session.envelope.mailFrom as any).address as string;

      // Store email in Supabase
      const { error } = await supabase
        .from('emails')
        .insert({
          recipient_address: recipientAddress,
          sender_address: senderAddress,
          subject: email.subject || '(No Subject)',
          body_html: email.html || null,
          body_text: email.text || null,
          spam_score: spamScore,
          is_spam: isSpam,
          headers: email.headers,
          attachments
        });

      if (error) throw error;
      
      callback();
    } catch (error) {
      console.error('Error processing email:', error);
      callback(new Error('Error processing email'));
    }
  }
});

// Basic spam score calculation (can be enhanced)
function calculateSpamScore(email: any): number {
  let score = 0;
  
  // Check for common spam indicators
  const spamKeywords = ['viagra', 'lottery', 'winner', 'prince', 'inheritance'];
  const text = (email.text || '').toLowerCase();
  
  // Add points for spam keywords
  spamKeywords.forEach(keyword => {
    if (text.includes(keyword)) score += 0.2;
  });
  
  // Check for excessive capitalization
  const capsRatio = (email.text || '').split('').filter((c: string) => c === c.toUpperCase()).length / (email.text || '').length;
  if (capsRatio > 0.3) score += 0.3;
  
  // Check for suspicious sender domains
  if (email.from?.value?.[0]?.address?.match(/\.(xyz|top|work|click)$/i)) {
    score += 0.2;
  }
  
  return Math.min(score, 1);
}

const SMTP_PORT = process.env.SMTP_PORT || 2525;
const API_PORT = process.env.API_PORT || 3000;

// Start servers
async function startServers() {
  try {
    // Verify SMTP connection
    await verifyConnection();

    // Start SMTP server
    server.listen(SMTP_PORT, () => {
      console.log(`SMTP Server listening on port ${SMTP_PORT}`);
    });

    // Start API server
    app.listen(API_PORT, () => {
      console.log(`API Server listening on port ${API_PORT}`);
    });
  } catch (error) {
    console.error('Error starting servers:', error);
    process.exit(1);
  }
}

startServers(); 