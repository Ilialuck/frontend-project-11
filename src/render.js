const renderForm = (state, i18next, elements) => {
  elements.feedback.textContent = '';
  switch (state.form.status) {
    case 'inValid':
      elements.button.disabled = false;
      elements.input.classList.add('is-invalid');
      elements.feedback.classList.remove('text-success');
      elements.feedback.classList.add('text-danger');
      elements.feedback.textContent = i18next.t(`errors.${state.error}`);
      break;
    case 'sending':
      elements.button.disabled = true;
      elements.input.classList.remove('is-invalid');
      elements.feedback.classList.remove('text-danger');
      elements.feedback.textContent = i18next.t('status.sending');
      elements.feedback.classList.add('text-success');
      elements.input.focus();
      break;
    case 'added':
      elements.button.disabled = false;
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
const renderFeeds = (state, i18next, elements) => {
  const divContainer = document.createElement('div');
  const divTitle = document.createElement('div');
  const ul = document.createElement('ul');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18next.t('parts.feeds');
  divContainer.classList.add('card', 'border-0');
  divTitle.classList.add('card-body');
  divTitle.append(h2);
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  divContainer.append(divTitle, ul);

  state.feeds.forEach((feed) => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const h3 = document.createElement('h3');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    h3.classList.add('h6', 'm-0');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = feed.description;
    li.prepend(p);
    li.prepend(h3);
    h3.textContent = feed.title;
    ul.prepend(li);
  });

  elements.feedsContainer.replaceChildren(divContainer);
};

const createBtn = (post, i18next) => {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('data-id', post.id);
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#modal');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  button.textContent = i18next.t('buttons.view');
  return button;
};

const renderPosts = (state, i18next, elements) => {
  const divContainer = document.createElement('div');
  const divTitle = document.createElement('div');
  const ul = document.createElement('ul');
  const h2 = document.createElement('h2');

  divContainer.classList.add('card', 'border-0');
  divTitle.classList.add('card-body');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  divContainer.append(divTitle, ul);
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18next.t('parts.posts');
  divTitle.append(h2);

  state.posts.forEach((post) => {
    const li = document.createElement('li');
    const buttonEl = createBtn(post, i18next);
    const a = document.createElement('a');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0',
    );
    a.setAttribute('href', post.link);
    a.setAttribute('data-id', post.id);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    if (state.uiState.viewedPostIds.has(post.id)) {
      a.classList.add('fw-normal');
      a.classList.add('link-secondary');
    } else {
      a.classList.add('fw-bold');
    }
    a.textContent = post.title;
    li.append(a);
    li.append(buttonEl);
    ul.append(li);
  });

  elements.postsContainer.replaceChildren(divContainer);
};

const renderInModal = (state, elements) => {
  const viewedPostID = state.uiState.currentPostId;
  const viewedPost = state.posts.find((post) => post.id === viewedPostID);
  const modalTitleEl = elements.modalHeader.querySelector('.modal-title');
  modalTitleEl.textContent = viewedPost.title;
  elements.modalBody.textContent = viewedPost.description;
  elements.modalHref.setAttribute('href', viewedPost.link);
};

export {
  renderForm, renderFeeds, renderPosts, renderInModal,
};
