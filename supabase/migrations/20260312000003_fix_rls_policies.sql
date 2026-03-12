-- Drop and recreate all policies to ensure they work correctly
DROP POLICY IF EXISTS "Allow public read access" ON projects;
DROP POLICY IF EXISTS "Allow authenticated insert" ON projects;
DROP POLICY IF EXISTS "Allow authenticated update" ON projects;
DROP POLICY IF EXISTS "Allow authenticated delete" ON projects;

-- Public read
CREATE POLICY "Allow public read access"
  ON projects FOR SELECT
  USING (true);

-- Authenticated CRUD
CREATE POLICY "Allow authenticated insert"
  ON projects FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
  ON projects FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete"
  ON projects FOR DELETE TO authenticated
  USING (true);
