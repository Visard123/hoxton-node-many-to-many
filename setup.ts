import Database from "better-sqlite3";
const db = new Database("./data.db", {
  verbose: console.log,
});
const interviewers = [
  { name: "Skenderbeu", email: "skender@mail.com" },
  { name: "Ismail", email: "ismail@mail.com" },
  { name: "Gjergj", email: "gjergj@mail.com" },
  { name: "Gent", email: "gent@mail.com" },
];

const applicants = [
  { name: "Pjeter", email: "pjeter@mail.com" },
  { name: "Gjon", email: "gjon@mail.com" },
  { name: "Leka", email: "leka@mail.com" },
  { name: "Aleks", email: "aleks@mail.com" },
  { name: "Teuta", email: "teuta@mail.com" },
];

const interviews = [
  {
    interviewerId: 1,
    applicantId: 1,
    score: 10,
    date: "15-02-2020",
  },
  {
    interviewerId: 1,
    applicantId: 3,
    score: 30,
    date: "15-02-2020",
  },
  {
    interviewerId: 1,
    applicantId: 2,
    score: 60,
    date: "16-02-2020",
  },
  {
    interviewerId: 2,
    applicantId: 4,
    score: 99,
    date: "16-02-2020",
  },
  {
    interviewerId: 3,
    applicantId: 5,
    score: 80,
    date: "17-02-2020",
  },
  {
    interviewerId: 2,
    applicantId: 1,
    score: 20,
    date: "18-02-2020",
  },
  {
    interviewerId: 2,
    applicantId: 3,
    score: 30,
    date: "19-02-2020",
  },
  {
    interviewerId: 1,
    applicantId: 5,
    score: 55,
    date: "19-02-2020",
  },
  {
    interviewerId: 4,
    applicantId: 1,
    score: 60,
    date: "20-02-2020",
  },
];

db.exec(`
  DROP TABLE IF EXISTS interviews;
  DROP TABLE IF EXISTS interviewers;
  DROP TABLE IF EXISTS applicants;
  CREATE TABLE IF NOT EXISTS interviewers (
    id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXISTS applicants (
    id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXISTS interviews (
    id INTEGER,
    interviewerId INTEGER NOT NULL,
    applicantId INTEGER NOT NULL,
    score INTEGER NOT NULL,
    date TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (interviewerId) REFERENCES interviewers(id),
    FOREIGN KEY (applicantId) REFERENCES applicants(id)
  );
  `);

const createInterviewer = db.prepare(`
  INSERT INTO interviewers (name, email) VALUES (?, ?);
  `);

const createApplicant = db.prepare(`
  INSERT INTO applicants (name, email) VALUES (?, ?);
  `);

const createInterview = db.prepare(`
  INSERT INTO interviews (interviewerId, applicantId, score, date)
  VALUES (?, ?, ?, ?);
  `);

for (const interviewer of interviewers) {
  createInterviewer.run(interviewer.name, interviewer.email);
}

for (const applicant of applicants) {
  createApplicant.run(applicant.name, applicant.email);
}

for (const interview of interviews) {
  createInterview.run(
    interview.interviewerId,
    interview.applicantId,
    interview.score,
    interview.date
  );
}
