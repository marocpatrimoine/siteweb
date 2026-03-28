/* ============================================
   MAROC PATRIMOINE - Lead Capture JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    initMultiStepForm();
    initExitIntent();
    initFormValidation();
});

/* ---------- Multi-Step Form ---------- */
let currentStep = 1;
const totalSteps = 3;

function initMultiStepForm() {
    const form = document.getElementById('leadForm');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Load saved form data
    loadFormData();
}

function nextStep() {
    const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');

    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--color-error)';
            input.addEventListener('input', function () {
                this.style.borderColor = '';
            }, { once: true });
        }
    });

    if (!isValid) {
        showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
        return;
    }

    // Save form data
    saveFormData();

    if (currentStep < totalSteps) {
        currentStep++;
        updateFormStep();

        // Update summary on step 3
        if (currentStep === 3) {
            updateSummary();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateFormStep();
    }
}

function updateFormStep() {
    // Update step indicators
    document.querySelectorAll('.form-step-indicator').forEach(indicator => {
        const step = parseInt(indicator.getAttribute('data-step'));
        indicator.classList.remove('active', 'completed');

        if (step === currentStep) {
            indicator.classList.add('active');
        } else if (step < currentStep) {
            indicator.classList.add('completed');
        }
    });

    // Update form steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });

    const activeStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (activeStep) {
        activeStep.classList.add('active');
    }
}

function updateSummary() {
    const summary = document.getElementById('summaryContent');
    if (!summary) return;

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const propertyType = document.getElementById('propertyType');
    const propertyTypeText = propertyType.options[propertyType.selectedIndex]?.text || '-';
    const location = document.getElementById('location').value;

    summary.innerHTML = `
    <div style="display: grid; gap: var(--space-sm);">
      <div style="display: flex; justify-content: space-between; padding: var(--space-xs) 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <span style="color: var(--color-gray);">Nom</span>
        <span style="color: var(--color-white);">${escapeHtml(fullName)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: var(--space-xs) 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <span style="color: var(--color-gray);">Email</span>
        <span style="color: var(--color-white);">${escapeHtml(email)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: var(--space-xs) 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <span style="color: var(--color-gray);">Téléphone</span>
        <span style="color: var(--color-white);">${escapeHtml(phone)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: var(--space-xs) 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <span style="color: var(--color-gray);">Type de bien</span>
        <span style="color: var(--color-white);">${escapeHtml(propertyTypeText)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: var(--space-xs) 0;">
        <span style="color: var(--color-gray);">Localisation</span>
        <span style="color: var(--color-white);">${escapeHtml(location)}</span>
      </div>
    </div>
  `;
}

function handleFormSubmit(e) {
    e.preventDefault();

    const consent = document.getElementById('consent');
    if (!consent.checked) {
        showNotification('Veuillez accepter les conditions pour continuer.', 'error');
        return;
    }

    // Collect form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        propertyType: document.getElementById('propertyType').value,
        location: document.getElementById('location').value,
        situation: document.getElementById('situation').value,
        timestamp: new Date().toISOString()
    };

    // Simulate form submission
    console.log('Form submitted:', formData);

    // Show success step
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });

    const successStep = document.querySelector('.form-step[data-step="success"]');
    if (successStep) {
        successStep.classList.add('active');
    }

    // Update all indicators to completed
    document.querySelectorAll('.form-step-indicator').forEach(indicator => {
        indicator.classList.remove('active');
        indicator.classList.add('completed');
    });

    // Clear saved form data
    localStorage.removeItem('marocPatrimoineFormData');

    // Track conversion (placeholder for analytics)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
            'event_category': 'Lead Form',
            'event_label': 'Contact Form Submission'
        });
    }
}

/* ---------- Form Persistence ---------- */
function saveFormData() {
    const formData = {
        fullName: document.getElementById('fullName')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        propertyType: document.getElementById('propertyType')?.value || '',
        location: document.getElementById('location')?.value || '',
        situation: document.getElementById('situation')?.value || '',
        currentStep: currentStep
    };

    localStorage.setItem('marocPatrimoineFormData', JSON.stringify(formData));
}

function loadFormData() {
    const saved = localStorage.getItem('marocPatrimoineFormData');

    if (saved) {
        try {
            const formData = JSON.parse(saved);

            if (document.getElementById('fullName')) {
                document.getElementById('fullName').value = formData.fullName || '';
            }
            if (document.getElementById('email')) {
                document.getElementById('email').value = formData.email || '';
            }
            if (document.getElementById('phone')) {
                document.getElementById('phone').value = formData.phone || '';
            }
            if (document.getElementById('propertyType')) {
                document.getElementById('propertyType').value = formData.propertyType || '';
            }
            if (document.getElementById('location')) {
                document.getElementById('location').value = formData.location || '';
            }
            if (document.getElementById('situation')) {
                document.getElementById('situation').value = formData.situation || '';
            }

            // Restore step if form was partially filled
            if (formData.currentStep && formData.currentStep > 1 && formData.fullName) {
                currentStep = formData.currentStep;
                updateFormStep();
            }
        } catch (e) {
            console.error('Error loading form data:', e);
        }
    }
}

/* ---------- Exit Intent Popup ---------- */
function initExitIntent() {
    const popup = document.getElementById('exitPopup');
    const popupForm = document.getElementById('popupForm');

    if (!popup) return;

    let hasShownPopup = sessionStorage.getItem('exitPopupShown');

    // Exit intent detection
    document.addEventListener('mouseout', function (e) {
        if (e.clientY < 10 && !hasShownPopup) {
            showPopup();
            hasShownPopup = true;
            sessionStorage.setItem('exitPopupShown', 'true');
        }
    });

    // Close popup on overlay click
    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Close popup on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });

    // Handle popup form submission
    if (popupForm) {
        popupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            console.log('Guide requested for:', email);

            // Show success message
            this.innerHTML = `
        <div style="text-align: center; padding: var(--space-md);">
          <div style="font-size: 2rem; margin-bottom: var(--space-sm);">✓</div>
          <p style="color: var(--color-white); margin: 0;">Guide envoyé ! Vérifiez votre email.</p>
        </div>
      `;

            // Close popup after delay
            setTimeout(closePopup, 2000);
        });
    }
}

function showPopup() {
    const popup = document.getElementById('exitPopup');
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePopup() {
    const popup = document.getElementById('exitPopup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Make closePopup available globally
window.closePopup = closePopup;

/* ---------- Form Validation ---------- */
function initFormValidation() {
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = 'var(--color-error)';
                showNotification('Veuillez entrer une adresse email valide.', 'error');
            } else {
                this.style.borderColor = '';
            }
        });
    });

    // Phone validation
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function () {
            // Allow only numbers, spaces, +, -, and parentheses
            this.value = this.value.replace(/[^\d\s+\-()]/g, '');
        });
    });
}

/* ---------- Utility Functions ---------- */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'error' ? 'var(--color-error)' : 'var(--color-accent)'};
    color: ${type === 'error' ? 'white' : 'var(--color-primary)'};
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    z-index: 9999;
    animation: slideIn 0.3s ease;
    max-width: 300px;
  `;
    notification.textContent = message;

    // Add animation keyframes
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove after delay
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Make step functions available globally
window.nextStep = nextStep;
window.prevStep = prevStep;
