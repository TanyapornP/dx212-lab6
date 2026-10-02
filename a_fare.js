/**
 * คำนวณค่าโดยสารรถ NGV
 * - 2 กม. แรก 10 บาท
 * - กม. ถัดไป กม.ละ 2 บาท (เศษปัดขึ้น)
 * - ค่าติดลบหรือไม่ใช่ตัวเลขคืนค่า 0
 */
const calcFare = (distanceKm) => {
  // ตรวจสอบค่าที่ไม่ใช่ตัวเลข หรือค่าน้อยกว่าหรือเท่ากับ 0
  if (typeof distanceKm !== 'number' || Number.isNaN(distanceKm) || distanceKm <= 0) {
    return 0;
  }

  const BASE_FARE = 10;
  const BASE_DISTANCE = 2;
  const RATE_PER_KM = 2;

  // ระยะทางไม่เกิน 2 กม. คิดราคาเริ่มต้น
  if (distanceKm <= BASE_DISTANCE) {
    return BASE_FARE;
  }

  // ปัดเศษกิโลเมตรส่วนที่เกินขึ้นเป็นจำนวนเต็ม
  const extraKm = Math.ceil(distanceKm - BASE_DISTANCE);
  return BASE_FARE + extraKm * RATE_PER_KM;
};

// ทดสอบการทำงาน 3 กรณี
console.log(calcFare(1.5)); // 10 (ไม่เกิน 2 กม.)
console.log(calcFare(2));   // 10 (พอดี 2 กม.)
console.log(calcFare(7.2)); // 22 (เกินมา 5.2 กม. ปัดเป็น 6 กม. -> 10 + 6*2)