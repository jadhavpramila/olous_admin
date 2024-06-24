import axios from 'axios'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import appConstants from '../../../appConstants'

Vue.use(Loading)

const defaultState = () => {
  return {
    interestOptions: [],
    professionOptions: [],
    sectorOptions: [],
    languages: [],

    // pqq
    category: [],
    subCategory: [],
    country: [
      {
        data: []
      }
    ],
    states: [
      {
        data: []
      }
    ],
    cities: [
      {
        data: []
      }
    ],
    citiesFromCountry: [
      {
        data: []
      }
    ],
    places: [
      {
        data: []
      }
    ],
    citiesOfCountry: [
      {
        data: []
      }
    ],
    turnOver: [],
    minWork: [],
    companyStructure: [],
    establishmentYear: [],
    currency: [],
    numberList: [],
    percentageList: [],
    workList: [],
    certificationsList: [],
    licensesList: [],
    companyType: [],
    insurancePoliciesList: [],
    companiesSearchResult: [],
    location: [],
    softwareList: [],
    softwareListNames: [],
    fieldOfStudyFromId: [],
    citiesFromCountryName: [],
    allSoftwareList: [],
    levelOfStudy: [],
    unit: [],
    projectType: [],
    contractType: [],
    approximateArea: [],
    developmentType: [],
    priceUnit: [],
    fieldOfStudy: [],
    userType: ''
  }
}

