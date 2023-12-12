interface results {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: String,
    target: number,
    average: number
};

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

        })

        return success;
    })();

    const target: number = dailyHourTarget;

    const average: number = (() => {
        let sum: number = 0;
        
        workoutsHours.forEach(element => {
            sum += element;
        })

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

    const ratingDescription : String = (() => {
        let message: String = ''
        
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
