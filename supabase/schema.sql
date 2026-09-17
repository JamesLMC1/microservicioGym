-- ============================================
-- MICROSERVICIO GYM - Schema para Supabase
-- ============================================

-- Tabla de ejercicios
CREATE TABLE IF NOT EXISTS ejercicios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  grupo_muscular TEXT NOT NULL,
  descripcion TEXT,
  dificultad TEXT CHECK (dificultad IN ('principiante', 'intermedio', 'avanzado')),
  imagen_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de rutinas
CREATE TABLE IF NOT EXISTS rutinas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  nivel TEXT CHECK (nivel IN ('principiante', 'intermedio', 'avanzado')),
  duracion_dias INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla intermedia rutina <-> ejercicios
CREATE TABLE IF NOT EXISTS rutina_ejercicios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rutina_id UUID REFERENCES rutinas(id) ON DELETE CASCADE,
  ejercicio_id UUID REFERENCES ejercicios(id) ON DELETE CASCADE,
  series INTEGER,
  repeticiones TEXT,
  descanso_segundos INTEGER
);

-- Tabla de comidas / dieta
CREATE TABLE IF NOT EXISTS comidas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  tipo TEXT CHECK (tipo IN ('desayuno', 'almuerzo', 'cena', 'snack')),
  calorias INTEGER,
  proteinas_g DECIMAL,
  carbos_g DECIMAL,
  grasas_g DECIMAL,
  receta TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DATOS DE EJEMPLO
-- ============================================

-- Ejercicios
INSERT INTO ejercicios (nombre, grupo_muscular, descripcion, dificultad) VALUES
('Press de banca', 'pecho', 'Ejercicio compuesto para el pecho con barra', 'intermedio'),
('Sentadilla', 'piernas', 'Reina de los ejercicios para tren inferior', 'intermedio'),
('Peso muerto', 'espalda', 'Ejercicio compuesto para cadena posterior', 'avanzado'),
('Curl de bíceps', 'brazos', 'Aislamiento para bíceps con mancuernas', 'principiante'),
('Dominadas', 'espalda', 'Jalón vertical con peso corporal', 'avanzado'),
('Press militar', 'hombros', 'Press overhead con barra o mancuernas', 'intermedio'),
('Fondos de pecho', 'pecho', 'Ejercicio con peso corporal en paralelas', 'intermedio'),
('Extensión de tríceps', 'brazos', 'Aislamiento para tríceps en polea', 'principiante'),
('Zancadas', 'piernas', 'Paso adelante con mancuernas', 'principiante'),
('Remo con barra', 'espalda', 'Jalón horizontal para dorsal', 'intermedio'),
('Elevaciones laterales', 'hombros', 'Aislamiento para deltoides laterales', 'principiante'),
('Face pull', 'hombros', 'Jalón a la cara en polea para deltoides posteriores', 'principiante'),
('Hip thrust', 'gluteos', 'Empuje de cadera con barra', 'intermedio'),
('Prensa de piernas', 'piernas', 'Empuje en máquina para cuádriceps', 'principiante'),
('Crunch abdominal', 'abdomen', 'Flexión de trunko en suelo', 'principiante'),
('Plancha', 'abdomen', 'Isométrico para core', 'principiante'),
('Russian twist', 'abdomen', 'Rotación de trunko con peso', 'intermedio'),
('Pájaros con mancuernas', 'pecho', 'Aperturas en banco para pectoral', 'intermedio'),
('Curl martillo', 'brazos', 'Curl con agarre neutro para braquial', 'principiante'),
('Good morning', 'espalda', 'Hinge de cadera con barra en espalda', 'intermedio');

-- Rutinas
INSERT INTO rutinas (nombre, descripcion, nivel, duracion_dias) VALUES
('Push Pull Legs', 'Rutina PPL clásica de 6 días', 'intermedio', 6),
('Full Body Beginner', 'Rutina full body para principiantes', 'principiante', 3),
('Torso Pierna', 'División torso/pierna de 4 días', 'intermedio', 4),
('Upper Lower', 'Rutina upper/lower 4 días', 'intermedio', 4),
('Fuerza Máxima', 'Programa de fuerza con rangos bajos', 'avanzado', 5);

