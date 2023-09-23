import onChange from 'on-change';

const renderForm = (state, i18next, elements) => {
  elements.feedback.textContent = '';
  switch (state.form.status) {
    case 'inValid':
      elements.input.classList.add('is-invalid');
      elements.feedback.classList.remove('text-success');
      elements.feedback.classList.add('text-danger');
      elements.feedback.textContent = i18next.t(`errors.${state.error}`);
      break;
    case 'added':
      elements.feedback.classList.remove('text-danger');
      elements.feedback.classList.add('text-success');
      elements.input.classList.remove('is-invalid');
      elements.feedback.textContent = i18next.t('status.success');
      elements.form.reset();
      elements.input.focus();
      break;
    default:
      break;
  }
};

const watchState = (state, i18nextInstance, elements) => {
  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'form.status':
        renderForm(watchedState, i18nextInstance, elements);
        break;
      default:
        break;
    }
    renderForm(watchedState, i18nextInstance, elements);
  });
  return watchedState;
};

export default watchState;
