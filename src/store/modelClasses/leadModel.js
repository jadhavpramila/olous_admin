import appConstants from '../../appConstants'

export class Lead {
  id = ''
  user_id = ''
  title = ''
  category = ''
  category_name = ''
  sub_categorie_name = ''
  type_of_contract_name = ''
  project_type_name = ''
  appx_area_name = ''
  contractor_turnover_name = ''
  contractor_should_have_done_name = ''
  min_work_value_name = ''
  sub_category = []
  company_name = ''
  country = ''
  country_code = ''
  country_iso = ''
  state = ''
  state_iso = ''
  city = ''
  lat = ''
  lng = ''
  pin = ''
  address = ''
  status = ''
  min_work_value = 1
  contact_name = ''
  email = ''
  phone = ''
  requirement = ''
  urgent = false
  no_of_applicants = 0

  appx_area = ''
  contractor_should_have_done = ''
  contractor_turnover = ''
  mandatory_location = false
  project_type = ''
  type_of_contract = ''

  approved_at = ''
  expires_at = ''
  created_at = ''
  updated_at = ''
  city_state_country = ''
  rejection_comment = ''
  encrypted_id = ''

  constructor(data) {
    this.id = data.id == undefined ? '' : data.id
    this.user_id = data.user_id == undefined ? '' : data.user_id
    this.title = data.title == undefined ? '' : data.title
    this.category = data.category == undefined ? '' : data.category

    this.sub_category = data.sub_category == undefined ? '' : data.sub_category
    if (this.sub_category instanceof Array) {
      if (this.sub_category.length > 0) {
        this.sub_category = this.sub_category[0]
      }

      if (this.sub_category.length == 0) {
        this.sub_category = ''
      }
    }
    this.company_name = data.company_name == undefined ? '' : data.company_name

    this.country = data.country == undefined ? '' : data.country

    this.country_code = data.country_code == undefined ? '' : data.country_code
    this.country_iso = data.country_iso == undefined ? '' : data.country_iso
    this.state = data.state == undefined ? '' : data.state
    this.state_iso = data.state_iso == undefined ? '' : data.state_iso
    this.city = data.city == undefined ? '' : data.city

    this.lat = data.lat == undefined ? '' : data.lat
    this.lng = data.lng == undefined ? '' : data.lng
    this.pin = data.pin == undefined ? '' : data.pin

    this.status = data.status == undefined ? '' : data.status
    this.min_work_value =
      data.min_work_value == undefined ? 1 : data.min_work_value

    this.contact_name = data.contact_name == undefined ? '' : data.contact_name
    this.email = data.email == undefined ? '' : data.email
    this.phone = data.phone == undefined ? '' : data.phone

    this.requirement = data.requirement == undefined ? '' : data.requirement
    this.urgent = data.urgent == undefined ? '' : data.urgent

    this.no_of_applicants =
      data.no_of_applicants == undefined || data.no_of_applicants == null
        ? 0
        : data.no_of_applicants

    this.appx_area = data.appx_area == undefined ? '' : data.appx_area
    this.contractor_should_have_done =
      data.contractor_should_have_done == undefined
        ? ''
        : data.contractor_should_have_done
    this.contractor_turnover =
      data.contractor_turnover == undefined ? '' : data.contractor_turnover
    this.mandatory_location =
      data.mandatory_location == undefined ? false : data.mandatory_location
    this.project_type = data.project_type == undefined ? '' : data.project_type
    this.type_of_contract =
      data.type_of_contract == undefined ? '' : data.type_of_contract

    this.category_name =
      data.category_name == undefined ? '' : data.category_name
    this.sub_categorie_name =
      data.sub_categorie_name == undefined ? '' : data.sub_categorie_name
    this.type_of_contract_name =
      data.type_of_contract_name == undefined ? '' : data.type_of_contract_name
    this.project_type_name =
      data.project_type_name == undefined ? '' : data.project_type_name
    this.appx_area_name =
      data.appx_area_name == undefined ? '' : data.appx_area_name
    this.contractor_turnover_name =
      data.contractor_turnover_name == undefined
        ? ''
        : data.contractor_turnover_name
    this.contractor_should_have_done_name =
      data.contractor_should_have_done_name == undefined
        ? ''
        : data.contractor_should_have_done_name
    this.min_work_value_name =
      data.min_work_value_name == undefined ? '' : data.min_work_value_name

    this.approved_at = data.approved_at == undefined ? '' : data.approved_at
    this.expires_at = data.expires_at == undefined ? '' : data.expires_at
    this.created_at = data.created_at == undefined ? '' : data.created_at
    this.updated_at = data.updated_at == undefined ? '' : data.updated_at
    this.rejection_comment =
      data.rejection_comment == undefined ? '' : data.rejection_comment
    this.encrypted_id = data.encrypted_id == undefined ? '' : data.encrypted_id

    this.city_state_country = this.getFullAddress()
    this.address = data.address == undefined ? '' : data.address
  }

