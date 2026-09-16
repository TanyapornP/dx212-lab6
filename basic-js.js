let name = "Peter";
let age = 20;
let graduated = true;
let gpa = 3.75;


let student1 = {
    name : "Manee",
    age : 19,
    graduated : true,
    gpa : 2.65 
};
// object

let student2 = {
    name : name,
    age : age,
    graduated : graduated,
    gpa : gpa 
};
console.log(student1.name);
console.log(student2);

let grades = ["A","B","C","D","F"];
let scores = [90,80,70,60,50];
let students =["student1","student2"];
//Array
console.log(students[1].gpa);

function calculateGrade(score){
    if (score>=90){
        return "A";
    } else if (score >=80){
        return "B"
    } else if (score>=70){
        return "C";
    } else {
        return "F";
    }
}
console.assertlog(calculateGrade(90))

for (let i=0 ; i<scores.length;mi++){
    let grade = calculateGrade(scores[i]);
    console.log(`Score: ${scores[i]},Grade:${grade}`)
}
    
