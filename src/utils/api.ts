const addAppJsonHeader = (options?: RequestInit) => {
  return {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  };
};

const request = (
  url: string,
  method: RequestInit["method"],
  options?: RequestInit
) => {
  return fetch(url, {
    method,
    ...options,
  })
    .then(function (response) {
      return response.json().then(function (data) {
        if (response.status !== 200) {
          console.error(
            "Looks like there was a problem. Status Code: " + response.status
          );
          throw new Error(`Error happened: ${response.status} status`, data);
        }
        return data;
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
      throw err;
    });
};

export const get = (url: string, options?: RequestInit) =>
  request(url, "GET", options);

export const post = (url: string, options?: RequestInit) =>
  request(url, "POST", addAppJsonHeader(options));
