# 🏟️ Application de réservation d'équipements sportifs – Ville de Pétaouchnock

## 📋 Présentation

Cette application web et mobile permet à la ville de Pétaouchnock de gérer la **réservation d’équipements sportifs** (gymnases, terrains, etc.) pour différents profils d’utilisateurs. Elle intègre une **authentification sécurisée**, une **tarification différenciée selon le rôle**, le **paiement en ligne via Stripe**, un **tableau de bord utilisateur** et une **interface d’administration** pour la gestion municipale.

> **Langue de l’interface** : Français  
> **Architecture** : Multi-tenant (plusieurs villes possibles)

## ⚙️ Fonctionnalités

### Utilisateurs
- Inscription et connexion avec email/mot de passe
- Attribution automatique d’un rôle : `admin`, `école`, `association`, `résident`, `externe`
- Consultation des équipements disponibles
- Réservation de créneaux horaires via calendrier interactif
- Paiement en ligne sécurisé (Stripe)
- Tableau de bord personnel : réservations, historique, reçus, profil

### Administrateurs
- Création/modification des équipements
- Gestion des créneaux horaires
- Visualisation et gestion des réservations
- Gestion des utilisateurs et de leurs rôles
- Statistiques globales d’utilisation

## 🛠️ Stack technique

| Domaine        | Technologie utilisée             |
|----------------|----------------------------------|
| Frontend web   | React.js + Tailwind CSS          |
| Mobile         | React Native (Expo)              |
| Backend        | Supabase (PostgreSQL + Auth + Storage + RLS) |
| Paiement       | Stripe (Checkout, webhooks)      |
| Déploiement    | Vercel (Web), Expo Go (Mobile)   |

## 🧱 Schéma de base de données (principales tables)

- `users` : utilisateurs avec rôle et ville associée
- `cities` : gestion multi-villes
- `facilities` : équipements sportifs
- `time_slots` : créneaux horaires disponibles
- `bookings` : réservations (avec statut et ID de paiement)
- `pricing_rules` : règles de tarification par rôle et équipement

## 🔒 Sécurité et RGPD

- Authentification JWT (via Supabase)
- Accès aux données restreint par **Row Level Security** selon la ville et le rôle
- Données personnelles stockées de manière sécurisée
- Conforme au RGPD : export, anonymisation, suppression possible

## 💳 Paiement avec Stripe

- Paiement sécurisé via **Stripe Checkout**
- Session de paiement générée à la réservation
- Statut de réservation mis à jour automatiquement via **webhook Stripe**
- Reçus disponibles depuis le tableau de bord utilisateur

## 🚀 Lancement du projet (en local)

### Prérequis

- Node.js ≥ 18
- Compte Supabase (https://supabase.com)
- Compte Stripe (https://stripe.com)
- Git

### Installation

```bash
git clone https://github.com/ShiningSH/saas-petaouchnok
cd resa-sport-petaouchnock
npm install
```

### Configuration

Créer un fichier `.env.local` :

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_STRIPE_PUBLIC_KEY=...
```

> Les clés Stripe côté serveur doivent être utilisées dans une **Edge Function** Supabase.

### Lancement

```bash
npm run dev
```

## 📦 Fonctionnalités à venir

- Exportation iCal / Google Calendar
- Notes et avis sur les équipements
- Notifications par e-mail
- Version hors-ligne de l’app mobile

## 📄 Licence

Projet sous licence **MIT** – libre d’utilisation, modification et redistribution avec attribution.

## 🙌 Remerciements

- Supabase pour sa plateforme open-source performante
- Stripe pour l'intégration simple du paiement
- Vercel et Expo pour le déploiement rapide
