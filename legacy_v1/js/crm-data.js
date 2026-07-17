/* ============================================================
   BizCatalyst — CRM Data (Contacts & Deals)
   Fetches and manages contacts and deals from Supabase
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  const contactsContainer = document.getElementById('contactsTable');
  const dealsContainer = document.getElementById('dealsGrid');
  const addContactForm = document.getElementById('addContactForm');

  if (contactsContainer) await loadContacts(contactsContainer);
  if (dealsContainer) await loadDeals(dealsContainer);

  // Add contact form handler
  if (addContactForm) {
    addContactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(addContactForm);
      const contact = {
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        company: formData.get('company'),
        phone: formData.get('phone'),
        status: formData.get('status') || 'lead',
      };

      const { error } = await supabaseClient.from('contacts').insert([contact]);

      if (error) {
        showToast('Failed to add contact: ' + error.message, 'error');
      } else {
        showToast('Contact added successfully!');
        addContactForm.reset();
      }
    });
  }

  // Real-time subscriptions
  supabaseClient
    .channel('crm-contacts')
    .on('postgres_changes', {
      event: '*', schema: 'public', table: 'contacts'
    }, () => {
      if (contactsContainer) loadContacts(contactsContainer);
    })
    .subscribe();

  supabaseClient
    .channel('crm-deals')
    .on('postgres_changes', {
      event: '*', schema: 'public', table: 'deals'
    }, () => {
      if (dealsContainer) loadDeals(dealsContainer);
    })
    .subscribe();
});

async function loadContacts(container) {
  showLoading(container);

  const { data: contacts, error } = await supabaseClient
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    showError(container, 'Failed to load contacts.');
    return;
  }

  if (!contacts || contacts.length === 0) {
    showEmpty(container, 'No contacts yet. Add your first contact above!');
    return;
  }

  container.innerHTML = `
    <div class="data-table-wrapper">
      <table class="data-table" id="contactsDataTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${contacts.map(c => `
            <tr>
              <td class="td-name">${c.full_name}</td>
              <td>${c.email}</td>
              <td>${c.company || '—'}</td>
              <td>${c.phone || '—'}</td>
              <td>${getStatusBadge(c.status)}</td>
              <td>${formatDate(c.created_at)}</td>
              <td>
                <button class="btn-icon" onclick="deleteContact(${c.id})" title="Delete">🗑️</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="table-footer">
      <span class="record-count">${contacts.length} contact${contacts.length !== 1 ? 's' : ''}</span>
    </div>
  `;
}

async function loadDeals(container) {
  showLoading(container);

  const { data: deals, error } = await supabaseClient
    .from('deals')
    .select('*, contacts(full_name)')
    .order('created_at', { ascending: false });

  if (error) {
    showError(container, 'Failed to load deals.');
    return;
  }

  if (!deals || deals.length === 0) {
    showEmpty(container, 'No deals yet.');
    return;
  }

  const stages = ['prospecting', 'negotiation', 'won', 'lost'];
  const stageIcons = {
    prospecting: '🔍',
    negotiation: '🤝',
    won: '🎉',
    lost: '❌'
  };

  container.innerHTML = stages.map(stage => {
    const stageDeals = deals.filter(d => d.stage === stage);
    const totalValue = stageDeals.reduce((sum, d) => sum + parseFloat(d.value || 0), 0);

    return `
      <div class="pipeline-column">
        <div class="pipeline-header">
          <span>${stageIcons[stage]} ${stage.charAt(0).toUpperCase() + stage.slice(1)}</span>
          <span class="pipeline-count">${stageDeals.length}</span>
        </div>
        <div class="pipeline-total">${formatCurrency(totalValue)}</div>
        <div class="pipeline-cards">
          ${stageDeals.length === 0 ? '<div class="pipeline-empty">No deals</div>' :
            stageDeals.map(d => `
              <div class="deal-card">
                <div class="deal-title">${d.title}</div>
                <div class="deal-value">${formatCurrency(d.value)}</div>
                <div class="deal-contact">${d.contacts?.full_name || 'Unknown'}</div>
                ${d.expected_close_date ? `<div class="deal-date">Close: ${formatDate(d.expected_close_date)}</div>` : ''}
              </div>
            `).join('')
          }
        </div>
      </div>
    `;
  }).join('');
}

async function deleteContact(id) {
  if (!confirm('Are you sure you want to delete this contact?')) return;

  const { error } = await supabaseClient
    .from('contacts')
    .delete()
    .eq('id', id);

  if (error) {
    showToast('Failed to delete contact: ' + error.message, 'error');
  } else {
    showToast('Contact deleted.');
  }
}
