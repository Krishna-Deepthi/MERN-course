//creating and initializing an array
let subject=["python","c++","java","java","c"];
console.log("Original array:",subject);

//pushing an element into the array
subject.push("javascript");
console.log("array after pushing: ",subject);

//removing last element from the array
subject.pop();
console.log("array after popping:",subject);

//adding one or more element into the array
subject.unshift("python");
console.log("array after unsift operation:",subject);

//removing first element
console.log(subject.shift());//returns first element;
console.log("array after removing first element",subject)

//checking if an item exists
console.log("Includes 'php':", subject.includes("php"));

//checking index of first occurence of an element
console.log("Index of 'java':", subject.indexOf("java")); 

//checking index of last occurence of an element
console.log("Last index of 'java':", subject.lastIndexOf("java")); 

//sorting elements
console.log("sorted:",[...subject].sort());

//reversing an array
console.log("reversed:",[...subject].reverse());

//using map() to modify each item of an array
let upperSubject = subject.map(subjects => subjects.toUpperCase());
console.log("Uppercase subjects:", upperSubject);

//filtering and printing an array based on a condition
let filtered = subject.filter(subjects => subjects !== "java");
console.log("Filtered (no java):", filtered);  

//using join function to join the elements of an array using a separator
let joined = subject.join("$ ");
console.log("Joined:", joined); 

//reducing an array into sum of numbers
let nums=[1,2,3,4,5,6];
let sumOfNums=nums.reduce((acc,curr)=>acc+curr,0);
console.log("Sum of numbers:", sumOfNums);

//slicng an array 
console.log("Slice (0, 2):", subject.slice(0, 2));

//removing a particular item using its index value
subject.splice(0, 1);  
console.log("After splice (remove 1):", subject);