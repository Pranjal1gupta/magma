// locomotion function

function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotive();


// page 2 text animation
var clutter="";

document.querySelector(".page2>h1").textContent.split(" ").forEach(function(dets){
    clutter += `<span> ${dets} </span>`

    document.querySelector(".page2>h1").innerHTML=clutter;
})

gsap.to(".page2>h1>span",{
    scrollTrigger:{
        trigger:`.page2>h1>span`,
        start:`top bottom`,  //first value is for element (top) and second is for screen (bottom)
        end:`bottom top`,
        scroller:`.main`,
        scrub:.5
    },
    stagger:.2,
    color:`#fff`
})


// page 3 canvas code
function canvas(){
    
    const canvas = document.querySelector(".page3>canvas"); //select canvas 
const context = canvas.getContext("2d");  // select all the 2d tools to context


// setting canvas height and width 
canvas.width = window.innerWidth;  
canvas.height = window.innerHeight;



// set window height and width when it resizes
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render(); //
});

function files(index) {
    // paste all images to data variable
  var data = `
    ./media/frames00007.png
    ./media/frames00010.png
    ./media/frames00016.png
    ./media/frames00019.png
    ./media/frames00022.png
    ./media/frames00013.png
    ./media/frames00025.png
    ./media/frames00028.png
    ./media/frames00031.png
    ./media/frames00034.png
    ./media/frames00037.png
    ./media/frames00040.png
    ./media/frames00043.png
    ./media/frames00046.png
    ./media/frames00049.png
    ./media/frames00052.png
    ./media/frames00055.png
    ./media/frames00058.png
    ./media/frames00061.png
    ./media/frames00064.png
    ./media/frames00067.png
    ./media/frames00070.png
    ./media/frames00073.png
    ./media/frames00076.png
    ./media/frames00079.png
    ./media/frames00082.png
    ./media/frames00085.png
    ./media/frames00088.png
    ./media/frames00091.png
    ./media/frames00094.png
    ./media/frames00097.png
    ./media/frames00100.png
    ./media/frames00103.png
    ./media/frames00106.png
    ./media/frames00109.png
    ./media/frames00112.png
    ./media/frames00115.png
    ./media/frames00118.png
    ./media/frames00121.png
    ./media/frames00124.png
    ./media/frames00127.png
    ./media/frames00130.png
    ./media/frames00133.png
    ./media/frames00136.png
    ./media/frames00139.png
    ./media/frames00142.png
    ./media/frames00145.png
    ./media/frames00148.png
    ./media/frames00151.png
    ./media/frames00154.png
    ./media/frames00157.png
    ./media/frames00160.png
    ./media/frames00163.png
    ./media/frames00166.png
    ./media/frames00169.png
    ./media/frames00172.png
    ./media/frames00175.png
    ./media/frames00178.png
    ./media/frames00181.png
    ./media/frames00184.png
    ./media/frames00187.png
    ./media/frames00190.png
    ./media/frames00193.png
    ./media/frames00196.png
    ./media/frames00199.png
    ./media/frames00202.png
    
 `;
  return data.split("\n")[index];  // split data to next line and pass index to array
}

const frameCount = 67; // stops function at specified number of framecounts without depending on number of images in data variable

const images = []; // images comes here
const imageSeq = {
  frame: 1, // specifies the frame from where to start on scrolling
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();   // creates new image
  img.src = files(i);  //setting source to image tag
  images.push(img);  //pushes back to the array
}

gsap.to(imageSeq, {
  frame: frameCount - 1,  //specifies the frame from where to start on scrolling
  snap: "frame",  // eithor 1 or 2
  ease: `none`,
  scrollTrigger: {
    scrub: .5,
    trigger: `.page3`,
    //   set start end according to preference
    start: `top top`,
    end: `250% top`,
    scroller: `.main`,
  },
  onUpdate: render,  // after updation run the render function
});

images[1].onload = render;  //on loading run the first frame and the render function

