function greet(name, faculty) {
  return `สวัสดี ${name} จากคณะ ${faculty}!`;
}

const greet_modern = (name, faculty) => `สวัสดี ${name} จากคณะ ${faculty}!`; 

console.log(greet("Peter", "IT"));
console.log(greet_modern("Peter", "IT"));
