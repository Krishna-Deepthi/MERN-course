//regular function
const person_details={
    name:"KD",
    age:18,
    greet:function(){
        console.log(`Hello ${this.name} of age ${this.age} is in regular function  `);
    }};
person_details.greet();

//arrow function
const animals={
    family:"cat",
    animal:"tiger",}
    const  greet=()=>{
        console.log("this is an arrow function.");
        console.log(`animal family:${animals.family} and animal is ${animals.animal}`);
    }

greet();
//regular vs arrow in set time out function
function TimerExample() {
  this.seconds = 0;

  setTimeout(function () {
    this.seconds++;
    console.log("Regular function seconds:", this.seconds); // this -> global or undefined in strict mode
  }, 1000);

  setTimeout(() => {
    this.seconds++;
    console.log("Arrow function seconds:", this.seconds); // this -> TimerExample
  }, 1000);
}
new TimerExample();
