import data from '../../data/diagnoses';
import { Diagnosis } from '../types';

const Diagnoses: Diagnosis[] = data as Diagnosis[];

const getDiagnoses = (): Diagnosis[] => {
    return Diagnoses;
};

export default {
    getDiagnoses
};