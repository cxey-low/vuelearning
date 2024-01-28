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

export const DEFAULT_LINE = 'name,score,group,groupscore\n'

export class Sheet {
  groups: Group[] | null
  date: ExamDate | null
  sort: Group[] | null

  setSort(){
    this.sort = this.groups
      ? this.groups.sort((x, y) => {
          return Number(!(x.average - y.average))
        })
      : null
      return this
  }

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

const default_obj = {
  groups: [
    {
      students: [
        {
          name: 'cs',
          score: 20
        },
        {
          name: 'gh',
          score: 56
        },
        {
          name: 'ty',
          score: 60
        }
      ],
      id: 1,
      average: 45.33
    },
    {
      students: [
        {
          name: 'hj',
          score: 57
        },
        {
          name: 'di',
          score: 90
        },
        {
          name: 'ck',
          score: 40
        }
      ],
      id: 2,
      average: 62.33
    }
  ],
  date: {
    date: '2024-01-23T05:16:26.859Z',
    name: 'Tue Jan 23 2024 13:16:26 GMT+0800 (中国标准时间)'
  },
  sort: [
    {
      students: [
        {
          name: 'cs',
          score: 20
        },
        {
          name: 'gh',
          score: 56
        },
        {
          name: 'ty',
          score: 60
        }
      ],
      id: 1,
      average: 45.33
    },
    {
      students: [
        {
          name: 'hj',
          score: 57
        },
        {
          name: 'di',
          score: 90
        },
        {
          name: 'ck',
          score: 40
        }
      ],
      id: 2,
      average: 62.33
    }
  ]
}

const default_groups: Group[] = default_obj.groups.map((gr) => {
  const default_students: Student[] = gr.students.map((st) => {
    return new Student(st.name, st.score)
  })
  return new Group(default_students, gr.id)
})

export const DEFAULT_SHEET: Sheet = new Sheet(
  default_groups,
  new ExamDate(new Date(default_obj.date.date), default_obj.date.name)
)

