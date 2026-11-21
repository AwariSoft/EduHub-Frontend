/* ZIP #11 — Payments: append to assets/js/main.js */
(() => {
  'use strict';
  const root = document.querySelector('.edu-payments');
  if (!root) return;
  const search = root.querySelector('#eduPaymentsSearch');
  const date = root.querySelector('#eduPaymentsDate');
  const status = root.querySelector('#eduPaymentsStatus');
  const count = root.querySelector('#eduPaymentsCount');
  const empty = root.querySelector('#eduPaymentsEmpty');
  const records = [...root.querySelectorAll('[data-payment-record]')];
  const applyFilters = () => {
    let visible = 0;
    records.forEach(record => {
      const match = record.dataset.paymentSearch.includes(search.value.trim().toLowerCase())
        && (!date.value || record.dataset.paymentDate === date.value)
        && (!status.value || record.dataset.paymentStatus === status.value);
      record.hidden = !match;
      if (match && record.tagName === 'TR') visible++;
    });
    empty.hidden = visible !== 0;
    count.textContent = visible ? `Showing 1–${visible} of 6 loaded sample records (1,048 total reported)` : 'Showing 0 of 6 loaded sample records (1,048 total reported)';
  };
  [search, date, status].forEach(control => control.addEventListener(control === search ? 'input' : 'change', applyFilters));
  root.querySelector('#eduPaymentsFilters').addEventListener('submit', event => event.preventDefault());
  root.querySelector('#eduPaymentsReset').addEventListener('click', () => {
    search.value = ''; date.value = ''; status.value = ''; applyFilters(); search.focus();
  });
  const modal = document.getElementById('eduPaymentRefundModal');
  let selected = null;
  modal.addEventListener('show.bs.modal', event => {
    const trigger = event.relatedTarget;
    selected = trigger?.dataset.paymentId === 'PAY-2026-1048' ? {
      id: trigger.dataset.paymentId,
      name: trigger.dataset.paymentName,
      amount: trigger.dataset.paymentAmount
    } : null;
    modal.querySelector('#eduPaymentRefundDescription').textContent = selected
      ? `Request a refund of $${selected.amount} for ${selected.name} (${selected.id})?`
      : 'This payment is not eligible for a refund request.';
    modal.querySelector('#eduPaymentRefundConfirm').disabled = !selected;
  });
  modal.querySelector('#eduPaymentRefundConfirm').addEventListener('click', () => {
    if (!selected) return;
    root.querySelector('#eduPaymentsFeedback').textContent = `Demo refund request prepared for ${selected.id}. No payment was refunded.`;
    document.dispatchEvent(new CustomEvent('eduhub:payment-refund-requested', {detail: {
      paymentId: selected.id, studentName: selected.name, amount: Number(selected.amount), currency: 'USD'
    }}));
  });
})();
