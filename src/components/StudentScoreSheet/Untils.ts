import { parse, type ParseResult } from 'papaparse'
import { Group, Student, ExamDate, Sheet, SheetResult, SheetResultNumber } from './classes'
import _ from 'underscore'

export let sheetFile: Sheet

export const filePapaReader = (f: File) => {
  let data: SheetResultNumber[]
  let groupids: number[] = []
  const groupindexs: number[] = []
  const groups: Group[] = []
  

  parse(f, {
    delimiter: ',',
    complete: (results: ParseResult<SheetResult>) => {
      data = results.data.map((f) => {
        return new SheetResultNumber(f)
      })
      console.log('🚀 ~ filePapaReader ~ data:', data)

      //groupids
      data.forEach((f) => {
        groupids.push(f.group)
      })
      groupids = _.uniq(groupids)
      console.log('🚀 ~ filePapaReader ~ groupids:', groupids)

      //groups
      groupids.forEach((f) => {
        groups.push(new Group(null, f))
        console.log('🚀 ~ groupids.forEach ~ groups:', groups)
      })

      data.forEach((f) => {
        groups[f.group - 1].push(new Student(f.name, f.score)).setAverage()
      })

      sheetFile = new Sheet(groups, null)
      console.log('🚀 ~ filePapaReader ~ sheet:', sheetFile)
      
    },
    header: true
  })
}
