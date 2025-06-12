# Seat Locking Workflow – Solution Explanation

## **How the Solution Works**

- The `Seats` table was updated to include two nullable fields:
  - `lockedBy`
  - `lockedUntil`

- On checkout, a `POST` request is sent containing:
  - Seat IDs
  - Customer ID

- The backend executes a single query that updates the seats if the following criteria are met:
  - The seat is in the list of requested seat IDs
  - The seat matches the specific event ID
  - The seat is not taken (`isTaken = false`)
  - The seat is not currently locked (`lockedUntil IS NULL`) or the lock has expired (`lockedUntil < current date and time`)

- If all criteria are met:
  - Update the seat by setting `lockedBy` to the customer ID
  - Set `lockedUntil` to current time + 5 minutes (lock expiration)

- If the criteria are not met:
  - Return a response to the user stating that one or more of the seats are either locked or taken

- On payment:
  - Confirm the reservation is still valid by checking if the lock has not expired
  - If valid, mark the seat as taken and clear the `lockedBy` and `lockedUntil` fields

---

## **How It Solves the Problem**

- This approach ensures **atomicity** by locking seats and checking their availability in **a single operation**.
- This eliminates race conditions between customers attempting to book the same seats.
- Once seats are locked, they can be shown as unavailable to other customers during the lock period.
- If a customer takes too long to complete the payment, the lock expires after 5 minutes, automatically freeing the seats.
- This mechanism balances fairness, responsiveness, and data consistency.

---

## **Clarification**

1. **Customer X** selects seats A1, A2, A3 and proceeds to checkout.
2. **Customer Y**, at the same time, selects the same seats and proceeds to checkout.
3. When **Customer X** clicks "Checkout", the backend locks those seats.
4. **Customer Y** then receives a message:
   _"One or more seats are either taken or locked."_
5. If **Customer X** completes payment within 5 minutes, the reservation is confirmed.
6. If the session expires, the lock is removed, and **Customer Y** may now proceed to reserve the seats.

> Even if both customers press "Checkout" at nearly the same time, the system ensures the first one to hit the database gets priority.

---

## **Limitations**

- While the solution is fast, reliable, and atomic, there are some considerations:
  - The two temporary fields (`lockedBy`, `lockedUntil`) can occupy unnecessary space if not cleaned properly.
  - Locked seat data is not retained for logging or analytics, as it gets cleared on confirmation or expiration.

  **Alternative Approach**:
  - Create a separate `LockedSeats` table.
  - This offers better data management and traceability but comes at the cost of:
    - More API calls
    - Slower response times
