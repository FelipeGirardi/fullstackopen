interface ExerciseValues {
  targetValue: number;
  dailyHours: number[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNotNumber = (argument: any): boolean =>
  isNaN(Number(argument));

const parseArgs = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const targetNumber = args[2];
  if (isNotNumber(targetNumber)) throw new Error('Provided values were not numbers!');

  const hours = args.slice(3).map(str => {
    if (isNotNumber(str)) throw new Error('Provided values were not numbers!');
    return Number(str);
  });
  
  return {
    targetValue: Number(targetNumber),
    dailyHours: hours
  };
};


export const calculateExercises = (targetValue: number, dailyHours: number[]) => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(h => h !== 0).length;
    const sum = dailyHours.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    const average = sum/periodLength;
    const success = average >= targetValue ? 'true' : 'false';
    const averageDiff = average - targetValue;
    const rating = 
        averageDiff >= 0 ? 3
      : averageDiff < 0 && averageDiff >= -0.5 ? 2
      : 1;
    const ratingDescription = 
        rating === 3 ? 'You reached your target, good job!'
      : rating === 2 ? 'Not too bad, but could be better!'
      : 'Not very good, but you can improve!';

    return({
      'periodLength': periodLength,
      'trainingDays': trainingDays,
      'success': success,
      'rating': rating,
      'ratingDescription': ratingDescription,
      'target': targetValue,
      'average': average
    });
};

try {
  const { targetValue, dailyHours } = parseArgs(process.argv);
  calculateExercises(targetValue, dailyHours);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}