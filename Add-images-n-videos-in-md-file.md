# Adding Images and Videos to README.md

## 1. Adding Images

To add images in Markdown, you use the following syntax:

```markdown
![Alt text](image-url)
```

- **Alt text**: This is the text that will appear if the image cannot be displayed. It also serves as a description for accessibility purposes.
- **image-url**: This can be an absolute URL (e.g., a link to an image hosted online) or a relative path to an image stored in your repository.

### Example:

```markdown
![Logo](https://example.com/logo.png)
```

Or, if the image is in the same repository:

```markdown
![My Image](./images/my-image.png)
```

## 2. Resizing Images
If you want to control the size of the image in the `README.md`, you can use HTML inside Markdown:

```markdown
<img src="https://example.com/logo.png" alt="Logo" width="200" height="100">
```

## 3. Adding Videos

Markdown doesn't natively support embedding videos, but you can include a link to a video, or you can use HTML to embed videos.

### Linking to a Video:

```markdown
[Watch the video](https://www.youtube.com/watch?v=example)
```

### Embedding a Video using HTML:

To embed a video (e.g., from YouTube) in `README.md`, use the following HTML code:

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/example" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

## 4. Embedding GIFs
To add GIFs, you can use the same syntax as for images. Just upload the GIF to your repository or use an external URL:

```markdown
![Funny GIF](https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif)
```

## Example for Both in a README.md

```markdown
# My Project

## Project Logo

![Logo](https://example.com/logo.png)

## How to Use

Watch this video to learn how to use the project:

[![Watch the video](https://img.youtube.com/vi/example/maxresdefault.jpg)](https://www.youtube.com/watch?v=example)
```

In this example, the image is a YouTube thumbnail that links to a video.

