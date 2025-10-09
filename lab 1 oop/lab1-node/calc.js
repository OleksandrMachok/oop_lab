const [operation, aStr, bStr] = process.argv.slice(2);
const a = Number(aStr);
const b = Number(bStr);

let result;

if (!operation || isNaN(a) || isNaN(b)) {
    console.log("Неправильний формат.");
    return;
}
switch (operation.toLowerCase()){
    case "add":
        result = a + b;
        break;
    case "sub":
        result = a - b;
        break;
    case "mul":
        result = a * b;
        break;
    case "div":
        if (b === 0) {
            result = "На нуль ділити не можна";
        } else{
             result = a / b;
        }
        break;
    default:
        console.log('евідома операція"${operation}"');

        
       
}
console.log(`Result =${result}`);