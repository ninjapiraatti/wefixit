
// variable to store HTML5 audio element

var samples = document.querySelectorAll(".play-button");
for (var i = 0; i < samples.length; i++) {
	samples[i].addEventListener("click", playAudio);
}

function playAudio() {
  var sample = document.querySelector("audio#" + this.getAttribute("data-sample"));
	if (sample) {
		if (sample.paused) {
			sample.play();
			this.classList.add("play-button--playing");
			this.classList.remove("play-button--paused");
		} else {
			sample.pause();
			this.classList.add("play-button--paused");
			this.classList.remove("play-button--playing");
		}
	}
}
