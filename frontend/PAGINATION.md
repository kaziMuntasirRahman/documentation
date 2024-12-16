# Frontend Pagination Implementation

This document outlines the process of implementing a simple pagination system in a React component using `useState` for page management.

## Overview

Pagination allows users to navigate through large sets of data by displaying a limited number of items per page. This example uses React's `useState` hook to manage the current page and a total number of pages, with buttons to navigate forward and backward.

## Code Breakdown

### Pagination Logic

1. **State Management:**
   - `currentPage`: Tracks the current page the user is on.
   - `totalPage`: Total number of available pages (default: 10).
   
2. **Pagination Buttons:**
   - Buttons for navigating to the previous and next pages.
   - Direct page buttons to allow jumping to specific pages.

```js
const [currentPage, setCurrentPage] = useState(1);  // Page starts at 1
const [totalPage, setTotalPage] = useState(10);     // Total number of pages
```

### Pagination Component

- **Previous Button:** Disabled when on the first page.
- **Next Button:** Disabled when on the last page.
- **Page Numbers:** Buttons for navigating to specific pages.

```jsx
<div className="join my-10">
  {/* Previous Button */}
  <button
    className={`${currentPage === 1 && 'btn-disabled'} join-item btn`}
    onClick={() => setCurrentPage(currentPage - 1)}>
    <GrPrevious />
  </button>
  
  {/* Page Numbers */}
  {
    Array(totalPage).fill().map((_, index) =>
      <input
        key={index}
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label={index + 1}
        checked={currentPage === index + 1}
        onClick={() => setCurrentPage(index + 1)}
      />
    )
  }

  {/* Next Button */}
  <button
    className={`${currentPage === totalPage && 'btn-disabled'} join-item btn`}
    onClick={() => setCurrentPage(currentPage + 1)}>
    <GrNext />
  </button>
</div>
```

### Displaying Items for Each Page

In the example, the code simulates displaying 9 items per page. The page is updated based on `currentPage` and `limit`.

```js
<section className="w-[1200px] grid grid-cols-3 gap-4 justify-between">
  {Array(9).fill().map((_, index) => (
    <article key={index} className="flex flex-col py-6">
      {/* Service content */}
    </article>
  ))}
</section>
```

## Dependencies

Ensure the following packages are installed for icons and page navigation:

```bash
npm install react-icons react-helmet-async react-router-dom
```

- **React Icons:** Provides `GrNext`, `GrPrevious`, and other icons.
- **React Helmet Async:** Used for managing document head.
- **React Router DOM:** Handles routing, though it’s not used much in this example.

## How It Works

- The **currentPage** state is updated when a user clicks on a page number or navigates with next/previous buttons.
- The page buttons are dynamically rendered based on the `totalPage` value.
- **Pagination state** ensures the correct content is displayed for each page.
