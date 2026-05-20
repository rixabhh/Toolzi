export function diffDates(start: string, end: string, includeEnd = false) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return null;
  const ms = endDate.getTime() - startDate.getTime() + (includeEnd ? 86_400_000 : 0);
  const days = Math.max(0, Math.floor(ms / 86_400_000));
  return {
    days,
    months: Math.floor(days / 30.4375),
    years: Math.floor(days / 365.25)
  };
}

export function calculateAge(dob: string) {
  const birth = new Date(`${dob}T00:00:00`);
  const now = new Date();
  if (Number.isNaN(birth.getTime())) return null;
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < now) nextBirthday.setFullYear(now.getFullYear() + 1);
  const nextBirthdayDays = Math.ceil((nextBirthday.getTime() - now.getTime()) / 86_400_000);
  return { years, months, days, nextBirthdayDays };
}
