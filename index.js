const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Middleware for input validation
const validateInput = (req, res, next) => {
  const { data } = req.body;
  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      error: "Invalid input: 'data' must be an array",
    });
  }
  next();
};

// POST /bfhl
app.post("/bfhl", validateInput, (req, res) => {
  try {
    const { data } = req.body;
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item) && item.length === 1);
    const highestAlphabet =
      alphabets.length > 0
        ? [
            alphabets.reduce((a, b) =>
              a.toLowerCase() > b.toLowerCase() ? a : b
            ),
          ]
        : [];

    const response = {
      is_success: true,
      user_id: "john_doe_17091999", // Replace with actual user_id
      email: "john@xyz.com", // Replace with actual email
      roll_number: "ABCD123", // Replace with actual roll number
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    };

    res.json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ is_success: false, error: "Internal server error" });
  }
});

// GET /bfhl
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ is_success: false, error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});