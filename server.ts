import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // API Routes
  app.post("/api/send-email", async (req, res) => {
    const { name, business, goal, budget, scheduleCall } = req.body;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is missing");
      return res.status(500).json({ error: "Email service not configured" });
    }

    const resend = new Resend(resendApiKey);

    try {
      const { data, error } = await resend.emails.send({
        from: "Bespoke Digital <onboarding@resend.dev>",
        to: ["aashish2008.15@gmail.com"], // Updated recipient email
        subject: `New Client Inquiry: ${name}`,
        html: `
          <h1>New Inquiry from ${name}</h1>
          <p><strong>Business/Project:</strong> ${business}</p>
          <p><strong>Goal:</strong> ${goal}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Wants Discovery Call:</strong> ${scheduleCall ? 'Yes' : 'No'}</p>
          <hr />
          <p>This inquiry was sent from your Bespoke Digital Legacy portfolio.</p>
        `,
      });

      if (error) {
        console.error("Resend Error:", error);
        return res.status(400).json({ error });
      }

      res.status(200).json({ message: "Email sent successfully", data });
    } catch (err) {
      console.error("Server Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
