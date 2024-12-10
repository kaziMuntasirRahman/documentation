# React Helmet Async - Dynamic Page Titles

This project demonstrates how to use `react-helmet-async` to dynamically set the page titles for different routes in a React application. This is useful for improving SEO, accessibility, and user experience by updating the document title based on the content being displayed.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Example Usage](#example-usage)
  - [App.js](#appjs)
  - [Page Components](#page-components)
- [Features](#features)
- [Best Practices](#best-practices)
- [References](#references)

## Installation

To use `react-helmet-async` in your project, you first need to install the library.

### Using npm

```bash
npm install react-helmet-async
```

### Using yarn

```bash
yarn add react-helmet-async
```

## Setup

In order to use `react-helmet-async`, you must wrap your application in the `HelmetProvider` component. This provides the context required for managing updates to the document's head, such as the `<title>` tag.

### Wrapping Your App with `HelmetProvider`

In your `App.js` or main component, import and wrap the content with `HelmetProvider`:

```jsx
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Home from './components/Home';
import About from './components/About';

const App = () => {
  return (
    <HelmetProvider>
      <div>
        <Home />
        <About />
      </div>
    </HelmetProvider>
  );
};

export default App;
```

Now you can use `Helmet` inside any of your components to dynamically set the page title and other meta tags.

## Example Usage

### 1. **App.js**

Here's an example `App.js` that uses `react-router-dom` to manage different routes and dynamically updates the page title for each route.

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
```

### 2. **Page Components**

Each page component uses the `Helmet` component to set a unique page title.

#### **Home.js**

```jsx
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home - My Website</title>
      </Helmet>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default Home;
```

#### **About.js**

```jsx
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About Us - My Website</title>
      </Helmet>
      <h1>About Us</h1>
    </div>
  );
};

export default About;
```

#### **Contact.js**

```jsx
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  return (
    <div>
      <Helmet>
        <title>Contact Us - My Website</title>
      </Helmet>
      <h1>Contact Us</h1>
    </div>
  );
};

export default Contact;
```

### Features

- **Dynamic Titles**: Update the document title for each route or component.
- **SEO Friendly**: Helps improve search engine optimization by providing relevant titles for each page.
- **SSR Support**: `react-helmet-async` is optimized for server-side rendering (SSR) with support for async rendering, making it a better alternative for SSR environments compared to `react-helmet`.
- **Meta Tag Support**: You can also dynamically manage meta tags, link tags, and other head elements using the `Helmet` component.

### Best Practices

- **Wrap Your App in `HelmetProvider`**: Ensure that you wrap the root of your application in `HelmetProvider` to avoid errors.
  
- **Use Specific Titles**: Make sure each page has a unique and descriptive title for better SEO and user experience.

- **SSR Usage**: If using server-side rendering, `react-helmet-async` handles async rendering and provides better support for concurrent requests.

### References

- [react-helmet-async Documentation](https://github.com/staylor/react-helmet-async#readme)
- [react-helmet-async GitHub](https://github.com/staylor/react-helmet-async)