  getFullAddress() {
    let arr = []
    if (this.city != '') arr.push(this.city)
    if (this.state != '') arr.push(this.state)
    if (this.country != '') arr.push(this.country)
    return arr.join(', ')
  }
}

export class CreateApplicationList {
  getListOfApplicants(data) {
    let applicants_obj_list = []
    let applicants = data.applicants
    let users = data.users
    let companies = data.companies

    for (var i = 0; i < applicants.length; i++) {
      let applicant_obj = new LeadApplication(applicants[i])

      let applicant_details = applicants[i].applicant_details

      if (applicant_details == null) {
        continue
      }

      applicant_obj.setApplicantDetails(applicant_details)

      // let Search_applicant_in = []

      // if (applicant_obj.applied_as == appConstants.lead_applied_as.USER) {
      //   Search_applicant_in = users
      // } else {
      //   Search_applicant_in = companies
      // }

      // for (var j = 0; j < Search_applicant_in.length; j++) {
      //   if (Search_applicant_in[j]['id'] == applicant_obj.applicant_id) {
      //     applicant_details = Search_applicant_in[j]
      //     break
      //   }
      // }

      // if (applicant_details != null) {
      //   applicant_obj.setApplicantDetails(applicant_details)
      // }

      applicants_obj_list.push(applicant_obj)
    }

    return applicants_obj_list
  }
}

export class LeadApplication {
  id = ''
  lead_id = ''
  applied_as = ''
  applicant_id = ''
  application_status = ''
  applicant_user_id = ''
  report_images_folder = ''
  report_images = []
  report_pdf = ''
  applicant_details = null

  constructor(data) {
    this.id = data.id == undefined ? '' : data.id
    this.lead_id = data.lead_id == undefined ? '' : data.lead_id
    this.applied_as = data.applied_as == undefined ? '' : data.applied_as
    this.applicant_id = data.applicant_id == undefined ? '' : data.applicant_id
    this.application_status =
      data.application_status == undefined ? '' : data.application_status
    this.applicant_user_id =
      data.applicant_user_id == undefined ? '' : data.applicant_user_id

    this.report_images_folder =
      data.report_images_folder == undefined ? '' : data.report_images_folder
    this.report_images =
      data.report_images == undefined ? [] : data.report_images
    this.report_pdf = data.report_pdf == undefined ? '' : data.report_pdf
  }

  setApplicantDetails(applicant_data) {
    if (applicant_data == null) {
      return null
    }

    let obj = null

    if (this.applied_as == appConstants.lead_applied_as.USER) {
      obj = new UserApplicant(applicant_data)
    } else {
      obj = new BusinessApplicant(applicant_data)
    }

    this.applicant_details = obj
  }
}

