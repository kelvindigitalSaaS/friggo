/**
 * Validates a Brazilian CPF number.
 * Calculates check digits using the official algorithm.
 */
export function isValidCPF(cpf: string): boolean {
  if (!cpf) return false;
  
  // Remove non-numeric characters
  const cleanCPF = cpf.replace(/\D/g, "");
  
  // Must be 11 digits
  if (cleanCPF.length !== 11) return false;
  
  // Common invalid patterns (all digits same)
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  // Validate first check digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cleanCPF.charAt(9))) return false;
  
  // Validate second check digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cleanCPF.charAt(10))) return false;
  
  return true;
}

/**
 * Formats a string as a CPF (000.000.000-00).
 */
export function formatCPF(value: string): string {
  const clean = value.replace(/\D/g, "");
  return clean
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}
