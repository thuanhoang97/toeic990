import axios from '../axios';
import queryString from 'query-string';
import { TEST_PART_RANGE } from '../constants';

export const chunkArray = (arr, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

// get new range from list of ranges
export const rangeArray = (ranges) => {
  if (Array.isArray(ranges[0])) {
    let [start, end] = ranges[0];
    for (let i = 1; i < ranges.length; i++) {
      let [rangeStart, rangeEnd] = ranges[i];
      if (start > rangeStart) {
        start = rangeStart;
      }

      if (end < rangeEnd) {
        end = rangeEnd;
      }
    }
    return [start, end];
  }

  return ranges;
};

export const timeToString = (time) => {
  const formatNumber = (num) => {
    if (num < 10) {
      return '0' + num;
    }
    return num;
  };

  const hh = Math.floor(time / 3600);
  time -= hh * 3600;
  const mm = Math.floor(time / 60);
  time -= mm * 60;
  const ss = time;
  return `${formatNumber(hh)}:${formatNumber(mm)}:${formatNumber(ss)}`;
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const generateUrl = (baseUrl, query) => {
  return queryString.stringifyUrl(
    {
      url: baseUrl,
      query,
    },
    { arrayFormat: 'comma' }
  );
};

export const getPartNameByRange = (range) => {
  for (let key in TEST_PART_RANGE) {
    const part = TEST_PART_RANGE[key];
    const partRange = part.value;
    if (partRange[0] === range[0] && partRange[1] === range[1]) {
      return part.name;
    }
  }
  return '';
};

export const getURLWithPage = (pathname, searchParams, page) => {
  return queryString.stringifyUrl({
    url: pathname,
    query: {
      ...queryString.parse(searchParams),
      page: page === 1 ? undefined : page,
    }
  })
};