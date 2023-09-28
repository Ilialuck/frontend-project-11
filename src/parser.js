const parseData = (data) => {
  const domParser = new DOMParser();
  const parsedDocument = domParser.parseFromString(data, 'text/xml');
  const parseError = parsedDocument.querySelector('parsererror');
  if (parseError) {
    const error = new Error(parseError.textContent);
    error.isParsingError = true;
    throw error;
  }
  const title = parsedDocument.querySelector('title').textContent;
  const description = parsedDocument.querySelector('description').textContent;

  const feed = {
    title,
    description,
  };

  const items = parsedDocument.querySelectorAll('item');

  const posts = Array.from(items).map((item) => {
    const itemTitle = item.querySelector('title').textContent;
    const itemLink = item.querySelector('link').textContent;
    const itemDescription = item.querySelector('description').textContent;

    return {
      title: itemTitle,
      link: itemLink,
      description: itemDescription,
    };
  });

  return {
    feed,
    posts,
  };
};

export default parseData;
