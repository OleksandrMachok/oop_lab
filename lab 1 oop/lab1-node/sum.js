const args = process.argv.slice(2);
const sum = args.reduce((accumulator, currentValue) =>{
    const number = Number(currentValue);
    return accumulator + number;
}, 0)
console.log(`Sum =${sum}`);