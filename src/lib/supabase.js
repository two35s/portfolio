import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbblnjbdzazaxfkuufit.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiYmxuamJkemF6YXhma3V1Zml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDMyNDQsImV4cCI6MjA4ODkxOTI0NH0.7sPzbn_-vIzypb2lFVSjuq2wtvkb8tTFUJeBdbcLKiI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const parseTechnologies = (tech) => {
  if (Array.isArray(tech)) return tech;
  if (!tech || typeof tech !== 'string') return [];
  // Parse Postgres array literal: {Design,Branding,"Adobe XD"}
  const inner = tech.replace(/^\{|\}$/g, '');
  if (!inner) return [];
  const result = [];
  let current = '';
  let inQuotes = false;
  for (const char of inner) {
    if (char === '"') { inQuotes = !inQuotes; continue; }
    if (char === ',' && !inQuotes) { result.push(current); current = ''; continue; }
    current += char;
  }
  if (current) result.push(current);
  return result;
};
