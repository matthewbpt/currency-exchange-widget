const precision = (a) => {
  if (!isFinite(a)) return 0;
  let e = 1, p = 0;
  while (Math.round(a * e) / e !== a) { e *= 10; p++; }
  return p;
}

export const formatMax2Decimal = (n) => {
  const num = parseFloat(n);
  if (precision(num) > 2) {
    return num.toFixed(2);
  }

  return n.toString();
};