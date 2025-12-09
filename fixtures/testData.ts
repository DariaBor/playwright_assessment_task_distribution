function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.getDate().toString();
}

export const searchTestData = {
  departure: 'Paris Beauvais Airport, FR',
  arrival: 'Paris La Defense Terminal Jules Verne, FR',
  date: getTomorrowDate(),
};

export const searchTestDataAlternative = {
  departure: 'Paris Beauvais Airport, FR',
  arrival: 'Paris, Saint-Denis Université, FR',
  date: getTomorrowDate(),
};