-- Relación rutina <-> ejercicios
-- Push Pull Legs
INSERT INTO rutina_ejercicios (rutina_id, ejercicio_id, series, repeticiones, descanso_segundos) VALUES
((SELECT id FROM rutinas WHERE nombre = 'Push Pull Legs' LIMIT 1), (SELECT id FROM ejercicios WHERE nombre = 'Press de banca' LIMIT 1), 4, '8-10', 90),
((SELECT id FROM rutinas WHERE nombre = 'Push Pull Legs' LIMIT 1), (SELECT id FROM ejercicios WHERE nombre = 'Press militar' LIMIT 1), 3, '10-12', 75),
((SELECT id FROM rutinas WHERE nombre = 'Push Pull Legs' LIMIT 1), (SELECT id FROM ejercicios WHERE nombre = 'Fondos de pecho' LIMIT 1), 3, '12-15', 60),
((SELECT id FROM rutinas WHERE nombre = 'Push Pull Legs' LIMIT 1), (SELECT id FROM ejercicios WHERE nombre = 'Elevaciones laterales' LIMIT 1), 4, '15', 45),
((SELECT id FROM rutinas WHERE nombre = 'Push Pull Legs' LIMIT 1), (SELECT id FROM ejercicios WHERE nombre = 'Sentadilla' LIMIT 1), 4, '6-8', 120),
((SELECT id FROM rutinas WHERE nombre = 'Push Pull Legs' LIMIT 1), (SELECT id FROM ejercicios WHERE nombre = 'Peso muerto' LIMIT 1), 4, '6-8', 120),
((SELECT id FROM rutinas WHERE nombre = 'Push Pull Legs' LIMIT 1), (SELECT id FROM ejercicios WHERE nombre = 'Dominadas' LIMIT 1), 4, '8-10', 90),
((SELECT id FROM rutinas WHERE nombre = 'Push Pull Legs' LIMIT 1), (SELECT id FROM ejercicios WHERE nombre = 'Remo con barra' LIMIT 1), 4, '8-10', 90);

-- Full Body Beginner
INSERT INTO rutina_ejercicios (rutina_id, ejercicio_id, series, repeticiones, descanso_segundos) VALUES
((SELECT id FROM rutinas WHERE nombre = 'Full Body Beginner' LIMIT 1), (SELECT id FROM ejercicios WHERE nombre = 'Sentadilla' LIMIT 1), 3, '10-12', 90),
((SELECT id FROM rutinas WHERE nombre = 'Full Body Beginner' LIMIT 1), (SELECT id FROM ejercicios WHERE nombre = 'Press de banca' LIMIT 1), 3, '10-12', 90),
((SELECT id FROM rutinas WHERE nombre = 'Full Body Beginner' LIMIT 1), (SELECT id FROM ejercicios WHERE nombre = 'Remo con barra' LIMIT 1), 3, '10-12', 75),
((SELECT id FROM rutinas WHERE nombre = 'Full Body Beginner' LIMIT 1), (SELECT id FROM ejercicios WHERE nombre = 'Zancadas' LIMIT 1), 3, '12', 60),
((SELECT id FROM rutinas WHERE nombre = 'Full Body Beginner' LIMIT 1), (SELECT id FROM ejercicios WHERE nombre = 'Press militar' LIMIT 1), 3, '10-12', 75),
((SELECT id FROM rutinas WHERE nombre = 'Full Body Beginner' LIMIT 1), (SELECT id FROM ejercicios WHERE nombre = 'Plancha' LIMIT 1), 3, '30-45 seg', 45);

-- Comidas
INSERT INTO comidas (nombre, tipo, calorias, proteinas_g, carbos_g, grasas_g, receta) VALUES
('Avena con huevos', 'desayuno', 450, 30, 45, 15, 'Avena cocida con leche, 3 huevos revueltos y unabanana'),
('Pechuga de pollo con arroz', 'almuerzo', 550, 45, 50, 12, 'Pechuga a la plancha 200g, arroz integral 150g cocido, ensalada verde'),
('Salmón con boniato', 'almuerzo', 600, 40, 45, 25, 'Salmón al horno 180g, boniato asado 200g, brócoli al vapor'),
('Batido de proteína', 'snack', 300, 35, 25, 8, '1 scoop proteína whey, leche de almendras, plátano, avena'),
('Tortilla de claras', 'cena', 350, 35, 8, 18, '6 claras de huevo, espinaca, champiñones, queso bajo en grasa'),
('Pasta con carne molida', 'almuerzo', 650, 40, 70, 20, 'Pasta integral 100g seca, carne molida magra 150g, salsa de tomate casera'),
('Yogur griego con frutos secos', 'snack', 250, 18, 15, 14, 'Yogur griego natural 200g, almendras 15g, arándanos 30g'),
('Tostadas de aguacate', 'desayuno', 380, 12, 35, 24, '2 rebanadas pan integral, 1/2 aguacate, huevo pochado, semillas de chía'),
('Merluza con verduras', 'cena', 320, 38, 12, 10, 'Filete de merluza 180g, pimiento, calabacín, cebolla salteados'),
('Shake post-entreno', 'snack', 400, 40, 50, 8, 'Proteína whey 1 scoop, avena 40g, plátano, miel, leche'),
('Lentejas guisadas', 'almuerzo', 500, 30, 65, 10, 'Lentejas 100g secas, zanahoria, pimiento, chorizo troceado'),
('Huevos revueltos con espárragos', 'cena', 300, 25, 5, 20, '3 huevos enteros, espárragos trigueros, aceite de oliva');
