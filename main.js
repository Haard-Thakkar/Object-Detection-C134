function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    // objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    // openGL or cocossd
    // document.getElementById("status").innerHTML = "Status : Detecting Objects";
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

}
objects = [];
img = "";
current_status = "";

function modelLoaded() {
    console.log("Model Loaded!");
    current_status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    objects = result;
}

function preload(){
    // img = loadImage("testing_img.jpg");
    // video = createCapture(VIDEO);
    // video.hide();
}

function draw() {
    image(video, 0, 0, 380, 380);
    
    if (current_status != "") {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            // randomColor = Math.floor(Math.random()*16777215).toString(16);
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected : "+ objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label.toUpperCase() + " " + percent + "%", objects[i].x+10, objects[i].y+10);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x-40, objects[i].y-40, objects[i].width-40, objects[i].height-40);
            
        }
    }

}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}