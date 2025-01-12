export interface Database {
  public: {
    Tables: {
      email_addresses: {
        Row: {
          id: string
          user_id: string
          address: string
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          address: string
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          address?: string
          is_primary?: boolean
          created_at?: string
        }
      }
      emails: {
        Row: {
          id: string
          created_at: string
          recipient_address: string
          sender_address: string
          subject: string
          body_html: string | null
          body_text: string | null
          read_at: string | null
          spam_score: number
          is_spam: boolean
          headers: any
          attachments: any[]
          thread_id?: string
        }
        Insert: {
          id?: string
          created_at?: string
          recipient_address: string
          sender_address: string
          subject: string
          body_html?: string | null
          body_text?: string | null
          read_at?: string | null
          spam_score?: number
          is_spam?: boolean
          headers?: any
          attachments?: any[]
          thread_id?: string
        }
        Update: {
          id?: string
          created_at?: string
          recipient_address?: string
          sender_address?: string
          subject?: string
          body_html?: string | null
          body_text?: string | null
          read_at?: string | null
          spam_score?: number
          is_spam?: boolean
          headers?: any
          attachments?: any[]
          thread_id?: string
        }
      }
    }
  }
} 