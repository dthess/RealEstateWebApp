import React, { Component } from 'react';
import "./HouseListingCalculator.css"

import Papa from 'papaparse';
import csvJsonData from './csvData';


class HouseListingCalculator extends Component {
    constructor() {
        super();
        this.state = {

            address: 'address',
            city: 'Detroit',
            state: 'MI',
            zip: '48122',
            bed: '2',
            bath: '2',
            sqft: '12345',
            numUnits: '2',
            homePrice: '100000',
            assessedValue: '100000',

            rentPrice: '',
            monthlyHOA: 0,
            monthlyUtilities: 0,
            monthlyGardenerPestControl: 50,
            monthlyRepairs: 100,
            monthlyManagement: 200,
            vacancyRate: 5,

            percentDown: 20,
            interestRate: '',
            termYears: 30,
            monthlyMortgagePayment: '',
            // annualPrincipal: Array(30).fill(0),
            results: {
                "Closing Cost": null,

                "Monthly Rent Income": null,
                "Annual Gross Income": null,

                "Monthly Property Tax": null,
                "Property Tax Rate": null,
                "Monthly Insurance": null,
                "Annual Insurance": null,
                "Monthly Vacancy": null,
                "Monthly Total Expenses": null,
                "Annual Total Expenses": null,

                "Monthly Net Income": null,
                "Annual Net Income": null,
                "CAP Rate": null,

                "Downpayment": null,
                "Monthly Net Income With Mortgage": null,
                "Annual Net Income With Mortgage": null,
                "Total Investment": null,
                "Cash On Cash Return": null,

                // "Annual Net With Equity": null,
                // "Cumulative Annual Net With Equity": 0,
                // "Annual ROI": 0,
                // "Cumulative ROI": 0
            },
            errors: {},
        };
    }

    componentDidMount() {
        // You can use csvJsonData directly here
        this.setState({ parsedData: csvJsonData });
        console.log(csvJsonData);
      }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        // if (name === "annualPrincipal") {
        //     const { termYears } = this.state;
        //     const index = parseInt(event.target.getAttribute("data-index"), 10);

