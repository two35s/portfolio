import pool from './db.js';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    filter_type VARCHAR(50) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    size VARCHAR(50) DEFAULT 'medium',
    technologies TEXT[],
    live_link VARCHAR(500),
    github_link VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const dedupeTitlesQuery = `
  DELETE FROM projects p1
  USING projects p2
  WHERE p1.id < p2.id
    AND p1.title = p2.title;
`;

const createUniqueIndexQuery = `
  CREATE UNIQUE INDEX IF NOT EXISTS projects_title_unique_idx
  ON projects (title);
`;

async function initDatabase() {
  try {
    console.log('Creating projects table...');
    await pool.query(createTableQuery);
    console.log('Projects table created successfully!');

    await pool.query(dedupeTitlesQuery);
    await pool.query(createUniqueIndexQuery);

    // Insert sample data
    const insertQuery = `
      INSERT INTO projects (title, category, filter_type, description, image_url, size, technologies, live_link, github_link)
      VALUES
        (
          'Neon Nights Branding',
          'Brand Identity',
          'DESIGN',
          'A modern branding project for a nightlife venue. Created a cohesive visual identity including logo design, color palette, and marketing materials.',
          'https://images.unsplash.com/photo-1627483262268-9c2b5b32900c?q=80&w=800&auto=format&fit=crop',
          'large',
          ARRAY['Design', 'Branding', 'Adobe XD'],
          'https://example.com',
          'https://github.com'
        ),
        (
          'Abstract Magazine',
          'Editorial Design',
          'DESIGN',
          'Editorial design for a contemporary art magazine. Designed layout, typography, and visual hierarchy for digital and print publication.',
          'https://images.unsplash.com/photo-1540324155974-7523202daa3f?q=80&w=800&auto=format&fit=crop',
          'small',
          ARRAY['Design', 'Typography', 'InDesign'],
          'https://example.com',
          'https://github.com'
        ),
        (
          'Aura Skincare',
          'Packaging',
          'DESIGN',
          'Luxury skincare packaging design. Developed minimalist packaging design with premium feel and sustainable materials.',
          'https://images.unsplash.com/photo-1615397323286-9051d95bdae6?q=80&w=800&auto=format&fit=crop',
          'small',
          ARRAY['Design', 'Packaging', 'Figma'],
          'https://example.com',
          'https://github.com'
        ),
        (
          'SecureNet Architecture',
          'Cybersecurity',
          'SECURITY',
          'A comprehensive cybersecurity audit and architecture redesign for a fintech company. Implemented zero-trust architecture and enhanced security protocols.',
          'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
          'medium',
          ARRAY['Security', 'Network Architecture', 'AWS'],
          'https://example.com',
          'https://github.com'
        ),
        (
          'Minimalist Type Foundry',
          'Typography',
          'DESIGN',
          'Created a custom typeface family with multiple weights and styles. Focus on legibility and modern aesthetic for digital use.',
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
          'medium',
          ARRAY['Typography', 'Design', 'Glyphs'],
          'https://example.com',
          'https://github.com'
        )
      ON CONFLICT (title) DO UPDATE SET
        category = EXCLUDED.category,
        filter_type = EXCLUDED.filter_type,
        description = EXCLUDED.description,
        image_url = EXCLUDED.image_url,
        size = EXCLUDED.size,
        technologies = EXCLUDED.technologies,
        live_link = EXCLUDED.live_link,
        github_link = EXCLUDED.github_link,
        updated_at = CURRENT_TIMESTAMP;
    `;

    await pool.query(insertQuery);
    console.log('Sample data inserted successfully!');
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

initDatabase();
