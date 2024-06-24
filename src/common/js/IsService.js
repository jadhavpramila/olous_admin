export function isServiceBasedCompany(company_category) {
  if (company_category == 1 || company_category == 2 || company_category == 3) {
    return true
  } else {
    return false
  }
}

export function isProductBasedCompany(company_category) {
  if (company_category == 1 || company_category == 2 || company_category == 3) {
    return false
  } else {
    return true
  }
}
