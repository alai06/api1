let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
async function getAssignments(req, res) {
  try {
    // Pagination basique
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const totalDocs = await Assignment.countDocuments();
    const assignments = await Assignment.find().skip(skip).limit(limit);

    res.json({
      docs: assignments,
      totalDocs: totalDocs,
      limit: limit,
      page: page,
      totalPages: Math.ceil(totalDocs / limit),
      pagingCounter: skip + 1,
      hasPrevPage: page > 1,
      hasNextPage: page < Math.ceil(totalDocs / limit),
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < Math.ceil(totalDocs / limit) ? page + 1 : null
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

// Récupérer un assignment par son id (GET)
async function getAssignment(req, res) {
  try {
    let assignmentId = req.params.id;
    const assignment = await Assignment.findOne({ id: assignmentId });
    if (!assignment) return res.status(404).send('Assignment not found');
    res.json(assignment);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Ajout d'un assignment (POST)
async function postAssignment(req, res) {
  try {
    let assignment = new Assignment({
      id: req.body.id,
      nom: req.body.nom,
      dateDeRendu: req.body.dateDeRendu,
      rendu: req.body.rendu
    });

    console.log("POST assignment reçu :", assignment);

    await assignment.save();
    res.json({ message: `${assignment.nom} saved!` });
  } catch (err) {
    res.status(500).send('Cannot post assignment: ' + err);
  }
}

// Update d'un assignment (PUT)
async function updateAssignment(req, res) {
  try {
    console.log("UPDATE recu assignment :", req.body);
    const assignment = await Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!assignment) return res.status(404).send('Assignment not found');
    res.json({ message: 'updated' });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

// Suppression d'un assignment (DELETE)
async function deleteAssignment(req, res) {
  try {
    const assignment = await Assignment.findByIdAndRemove(req.params.id);
    if (!assignment) return res.status(404).send('Assignment not found');
    res.json({ message: `${assignment.nom} deleted` });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
