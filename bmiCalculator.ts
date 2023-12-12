const bmiMessage = (bmi: number) : String => {
    let message: String = "";
    switch(true) {
        case (bmi < 16):
            message = "Underweight (Severe thinness)";
            break;
        case (bmi < 16.9):
            message = "Underweight (Moderate thinness)";
            break;
        case (bmi < 18.4):
            message = "Underweight (Mild thinness)";
            break;
        case (bmi < 24.9):
            message = "Normal range";
            break;
        case (bmi < 29.9):
            message = "Overweight (Pre-obese)";
            break;
        case (bmi < 34.9):
            message = "Obese (Class I)";
            break;
        case (bmi < 39.9):
            message = "Obese (Class II)";
            break;
        case (bmi >=40 ):
            message = "Obese (Class III)"
            break;
        default:
            throw new Error("bmiMessage switch case error");
    };

    return message;
};

const calculateBmi = (height: number, weight: number) : String => {
    const heightInMeters = height/100;

    const heightInMetersSquare = heightInMeters * heightInMeters;

    const bmi = weight/heightInMetersSquare;

    return bmiMessage(bmi);
};

console.log(calculateBmi(180, 74));