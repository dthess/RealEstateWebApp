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