import { parse, type ParseResult } from 'papaparse'
import { Group, Student, ExamDate, Sheet } from './classes'

export const filePapaReader = (f: File) => {
  let data: string[]
  const groupids: number[] = []
  const groupindexs: number[] = []
  const groups: Group[] = []
  let sheet: Sheet

  parse(f, {
    delimiter: ',',
    complete: (results: ParseResult<string>, file) => {
      console.log('🚀 ~ complete ~ results:', results)

      data = results.data
      data.forEach((f, i) => {
        if (f[0] == 'group') {
          groupids.push(Number(f[1]))
          groupindexs.push(i)
        }
      })

      let students: Student[] = []

      data.forEach((f) => {
        if (f[0] != 'group') {
          const student = new Student(f[0], Number(f[1]))
          students.push(student)
          console.log('🚀 ~ data.forEach ~ students:', students)
        } else {
          if (!groupids.length) {
            groups.push(new Group(students, groupids[0]))
          }
          console.log('🚀 ~ data.forEach ~ students:', students)

          console.log('🚀 ~ data.forEach ~ groupids:', groupids)

          groupids.splice(0, 1)
          console.log('🚀 ~ data.forEach ~ groupids:', groupids)
          students = []
        }
      })
      sheet = new Sheet(groups, null)
      console.log('🚀 ~ filePapaReader ~ sheet:', sheet)
    }
  })
}
