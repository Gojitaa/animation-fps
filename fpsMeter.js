class FpsMeter {
	constructor(){
		this.fpsCollection = []
		this.metrics = []
		this.shouldMeasure = false;
		this.measureFps = this.measure.bind(this)
	}

	measure(now) {
		if(this.metrics.length && this.metrics[0] + 1000 <= now) {
			const fps = this.metrics.length;
			this.fpsCollection.push(fps)
			this.metrics.shift()
		}

		this.metrics.push(now)

		if(this.shouldMeasure) {
			requestAnimationFrame(this.measureFps)
		}
	}

	start(){
		this.shouldMeasure = true;
		requestAnimationFrame(this.measureFps);
	}

	stop(){
		this.shouldMeasure = false;
	}

	get avg(){
		if(this.shouldMeasure) {
			throw new Error('Measurement is still running')
		}
		const collection = this.fpsCollection;
		return collection.reduce((sum, fps) => sum += fps, 0) / collection.length;
	}
}

export default FpsMeter;