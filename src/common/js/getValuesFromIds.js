import appConstants from '../../appConstants'
import store from '../../store'
export function getSectorValues(id_list) {
  return new Promise((resolve, reject) => {
    store
      .dispatch('dropdownValues/fetchSectorData')
      .then(() => {
        let getter_sector = store.getters['dropdownValues/getSectorOptions']
        let result = getString(id_list, getter_sector, 'display_string')
        resolve(result)
        // let getter_sector = store.getters['dropdownValues/getSectorOptions']
        // if (id_list == '' || id_list == null || id_list.length == 0) {
        //   return ''
        // }
        // let SectorValues = []
        // id_list.map((res) => {
        //   let selected = res
        //   getter_sector.map((options) => {
        //     if (options.id == selected) {
        //       SectorValues.push(options.display_string)
        //     }
        //   })
        // })
        // let strValue = SectorValues.join(', ')
        // resolve(strValue)
      })
      .catch(() => {
        reject('')
      })
  })
}

export function getProfessionValues(id_list) {
  return new Promise((resolve, reject) => {
    store
      .dispatch('dropdownValues/fetchProfessionData')
      .then(() => {
        let getter_profession =
          store.getters['dropdownValues/getProfessionOptions']
        let result = getString(id_list, getter_profession, 'display_string')
        resolve(result)

        // let getter_profession =
        //   store.getters['dropdownValues/getProfessionOptions']
        // if (id_list == '' || id_list == null || id_list.length == 0) {
        //   return ''
        // }
        // let ProfessionValues = []
        // id_list.map((res) => {
        //   let selected = res
        //   getter_profession.map((options) => {
        //     if (options.id == selected) {
        //       ProfessionValues.push(options.display_string)
        //     }
        //   })
        // })
        // let strValue = ProfessionValues.join(', ')
        // resolve(strValue)
      })
      .catch(() => {
        reject('')
      })
  })
}

export function getCategoryValues(id_list) {
  return new Promise((resolve, reject) => {
    store
      .dispatch('dropdownValues/fetchCategoryData')
      .then(() => {
        let getter_category = store.getters['dropdownValues/getCategoryOptions']
        let result = getString(id_list, getter_category, 'name')
        resolve(result)
        // let getter_category = store.getters['dropdownValues/getCategoryOptions']

        // if (id_list == '' || id_list == null || id_list.length == 0) {
        //   return ''
        // }
        // let categoryValues = []
        // id_list.map((res) => {
        //   let selected = res

        //   getter_category.map((options) => {
        //     if (options.id == selected) {
        //       categoryValues.push(options.name)
        //     }
        //   })
        // })

        // let strValue = categoryValues.join(', ')
        // resolve(strValue)
      })
      .catch(() => {
        reject('')
      })
  })
}

export function getSubCategoryValues(categoryId, id_list) {
  return new Promise((resolve, reject) => {
    store
      .dispatch('dropdownValues/fetchSubCategories', categoryId)
      .then(() => {
        let getter_category =
          store.getters['dropdownValues/getSubcategoryOptions']
        let result = getString(id_list, getter_category, 'name')
        resolve(result)

        // let getter_category =
        //   store.getters['dropdownValues/getSubcategoryOptions']
        // if (id_list == '' || id_list == null || id_list.length == 0) {
        //   return ''
        // }
        // let subcategoryValues = []
        // id_list.map((res) => {
        //   let selected = res
        //   getter_category.map((options) => {
        //     if (options.id == selected) {
        //       subcategoryValues.push(options.name)
        //     }
        //   })
        // })
        // let strValue = subcategoryValues.join(', ')
        // resolve(strValue)
      })
      .catch(() => {
        reject('')
      })
  })
}

function getString(id_list, options_to_match, match_key_name) {
  try {
    if (id_list == '' || id_list == null || id_list.length == 0) {
      return ''
    }
    let SectorValues = []
    id_list.map((res) => {
      let selected = res

      options_to_match.map((options) => {
        if (options.id == selected) {
          SectorValues.push(options[match_key_name])
        }
      })
    })

    let strValue = SectorValues.join(', ')
    return strValue
  } catch (error) {
    return ''
  }
}

export function minWorkValueStr(id_list) {
  return new Promise((resolve, reject) => {
    store
      .dispatch('dropdownValues/fetchMinWork')
      .then(() => {
        let getter_value = store.getters['dropdownValues/getMinWorkOptions']
        let result = getString(id_list, getter_value, 'name')
        resolve(result)
      })
      .catch(() => {
        reject('')
      })
  })
}

export function getTurnOverOptionsString(id_list) {
  return new Promise((resolve, reject) => {
    store
      .dispatch('dropdownValues/fetchTurnover')
      .then(() => {
        let getter_value = store.getters['dropdownValues/getTurnOverOptions']
        let result = getString(id_list, getter_value, 'name')
        resolve(result)
      })
      .catch(() => {
        reject('')
      })
  })
}

// export function getLeadProjectTypeString(id_list) {
//   let company_turnover_options = appConstants.lead_project_type
//   let result = getString([id_list], company_turnover_options, 'value')
//   return result
// }

// export function getLeadAppxAreaString(id_list) {
//   let company_turnover_options = appConstants.lead_appx_area
//   let result = getString([id_list], company_turnover_options, 'value')
//   return result
// }

// export function getTypeOfContractString(id_list) {
//   let company_turnover_options = appConstants.lead_type_of_contract_0ptions
//   let result = getString([id_list], company_turnover_options, 'value')
//   return result
// }

// export function getContractorShouldHaveDoneString(id_list) {
//   let company_turnover_options = appConstants.contractor_should_have_done
//   let result = getString([id_list], company_turnover_options, 'value')
//   return result
// }
