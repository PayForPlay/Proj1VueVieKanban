//services/eventService.js
const Event = require('../models/Event');

exports.getEvents = async (req) => {
    const events = await Event.find({ user: req.user._id });
    if (!events) throw new Error('Событий не найдено');
    return events;
}
exports.addEvent = async (req) => {
    const newEvent = new Event({
        ...req.body,
        user: req.user._id
    })
    response = newEvent.save()
    return response;
}
exports.updateEvent = async (req) => {
    const event = Event.findByIdAndUpdate(req.body._id, req.body, { new:true })
    return event;
}
exports.deleteEvent = async (req) => {
    const event = await Event.findByIdAndDelete({ _id: req.body._id });
    return event;
}