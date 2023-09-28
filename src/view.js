import onChange from 'on-change';
import { renderForm, renderFeeds, renderPosts } from './render';

const watchState = (state, i18nextInstance, elements) => {
  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'form.status':
        renderForm(watchedState, i18nextInstance, elements);
        break;
      case 'feeds':
        renderFeeds(state, elements);
        break;
      case 'posts':
        renderPosts(state, i18nextInstance, elements);
        break;
      default:
        break;
    }
    renderForm(watchedState, i18nextInstance, elements);
  });
  return watchedState;
};

export default watchState;
