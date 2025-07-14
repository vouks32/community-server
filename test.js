let a = [
    {num: 1},
    {num: 2},
    {num: 3},
    {num: 4},
]

let b = {
    name : "xx"
}

console.log([...a, {num: 4}])
console.log({...b, namez: "er"})