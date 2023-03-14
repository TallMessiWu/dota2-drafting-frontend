<template>
  <el-container>
    <el-header>
      <el-row justify="center">
        <el-image :src="getAssetsFile('dota2.svg')" style="width: 40px; margin-right: 10px"></el-image>
        <h1>DOTA 2 Draft Prediction and Suggestion</h1>
      </el-row>
    </el-header>
    <el-main>
      <el-row justify="space-evenly" style="margin: 20px;">
        <el-card class="box-card" v-for="(item, index) in descriptionData" :key="index">
          <template #header>
            <div>
              <h3>{{ item.title }}</h3>
            </div>
          </template>
          <div>{{ item.content }}</div>

        </el-card>
      </el-row>

      <!--Region, Patch, Side to Pick First-->
      <el-row align="middle">

        <!--Region-->
        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>Region</div>
            </el-col>

            <el-col :span="16">
              <el-select v-model="region" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(regionId, regionName, index) in regions"
                    :key="regionName"
                    :label="regionName"
                    :value="regionId"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-col>

        <!--Patch-->
        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>Patch</div>
            </el-col>

            <el-col :span="16">
              <el-select v-model="patch" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(patchId, patchName, index) in patches"
                    :key="patchName"
                    :label="patchName"
                    :value="patchId"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-col>

        <!--First Pick Team-->
        <el-col :span="12">
          <el-row align="middle">
            <el-col :span="8">
              <div>Side to Pick First</div>
            </el-col>

            <el-col :span="7">
              <el-select v-model="firstPickTeamIndex" class="m-2" placeholder="Select" size="large">
                <el-option key="Radiant" label="Radiant" :value="0">
                  <template #default>
                    <el-row>
                      <el-col :span="10">
                        <el-image :src="`${staticVariables.backendAddress}/radiant-dire/0`" fit="cover"
                                  style="height: 3vw; margin-right: 1vw;"/>
                      </el-col>
                      <el-col :span="14">
                        <span>Radiant</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
                <el-option key="Dire" label="Dire" :value="1">
                  <template #default>
                    <el-row>
                      <el-col :span="10">
                        <el-image :src="`${staticVariables.backendAddress}/radiant-dire/1`" fit="cover"
                                  style="height: 3vw; margin-right: 1vw;"/>
                      </el-col>
                      <el-col :span="14">
                        <span>Dire</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>

            <el-col :span="9">
              <el-image :src="`${staticVariables.backendAddress}/radiant-dire/${firstPickTeamIndex}`" fit="cover"
                        style="height: 3.5vw;"/>
            </el-col>
          </el-row>
        </el-col>

      </el-row>

      <!--Heroes-->
      <el-row align="middle">
        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ firstPickTeam }}'s Ban 1</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection0" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection0}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ secondPickTeam }}'s Ban 1</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection1" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection1}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ firstPickTeam }}'s Ban 2</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection2" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection2}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ secondPickTeam }}'s Ban 2</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection3" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection3}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row align="middle">
        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ firstPickTeam }}'s Pick 1</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection4" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection4}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ secondPickTeam }}'s Pick 1</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection5" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection5}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ secondPickTeam }}'s Pick 2</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection6" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection6}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ firstPickTeam }}'s Pick 2</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection7" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection7}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>


      </el-row>

      <el-row align="middle">
        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ firstPickTeam }}'s Ban 3</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection8" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection8}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ secondPickTeam }}'s Ban 3</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection9" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection9}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ firstPickTeam }}'s Ban 4</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection10" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection10}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ secondPickTeam }}'s Ban 4</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection11" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection11}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>


      </el-row>

      <el-row align="middle">
        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ firstPickTeam }}'s Ban 5</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection12" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection12}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ secondPickTeam }}'s Ban 5</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection13" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection13}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ secondPickTeam }}'s Pick 3</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection14" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection14}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ firstPickTeam }}'s Pick 3</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection15" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection15}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>


      </el-row>

      <el-row align="middle">
        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ firstPickTeam }}'s Pick 4</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection16" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection16}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ secondPickTeam }}'s Pick 4</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection17" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection17}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ firstPickTeam }}'s Ban 6</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection18" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection18}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ secondPickTeam }}'s Ban 6</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection19" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection19}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>


      </el-row>

      <el-row align="middle">
        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ firstPickTeam }}'s Ban 7</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection20" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection20}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ secondPickTeam }}'s Ban 7</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection21" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection21}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ firstPickTeam }}'s Pick 5</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection22" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection22}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row align="middle">
            <el-col :span="8">
              <div>{{ secondPickTeam }}'s Pick 5</div>
            </el-col>
            <el-col :span="9">
              <el-select v-model="selection23" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="(heroId, heroName, index) in heroesInfo"
                    :key="heroName"
                    :label="heroName"
                    :value="heroId">
                  <template #default>
                    <el-row>
                      <el-col :span="6">
                        <el-image :src="`${staticVariables.backendAddress}/hero/${heroId}`" fit="contain"
                                  style="height: 3vw; margin-right: 1vw;"></el-image>
                      </el-col>
                      <el-col :span="18">
                        <span>{{ heroName }}</span>
                      </el-col>
                    </el-row>
                  </template>
                </el-option>
              </el-select>
            </el-col>
            <el-col :offset="1" :span="6">
              <el-image :src="`${staticVariables.backendAddress}/hero/${selection23}`" fit="contain"
                        style="height: 3vw"/>
            </el-col>
          </el-row>
        </el-col>


      </el-row>

      <el-row justify="center" align="middle" style="margin-top: 1vw">
        <el-button type="primary" :loading="loading" @click="predict">Predict</el-button>
      </el-row>
      <el-row justify="center" align="middle" style="margin-top: 1vw">
        <div style="font-weight: bold; margin-left: 1vw">
          Predicted Result:
        </div>
        <div style="font-weight: bold; margin-left: 1vw; color: red">
          {{ resultText }}
        </div>
      </el-row>
    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>

