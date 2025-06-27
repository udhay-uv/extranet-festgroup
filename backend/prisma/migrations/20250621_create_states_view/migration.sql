-- -- Step 1: Check if the table 'CORRESP_STATE' exists in the current database
-- SET @table_exists := (
--   SELECT COUNT(*) 
--   FROM information_schema.tables 
--   WHERE table_schema = DATABASE() 
--     AND table_name = 'CORRESP_STATE'
-- );

-- -- Step 2: Define the SQL to create the view
-- SET @create_view := '
--   CREATE OR REPLACE VIEW V_States_Dropdown AS
--   SELECT
--     twoDgState,
--     CONCAT(name, '' ('', twoDgState, '')'') AS label
--   FROM
--     CORRESP_STATE
--   ORDER BY
--     twoDgState;
-- ';

-- -- Step 3: Prepare the SQL
-- PREPARE stmt FROM @create_view;

-- -- Step 4: Conditionally execute the view creation only if the table exists
-- IF @table_exists > 0 THEN
--   EXECUTE stmt;
-- END IF;

-- -- Step 5: Clean up
-- DEALLOCATE PREPARE stmt;


-- CREATE OR REPLACE VIEW V_States_Dropdown AS
-- SELECT
--   twoDgState,
--   CONCAT(name, ' (', twoDgState, ')') AS label
-- FROM
--   CORRESP_STATE
-- ORDER BY
--   twoDgState;



-- -- prisma/views/V_states_dropdown.sql
-- DROP VIEW IF EXISTS V_states_dropdown;

-- CREATE VIEW V_states_dropdown AS
-- SELECT 
--   twoDgState, 
--   CONCAT(twoDgState, ' ', name) AS label
-- FROM 
--   CORRESP_STATE
-- ORDER BY 
--   twoDgState;

