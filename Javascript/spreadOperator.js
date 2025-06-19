//sum of array numbers without spread operator
function sum(a, b, c) {
  return a + b + c;
}

const nums = [1, 2, 3];
console.log("sum of numbers of nums without spread operator:")
sum(nums);

//sum of array numbers with spread operator
console.log("sum of numbers of nums with spread operator:")
console.log(sum(...nums)); 

 //copying values using spread operator
 const nums1=[...nums];
 nums1.unshift(0);
console.log("nums1 after inserting a number:",nums1)
 
//without spread operator
const nums2 = nums;
nums2.push(5);
console.log("nums after nums2:", nums); 

//spread operator with objects
obj1={name:"kd",age:18};
obj2={...obj1};
console.log("printing object 2 with spread operator:",obj2);
obj2.name="may";
console.log("printing object 2 after updating:",obj2);
console.log(" object 1 remains as it is:",obj1);


//without spread operator
obj3=obj1;
obj3.name="may";
console.log("printing object 1 after updating with object 3:",obj3);

//merging objects using spread operator
const merge={hobby:"painting"};
const merged={...obj1,...merge};
console.log("after merging:",merged);

//deep cloning using structuredClone()
const dog={
   owner:"kd",
   dogs:{
    dog1:"sweety",
    dog2:"lauv",
   }
};
const cloned=structuredClone(dog);
cloned.owner="may";
console.log("without clone:",dog.owner);
console.log("with clone:",cloned.owner);