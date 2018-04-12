window.AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();
let analyser = null;
let mediaStreamSource = null;
let currentNotePitchDetected = "";

const error = () => {
    alert('Stream generation failed.');
}

const getUserMedia = (dictionary, callback) => {
    try {
        navigator.getUserMedia =
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;
        navigator.getUserMedia(dictionary, callback, error);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }
}

const gotStream = (stream) => {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    // Connect it to the destination.
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    mediaStreamSource.connect( analyser );
    updatePitch();
}

const toggleLiveInput = () => {
    getUserMedia(
    	{
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream);
}

const buflen = 1024;
const buf = new Float32Array( buflen );
const MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.
const GOOD_ENOUGH_CORRELATION = 0.9; // this is the "bar" for how close a correlation needs to be

const autoCorrelate = (buf, sampleRate) => {
	const SIZE = buf.length;
	const MAX_SAMPLES = Math.floor(SIZE/2);
	let best_offset = -1;
	let best_correlation = 0;
	let rms = 0;
	let foundGoodCorrelation = false;
	let correlations = new Array(MAX_SAMPLES);

	for (let i = 0; i < SIZE; i++) {
		let val = buf[i];
		rms += val * val;
	}
	rms = Math.sqrt(rms/SIZE);
	if (rms < 0.01) {  //not enough signal
    return -1;
  }
	let lastCorrelation = 1;
	for (let offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
		let correlation = 0;

		for (let i = 0; i < MAX_SAMPLES; i++) {
			correlation += Math.abs((buf[i])-(buf[i+offset]));
		}
		correlation = 1 - (correlation/MAX_SAMPLES);
		correlations[offset] = correlation; // store it, for the tweaking we need to do below.
		if ((correlation>GOOD_ENOUGH_CORRELATION) && (correlation > lastCorrelation)) {
			foundGoodCorrelation = true;
			if (correlation > best_correlation) {
				best_correlation = correlation;
				best_offset = offset;
			}
		} else if (foundGoodCorrelation) {
			// short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
			// Now we need to tweak the offset - by interpolating between the values to the left and right of the
			// best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
			// we need to do a curve fit on correlations[] around best_offset in order to better determine precise
			// (anti-aliased) offset.

			// we know best_offset >=1,
			// since foundGoodCorrelation cannot go to true until the second pass (offset=1), and
			// we can't drop into this clause until the following pass (else if).
			let shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];
			return sampleRate/(best_offset+(8*shift));
		}
		lastCorrelation = correlation;
	}
	if (best_correlation > 0.01) {
		return sampleRate/best_offset;
	}
	return -1;
}

const updatePitch = (time) => {
	analyser.getFloatTimeDomainData(buf);
	let ac = autoCorrelate(buf, audioContext.sampleRate);
 	if (ac == -1) {
    currentNotePitchDetected = "";
 	} else {
    currentNotePitchDetected = ac;
	}
}
