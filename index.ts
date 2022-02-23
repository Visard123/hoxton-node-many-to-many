import Database from "better-sqlite3";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database("./data.db", {
  verbose: console.log,
});

const getAllApplicants = db.prepare(`
SELECT * FROM applicants;
`);
const getAllinterviewers = db.prepare(`
SELECT * FROM interviewers;
`);
const getAllInterviews = db.prepare(`
SELECT * FROM interviews;
`);

const getApplicantById = db.prepare(`
SELECT * FROM applicants WHERE id =?;
`);
const getIntervierById = db.prepare(`
SELECT * FROM interviewers WHERE id =?;
`);
const getInterviewById = db.prepare(`
SELECT * FROM interviews WHERE id =?;
`);
const getInterviewsById = db.prepare(`
SELECT * FROM interviews WHERE id =?;
`);
