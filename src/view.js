import onChange from 'on-change';

const renderForm = (state, elements) => {
  elements.feedback.textContent = '';
  switch (state.form.status) {
    case 'inValid':
      elements.input.classList.add('is-invalid');
      elements.feedback.classList.remove('text-success');
      elements.feedback.classList.add('text-danger');
      elements.feedback.textContent = `It's not a URL`;
      break;
    case 'added':
      elements.feedback.classList.remove('text-danger');
      elements.feedback.classList.add('text-success');
      elements.input.classList.remove('is-invalid');
      elements.form.reset();
      elements.input.focus();
      break;
    default:
      break;
  }
};

const watchState = (state, elements) => {
  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'form.status':
        renderForm(watchedState, elements);
        break;
      default:
        break;
    }
    renderForm(watchedState, elements);
  });
  return watchedState;
};

export default watchState;