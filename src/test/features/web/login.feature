@web
Feature: Authentification - site mobile web Sauce Demo
  En tant qu'utilisateur du site e-commerce
  Je veux pouvoir me connecter à mon compte
  Afin d'accéder à la boutique

  Background:
    Given le site Sauce Demo est ouvert dans Chrome mobile

  @web @smoke
  Scenario: Connexion réussie avec un compte standard
    When je me connecte avec l'utilisateur "standard_user" et le mot de passe "secret_sauce"
    Then je suis redirigé vers la page des produits

  @web
  Scenario: Connexion refusée pour un compte bloqué
    When je me connecte avec l'utilisateur "locked_out_user" et le mot de passe "secret_sauce"
    Then un message d'erreur indique que l'utilisateur a été bloqué