        //     this.setState((prevState) => {
        //         const updatedAnnualPrincipal = [...prevState.annualPrincipal];
        //         updatedAnnualPrincipal[index] = parseFloat(value) || 0; // Ensure it's a number
        //         return { annualPrincipal: updatedAnnualPrincipal };
        //     });
        // } else {
            this.setState({
                [name]: value,
                errors: {
                    ...this.state.errors,
                    [name]: '', // Clear the error for the changed field
                },
            });
        // }
    }

    validateInputs = () => {
        const {
            address,
            city,
            state,
            zip,
            bed,
            bath,
            numUnits,
            sqft,
            homePrice,
            assessedValue,
    
            rentPrice,
    
            monthlyHOA,
            monthlyUtilities,
            monthlyGardenerPestControl,
            monthlyRepairs,
            monthlyManagement,
            vacancyRate,
    
            percentDown,
            interestRate,
            termYears,
            monthlyMortgagePayment,
        } = this.state;
    
        const errors = {};
    
        // Validation functions
        const isAlphanumeric = (value) => /^[a-zA-Z0-9\s]+$/.test(value);
        const isTwoLetterAbbreviation = (value) => /^[A-Za-z]{2}$/.test(value);
        const isFiveDigitNumber = (value) => /^\d{5}$/.test(value);
        const isBetween = (value, min, max) => value >= min && value <= max;
    
        if (!address.trim() || address.length < 3 || address.length > 30 || !isAlphanumeric(address)) {
            errors.address = 'Address must be 3-30 characters and contain only letters and numbers';
        }
    
        if (!city.trim() || city.length < 3 || city.length > 30 || !isAlphanumeric(city)) {
            errors.city = 'City must be 3-30 characters and contain only letters and numbers';
        }
    
        if (!isTwoLetterAbbreviation(state)) {
            errors.state = 'State must be a 2-letter abbreviation';
        }
    
        if (!isFiveDigitNumber(zip)) {
            errors.zip = 'Zip must be a 5-digit number';
        }
    
        if (!isBetween(bed, 1, 10)) {
            errors.bed = 'Beds must be between 1 and 10';
        }
    
        if (!isBetween(bath, 1, 10)) {
            errors.bath = 'Baths must be between 1 and 10';
        }
    
        if (!isBetween(numUnits, 1, 10)) {
            errors.numUnits = 'Number of Units must be between 1 and 10';
        }
    
        if (!isBetween(sqft, 100, 100000)) {
            errors.sqft = 'Square Feet must be between 100 and 100,000';
        }
    
        if (!isBetween(homePrice, 1, 1000000)) {
            errors.homePrice = 'Home Price must be between 1 and 1,000,000';
        }
    
        if (!isBetween(assessedValue, 1, 1000000)) {
            errors.assessedValue = 'Assessed Value must be between 1 and 1,000,000';
        }
    
        if (!isBetween(rentPrice, 1, 100000)) {
            errors.rentPrice = 'Rent Price must be between 1 and 100,000';
        }
    
        if (!isBetween(interestRate, 0, 15)) {
            errors.interestRate = 'Interest Rate must be between 0 and 15';
        }
    
        if (!isBetween(vacancyRate, 0, 15)) {
            errors.vacancyRate = 'Vacancy Rate must be between 0 and 15';
        }
    
        if (!isBetween(monthlyHOA, 0, 100000)) {
            errors.monthlyHOA = 'Monthly HOA must be between 0 and 100,000';
        }
    
        if (!isBetween(monthlyUtilities, 0, 100000)) {
            errors.monthlyUtilities = 'Monthly Utilities must be between 0 and 100,000';
        }
    
        if (!isBetween(monthlyGardenerPestControl, 0, 100000)) {
            errors.monthlyGardenerPestControl = 'Monthly Gardener/Pest Control must be between 0 and 100,000';
        }
    
        if (!isBetween(monthlyRepairs, 0, 100000)) {
            errors.monthlyRepairs = 'Monthly Repairs must be between 0 and 100,000';
        }
    
        if (!isBetween(monthlyManagement, 0, 100000)) {
            errors.monthlyManagement = 'Monthly Management must be between 0 and 100,000';
        }
    
        if (!isBetween(percentDown, 0, 100)) {
            errors.percentDown = 'Downpayment must be between 0 and 100';
        }
    
        if (![15, 20, 30].includes(termYears)) {
            errors.termYears = 'Term Years must be 15, 20, or 30';
        }
    
        if (!isBetween(monthlyMortgagePayment, 0, 100000)) {
            errors.monthlyMortgagePayment = 'Monthly Mortgage Payment must be between 0 and 100,000';
        }
    
        return errors;
    }

    // Handle form submission
    handleFormSubmit = (event) => {
        console.log("Form Submitted");

        event.preventDefault();

        const errors = this.validateInputs();
        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            console.log(errors)
            return;
        }

        this.setState({
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,

            bed: this.state.bed,
            bath: this.state.bath,
            numUnits: this.state.numUnits ,
            sqft: this.state.sqft ,
            homePrice: this.state.homePrice ,
            assessedValue: this.state.assessedValue ,

            rentPrice: this.state.rentPrice ,

            monthlyHOA: this.state.monthlyHOA ,
            monthlyUtilities: this.state.monthlyUtilities ,
            monthlyGardenerPestControl: this.state.monthlyGardenerPestControl ,
            monthlyRepairs: this.state.monthlyRepairs ,
            monthlyManagement: this.state.monthlyManagement ,
            vacancyRate: this.state.vacancyRate ,

            percentDown: this.state.percentDown ,
            interestRate: this.state.interestRate ,
            termYears: this.state.termYears ,
            monthlyMortgagePayment: this.state.monthlyMortgagePayment
        });

        this.calculateMetrics();
    }

    calculateMetrics = () => {
        console.log("Calculating")
        const { 
            zip,
            parsedData,
            rentPrice,
            numUnits,
            assessedValue,
            // annualInsurance,
            monthlyHOA,
            monthlyUtilities,
            monthlyGardenerPestControl,
            monthlyRepairs,
            monthlyManagement,
            vacancyRate,
            homePrice,
            percentDown,
            // termYears,
            monthlyMortgagePayment,
            // annualPrincipal,
        } = this.state;

        const matchingRow = parsedData.find((row) => row.Zip === zip);
        if (matchingRow) {
            console.log("ZIP Match Found")
            const annualPropertyTaxRate = parseFloat(matchingRow['Property Tax Rate']);
            const annualInsurance = parseFloat(matchingRow['Average Insurance']);

            // Calculate Income
            const monthlyRentIncome = rentPrice * numUnits;
            const annualGrossIncome = monthlyRentIncome * 12;

            // Calculate Expenses
            const annualPropertyTax = (annualPropertyTaxRate / 100) * assessedValue;
            const monthlyPropertyTax = annualPropertyTax / 12;
            const monthlyInsurance = annualInsurance / 12;
            const monthlyVacancy = (annualGrossIncome * (vacancyRate / 100)) / 12;
            const monthlyTotalExpenses = monthlyPropertyTax + monthlyInsurance + parseFloat(monthlyHOA)
                + parseFloat(monthlyUtilities) + parseFloat(monthlyGardenerPestControl)
                + parseFloat(monthlyRepairs) + parseFloat(monthlyManagement) + monthlyVacancy;
            const annualTotalExpenses = monthlyTotalExpenses * 12;

            // Calculate Net Income
            const monthlyNetIncome = monthlyRentIncome - monthlyTotalExpenses;
            const annualNetIncome = monthlyNetIncome * 12;
            const CAPRate = (annualNetIncome / homePrice) * 100;

            // Calculate Mortgage
            const downPayment = (percentDown / 100) * homePrice;
            const monthlyNetIncomeWithMortgage = monthlyNetIncome - monthlyMortgagePayment;
            const annualNetIncomeWithMortgage = monthlyNetIncomeWithMortgage * 12;
            const closingCost = homePrice * 0.01;
            const totalInvestment = downPayment + closingCost;
            const cashOnCashReturn = (annualNetIncomeWithMortgage / totalInvestment) * 100;

            // Calculate Amortization Table
            // const annualNetWithEquity = [];
            // const cumulativeAnnualNetWithEquity = [];
            // let annualNetWithEquityTotal = 0;
            // const annualROI = [];
            // const cumulativeROI = [];
            // let ROItotal = 0;
            // for (let i = 0; i < termYears; i++) {
            //     const x = annualPrincipal[i] + annualNetIncomeWithMortgage;
            //     annualNetWithEquity.push(x);
            //     annualNetWithEquityTotal += x;
            //     cumulativeAnnualNetWithEquity.push(annualNetWithEquityTotal);
            //     annualROI.push(x / totalInvestment);
            //     ROItotal += x / totalInvestment;
            //     cumulativeROI.push(ROItotal);
            // }

            // Update the results in the state
            this.setState({
                results: {
                    "Closing Cost": closingCost.toFixed(2),

                    "Monthly Rent Income": monthlyRentIncome.toFixed(2),
                    "Annual Gross Income": annualGrossIncome.toFixed(2),

                    "Monthly Property Tax": monthlyPropertyTax.toFixed(2),
                    "Property Tax Rate": annualPropertyTaxRate.toFixed(2),
                    "Monthly Insurance": monthlyInsurance.toFixed(2),
                    "Annual Insurance": annualInsurance.toFixed(2),
                    "Monthly Vacancy": monthlyVacancy.toFixed(2),
                    "Monthly Total Expenses": monthlyTotalExpenses.toFixed(2),
                    "Annual Total Expenses": annualTotalExpenses.toFixed(2),
                    

                    "Monthly Net Income": monthlyNetIncome.toFixed(2),
                    "Annual Net Income": annualNetIncome.toFixed(2),
                    "CAP Rate": CAPRate.toFixed(2),

                    "Monthly Net Income With Mortgage": monthlyNetIncomeWithMortgage.toFixed(2),
                    "Annual Net Income With Mortgage": annualNetIncomeWithMortgage.toFixed(2),
                    "Total Investment": totalInvestment.toFixed(2),
                    "Cash On Cash Return": cashOnCashReturn.toFixed(2),
                    // "Annual Net With Equity": annualNetWithEquity,
                    // "Cumulative Annual Net With Equity": cumulativeAnnualNetWithEquity,
                    // "Annual ROI": annualROI,
                    // "Cumulative ROI": cumulativeROI,
                },
            });
        } else {
            console.log("Zip match not found")
        }
    };

    render() {
        // const results = this.state.results;
        return (
            <div className='anim_gradient'>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="grid-container">
                    <div className="item">
                        <h2 className="subgrid-header">General Information</h2>
                        <div className="subgrid-container">
                       <label className="input-label">
                            Address :
                            <input className="input-box" type="text" onChange={this.handleInputChange}
                                name="address" value={this.state.address} />
                        </label>

                       <label className="input-label">
                            City:
                            <input className="input-box" type="text" onChange={this.handleInputChange}
                                name="city" value={this.state.city} />
                        </label>

                       <label className="input-label">
                            State:
                            <input className="input-box" type="text" onChange={this.handleInputChange}
                                name="state" value={this.state.state} />
                        </label>

                       <label className="input-label">
                            Zip:
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="zip" value={this.state.zip} />
                        </label>

                       <label className="input-label">
                            Beds:
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="bed" value={this.state.bed} />
                        </label>

                       <label className="input-label">
                            Baths:
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="bath" value={this.state.bath} />
                        </label>

                       <label className="input-label">
                            Square Feet:
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="sqft" value={this.state.sqft} />
                        </label>

                       <label className="input-label">
                            Number of Units:
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="numUnits" value={this.state.numUnits} />
                        </label>

                       <label className="input-label">
                            Home Price:
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="homePrice" value={this.state.homePrice} />
                        </label>

                       <label className="input-label">
                            Assessed Value:
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="assessedValue" value={this.state.assessedValue} />
                        </label>

                       <label className="label">

                        <div className='element'><span className='label-span'>Closing Cost:</span><span className='output'>${this.state.results['Closing Cost']}</span></div>
                        </label>
                        </div>
                    </div>

                    <div className="item">
                        <h2 className="subgrid-header">Income</h2>
                        <div className="subgrid-container">
                       <label className="input-label">
                            Rent Price :
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="rentPrice" value={this.state.rentPrice} />
                        </label>

                        <div className='element'><span className='label-span'>Monthly Rent Income: </span><span className='output'>${this.state.results['Monthly Rent Income']}</span></div>
                        <div className='element'><span className='label-span'>Annual Gross Income: </span><span className='output'>${this.state.results['Annual Gross Income']}</span></div>
                        </div>
                    </div>

                    <div className="item">
                        <h2 className="subgrid-header">Expenses</h2>
                        <div className="subgrid-container">

                        <div className='subgrid-column-header'>Monthly</div>
                        <div className='subgrid-column-header'>Annual</div>
                        <div className='element'>
                            <label className="label">
                                <span className='label-span'>Property Tax: </span><span className='output'>${this.state.results['Monthly Property Tax']}</span>
                            </label>
                        </div>
                        <div className='element'>
                       <label className="label">
                                <span className='label-span'>Property Tax Rate: </span><span className='output'> {this.state.results['Property Tax Rate']}%</span>
                        </label>
                        </div>
                        <div className='element'>
                       <label className="label">
                                <span className='label-span'>Insurance: </span><span className='output'> ${this.state.results['Monthly Insurance']}</span>
                        </label>
                        </div>
                        <div className='element'>

                       <label className="label">
                       <span className='label-span'>Insurance : </span><span className='output'> ${this.state.results['Annual Insurance']}</span>
                        </label>
                        </div>
                        <label className="input-label">
                            HOA : 
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="monthlyHOA" value={this.state.monthlyHOA} />
                        </label>
                        <div></div>
                       <label className="input-label">
                            Utilities : 
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="monthlyUtilities" value={this.state.monthlyUtilities} />
                        </label>
                        <div></div>
                       <label className="input-label">
                            Gardener/Pest Control :
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="monthlyGardenerPestControl" value={this.state.monthlyGardenerPestControl} />
                        </label>
                        <div></div>

                       <label className="input-label">
                            Repairs :
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="monthlyRepairs" value={this.state.monthlyRepairs} />
                        </label>
                        <div></div>

                       <label className="input-label">
                            Management :
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="monthlyManagement" value={this.state.monthlyManagement} />
                        </label>
                        <div></div>

                        <div className='element'><span className='label-span'>Vacancy: </span><span className='output'> ${this.state.results['Monthly Vacancy']}</span></div>

                        <label className="input-label">
                            Vacancy Rate:
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="vacancyRate" value={this.state.vacancyRate} />
                        </label>

                        <div className='element'><span className='label-span'>Total Expenses: </span><span className='output'> ${this.state.results['Monthly Total Expenses']}</span></div>
                        <div className='element'><span className='label-span'>Total Expenses: </span><span className='output'> ${this.state.results['Annual Total Expenses']}</span></div>
                        </div>
                    </div>

                    <div className="item">
                        <h2 className="subgrid-header">Net Income</h2>
                        <div className="subgrid-container">
                        <div className='element'><span className='label-span'>Monthly Net Income: </span><span className='output'>${this.state.results['Monthly Net Income']}</span></div>
                        <div className='element'><span className='label-span'>Annual Net Income: </span><span className='output'>${this.state.results['Annual Net Income']}</span></div>
                        <div></div>
                        <div className='element'><span className='label-span'>CAP Rate: </span><span className='output'>{this.state.results['CAP Rate']}%</span></div>
                        </div>
                    </div>

                    <div className="item">
                        <h2 className="subgrid-header">Mortgage</h2>
                        <div className="subgrid-container">
                       <label className="input-label">
                            Percent Down :
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="percentDown" value={this.state.percentDown} />
                        </label>
                        <div className='element'><span className='label-span'>Downpayment: </span><span className='output'>${this.state.results['Downpayment']}</span></div>

                       <label className="input-label">
                            Interest Rate :
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="interestRate" value={this.state.interestRate} />
                        </label>

                       <label className="input-label">
                            Mortgage Term (Years) :
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="termYears" value={this.state.termYears} />
                        </label>

                       <label className="input-label">
                            Mortgage Payment :
                            <input className="input-box" type="number" onChange={this.handleInputChange}
                                name="monthlyMortgagePayment" value={this.state.monthlyMortgagePayment} />
                        </label>
                        <div></div>
                        <div className='element'><span className='label-span'>Net Income w Mortgage: </span><span className='output'>${this.state.results['Monthly Net Income With Mortgage']}</span></div>
                        <div className='element'><span className='label-span'>Net Income w Mortgage: </span><span className='output'>${this.state.results['Annual Net Income With Mortgage']}</span></div>
                        <div className='element'><span className='label-span'>Total Investment: </span><span className='output'>${this.state.results['Total Investment']}</span></div>
                        <div className='element'><span className='label-span'>Cash On Cash Return: </span><span className='output'>{this.state.results['Cash On Cash Return']}%</span></div>
                        </div>
                    </div>

                    <div className="item">
                        <h2 className="subgrid-header">Equity Paydown</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Principal Paid</th>
                                    <th>Net Income w Mortgage</th>
                                    <th>Total Investment</th>
                                    <th>ROI</th>
                                    <th>Cumulative</th>
                                </tr>
                            </thead>
                            {/* <tbody>
                                {this.state.results['Annual Net With Equity'].map((annualNetWithEquity, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <input className="input-box"
                                                type="number"
                                                name={`annualPrincipal[${index}]`}
                                                value={this.state.annualPrincipal[index]}
                                                onChange={this.handleInputChange}
                                            />
                                        </td>
                                        <td>${this.state.results['Annual Net With Equity'][index]}</td>
                                        <td>${this.state.results['Total Investment'][index]}</td>
                                        <td>{(this.state.results['Annual ROI'][index] * 100).toFixed(2)}%</td>
                                        <td>{(this.state.results['Cumulative ROI'][index] * 100).toFixed(2)}%</td>
                                    </tr>
                                ))}
                                 <tr>
                                    <td>{this.state.termYears}</td>
                                    <td>
                                        <input className="input-box"
                                            type="number"
                                            name={`annualPrincipal[${this.state.termYears}]`}
                                            value={this.state.annualPrincipal[this.state.termYears]}
                                            onChange={this.handleInputChange}
                                        />
                                    </td>
                                    <td>${annualNetWithEquity}</td>
                                    <td>${this.state.results['Total Investment'][this.state.termYears]}</td>
                                    <td>{(this.state.results['Annual ROI'][this.state.termYears] * 100).toFixed(2)}%</td>
                                    <td>{(this.state.results['Cumulative ROI'][this.state.termYears] * 100).toFixed(2)}%</td>
                                </tr> 
                            </tbody> */}
                        </table>
                    </div>
                    </div>

                    <button className="calculate_btn" type="submit">Meow</button>
                </form>
                <div className='navbar'>This web application was made possible by David Hess ~~~ check out my github.com/dthess</div>
            </div>
        );
    }
}

export default HouseListingCalculator;