const state = defaultState()
const getters = {
  getInterestOptions: (state) => state.interestOptions,
  getProfessionOptions: (state) => state.professionOptions,
  getSectorOptions: (state) => state.sectorOptions,
  getLanguages: (state) => state.languages,
  getter_software: (state) => state.softwareList,
  getter_softwareListNames: (state) => state.softwareListNames,
  getter_fieldOfStudyFromId: (state) => state.fieldOfStudyFromId,
  getter_allSoftwareList: (state) => state.allSoftwareList,
  getter_fieldOfStudy: (state) => state.fieldOfStudy,

  // pqq
  getCategoryOptions: (state) => state.category,
  getSubcategoryOptions: (state) => state.subCategory,
  filteredCountry: (state) => state.country,
  filteredState: (state) => state.states,
  filteredCities: (state) => state.cities,
  getCitiesFromCountry: (state) => state.citiesFromCountry,
  filteredPlaces: (state) => state.places,
  filteredCitiesOfCountry: (state) => state.citiesOfCountry,
  getTurnOverOptions: (state) => state.turnOver,
  getMinWorkOptions: (state) => state.minWork,
  getUnitOptions: (state) => state.unit,
  getCompanyStructureOptions: (state) => state.companyStructure,
  getEstablishmentYears: (state) => state.establishmentYear,
  getCurrencyOptions: (state) => state.currency,
  getNumberList: (state) => state.numberList,
  getPercentageList: (state) => state.percentageList,
  getWorkList: (state) => state.workList,

  getEquipmentBrandList: (state) => state.equipmentBrandList,
  getEquipmentTypeList: (state) => state.equipmentTypeList,

  getCompanyType: (state) => state.companyType,
  getCertificationsList: (state) => state.certificationsList,
  getLicensesList: (state) => state.licensesList,
  getInsurancePoliciesList: (state) => state.insurancePoliciesList,
  getCompaniesSearchResult: (state) => state.companiesSearchResult,
  getLocation: (state) => state.location,
  getCitiesFromCountryName: (state) => state.citiesFromCountryName,
  getLevelOfStudy: (state) => state.levelOfStudy,
  getProjectTypeOptions: (state) => state.projectType,
  getContractTypeOptions: (state) => state.contractType,
  getApproximateAreaOptions: (state) => state.approximateArea,
  getDevelopmentTypeOptions: (state) => state.developmentType,
  getPriceUnitOptions: (state) => state.priceUnit,
  getter_userType: (state) => state.userType
}
const mutations = {
  reset(state) {
    Object.assign(state, defaultState())
  },
  setInterestOptions: (state, interestOptionsData) => {
    state.interestOptions = interestOptionsData
  },
  setProfessionOptions: (state, professionOptionsData) => {
    state.professionOptions = professionOptionsData
  },
  setSectorOptions: (state, sectorOptionsData) => {
    state.sectorOptions = sectorOptionsData
  },
  setLanguages: (state, LanguagesData) => {
    // var strArr = LanguagesData.map(function (e) {
    //   let id = e.id.toString()
    //   e.id = id
    //   return e
    // })
    // console.log('string array', strArr)
    state.languages = LanguagesData
  },
  setSoftwareList: (state, softwareData) => {
    state.softwareList = softwareData
  },
  setSoftwareListwithId: (state, data) => {
    state.softwareListNames = []
    state.softwareListNames = data
  },
  setFieldOfStudyFromId: (state, data) => {
    state.fieldOfStudyFromId = data
  },
  SetLevelOfStudy: (state, data) => {
    state.levelOfStudy = data
  },
  setAllSoftwareList: (state, data) => {
    state.allSoftwareList = data
  },
  // pqq
  setCategory: (state, categoryData) => {
    state.category = categoryData
  },
  setSubcategory: (state, subCategoryData) => {
    state.subCategory = subCategoryData
  },
  setCountry(state, con) {
    state.country[0].data = con
  },
  setState: (state, st) => (state.states[0].data = st),
  setCity: (state, st) => (state.cities[0].data = st),
  setCityFromCountry: (state, st) => {
    //console.log('response', st)
    state.citiesFromCountry[0].data = st
  },
  setPlaces: (state, st) => (state.places[0].data = st),
  setCitiesOfCountry: (state, st) => (state.citiesOfCountry[0].data = st),
  setStateEmpty: (state) => (state.states[0].data = []),
  setCityEmpty: (state) => (state.cities[0].data = []),
  setCitiesOFCountryEmpty: (state) => (state.citiesOfCountry[0].data = []),
  setTurnOver: (state, turnOverData) => {
    state.turnOver = turnOverData
  },
  setMinWork: (state, minWorkData) => {
    state.minWork = minWorkData
  },
  setUnit: (state, unitData) => {
    state.unit = unitData
  },
  setCompanyStructure: (state, companyStruData) => {
    state.companyStructure = companyStruData
  },
  setEstablishmentYears: (state, yearsData) => {
    state.establishmentYear = yearsData
  },
  setCurrency: (state, currencyData) => {
    state.currency = currencyData
  },
  setNumberList: (state, numberData) => {
    state.numberList = numberData
  },
  setPercentageList: (state, percentageData) => {
    state.percentageList = percentageData
  },

  setWorkList: (state, workData) => {
    state.workList = workData
  },
  setEquipmentBrandList: (state, brandData) => {
    state.equipmentBrandList = brandData
  },
  setEquipmentTypeList: (state, typeData) => {
    state.equipmentTypeList = typeData
  },

  setCompanyType: (state, companyType) => {
    state.companyType = companyType
  },

  setCertificationsList: (state, certifications) => {
    state.certificationsList = certifications
  },

  setLicensesList: (state, licenses) => {
    state.licensesList = licenses
  },
  setInsurancePoliciesList: (state, insurancePolicies) => {
    state.insurancePoliciesList = insurancePolicies
  },
  setCompaniesSearchResult: (state, companiesSearchResultData) => {
    state.companiesSearchResult = companiesSearchResultData
  },
  setCompaniesSearchResultEmpty: (state) => {
    state.companiesSearchResult = []
  },
  setLocation: (state, locationList) => {
    state.location = locationList
  },
  setCityFromCountryName: (state, locationList) => {
    state.citiesFromCountryName = locationList
  },

  setProjectType: (state, projectTypeData) => {
    state.projectType = projectTypeData
  },
  setContractType: (state, contractTypeData) => {
    state.contractType = contractTypeData
  },
  setApproximateArea: (state, approximateAreaData) => {
    state.approximateArea = approximateAreaData
  },
  setDevelopmentType: (state, developmentTypeData) => {
    state.developmentType = developmentTypeData
  },
  setPriceUnitOptions: (state, priceUnitData) => {
    state.priceUnit = priceUnitData
  },
  setFieldOfStudy: (state, fieldOfStudyData) => {
    state.fieldOfStudy = fieldOfStudyData
  },
  commit_userType(state, data) {
    state.userType = data
  }
}

