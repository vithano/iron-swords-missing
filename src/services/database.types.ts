export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      people: {
        Row: {
          contact_name: string | null;
          contact_phone: string | null;
          details: string | null;
          first_name: string | null;
          id: string | null;
          image: string | null;
          last_name: string | null;
          last_seen: string | null;
          notes: string | null;
          source: string | null;
          status: string | null;
        };
        Insert: {
          contact_name?: string | null;
          contact_phone?: string | null;
          details?: string | null;
          first_name?: string | null;
          id?: string | null;
          image?: string | null;
          last_name?: string | null;
          last_seen?: string | null;
          notes?: string | null;
          source?: string | null;
          status?: string | null;
        };
        Update: {
          contact_name?: string | null;
          contact_phone?: string | null;
          details?: string | null;
          first_name?: string | null;
          id?: string | null;
          image?: string | null;
          last_name?: string | null;
          last_seen?: string | null;
          notes?: string | null;
          source?: string | null;
          status?: string | null;
        };
        Relationships: [];
      };
      "people-old-10-10-23": {
        Row: {
          contact_name: string | null;
          contact_phone: string | null;
          details: string | null;
          first_name: string | null;
          id: string;
          image: string | null;
          last_name: string | null;
          last_seen: string | null;
          notes: string | null;
          status: string | null;
        };
        Insert: {
          contact_name?: string | null;
          contact_phone?: string | null;
          details?: string | null;
          first_name?: string | null;
          id: string;
          image?: string | null;
          last_name?: string | null;
          last_seen?: string | null;
          notes?: string | null;
          status?: string | null;
        };
        Update: {
          contact_name?: string | null;
          contact_phone?: string | null;
          details?: string | null;
          first_name?: string | null;
          id?: string;
          image?: string | null;
          last_name?: string | null;
          last_seen?: string | null;
          notes?: string | null;
          status?: string | null;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          email: string;
          notify_id: string;
          last_notified_date: string | null;
        };
        Insert: {
          email: string;
          notify_id: string;
          last_notified_date?: string | null;
        };
        Update: {
          email?: string;
          notify_id?: string;
          last_notified_date?: string;
        };
        Delete: {
          email?: string;
          notify_id?: string;
        };
        Relationships: [];
      };
      blacklist_emails: {
        Row: {
          email: string;
        };
        Insert: {
          email: string;
        };
        Update: {
          email: string;
        };
        Delete: {
          email: string;
        };
        Relationships: [];
      };
      emails_sent: {
        Row: {
          email: string;
          last_sent_date: string;
          type: string;
        };
        Insert: {
          email: string;
          last_sent_date: string;
          type: string;
        };
        Update: {
          email: string;
          last_sent_date: string;
          type: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
