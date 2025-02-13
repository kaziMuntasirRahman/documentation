# React Simple Captcha Documentation

## Introduction
React Simple Captcha is a powerful, customizable, and easy-to-use captcha for React applications. It helps prevent bots from interacting with forms by requiring users to complete a challenge (captcha) before submitting forms.

## Installation
To install React Simple Captcha, run the following command:
```
npm install react-simple-captcha
```

## How to Use
Follow these steps to integrate React Simple Captcha in your React app:

### Step 1: Import Required Modules
In your React component, import the required modules from `react-simple-captcha` and other necessary libraries. Below is an example:
```javascript
import { Link } from "react-router-dom";
import Input from "../Components/authentication/Input";
import SubmitButton from "../Components/authentication/SubmitButton";
import SocialLogin from "../Components/authentication/SocialLogin";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect, useState } from "react";
```

### Step 2: Initialize Captcha in `useEffect`
Use the `loadCaptchaEnginge` function to initialize the captcha when the component mounts. This function takes a parameter for the number of characters to display in the captcha.
```javascript
useEffect(() => {
  loadCaptchaEnginge(6);
}, [])
```

### Step 3: Validate the Captcha on Form Submission
Use the `validateCaptcha` function to validate the captcha input when the user submits the form.
```javascript
const handleFormSubmit = (e) => {
  e.preventDefault();
  if (validateCaptcha(captcha)) {
    alert("Captcha Matched...");
  } else {
    alert("Captcha doesn't match...")
  }
};
```

### Step 4: Display the Captcha and Form Inputs
Add the `LoadCanvasTemplate` component to display the captcha and an input field for the user to enter the captcha. You can also use the `Input` and `SubmitButton` components for other form fields as shown in the example below:
```javascript
<form onSubmit={handleFormSubmit} className="flex flex-col items-center">
  <div className="mr-auto mb-4">
    <LoadCanvasTemplate />
  </div>
  <Input
    placeholder="Enter captcha"
    type="text"
    onChangeMethod={setCaptcha}
  />
  <SubmitButton name="Sign In" />
</form>
```

## Example Code
Here is a complete example of a React component using React Simple Captcha:


## Conclusion
React Simple Captcha is an excellent tool for adding captcha functionality to your React applications. It is easy to set up and highly customizable for various use cases. With the steps provided, you can quickly integrate it into your project to enhance security and prevent bot submissions.

---
**Documentation by Rayiys**

