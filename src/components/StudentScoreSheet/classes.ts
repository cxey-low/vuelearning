export class ExamDate {
  date: Date
  name: string
  constructor(date: Date, name: string) {
    this.date = date
    this.name = name
  }
}

export class Student {
  name: string
  score: number

  constructor(name: string, score: number) {
    this.name = name
    this.score = score
  }
}
export class Group {
  students: Student[] = []
  id: number
  average: number = 0

  constructor(students: Student[], id: number) {
    this.id = id
    if (students != null) {
      this.students = students
      this.setAverage()
    }
  }

  setAverage() {
    let a = 0
    this.students.forEach((s) => {
      a += s.score
    })
    this.average = Number((a / this.students.length).toFixed(2))
  }

  push(student: Student) {
    this.students.push(student)
    return this
  }
}
export class StudentList {
  students: Student[]
  date: ExamDate
  average: number

  constructor(students: Student[], date: ExamDate) {
    this.date = date
    this.students = students

    let a = 0
    students.forEach((s) => {
      a += s.score
    })
    this.average = Number((a / students.length).toFixed(2))
  }

  addGroup(group: Group) {
    this.students = this.students.concat(this.students, group.students)
    return this
  }

  addGroups(groups: Group[]) {
    groups.forEach((f) => {
      this.addGroup(f)
    })
    return this
  }
}
export class Sheet {
  groups: Group[]
  date: ExamDate
  sort: Group[]

  constructor(groups: Group[], date: ExamDate|null) {
    this.groups = groups

    this.date = date?date:new ExamDate(new Date(), Date())

    this.sort = this.groups.sort((x, y) => {
      return x.average - y.average
    })
  }
}
