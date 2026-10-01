// คำนวณค่าโดยสารรถ NGV ในมหาวิทยาลัย
// 2 กม.แรก 10 บาท, กม.ถัดไป กม.ละ 2 บาท
const calcFare = (distanceKm) => {
  // ระยะทางติดลบหรือไม่ใช่ตัวเลข ให้คืน 0
  if (typeof distanceKm !== 'number' || distanceKm < 0 || Number.isNaN(distanceKm)) {
    return 0;
  }
  // เศษของกิโลเมตรปัดขึ้น
  const km = Math.ceil(distanceKm);
  // 2 กม.แรก 10 บาท, กม.ถัดไป กม.ละ 2 บาท
  if (km <= 2) return 10;
  return 10 + (km - 2) * 2;
};

// ตัวอย่างการเรียกใช้งาน
console.log(calcFare(1));   // 10
console.log(calcFare(2));   // 10
console.log(calcFare(2.1)); // 12 (ปัดขึ้นเป็น 3 กม.)
console.log(calcFare(5));   // 16
console.log(calcFare(5.7)); // 18 (ปัดขึ้นเป็น 6 กม.)
console.log(calcFare(-3));  // 0 (ติดลบ)
console.log(calcFare('abc')); // 0 (ไม่ใช่ตัวเลข)