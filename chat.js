const KNOWLEDGE = [
  {
    keys: ["hour", "open", "close", "time", "when"],
    answer:
      "We are open Monday–Thursday 11:30 am–9:30 pm, Friday–Saturday 11:30 am–10:30 pm, and Sunday 10:00 am–9:00 pm. Sunday brunch runs until 2:00 pm. The kitchen closes 30 minutes before the door.",
  },
  {
    keys: ["where", "address", "location", "park", "map", "pearl"],
    answer:
      "Lumen Table is at 418 Solstice Avenue, Portland, OR 97209, in the Pearl District. Street parking and MAX are nearby.",
  },
  {
    keys: ["reserv", "book", "table", "party", "guest"],
    answer:
      "You can book online on the home page, or call the host at (503) 555-0148. Parties of 7 or more should call. We hold tables for 15 minutes past the reservation time.",
  },
  {
    keys: ["vegan", "vegetarian", "gluten", "allerg", "nut", "diet", "dairy"],
    answer:
      "Plenty of vegetarian plates, and most can go vegan (skip cheese or yogurt). Gluten-free pasta is available on request. Citrus crudo, orchard greens, ribeye, sea bass, and panna cotta are gluten-free as listed. Carrots, mafaldine, and pistachio cake contain nuts. Tell the host about allergies when you book.",
  },
  {
    keys: ["menu", "dish", "popular", "eat", "price", "pasta", "bass", "brunch"],
    answer:
      "Favorites include yuzu sea bass ($34), saffron ricotta mafaldine ($28), and orchard greens ($16). The full list is on the Menu page: starters, greens, wood-fire, sea, sweets, and drinks.",
  },
  {
    keys: ["phone", "call", "email", "contact", "host", "human", "person", "staff"],
    answer:
      "Talk with a person: call (503) 555-0148 or email host@lumentable.example. The floor team handles seating, allergies, and large parties.",
  },
];

const FALLBACK = `I am an AI helper for Lumen Table, and I do not have that answer. A person on the host team can help: call (503) 555-0148 or email host@lumentable.example.`;

function replyFor(text) {
  const q = text.toLowerCase();
  const hit = KNOWLEDGE.find((item) => item.keys.some((key) => q.includes(key)));
  return hit ? hit.answer : FALLBACK;
}

function mountChat() {
  const root = document.querySelector("#chat-root");
  if (!root) return;

  root.innerHTML = `
    <button class="chat-launcher" type="button" aria-expanded="false" aria-controls="lumen-chat" aria-label="Open AI chat support">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5V12a3.5 3.5 0 0 1-3.5 3.5H12l-4.2 3.2c-.7.53-1.8.03-1.8-.85V15.5A3.5 3.5 0 0 1 5 12V6.5Z" stroke="currentColor" stroke-width="1.7"/>
      </svg>
    </button>
    <section class="chat-panel" id="lumen-chat" hidden>
      <div class="chat-head">
        <h2>Lumen Guide</h2>
        <p>AI-powered · not a person on staff</p>
      </div>
      <div class="chat-log" role="log" aria-live="polite"></div>
      <p class="human-help">Need a person? Call <a href="tel:+15035550148">(503) 555-0148</a> or <a href="mailto:host@lumentable.example">email the host</a>.</p>
      <div class="chat-suggestions">
        <button type="button" data-q="What are your hours?">Hours</button>
        <button type="button" data-q="Where are you located?">Location</button>
        <button type="button" data-q="How do I book a table?">Reservations</button>
        <button type="button" data-q="Do you have gluten-free or vegan options?">Dietary</button>
      </div>
      <form class="chat-form">
        <label class="sr-only" for="chat-input">Message the AI guide</label>
        <input id="chat-input" name="message" autocomplete="off" placeholder="Ask about menu, hours, or booking" />
        <button class="btn btn-small" type="submit">Send</button>
      </form>
    </section>
  `;

  const launcher = root.querySelector(".chat-launcher");
  const panel = root.querySelector(".chat-panel");
  const log = root.querySelector(".chat-log");
  const form = root.querySelector(".chat-form");
  const input = root.querySelector("#chat-input");

  const addBubble = (text, who) => {
    const el = document.createElement("div");
    el.className = `bubble ${who}`;
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  };

  addBubble(
    "Hi — I am Lumen Guide, an AI helper. I can answer common questions about the menu, hours, location, reservations, and dietary options. For anything else, ask to speak with a person.",
    "bot"
  );

  const ask = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addBubble(trimmed, "user");
    addBubble(replyFor(trimmed), "bot");
  };

  launcher.addEventListener("click", () => {
    const open = panel.hasAttribute("hidden");
    panel.toggleAttribute("hidden", !open);
    launcher.setAttribute("aria-expanded", String(open));
    launcher.setAttribute("aria-label", open ? "Close AI chat support" : "Open AI chat support");
    if (open) input.focus();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    ask(input.value);
    input.value = "";
  });

  root.querySelectorAll("[data-q]").forEach((btn) => {
    btn.addEventListener("click", () => ask(btn.dataset.q));
  });
}

mountChat();
