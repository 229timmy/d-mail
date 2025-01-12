export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          username: string
          display_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
        }
      }
      email_addresses: {
        Row: {
          id: string
          created_at: string
          address: string
          user_id: string
          is_primary: boolean
          is_verified: boolean
          expires_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          address: string
          user_id: string
          is_primary?: boolean
          is_verified?: boolean
          expires_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          address?: string
          user_id?: string
          is_primary?: boolean
          is_verified?: boolean
          expires_at?: string | null
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
          headers: Json
          attachments: Json[]
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
          headers?: Json
          attachments?: Json[]
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
          headers?: Json
          attachments?: Json[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 