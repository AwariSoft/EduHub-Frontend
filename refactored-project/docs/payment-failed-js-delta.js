/* ZIP #14 / Payment Failed — optional integration hook. No payment is initiated locally. */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-edu-payment-retry]').forEach(link => {
    link.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('eduhub:payment-retry-requested', {
        detail: { course: 'Complete C# Programming', amount: 49, currency: 'USD' }
      }));
    });
  });
});
