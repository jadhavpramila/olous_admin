export class JobPricingPlan {
  id = ''
  plan_name = ''
  plan_details = ''
  plan_price = 0.0
  currency = 0
  country = ''
  plan_type = 0
  plan_code = ''
  country_iso = ''
  country_code = ''
  is_active = true
  created_at = ''
  jobs_allocated = 0

  constructor(data) {
    this.id = data.id == undefined ? '' : data.id
    this.plan_name = data.plan_name == undefined ? '' : data.plan_name
    this.plan_details = data.plan_details == undefined ? '' : data.plan_details
    this.plan_price = data.plan_price == undefined ? 0 : data.plan_price
    this.currency = data.currency == undefined ? 0.0 : data.currency
    this.country = data.country == undefined ? 0 : data.country
    this.plan_type = data.plan_type == undefined ? 0 : data.plan_type
    this.plan_code = data.plan_code == undefined ? 0 : data.plan_code
    this.country_iso = data.country_iso == undefined ? 0 : data.country_iso
    this.country_code = data.country_code == undefined ? 0 : data.country_code
    this.is_active = data.is_active == undefined ? '' : data.is_active
    this.created_at = data.created_at == undefined ? 0 : data.created_at
    this.jobs_allocated =
      data.jobs_allocated == undefined ? 0.0 : data.jobs_allocated

    // if (
    //   data.plan_details !== null &&
    //   data.plan_details != undefined &&
    //   data.plan_details.length > 0
    // ) {
    //   for (let detail of data.plan_details) {
    //     if (typeof detail === 'object') {
    //       let d = new details(detail)
    //       if (d.is_mandatory == true) {
    //         this.isMandatory.push(d)
    //       } else {
    //         this.isNotMandatory.push(d)
    //       }
    //       this.plan_details.push(d)
    //     }
    //   }
    // } else {
    //   data.plan_details = []
    //   this.isMandatory = []
    //   this.isNotMandatory = []
    // }
  }
}
