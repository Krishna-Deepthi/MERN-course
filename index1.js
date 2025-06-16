/* a. Create a variable to store a person's name and age. Then log a greeting message using 
those variables.("Hello, my name is [name] and I am [age] years old.")*/

let name="Krishna Deepthi"
let age=18
console.log(`Hello, my name is ${name} and I am ${age} years old.`)

/* b. Declares variables of different data types: string, number, boolean, undefined, and 
null. Logs the value and its data type using typeof.*/

let var1="abc"
let var2=17
let var3=false
let var4;
let var5=null
console.log(`value=${var1} type=${typeof(var1)}`)
console.log(`value=${var2} type=${typeof(var2)}`)
console.log(`value=${var3} type=${typeof(var3)}`)
console.log(`value=${var4} type=${typeof(var4)}`)
console.log(`value=${var5} type=${typeof(var5)}`)

/* c. Given an array of numbers, return a new array with only the even numbers, and also 
log the sum of all numbers */

let array=[1,2,3,4,5]
for(var i=0;i<array.length;i++){
    if (array[i] % 2 === 0) {
        console.log(array[i]);
    }
}

 /* d.  Write a program to take a string, convert it to uppercase, reverse it, and count the 
number of vowels.*/
const readline = require("readline");
const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
r.question("Enter a string: ", function(input) {
   const upperCase = input.toUpperCase();
    console.log("Uppercase:", upperCase);
    const reversed = upperCase.split('').reverse().join('');
    console.log("Reversed:", reversed);
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    let count = 0;
    for (let char of upperCase) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    console.log("Number of vowels:", count);
    r.close();
});
