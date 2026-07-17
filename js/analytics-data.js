/* ============================================================
   BizCatalyst — Analytics Data
   Fetches aggregate data and renders charts/metrics
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  const metricsContainer = document.getElementById('analyticsMetrics');
  const chartsContainer = document.getElementById('analyticsCharts');

  if (metricsContainer) await loadMetrics(metricsContainer);
  if (chartsContainer) await loadCharts(chartsContainer);

  // Real-time updates from all tables
  const tables = ['contacts', 'deals', 'campaigns', 'schedule_events'];
  tables.forEach(table => {
    supabaseClient
      .channel(`analytics-${table}`)
      .on('postgres_changes', {
        event: '*', schema: 'public', table
      }, () => {
        if (metricsContainer) loadMetrics(metricsContainer);
        if (chartsContainer) loadCharts(chartsContainer);
      })
      .subscribe();
  });
});

async function loadMetrics(container) {
  try {
    const [contactsRes, dealsRes, campaignsRes, eventsRes] = await Promise.all([
      supabaseClient.from('contacts').select('*'),
      supabaseClient.from('deals').select('*'),
      supabaseClient.from('campaigns').select('*'),
      supabaseClient.from('schedule_events').select('*'),
    ]);

    const contacts = contactsRes.data || [];
    const deals = dealsRes.data || [];
    const campaigns = campaignsRes.data || [];
    const events = eventsRes.data || [];

    const totalDealValue = deals.reduce((s, d) => s + parseFloat(d.value || 0), 0);
    const wonDeals = deals.filter(d => d.stage === 'won');
    const wonValue = wonDeals.reduce((s, d) => s + parseFloat(d.value || 0), 0);
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
    const totalLeads = campaigns.reduce((s, c) => s + (c.leads_generated || 0), 0);
    const conversionRate = contacts.length > 0
      ? ((contacts.filter(c => c.status === 'customer').length / contacts.length) * 100).toFixed(1)
      : 0;

    container.innerHTML = `
      <div class="metric-card metric-primary">
        <div class="metric-icon">👥</div>
        <div class="metric-value">${contacts.length}</div>
        <div class="metric-label">Total Contacts</div>
      </div>
      <div class="metric-card metric-success">
        <div class="metric-icon">💰</div>
        <div class="metric-value">${formatCurrency(totalDealValue)}</div>
        <div class="metric-label">Total Pipeline Value</div>
      </div>
      <div class="metric-card metric-warning">
        <div class="metric-icon">🎉</div>
        <div class="metric-value">${formatCurrency(wonValue)}</div>
        <div class="metric-label">Revenue Won</div>
      </div>
      <div class="metric-card metric-info">
        <div class="metric-icon">📊</div>
        <div class="metric-value">${activeCampaigns}</div>
        <div class="metric-label">Active Campaigns</div>
      </div>
      <div class="metric-card metric-accent">
        <div class="metric-icon">📅</div>
        <div class="metric-value">${upcomingEvents}</div>
        <div class="metric-label">Upcoming Events</div>
      </div>
      <div class="metric-card metric-secondary">
        <div class="metric-icon">🔄</div>
        <div class="metric-value">${conversionRate}%</div>
        <div class="metric-label">Conversion Rate</div>
      </div>
    `;
  } catch (err) {
    showError(container, 'Failed to load metrics.');
  }
}

async function loadCharts(container) {
  try {
    const [dealsRes, contactsRes, campaignsRes] = await Promise.all([
      supabaseClient.from('deals').select('*'),
      supabaseClient.from('contacts').select('*'),
      supabaseClient.from('campaigns').select('*'),
    ]);

    const deals = dealsRes.data || [];
    const contacts = contactsRes.data || [];
    const campaigns = campaignsRes.data || [];

    // Deal stages chart data
    const stages = ['prospecting', 'negotiation', 'won', 'lost'];
    const stageColors = {
      prospecting: '#0EA5E9',
      negotiation: '#F59E0B',
      won: '#10B981',
      lost: '#EF4444'
    };
    const maxDeals = Math.max(...stages.map(s => deals.filter(d => d.stage === s).length), 1);

    // Contact status chart data
    const statuses = ['lead', 'customer', 'churned'];
    const statusColors = { lead: '#0EA5E9', customer: '#10B981', churned: '#EF4444' };
    const maxContacts = Math.max(...statuses.map(s => contacts.filter(c => c.status === s).length), 1);

    // Campaign channel chart data
    const channels = ['email', 'social', 'sms', 'ads'];
    const channelColors = { email: '#4F46E5', social: '#7C3AED', sms: '#F59E0B', ads: '#0EA5E9' };
    const maxCampaigns = Math.max(...channels.map(ch => campaigns.filter(c => c.channel === ch).length), 1);

    container.innerHTML = `
      <div class="chart-card">
        <h4 class="chart-title">Deals by Stage</h4>
        <div class="bar-chart">
          ${stages.map(stage => {
            const count = deals.filter(d => d.stage === stage).length;
            const pct = (count / maxDeals) * 100;
            const value = deals.filter(d => d.stage === stage).reduce((s, d) => s + parseFloat(d.value || 0), 0);
            return `
              <div class="bar-row">
                <span class="bar-label">${stage.charAt(0).toUpperCase() + stage.slice(1)}</span>
                <div class="bar-track">
                  <div class="bar-fill" style="width: ${pct}%; background: ${stageColors[stage]}"></div>
                </div>
                <span class="bar-value">${count} (${formatCurrency(value)})</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="chart-card">
        <h4 class="chart-title">Contacts by Status</h4>
        <div class="bar-chart">
          ${statuses.map(status => {
            const count = contacts.filter(c => c.status === status).length;
            const pct = (count / maxContacts) * 100;
            return `
              <div class="bar-row">
                <span class="bar-label">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
                <div class="bar-track">
                  <div class="bar-fill" style="width: ${pct}%; background: ${statusColors[status]}"></div>
                </div>
                <span class="bar-value">${count}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="chart-card">
        <h4 class="chart-title">Campaigns by Channel</h4>
        <div class="bar-chart">
          ${channels.map(ch => {
            const count = campaigns.filter(c => c.channel === ch).length;
            const pct = (count / maxCampaigns) * 100;
            const leads = campaigns.filter(c => c.channel === ch).reduce((s, c) => s + (c.leads_generated || 0), 0);
            return `
              <div class="bar-row">
                <span class="bar-label">${ch.charAt(0).toUpperCase() + ch.slice(1)}</span>
                <div class="bar-track">
                  <div class="bar-fill" style="width: ${pct}%; background: ${channelColors[ch]}"></div>
                </div>
                <span class="bar-value">${count} (${leads} leads)</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="chart-card chart-card-wide">
        <h4 class="chart-title">Recent Deals Timeline</h4>
        <div class="timeline-mini">
          ${deals.slice(0, 6).map(d => `
            <div class="timeline-item-mini">
              <div class="timeline-dot-mini" style="background: ${stageColors[d.stage]}"></div>
              <div class="timeline-content-mini">
                <strong>${d.title}</strong>
                <span>${formatCurrency(d.value)} · ${getStatusBadge(d.stage)}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } catch (err) {
    showError(container, 'Failed to load charts.');
  }
}
