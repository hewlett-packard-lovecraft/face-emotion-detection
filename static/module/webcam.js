/**
 * webcam related code here
 * tfjs related code here
 */

import { VideoPlayerCanvas } from "./videoPlayerCanvas.js";

export class Webcam {
    constructor() {
        this.video = document.getElementById("video_player");
        this.vidCanvas = undefined;
        this.faceDetector = undefined;
    }

    async loadModels() {
        const faceDetectionModel = faceDetection.SupportedModels.MediaPipeFaceDetector;
        const detectorConfig = {
            runtime: 'mediapipe',
            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
        };

        this.faceDetector = await faceDetection.createDetector(faceDetectionModel, detectorConfig);
    }

    enableWebcam() {
        // request access to webcam
        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then((stream) => {

                // change source of vid to webcam
                this.video.srcObject = stream;

                // after the first frame loads successfully, play video
                this.video.addEventListener("loadeddata", () => {
                    this.video.muted = true;
                    this.video.play()

                    // canvas needs to resize itself to the same resolution as the video stream
                    // otherwise, it defaults to 300x150 pixels
                    this.vidCanvas = new VideoPlayerCanvas(this.video);

                    // breaks if not in arrow function
                    setInterval(() => {
                        this.renderBoxesEstimateEmotion()
                    }, 30);
                })
            })
            .catch(alert);
    }

    async renderBoxesEstimateEmotion() {
        const estimatedFaces = await this.faceDetector.estimateFaces(this.video);

        estimatedFaces.forEach((face) => {
            let faceTensor = this.vidCanvas.cropFace(face);
            this.vidCanvas.drawBoundingBox(face);

            console.log(faceTensor); // pass this tensor into the emotion classification model once we've selected one
        });

    }
}