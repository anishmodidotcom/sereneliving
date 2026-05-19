export function formatCurrency(amount: number, currency: "AED" | "INR" | "GBP" | "USD" = "AED") {
  const locale =
    currency === "INR"
      ? "en-IN"
      : currency === "GBP"
        ? "en-GB"
        : currency === "USD"
          ? "en-US"
          : "en-AE";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNightly(amount: number, currency: "AED" | "INR" | "GBP" | "USD") {
  return `from ${formatCurrency(amount, currency)} a night`;
}

export function formatDateRange(start: Date, end: Date) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "numeric",
  });
  return `${fmt.format(start)} to ${fmt.format(end)}`;
}

export function nightsBetween(start: Date, end: Date) {
  const ms = end.getTime() - start.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}
