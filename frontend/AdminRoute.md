# AdminRoute Component Documentation

## Overview

`AdminRoute` is a higher-order component (HOC) used to restrict access to certain parts of the application to users with admin privileges. It works in conjunction with the `AuthContext` and a custom hook `useAdmin` to determine whether a user is logged in and has admin rights. If the user is not an admin or is not logged in, they are redirected to the home page (`'/'`).

## Code
```javascript
import { useContext } from "react";
import useAdmin from "../../../hooks/useAdmin";
import { AuthContext } from "../../../providers/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading || loading) {
    return (
      <div className="scale-[3] w-full h-full bg-gray-800/50 fixed">
        <span className="loader" />
      </div>
    );
  } else if (user && isAdmin) {
    return children;
  }

  return (<Navigate to='/' />);
};

export default AdminRoute;
```

## Explanation

### 1. **Dependencies**
   - `useContext`: A React hook used to access the current `AuthContext`, which holds information about the user and whether they are logged in.
   - `useAdmin`: A custom hook that checks whether the current user has admin privileges by making an API call.
   - `AuthContext`: Provides `user` and `loading` states to determine if a user is logged in and whether authentication is still loading.

### 2. **Props**
   - `children`: The component(s) that should be rendered if the user is an admin.

### 3. **Loading States**
   - If either `isAdminLoading` or `loading` is `true`, the component returns a loading spinner, preventing the page from rendering until the authentication and admin checks are complete.

### 4. **Conditional Rendering**
   - If `user` exists and `isAdmin` is `true`, the children components are rendered.
   - If the user is not an admin or not logged in, the user is redirected to the home page (`'/'`).

## Use Case
`AdminRoute` is useful in scenarios where certain routes or pages should only be accessible by administrators. For example, if you have an admin dashboard, you can wrap the dashboard component inside `AdminRoute` to ensure that only admin users can view or access it.

```jsx
<AdminRoute>
  <AdminDashboard />
</AdminRoute>
```

