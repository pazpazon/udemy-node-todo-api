// let sumSq = (x,y) => x*x+y*y;
let currySumSq = (x) => ((y) => x*x+y*y);

// console.log(`sumSq(3,4):${sumSq(3,4)}`);
console.log(`currySumSq(3)(4):${currySumSq(3)(4)}`);

let unCurrySumSq = (x,y) => currySumSq(x)(y);

console.log(`unCurrySumSq(3,4):${unCurrySumSq(3,4)}`);

// add = (a, b) => a + b
// curriedAdd = a => b => a + b

// add(5,6) === 11
// curriedAdd(5)(6) === 11

// uncurry(curry(add))(5,6) === 11
// curry(uncurry(curriedAdd))(5)(6) === 11
