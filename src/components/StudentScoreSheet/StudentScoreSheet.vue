<script setup lang="ts">

import { ref, type Ref, computed } from 'vue'
import { Group, Student, ExamDate, Sheet, SheetResult, SheetResultNumber, DEFAULT_SHEET, DEFAULT_LINE } from './classes'
import _ from 'underscore'
import { parse, type ParseResult } from 'papaparse'



const downloadFile = ref('')
const downloadName = ref('')
const csvstring = ref('')
const sheet = ref(DEFAULT_SHEET)
const sheetRef = computed(() => {
    sheet.value.groups?.forEach((g) => {
        g.setAverage()
    })
    sheet.value.setSort()
    return sheet
})

let date: ExamDate = DEFAULT_SHEET.date
let date_ref = ref(date)

const filePapaReader = (f: File | undefined) => {
    console.log("🚀 ~ filePapaReader ~ f:", f)
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

            sheet.value = new Sheet(groups, date_ref.value)

        },
        header: true
    })
    fileOutput()
}



const fileReader = () => {
    let file: File | undefined = document.getElementById('file')?.files[0]
    filePapaReader(file)
    console.log("🚀 ~ fileReader ~ sheetRef.value:", sheet.value)
}


const fileOutput = (): void => {

    let sheet_file: string[] = [DEFAULT_LINE]

    sheet.value.groups?.forEach(g => {
        let line: string[] = []
        g.students.forEach(s => {
            line.push(`${s.name},${s.score},${g.id},${g.average}\n`)
        })
        sheet_file = sheet_file.concat(line)
    })
    console.log("🚀 ~ fileOutput ~ sheet_file:", sheet_file)




    let file = new Blob(sheet_file, { type: 'text/csv' })
    downloadFile.value = window.URL.createObjectURL(file)
    downloadName.value = `${sheet.value.date?.name}`

}


</script>

<template>
    <div class="container-fluid">
        <div class="row text-center">
            <div class="col">
                <label class="form-label"><input @change="fileReader" class="form-control" id="file" type="file"></label>

                <a :href="downloadFile" :download="downloadName" @click="fileOutput">导出</a>
                <!-- eslint-disable vue/no-parsing-error -->
                <p @click="fileReader">fileReader</p>
                <p @click="console.log(sheetRef)">sheetRef</p>
                <p>{{ sheetRef }}</p>
                <p>{{ csvstring }}</p>

                <label class="form-label">

                    <input type="text" class="form-control" v-model="csvstring">
                    <input type="text" class="form-control" v-model="sheetRef.value.date.name">
                    <input type="date" class="form-control" v-model="sheetRef.value.date.date">
                </label>
                <table class="table table-bordered text-center mx-auto">
                    <tbody>
                        <tr v-for="student_group of sheetRef.value.sort" :key="student_group.id">
                            <label class="form-label">
                                <input type="number" class="form-control" v-model.number="student_group.id">
                            </label>
                            <p>{{ student_group.average }}</p>
                            <td v-for="student of student_group.students" :key="student.name">
                        <tr>
                            <label class="form-label">
                                <input type="text" class="form-control" v-model="student.name">
                            </label>
                        </tr>
                        <td>
                            <label class="form-label">
                                <input type="number" class="form-control" v-model.number="student.score">
                            </label>
                        </td>
                        </td>
                        </tr>
                    </tbody>
                </table>



            </div>
        </div>

    </div>
</template>