class BusinessApplicant {
  id = ''
  name = ''
  slug = ''
  banner_image = ''
  // short_description = ''
  // address = ''
  website = ''
  logo_url = 0
  turnover = 1
  employee_strength = 1
  category = ''
  sub_categories = ''
  min_work_value = 1
  match_percentage = 100
  turnover_name = ''
  min_work_value_name = ''
  absolute_turnover = ''
  absolute_turnover_unit = ''

  constructor(data) {
    this.id = data.id == undefined ? '' : data.id
    this.name = data.name == undefined ? '' : data.name
    this.slug = data.slug == undefined ? '' : data.slug
    this.logo_url = this.getBusinessImages(
      data.logo == undefined ? '' : data.logo
    )
    this.banner_image = this.getBusinessImages(
      data.banner_image == undefined ? '' : data.banner_image
    )
    // this.short_description =
    //   data.short_description == undefined ? '' : data.short_description
    // this.address = data.address == undefined ? '' : data.address
    this.match_percentage =
      data.match_percentage == undefined ? '' : data.match_percentage

    this.website = data.website == undefined ? '' : data.website
    this.turnover = data.turnover == undefined ? '' : data.turnover
    this.employee_strength =
      data.employee_strength == undefined ? '' : data.employee_strength
    this.category = data.category == undefined ? '' : data.category
    this.sub_categories =
      data.sub_categories == undefined ? '' : data.sub_categories
    this.min_work_value =
      data.min_work_value == undefined ? '' : data.min_work_value

    this.turnover_name =
      data.turnover_name == undefined ? '' : data.turnover_name
    this.min_work_value_name =
      data.min_work_value_name == undefined ? '' : data.min_work_value_name

    this.absolute_turnover =
      data.absolute_turnover == undefined ? '' : data.absolute_turnover
    this.absolute_turnover_unit =
      data.absolute_turnover_unit == undefined
        ? ''
        : data.absolute_turnover_unit

    this.nameInitials = this.getNameInitials()
  }

  getBusinessImages(imageFileNAme) {
    if (imageFileNAme == '') {
      return ''
    }
    let url = `${process.env.VUE_APP_IMGURL}${imageFileNAme}`
    return url
  }

  getNameInitials() {
    let name_array = this.name.trim().split(' ')

    if (name_array.length == 0) {
      return ''
    }

    if (name_array.length == 1) {
      return name_array[0].trim().charAt(0)
    }

    if (name_array.length >= 2) {
      let initials = `${name_array[0]
        .trim()
        .charAt(0)}${name_array[1].trim().charAt(0)}`

      return initials
    }
  }
}

class UserApplicant {
  id = ''
  first_name = ''
  last_name = ''
  name = ''
  slug = ''
  profile_pic = ''
  designation = ''
  address = ''
  total_exp = 0
  match_percentage = 100

  constructor(data) {
    this.id = data.id == undefined ? '' : data.id
    this.first_name = data.first_name == undefined ? '' : data.first_name
    this.last_name = data.last_name == undefined ? '' : data.last_name
    this.name = this.getFullName()
    this.slug = data.slug == undefined ? '' : data.slug
    this.profile_pic = data.profile_pic == undefined ? '' : data.profile_pic
    this.designation = data.designation == undefined ? '' : data.designation
    this.address = data.address == undefined ? '' : data.address
    this.total_exp = data.total_exp == undefined ? '' : data.total_exp
    this.match_percentage =
      data.match_percentage == undefined ? '' : data.match_percentage
    this.nameInitials = this.getNameInitials()
  }

  getFullName() {
    arr = []
    if (this.first_name) arr.push(this.first_name)
    if (this.last_name) arr.push(this.last_name)

    return arr.join(' ')
  }

  getNameInitials() {
    let initials = ''
    let first_name = this.first_name.trim()
    let last_name = this.last_name.trim()

    if (first_name != null && first_name != '') arr.push(first_name.charAt(0))
    if (last_name != null && last_name != '') arr.push(last_name.charAt(0))

    return arr.join('')
  }
}
