import { useState } from "react";

function InputNumber(props) {
	const [value, setValue] = useState(0);

	function increment() {
		const max = props.maxValue;
		if (value >= max) return;
		setValue((value) => value + 1);
	}

	function increment10() {
		const max = props.maxValue;
		if (value == max) return;
		else if (value + 10 >= max) setValue(max);
		else setValue((value) => value + 10);
	}

	function decrement() {
		const min = props.minValue;
		if (value <= min) return;
		setValue((value) => value - 1);
	}
	
	function decrement10() {
		const min = props.minValue;
		if (value == min) return;
		else if (value - 10 <= min) setValue(0);
		else setValue((value) => value - 10);
	}

	function refillBtn() {
		const putOptions = {
			method: "PUT",
			headers: {
				"Content-Type": "text/plain",
				Authorization:
					"Basic ODFjZmNmZmEtZmE1Yy00OGE4LWI5ZWItMTY4ZDA0YjE0YjI5OkJQaEFaTGo0TnR3Tkg2WWMxRlhRMmVpaEJVZ2FuRHZn",
			},
			body: value.toString(),
		};
		fetch("https://api.netpie.io/v2/device/message?topic=fill", putOptions)
			.then((response) => response.json())
			.then((data) => console.log(data));
		setValue(0);
	}

	return (
		<div className="input-number">
			<button type="button" onClick={decrement10}>
				&#8722;10
			</button>
			<button type="button" onClick={decrement}>
				&#8722;
			</button>
			<span className="number">{value}</span>
			<span className="hidden" onClick={refillBtn}>
				Fill
			</span>
			<button type="button" onClick={increment}>
				&#43;
			</button>
			<button type="button" onClick={increment10}>
				&#43;10
			</button>
		</div>
	);
}

export default InputNumber;
