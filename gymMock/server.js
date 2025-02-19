const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

console.log("CORS habilitado para todas las solicitudes");

let activityTypes = [
  { id: 1, name: "Yoga", number_monitors: 2 },
  { id: 2, name: "Zumba", number_monitors: 1 },
  { id: 3, name: "Crossfit", number_monitors: 3 }
];

let monitors = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", photo: "john.jpg" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "0987654321", photo: "jane.jpg" },
  { id: 3, name: "Alice Brown", email: "alice@example.com", phone: "1122334455", photo: "alice.jpg" },
  { id: 4, name: "Bob White", email: "bob@example.com", phone: "5566778899", photo: "bob.jpg" }
];

let activities = [
  { id: 1, activity_type_id: 1, date_start: "2025-02-25T09:00:00Z", date_end: "2025-02-25T10:30:00Z" },
  { id: 3, activity_type_id: 3, date_start: "2025-02-25T17:30:00Z", date_end: "2025-02-25T19:00:00Z" },
  { id: 4, activity_type_id: 2, date_start: "2025-02-26T09:00:00Z", date_end: "2025-02-26T10:30:00Z" },
  { id: 2, activity_type_id: 2, date_start: "2025-02-29T13:30:00Z", date_end: "2025-02-29T15:00:00Z" }
];

let activityMonitor = [
  { id: 1, monitor_id: 1, activity_id: 1 },
  { id: 2, monitor_id: 2, activity_id: 1 },
  { id: 3, monitor_id: 3, activity_id: 2 }
];

app.get('/activity-types', (req, res) => {
  res.json(activityTypes);
});

app.get('/monitors', (req, res) => {
  res.json(monitors);
});

app.post('/monitors', (req, res) => {
  const newMonitor = { id: monitors.length + 1, ...req.body };
  monitors.push(newMonitor);
  res.status(201).json(newMonitor);
});

app.put('/monitors/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const monitorIndex = monitors.findIndex(m => m.id === id);
  if (monitorIndex !== -1) {
    monitors[monitorIndex] = { id, ...req.body };
    res.json(monitors[monitorIndex]);
  } else {
    res.status(404).send('Monitor not found');
  }
});

app.delete('/monitors/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const monitorIndex = monitors.findIndex(m => m.id === id);
  if (monitorIndex !== -1) {
    monitors.splice(monitorIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Monitor not found');
  }
});

app.get('/activities', (req, res) => {
  const { date } = req.query;
  let filteredActivities = activities;

  if (date) {
    filteredActivities = activities.filter(activity => {
      const activityDate = new Date(activity.date_start).toISOString().split('T')[0];
      return activityDate === date;
    });
  }

  const result = filteredActivities.map(activity => {
    const monitorsInActivity = activityMonitor
      .filter(am => am.activity_id === activity.id)
      .map(am => monitors.find(m => m.id === am.monitor_id));

    return {
      ...activity,
      monitors: monitorsInActivity,
      activity_type: activityTypes.find(type => type.id === activity.activity_type_id)
    };
  });

  res.json(result);
});

app.post('/activities', (req, res) => {
  const { activity_type_id, monitors_id, date_start } = req.body;

  const activityType = activityTypes.find(type => type.id === activity_type_id);
  if (!activityType) {
    return res.status(400).send('Invalid activity type');
  }

  if (monitors_id.length < activityType.number_monitors) {
    return res.status(400).send('Not enough monitors for this activity type');
  }

  const allowedStartTimes = ["09:00", "13:30", "17:30"];
  const startTime = new Date(date_start).toISOString().split('T')[1].slice(0, 5);

  if (!allowedStartTimes.includes(startTime)) {
    return res.status(400).send('Invalid start time. Allowed times are 09:00, 13:30, and 17:30');
  }

  const duration = 90;
  const date_end = new Date(new Date(date_start).getTime() + duration * 60000).toISOString();

  const newActivity = {
    id: activities.length + 1,
    activity_type_id,
    date_start,
    date_end
  };
  activities.push(newActivity);

  monitors_id.forEach(monitor_id => {
    activityMonitor.push({
      id: activityMonitor.length + 1,
      monitor_id,
      activity_id: newActivity.id
    });
  });

  res.status(201).json(newActivity);
});

app.put('/activities/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const activityIndex = activities.findIndex(activity => activity.id === id);

  if (activityIndex !== -1) {
    activities[activityIndex] = { id, ...req.body };
    res.json(activities[activityIndex]);
  } else {
    res.status(404).send('Activity not found');
  }
});

app.delete('/activities/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const activityIndex = activities.findIndex(activity => activity.id === id);

  if (activityIndex !== -1) {
    activities.splice(activityIndex, 1);
    activityMonitor = activityMonitor.filter(am => am.activity_id !== id);
    res.status(204).send();
  } else {
    res.status(404).send('Activity not found');
  }
});

app.listen(port, () => {
  console.log(`4vGYM API listening at http://localhost:${port}`);
});
