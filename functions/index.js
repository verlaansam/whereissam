import functions from "firebase-functions";
import fetch from "node-fetch";
import corsLib from "cors";

const cors = corsLib({ origin: true });

export const getTideData = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { station = "Terschelling", date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Datum ontbreekt. Formaat: DD-MM-YYYY" });
    }

    const url = `https://opendata.rijkswaterstaat.nl/feiten-en-cijfers/getijdata/getij/gegevens?station=${station}&datum=${date}`;

    try {
      const response = await fetch(url);
      const text = await response.text();
      res.status(200).send(text);
    } catch (err) {
      console.error("Fout bij ophalen:", err);
      res.status(500).json({ error: "Serverfout bij ophalen getijdedata" });
    }
  });
});

