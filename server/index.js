const app = require("./src/app");
require("dotenv").config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server on line in port XD ${PORT}`);
});


// --watch