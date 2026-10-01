// คำนวณค่าโดยสารรถ NGV ตามระยะทาง
const calcFare = (distanceKm) => {
	if (typeof distanceKm !== "number" || !Number.isFinite(distanceKm) || distanceKm < 0) {
		return 0;
	}

	const roundedDistance = Math.ceil(distanceKm);
	return roundedDistance <= 2 ? 10 : 10 + (roundedDistance - 2) * 2;
};

// ทดสอบกรณีสำคัญของ calcFare
const testCalcFare = () => {
	const testCases = [
		{ distance: 0, expected: 10 },
		{ distance: 2, expected: 10 },
		{ distance: 2.1, expected: 12 },
		{ distance: 4, expected: 14 },
		{ distance: -1, expected: 0 },
		{ distance: "2", expected: 0 },
		{ distance: NaN, expected: 0 },
		{ distance: Infinity, expected: 0 }
	];

	testCases.forEach(({ distance, expected }) => {
		console.assert(
			calcFare(distance) === expected,
			`calcFare(${distance}) ควรได้ ${expected}`
		);
	});
};

testCalcFare();
