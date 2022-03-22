import FPSMeter from "./fpsMeter"

const fpsMeter = new FPSMeter();
const root = document.querySelector('#root')
for(let i = 0; i < 22; i++) {
	const frame = document.createElement('div')
	frame.classList.add('box')
	frame.style.top = `${5 + i * 70}px`
	frame.style.willChange = 'transform'
	root.appendChild(frame)
}

// GOOD => rAF
/*let width = 15;
const frames = document.querySelectorAll('.box');
const animation = () => {
	let newWidth = width + 1;
	frames.forEach(frame => {
		frame.style.width = `${newWidth}px`
	})

	if(newWidth < 600) {
		width = newWidth
		requestAnimationFrame(animation);
	}
}

requestAnimationFrame(animation)*/

const observer = new PerformanceObserver(entries => entries.getEntries().forEach(entry => console.log(entry)));
observer.observe({entryTypes: ['measure']})
// BAD interval
fpsMeter.start()
const animation = setInterval(() => {
	performance.mark('a_start')
	const frames = document.querySelectorAll('.box');
	frames.forEach(frame => {
		frame.style.width = `${frame.clientWidth + 1}px`
	})

	if(parseInt(frames[0].style.width) > 600) {
		clearInterval(animation)
		fpsMeter.stop()
		console.log(fpsMeter.avg)
	}
	performance.mark('a_end')
	performance.measure('frame in millisec', 'a_start', 'a_end')
}, 16)

/*const width = 15;
let scale = 1;
const frames = document.querySelectorAll('.box');
const animation = () => {
	let newScale = scale + 1/width;
	frames.forEach(frame => {
		frame.style.transform = `scale(${newScale}, 1)`
	})

	if(newScale < 600) {
		scale = newScale
		requestAnimationFrame(animation);
	}
}

requestAnimationFrame(animation)*/