import { Button } from "react-bootstrap";
export const patients = [
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
  { name: "test", age: "22", address: "123 1st st" },
];
const detailsButton = () => {
  return <Button>Details</Button>;
};
export const patientHeaders = [
  { field: "name" },
  { field: "age" },
  { field: "address" },
  { field: "detials", cellRenderer: detailsButton },
];
