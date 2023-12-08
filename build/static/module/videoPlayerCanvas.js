/**
 * all canvas-related methods here
 */

export class VideoPlayerCanvas {
    constructor(vid) {
        this.video = vid;
        this.canvas = document.getElementById("video_canvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = vid.videoWidth;
        this.canvas.height = vid.videoHeight;
    }

    drawBoundingBox(face, emotion) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.lineWidth = "2";
        this.ctx.strokeStyle = "red";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";


        this.ctx.beginPath();
        this.ctx.rect(face.box.xMin, face.box.yMin, face.box.width, face.box.height)
        this.ctx.stroke();

        this.ctx.fillText(emotion, face.box.xMin + face.box.width / 2, face.box.yMin + face.box.height / 2);
    }

    cropFace(face) {
        // find the bounding box coordinates of the face from faceDector
        // crop the face from the video stream and draw it onto the canvas
        this.ctx.drawImage(this.video, face.box.xMin, face.box.yMin, face.box.width, face.box.height);

        // crop face from canvas and convert into format ImageData
        const faceImageData = this.ctx.getImageData(face.box.xMin, face.box.yMin, face.box.width, face.box.height);
        const faceTensor = tf.browser.fromPixels(faceImageData);

        // erase face bounding box from canvas
        this.ctx.clearRect(face.box.xMin, face.box.yMin, face.box.width, face.box.height);

        return faceTensor;
    }
}