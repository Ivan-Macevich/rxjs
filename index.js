const { Observable } = require("rxjs");
const { pluck, map, filter } = require("rxjs/operators");

const users = {
  data: [
    {
      id: 1,
      status: "active",
      age: 14,
    },
    {
      id: 1,
      status: "inactive",
      age: 12,
    },
    {
      id: 1,
      status: "active",
      age: 42,
    }
  ],
};

const observable = new Observable((subscriber) => {
  subscriber.next(users);
}).pipe(
  map(value=>value.data),
  filter((users) => users.length >= 2),
  map((users) => {
    return users.filter((user) => user.status === "active");
  }),
  map((users) => {
    return users.reduce((sum, user) => sum + user.age, 0) / users.length;
  }),
  map((average) => {
    if (average < 18) throw new Error(`Average age is too small (${average})`);
    else return average;
  }),
  map((average) => `The average age is ${average}`)
);

const observer = {
  next: (x) => console.log("Observer got a next value: " + x),
  error: (err) => console.error("Observer got an error: " + err),
  complete: () => console.log("Observer got a complete notification"),
};

observable.subscribe(observer);

