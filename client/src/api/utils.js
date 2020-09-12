import queryString from 'query-string';

export const withQuery = (api, query) => {
  return queryString.stringifyUrl({
    url: api,
    query: query || {}
  });
};