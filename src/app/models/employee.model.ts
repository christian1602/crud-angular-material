export class Employee {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public dob: string,
    public gender: string,
    public education: string,
    public company: string,
    public experience: number,
    public packageOffered: number,
    public id?: number) { }
}
