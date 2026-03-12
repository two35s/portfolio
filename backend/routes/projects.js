import express from 'express';
import pool from '../db.js';

const router = express.Router();
const METHOD_NOT_ALLOWED = { error: 'Method not allowed' };
const LIST_QUERY = 'SELECT * FROM projects ORDER BY created_at DESC';
const LIST_FILTERED_QUERY = 'SELECT * FROM projects WHERE filter_type = $1 ORDER BY created_at DESC';

const respondMethodNotAllowed = (_req, res) => {
  res.status(405).json(METHOD_NOT_ALLOWED);
};

// Get all projects with optional filtering
router.route('/').get(async (req, res) => {
  try {
    const { filter } = req.query;
    let query = LIST_QUERY;
    let params = [];

    if (filter && filter !== 'ALL') {
      query = LIST_FILTERED_QUERY;
      params = [filter];
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}).all(respondMethodNotAllowed);

// Get single project by ID
router.route('/:id').get(async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid project id' });
    }

    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
}).all(respondMethodNotAllowed);

export default router;
