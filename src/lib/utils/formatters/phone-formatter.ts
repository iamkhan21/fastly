export function formatPhoneNumberToHR(phone: string | null) {
  if (!phone) return null;

  const cleaned = ("" + phone).replace(/\D/g, "");
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    const intlCode = match[1] ? `+${match[1]} ` : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }

  return phone;
}
