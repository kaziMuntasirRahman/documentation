## Steps

### Step 1: Install React Responsive Carousel

```bash
npm install react-responsive-carousel
```

### Step 2: Import and use `Carousel` as `container`. also import `css`

```js
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

...
...
...

<Carousel>
</Carousel>
```

### Step 3: Use necessary Property as needed

```js
<Carousel
  showArrows={true}
  showThumbs={false}
  axis='horizontal'
  centerMode={false}
  infiniteLoop={true}
  autoPlay={true}
  interval={10000}
  swipeable={true}
  transitionTime={1500}
  showStatus={false}
>
</Carousel>
```

find all necessary props here
https://github.com/leandrowd/react-responsive-carousel/tree/master?tab=readme-ov-file#react-responsive-carousel

### step 4: add carousel element inside it

```js
<Carousel>
  <div>
    <img src='assets/1.jpeg' />
    <p className='legend'>Legend 1</p>
  </div>
  <div>
    <img src='assets/2.jpeg' />
    <p className='legend'>Legend 2</p>
  </div>
  <div>
    <img src='assets/3.jpeg' />
    <p className='legend'>Legend 3</p>
  </div>
</Carousel>
```
## Example
```js
'use client'

import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../../styles/swiper.css';
import Image from "next/image";
const buttonStyle = "absolute bottom-12 z-10 text-white bg-white/50 hover:bg-primary transition-all duration-200 ease-in-out size-14 rounded-full flex items-center justify-center cursor-pointer"


const Banner = () => {
  const banners = [
    {
      title: 'blaah blaah ;lkajdf;l aksdjf;laksdj',
      description: ";alskdfj ;laskdjf;laskdjfwoiejak;lwef;lkjaef",
      prev: '#slide6',
      current: 'slide1',
      next: '#slide2'
    },
    {
      title: 'blaah blaah ;lkajdf;l aksdjf;laksdj',
      description: ";alskdfj ;laskdjf;laskdjfwoiejak;lwef;lkjaef",
      prev: '#slide1',
      current: 'slide2',
      next: '#slide3'
    },
    {
      title: 'blaah blaah ;lkajdf;l aksdjf;laksdj',
      description: ";alskdfj ;laskdjf;laskdjfwoiejak;lwef;lkjaef",
      prev: '#slide2',
      current: 'slide3',
      next: '#slide4'
    },
    {
      title: 'blaah blaah ;lkajdf;l aksdjf;laksdj',
      description: ";alskdfj ;laskdjf;laskdjfwoiejak;lwef;lkjaef",
      prev: '#slide3',
      current: 'slide4',
      next: '#slide5'
    },
    {
      title: 'blaah blaah ;lkajdf;l aksdjf;laksdj',
      description: ";alskdfj ;laskdjf;laskdjfwoiejak;lwef;lkjaef",
      prev: '#slide4',
      current: 'slide5',
      next: '#slide6'
    },
    {
      title: 'blaah blaah ;lkajdf;l aksdjf;laksdj',
      description: ";alskdfj ;laskdjf;laskdjfwoiejak;lwef;lkjaef",
      prev: '#slide5',
      current: 'slide6',
      next: '#slide1'
    },
  ]
  return (
    <div>
      <Carousel
        showArrows={true}
        showThumbs={false}
        axis="horizontal"
        centerMode={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={10000}
        swipeable={true}
        transitionTime={1500}
        showStatus={false}

        renderArrowPrev={(onclickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onclickHandler}
              title={label}
              className={`${buttonStyle} right-32`}
            >
              <IoArrowBack />
            </button>
          )
        }
        renderArrowNext={(onclickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onclickHandler}
              title={label}
              className={`${buttonStyle} right-12`}
            >
              <IoArrowForward />
            </button>
          )
        }
      >
        {
          banners.map(({ title, description, prev, current, next }, index) =>
            <div key={current} className="h-[600px] relative rounded-[10px] overflow-hidden" >
              <Image src={`/assets/images/banner/${index + 1}.jpg`} alt={title} height={600} width={1140} />
              <div className="absolute p-24 top-0 left-0 h-full w-full flex flex-col items-start gap-7 bg-gradient-to-r from-neutral-900 to-neutral-900/0 ">
                <h1 className="w-[463px] justify-start text-white text-6xl font-bold leading-[75px] text-left">{title}</h1>
                <p className="w-[522px] justify-start text-white text-lg font-normal capitalize leading-loose text-left">There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
                <div className="flex gap-4 ">
                  <button className="btn btn-primary">Discover Me</button>
                  <button className="btn btn-outline border-white text-white hover:border-white/0 hover:bg-primary">Latest Project</button>
                </div>
              </div>
            </div>
          )}
      </Carousel>
    </div>
  );
};

export default Banner;
```

