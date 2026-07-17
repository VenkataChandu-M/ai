/* ============================================================
   BizCatalyst — Supabase Configuration
   Replace the placeholder values with your actual Supabase credentials
   ============================================================ */

const SUPABASE_URL = 'https://ahlshopsxldliojxojcn.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_X3pTWH8VMZVo8oZhizszvQ_O9MdcC1B';

// Initialize the Supabase client
// The global `supabase` object is available from the CDN script
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ---------- Helper Functions ---------- */

// Show a loading spinner inside a container
function showLoading(container) {
  container.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading data...</p>
    </div>
  `;
}

// Show an empty state message
function showEmpty(container, message = 'No data found.') {
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">📭</div>
      <p>${message}</p>
    </div>
  `;
}

// Show an error message
function showError(container, message = 'Failed to load data.') {
  container.innerHTML = `
    <div class="empty-state error-state">
      <div class="empty-state-icon">⚠️</div>
      <p>${message}</p>
      <p class="error-hint">Check your Supabase credentials in <code>js/supabase-config.js</code></p>
    </div>
  `;
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date
function formatDate(dateStr) {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-US', options);
}

// Format time
function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(':');
  const h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

// Get status badge HTML
function getStatusBadge(status) {
  const colors = {
    lead: 'badge-info',
    customer: 'badge-success',
    churned: 'badge-danger',
    prospecting: 'badge-info',
    negotiation: 'badge-warning',
    won: 'badge-success',
    lost: 'badge-danger',
    active: 'badge-success',
    paused: 'badge-warning',
    completed: 'badge-info',
    upcoming: 'badge-info',
    cancelled: 'badge-danger',
  };
  const cls = colors[status] || 'badge-info';
  return `<span class="status-badge ${cls}">${status}</span>`;
}

// Show toast notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => toast.classList.add('show'));
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
