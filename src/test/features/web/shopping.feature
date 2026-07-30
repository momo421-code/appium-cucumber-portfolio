@web
Feature: Achat en ligne - site mobile web Sauce Demo
  En tant qu'utilisateur connecté
  Je veux trier les produits, gérer mon panier et finaliser ma commande
  Afin d'acheter les articles souhaités

  Background:
    Given je suis connecté au site Sauce Demo avec l'utilisateur "standard_user"

  @web
  Scenario: Trier les produits du prix le plus bas au plus haut
    When je trie les produits par "Price (low to high)"
    Then les produits sont affichés par prix croissant

  @web @smoke
  Scenario: Ajouter un produit au panier met à jour le badge
    When j'ajoute le produit "Sauce Labs Backpack" au panier
    Then le badge du panier affiche "1"

  @web
  Scenario: Retirer un produit du panier
    Given j'ai ajouté le produit "Sauce Labs Backpack" au panier
    When je retire "Sauce Labs Backpack" du panier depuis la page produits
    Then le badge du panier n'est plus affiché

  @web @smoke
  Scenario: Finaliser une commande avec des informations valides
    Given j'ai ajouté le produit "Sauce Labs Backpack" au panier
    When je passe la commande avec le prénom "Momo", le nom "Test" et le code postal "75001"
    Then la page de confirmation affiche le message "Thank you for your order!"
