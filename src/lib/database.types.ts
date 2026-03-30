export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      deploysim_completions: {
        Row: {
          completed_at: string | null
          id: string
          name: string
          scenario_id: string
          score: number
        }
        Insert: {
          completed_at?: string | null
          id?: string
          name: string
          scenario_id: string
          score: number
        }
        Update: {
          completed_at?: string | null
          id?: string
          name?: string
          scenario_id?: string
          score?: number
        }
        Relationships: []
      }
      leaderboard_entries: {
        Row: {
          clean_approvals: number
          created_at: string
          days_played: number
          display_name: string
          id: string
          mode: string
          score: number | null
          true_positives: number
        }
        Insert: {
          clean_approvals?: number
          created_at?: string
          days_played?: number
          display_name: string
          id?: string
          mode?: string
          score?: number | null
          true_positives?: number
        }
        Update: {
          clean_approvals?: number
          created_at?: string
          days_played?: number
          display_name?: string
          id?: string
          mode?: string
          score?: number | null
          true_positives?: number
        }
        Relationships: []
      }
      uxclash_ai_scores: {
        Row: {
          accessibility: number
          challenge_compliance: number
          clarity: number
          created_at: string
          id: string
          strengths: Json
          submission_id: string
          suggestion: string | null
          total: number
          usability: number
          visual_hierarchy: number
          visual_quality: number
          weaknesses: Json
        }
        Insert: {
          accessibility: number
          challenge_compliance: number
          clarity: number
          created_at?: string
          id?: string
          strengths?: Json
          submission_id: string
          suggestion?: string | null
          total: number
          usability: number
          visual_hierarchy: number
          visual_quality: number
          weaknesses?: Json
        }
        Update: {
          accessibility?: number
          challenge_compliance?: number
          clarity?: number
          created_at?: string
          id?: string
          strengths?: Json
          submission_id?: string
          suggestion?: string | null
          total?: number
          usability?: number
          visual_hierarchy?: number
          visual_quality?: number
          weaknesses?: Json
        }
        Relationships: [
          {
            foreignKeyName: "uxclash_ai_scores_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "uxclash_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      uxclash_challenges: {
        Row: {
          active: boolean
          constraints: string | null
          created_at: string
          ends_at: string | null
          id: string
          objective: string
          scenario: string
          slug: string
          starts_at: string | null
          template_css: string | null
          template_html: string | null
          title: string
          type: string
          viewport: string
        }
        Insert: {
          active?: boolean
          constraints?: string | null
          created_at?: string
          ends_at?: string | null
          id?: string
          objective: string
          scenario: string
          slug: string
          starts_at?: string | null
          template_css?: string | null
          template_html?: string | null
          title: string
          type: string
          viewport: string
        }
        Update: {
          active?: boolean
          constraints?: string | null
          created_at?: string
          ends_at?: string | null
          id?: string
          objective?: string
          scenario?: string
          slug?: string
          starts_at?: string | null
          template_css?: string | null
          template_html?: string | null
          title?: string
          type?: string
          viewport?: string
        }
        Relationships: []
      }
      uxclash_likes: {
        Row: {
          created_at: string
          id: string
          submission_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          submission_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          submission_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "uxclash_likes_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "uxclash_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      uxclash_submissions: {
        Row: {
          ai_completed_at: string | null
          ai_error: string | null
          ai_model: string | null
          ai_provider: string | null
          ai_score: number | null
          ai_started_at: string | null
          ai_status: string
          avatar_url: string | null
          challenge_id: string
          created_at: string
          css: string
          html: string
          id: string
          social_score: number | null
          total_score: number | null
          user_id: string
          username: string | null
        }
        Insert: {
          ai_completed_at?: string | null
          ai_error?: string | null
          ai_model?: string | null
          ai_provider?: string | null
          ai_score?: number | null
          ai_started_at?: string | null
          ai_status?: string
          avatar_url?: string | null
          challenge_id: string
          created_at?: string
          css?: string
          html?: string
          id?: string
          social_score?: number | null
          total_score?: number | null
          user_id: string
          username?: string | null
        }
        Update: {
          ai_completed_at?: string | null
          ai_error?: string | null
          ai_model?: string | null
          ai_provider?: string | null
          ai_score?: number | null
          ai_started_at?: string | null
          ai_status?: string
          avatar_url?: string | null
          challenge_id?: string
          created_at?: string
          css?: string
          html?: string
          id?: string
          social_score?: number | null
          total_score?: number | null
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "uxclash_submissions_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "uxclash_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      waypoint_billing_events: {
        Row: {
          event_type: string
          id: string
          processed_at: string
          stripe_event_id: string
        }
        Insert: {
          event_type: string
          id?: string
          processed_at?: string
          stripe_event_id: string
        }
        Update: {
          event_type?: string
          id?: string
          processed_at?: string
          stripe_event_id?: string
        }
        Relationships: []
      }
      waypoint_character_achievements: {
        Row: {
          achievement_id: string
          character_id: string
          id: string
          unlocked_at: string | null
        }
        Insert: {
          achievement_id: string
          character_id: string
          id?: string
          unlocked_at?: string | null
        }
        Update: {
          achievement_id?: string
          character_id?: string
          id?: string
          unlocked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "waypoint_character_achievements_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "waypoint_characters"
            referencedColumns: ["id"]
          },
        ]
      }
      waypoint_character_locations: {
        Row: {
          character_id: string
          discovered_at: string | null
          id: string
          location_id: string
          status: string | null
        }
        Insert: {
          character_id: string
          discovered_at?: string | null
          id?: string
          location_id: string
          status?: string | null
        }
        Update: {
          character_id?: string
          discovered_at?: string | null
          id?: string
          location_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "waypoint_character_locations_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "waypoint_characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waypoint_character_locations_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "waypoint_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      waypoint_character_news_read: {
        Row: {
          character_id: string
          news_id: string
          read_at: string | null
        }
        Insert: {
          character_id: string
          news_id: string
          read_at?: string | null
        }
        Update: {
          character_id?: string
          news_id?: string
          read_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "waypoint_character_news_read_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "waypoint_characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waypoint_character_news_read_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "waypoint_world_news"
            referencedColumns: ["id"]
          },
        ]
      }
      waypoint_character_npcs: {
        Row: {
          character_id: string
          history: Json | null
          id: string
          notes: Json | null
          npc_id: string
          relationship: number | null
        }
        Insert: {
          character_id: string
          history?: Json | null
          id?: string
          notes?: Json | null
          npc_id: string
          relationship?: number | null
        }
        Update: {
          character_id?: string
          history?: Json | null
          id?: string
          notes?: Json | null
          npc_id?: string
          relationship?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "waypoint_character_npcs_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "waypoint_characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waypoint_character_npcs_npc_id_fkey"
            columns: ["npc_id"]
            isOneToOne: false
            referencedRelation: "waypoint_npcs"
            referencedColumns: ["id"]
          },
        ]
      }
      waypoint_character_quests: {
        Row: {
          character_id: string
          id: string
          progress: number | null
          quest_id: string
          status: string | null
        }
        Insert: {
          character_id: string
          id?: string
          progress?: number | null
          quest_id: string
          status?: string | null
        }
        Update: {
          character_id?: string
          id?: string
          progress?: number | null
          quest_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "waypoint_character_quests_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "waypoint_characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waypoint_character_quests_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "waypoint_quests"
            referencedColumns: ["id"]
          },
        ]
      }
      waypoint_characters: {
        Row: {
          conditions: Json | null
          created_at: string | null
          equipment: Json | null
          gender: string | null
          gold: number | null
          hp: number | null
          id: string
          inventory: Json | null
          is_magic_unlocked: boolean | null
          max_hp: number | null
          name: string
          portrait_url: string | null
          skills: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          conditions?: Json | null
          created_at?: string | null
          equipment?: Json | null
          gender?: string | null
          gold?: number | null
          hp?: number | null
          id?: string
          inventory?: Json | null
          is_magic_unlocked?: boolean | null
          max_hp?: number | null
          name: string
          portrait_url?: string | null
          skills?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          conditions?: Json | null
          created_at?: string | null
          equipment?: Json | null
          gender?: string | null
          gold?: number | null
          hp?: number | null
          id?: string
          inventory?: Json | null
          is_magic_unlocked?: boolean | null
          max_hp?: number | null
          name?: string
          portrait_url?: string | null
          skills?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      waypoint_codex_entries: {
        Row: {
          category: string
          created_at: string | null
          discovered_by: string | null
          id: string
          image_url: string | null
          status: string | null
          tags: Json | null
          text: string | null
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          discovered_by?: string | null
          id?: string
          image_url?: string | null
          status?: string | null
          tags?: Json | null
          text?: string | null
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          discovered_by?: string | null
          id?: string
          image_url?: string | null
          status?: string | null
          tags?: Json | null
          text?: string | null
          title?: string
        }
        Relationships: []
      }
      waypoint_credit_ledger: {
        Row: {
          bucket: string
          created_at: string
          delta: number
          id: string
          idempotency_key: string
          source: string
          turn_id: string | null
          user_id: string
        }
        Insert: {
          bucket?: string
          created_at?: string
          delta: number
          id?: string
          idempotency_key: string
          source: string
          turn_id?: string | null
          user_id: string
        }
        Update: {
          bucket?: string
          created_at?: string
          delta?: number
          id?: string
          idempotency_key?: string
          source?: string
          turn_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "waypoint_credit_ledger_turn_id_fkey"
            columns: ["turn_id"]
            isOneToOne: false
            referencedRelation: "waypoint_turns"
            referencedColumns: ["id"]
          },
        ]
      }
      waypoint_location_summaries: {
        Row: {
          character_id: string
          created_at: string | null
          id: string
          items_gained: Json | null
          items_lost: Json | null
          key_events: Json | null
          location: string
          npcs_encountered: Json | null
          quest_progress: Json | null
          summary: string
          turn_range_end: number
          turn_range_start: number
          visit_number: number | null
        }
        Insert: {
          character_id: string
          created_at?: string | null
          id?: string
          items_gained?: Json | null
          items_lost?: Json | null
          key_events?: Json | null
          location: string
          npcs_encountered?: Json | null
          quest_progress?: Json | null
          summary: string
          turn_range_end: number
          turn_range_start: number
          visit_number?: number | null
        }
        Update: {
          character_id?: string
          created_at?: string | null
          id?: string
          items_gained?: Json | null
          items_lost?: Json | null
          key_events?: Json | null
          location?: string
          npcs_encountered?: Json | null
          quest_progress?: Json | null
          summary?: string
          turn_range_end?: number
          turn_range_start?: number
          visit_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "waypoint_location_summaries_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "waypoint_characters"
            referencedColumns: ["id"]
          },
        ]
      }
      waypoint_locations: {
        Row: {
          art_url: string | null
          coordinates: Json | null
          created_at: string | null
          description: string | null
          discovered_by: string | null
          id: string
          is_preseeded: boolean | null
          name: string
          nearby_poi: Json | null
          region: string | null
          type: string | null
        }
        Insert: {
          art_url?: string | null
          coordinates?: Json | null
          created_at?: string | null
          description?: string | null
          discovered_by?: string | null
          id?: string
          is_preseeded?: boolean | null
          name: string
          nearby_poi?: Json | null
          region?: string | null
          type?: string | null
        }
        Update: {
          art_url?: string | null
          coordinates?: Json | null
          created_at?: string | null
          description?: string | null
          discovered_by?: string | null
          id?: string
          is_preseeded?: boolean | null
          name?: string
          nearby_poi?: Json | null
          region?: string | null
          type?: string | null
        }
        Relationships: []
      }
      waypoint_npcs: {
        Row: {
          created_at: string | null
          dialogue_hints: Json | null
          discovered_by: string | null
          faction: string | null
          id: string
          is_preseeded: boolean | null
          location: string | null
          name: string
          personality: Json | null
          portrait_url: string | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          dialogue_hints?: Json | null
          discovered_by?: string | null
          faction?: string | null
          id?: string
          is_preseeded?: boolean | null
          location?: string | null
          name: string
          personality?: Json | null
          portrait_url?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          dialogue_hints?: Json | null
          discovered_by?: string | null
          faction?: string | null
          id?: string
          is_preseeded?: boolean | null
          location?: string | null
          name?: string
          personality?: Json | null
          portrait_url?: string | null
          role?: string | null
        }
        Relationships: []
      }
      waypoint_quests: {
        Row: {
          created_at: string | null
          description: string | null
          giver_npc: string | null
          id: string
          is_preseeded: boolean | null
          leads: Json | null
          rewards: Json | null
          steps: Json | null
          title: string
          total_progress: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          giver_npc?: string | null
          id?: string
          is_preseeded?: boolean | null
          leads?: Json | null
          rewards?: Json | null
          steps?: Json | null
          title: string
          total_progress?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          giver_npc?: string | null
          id?: string
          is_preseeded?: boolean | null
          leads?: Json | null
          rewards?: Json | null
          steps?: Json | null
          title?: string
          total_progress?: number | null
        }
        Relationships: []
      }
      waypoint_rules_location_connections: {
        Row: {
          created_at: string | null
          from_location: string
          id: string
          requirements: Json | null
          to_location: string
          travel_time: number | null
        }
        Insert: {
          created_at?: string | null
          from_location: string
          id?: string
          requirements?: Json | null
          to_location: string
          travel_time?: number | null
        }
        Update: {
          created_at?: string | null
          from_location?: string
          id?: string
          requirements?: Json | null
          to_location?: string
          travel_time?: number | null
        }
        Relationships: []
      }
      waypoint_rules_loot_tables: {
        Row: {
          action_whitelist: Json | null
          created_at: string | null
          id: string
          item_pool: Json
          location_type: string
          rarity_weights: Json | null
        }
        Insert: {
          action_whitelist?: Json | null
          created_at?: string | null
          id?: string
          item_pool: Json
          location_type: string
          rarity_weights?: Json | null
        }
        Update: {
          action_whitelist?: Json | null
          created_at?: string | null
          id?: string
          item_pool?: Json
          location_type?: string
          rarity_weights?: Json | null
        }
        Relationships: []
      }
      waypoint_rules_no_roll_actions: {
        Row: {
          created_at: string | null
          id: string
          pattern: string
          reason: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          pattern: string
          reason?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          pattern?: string
          reason?: string | null
        }
        Relationships: []
      }
      waypoint_rules_quest_goals: {
        Row: {
          created_at: string | null
          goal_type: string
          id: string
          required_event_type: string
          validation_pattern: Json | null
        }
        Insert: {
          created_at?: string | null
          goal_type: string
          id?: string
          required_event_type: string
          validation_pattern?: Json | null
        }
        Update: {
          created_at?: string | null
          goal_type?: string
          id?: string
          required_event_type?: string
          validation_pattern?: Json | null
        }
        Relationships: []
      }
      waypoint_rules_relationships: {
        Row: {
          created_at: string | null
          delta_max: number
          delta_min: number
          id: string
          interaction_type: string
          keywords: Json | null
        }
        Insert: {
          created_at?: string | null
          delta_max: number
          delta_min: number
          id?: string
          interaction_type: string
          keywords?: Json | null
        }
        Update: {
          created_at?: string | null
          delta_max?: number
          delta_min?: number
          id?: string
          interaction_type?: string
          keywords?: Json | null
        }
        Relationships: []
      }
      waypoint_rules_skill_checks: {
        Row: {
          context_modifiers: Json | null
          created_at: string | null
          dc_max: number
          dc_min: number
          id: string
          pattern: string
          requires_roll: boolean | null
          skill: string
        }
        Insert: {
          context_modifiers?: Json | null
          created_at?: string | null
          dc_max: number
          dc_min: number
          id?: string
          pattern: string
          requires_roll?: boolean | null
          skill: string
        }
        Update: {
          context_modifiers?: Json | null
          created_at?: string | null
          dc_max?: number
          dc_min?: number
          id?: string
          pattern?: string
          requires_roll?: boolean | null
          skill?: string
        }
        Relationships: []
      }
      waypoint_sessions: {
        Row: {
          character_id: string
          ended_at: string | null
          id: string
          location: string | null
          started_at: string | null
          status: string | null
          summary: string | null
          title: string | null
        }
        Insert: {
          character_id: string
          ended_at?: string | null
          id?: string
          location?: string | null
          started_at?: string | null
          status?: string | null
          summary?: string | null
          title?: string | null
        }
        Update: {
          character_id?: string
          ended_at?: string | null
          id?: string
          location?: string | null
          started_at?: string | null
          status?: string | null
          summary?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "waypoint_sessions_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "waypoint_characters"
            referencedColumns: ["id"]
          },
        ]
      }
      waypoint_subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          included_credits_monthly: number
          included_credits_remaining: number
          purchased_credits_remaining: number
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          included_credits_monthly?: number
          included_credits_remaining?: number
          purchased_credits_remaining?: number
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          included_credits_monthly?: number
          included_credits_remaining?: number
          purchased_credits_remaining?: number
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      waypoint_turns: {
        Row: {
          character_id: string
          created_at: string | null
          diffs: Json | null
          id: string
          mechanics: Json | null
          narration: string | null
          player_action: string
          suggested_actions: Json | null
        }
        Insert: {
          character_id: string
          created_at?: string | null
          diffs?: Json | null
          id?: string
          mechanics?: Json | null
          narration?: string | null
          player_action: string
          suggested_actions?: Json | null
        }
        Update: {
          character_id?: string
          created_at?: string | null
          diffs?: Json | null
          id?: string
          mechanics?: Json | null
          narration?: string | null
          player_action?: string
          suggested_actions?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "waypoint_turns_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "waypoint_characters"
            referencedColumns: ["id"]
          },
        ]
      }
      waypoint_user_profiles: {
        Row: {
          created_at: string | null
          credits: number
          tier: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          credits?: number
          tier?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          credits?: number
          tier?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      waypoint_weather_schedule: {
        Row: {
          created_at: string | null
          date: string
          id: string
          region: string
          weather: string
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          region?: string
          weather: string
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          region?: string
          weather?: string
        }
        Relationships: []
      }
      waypoint_world_news: {
        Row: {
          created_at: string | null
          id: string
          news_type: string | null
          related_entity_id: string | null
          related_entity_type: string | null
          status: string | null
          text: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          news_type?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          status?: string | null
          text?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          id?: string
          news_type?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          status?: string | null
          text?: string | null
          title?: string
        }
        Relationships: []
      }
      waypoint_world_state: {
        Row: {
          active_combat: Json | null
          character_id: string
          description: string | null
          entities: Json | null
          id: string
          memories: Json | null
          nearby_poi: Json | null
          poi: string | null
          region: string | null
          tags: Json | null
          time_day: number | null
          time_phase: string | null
          updated_at: string | null
          weather: string | null
        }
        Insert: {
          active_combat?: Json | null
          character_id: string
          description?: string | null
          entities?: Json | null
          id?: string
          memories?: Json | null
          nearby_poi?: Json | null
          poi?: string | null
          region?: string | null
          tags?: Json | null
          time_day?: number | null
          time_phase?: string | null
          updated_at?: string | null
          weather?: string | null
        }
        Update: {
          active_combat?: Json | null
          character_id?: string
          description?: string | null
          entities?: Json | null
          id?: string
          memories?: Json | null
          nearby_poi?: Json | null
          poi?: string | null
          region?: string | null
          tags?: Json | null
          time_day?: number | null
          time_phase?: string | null
          updated_at?: string | null
          weather?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "waypoint_world_state_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: true
            referencedRelation: "waypoint_characters"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      grant_purchased_credits: {
        Args: {
          p_checkout_session_id: string
          p_credits: number
          p_user_id: string
        }
        Returns: number
      }
      seed_sample_ideas_for_user: {
        Args: { target_user_id: string }
        Returns: undefined
      }
      spend_turn_credit: {
        Args: { p_turn_id: string; p_user_id: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
