export class Reports {
  id = ''
  application = ''
  created_at = ''
  type = 0
  match_score = 0.0
  mandatory_match = 0
  mandatory_in_current = 0
  nonmandatory_match = 0
  nonmandatory_incurrent = 0
  allNonMandatory_match = 0
  details = []
  isMandatory = []
  isNotMandatory = []

  constructor(data) {
    this.id = data.id == undefined ? '' : data.id
    this.application = data.application == undefined ? '' : data.application
    this.created_at = data.created_at == undefined ? '' : data.created_at
    this.type = data.type == undefined ? 0 : data.type
    this.match_score = data.match_score == undefined ? 0.0 : data.match_score
    this.mandatory_match =
      data.mandatory_match == undefined ? 0 : data.mandatory_match
    this.mandatory_in_current =
      data.mandatory_in_current == undefined ? 0 : data.mandatory_in_current
    this.nonmandatory_match =
      data.nonmandatory_match == undefined ? 0 : data.nonmandatory_match
    this.nonmandatory_incurrent =
      data.nonmandatory_incurrent == undefined ? 0 : data.nonmandatory_incurrent
    this.allNonMandatory_match =
      data.allNonMandatory_match == undefined ? 0 : data.allNonMandatory_match

    if (
      data.details !== null &&
      data.details != undefined &&
      data.details.length > 0
    ) {
      for (let detail of data.details) {
        if (typeof detail === 'object') {
          let d = new details(detail)
          if (d.is_mandatory == true) {
            this.isMandatory.push(d)
          } else {
            this.isNotMandatory.push(d)
          }
          this.details.push(d)
        }
      }
    } else {
      data.details = []
      this.isMandatory = []
      this.isNotMandatory = []
    }
  }
}
export class details {
  is_mandatory = false
  id = ''
  experience = 0
  mandatory_incurrent = 0
  nonmandatory_incurrent = 0
  mandatory_match = 0
  nonmandatory_match = 0
  response = {
    requirement: '',
    inCurrentExp: '',
    isValueInCurrentExp: false,
    matched: true,
    requirement: '',
    requirement_currentExp: '',
    result: ''
  }
  constructor(data) {
    this.is_mandatory =
      data.is_mandatory == undefined ? false : data.is_mandatory
    this.id = data.id == undefined ? 0 : data.id
    this.experience = data.experience == undefined ? 0 : data.experience
    this.mandatory_incurrent =
      data.mandatory_incurrent == undefined ? 0 : data.mandatory_incurrent
    this.nonmandatory_incurrent =
      data.nonmandatory_incurrent == undefined ? 0 : data.nonmandatory_incurrent
    this.mandatory_match =
      data.mandatory_match == undefined ? 0 : data.mandatory_match
    this.nonmandatory_match =
      data.nonmandatory_match == undefined ? 0 : data.nonmandatory_match
    if (
      data.response != undefined &&
      data.response.matched != undefined &&
      data.response.requirement != undefined &&
      data.response.result != undefined
    ) {
      this.response.inCurrentExp = data.response.inCurrentExp
      this.response.isValueInCurrentExp = data.response.isValueInCurrentExp
      this.response.matched = data.response.matched
      this.response.requirement = data.response.requirement
      this.response.requirement_currentExp =
        data.response.requirement_currentExp
      this.response.result = data.response.result
    }
  }
}
