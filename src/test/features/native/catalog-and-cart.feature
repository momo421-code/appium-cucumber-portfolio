@native
Feature: Catalogue et panier - app native My Demo App
  En tant qu'utilisateur connecté
  Je veux consulter les produits et gérer mon panier
  Afin de préparer un achat

  Background:
    Given je suis connecté à l'application native avec un compte valide

  @native @smoke
  Scenario: Consulter le détail d'un produit
    When j'ouvre le produit "Sauce Labs Backpack"
    Then l'écran de détail affiche le nom "Sauce Labs Backpack" et un bouton d'ajout au panier

  @native
  Scenario: Parcourir le carrousel d'images d'un produit par balayage
    Given j'ouvre le produit "Sauce Labs Backpack"
    When je balaie l'image du produit vers la gauche
    Then l'indicateur de carrousel passe à l'image suivante

  @native @smoke
  Scenario: Ajouter un produit au panier met à jour le badge
    When j'ajoute le produit "Sauce Labs Backpack" au panier
    Then le badge du panier affiche "1"

  @native
  Scenario: Ajouter plusieurs produits met à jour le total du panier
    Given j'ajoute le produit "Sauce Labs Backpack" au panier
    And j'ajoute le produit "Sauce Labs Bike Light" au panier
    When j'ouvre le panier
    Then le montant total affiché correspond à la somme des prix des articles

  @native
  Scenario: Retirer un produit du panier
    Given j'ai ajouté le produit "Sauce Labs Backpack" au panier
    When je retire "Sauce Labs Backpack" du panier
    Then le panier est vide

  @native
  Scenario: Naviguer vers l'écran Webview depuis le menu
    When j'ouvre le menu latéral et je sélectionne "Webview"
    Then le contenu web intégré se charge dans l'application