<script setup>
import descriptionData from "./assets/description-data.json"
import regions from "./assets/regions.json"
import patches from "./assets/patches.json"
import {getAssetsFile} from "./utils/getAssetsFile.js";
import heroesInfo from "./assets/heroes-info.json";
import staticVariables from "./staticVariables.js";
import {computed, inject} from "vue";

const region = $ref()
const patch = $ref()
const firstPickTeamIndex = $ref(0)
const firstPickTeam = computed(() => {
  return firstPickTeamIndex === 0 ? 'Radiant' : 'Dire'
})
const secondPickTeam = computed(() => {
  return firstPickTeamIndex === 0 ? 'Dire' : 'Radiant'
})

const selection0 = $ref()
const selection1 = $ref()
const selection2 = $ref()
const selection3 = $ref()
const selection4 = $ref()
const selection5 = $ref()
const selection6 = $ref()
const selection7 = $ref()
const selection8 = $ref()
const selection9 = $ref()
const selection10 = $ref()
const selection11 = $ref()
const selection12 = $ref()
const selection13 = $ref()
const selection14 = $ref()
const selection15 = $ref()
const selection16 = $ref()
const selection17 = $ref()
const selection18 = $ref()
const selection19 = $ref()
const selection20 = $ref()
const selection21 = $ref()
const selection22 = $ref()
const selection23 = $ref()

let result = $ref()
let resultText = computed(() => {
  if (result === undefined) {
    return ''
  }
  return result === 1 ? 'Radiant Win' : 'Dire Win'
})

const axios = inject('axios')
let loading = $ref(false)

async function predict() {
  const selections = [
    selection0, selection1, selection2, selection3,
    selection4, selection5, selection6, selection7,
    selection8, selection9, selection10, selection11,
    selection12, selection13, selection14, selection15,
    selection16, selection17, selection18, selection19,
    selection20, selection21, selection22, selection23
  ]
  if (selections.includes(undefined)) {
    ElMessage({
      message: 'Not All Info Filled',
      type: 'error',
    })
    return
  }
  loading = true
  result = (await axios.get(`${staticVariables.backendAddress}/hero/${region}/${patch}/${firstPickTeamIndex}/${selections}`)).data
  loading = false
}

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
