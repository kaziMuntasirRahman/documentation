# TanStack Query Documentation

With TanStack Query, we can perform many tasks like fetching, caching, and handling asynchronous behavior. In this documentation, we will cover some basic tasks of TanStack Query.

## Steps

1. **Install TanStack Query**

  First, we have to install TanStack Query with the following command:
  ```bash
  npm i -D @tanstack/eslint-plugin-query
  ```

2. **Create a Query Client**

  In our `main.jsx` file, we will create a `queryClient`:
  ```javascript
  const queryClient = new QueryClient();
  ```

3. **Wrap the Application with QueryClientProvider**

  After that, we will wrap the `<Root/>` or `<App/>` (whatever we have) with the `QueryClientProvider` with `client={queryClient}` just like `<AuthProvider>` or `<HelmetProvider>`:
  ```jsx
  import { StrictMode } from 'react';
  import { createRoot } from 'react-dom/client';
  import './index.css';
  import { RouterProvider } from 'react-router-dom';
  import router from './routes/Routes.jsx';
  import { HelmetProvider } from 'react-helmet-async';
  import AuthProvider from './providers/AuthProvider.jsx';
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

  const queryClient = new QueryClient();

  createRoot(document.getElementById('root')).render(
    <StrictMode>
     <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
         <RouterProvider router={router}>
          <Root />
         </RouterProvider>
        </HelmetProvider>
      </QueryClientProvider>
     </AuthProvider>
    </StrictMode>
  );
  ```

4. **Create a Hook to Fetch Data**

  Suppose we create a `useCart` hook. First, we will use `useQuery()`, which will return data and many other things. Don't forget to explore them [here](https://tanstack.com/query/latest/docs/framework/react/quick-start). We have to use a `queryKey` for caching and many other things, and a `queryFunction` that will fetch the data. The function will return data, which will be stored in `data`. Finally, we can return any data we want from the hook.

  ```javascript
  import { useQuery } from "@tanstack/react-query";
  import useAxiosSecure from "./useAxiosSecure";
  import { useContext } from "react";
  import { AuthContext } from "../providers/AuthProvider";

  const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: cart = [] } = useQuery({
     queryKey: ['cart', user?.email],
     queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
     }
    });

    return [cart];
  };

  export default useCart;
  ```

5. **Use the Hook in a Component**

  If we want to use it from another component, we just have to get the instance of the hook. For example, in `Navbar.jsx`:
  ```javascript
  const NavBar = () => {
    const [cart] = useCart();
    return (
     <p>{cart.length}</p>
    );
  };
  ```

6. **Refetch Data on Update**

  If we want to do something like adding a cart from the `Cart.jsx` component and have it immediately update in the `Navbar.jsx`, we just have to use `refetch()`.

  In the `useCart.jsx` hook:
  ```javascript
  import { useQuery } from "@tanstack/react-query";
  import useAxiosSecure from "./useAxiosSecure";
  import { useContext } from "react";
  import { AuthContext } from "../providers/AuthProvider";

  const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: cart = [], refetch } = useQuery({
     queryKey: ['cart', user?.email],
     queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
     }
    });

    return [cart, refetch];
  };

  export default useCart;
  ```

  Then, in the `Cart.jsx`:
  ```javascript
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    const cartInfo = { menuId: item._id, userEmail: user.email };
    axiosSecure.post('/carts', { ...cartInfo })
     .then(res => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
         position: "top-end",
         icon: "success",
         title: item.name + " has been added to the cart.",
         showConfirmButton: false,
         timer: 1500
        });
        // Refetch the cart info. It will update cart count in the navbar
        refetch();
      }
     });
  };
  ```

After this, just after successfully adding the cart to the database, this instance will immediately change in the navbar.