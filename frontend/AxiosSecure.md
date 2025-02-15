# Using AxiosSecure with Base URL

There are many advanced advantages of using `useAxiosSecure`, and one of them is the usage of a base URL. In this documentation, we will see how to use `axiosSecure` with a base URL.

## Steps

1. First, we will create a hook called `useAxiosSecure`. We will use the `axios.create()` method and set the base URL to it.

```javascript
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000/'
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
```

2. After that, we can use this `axiosSecure` instance from anywhere in the project by calling it. We will use `axiosSecure` instead of `axios` and skip specifying the base URL each time.

```javascript
const axiosSecure = useAxiosSecure();

axiosSecure.post('/carts', { ...data })
    .then(res => console.log(res.data));
```