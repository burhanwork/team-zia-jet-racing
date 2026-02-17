// ============================================
// TEAM ZIA JET RACING — Contact Form Validation
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: { el: form.querySelector('#name'), min: 2, message: 'Name must be at least 2 characters' },
    email: { el: form.querySelector('#email'), pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
    subject: { el: form.querySelector('#subject'), message: 'Please select a subject' },
    message: { el: form.querySelector('#message'), min: 10, message: 'Message must be at least 10 characters' }
  };

  const submitBtn = form.querySelector('button[type="submit"]');

  function showError(field, message) {
    clearError(field);
    const errorEl = document.createElement('p');
    errorEl.className = 'text-red-500 text-sm mt-1 field-error';
    errorEl.textContent = message;
    field.el.parentNode.appendChild(errorEl);
    field.el.classList.add('border-red-500');
    field.el.classList.remove('border-zia-steel');
  }

  function clearError(field) {
    const existing = field.el.parentNode.querySelector('.field-error');
    if (existing) existing.remove();
    field.el.classList.remove('border-red-500');
    field.el.classList.add('border-zia-steel');
  }

  function validateField(key) {
    const field = fields[key];
    const value = field.el.value.trim();

    if (!value) {
      showError(field, field.message);
      return false;
    }

    if (field.min && value.length < field.min) {
      showError(field, field.message);
      return false;
    }

    if (field.pattern && !field.pattern.test(value)) {
      showError(field, field.message);
      return false;
    }

    clearError(field);
    return true;
  }

  // Real-time validation on blur
  Object.keys(fields).forEach(key => {
    if (fields[key].el) {
      fields[key].el.addEventListener('blur', () => validateField(key));
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(fields).forEach(key => {
      if (!validateField(key)) isValid = false;
    });

    if (!isValid) return;

    // Success state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ MESSAGE SENT';
    submitBtn.classList.remove('bg-zia-red');
    submitBtn.classList.add('bg-green-600');
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.classList.add('bg-zia-red');
      submitBtn.classList.remove('bg-green-600');
      submitBtn.disabled = false;
    }, 3000);
  });
});
