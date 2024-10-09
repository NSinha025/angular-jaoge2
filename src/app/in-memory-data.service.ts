import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  // Initializing 80 seats as per the configuration: 7 seats in each of the first 11 rows and 3 seats in the last row.
  seats = Array.from({ length: 80 }, (_, index) => {
    const rowNumber = Math.floor(index / 7) + 1;
    const seatNumber = index + 1;
    return {
      seatNumber: seatNumber,
      rowNumber: rowNumber,
      status: 'available' // All seats start as available
    };
  });

  constructor() {}

  // Fetch all seat information
  getSeats() {
    return this.seats;
  }

  // Function to reserve seats based on the input seat count
  reserveSeats(seatCount: number): { success: boolean; message: string; bookedSeats?: number[] } {
    const availableSeats = this.seats.filter(seat => seat.status === 'available');

    // Check if there are enough seats
    if (availableSeats.length < seatCount) {
      return { success: false, message: 'Not enough seats available' };
    }

    // First, try to find a single row with enough available seats
    const rowWiseSeats: { [key: number]: number[] } = {}; // Group seats by row number
    availableSeats.forEach(seat => {
      if (!rowWiseSeats[seat.rowNumber]) {
        rowWiseSeats[seat.rowNumber] = [];
      }
      rowWiseSeats[seat.rowNumber].push(seat.seatNumber);
    });

    // Check if any row has all the required seats in one row
    for (const row in rowWiseSeats) {
      if (rowWiseSeats[row].length >= seatCount) {
        const seatsToBook = rowWiseSeats[row].slice(0, seatCount);
        this.updateSeatStatus(seatsToBook, 'booked');
        return { success: true, message: `Seats successfully reserved in row ${row}!`, bookedSeats: seatsToBook };
      }
    }

    // If no single row has enough seats, find the closest seats across multiple rows
    const seatsToBook = availableSeats.slice(0, seatCount).map(seat => seat.seatNumber);
    this.updateSeatStatus(seatsToBook, 'booked');

    return { success: true, message: `Seats booked nearby across rows.`, bookedSeats: seatsToBook };
  }

  // Function to update seat status
  private updateSeatStatus(seatNumbers: number[], status: string) {
    this.seats.forEach(seat => {
      if (seatNumbers.includes(seat.seatNumber)) {
        seat.status = status;
      }
    });
  }
}
