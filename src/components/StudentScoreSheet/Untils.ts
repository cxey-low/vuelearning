import { parse } from 'papaparse'

export const filePapaReader = (f: File) => {
  let data: unknown[]
  let groupids:number[]

  parse(f, {
    delimiter: ',',
    complete: (results, file) => {
      console.log('🚀 ~ complete ~ results:', results)


      data = results.data
      data.forEach((f) => {
        
        if (f[0]=='group') {
          groupids.push(f[1].toString())
        }

      
      })
      console.log("🚀 ~ data.forEach ~ groupids:", groupids)

    }
  })
}

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
  students: Student[]
  id: number
  average: number

  constructor(students: Student[], id: number) {
    this.students = students
    this.id = id
    let a = 0
    students.forEach((s) => {
      a += s.score
    })
    this.average = Number((a / students.length).toFixed(2))
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

  constructor(groups: Group[], date: ExamDate) {
    this.groups = groups
    this.date = date

    this.sort = this.groups.sort((x, y) => {
      return x.average - y.average
    })
  }
}
