import * as yup from 'yup';
import watchState from './view';

const app = () => {
  const elements = {
    form: document.querySelector('form'),
    input: document.querySelector('#url-input'),
    button: document.querySelector('button[type="submit"]'),
    feedback: document.querySelector('.feedback'),
  };

  const state = {
    form: {
      status: 'filling',
    },
    feeds: [],
    error: [],
  };

  const watchedState = watchState(state, elements);

  const validateURL = (links, input) => {
    const schema = yup.object().shape({
      url: yup.string().url().required().notOneOf(links),
    });
    return schema
      .validate({ url: input })
      .then(() => null)
      .catch((error) => error.message);
  };

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const links = watchedState.feeds.map((feed) => feed.link);
    const formData = new FormData(event.target);
    const input = formData.get('url');

    validateURL(links, input)
      .then((error) => {
        if (error) {
          watchedState.error = error.key;
          watchedState.form.status = 'inValid';
        } else {
          watchedState.form.status = 'added';
        }
      });
  });
};

export default app;
