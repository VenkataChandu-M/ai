/* ============================================================
   BizCatalyst — Schedule Data
   Fetches and manages calendar events from Supabase
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  const eventsContainer = document.getElementById('eventsTimeline');
  const addEventForm = document.getElementById('addEventForm');
  const summaryContainer = document.getElementById('scheduleSummary');

  if (summaryContainer) await loadScheduleSummary(summaryContainer);
  if (eventsContainer) await loadEvents(eventsContainer);

  // Add event form handler
  if (addEventForm) {
    addEventForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(addEventForm);
      const event = {
        title: formData.get('title'),
        event_date: formData.get('event_date'),
        event_time: formData.get('event_time') || '09:00',
        duration_min: parseInt(formData.get('duration_min')) || 30,
        attendees: formData.get('attendees'),
        location: formData.get('location'),
        status: 'upcoming',
      };

      const { error } = await supabaseClient.from('schedule_events').insert([event]);

      if (error) {
        showToast('Failed to create event: ' + error.message, 'error');
      } else {
        showToast('Event created successfully!');
        addEventForm.reset();
      }
    });
  }

  // Real-time subscription
  supabaseClient
    .channel('schedule-live')
    .on('postgres_changes', {
      event: '*', schema: 'public', table: 'schedule_events'
    }, () => {
      if (eventsContainer) loadEvents(eventsContainer);
      if (summaryContainer) loadScheduleSummary(summaryContainer);
    })
    .subscribe();
});

async function loadScheduleSummary(container) {
  const { data: events, error } = await supabaseClient
    .from('schedule_events')
    .select('*');

  if (error || !events) return;

  const upcoming = events.filter(e => e.status === 'upcoming').length;
  const completed = events.filter(e => e.status === 'completed').length;
  const today = new Date().toISOString().split('T')[0];
  const todayEvents = events.filter(e => e.event_date === today).length;
  const totalHours = events.reduce((s, e) => s + (e.duration_min || 0), 0) / 60;

  container.innerHTML = `
    <div class="metric-card">
      <div class="metric-icon">📅</div>
      <div class="metric-value">${upcoming}</div>
      <div class="metric-label">Upcoming</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon">📌</div>
      <div class="metric-value">${todayEvents}</div>
      <div class="metric-label">Today</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon">✅</div>
      <div class="metric-value">${completed}</div>
      <div class="metric-label">Completed</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon">⏱️</div>
      <div class="metric-value">${totalHours.toFixed(1)}h</div>
      <div class="metric-label">Total Hours</div>
    </div>
  `;
}

async function loadEvents(container) {
  showLoading(container);

  const { data: events, error } = await supabaseClient
    .from('schedule_events')
    .select('*')
    .order('event_date', { ascending: true })
    .order('event_time', { ascending: true });

  if (error) {
    showError(container, 'Failed to load events.');
    return;
  }

  if (!events || events.length === 0) {
    showEmpty(container, 'No events scheduled. Add your first event above!');
    return;
  }

  // Group events by date
  const grouped = {};
  events.forEach(e => {
    const dateKey = e.event_date;
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(e);
  });

  const today = new Date().toISOString().split('T')[0];

  container.innerHTML = Object.entries(grouped).map(([date, dayEvents]) => {
    const isToday = date === today;
    const isPast = date < today;
    const dateLabel = isToday ? 'Today' : formatDate(date);

    return `
      <div class="timeline-group ${isToday ? 'timeline-today' : ''} ${isPast ? 'timeline-past' : ''}">
        <div class="timeline-date">
          <span class="timeline-date-label">${dateLabel}</span>
          <span class="timeline-date-count">${dayEvents.length} event${dayEvents.length !== 1 ? 's' : ''}</span>
        </div>
        <div class="timeline-events">
          ${dayEvents.map(e => `
            <div class="event-card ${e.status === 'cancelled' ? 'event-cancelled' : ''} ${e.status === 'completed' ? 'event-completed' : ''}">
              <div class="event-time-badge">${formatTime(e.event_time)}</div>
              <div class="event-details">
                <h4 class="event-title">${e.title}</h4>
                <div class="event-meta">
                  ${e.duration_min ? `<span>⏱️ ${e.duration_min} min</span>` : ''}
                  ${e.location ? `<span>📍 ${e.location}</span>` : ''}
                  ${e.attendees ? `<span>👥 ${e.attendees}</span>` : ''}
                </div>
              </div>
              <div class="event-status">${getStatusBadge(e.status)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}
