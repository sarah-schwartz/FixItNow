const res = require("express/lib/response")
const Ticket= require("../models/Ticket")
const Response = require("../models/Response")

async function getResponseByID(req, res) {
  try {
    const response = await Response.findById(req.params.id);
    if (!response) {
      return res.status(404).send({ message: "Response not found" });
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
}


async function addResponse(req, res) {
  try {
    if (!req.body.content || !req.body.createdBy ) {
      return res.status(400).json({ message: "שדות נדרשים חסרים" });
    }

    const newResponse = new Response(req.body);
    await newResponse.save();

    res.status(201).json(newResponse);
  } catch (error) {
    console.error("שגיאה בהוספת תגובה:", error);
    res.status(500).json({ message: "אירעה שגיאה בעת שמירת התגובה", error });
  }
}

async function addResponseToTicket(req,res) {
    try {
        const { ticketId, createdBy, content } = req.body;

        if (!ticketId || !createdBy || !content) {
            return res.status(400).json({ message: 'חסרים שדות נדרשים: ticketId, createdBy, content' });
        }

        // ודא שהפנייה קיימת
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // צור תגובה חדשה
        const newResponse = new Response({
            ticketId,
            createdBy,
            content
        });

        await newResponse.save();

        // עדכן את הפנייה עם מזהה התגובה
        ticket.responses.push(newResponse._id);
        await ticket.save();

        res.status(201).json({ message: 'תגובה נוספה בהצלחה', response: newResponse });
    } catch (error) {
        console.error("שגיאה בהוספת תגובה לפנייה:", error);
        res.status(500).json({ message: "שגיאה בשרת", error: error.message });
    }
}


module.exports={getResponseByID, addResponse,addResponseToTicket}