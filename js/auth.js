// Auth helpers for Supabase v2
// Requires window.sb (supabase client) created in js/supabaseClient.js

async function getSession() {
  if (!window.sb) return null;
  const { data } = await window.sb.auth.getSession();
  return data.session;
}

async function requireAuth(redirectTo = 'login.html') {
  const session = await getSession();
  if (!session) {
    window.location.href = redirectTo + `?redirect=${encodeURIComponent(location.pathname)}`;
  }
}

async function signUpWithEmailPassword(email, password) {
  if (!window.sb) throw new Error('Supabase not initialized');
  return window.sb.auth.signUp({ email, password });
}

async function signInWithEmailPassword(email, password) {
  if (!window.sb) throw new Error('Supabase not initialized');
  return window.sb.auth.signInWithPassword({ email, password });
}

async function signOut() {
  if (!window.sb) throw new Error('Supabase not initialized');
  return window.sb.auth.signOut();
}

async function updatePassword(newPassword) {
  if (!window.sb) throw new Error('Supabase not initialized');
  return window.sb.auth.updateUser({ password: newPassword });
}

async function deleteAccount() {
  // NOTE: Deleting a user normally requires service role via a server.
  // On client-side we can only sign the user out.
  // Optionally, you can request deletion via an edge function or server endpoint.
  alert('Suppression de compte nécessite un endpoint sécurisé côté serveur (service role).');
}

function setAuthNavVisibility(isLoggedIn) {
  const elLogin = document.getElementById('nav-login');
  const elRegister = document.getElementById('nav-register');
  const elAccount = document.getElementById('nav-account');
  const elLogout = document.getElementById('nav-logout');

  if (elLogin) elLogin.style.display = isLoggedIn ? 'none' : '';
  if (elRegister) elRegister.style.display = isLoggedIn ? 'none' : '';
  if (elAccount) elAccount.style.display = isLoggedIn ? '' : 'none';
  if (elLogout) elLogout.style.display = isLoggedIn ? '' : 'none';
}

async function initAuthNav() {
  const session = await getSession();
  setAuthNavVisibility(!!session);

  // Listen to auth changes
  if (window.sb) {
    window.sb.auth.onAuthStateChange((_event, session) => {
      setAuthNavVisibility(!!session);
    });
  }

  // Hook logout
  const elLogout = document.getElementById('nav-logout');
  if (elLogout) {
    elLogout.addEventListener('click', async (e) => {
      e.preventDefault();
      await signOut();
      // Redirect to login page after logout
      window.location.href = 'login.html';
    });
  }
}

window.AuthHelpers = {
  getSession,
  requireAuth,
  signUpWithEmailPassword,
  signInWithEmailPassword,
  signOut,
  updatePassword,
  deleteAccount,
  initAuthNav,
};
