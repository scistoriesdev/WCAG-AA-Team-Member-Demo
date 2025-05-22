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
