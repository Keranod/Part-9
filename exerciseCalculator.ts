interface results {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

// const parseArguments = (args: string[]): number[] => {
//     const argsLength = args.length;

//     const parsedArguments: number[] = [];
    
//     let errorMessage: string = '';

//     if (argsLength < 4) throw new Error('Not enough arguments');

//     for(let i = 2; i < argsLength; i++) {
//         if (!isNaN(Number(args[i]))) {
//             parsedArguments.push(Number(args[i]));
//         }
//         else {
//             errorMessage += `${i}, `;
//         }
//     }

//     if (errorMessage !== '') {
//         throw new Error(`Values no.: ${errorMessage}are not numbers!`);
//     }

//     return parsedArguments;
// };

const calculateExercises = (workoutsHours: number[], dailyHourTarget: number): results => {
    const periodLength: number = workoutsHours.length;
    
    const trainingDays: number = (() => {
        let trainingDaysCount: number = 0;

        workoutsHours.forEach(element => {
            if (element > 0) {
                trainingDaysCount += 1;
            }
        });

        return trainingDaysCount;
    })();

    const success: boolean = (() => {
        let success: boolean = true;
        
        workoutsHours.forEach(element => {
            if (element < dailyHourTarget) {
                success = false;
                return;
            }

        });

        return success;
    })();

    const target: number = dailyHourTarget;

    const average: number = (() => {
        let sum: number = 0;
        
        workoutsHours.forEach(element => {
            sum += element;
        });

        return sum / periodLength;
    })();

    const rating: number = (() => {
        let rating: number = 0;

        const skippedDays: number = periodLength - trainingDays;

        if (skippedDays === 0) {
            rating = 3;
        }
        else if (skippedDays < 3) {
            rating = 2;
        }
        else {
            rating = 1;
        }

        if ((dailyHourTarget - average) > 0.5) {
            rating -= 1;
        }
        
        if (rating < 1) {
            rating = 1;
        }

        return rating;
    })();

    const ratingDescription : string = (() => {
        let message: string = '';
        
        if (rating === 3) {
            message = 'Good job! Keep it up!';
        }
        else if (rating === 2) {
            message = 'Not to shabby, but could be better.';
        }
        else if (rating === 1) {
            message = 'My am disappointed is immeasurable.';
        }

        return message;
    })();

    const results: results = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };

    return results;
};

// try {
//     const parsedArguments: number[] = parseArguments(process.argv);
//     const dailyHourTarget: number = (() => {
//         const poppedElement = parsedArguments.pop();
//         if (poppedElement === undefined) {
//             throw new Error(`Last element in the parsedArguments array is undefined`);
//         }
//         return poppedElement;
//     })();
//     const workoutsHours: number[] = parsedArguments;
//     console.log(calculateExercises(workoutsHours, dailyHourTarget));
// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.';
//     if (error instanceof Error) {
//       errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
//   }

export default calculateExercises;