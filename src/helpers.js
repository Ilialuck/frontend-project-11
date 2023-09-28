import axios from 'axios';
import { uniqueId } from 'lodash';
import parseData from './parser';

const defaultOptions = { timeout: 10000 };
const timeOut = 5000;

const addProxy = (url) => {
  const baseURL = 'https://allorigins.hexlet.app/get';
  const proxiedURL = new URL(baseURL);
  proxiedURL.searchParams.set('disableCache', true);
  proxiedURL.searchParams.set('url', url);
  return proxiedURL.toString();
};

const addId = (items, id) => {
  items.forEach((item) => {
    item.id = uniqueId();
    item.feedId = id;
  });
};

const handleData = (data, watchedState, url) => {
  const { feed, posts } = data;
  feed.link = url;
  feed.id = uniqueId();
  watchedState.feeds.push(feed);
  addId(posts, feed.id);
  watchedState.posts.unshift(...posts);
};

const handleError = (error) => {
  if (error.isParsingError) {
    return 'notRss';
  }
  if (axios.isAxiosError(error)) {
    return 'networkError';
  }
  return 'unknown';
};

const loadRSS = (watchedState, url) => {
  watchedState.error = null;
  watchedState.form.status = 'sending';

  axios.get(addProxy(url), defaultOptions)
    .then((response) => {
      const data = parseData(response.data.contents, url);
      handleData(data, watchedState, url);
      watchedState.form.status = 'added';
    })
    .catch((error) => {
      watchedState.error = handleError(error);
      watchedState.form.status = 'inValid';
    });
};
const updatePosts = (watchedState) => {
  const promises = watchedState.feeds.map((feed) => axios.get(addProxy(feed.link))
    .then((response) => {
      const { posts } = parseData(response.data.contents);
      const postsWithCurrentId = watchedState.posts.filter((post) => post.feedId === feed.id);
      const displayedPostLinks = postsWithCurrentId.map((post) => post.link);
      const newPosts = posts.filter((post) => !displayedPostLinks.includes(post.link));
      addId(newPosts, feed.id);
      watchedState.posts.unshift(...newPosts);
    })
    .catch((error) => {
      console.error(`Error fetching data from feed ${feed.id}:`, error);
    }));
  return Promise.all(promises).finally(() => setTimeout(updatePosts, timeOut, watchedState));
};
export { loadRSS, updatePosts };
