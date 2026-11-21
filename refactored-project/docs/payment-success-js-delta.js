/* ZIP #13/14: Payment Success — no transaction is initiated by this static demo. */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-edu-payment-success-action]').forEach(link => {
    link.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('eduhub:payment-success-navigation', {
        detail: { action: link.dataset.eduPaymentSuccessAction, paymentId: 'PAY-2026-1048' }
      }));
    });
  });
});
