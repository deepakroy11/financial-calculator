export interface CalculatorCategory {
  id: string;
  name: string;
  icon: string;
  calculators: Calculator[];
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export interface ValidationError {
  field: string;
  message: string;
}