## Change CSS if needed
```css
.carousel .control-arrow, .carousel.carousel-slider .control-arrow {
  transition: all 0.25s ease-in;
  opacity: 0.4;
  filter: alpha(opacity=40);
  position: absolute;
  z-index: 2;
  bottom: 50px;
  background: none;
  border: 0;
  font-size: 32px;
  cursor: pointer;
}
.carousel .control-arrow:focus, .carousel .control-arrow:hover {
  opacity: 1;
  filter: alpha(opacity=100);
}
.carousel .control-arrow:before, .carousel.carousel-slider .control-arrow:before {
  margin: 0 50px;
  display: inline-block;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  content: '';
}
.carousel .control-disabled.control-arrow {
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: inherit;
  display: none;
}
.carousel .control-prev.control-arrow {
  left: 10px;
}
.carousel .control-prev.control-arrow:before {
  border-right: 8px solid #fff;
}
.carousel .control-next.control-arrow {
  right: 10px;
}
.carousel .control-next.control-arrow:before {
  border-left: 8px solid #fff;
}
.carousel-root {
  outline: none;
}
.carousel {
  position: relative;
  width: 100%;
}
.carousel * {
  box-sizing: border-box;
}
.carousel img {
  width: 100%;
  display: inline-block;
  pointer-events: none;
}
.carousel .carousel {
  position: relative;
}
.carousel .control-arrow {
  outline: 0;
  border: 0;
  background: none;
  top: 50%;
  margin-top: -13px;
  font-size: 18px;
}
.carousel .thumbs-wrapper {
  margin: 20px;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
}
.carousel .thumbs {
  transition: all 0.15s ease-in;
  transform: translate3d(0, 0, 0);
  position: relative;
  list-style: none;
  white-space: nowrap;
}
.carousel .thumb {
  transition: border 0.15s ease-in;
  display: inline-block;
  margin-right: 6px;
  white-space: nowrap;
  overflow: hidden;
  border: 3px solid #fff;
  padding: 2px;
}
.carousel .thumb:focus {
  border: 3px solid #ccc;
  outline: none;
}
.carousel .thumb.selected, .carousel .thumb:hover {
  border: 2px solid #333;
}
.carousel .thumb img {
  vertical-align: top;
}
.carousel.carousel-slider {
  position: relative;
  margin: 0;
  overflow: hidden;
}
.carousel.carousel-slider .control-arrow {
  top: 0;
  color: #fff;
  font-size: 26px;
  bottom: 0;
  margin-top: 0;
  padding: 5px;
}
 .carousel.carousel-slider .control-arrow:hover {
  background: rgba(0, 0, 0, 0.2);
} 
.carousel .slider-wrapper {
  overflow: hidden;
  margin: auto;
  width: 100%;
  transition: height 0.15s ease-in;
}
.carousel .slider-wrapper.axis-horizontal .slider {
  display: flex;
  flex-direction: row;
}
.carousel .slider-wrapper.axis-vertical {
  display: flex;
  flex-direction: column;
}
.carousel .slider {
  margin: 0;
  padding: 0;
  position: relative;
  list-style: none;
  width: 100%;
}
.carousel .slider.animated {
  transition: all 0.35s ease-in-out;
}
.carousel .slide {
  min-width: 100%;
  margin: 0;
  position: relative;
  text-align: center;
}
.carousel .slide img {
  width: 100%;
  vertical-align: top;
  border: 0;
}
.carousel .slide iframe {
  display: inline-block;
  width: calc(100% - 80px);
  margin: 0 40px 40px;
  border: 0;
}
.carousel .slide .legend {
  transition: all 0.5s ease-in-out;
  position: absolute;
  bottom: 40px;
  left: 50%;
  margin-left: -45%;
  width: 90%;
  border-radius: 10px;
  background: #000;
  color: #fff;
  padding: 10px;
  font-size: 12px;
  text-align: center;
  opacity: 0.25;
  transition: opacity 0.35s ease-in-out;
}
.carousel .control-dots {
  position: absolute;
  bottom: 0;
  margin: 10px 0;
  padding: 0;
  text-align: center;
  width: 100%;
  z-index: 1;
}
@media (min-width: 960px) {
  .carousel .control-dots {
    bottom: 0;
  }
}
.carousel .control-dots .dot {
  transition: opacity 0.25s ease-in;
  opacity: 0.3;
  filter: alpha(opacity=30);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
  background: #fff;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  cursor: pointer;
  display: inline-block;
  margin: 0 8px;
}
.carousel .control-dots .dot.selected, .carousel .control-dots .dot:hover {
  opacity: 1;
  filter: alpha(opacity=100);
}
.carousel .carousel-status {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  font-size: 10px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.9);
  color: #fff;
}
.carousel:hover .slide .legend {
  opacity: 1;
}
```