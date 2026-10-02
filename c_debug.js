/*
const buses = [
  { route: "NGV-1", passengers: 45, late: false },
  { route: "NGV-2", passengers: 62, late: true },
  { route: "NGV-3", passengers: 38, late: true },
];

const lateRoutes = buses.filter(b => { b.late }).map(b => b.route);
const total = buses.reduce((sum, b) => sum + b.passengers);

console.log("สายที่มาสาย:", lateRoutes);
console.log("ผู้โดยสารรวม:", total);
// ควรได้ ["NGV-2", "NGV-3"]
// ควรได้ 145
*/

const buses = [
  { route: "NGV-1", passengers: 45, late: false },
  { route: "NGV-2", passengers: 62, late: true },
  { route: "NGV-3", passengers: 38, late: true },
];

// แก้ไข: ตัดปีกกาออกเพื่อให้คืนค่า boolean ทันที
const lateRoutes = buses.filter(b => b.late).map(b => b.route);

// แก้ไข: ใส่ 0 เป็น initialValue ต่อท้าย reduce
const total = buses.reduce((sum, b) => sum + b.passengers, 0);

console.log("สายที่มาสาย:", lateRoutes);
console.log("ผู้โดยสารรวม:", total);