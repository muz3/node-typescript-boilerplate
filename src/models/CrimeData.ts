import mongoose from 'mongoose';

export interface ICrimeData extends mongoose.Document {
  country: string;
  year: string;
  count: string;
  rate: string;
  source: string;
  source_type: string;
}

const crimeDataSchema: mongoose.Schema = new mongoose.Schema({
  country: String,
  year: String,
  count: String,
  rate: String,
  source: String,
  source_type: String,
});

export const CrimeData: mongoose.Model<ICrimeData> = mongoose.model<ICrimeData>(
  'CrimeData',
  crimeDataSchema,
);
