/* ==========================================================================
   CRUSOURCE LANDING PAGE INTERACTIVE SCRIPT (CRO & FAB TRIGGER ENHANCED)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Smart Navigation Bar (Hides on Scroll Down, Shows on Scroll Up)
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add shadow when scrolled
    if (currentScrollY > 20) {
      navbar.style.boxShadow = '0 10px 30px rgba(43, 32, 26, 0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    // Scroll Direction Check (Hide down, Show up)
    if (currentScrollY > 120) {
      if (currentScrollY > lastScrollY) {
        // Scrolling Down -> Hide Navbar
        navbar.classList.add('navbar--hidden');
      } else {
        // Scrolling Up -> Show Navbar
        navbar.classList.remove('navbar--hidden');
      }
    } else {
      navbar.classList.remove('navbar--hidden');
    }

    lastScrollY = currentScrollY;
  });

  // 2. Mobile Menu Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }

  // 3. Hero Email Waitlist Submission
  const waitlistForm = document.getElementById('hero-waitlist-form');
  const heroEmail = document.getElementById('hero-email');

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = heroEmail ? heroEmail.value.trim() : '';
      if (email) {
        showToast(`🎉 Success! ${email} has been added to Crusource VIP Waitlist.`);
        waitlistForm.reset();
      }
    });
  }

  // 4. Interactive Pricing Monthly / Annual Toggle Switcher
  const pricingToggle = document.getElementById('pricing-toggle');
  const priceStandard = document.getElementById('price-standard');
  const priceEnterprise = document.getElementById('price-enterprise');
  const billingMonthlyLabel = document.getElementById('billing-monthly');
  const billingAnnualLabel = document.getElementById('billing-annual');

  if (pricingToggle && priceStandard && priceEnterprise) {
    pricingToggle.addEventListener('change', () => {
      if (pricingToggle.checked) {
        // Annual Billing (20% Savings)
        priceStandard.textContent = '39';
        priceEnterprise.textContent = '79';
        if (billingMonthlyLabel) billingMonthlyLabel.classList.remove('active');
        if (billingAnnualLabel) billingAnnualLabel.classList.add('active');
        showToast('🏷️ 20% Discount applied for Annual Billing!');
      } else {
        // Monthly Billing
        priceStandard.textContent = '49';
        priceEnterprise.textContent = '99';
        if (billingMonthlyLabel) billingMonthlyLabel.classList.add('active');
        if (billingAnnualLabel) billingAnnualLabel.classList.remove('active');
      }
    });
  }

  // 5. Timed Lead CRO Pop-up Modal & Subtle Bottom-Left FAB Trigger
  const conversionModal = document.getElementById('conversion-modal');
  const conversionClose = document.getElementById('conversion-close');
  const conversionForm = document.getElementById('conversion-modal-form');
  const btnTriggerPopup = document.getElementById('btn-trigger-popup');

  if (!sessionStorage.getItem('crusource_popup_seen')) {
    setTimeout(() => {
      openConversionModal();
    }, 7000);
  }

  function openConversionModal() {
    if (conversionModal) {
      conversionModal.classList.add('active');
      sessionStorage.setItem('crusource_popup_seen', 'true');
    }
  }

  if (btnTriggerPopup) {
    btnTriggerPopup.addEventListener('click', (e) => {
      e.preventDefault();
      openConversionModal();
    });
  }

  if (conversionClose) {
    conversionClose.addEventListener('click', () => {
      if (conversionModal) conversionModal.classList.remove('active');
    });
  }

  if (conversionForm) {
    conversionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const popupEmail = document.getElementById('popup-email');
      const email = popupEmail ? popupEmail.value.trim() : '';
      showToast(`✨ Priority access & workforce audit sent to ${email}`);
      if (conversionModal) conversionModal.classList.remove('active');
      conversionForm.reset();
    });
  }

  // 6. Demo Modal Lightbox Trigger Logic
  const demoModal = document.getElementById('demo-modal');
  const modalClose = document.getElementById('modal-close');
  const demoForm = document.getElementById('demo-modal-form');

  const demoButtons = [
    document.getElementById('btn-demo-top'),
    document.getElementById('btn-demo-hero'),
    document.getElementById('btn-cta-demo'),
    document.getElementById('btn-cta-team'),
    document.getElementById('btn-waitlist-top')
  ];

  demoButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    }
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        closeModal();
      }
    });
  }

  function openModal() {
    if (demoModal) {
      demoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (demoModal) {
      demoModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('🚀 Demo Request Received! Our product team will contact you shortly.');
      closeModal();
      demoForm.reset();
    });
  }

  // 7. FAB Version Switcher Menu
  const fabTrigger = document.getElementById('fab-trigger');
  const fabContainer = document.getElementById('fab-container');

  if (fabTrigger && fabContainer) {
    fabTrigger.addEventListener('click', () => {
      fabContainer.classList.toggle('active');
    });
  }

  const iterationItems = document.querySelectorAll('.iteration-item');
  iterationItems.forEach(item => {
    item.addEventListener('click', () => {
      const version = item.dataset.version;
      if (version === '1') {
        showToast('Active: Iteration 1 (Hero & Full Product Suite)');
      } else {
        showToast(`Iteration ${version} design is coming soon!`);
      }
    });
  });

  // 8. FAQ Accordion Interactive Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(el => {
          el.classList.remove('active');
          const icon = el.querySelector('.faq-icon');
          if (icon) {
            icon.className = 'fa-solid fa-plus faq-icon';
          }
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          const icon = item.querySelector('.faq-icon');
          if (icon) {
            icon.className = 'fa-solid fa-minus faq-icon';
          }
        }
      });
    }
  });

  // 9. Footer Newsletter Form Submission
  const footerNewsletterForm = document.getElementById('footer-newsletter-form');
  if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = footerNewsletterForm.querySelector('input[type="email"]');
      const email = input ? input.value.trim() : '';
      if (email) {
        showToast(`💌 Thanks for subscribing! Updates sent to ${email}`);
        footerNewsletterForm.reset();
      }
    });
  }

  // 10. Toast Notification Utility
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-info text-orange"></i> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
});
