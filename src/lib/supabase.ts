import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from './supabasePublicConfig'

// Intentar primero con variables de entorno; usar fallback si no están disponibles
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || SUPABASE_PUBLISHABLE_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey)

// Solo crear cliente si hay configuración disponible
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null
