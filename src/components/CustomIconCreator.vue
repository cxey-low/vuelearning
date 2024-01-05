<script setup lang="ts">

import { ref, computed } from 'vue'
const creator = ref([[{ row: 1, col: 1, bool: false }]])
const text = ref('')
const codeCreate = computed(() => {
    let a: string = '0b'
    for (let row of creator.value) {
        for (let col of row) {
            a += String(Number(col.bool))
        }
        if (creator.value.indexOf(row) == creator.value.length - 1) { break }
        a += ',0b'
    }

    a = `byte ${text.value}[8]={${a}}`
    return ref(a)
})


for (let row = 1; row < 6; row += 1) {
    let a = [{ row: row, col: 1, bool: false }]
    for (let col = 2; col < 8; col += 1) {
        a.push({ row: row, col: col, bool: false })
    }
    creator.value[row - 1] = a

}

const clearAll = ()=>{
    for(let row of creator.value){
        for(let col of row){
            col.bool=false
        }
    }
}

/**
 * byte Heart[8] = {
0b00000,
0b01010,
0b11111,
0b11111,
0b01110,
0b00100,
0b00000,
0b00000
};
 */


</script>
<template>
    <link href="node_modules\bootstrap\dist\css\bootstrap.css" rel="stylesheet">
    <div class="container-fluid">
        <div class="row text-center">
            <div class="col">
                <label class="form-label">变量名：</label>
                <input class="form-control" v-model="text">
                <button type="button" class="btn  btn-danger" @click="clearAll">清除</button>
                <table class="text-center">
                    <tbody>
                        <td v-for="rows in creator" :key="creator.indexOf(rows)">
                            <tr v-for="col in rows" :key="10 * col.row + col.col">
                                <div class="btn-group">
                                    <input class="form-check-input btn btn-primary" type="checkbox" v-model="col.bool">

                                </div>
                            </tr>
                        </td>

                    </tbody>

                </table>

                <code>{{ codeCreate }}</code>
            </div>
        </div>
    </div>
    <br>
</template>