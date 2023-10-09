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
      people: {
        Row: {
          contact_name: string | null
          contact_phone: string | null
          details: string | null
          first_name: string | null
          id: string
          image: string | null
          last_name: string | null
          last_seen: string | null
          notes: string | null
          status: string | null
        }
        Insert: {
          contact_name?: string | null
          contact_phone?: string | null
          details?: string | null
          first_name?: string | null
          id: string
          image?: string | null
          last_name?: string | null
          last_seen?: string | null
          notes?: string | null
          status?: string | null
        }
        Update: {
          contact_name?: string | null
          contact_phone?: string | null
          details?: string | null
          first_name?: string | null
          id?: string
          image?: string | null
          last_name?: string | null
          last_seen?: string | null
          notes?: string | null
          status?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
