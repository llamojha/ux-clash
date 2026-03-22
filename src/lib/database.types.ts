// Generated placeholder — replace with `bun run db:types` once Supabase project is connected
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
      uxclash_challenges: {
        Row: {
          id: string
          title: string
          slug: string
          scenario: string
          objective: string
          constraints: string | null
          viewport: "mobile" | "desktop" | "both"
          type: "daily" | "weekly"
          template_html: string | null
          template_css: string | null
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          scenario: string
          objective: string
          constraints?: string | null
          viewport: "mobile" | "desktop" | "both"
          type: "daily" | "weekly"
          template_html?: string | null
          template_css?: string | null
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          scenario?: string
          objective?: string
          constraints?: string | null
          viewport?: "mobile" | "desktop" | "both"
          type?: "daily" | "weekly"
          template_html?: string | null
          template_css?: string | null
          active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      uxclash_submissions: {
        Row: {
          id: string
          user_id: string
          challenge_id: string
          html: string
          css: string
          ai_score: number | null
          social_score: number | null
          total_score: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          challenge_id: string
          html?: string
          css?: string
          ai_score?: number | null
          social_score?: number | null
          total_score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          challenge_id?: string
          html?: string
          css?: string
          ai_score?: number | null
          social_score?: number | null
          total_score?: number | null
          created_at?: string
        }
        Relationships: []
      }
      uxclash_likes: {
        Row: {
          id: string
          user_id: string
          submission_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          submission_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          submission_id?: string
          created_at?: string
        }
        Relationships: []
      }
      uxclash_ai_scores: {
        Row: {
          id: string
          submission_id: string
          clarity: number
          visual_hierarchy: number
          challenge_compliance: number
          usability: number
          accessibility: number
          visual_quality: number
          total: number
          strengths: Json
          weaknesses: Json
          suggestion: string | null
          created_at: string
        }
        Insert: {
          id?: string
          submission_id: string
          clarity: number
          visual_hierarchy: number
          challenge_compliance: number
          usability: number
          accessibility: number
          visual_quality: number
          total: number
          strengths?: Json
          weaknesses?: Json
          suggestion?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          submission_id?: string
          clarity?: number
          visual_hierarchy?: number
          challenge_compliance?: number
          usability?: number
          accessibility?: number
          visual_quality?: number
          total?: number
          strengths?: Json
          weaknesses?: Json
          suggestion?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
