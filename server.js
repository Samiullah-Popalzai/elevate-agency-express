const path = require("path");
const express = require("express");
const pool = require("./src/config/database");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true })); // parse <form> POSTs
app.use(express.static(path.join(__dirname, "public"))); // serve index.html
app.use(express.json());

app.post("/contact", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const result = await pool.query(
            `INSERT INTO contact_messages (name, email, subject, message)
             VALUES ($1, $2, $3, $4)
             RETURNING id, created_at`,
            [name, email, subject, message]
        );

        res.json({
            success: true,
            message: "Your message was saved successfully!",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save your message."
        });
    }
});
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));