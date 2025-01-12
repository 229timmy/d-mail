import express from 'express';
import { sendEmail } from '../services/emailService.js';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase.js';

const router = express.Router();
const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Test email endpoint
router.post('/test', async (req, res) => {
  try {
    await sendEmail({
      from: process.env.SENDGRID_FROM_EMAIL!,
      to: process.env.SENDGRID_FROM_EMAIL!, // Sending to yourself for testing
      subject: 'D-Mail Test Email',
      text: 'This is a test email from D-Mail',
      html: '<h1>D-Mail Test</h1><p>This is a test email from D-Mail</p>',
    });

    res.json({ success: true, message: 'Test email sent successfully' });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ error: 'Failed to send test email' });
  }
});

// Send email
router.post('/send', async (req, res) => {
  try {
    const { from, to, subject, text, html, attachments } = req.body;

    // Verify sender owns the from address
    const { data: address, error: addressError } = await supabase
      .from('email_addresses')
      .select('user_id')
      .eq('address', from)
      .single();

    if (addressError || !address) {
      return res.status(403).json({ error: 'Unauthorized sender address' });
    }

    // Send email
    await sendEmail({
      from,
      to,
      subject,
      text,
      html,
      attachments,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Get email thread
router.get('/thread/:threadId', async (req, res) => {
  try {
    const { data: emails, error } = await supabase
      .from('emails')
      .select('*')
      .or(`id.eq.${req.params.threadId},thread_id.eq.${req.params.threadId}`)
      .order('created_at', { ascending: true });

    if (error) throw error;

    res.json(emails);
  } catch (error) {
    console.error('Error fetching thread:', error);
    res.status(500).json({ error: 'Failed to fetch thread' });
  }
});

// Mark email as spam
router.post('/:id/spam', async (req, res) => {
  try {
    const { error } = await supabase
      .from('emails')
      .update({ is_spam: true })
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ success: true });
  } catch (error) {
    console.error('Error marking as spam:', error);
    res.status(500).json({ error: 'Failed to mark as spam' });
  }
});

export default router; 