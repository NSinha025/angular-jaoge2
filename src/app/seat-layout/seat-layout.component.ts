import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seat-layout',
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.css'],
})
export class SeatLayoutComponent {
  rows: any[] = [];
  totalSeats: number = 80;
  seatsPerRow: number = 7;
  lastRowSeats: number = 3;
  bookedSeats: number[] = [];
  selectedSeats: number[] = [];

  constructor(private router: Router) {
    this.initializeSeats();
  }

  // Initialize the seats in the layout
  initializeSeats() {
    let seatNumber = 1;
    for (let i = 0; i < 12; i++) {
      if (i === 11) {
        this.rows.push({
          rowNumber: i + 1,
          seats: Array.from({ length: this.lastRowSeats }, () => seatNumber++),
        });
      } else {
        this.rows.push({
          rowNumber: i + 1,
          seats: Array.from({ length: this.seatsPerRow }, () => seatNumber++),
        });
      }
    }
  }

  // Function to handle seat selection
  selectSeats(seatCount: string) {
    const count = parseInt(seatCount, 10);
    if (count <= 0 || count > 7) {
      alert('You can book between 1 and 7 seats only.');
      return;
    }

    this.selectedSeats = [];

    for (let row of this.rows) {
      let availableSeats = row.seats.filter(
        (seat) => !this.bookedSeats.includes(seat)
      );
      if (availableSeats.length >= count) {
        this.selectedSeats = availableSeats.slice(0, count);
        break;
      }
    }

    if (this.selectedSeats.length === 0) {
      for (let row of this.rows) {
        let availableSeats = row.seats.filter(
          (seat) => !this.bookedSeats.includes(seat)
        );
        this.selectedSeats.push(...availableSeats);
        if (this.selectedSeats.length >= count) {
          this.selectedSeats = this.selectedSeats.slice(0, count);
          break;
        }
      }
    }

    if (this.selectedSeats.length === count) {
      this.bookSeats();
    } else {
      alert('Not enough seats available.');
      this.selectedSeats = [];
    }
  }

  // Book the selected seats
  bookSeats() {
    this.bookedSeats.push(...this.selectedSeats);
    alert(`Seats successfully booked: ${this.selectedSeats.join(', ')}`);
    this.selectedSeats = [];
  }

  // Logout and navigate back to the login page
  logout() {
    this.router.navigate(['/login']);
  }
}
