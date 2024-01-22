import { parse, type ParseResult } from 'papaparse'
import { Group, Student, ExamDate, Sheet, SheetResult, SheetResultNumber } from './classes'
import _ from 'underscore'


export const filePapaReader = (f: File|undefined) => {
  if (!f) {
    return
  }
  let data: SheetResultNumber[]
  let groupids: number[] = []
  const groups: Group[] = []
  

  parse(f, {
    delimiter: ',',
    complete: (results: ParseResult<SheetResult>) => {
      data = results.data.map((f) => {
        return new SheetResultNumber(f)
      })
      //groupids
      data.forEach((f) => {
        groupids.push(f.group)
      })
      groupids = _.uniq(groupids)
      //groups
      groupids.forEach((f) => {
        groups.push(new Group(null, f))
      })

      data.forEach((f) => {
        groups[f.group - 1].push(new Student(f.name, f.score)).setAverage()
      })

      
      
    },
    header: true
  })
  return  new Sheet(groups, null)
}
