interface BMIValues {
  heightValue: number;
  weightValue: number;
}

const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightValue: Number(args[2]),
      weightValue: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBMI = (height: number, weight: number) => {
  if (weight === 0) throw new Error('Can\'t divide by 0!');
  const heightInMeters = height/100;
  const bmiValue = weight / (heightInMeters * heightInMeters);

    if (bmiValue < 18.5) {
      return 'Underweight';
    }
    else if (bmiValue > 18.5 && bmiValue < 25) {
      return 'Normal';
    }
    else if (bmiValue > 25 && bmiValue < 30) {
      return 'Overweight';
    }
    else {
      return 'Obese';
    }
};

try {
  const { heightValue, weightValue } = parseArguments(process.argv);
  calculateBMI(heightValue, weightValue);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}