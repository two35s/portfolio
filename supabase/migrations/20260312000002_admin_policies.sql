-- Allow authenticated users full CRUD access
CREATE POLICY "Allow authenticated insert"
  ON projects FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
  ON projects FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete"
  ON projects FOR DELETE TO authenticated
  USING (true);
