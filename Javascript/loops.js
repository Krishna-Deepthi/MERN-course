//for loop
for (let i=1;i<10;i++ ){
    console.log("for loop count:",i);
}

//while loop
var choice="y";
while(choice=="y"){
    console.log("the while loop");
    choice="n";
}

//do while
var i=10;
do{
    console.log("the do while:",i);
    i--;
}while(i>0);

//for...of loop
const subjects=["python","c++","java","java","c"];
for (const subject of subjects){
  console.log("subject:", subject);
}

//for...in loop 
const student = { name: "KD", age: 18 };

for (const key in student) {
  console.log(key, ":", student[key]);
}

//forEach
const chars = ["a", "b", "c", "d"];
chars.forEach((char, index) => {
  console.log(`Index ${index}:`, char);
});