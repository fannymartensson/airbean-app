/**
 * Endpoints
 * 
 * URL: /api/coffee
 * Method: GET
 * Body: Returnerar en kaffemeny.
 * 
 *  * URL: /api/account
 * Method: POST
 * Body: Skapar ett användarkonto
 * 
 * URL: /api/order
 * Method: POST
 * Body: Sparar en kaffebeställning för en användare och returnerar en ETA-tid och ordernummer  till frontend
 * 
 * URL: /api/order/:username (ändrade från :id till :username för att det blir tydligare på vilken användare man söker orderhistorik på, men principen är ju densamma)
 * Method: GET
 * Body: Returnerar orderhistorik för en specifik användare
 * 
 * 
 */
/**
 * Databas Accounts
 *
 * Användare:
 * 
 * Vad är den till för?
 * Spara våra användarkonton och kunna validera användarnamn och lösenord
 *
 * Vad vill vi spara?
 * Användarnman, lösenord och (ev. epost) inte krav. Varje användare behöver ha ett unikt id.
 *
 * Vad för typ av data?
 * Det är en array där varje användarkonto är ett objekt
 *
 * Ex:
 * {
 *   accounts:[
 *     {
 *       username: String,
 *       password: String,
 *       email: String
 *     }
 *   ]
 * }
 * 
 * Ordrar:
 * 
 *  Vad är den till för?
 * Spara orderdata för en specifik användare för att läsa av orderhistorik.
 *
 * Vad vill vi spara?
 * Items användaren beställt och total kostnad, order id och ETA tid när leveransen ska vara framme.
 *
 * Vad för typ av data?
 * Det är en array där varje order är ett objekt
 *
 * Ex:
 *   "orders": [
    {
      "username": "Lina",
      "items": [
        {
          "quantity": 2,
          "total": 78,
          "id": 1,
          "title": "Bryggkaffe",
          "desc": "Bryggd på månadens bönor.",
          "price": 39
        }
      ],
      "total": 78,
      "eta": "2021-05-04T08:04:07.019Z",
      "id": "e5d72cb0-1bad-4c75-a01c-0b12ed2ce538"
    }
  ]
 */

// Importerar de vi behöver
const lowdb = require("lowdb");
const express = require("express");
const FileSync = require("lowdb/adapters/FileSync");
const { v4: uuidv4 } = require('uuid');

const adapter = new FileSync('accounts.json');
const adapter2 = new FileSync('menu.json');
const db = lowdb(adapter);
const db2 = lowdb(adapter2);

const app = express();

app.use(express.json());

function initiateDatabase() {
  db.defaults({ accounts: [], orders: [] }).write();
  db2.defaults({ menu: [] }).write();
};

// GET anrop till menyn
app.get("/api/coffee", (_request, response) => {
  try {
    const menu = db2.get("menu").value();
    return response.json(menu);
  } catch (_error) {
    return response.status(500).json("Internal server error");
  }
});

// POST anrop till databasen accounts
// Body ser ut såhär: { username: 'Lina', password: 'pwd12', email: "lina@lina.com"}
app.post("/api/account", (request, response) => {
  const { username, password, email } = request.body;
  console.log("Konto att lägga till:", username, password, email);

  if (!username || !password || !email) {
    return response.status(400).json("Bad request");
  }

  // Kollar om användarnamn eller e-post redan finns i databasen
  const usernameExists = db.get("accounts").find({ username }).value();
  const emailExists = db.get("accounts").find({ email }).value();

  if (usernameExists || emailExists) {
    return response.status(409).json("Email or username already exists");
  }

  // Om användarnamnet & Emailen inte finns sedan tidigare lägg till i databasen Accounts
  try {
    db.get("accounts").push({ username, password, email }).write();
    return response.status(201).json("Registered account successfully");
  } catch (error) {
    console.error(error);
    return response.status(500).json("Internal server error");
  }
});

// POST: Lägg order
// Body ser ut såhär: { username: 'Chris', items: [{id: 1, quantity: 2}, ...]}
app.post("/api/order", (request, response) => {
  const { username, items } = request.body;
  console.log("Order att lägga:", username, items);

  if (!username || !items || !items.length) {
    return response.status(400).json("Bad request");
  }

  // Kollar om användarnamn finns i databasen
  const usernameExists = db.get("accounts").find({ username }).value();
  if (!usernameExists) {
    return response.status(401).json("Unauthorized");
  }

  // Räknar ut totalen och lägger till order i databasen
  try {
    const menuItems = db2.get("menu");
    const orderItems = [];
    for (const { id, quantity } of items) {
      const db2Item = menuItems.find({ id }).value();
      // Ensure item exists in menu
      if (!db2Item) {
        return response
          .status(400)
          .json("One or more item in the order was not found");
      }
      const total = db2Item.price * quantity;
      orderItems.push({ quantity, total, ...db2Item });
    }
    const orderTotal = orderItems.reduce(
      (total, currentItem) => (total += currentItem.total),
      0
    );

    // Adderar 15 minuter till ETA tiden
    const eta = new Date();
    eta.setMinutes(eta.getMinutes() + 15);

    // Genererar unika id nummer
    const id = uuidv4();

    // Sparar ordern i databasen
    db.get("orders")
      .push({ username, items: orderItems, total: orderTotal, eta, id })
      .write();

    return response.status(201).json({ eta, id });
  } catch (error) {
    console.error(error);
    return response.status(500).json("Internal server error");
  }
});

// GET anrop till orders
// Returnerar ordrar för användaren
app.get("/api/order/:username", (request, response) => {
  const { username } = request.params;

  if (!username) {
    return response.status(400).json("Bad request");
  }

  try {
    // Kollar så användaren extisterar
    const user = db.get("accounts").find({ username }).value();
    if (!user) {
      return response.status(404).json("Not found");
    }

    // Får ut alla ordrar från användaren
    const orders = db.get("orders").filter({ username }).value();

    return response.json(orders);
  } catch (error) {
    console.error(error);
    return response.status(500).json("Internal server error");
  }
});

// Visar så servern är startad korrekt och initierar databasen
const PORT = 3001;

app.listen(3001, () => {
  console.info(`Server started on port ${PORT}`);
  initiateDatabase();
});
