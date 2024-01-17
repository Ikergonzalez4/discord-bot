const sum = (num1, num2, message) => {
    const result = num1 + num2;
    message.reply(`The result of the sum is: ${result}`);
  };
  
  const subtract = (num1, num2, message) => {
    const result = num1 - num2;
    message.reply(`The result of the subtraction is: ${result}`);
  };
  
  const multiply = (num1, num2, message) => {
    const result = num1 * num2;
    message.reply(`The result of the multiplication is: ${result}`);
  };
  
  const divide = (num1, num2, message) => {
    if (num2 === 0) {
      message.reply(`Cannot divide by zero.`);
    } else {
      const result = num1 / num2;
      message.reply(`The result of the division is: ${result}`);
    }
  };
  
  module.exports = { 
    name: "calcs",
    aliases: ["calc", "calculator"],
    desc: "Calculator",
    sum, subtract, multiply, divide 
  };