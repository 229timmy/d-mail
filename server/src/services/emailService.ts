import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${dirname(dirname(__dirname))}/.env` });

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.OUTGOING_SMTP_HOST,
  port: parseInt(process.env.OUTGOING_SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.OUTGOING_SMTP_USER,
    pass: process.env.OUTGOING_SMTP_PASS,
  },
});

interface SendEmailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>;
}

export async function sendEmail(options: SendEmailOptions) {
  try {
    // Send email
    const info = await transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    });

    // Store in Supabase
    const { error } = await supabase
      .from('emails')
      .insert({
        sender_address: options.from,
        recipient_address: options.to,
        subject: options.subject,
        body_text: options.text || null,
        body_html: options.html || null,
        attachments: options.attachments?.map(att => ({
          filename: att.filename,
          contentType: att.contentType,
          size: att.content.length,
        })) || [],
      });

    if (error) throw error;

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Verify SMTP connection
export async function verifyConnection() {
  try {
    await transporter.verify();
    console.log('SMTP connection verified');
    return true;
  } catch (error) {
    console.error('SMTP connection failed:', error);
    return false;
  }
} 