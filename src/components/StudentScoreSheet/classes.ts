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

  constructor(students: Student[] | null, id: number) {
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
    return this
  }

  push(student: Student) {
    if (!this.students) {
      this.students = [student]
      return this
    } else {
      this.students.push(student)
      return this
    }
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
  groups: Group[] | null
  date: ExamDate | null
  sort: Group[] | null

  constructor(groups: Group[] | null, date: ExamDate | null) {
    this.groups = groups

    this.date = date ? date : new ExamDate(new Date(), Date())

    this.sort = this.groups
      ? this.groups.sort((x, y) => {
          return x.average - y.average
        })
      : null
  }
}

export class SheetResult {
  name: string
  score: string
  group: string
  groupscore: string
  constructor(name: string, score: string, group: string, groupscore: string) {
    this.name = name
    this.score = score
    this.group = group
    this.groupscore = groupscore
  }
}

export class SheetResultNumber {
  name: string
  score: number
  group: number
  groupscore: number
  constructor(sheetResult: SheetResult) {
    this.name = sheetResult.name
    this.score = Number(sheetResult.score)
    this.group = Number(sheetResult.group)
    this.groupscore = Number(sheetResult.groupscore)
  }
}
