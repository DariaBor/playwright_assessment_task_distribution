import { faker } from '@faker-js/faker';

export const passengerFactory = () => ({
  name: faker.person.firstName(),
  surname: faker.person.lastName(),
  email: faker.internet.email(),
});