const actions = {
  fetchInterestsData({ commit }) {
    let loader = Vue.$loading.show({})
    var instance = axios.create()
    delete instance.defaults.headers.common['Authorization']
    return instance
      .get(`/users/interests/`)
      .then((response) => {
        commit('setInterestOptions', response.data)
        loader.hide()
      })
      .catch(function (error) {
        console.log(`dropdwonvalues fetchInterestsData : ${error}`)
        loader.hide()
      })
  },

  fetchProfessionData({ commit }) {
    // let loader = Vue.$loading.show({})
    return axios
      .get(`/search/newprofessions/`)
      .then((response) => {
        let data = response.data.data.hits.hits
        let objArray = []
        if (data) {
          for (let i = 0; i < data.length; i++) {
            let obj = {
              id: data[i]._id,
              display_string: data[i]._source.profession_name
            }
            objArray.push(obj)
          }
        }
        commit('setProfessionOptions', objArray)
        //loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        //loader.hide()
      })
  },

  fetchSectorData({ commit }) {
    //let loader = Vue.$loading.show({})
    return axios
      .get(`/search/sectors/`)
      .then((response) => {
        let data = response.data.data.hits.hits
        let objArray = []
        if (data) {
          for (let i = 0; i < data.length; i++) {
            let obj = {
              id: data[i]._id,
              id_int_value: parseInt(data[i]._id),
              display_string: data[i]._source.display_string
            }
            objArray.push(obj)
          }
        }
        commit('setSectorOptions', objArray)
        // loader.hide()
      })
      .catch(function (error) {
        console.log(error)
        // loader.hide()
      })
  },

  fetchLanguages({ commit }) {
    //let loader = Vue.$loading.show({})
    var instance = axios.create()
    delete instance.defaults.headers.common['Authorization']
    return instance
      .get(`/search/languages/`)
      .then((response) => {
        let data = response.data.data.hits.hits
        let objArray = []
        if (data) {
          for (let i = 0; i < data.length; i++) {
            let obj = {
              id: data[i]._id,
              display_string: data[i]._source.display_string
            }
            objArray.push(obj)
          }
        }
        commit('setLanguages', objArray)
        //  loader.hide()
      })
      .catch(function (error) {
        console.log(`dropdwonvalues fetchLanguages : ${error}`)
        //  loader.hide()
      })
  },

  // pqq
  fetchCategoryData({ commit }) {
    // let loader = Vue.$loading.show({})
    return axios
      .get(`/search/vendors/companycategories/list/`)
      .then(function (response) {
        const result = response.data
        var categoryOptions = result.data.hits.hits
          .map((res) => res._source)
          .filter((res) => {
            if (res.name != '') {
              return res
            }
          })
        commit('setCategory', categoryOptions)
        // loader.hide()
      })
      .catch(function (error) {
        console.log('fetchCategoryData :' + error)
        console.log('fetchCategoryData :' + error.response.data)
        // loader.hide()
      })
  },

  fetchSubCategories({ commit }, categoryId) {
    if (Number.isInteger(categoryId)) {
      let loader = Vue.$loading.show({})
      return axios
        .get(
          `/search/vendors/companysubcategories/list/?category_id=${categoryId}&page=1&limit=200&offset=0`
        )
        .then(function (response) {
          const result = response.data
          var subCategory = result.data.hits.hits
            .map((res) => res._source)
            .filter((res) => {
              if (res.name != '') {
                return res
              }
            })
          commit('setSubcategory', subCategory)
          loader.hide()
        })
        .catch(function (error) {
          commit('setSubcategory', [])
          console.log('fetchSubCategories :' + error)
          console.log('fetchSubCategories :' + error.response.data)
          loader.hide()
        })
    }
  },

  searchContry({ commit }, data) {
    axios
      .get(`/search/vendors/country/?q=${data}`)
      .then(function (response) {
        const result = response.data.data.hits.hits
        let con = result.map((res) => {
          res._source.countryAndCode = `${res._source.name} (${res._source.phone_code})`
          return res._source
        })
        commit('setCountry', con)
      })
      .catch(function (error) {
        console.log('searchContry :' + error)
        console.log('searchContry :' + error.response.data)
      })
  },

  searchState({ commit }, payload) {
    axios
      .get(
        `/search/vendors/state/?q=${payload.state}&country=${payload.country}`
      )
      .then(function (response) {
        const result = response.data.data.hits.hits
        let st = result.map((res) => {
          return res._source
        })
        commit('setState', st)
      })
      .catch(function (error) {
        console.log('searchState :' + error)
        console.log('searchState :' + error.response.data)
      })
  },

  searchCity({ commit }, payload) {
    axios
      .get(
        `/search/vendors/city/?q=${payload.city}&country=${payload.country}&state=${payload.state}`
      )
      .then(function (response) {
        const result = response.data.data.hits.hits
        let st = result.map((res) => {
          return res._source
        })
        commit('setCity', st)
      })
      .catch(function (error) {
        console.log('searchCity :' + error)
        console.log('searchCity :' + error.response.data)
      })
  },
  searchCityFromCountry({ commit }, payload) {
    axios
      .get(`/search/places/?country=${payload.country}&q=${payload.city}`)
      .then(function (response) {
        const result = response.data.data.hits.hits
        let st = result.map((res) => {
          return res._source
        })
        //console.log('response', st)
        commit('setCityFromCountry', st)
      })
      .catch(function (error) {
        console.log('searchCity :' + error)
        console.log('searchCity :' + error.response.data)
      })
  },

  searchPlaces({ commit }, data) {
    axios
      .get(`/search/places/?q=${data}&country=true`)
      .then(function (response) {
        const result = response.data.data.hits.hits
        let places = result.map((res) => {
          return res._source
        })
        commit('setPlaces', places)
      })
      .catch(function (error) {
        console.log('searchPlaces :' + error)
        console.log('searchPlaces :' + error.response.data)
      })
  },

  searchCitiesOfCountry({ commit }, payload) {
    axios
      .get(`/vendors/indiancities/?q=${payload.city}`)
      .then(function (response) {
        const result = response.data.data.hits.hits
        let st = result.map((res) => {
          return res._source
        })
        commit('setCitiesOfCountry', st)
      })
      .catch(function (error) {
        console.log('searchCitiesOfCountry :' + error)
        console.log('searchCitiesOfCountry :' + error.response.data)
      })
  },

  fetchUnitValues({ commit }) {
    var unit = appConstants.unit
    commit('setUnit', unit)
  },
  fetchCompanyNature({ commit }) {
    axios
      .get(`/vendors/company/pqq/companynature`)
      .then(function (response) {
        const result = response.data.data
        commit('setCompanyStructure', result)
      })
      .catch(function (error) {
        console.log('fetchCompanyNature :' + error)
      })
  },

  fetchEstablishmentYear({ commit }, Data) {
    var fromYear = Data.fromYear

    var establishmentyears = []
    var dt = new Date()
    var currentYear = dt.getFullYear()
    for (var i = fromYear; i <= currentYear; i++) {
      establishmentyears.push({ id: i, name: i })
    }
    commit('setEstablishmentYears', establishmentyears)
  },

  fetchCurrency({ commit }) {
    var currency = appConstants.currency
    commit('setCurrency', currency)
  },

  fetchNumberList({ commit }, Data) {
    var fromNumber = Data.fromNumber
    var toNumber = Data.toNumber

    var numberList = []
    for (var i = fromNumber; i <= toNumber; i++) {
      numberList.push({ id: i, name: i })
    }
    commit('setNumberList', numberList)
  },

  fetchNumberPercentage({ commit }) {
    var percentageList = []
    for (var i = 0; i <= 100; i++) {
      var percValue = i + '%'
      percentageList.push({ id: i, name: percValue })
    }
    commit('setPercentageList', percentageList)
  },

  fetchWorkList({ commit }) {
    axios
      .get(`/vendors/company/pqq/subcontract`)
      .then(function (response) {
        const result = response.data.data
        commit('setWorkList', result)
      })
      .catch(function (error) {
        console.log('fetchWorkList :' + error)
      })
  },

  fetchEquipmentBrandList({ commit }) {
    axios
      .get(`/vendors/company/pqq/equipmentbrands`)
      .then(function (response) {
        const result = response.data.data
        commit('setEquipmentBrandList', result)
      })
      .catch(function (error) {
        console.log('fetchEquipmentBrandList :' + error)
      })
  },

  fetchEquipmentTypeList({ commit }) {
    axios
      .get(`/vendors/company/pqq/equipmenttypes`)
      .then(function (response) {
        const result = response.data.data
        commit('setEquipmentTypeList', result)
      })
      .catch(function (error) {
        console.log('fetchEquipmentTypeList :' + error)
      })
  },

  fetchCertificationList({ commit }) {
    axios
      .get(`/vendors/company/pqq/certificationslist`)
      .then(function (response) {
        const result = response.data.data
        commit('setCertificationsList', result)
      })
      .catch(function (error) {
        console.log('fetchCertificationList :' + error)
      })
  },

  fetchLicensesList({ commit }) {
    axios
      .get(`/vendors/company/pqq/licenseslist`)
      .then(function (response) {
        const result = response.data.data
        commit('setLicensesList', result)
      })
      .catch(function (error) {
        console.log('fetchLicensesList :' + error)
      })
  },

  fetchCompanyType({ commit }) {
    var compType = appConstants.compType
    commit('setCompanyType', compType)
  },

  fetchInsurancePoliciesList({ commit }) {
    axios
      .get(`/vendors/company/pqq/insurancepolicies`)
      .then(function (response) {
        const result = response.data.data
        commit('setInsurancePoliciesList', result)
      })
      .catch(function (error) {
        console.log('fetchInsurancePoliciesList :' + error)
      })
  },

  searchCompanies({ commit }, searchText) {
    let loader = Vue.$loading.show({})
    axios
      .get(`/vendors/adminsearch/?q=${searchText}`)
      .then(function (response) {
        const result = response.data
        commit('setCompaniesSearchResult', result.data)
        loader.hide()
      })
      .catch(function (error) {
        console.log('fetchLicensesList :' + error)
        loader.hide()
      })
  },
  fetchLocationFromCityName({ commit }, cityName) {
    axios
      .get(`/search/places/?country=&q=${cityName}`)
      .then(function (response) {
        const result = response.data.data.hits.hits
          .map((res) => res._source)
          .filter((res) => {
            if (res.name != '') {
              res.displayName = `${res.name}, ${res.state.name}, ${res.country.name}`
              return res
            }
          })
        commit('setLocation', result)
      })
      .catch(function (error) {
        console.log('fetchLocationFromCityName :' + error)
      })
  },
  fetchCityFromCountryName({ commit }, data) {
    axios
      .get(`/search/places/?country=${data.country}&q=${data.city}`)
      .then(function (response) {
        const result = response.data.data.hits.hits
          .map((res) => res._source)
          .filter((res) => {
            if (res.name != '') {
              res.displayName = `${res.name}, ${res.state.name}, ${res.country.name}`
              res.cityState = `${res.name}, ${res.state.name}`
              return res
            }
          })
        commit('setCityFromCountryName', result)
      })
      .catch(function (error) {
        console.log('fetchLocationFromCityName :' + error)
      })
  },
  action_getSoftwareDetails({ commit }, query) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/softwares/?q=${query}`)
        .then(function (response) {
          commit('setSoftwareList', response.data.data.hits.hits)
          resolve()
        })
        .catch(function (error) {
          console.log(error.message)
          reject()
        })
    })
  },
  action_getSoftwareNameWithID({ commit }, data) {
    let data1 = {
      software_id: data
    }
    return new Promise((resolve, reject) => {
      return axios
        .post(`/search/softwareid/`, data1)
        .then(function (response) {
          commit('setSoftwareListwithId', response.data.data.hits.hits)
          resolve(response.data.data.hits.hits)
        })
        .catch(function (error) {
          console.log(error.message)
          reject()
        })
    })
  },
  fetchSoftwareList({ commit }, data) {
    let data1 = {
      field_of_study_id: data
    }
    return new Promise((resolve, reject) => {
      return axios
        .get(
          `/search/softwares/
        `,
          data1
        )
        .then(function (response) {
          let data = response.data.data.hits.hits
          let objArray = []
          if (data) {
            for (let i = 0; i < data.length; i++) {
              let obj = {
                id: data[i]._id,
                display_string: data[i]._source.name
              }
              objArray.push(obj)
            }
          }
          commit('setAllSoftwareList', objArray)
          resolve(data)
        })
        .catch(function (error) {
          console.log(error.message)
          reject()
        })
    })
  },
  action_getFieldOfStudyNameFromId({ commit }, data) {
    let data1 = {
      field_of_study_id: data
    }
    return new Promise((resolve, reject) => {
      return axios
        .post(`/search/fieldofstudyid/`, data1)
        .then(function (response) {
          let data = response.data.data.hits.hits
          let objArray = []
          if (data) {
            for (let i = 0; i < data.length; i++) {
              let obj = {
                id: data[i]._id,
                name: data[i]._source.field_of_study,
                is_verified: data[i]._source.is_verified
              }
              objArray.push(obj)
            }
          }
          commit('setFieldOfStudyFromId', objArray)
          resolve(objArray)
        })
        .catch(function (error) {
          console.log(error.message)
          reject()
        })
    })
  },
  action_getFieldOfStudy({ commit }, data) {
    let query_parameter = data['query_string']
    return new Promise((resolve, reject) => {
      if (query_parameter == '') {
        commit('setFieldOfStudy', [])
        resolve([])
        return
      }
      return axios
        .get(`/search/geteducationfields/?q=${query_parameter}`)
        .then(function (response) {
          let field_of_study_data = response.data.data.hits.hits
          let objArray = []
          if (field_of_study_data) {
            for (let i = 0; i < field_of_study_data.length; i++) {
              let obj = {
                id: field_of_study_data[i]._source.id,
                name: field_of_study_data[i]._source.education_field,
                education_group: field_of_study_data[i]._source.education_group,
                degree_master_category_id:
                  field_of_study_data[i]._source.degree_master_category_id
              }
              objArray.push(obj)
            }
          }
          commit('setFieldOfStudy', objArray)
          resolve(objArray)
        })
        .catch(function (error) {
          console.log(error.message)
          reject()
        })
    })
  },

  fetchLevelOfStudy({ commit }) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/degreemaster/`)
        .then(function (response) {
          let data = response.data.data.hits.hits
          let objArray = []
          if (data) {
            for (let i = 0; i < data.length; i++) {
              let obj = {
                id: data[i]._source.id,
                name: data[i]._source.category_name
              }
              objArray.push(obj)
            }
          }
          commit('SetLevelOfStudy', objArray)
          resolve(objArray)
        })
        .catch(function (error) {
          console.log(error.message)
          reject()
        })
    })
  },
  fetchLevelOfStudyForJob({ commit }) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`/search/degreemaster/?job=1`)
        .then(function (response) {
          let data = response.data.data.hits.hits
          let objArray = []
          if (data) {
            for (let i = 0; i < data.length; i++) {
              let obj = {
                id: data[i]._source.id,
                name: data[i]._source.category_name
              }
              objArray.push(obj)
            }
          }
          commit('SetLevelOfStudy', objArray)
          resolve(objArray)
        })
        .catch(function (error) {
          console.log(error.message)
          reject()
        })
    })
  },
  fetchMinWork({ commit }) {
    return axios
      .get(`/vendors/value_of_work/list/`)
      .then(function (response) {
        const result = response.data.data
        commit('setMinWork', result)
      })
      .catch(function (error) {
        console.log('fetchMinWork :' + error)
        console.log('fetchMinWork :' + error.response.data)
      })
  },
  fetchTurnover({ commit }) {
    return axios
      .get(`/vendors/turnover/list/`)
      .then(function (response) {
        const result = response.data.data
        commit('setTurnOver', result)
      })
      .catch(function (error) {
        console.log('fetchTurnover :' + error)
        console.log('fetchTurnover :' + error.response.data)
      })
  },
  fetchProjectType({ commit }) {
    return axios
      .get(`/vendors/project_type/list/`)
      .then(function (response) {
        const result = response.data.data
        commit('setProjectType', result)
      })
      .catch(function (error) {
        console.log('fetchProjectType :' + error)
        console.log('fetchProjectType :' + error.response.data)
      })
  },
  fetchContractType({ commit }) {
    return axios
      .get(`/vendors/contract_type/list/`)
      .then(function (response) {
        const result = response.data.data
        let with_str_id = []
        for (let i = 0; i < result.length; i++) {
          let item = {
            id: result[i].id,
            value: result[i].value,
            str_id: result[i].id.toString()
          }
          with_str_id.push(item)
        }
        commit('setContractType', with_str_id)
      })
      .catch(function (error) {
        console.log('fetchContractType :' + error)
        console.log('fetchContractType :' + error.response.data)
      })
  },
  fetchApproximateArea({ commit }) {
    return axios
      .get(`/vendors/app_area/list/`)
      .then(function (response) {
        const result = response.data.data
        commit('setApproximateArea', result)
      })
      .catch(function (error) {
        console.log('fetchApproximateArea :' + error)
        console.log('fetchApproximateArea :' + error.response.data)
      })
  },
  fetchDevelopmentType({ commit }) {
    return axios
      .get(`/vendors/development_type/list/`)
      .then(function (response) {
        const result = response.data.data
        commit('setDevelopmentType', result)
      })
      .catch(function (error) {
        console.log('fetchDevelopmentType :' + error)
        console.log('fetchDevelopmentType :' + error.response.data)
      })
  },
  fetchPriceUnit({ commit }) {
    let res = appConstants.price_unit_obj
    commit('setPriceUnitOptions', res)
  },
  action_fetchUserType({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get('/search/usertypes/')
        .then((res) => {
          let data = res.data.data.hits.hits
          let objArray = []

          if (data) {
            for (let i = 0; i < data.length; i++) {
              if (data[i]._source.visible == 'true') {
                let obj = {
                  id: parseInt(data[i]._source.id),
                  name: data[i]._source.display_string,
                  visible: data[i]._source.visible,
                  input_type: parseInt(data[i]._source.input_type)
                }
                objArray.push(obj)
              }
            }
          }
          commit('commit_userType', objArray)
          resolve()
        })
        .catch((err) => {
          console.log(err)
          reject()
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
