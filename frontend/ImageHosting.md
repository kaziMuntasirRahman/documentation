# Upload Image to imgbb using API

This guide provides a step-by-step explanation on how to upload an image to the `imgbb` image hosting service using `React` and `Axios`. We will handle the image file input using the **useState** hook and manage the upload process with Axios.

## Prerequisites

- Basic knowledge about `React`
- **imgbb** API key (You can get it by signing up at [imgbb.com](https://imgbb.com))
- Axios installed in your project (`npm install axios`)

## `6 Steps` to Follow

1. **Get the imgbb API key**

To upload image to `imgbb`, you need to generate an API key. After Signing up at `imgbb`, you will get the `32 digit` API key from [api.imgbb.com/](https://api.imgbb.com/). Save the api key in the Environment Variable file (`.env.local`) as the followed example.

```.env
VITE_IMGBB_API_KEY=f8a1b2c3d4e5f67890123456789abcdef
```

2. **Create Image Hosting URL**

```jsx
const img_hosting_url=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`
```

3. **Set State to get the image file**

```jsx
const [image, setImage] = useState(null)
```

4. **Get and set the image**

Set the image from input field. You will get it in `files[0]` inside `event.target`.

```jsx
<input type='file' onChange={e => setImage(e.target.files[0])} />
```

5. **Get Image from the files and Post Request**

Create an object with the files. Send an asynchronous Post request with the object. And Set `content-type` to `multipart/form-data` inside `headers`.

```jsx
const handleSubmit = async () => {
  const imgFile = { image: image }
  const response = await axios.post(img_hosting_url, imgFile, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
}
```

6. **Get the Image URL**

Finally, if the image is uploaded successfully, we will get response from imgbb including `success` inside `response` and `url` inside `response.data.data` _(data twice. one for axios, the other for imgbb response)_ object.

```jsx
if (response.data.success) {
  console.log(response.data.data.url)
}
```

## Example

```jsx
import {useState} from "react";

const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

const App ()=>{
  const [image, setImage] = useState(null)

  const handleSubmit = async () => {
    const imgFile = { image: image }
    const response = await axios.post(img_hosting_url, imgFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    if (response.data.data.status) {
      console.log(response.data.data.url)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='file' onChange={e => setImage(e.target.files[0])} />
      <button type='submit'>Submit</button>
    </form>
  )
}
export default App;
```
