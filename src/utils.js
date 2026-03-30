const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 8,
});

export const safeJsonParse = (input, fallback) => {
  try {
    if (typeof input !== "string" || input.trim() === "") {
      return fallback;
    }
    return JSON.parse(input);
  } catch {
    return fallback;
  }
};

export const getDollarDisplayValue = (value) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return "$0.00";
  }

  if (Math.abs(numericValue) > 0 && Math.abs(numericValue) < 0.01) {
    return `$${numericValue.toFixed(8)}`;
  }

  return usdFormatter.format(numericValue);
};

export const getPercentage = (value, total) => {
  const safeValue = Number(value);
  const safeTotal = Number(total);

  if (!Number.isFinite(safeValue) || !Number.isFinite(safeTotal) || safeTotal === 0) {
    return "0.00%";
  }

  return `${((safeValue / safeTotal) * 100).toFixed(2)}%`;
};

export const fetchJson = async (url, options = {}) => {
  const { timeout = 12000, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(fetchOptions.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
};
