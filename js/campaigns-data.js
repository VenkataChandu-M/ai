/* ============================================================
   BizCatalyst — Campaigns Data
   Fetches and manages campaigns from Supabase
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  const campaignsContainer = document.getElementById('campaignsGrid');
  const addCampaignForm = document.getElementById('addCampaignForm');
  const summaryContainer = document.getElementById('campaignsSummary');

  if (summaryContainer) await loadCampaignSummary(summaryContainer);
  if (campaignsContainer) await loadCampaigns(campaignsContainer);

  // Add campaign form handler
  if (addCampaignForm) {
    addCampaignForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(addCampaignForm);
      const campaign = {
        name: formData.get('name'),
        channel: formData.get('channel') || 'email',
        budget: parseFloat(formData.get('budget')) || 0,
        spent: 0,
        leads_generated: 0,
        status: 'active',
        start_date: formData.get('start_date') || new Date().toISOString().split('T')[0],
      };

      const { error } = await supabaseClient.from('campaigns').insert([campaign]);

      if (error) {
        showToast('Failed to create campaign: ' + error.message, 'error');
      } else {
        showToast('Campaign created successfully!');
        addCampaignForm.reset();
      }
    });
  }

  // Real-time subscription
  supabaseClient
    .channel('campaigns-live')
    .on('postgres_changes', {
      event: '*', schema: 'public', table: 'campaigns'
    }, () => {
      if (campaignsContainer) loadCampaigns(campaignsContainer);
      if (summaryContainer) loadCampaignSummary(summaryContainer);
    })
    .subscribe();
});

async function loadCampaignSummary(container) {
  const { data: campaigns, error } = await supabaseClient
    .from('campaigns')
    .select('*');

  if (error || !campaigns) return;

  const totalBudget = campaigns.reduce((s, c) => s + parseFloat(c.budget || 0), 0);
  const totalSpent = campaigns.reduce((s, c) => s + parseFloat(c.spent || 0), 0);
  const totalLeads = campaigns.reduce((s, c) => s + (c.leads_generated || 0), 0);
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;

  container.innerHTML = `
    <div class="metric-card">
      <div class="metric-icon">📊</div>
      <div class="metric-value">${campaigns.length}</div>
      <div class="metric-label">Total Campaigns</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon">🟢</div>
      <div class="metric-value">${activeCampaigns}</div>
      <div class="metric-label">Active</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon">💰</div>
      <div class="metric-value">${formatCurrency(totalBudget)}</div>
      <div class="metric-label">Total Budget</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon">👥</div>
      <div class="metric-value">${totalLeads}</div>
      <div class="metric-label">Leads Generated</div>
    </div>
  `;
}

async function loadCampaigns(container) {
  showLoading(container);

  const { data: campaigns, error } = await supabaseClient
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    showError(container, 'Failed to load campaigns.');
    return;
  }

  if (!campaigns || campaigns.length === 0) {
    showEmpty(container, 'No campaigns yet. Create your first campaign above!');
    return;
  }

  container.innerHTML = campaigns.map(c => {
    const progress = c.budget > 0 ? Math.min((c.spent / c.budget) * 100, 100) : 0;
    const channelIcons = { email: '📧', social: '📱', sms: '💬', ads: '📢' };

    return `
      <div class="campaign-card">
        <div class="campaign-header">
          <span class="campaign-channel">${channelIcons[c.channel] || '📧'} ${c.channel}</span>
          ${getStatusBadge(c.status)}
        </div>
        <h4 class="campaign-title">${c.name}</h4>
        <div class="campaign-stats">
          <div class="campaign-stat">
            <span class="stat-label">Budget</span>
            <span class="stat-value">${formatCurrency(c.budget)}</span>
          </div>
          <div class="campaign-stat">
            <span class="stat-label">Spent</span>
            <span class="stat-value">${formatCurrency(c.spent)}</span>
          </div>
          <div class="campaign-stat">
            <span class="stat-label">Leads</span>
            <span class="stat-value">${c.leads_generated}</span>
          </div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
        <div class="progress-label">${progress.toFixed(0)}% budget used</div>
        <div class="campaign-date">Started: ${formatDate(c.start_date)}</div>
      </div>
    `;
  }).join('');
}