function render() {
  scaleImage(images[imageSeq.frame], context);  //(images[imageSeq.frame]-image address,context-conatins all 2d tools)
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;  //horizontal ration
  var vRatio = canvas.height / img.height; //vertical ratio
  var ratio = Math.max(hRatio, vRatio);  // run the ratio which is bigger 
  var centerShift_x = (canvas.width - img.width * ratio) / 2;  
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);  //remove the last frame when next frame arrives
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );  // draw the next image
}
ScrollTrigger.create({

  trigger: ".page3",
  pin: true,
  // markers:true,
  scroller: `.main`,
//   set start end according to preference
  start: `top top`,
  end: `250% top`,
});

}
canvas();


// page 4 text animation
var clutter="";

document.querySelector(".page4>h1").textContent.split(" ").forEach(function(dets){
    clutter += `<span> ${dets} </span>`

    document.querySelector(".page4>h1").innerHTML=clutter;
})

gsap.to(".page4>h1>span",{
    scrollTrigger:{
        trigger:`.page4>h1>span`,
        start:`top bottom`,  //first value is for element (top) and second is for screen (bottom)
        end:`bottom top`,
        scroller:`.main`,
        scrub:.5
    },
    stagger:.2,
    color:`#fff`
})


// page 5 canvas code

function canvas1(){
    
    const canvas = document.querySelector(".page5>canvas"); //select canvas 
const context = canvas.getContext("2d");  // select all the 2d tools to context


// setting canvas height and width 
canvas.width = window.innerWidth;  
canvas.height = window.innerHeight;



// set window height and width when it resizes
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render(); //
});

function files(index) {
    // paste all images to data variable
  var data = `
    ./media/bridges00004.png
    ./media/bridges00007.png
    ./media/bridges00010.png
    ./media/bridges00016.png
    ./media/bridges00019.png
    ./media/bridges00022.png
    ./media/bridges00013.png
    ./media/bridges00025.png
    ./media/bridges00028.png
    ./media/bridges00031.png
    ./media/bridges00034.png
    ./media/bridges00037.png
    ./media/bridges00040.png
    ./media/bridges00043.png
    ./media/bridges00046.png
    ./media/bridges00049.png
    ./media/bridges00052.png
    ./media/bridges00055.png
    ./media/bridges00058.png
    ./media/bridges00061.png
    ./media/bridges00064.png
    ./media/bridges00067.png
    ./media/bridges00070.png
    ./media/bridges00073.png
    ./media/bridges00076.png
    ./media/bridges00079.png
    ./media/bridges00082.png
    ./media/bridges00085.png
    ./media/bridges00088.png
    ./media/bridges00091.png
    ./media/bridges00094.png
    ./media/bridges00097.png
    ./media/bridges00100.png
    ./media/bridges00103.png
    ./media/bridges00106.png
    ./media/bridges00109.png
    ./media/bridges00112.png
    ./media/bridges00115.png
    ./media/bridges00118.png
    ./media/bridges00121.png
    ./media/bridges00124.png
    ./media/bridges00127.png
    ./media/bridges00130.png
    ./media/bridges00133.png
    ./media/bridges00136.png
    ./media/bridges00139.png
    ./media/bridges00142.png
    ./media/bridges00145.png
    ./media/bridges00148.png
    ./media/bridges00151.png
    ./media/bridges00154.png
    ./media/bridges00157.png
    ./media/bridges00160.png
    ./media/bridges00163.png
    ./media/bridges00166.png
    ./media/bridges00169.png
    ./media/bridges00172.png
    ./media/bridges00175.png
    ./media/bridges00178.png
    ./media/bridges00181.png
    ./media/bridges00184.png
    ./media/bridges00187.png
    ./media/bridges00190.png
    ./media/bridges00193.png
    ./media/bridges00196.png
    ./media/bridges00199.png
    ./media/bridges00202.png
    
 `;
  return data.split("\n")[index];  // split data to next line and pass index to array
}

const frameCount = 67; // stops function at specified number of framecounts without depending on number of images in data variable

