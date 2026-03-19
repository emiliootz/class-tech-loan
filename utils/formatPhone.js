/**
 * Formats a phone number string to 999-999-9999.
 * Returns the original string unchanged if it isn't exactly 10 digits.
 */
function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  return phone;
}

module.exports = formatPhoneNumber;
