/* ============================================================
   BizCatalyst — Local LLM & RAG Engine
   Runs completely client-side in the browser using Transformers.js
   No API keys, free, and unlimited
   ============================================================ */

import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

// Set environment configs to use cache only once downloaded
env.allowLocalModels = false;

let generator = null;
let modelName = 'Xenova/Qwen1.5-0.5B-Chat'; // Default ultralight model suitable for quick browser execution
let isLoaded = false;

document.addEventListener('DOMContentLoaded', () => {
  initWidgetUI();
  setupRAG();
});

// UI Toggles & Handlers
function initWidgetUI() {
  const toggleBtn = document.getElementById('aiToggle');
  const chatWindow = document.getElementById('aiChatWindow');
  const closeBtn = document.getElementById('aiClose');
  const form = document.getElementById('aiInputForm');
  const input = document.getElementById('aiInput');
  const modelSelect = document.getElementById('modelSelect');

  if (!toggleBtn || !chatWindow) return;

  toggleBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open') && !isLoaded) {
      loadLocalLLM();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', () => chatWindow.classList.remove('open'));

  if (modelSelect) {
    modelSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      if (selected === 'xenova-gpt2') {
        modelName = 'Xenova/gpt2';
      } else {
        modelName = 'Xenova/Qwen1.5-0.5B-Chat';
      }
      isLoaded = false;
      loadLocalLLM();
    });
  }

  // Handle suggestion pill clicks
  document.querySelectorAll('.suggestion-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      if (input) {
        input.value = pill.dataset.query;
        input.focus();
      }
    });
  });
}

// Load model locally in browser
async function loadLocalLLM() {
  const statusText = document.getElementById('aiStatus');
  const progressDiv = document.getElementById('modelLoadingProgress');
  const percentText = document.getElementById('progressPercent');
  const progressBar = document.getElementById('loadProgressBar');

  if (statusText) statusText.textContent = 'Loading local model...';
  if (progressDiv) progressDiv.style.display = 'block';

  try {
    generator = await pipeline('text-generation', modelName, {
      progress_callback: (data) => {
        if (data.status === 'progress') {
          const progress = Math.round(data.progress);
          if (percentText) percentText.textContent = `${progress}%`;
          if (progressBar) progressBar.style.width = `${progress}%`;
        }
      }
    });

    isLoaded = true;
    if (statusText) statusText.textContent = 'Local model ready';
    if (progressDiv) progressDiv.style.display = 'none';
    appendSystemMessage('System: Local model fully loaded in memory! You can query now.');
  } catch (err) {
    console.error(err);
    if (statusText) statusText.textContent = 'Failed to load local model';
    appendSystemMessage('System Error: Unable to load model. Check GPU compatibility.');
  }
}

// RAG Engine Query Router
async function setupRAG() {
  const form = document.getElementById('aiInputForm');
  const input = document.getElementById('aiInput');

  if (!form || !input) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    appendMessage(query, 'user');
    input.value = '';

    // Step 1: Query database (RAG Retrieval step)
    appendSystemMessage('Retrieving matching data from Supabase...');
    const context = await retrieveContext(query);

    // Step 2: Feed context + query into local LLM
    if (!generator) {
      appendSystemMessage('Local model is not loaded yet. Waiting for load...');
      await loadLocalLLM();
    }

    appendSystemMessage('Analyzing with local LLM...');
    const response = await generateLLMResponse(query, context);
    appendMessage(response, 'assistant');
  });
}

// Simple text matching query router to fetch Supabase DB context
async function retrieveContext(query) {
  const lowerQuery = query.toLowerCase();
  let dbContext = '';

  try {
    if (lowerQuery.includes('contact') || lowerQuery.includes('customer') || lowerQuery.includes('lead')) {
      const { data } = await supabaseClient.from('contacts').select('*');
      if (data && data.length > 0) {
        dbContext += 'Contacts Table:\n' + data.map(c => `- ${c.full_name} (${c.email}) at ${c.company || 'N/A'}, status: ${c.status}`).join('\n') + '\n\n';
      }
    }

    if (lowerQuery.includes('deal') || lowerQuery.includes('won') || lowerQuery.includes('lost') || lowerQuery.includes('sale') || lowerQuery.includes('pipeline')) {
      const { data } = await supabaseClient.from('deals').select('*, contacts(full_name)');
      if (data && data.length > 0) {
        dbContext += 'Deals Pipeline Table:\n' + data.map(d => `- ${d.title}: Value ${d.value}, Stage: ${d.stage}, Contact: ${d.contacts?.full_name || 'N/A'}`).join('\n') + '\n\n';
      }
    }

    if (lowerQuery.includes('campaign') || lowerQuery.includes('marketing') || lowerQuery.includes('budget') || lowerQuery.includes('spent')) {
      const { data } = await supabaseClient.from('campaigns').select('*');
      if (data && data.length > 0) {
        dbContext += 'Campaigns Table:\n' + data.map(c => `- ${c.name}: Budget ${c.budget}, Spent ${c.spent}, Leads: ${c.leads_generated}, Status: ${c.status}`).join('\n') + '\n\n';
      }
    }

    if (lowerQuery.includes('event') || lowerQuery.includes('schedule') || lowerQuery.includes('calendar') || lowerQuery.includes('meeting')) {
      const { data } = await supabaseClient.from('schedule_events').select('*');
      if (data && data.length > 0) {
        dbContext += 'Events Schedule Table:\n' + data.map(e => `- ${e.title} on ${e.event_date} at ${e.event_time}. Location: ${e.location}, Attendees: ${e.attendees}`).join('\n') + '\n\n';
      }
    }
  } catch (err) {
    console.error('Retrieval error:', err);
    dbContext = 'Failed to fetch real-time database context.\n';
  }

  return dbContext || 'No matching database records found for this query.\n';
}

// Generate response locally using loaded model
async function generateLLMResponse(query, context) {
  if (!generator) return 'Local LLM not initialized.';

  const prompt = `<|im_start|>system\nYou are a helpful business assistant. Use the following context from the database to answer the user's question. If the context is not enough, tell the user. Keep answers brief.\n\nContext:\n${context}<|im_end|>\n<|im_start|>user\n${query}<|im_end|>\n<|im_start|>assistant\n`;

  try {
    const output = await generator(prompt, {
      max_new_tokens: 150,
      temperature: 0.7,
      repetition_penalty: 1.1,
    });

    let generatedText = output[0].generated_text;
    // Extract assistant response after assistant token
    const parts = generatedText.split('<|im_start|>assistant\n');
    return parts[parts.length - 1] || generatedText;
  } catch (err) {
    console.error(err);
    return 'Error generating response from local LLM.';
  }
}

// UI helper: Append user or assistant message to chat
function appendMessage(text, sender) {
  const container = document.getElementById('aiMessages');
  if (!container) return;

  const msg = document.createElement('div');
  msg.className = `ai-message ${sender}`;
  msg.textContent = text;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

// UI helper: Append status or system update
function appendSystemMessage(text) {
  const container = document.getElementById('aiMessages');
  if (!container) return;

  const msg = document.createElement('div');
  msg.className = 'ai-message system-info';
  msg.textContent = text;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}
