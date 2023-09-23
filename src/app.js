import * as yup from 'yup';
import i18next from 'i18next';
import watchState from './view';
import defaultMessage from './locales/defaultMessage';
import resources from './locales/index';

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
    error: null,
  };

  yup.setLocale(defaultMessage);

  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  }).then(() => {
    const watchedState = watchState(state, i18nextInstance, elements);

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
      const addedLinks = watchedState.feeds.map((feed) => feed.link);
      const formData = new FormData(event.target);
      const inputData = formData.get('url');
      validateURL(addedLinks, inputData)
        .then((error) => {
          if (error) {
            watchedState.error = error.key;
            watchedState.form.status = 'inValid';
          } else {
            watchedState.form.status = 'added';
          }
        });
    });
  });
};

export default app;
