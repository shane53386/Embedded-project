import "./App.css";
import React, { useState, useEffect } from "react";
import InputNumber from "./button";

function App() {
	const token =
		"Basic ODFjZmNmZmEtZmE1Yy00OGE4LWI5ZWItMTY4ZDA0YjE0YjI5OkJQaEFaTGo0TnR3Tkg2WWMxRlhRMmVpaEJVZ2FuRHZn";

	const [amount, setAmount] = useState(null);
	const [humid, setHumid] = useState(null);
	const [temp, setTemp] = useState(null);
	const treshold = { amount: -10, humid: 50, temp: 30 };

	let root = document.documentElement;

	const getOptions = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	};

	useEffect(() => {
		const interval = setInterval(() => {
			fetch(
				"https://api.netpie.io/v2/device/shadow/data?alias=nodeMCU",
				getOptions
			)
				.then((response) => response.json())
				.then((data) => {
					setAmount(parseInt(data.data.amount));
					setHumid(parseInt(data.data.humid));
					setTemp(parseInt(data.data.temp));
				});
		}, 1000);
		return () => clearInterval(interval);
	});

	useEffect(() => {
		const obj = { amount: -amount, humid: humid, temp: temp };
		Object.entries(obj).map(([key, val]) => {
			if (val > treshold[key])
				document.getElementById(key).classList.add("warning");
			else document.getElementById(key).classList.remove("warning");
		});
		root.style.setProperty("--amount", 440 - (440 * amount) / 40);
		root.style.setProperty("--humid", -0.5 * humid - 50 + "%");
		root.style.setProperty("--temp", 2 * temp + "px");
	}, [amount, humid, temp]);

	return (
		<div className="body">
			<div className="app-container">
				<div className="app-box" id="amount">
					<h2>Amount</h2>
					<div className="data">
						<svg>
							<circle r="70" />
							<circle r="70" />
						</svg>
						<h2 className="percent">{amount}</h2>
					</div>
				</div>
				<div className="app-box" id="humid">
					<h2>Humidity</h2>
					<div className="data">
						<div className="water">
							<div className="wave" />
						</div>
						<h2 className="percent">{humid}</h2>
					</div>
				</div>
				<div className="app-box" id="temp">
					<h2>Temperature</h2>
					<div className="data">
						<div className="bar" div />
						<div className="circle" div />
						<h2 className="percent" id="tempPercent">
							{temp}
						</h2>
					</div>
				</div>
			</div>
			<div className="footer">
				<InputNumber minValue={0} maxValue={40 - amount} />
			</div>
		</div>
	);
}

export default App;
