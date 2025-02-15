# Navigation Guide

To navigate from one page to another, we can use various approaches such as `useNavigate()`, `<Link />`, `<NavLink />`, `<Navigate />`, etc. In this documentation, we will cover how to redirect the original page after a successful login.

## Steps

1. **Add to Cart Page**:
  - Use `useLocation()` to get the current location and navigate to a private route that requires a logged-in user, passing the current location as state.
  ```javascript
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleClickFunction = () => {
    navigate('/login', { state: location.pathname });
  };
  ```

2. **Private Route Component**:
  - In the `<PrivateRoute />` component, use the state and send it to the login page.
  ```javascript
  const location = useLocation();
  <Navigate to='/login' state={{ from: location }} replace />;
  ```
  - **Side Note**: The purpose of the `replace` prop is to replace the current entry in the history stack instead of adding a new one.

3. **Login Page**:
  - Use the state to redirect to the original page after login. If no state is found, redirect to the landing page.
  ```javascript
  const location = useLocation();
  const navigate = useNavigate();
  
  const originalLocation = location.state?.from || '/';
  navigate(originalLocation);
  ```

By following these steps, you can ensure that users are redirected to their intended destination after logging in.