const images = []; // images comes here
const imageSeq = {
  frame: 1, // specifies the frame from where to start on scrolling
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();   // creates new image
  img.src = files(i);  //setting source to image tag
  images.push(img);  //pushes back to the array
}

gsap.to(imageSeq, {
  frame: frameCount - 1,  //specifies the frame from where to start on scrolling
  snap: "frame",  // eithor 1 or 2
  ease: `none`,
  scrollTrigger: {
    scrub: .5,
    trigger: `.page5`,
    //   set start end according to preference
    start: `top top`,
    end: `250% top`,
    scroller: `.main`,
  },
  onUpdate: render,  // after updation run the render function
});

images[1].onload = render;  //on loading run the first frame and the render function

function render() {
  scaleImage(images[imageSeq.frame], context);  //(images[imageSeq.frame]-image address,context-conatins all 2d tools)
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;  //horizontal ration
  var vRatio = canvas.height / img.height; //vertical ratio
  var ratio = Math.max(hRatio, vRatio);  // run the ratio which is bigger 
  var centerShift_x = (canvas.width - img.width * ratio) / 2;  
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);  //remove the last frame when next frame arrives
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );  // draw the next image
}
ScrollTrigger.create({

  trigger: ".page5",
  pin: true,
  // markers:true,
  scroller: `.main`,
//   set start end according to preference
  start: `top top`,
  end: `250% top`,
});

}
canvas1();


// page 6 text animation
var clutter="";

document.querySelector(".page6>h1").textContent.split(" ").forEach(function(dets){
    clutter += `<span> ${dets} </span>`

    document.querySelector(".page6>h1").innerHTML=clutter;
})

gsap.to(".page6>h1>span",{
    scrollTrigger:{
        trigger:`.page6>h1>span`,
        start:`top bottom`,  //first value is for element (top) and second is for screen (bottom)
        end:`bottom top`,
        scroller:`.main`,
        scrub:.5
    },
    stagger:.2,
    color:`#fff`
})


// page 7 canvas code

function canvas2(){
    
  const canvas = document.querySelector(".page7>canvas"); //select canvas 
const context = canvas.getContext("2d");  // select all the 2d tools to context


// setting canvas height and width 
canvas.width = window.innerWidth;  
canvas.height = window.innerHeight;



// set window height and width when it resizes
window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render(); //
});

