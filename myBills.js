class Bill {              //constructor defines "Bill" class to store bill information (name, amount, due date)
    constructor(name, amount, dueDate) {
      this.name = name;
      this.amount = amount;
      this.dueDate = dueDate;
    }
  }
  
  class Bills {           // defines Bills class to manage bill creation and rendering
    constructor() {
      this.bills = [];
    }
  
    addBill(bill) {
      this.bills.push(bill);
    }
  
    renderBill(bill) {     // Create a new row for the bill
      const row = $("<tr>");
  
      const nameCell = $("<td>").text(bill.name);              // Create cells for the bill name, amount, due date, and actions here
      const amountCell = $("<td>").text(`$${bill.amount}`);
      const dueDateCell = $("<td>").text(bill.dueDate);
  
      const dueDate = new Date(bill.dueDate);            // Check if the due date passed
      const today = new Date();
      if (dueDate < today) {
        row.addClass("table-danger");  // If it's passed, show the danger class on the bill with passed due date.
        setTimeout(() => {
          row.removeClass("table-danger"); //remove the class after 3 seconds
        }, 3000);
  
        // Show an alert
        alert(`'${bill.name}' is past due!`); //show user the alert for the bills that are passed the due date
      }
  
      const deleteCell = $("<td>");           //create cell for delete buttons by calling <td> using JQuery
      const deleteButton = $("<button>").addClass("btn btn-danger").text("Delete"); 
      deleteButton.click(() => {
        this.deleteBill(bill);     
        row.remove();
      });
      deleteCell.append(deleteButton);  
  
      row.append(nameCell, amountCell, dueDateCell, deleteCell);
  
      $("#bill-list").append(row);      // append cells to the row, and append row to bill list table
    }
  
    renderBills() {
      $("#bill-list").empty();          //call id bill-list using Jquery and empty the table, then render each bills
      this.bills.forEach(bill => {
        this.renderBill(bill);
      });
    }
  
    deleteBill(bill) {
      const index = this.bills.indexOf(bill);     //function using splice to delete bill from the list 
      if (index !== -1) {
        this.bills.splice(index, 1);
      }
    }
  
    static createBillFromForm() {             //creates a Bill object from form submissions (used static method) 
      const name = $("#bill-name").val();
      const amount = $("#bill-amount").val();
      const dueDate = $("#bill-due-date").val();
      return new Bill(name, amount, dueDate);
    }
  }
  
  class DOMManager {      //manages DOM events 
    constructor(bills) {
      this.bills = bills;
    }
  
    addBill() {
      const bill = Bills.createBillFromForm();   //function to create new bills and add to bill list
      this.bills.addBill(bill);
      $("#bill-name").val("");        //empty string for new bill form values 
      $("#bill-amount").val("");
      $("#bill-due-date").val("");
      this.bills.renderBills();   //updates rendered bill list
    }
  }
  
  const bills = new Bills();       //created new bill object
  const domManager = new DOMManager(bills);         //new DOMManager object 
  $("#create-new-bill").click(() => domManager.addBill());   //call create-new-bill button using JQuery and bind the button with new DOMManager object 
  
  