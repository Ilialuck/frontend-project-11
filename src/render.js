const renderForm = (state, i18next, elements) => {
  elements.feedback.textContent = '';
  switch (state.form.status) {
    case 'inValid':
      elements.input.classList.add('is-invalid');
      elements.feedback.classList.remove('text-success');
      elements.feedback.classList.add('text-danger');
      elements.feedback.textContent = i18next.t(`errors.${state.error}`);
      break;
    case 'sending':
      elements.input.classList.remove('is-invalid');
      elements.feedback.classList.remove('text-danger');
      elements.feedback.textContent = i18next.t('status.sending');
      elements.feedback.classList.add('text-success');
      elements.input.focus();
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
const renderFeeds = (state, elements) => {
  elements.feedsContainer.innerHTML = '';
  const divContainer = document.createElement('div');
  const divTitle = document.createElement('div');
  const ul = document.createElement('ul');
  const h2 = document.createElement('h2');

  h2.classList.add('card-title', 'h4');
  h2.textContent = 'Фиды';
  divContainer.classList.add('card', 'border-0');
  divTitle.classList.add('card-body');
  divTitle.append(h2);
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  divContainer.append(divTitle, ul);
  elements.feedsContainer.append(divContainer);

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
};

const renderPosts = (state, i18next, elements) => {
  elements.postsContainer.innerHTML = '';
  const divContainer = document.createElement('div');
  const divTitle = document.createElement('div');
  const ul = document.createElement('ul');
  const h2 = document.createElement('h2');

  divContainer.classList.add('card', 'border-0');
  divTitle.classList.add('card-body');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  divContainer.append(divTitle, ul);
  h2.classList.add('card-title', 'h4');
  h2.textContent = 'Посты';
  divTitle.append(h2);
  elements.postsContainer.append(divContainer);

  state.posts.forEach((post) => {
    const li = document.createElement('li');
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
    ul.append(li);
  });
};

export { renderForm, renderFeeds, renderPosts };
