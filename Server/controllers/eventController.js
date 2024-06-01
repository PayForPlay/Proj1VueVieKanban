//controllers/eventController.js
const eventService = require('../services/eventService');

exports.getEvents = async (req, res) => {
    try {
        const events = await eventService.getEvents(req);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addEvent = async (req, res) => {
    try {
        const event = await eventService.addEvent(req);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        await eventService.deleteEvent(req);
        res.status(200).json({ message: "Удаление успешно" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const event = await eventService.updateEvent(req);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}