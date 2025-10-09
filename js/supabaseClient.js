// Supabase client initialization
// Fill in your Supabase URL and anon key below.
// IMPORTANT: Never expose the service role key in client-side code.

window.SUPABASE_CONFIG = {
  url: "https://xcawojxvtxdcnwkhywmn.supabase.co", // e.g. https://your-project.supabase.co
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjYXdvanh2dHhkY253a2h5d21uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MTI1MzMsImV4cCI6MjA3MjI4ODUzM30.gF46vM9cKso-hDKZODrqDwZOAhQGjPlHqPhBn9si9EI" // e.g. eyJhbGciOiJIUzI1NiIsInR...
};

(function initSupabase() {
  if (!window.SUPABASE_CONFIG || !window.SUPABASE_CONFIG.url || !window.SUPABASE_CONFIG.anonKey) {
    console.warn("Supabase config is missing. Set window.SUPABASE_CONFIG.url and anonKey in js/supabaseClient.js");
    return;
  }
  if (!window.supabase) {
    console.error("Supabase JS not loaded. Include @supabase/supabase-js v2 via CDN before this file.");
    return;
  }
  const { createClient } = window.supabase;
  window.sb = createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
})();
