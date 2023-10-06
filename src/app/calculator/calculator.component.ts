import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  inputForm = new FormGroup({
    day: new FormControl(''),
    month: new FormControl(''),
    year: new FormControl(''),
  });

  out = {
    yearDiff: '--',
    monthDiff: '--',
    dayDiff: '--',
  };

  validInputs = {
    day: true,
    month: true,
    year: true,
  };

  continue: boolean | undefined;

  submitForm() {
    const validatedValues = this.validateInputs(this.inputForm.value);

    if (this.continue) {
      let response = this.calculateAge(validatedValues);
      this.out.dayDiff = response.dayDiff.toString();
      this.out.monthDiff = response.monthDiff.toString();
      this.out.yearDiff = response.yearDiff.toString();
    }
  }

  calculateAge(date: any) {
    let inputDateString = `${date.month}/${date.day}/${date.year}`;
    let startDate = new Date(inputDateString);
    let endingDate = new Date();

    let endDate = new Date(endingDate);
    if (startDate > endDate) {
      const swap = startDate;
      startDate = endDate;
      endDate = swap;
    }
    const startYear = startDate.getFullYear();
    const february =
      (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0
        ? 29
        : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let yearDiff = endDate.getFullYear() - startYear;
    let monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    let dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }

    return { yearDiff, monthDiff, dayDiff };
  }

  validateInputs(inputValues: any) {
    let { day, month, year } = inputValues;

    if (day.length > 0 && month.length > 0 && year.length > 0) {
      day = parseInt(day);
      month = parseInt(month);
      year = parseInt(year);

      if (year <= new Date().getFullYear()) {
        this.validInputs.year = true;
      } else {
        this.validInputs.year = false;
      }

      if (month <= 12) {
        this.validInputs.month = true;
      } else {
        this.validInputs.month = false;
      }

      if (
        (day === 31 && [1, 3, 5, 7, 8, 10, 12].includes(month)) ||
        day <= 30
      ) {
        this.validInputs.day = true;
      } else {
        this.validInputs.day = false;
      }
    } else {
      return;
    }

    this.continue =
      this.validInputs.day === true &&
      this.validInputs.month === true &&
      this.validInputs.year === true
        ? true
        : false;
    return { day, month, year };
  }

  constructor() {}
}
