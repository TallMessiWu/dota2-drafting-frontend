<template>
  <el-container>
    <el-header>
      <el-row justify="center">
        <el-image :src="getAssetsFile('dota2.svg')" style="width: 40px; margin-right: 10px"></el-image>
        <h1>DOTA 2 Draft Prediction and Suggestion</h1>
      </el-row>
    </el-header>
    <el-main>
      <el-row justify="space-evenly">
        <el-card class="box-card" v-for="(item, index) in descriptionData" :key="index">
          <template #header>
            <div>
              <h3>{{item.title}}</h3>
            </div>
          </template>
          <div>{{item.content}}</div>

        </el-card>
      </el-row>


    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>

<script setup>
import descriptionData from "./assets/description-data.json"
import {getAssetsFile} from "./utils/getAssetsFile.js";

</script>

<script>
export default {
  name: 'App'
}
</script>


<style scoped>
  .box-card {
    width: 400px;
  }
</style>
