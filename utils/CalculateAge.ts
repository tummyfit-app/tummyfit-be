export function calculate(birthDate: Date): number {
  const today = new Date();

  const checkMonth = today.getMonth() + 1 - birthDate.getMonth();
  let age: number = today.getFullYear() - birthDate.getFullYear();

  if (
    checkMonth < 0 ||
    (checkMonth === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}
