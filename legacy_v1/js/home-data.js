/* ============================================================
   BizCatalyst — Home Page Real-Time Stats
   Fetches live stats from site_stats table
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  const statsContainer = document.querySelector('.hero-stats');
  if (!statsContainer) return;

  try {
    // Fetch stats from database
    const { data: stats, error } = await supabaseClient
      .from('site_stats')
      .select('*');

    if (error) throw error;

    if (stats && stats.length > 0) {
      renderStats(stats, statsContainer);
    }

    // Real-time subscription for live updates
    supabaseClient
      .channel('home-stats')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'site_stats'
      }, (payload) => {
        // Re-fetch and re-render on any change
        refreshStats(statsContainer);
      })
      .subscribe();

  } catch (err) {
    console.error('Failed to load stats:', err.message);
    // Stats will stay as the default HTML fallback
  }
});

function renderStats(stats, container) {
  // Map stat keys to display order
  const order = ['active_businesses', 'satisfaction_rate', 'powerful_modules', 'support_hours'];
  
  const sortedStats = order
    .map(key => stats.find(s => s.stat_key === key))
    .filter(Boolean);

  container.innerHTML = sortedStats.map(stat => `
    <div class="hero-stat">
      <div class="number">${stat.stat_value}${stat.stat_suffix}</div>
      <div class="label">${stat.stat_label}</div>
    </div>
  `).join('');

  // Add live indicator
  const liveIndicator = document.createElement('div');
  liveIndicator.className = 'live-indicator';
  liveIndicator.innerHTML = '<span class="live-dot"></span> Live Data';
  container.parentElement.appendChild(liveIndicator);
}

async function refreshStats(container) {
  try {
    const { data: stats, error } = await supabaseClient
      .from('site_stats')
      .select('*');
    
    if (!error && stats) {
      renderStats(stats, container);
    }
  } catch (err) {
    console.error('Failed to refresh stats:', err.message);
  }
}
