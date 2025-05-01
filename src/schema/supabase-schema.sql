
-- Schéma de base de données pour l'application de réservation sportive de Pétaouchnock

-- Création des tables avec activation de la Row Level Security (RLS)

-- Table des villes
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table des utilisateurs
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'school', 'association', 'resident', 'external')),
  phone TEXT,
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table des équipements sportifs
CREATE TABLE facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  image_url TEXT,
  city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table des créneaux horaires
CREATE TABLE time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  CONSTRAINT valid_time_range CHECK (end_time > start_time)
);

-- Table des réservations
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  facility_id UUID NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
  time_slot_id UUID NOT NULL REFERENCES time_slots(id) ON DELETE CASCADE,
  price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('reserved', 'paid', 'cancelled')),
  payment_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table des règles de tarification
CREATE TABLE pricing_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL CHECK (role IN ('admin', 'school', 'association', 'resident', 'external')),
  facility_type TEXT NOT NULL,
  price_per_hour DECIMAL(10, 2) NOT NULL,
  UNIQUE (role, facility_type)
);

-- Activer la sécurité niveau ligne (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_rules ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les utilisateurs
-- Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Les utilisateurs peuvent voir leur propre profil"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Les administrateurs peuvent voir tous les utilisateurs de leur ville
CREATE POLICY "Les admins peuvent voir tous les utilisateurs de leur ville"
  ON users FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin' AND city_id = users.city_id
    )
  );

-- Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Les utilisateurs peuvent mettre à jour leur propre profil"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Politiques RLS pour les équipements
-- Tout le monde peut voir les équipements
CREATE POLICY "Tout le monde peut voir les équipements"
  ON facilities FOR SELECT
  USING (TRUE);

-- Seuls les administrateurs peuvent modifier les équipements de leur ville
CREATE POLICY "Seuls les admins peuvent modifier les équipements"
  ON facilities FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM users 
      WHERE role = 'admin' 
      AND city_id = facilities.city_id
    )
  );

-- Politiques RLS pour les créneaux horaires
-- Tout le monde peut voir les créneaux
CREATE POLICY "Tout le monde peut voir les créneaux"
  ON time_slots FOR SELECT
  USING (TRUE);

-- Seuls les administrateurs peuvent modifier les créneaux
CREATE POLICY "Seuls les admins peuvent modifier les créneaux"
  ON time_slots FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM users 
      WHERE role = 'admin' 
      AND users.city_id = (
        SELECT city_id FROM facilities 
        WHERE facilities.id = time_slots.facility_id
      )
    )
  );

-- Politiques RLS pour les réservations
-- Les utilisateurs peuvent voir leurs propres réservations
CREATE POLICY "Les utilisateurs peuvent voir leurs propres réservations"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

-- Les administrateurs peuvent voir toutes les réservations de leur ville
CREATE POLICY "Les admins peuvent voir toutes les réservations"
  ON bookings FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users 
      WHERE role = 'admin' 
      AND users.city_id = (
        SELECT city_id FROM facilities 
        WHERE facilities.id = bookings.facility_id
      )
    )
  );

-- Les utilisateurs peuvent créer des réservations pour eux-mêmes
CREATE POLICY "Les utilisateurs peuvent créer leurs réservations"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent annuler leurs propres réservations
CREATE POLICY "Les utilisateurs peuvent annuler leurs réservations"
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND bookings.status = 'cancelled'
    AND OLD.status IN ('reserved', 'paid')
  );

-- Politiques RLS pour les règles de tarification
-- Tout le monde peut voir les tarifs
CREATE POLICY "Tout le monde peut voir les tarifs"
  ON pricing_rules FOR SELECT
  USING (TRUE);

-- Seuls les administrateurs peuvent gérer les tarifs
CREATE POLICY "Seuls les admins peuvent gérer les tarifs"
  ON pricing_rules FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM users 
      WHERE role = 'admin'
    )
  );

-- Insertions initiales pour les tests
INSERT INTO cities (name, slug) VALUES
('Pétaouchnock', 'petaouchnock');

-- Création des règles de tarification
INSERT INTO pricing_rules (role, facility_type, price_per_hour) VALUES
('admin', 'gymnase', 0),
('school', 'gymnase', 5),
('association', 'gymnase', 8),
('resident', 'gymnase', 10),
('external', 'gymnase', 15),

('admin', 'piscine', 0),
('school', 'piscine', 4),
('association', 'piscine', 7),
('resident', 'piscine', 8),
('external', 'piscine', 12),

('admin', 'tennis', 0),
('school', 'tennis', 3),
('association', 'tennis', 5),
('resident', 'tennis', 7),
('external', 'tennis', 10),

('admin', 'stade', 0),
('school', 'stade', 10),
('association', 'stade', 15),
('resident', 'stade', 20),
('external', 'stade', 30),

('admin', 'escalade', 0),
('school', 'escalade', 5),
('association', 'escalade', 8),
('resident', 'escalade', 9),
('external', 'escalade', 14);

-- Fonction pour créer automatiquement un profil utilisateur lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role, city_id)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), 
    COALESCE(NEW.raw_user_meta_data->>'role', 'resident'),
    (SELECT id FROM cities WHERE slug = 'petaouchnock')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Déclencheur pour appeler la fonction lors de la création d'un utilisateur
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Fonction pour calculer automatiquement le prix lors d'une réservation
CREATE OR REPLACE FUNCTION calculate_booking_price()
RETURNS TRIGGER AS $$
DECLARE
  v_facility_type TEXT;
  v_user_role TEXT;
  v_price DECIMAL(10, 2);
  v_hours DECIMAL(10, 2);
BEGIN
  -- Obtenir le type d'équipement
  SELECT type INTO v_facility_type FROM facilities WHERE id = NEW.facility_id;
  
  -- Obtenir le rôle de l'utilisateur
  SELECT role INTO v_user_role FROM users WHERE id = NEW.user_id;
  
  -- Calculer la durée en heures
  SELECT 
    EXTRACT(EPOCH FROM (end_time - start_time)) / 3600
  INTO v_hours 
  FROM time_slots 
  WHERE id = NEW.time_slot_id;
  
  -- Obtenir le prix horaire
  SELECT price_per_hour INTO v_price 
  FROM pricing_rules 
  WHERE role = v_user_role AND facility_type = v_facility_type;
  
  -- Calculer le prix total
  NEW.price := v_price * v_hours;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Déclencheur pour calculer automatiquement le prix
CREATE TRIGGER set_booking_price
  BEFORE INSERT ON bookings
  FOR EACH ROW EXECUTE PROCEDURE calculate_booking_price();
