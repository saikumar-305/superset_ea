import { useEffect, useState, useRef } from "react";
import axios from "src/ea_oyster_components/axios.js";

export function useFetchData(url, id, desc) {
  const cache = useRef({});
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    if (!url) return;

    var cacheKey = id + "_" + desc;
    let cache = getApiCache(cacheKey);

    console.log("LocalStorage cache", cache);
    if (cache.data) {
      console.log("Returning data from cache", cache.data);
      return setDataList(cache.data);
    }

    console.log("Retrieving from API");
    axios
      .get(url)
      .then((result) => {
        let dataArr = [];
        let objArr = result.data.aaData;

        for (let i = 0; i < objArr.length; i++) {
          let jsonObj = objArr[i];

          dataArr.push({
            id: jsonObj[id],
            desc: jsonObj[desc],
          });
        }

        setApiCache(cacheKey, dataArr);
        setDataList(dataArr);
      })
      .catch((error) => {
        console.log("Error in useFetchData", error);
      });
  }, [url, id, desc]);

  return dataList;
}

const DEF_CACHE_CLEANUP_WEEKS = 1000 * 60 * 60 * 24 * 7;
const currentTime = () => {
  return Date.now();
};

const getApiCache = (cacheKey) => {
  console.log("Getting cache for ", cacheKey);
  let cache = {
    data: null,
    nextCleanup: new Date().getTime() + DEF_CACHE_CLEANUP_WEEKS,
  };

  try {
    const data = localStorage.getItem(cacheKey);
    if (data) {
      cache = JSON.parse(data);
    }
  } catch (e) {
    console.error(e.message);
  }
  return cache;
};

const setApiCache = (cacheKey, value) => {
  console.log("Setting api cache", cacheKey);
  const item = {
    id: cacheKey,
    expiry: new Date().getTime() + DEF_CACHE_CLEANUP_WEEKS,
    data: value,
  };

  try {
    localStorage.setItem(cacheKey, JSON.stringify(item));
  } catch (e) {
    cleanUpStorage(cacheKey, item);
  }
};

const cleanUpStorage = (cacheKey, data) => {
  console.log("Cleaning up localStorage for ", cacheKey);
  let isDeleted;
  let oldest;
  let oldestKey;

  //if 14 days have been passed, it removes the cache
  for (const key in data) {
    const expiry = data[key].expiry;
    if (expiry && expiry <= currentTime()) {
      delete data[key];
      isDeleted = true;
    }

    //finding the oldest cache in case none of them are expired
    if (!oldest || oldest > expiry) {
      oldest = expiry;
      oldestKey = key;
    }
  }

  //remove the oldest cache if there is no more space in local storage (5 MB)
  if (!isDeleted && oldestKey) {
    delete data[oldestKey];
  }

  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      data: data,
      nextCleanup: currentTime() + DEF_CACHE_CLEANUP_WEEKS,
    })
  );
};
