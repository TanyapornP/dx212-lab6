/**
 * แนะนำคลิปออกกำลังกายตามระดับพลังงานและเวลาว่างที่ยืดหยุ่น
 * @param {Array<Object>} videoList - รายการคลิปทั้งหมด
 * @param {number} userEnergy - ระดับพลังงานของผู้ใช้ (0 - 100)
 * @param {number} availableMinutes - เวลาว่างที่มี (นาที)
 * @returns {Array<Object>} รายการคลิปที่ผ่านเกณฑ์แบบคละลำดับ
 */
const recommendWorkoutVideos = (videoList = [], userEnergy = 50, availableMinutes = 30) => {
  // Edge Case: ข้อมูลไม่ถูกต้อง คืนค่า array ว่างทันที
  if (
    !Array.isArray(videoList) ||
    typeof userEnergy !== "number" ||
    typeof availableMinutes !== "number" ||
    availableMinutes <= 0
  ) {
    return [];
  }

  // 1. ตรึงระดับพลังงานให้อยู่ในช่วง 0 - 100%
  const energy = Math.min(Math.max(userEnergy, 0), 100);

  // 2. ช่วงความเหนื่อยที่ยอมรับได้ (เปิด window ยืดหยุ่น ±15%)
  const minIntensity = Math.max(0, energy - 15);
  const maxIntensity = Math.min(100, energy + 15);

  // 3. กำหนดเพดานเวลาแบบยืดหยุ่น: หากพลังงานน้อย (< 30%) ลดเวลาคลิปลงเหลือไม่เกิน 70% ของเวลาว่าง
  const maxAllowedDuration = energy < 30
    ? Math.max(5, Math.floor(availableMinutes * 0.7))
    : availableMinutes;

  // 4. กรองคลิปที่ผ่านเกณฑ์ความเหนื่อยและระยะเวลา
  const matched = videoList.filter((video) => {
    // รองรับทั้งคลิปจากระบบ (recommendedIntensity) และคลิปที่ผู้ใช้เพิ่มเอง (intensity)
    const intensity = video.intensity ?? video.recommendedIntensity ?? 50;
    const duration = video.durationMinutes ?? 0;

    return (
      intensity >= minIntensity &&
      intensity <= maxIntensity &&
      duration <= maxAllowedDuration
    );
  });

  // 5. คละลำดับผลลัพธ์ (Fisher-Yates Shuffle)
  const result = [...matched];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};

// ==========================================
// ข้อมูลจำลอง (Mock Data)
// ==========================================
const mockVideos = [
  { id: 1, title: "ยืดเส้นเบาๆ คลายปวดเมื่อย", recommendedIntensity: 15, durationMinutes: 10 },
  { id: 2, title: "โยคะบนเตียงก่อนนอน (Custom)", intensity: 20, durationMinutes: 12 },
  { id: 3, title: "Low-Impact Cardio เดินเบิร์น", recommendedIntensity: 45, durationMinutes: 20 },
  { id: 4, title: "พิลาทิสเพิ่มความกระชับ (Custom)", intensity: 50, durationMinutes: 25 },
  { id: 5, title: "HIIT เผาผลาญเต็มพิกัด", recommendedIntensity: 85, durationMinutes: 20 },
  { id: 6, title: "Tabata 4 นาทีเร่งด่วน", recommendedIntensity: 90, durationMinutes: 4 },
];

// ==========================================
// การทดสอบ 3 กรณี
// ==========================================

// กรณีที่ 1: เพิ่งถึงบ้าน เหนื่อยมาก (พลังงาน 20%, เวลาว่าง 20 นาที)
// เพดานเวลาจะปรับลงเหลือ 14 นาที และคัดความเหนื่อยช่วง 5 - 35
console.log("--- กรณีที่ 1: พลังงานน้อย (20%), เวลา 20 นาที ---");
const testCase1 = recommendWorkoutVideos(mockVideos, 20, 20);
console.log(testCase1.map((v) => `${v.title} [เหนื่อย: ${v.intensity ?? v.recommendedIntensity}, เวลา: ${v.durationMinutes}น.]`));

// กรณีที่ 2: พลังงานเต็มที่ อยากออกกำลังกายหนัก (พลังงาน 85%, เวลาว่าง 30 นาที)
// คัดความเหนื่อยช่วง 70 - 100 และเวลาคลิปไม่เกิน 30 นาที
console.log("\n--- กรณีที่ 2: พลังงานสูง (85%), เวลา 30 นาที ---");
const testCase2 = recommendWorkoutVideos(mockVideos, 85, 30);
console.log(testCase2.map((v) => `${v.title} [เหนื่อย: ${v.intensity ?? v.recommendedIntensity}, เวลา: ${v.durationMinutes}น.]`));

// กรณีที่ 3: Edge Case (เวลาว่างติดลบ หรือส่งข้อมูลผิดประเภท)
// ฟังก์ชันต้อง handle ข้อผิดพลาดได้และคืนค่า [] โดยไม่ crash
console.log("\n--- กรณีที่ 3 (Edge Case): เวลาว่างติดลบ (-10 นาที) และไม่มีคลิปตรงเงื่อนไข ---");
const testCase3 = recommendWorkoutVideos(mockVideos, 50, -10);
console.log("ผลลัพธ์:", testCase3); // ได้ []