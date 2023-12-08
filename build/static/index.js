import { Webcam } from "./module/webcam.js";

const app = async () => {
    const button = document.getElementById("but");
    const cam = new Webcam();

    cam.loadModels().then(
        () => {
            button.addEventListener("click", () => {
                cam.enableWebcam();
            });
        }
    )

};


await app();
