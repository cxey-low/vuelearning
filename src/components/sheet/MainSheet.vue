<script setup lang="ts">

let a:string = '123';

let sb = {
    head_lenth:10,
    heads:[
        {row:0,col:0,text:''}
    ],
    row_lenth:10,
    col_lenth:10,
    rows:[
        [{row:1,col:0,text:''}]
    ]
}

{for(let i:number = sb.heads.length;i<sb.head_lenth;i++){
    sb.heads[sb.heads.length] = {row:0,col:i,text:'head'}
}

function colBuilder() {
    
    for(let i:number = 0;i<sb.col_lenth;i++){

    }
}

for(let i:number = sb.rows.length;i<=sb.row_lenth;i++){
    sb.rows[sb.rows.length] = {}
}
}
</script>
<template>

    <div id="sheet">
        <h1>{{ a }}</h1>
        <table>
            <thead>
                <tr>
                    <th v-for="cell in sb.heads" v-text="cell.text"></th>
                </tr>
            </thead>
        </table>
    </div>

</template>