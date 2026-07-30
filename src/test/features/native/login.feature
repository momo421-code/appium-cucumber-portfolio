@native
Feature: Authentification - app native My Demo App
  En tant qu'utilisateur de l'application mobile e-commerce
  Je veux pouvoir me connecter à mon compte
  Afin d'accéder au catalogue de produits

  Background:
    Given l'application native est lancée sur l'écran de connexion

  @native @smoke
  Scenario: Connexion réussie avec des identifiants valides
    When je me connecte avec l'email "bob@example.com" et le mot de passe "10203040"
    Then je suis redirigé vers l'écran du catalogue de produits

  @native
  Scenario: Connexion refusée avec un mot de passe invalide
    When je me connecte avec l'email "bob@example.com" et le mot de passe "wrongpass"
    Then un message d'erreur "Provided credentials do not match" s'affiche

  @native
  Scenario: Connexion refusée avec un email au format invalide
    When je me connecte avec l'email "bob-example.com" et le mot de passe "10203040"
    Then un message d'erreur de format d'email s'affiche
