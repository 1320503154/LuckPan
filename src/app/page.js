"use client";
import React, { useState, useEffect, useRef } from "react";
import { AlertCircle, Copy, Play, Pause } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const RandomNumberGenerator = () => {
	const [count, setCount] = useState(5);
	const [min, setMin] = useState(1);
	const [max, setMax] = useState(50);
	const [delay, setDelay] = useState(2000);
	const [unique, setUnique] = useState(true);
	const [numbers, setNumbers] = useState([]);
	const [wheelNumbers, setWheelNumbers] = useState([]);
	const [error, setError] = useState("");
	const [copied, setCopied] = useState(false);
	const [isSpinning, setIsSpinning] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);
	const wheelRef = useRef(null);
	const generatorRef = useRef(null);

	const generateNumber = () => {
		if (min > max) {
			setError("最小值不能大于最大值");
			return null;
		}
		if (unique && wheelNumbers.length >= max - min + 1) {
			setError("唯一模式下，已经生成了所有可能的数字");
			setIsGenerating(false);
			return null;
		}
		setError("");

		let num;
		do {
			num = Math.floor(Math.random() * (max - min + 1)) + min;
		} while (unique && wheelNumbers.includes(num));

		return num;
	};

	const addNumberToWheel = (num) => {
		if (num !== null) {
			setWheelNumbers((prev) => {
				const newNumbers = [num, ...prev.slice(0, count - 1)];
				setNumbers(newNumbers);
				return newNumbers;
			});
			setIsSpinning(true);
			setTimeout(() => setIsSpinning(false), 1000);
		}
	};

	const startGenerating = () => {
		setIsGenerating(true);
		setWheelNumbers([]);
		setNumbers([]);
		let generatedCount = 0;
		generatorRef.current = setInterval(() => {
			if (generatedCount < count) {
				const newNum = generateNumber();
				addNumberToWheel(newNum);
				generatedCount++;
			} else {
				stopGenerating();
			}
		}, delay);
	};

	const stopGenerating = () => {
		setIsGenerating(false);
		if (generatorRef.current) {
			clearInterval(generatorRef.current);
		}
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(numbers.join(" "));
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	useEffect(() => {
		if (isSpinning && wheelRef.current) {
			wheelRef.current.style.transform = `rotate(${
				360 * 5 + Math.random() * 360
			}deg)`;
		}
	}, [isSpinning]);

	useEffect(() => {
		return () => {
			if (generatorRef.current) {
				clearInterval(generatorRef.current);
			}
		};
	}, []);

	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
			<div className="container mx-auto p-4">
				<h1 className="text-5xl font-bold mb-6 text-center text-blue-600">
					幸运抽奖
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
					<div>
						<label className="block mb-2 font-semibold">最小值:</label>
						<input
							type="number"
							value={min}
							onChange={(e) => setMin(Number(e.target.value))}
							className="border p-2 w-full rounded text-xl"
						/>
					</div>

					<div>
						<label className="block mb-2 font-semibold">最大值:</label>
						<input
							type="number"
							value={max}
							onChange={(e) => setMax(Number(e.target.value))}
							className="border p-2 w-full rounded text-xl"
						/>
					</div>

					<div>
						<label className="block mb-2 font-semibold">抽奖数量:</label>
						<input
							type="number"
							value={count}
							onChange={(e) => setCount(Number(e.target.value))}
							className="border p-2 w-full rounded text-xl"
						/>
					</div>

					<div>
						<label className="block mb-2 font-semibold">延迟时间 (毫秒):</label>
						<input
							type="number"
							value={delay}
							onChange={(e) => setDelay(Number(e.target.value))}
							className="border p-2 w-full rounded text-xl"
						/>
					</div>

					<div>
						<label className="block mb-2 font-semibold">是否唯一:</label>
						<select
							value={unique.toString()}
							onChange={(e) => setUnique(e.target.value === "true")}
							className="border p-2 w-full rounded text-xl">
							<option value="true">唯一</option>
							<option value="false">不唯一</option>
						</select>
					</div>
				</div>

				<div className="flex justify-center space-x-4 mb-6">
					<button
						onClick={isGenerating ? stopGenerating : startGenerating}
						className={`${
							isGenerating ? "bg-red-500" : "bg-blue-500"
						} text-white p-4 rounded-full flex items-center text-2xl font-bold transition-all duration-300 hover:scale-110`}>
						{isGenerating ? (
							<Pause className="mr-2 h-8 w-8" />
						) : (
							<Play className="mr-2 h-8 w-8" />
						)}
						{isGenerating ? "停止抽奖" : "开始抽奖"}
					</button>

					<button
						onClick={copyToClipboard}
						className="bg-green-500 text-white p-4 rounded-full flex items-center text-2xl font-bold transition-all duration-300 hover:scale-110"
						disabled={numbers.length === 0}>
						<Copy className="mr-2 h-8 w-8" /> {copied ? "已复制!" : "复制结果"}
					</button>
				</div>

				{error && (
					<Alert
						variant="destructive"
						className="mb-6">
						<AlertCircle className="h-6 w-6" />
						<AlertDescription className="text-lg">{error}</AlertDescription>
					</Alert>
				)}
			</div>

			<div className="flex-grow flex flex-col md:flex-row">
				{numbers.length > 0 && (
					<div className="flex-1 p-6 bg-gradient-to-br from-yellow-200 to-orange-200">
						<h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
							抽奖结果:
						</h2>
						<div className="flex flex-wrap justify-center">
							{numbers.map((number, index) => (
								<div
									key={index}
									className="w-36 h-36 m-2 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center">
									<span className="text-6xl md:text-8xl font-bold text-black">
										{number}
									</span>
								</div>
							))}
						</div>
					</div>
				)}

				<div className="flex-1 p-6 bg-gradient-to-br from-blue-200 to-purple-200">
					<h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
						幸运轮盘
					</h2>
					<div
						className="relative w-full max-w-[600px] mx-auto"
						style={{ aspectRatio: "1 / 1" }}>
						<div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
						<div
							ref={wheelRef}
							className="absolute inset-0 transition-transform duration-1000"
							style={{ transformOrigin: "center" }}>
							{wheelNumbers.map((number, index) => (
								<div
									key={index}
									className="absolute w-full h-full flex items-center justify-center"
									style={{
										transform: `rotate(${
											index * (360 / wheelNumbers.length)
										}deg)`,
									}}>
									<span
										className="absolute transform -translate-y-1/2 text-4xl font-bold"
										style={{
											top: "10%",
											left: "50%",
											backgroundColor: `hsl(${index * 30}, 70%, 50%)`,
											padding: "8px 16px",
											borderRadius: "9999px",
											color: "white",
										}}>
										{number}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RandomNumberGenerator;