function files(index) {
  // paste all images to data variable
var data = `
./media/seq1.webp
./media/seq2.webp
./media/seq3.webp
./media/seq4.webp
./media/seq5.webp
./media/seq6.webp
./media/seq7.webp
./media/seq8.webp
./media/seq9.webp
./media/seq10.webp
./media/seq11.webp
./media/seq12.webp
./media/seq13.webp
./media/seq14.webp
./media/seq15.webp
./media/seq16.webp
./media/seq17.webp
./media/seq18.webp
./media/seq19.webp
./media/seq20.webp
./media/seq21.webp
./media/seq22.webp
./media/seq23.webp
./media/seq24.webp
./media/seq25.webp
./media/seq26.webp
./media/seq27.webp
./media/seq28.webp
./media/seq29.webp
./media/seq30.webp
./media/seq31.webp
./media/seq32.webp
./media/seq33.webp
./media/seq34.webp
./media/seq35.webp
./media/seq36.webp
./media/seq37.webp
./media/seq38.webp
./media/seq39.webp
./media/seq40.webp
./media/seq41.webp
./media/seq42.webp
./media/seq43.webp
./media/seq44.webp
./media/seq45.webp
./media/seq46.webp
./media/seq47.webp
./media/seq48.webp
./media/seq49.webp
./media/seq50.webp
./media/seq51.webp
./media/seq52.webp
./media/seq53.webp
./media/seq54.webp
./media/seq55.webp
./media/seq56.webp
./media/seq57.webp
./media/seq58.webp
./media/seq59.webp
./media/seq60.webp
./media/seq61.webp
./media/seq62.webp
./media/seq63.webp
./media/seq64.webp
./media/seq65.webp
./media/seq66.webp
./media/seq67.webp
./media/seq68.webp
./media/seq69.webp
./media/seq70.webp
./media/seq71.webp
./media/seq72.webp
./media/seq73.webp
./media/seq74.webp
./media/seq75.webp
./media/seq76.webp
./media/seq77.webp
./media/seq78.webp
./media/seq79.webp
./media/seq80.webp
./media/seq81.webp
./media/seq82.webp
./media/seq83.webp
./media/seq84.webp
./media/seq85.webp
./media/seq86.webp
./media/seq87.webp
./media/seq88.webp
./media/seq89.webp
./media/seq90.webp
./media/seq91.webp
./media/seq92.webp
./media/seq93.webp
./media/seq94.webp
./media/seq95.webp
./media/seq96.webp
./media/seq97.webp
./media/seq98.webp
./media/seq99.webp
./media/seq100.webp
./media/seq101.webp
./media/seq102.webp
./media/seq103.webp
./media/seq104.webp
./media/seq105.webp
./media/seq106.webp
./media/seq107.webp
./media/seq108.webp
./media/seq109.webp
./media/seq110.webp
./media/seq111.webp
./media/seq112.webp
./media/seq113.webp
./media/seq114.webp
./media/seq115.webp
./media/seq116.webp
./media/seq117.webp
./media/seq118.webp
./media/seq119.webp
./media/seq120.webp
./media/seq121.webp
./media/seq122.webp
./media/seq123.webp
./media/seq124.webp
./media/seq125.webp
./media/seq126.webp
./media/seq127.webp
./media/seq128.webp
./media/seq129.webp
./media/seq130.webp
./media/seq128.webp
./media/seq129.webp
./media/seq130.webp
./media/seq131.webp
./media/seq132.webp
./media/seq133.webp
./media/seq134.webp
./media/seq135.webp
./media/seq136.webp
`;
return data.split("\n")[index];  // split data to next line and pass index to array
}

const frameCount = 140; // stops function at specified number of framecounts without depending on number of images in data variable

const images = []; // images comes here
const imageSeq = {
frame: 1, // specifies the frame from where to start on scrolling
};

for (let i = 0; i < frameCount; i++) {
const img = new Image();   // creates new image
img.src = files(i);  //setting source to image tag
images.push(img);  //pushes back to the array
}

gsap.to(imageSeq, {
frame: frameCount - 1,  //specifies the frame from where to start on scrolling
snap: "frame",  // eithor 1 or 2
ease: `none`,
scrollTrigger: {
  scrub: .5,
  trigger: `.page7`,
  //   set start end according to preference
  start: `top top`,
  end: `250% top`,
  scroller: `.main`,
},
onUpdate: render,  // after updation run the render function
});

images[1].onload = render;  //on loading run the first frame and the render function

function render() {
scaleImage(images[imageSeq.frame], context);  //(images[imageSeq.frame]-image address,context-conatins all 2d tools)
}

function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;  //horizontal ration
var vRatio = canvas.height / img.height; //vertical ratio
var ratio = Math.max(hRatio, vRatio);  // run the ratio which is bigger 
var centerShift_x = (canvas.width - img.width * ratio) / 2;  
var centerShift_y = (canvas.height - img.height * ratio) / 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);  //remove the last frame when next frame arrives
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);  // draw the next image
}
ScrollTrigger.create({

trigger: ".page7",
pin: true,
// markers:true,
scroller: `.main`,
//   set start end according to preference
start: `top top`,
end: `250% top`,
});

}
canvas2();


// page 7 circular animation

gsap.to(".page7-cir",{
  scrollTrigger:{
    trigger:`.page7-cir`,
    start:`top bottom`,
    end:`bottom top`,
    scroller:`.main`,
    scrub:.5
  },
  scale:2.6
})

gsap.to(".page7-cir-inner",{
  scrollTrigger:{
    trigger:`.page7-cir-inner`,
    start:`top bottom`,
    end:`bottom top`,
    scroller:`.main`,
    scrub:.5
  },
  backgroundColor: `#0a3bce91`
})