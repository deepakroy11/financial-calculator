// Utility to convert numbers to words (Indian numbering system)
export const numberToWords = (num: number): string => {
  if (num === 0) return "Zero";
  if (isNaN(num) || num < 0) return "";

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const convertHundreds = (n: number): string => {
    let result = "";

    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }

    if (n >= 20) {
      result += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    }

    if (n > 0) {
      result += ones[n] + " ";
    }

    return result.trim();
  };

  // Handle Indian numbering system (Crore, Lakh, Thousand)
  if (num >= 10000000) {
    // 1 Crore
    const crores = Math.floor(num / 10000000);
    let remainder = num % 10000000;
    let result = convertHundreds(crores) + " Crore";

    if (remainder >= 100000) {
      // Lakh
      const lakhs = Math.floor(remainder / 100000);
      result += " " + convertHundreds(lakhs) + " Lakh";
      remainder = remainder % 100000;
    }

    if (remainder >= 1000) {
      // Thousand
      const thousands = Math.floor(remainder / 1000);
      result += " " + convertHundreds(thousands) + " Thousand";
      remainder = remainder % 1000;
    }

    if (remainder > 0) {
      result += " " + convertHundreds(remainder);
    }

    return result.trim();
  }

  if (num >= 100000) {
    // 1 Lakh
    const lakhs = Math.floor(num / 100000);
    let remainder = num % 100000;
    let result = convertHundreds(lakhs) + " Lakh";

    if (remainder >= 1000) {
      const thousands = Math.floor(remainder / 1000);
      result += " " + convertHundreds(thousands) + " Thousand";
      remainder = remainder % 1000;
    }

    if (remainder > 0) {
      result += " " + convertHundreds(remainder);
    }

    return result.trim();
  }

  if (num >= 1000) {
    // Thousand
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;
    let result = convertHundreds(thousands) + " Thousand";

    if (remainder > 0) {
      result += " " + convertHundreds(remainder);
    }

    return result.trim();
  }

  return convertHundreds(num);
};

// Format currency in words
export const formatCurrencyInWords = (amount: number): string => {
  if (amount === 0) return "Zero Rupees";
  if (isNaN(amount) || amount < 0) return "";

  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);

  let result = numberToWords(rupees);
  if (result) {
    result += rupees === 1 ? " Rupee" : " Rupees";
  }

  if (paise > 0) {
    const paiseWords = numberToWords(paise);
    if (paiseWords) {
      result += " and " + paiseWords + (paise === 1 ? " Paisa" : " Paise");
    }
  }

  return result;
};

// Format percentage in words
export const formatPercentageInWords = (percentage: number): string => {
  if (percentage === 0) return "Zero Percent";
  if (isNaN(percentage) || percentage < 0) return "";

  const wholeNumber = Math.floor(percentage);
  const decimal = Math.round((percentage - wholeNumber) * 100);

  let result = numberToWords(wholeNumber);
  if (result) {
    result += " Percent";
  }

  if (decimal > 0) {
    const decimalWords = numberToWords(decimal);
    if (decimalWords) {
      result += " and " + decimalWords + " Hundredths";
    }
  }

  return result;
};

// Format years in words
export const formatYearsInWords = (years: number): string => {
  if (years === 0) return "Zero Years";
  if (isNaN(years) || years < 0) return "";

  const result = numberToWords(years);
  return result + (years === 1 ? " Year" : " Years");
};

// Format months in words
export const formatMonthsInWords = (months: number): string => {
  if (months === 0) return "Zero Months";
  if (isNaN(months) || months < 0) return "";

  const result = numberToWords(months);
  return result + (months === 1 ? " Month" : " Months");
};
