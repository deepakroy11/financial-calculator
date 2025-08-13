# Indian Finance Calculator

A comprehensive financial calculator web application designed specifically for Indian customers. Built with Next.js, Tailwind CSS, and Material UI.

## Features

### 🏠 Loan Calculators

- **EMI Calculator**: Calculate loan EMI, total interest, and payment schedule
- Supports home loans, personal loans, car loans, and more

### 📈 Investment Calculators

- **SIP Calculator**: Calculate mutual fund SIP returns and wealth creation
- **Fixed Deposit Calculator**: Calculate FD maturity amount and interest
- **Recurring Deposit Calculator**: Calculate RD returns and maturity value

### 💰 Tax Calculators

- **Income Tax Calculator**: Compare old vs new tax regime for FY 2024-25
- Includes standard deduction and cess calculations

### 🎯 Savings & Goal Planning

- **Retirement Planning Calculator**: Plan retirement corpus and monthly SIP
- **Savings Goal Calculator**: Calculate monthly savings for specific goals
- **Credit Card Interest Calculator**: Calculate payoff time and total interest

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: Material UI for accessible components
- **Icons**: React Icons for lightweight, scalable icons
- **TypeScript**: Full type safety and better developer experience

## Design Features

- 🎨 Clean, modern, and minimalistic design
- 📱 Mobile-first responsive layout
- 🎯 Soft colors and clear typography
- 📊 Organized calculator categories
- ✅ Input validation and error handling
- 🔄 Dynamic calculations without page reloads

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main page with calculator grid
│   ├── globals.css        # Global styles
│   └── theme.ts           # Material UI theme configuration
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── InputField.tsx
│   │   ├── CalculatorCard.tsx
│   │   └── ResultCard.tsx
│   └── calculators/       # Individual calculator components
│       ├── EMICalculator.tsx
│       ├── SIPCalculator.tsx
│       ├── FDCalculator.tsx
│       ├── RDCalculator.tsx
│       ├── TaxCalculator.tsx
│       ├── RetirementCalculator.tsx
│       ├── CreditCardCalculator.tsx
│       └── SavingsGoalCalculator.tsx
├── lib/
│   └── calculators.ts     # Financial calculation functions
├── types/
│   └── calculator.ts      # TypeScript type definitions
└── package.json
```

## Calculator Functions

All financial calculations are implemented in `lib/calculators.ts`:

- `calculateEMI()` - EMI calculation with compound interest
- `calculateSIP()` - SIP future value calculation
- `calculateFD()` - Fixed deposit maturity calculation
- `calculateRD()` - Recurring deposit calculation
- `calculateIncomeTax()` - Income tax for both regimes
- `calculateRetirement()` - Retirement corpus planning
- `calculateCreditCardInterest()` - Credit card payoff calculation
- `calculateSavingsGoal()` - Goal-based savings planning

## Key Features

### Validation

- Input validation for all calculator fields
- Error messages for invalid inputs
- Range validation for realistic values

### User Experience

- Clean, intuitive interface
- Instant calculations
- Clear result explanations
- Mobile-responsive design

### Accessibility

- Material UI components for accessibility
- Proper form labels and ARIA attributes
- Keyboard navigation support

## Customization

The app is built with modularity in mind:

1. **Add new calculators**: Create new components in `components/calculators/`
2. **Modify calculations**: Update functions in `lib/calculators.ts`
3. **Customize styling**: Modify Tailwind classes or Material UI theme
4. **Add categories**: Update the categories array in `app/page.tsx`

## Build for Production

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
