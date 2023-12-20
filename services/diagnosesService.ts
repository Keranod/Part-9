import data from '../data/diagnoses';
import { Diagnosis } from '../src/types';

const Diagnoses: Diagnosis[] = data as Diagnosis[];

const getDiagnoses = (): Diagnosis[] => {
    return Diagnoses;
};

export default {
    getDiagnoses
};