
status_of_coco = "";

function setup(){
    canvas = createCanvas(600,400);
    canvas.position(475,315);
    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video,0,0,600,500);
    if(status1!=""){
        objectDetector.detect(video,gotresults);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Staus = Object Detected";
            noFill();
            stroke("red");
            textSize(20);
            percent = Math.floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+" "+"%",objects[i].x,objects[i].y);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            console.log(text1);
            if(objects[i].label==text1){
                console.log("HIIIII");
                video.stop();
                objectDetector.detect(gotresults);
                document.getElementById("detected_or_not").innerHTML = text1+" Found";
                synth = window.speechSynthesis; utterThis = new SpeechSynthesisUtterance(text1 + "Found"); synth.speak(utterThis);
            }
            else{
                document.getElementById("detected_or_not").innerHTML = "Object Not Found";
            }
        }
    }
}

status1 = "";
objects = [];
text1 = "";
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "Status = Detecting Object"
    text1 = document.getElementById("text1").value;
}

function modelloaded(){
    console.log("Modelloaded!!");
    status1 = true;
}

function gotresults(error,results){
    if(error){
        console.log(error);

    }
    else{
        console.log(results);
        objects = results;
    }
}