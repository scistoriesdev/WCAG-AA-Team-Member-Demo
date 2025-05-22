# Accessible Bio Modal Demo

This project demonstrates how to build a WCAG 2.1 AA-compliant modal window for team member bios.

## Features

- Triggered by mouse or keyboard (`Enter`/`Space`)
- Proper ARIA roles (`role="dialog"`, `aria-modal`, etc.)
- Esc key to close modal
- Focus trap inside modal
- Compliant with WCAG 2.1 AA (SC 1.4.13, 2.1.1)

## Demo

Host this on GitHub Pages to test accessibility in the browser.

## Usage

1. Clone or download this repo.
2. Open `index.html` in a browser or deploy to GitHub Pages.

---

## 🧩 Accessibility: WCAG 2.1 AA Compliance Details

### Key WCAG 2.1 AA Requirements for Mouseover/Tooltip-Like Content

Under **Success Criterion 1.4.13: Content on Hover or Focus**, interactive content that appears on hover/focus must:

- **Dismissible** – Users must be able to dismiss it without moving the pointer (e.g. Esc key)
- **Hoverable** – Users must be able to move the pointer over it without it vanishing
- **Persistent** – It must stay visible until dismissed, focus is moved, or another event occurs

Additionally, per **2.1.1 Keyboard**, all functionality must be keyboard-accessible.

### 🛠️ Making a Bio Modal WCAG-Compliant

If your bio popup only shows on mouseover, it's **not compliant**. Here's how to fix it:

#### 1️⃣ Trigger Must Be Focusable
Use a focusable element like a button or link:
```html
<button class="team-member" aria-haspopup="dialog" aria-controls="bio-modal-1">John Doe</button>
```

#### 2️⃣ Open on Focus or Click
Allow the modal to open via:
- `:focus` (tabbing)
- `Enter` or `Space` on the trigger
- *(Optional)* mouse hover

#### 3️⃣ Close with Escape
Let users close the modal with Esc and include a visible close button:
```js
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
```

#### 4️⃣ Trap Focus Within Modal
Ensure keyboard users stay inside the modal while it's open (ARIA best practice).

#### 5️⃣ Use ARIA Roles Properly
Define the modal semantically for assistive tech:
```html
<div id="bio-modal-1" role="dialog" aria-modal="true" aria-labelledby="bio-title-1">
  <h2 id="bio-title-1">About John Doe</h2>
  ...
</div>
```

---

### ⚠️ Avoid These Anti-Patterns

- Mouseover-only tooltips
- Content that disappears on blur or pointer movement
- Modals that can't be dismissed with keyboard

---

### ✅ Summary: WCAG AA-Compliant Bio Modals

| Feature                | Compliant? |
|------------------------|------------|
| Mouseover only         | ❌         |
| Mouseover + keyboard   | ✅         |
| Focusable triggers     | ✅         |
| Esc to close           | ✅         |
| Persistent content     | ✅         |

More info: [W3C WCAG 2.1 - Content on Hover or Focus](https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus)

## ❌ Common Accessibility Anti-Patterns – Hover/Tooltip/Modal Interactions

| Anti-Pattern Description                         | Compliant | Why It’s a Problem                                                     |
|--------------------------------------------------|-----------|------------------------------------------------------------------------|
| Mouseover-only interaction                       | ❌        | Excludes keyboard and screen reader users                             |
| Disappears on hover-out                          | ❌        | Violates hoverability & persistence (SC 1.4.13)                        |
| Tooltip/modal closes on blur                     | ❌        | Prevents interacting with content; breaks user flow                   |
| No Esc key support                               | ❌        | Users can’t dismiss modal via keyboard (SC 2.1.1, SC 1.4.13)          |
| Trigger is a non-focusable element (`<div>`)     | ❌        | Not keyboard accessible; fails 2.1.1 unless `tabindex` is added       |
| Tooltip only appears via CSS `:hover`            | ❌        | Can’t be triggered with keyboard or announced to assistive tech       |
| ARIA role `dialog` missing or misused            | ❌        | Screen readers don’t recognize the modal properly                     |
| Tooltip/modal lacks `aria-label` or `aria-labelledby`| ❌    | No accessible name; fails SC 4.1.2                                     |
| No focus trap in modal                           | ❌        | Users can tab out of modal unintentionally                            |
| Focus not returned to trigger after close        | ❌        | Breaks logical navigation, confuses screen reader and keyboard users  |
| Close button is missing or not focusable         | ❌        | Users cannot easily dismiss with assistive technologies               |
| Tooltip/modal uses `display: none` without handling focus | ❌ | Screen readers lose access to hidden content without a fallback       |
| Dismisses after short timeout (auto-close)       | ❌        | Doesn’t give users time to interact, especially with screen readers   |
| Tooltip/modal content is not keyboard navigable  | ❌        | Fails SC 2.1.1, 2.4.3, and breaks tab flow                             |
| Dynamic content isn’t announced to screen readers| ❌        | Fails SC 4.1.3; no live region or focus shift                         |
| Tooltip overlays important content               | ❌        | Causes readability or interaction issues                              |
| Nested modals without clear exit paths           | ❌        | Users get trapped or lost in modal layers                             |
| Inconsistent keyboard vs. mouse behavior         | ❌        | Violates operable principle of POUR; frustrates users                 |
| Uses tooltips for essential instructions         | ❌        | Tooltips should be supplemental, not the sole source of info          |
| Relies on animations that users can't disable    | ❌        | May violate SC 2.3.3 if motion triggers vestibular issues             |

---

### ✅ Reminder: Compliant Tooltip/Modal Behaviors

- Focusable triggers  
- Opens with focus, Enter, or Space  
- Persistent until user dismisses  
- Close via Esc and visible button  
- Focus is trapped inside modal  
- Proper ARIA roles (`role="dialog"`, `aria-modal="true"`)  
- Screen reader announcements  
- Works for both mouse and keyboard users  

---

**Tip:** Always test with only a keyboard (Tab, Shift+Tab, Enter, Esc) and a screen reader (e.g., NVDA, VoiceOver) to validate compliance.
