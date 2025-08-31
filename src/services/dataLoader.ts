export function createDataResource<T>(url: string) {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;

  const suspender = fetch(url)
    .then((res) => res.json())
    .then((data: T) => {
      status = 'success';
      result = data;
    })
    .catch((err) => {
      status = 'error';
      result = err;
    });

  return {
    read(): T {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      return result;
    },
  };
}
