import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Bool "mo:base/Bool";

actor GameList {

  type Games = {
    id : Nat;
    title : Text;
    description : Text;
    rating : Nat;
  };

  var videogames : [Games] = [
    {
      id = 1;
      title = "halo";
      description = "Es un juego de fantasia";
      rating = 5;
    }
  ];

  public func addVideogame(rating : Nat, title : Text, description : Text) : async Bool {
    let newId = Array.size(videogames) + 1;
    let newGame = {
      id = newId;
      title = title;
      description = description;
      rating = rating;
    };
    videogames := Array.append<Games>(videogames, [newGame]);
    return true;
  };

  public func getAllGames() : async [Games] {
    return videogames;
  };

  public func getGameById(id : Nat) : async ?Games {
    return Array.find<Games>(videogames, func(m) { m.id == id });
  };

  public func updateGame(id : Nat, title : Text, description : Text, rating : Nat) : async Bool {
    let gameToUpdate = Array.find<Games>(videogames, func(task) { task.id == id });

    switch (gameToUpdate) {
      case (null) { return false };
      case (?gameToUpdate) {
        let updateGame = {
          id = id;
          title = title;
          description = description;
          rating = rating;
        };
        videogames := Array.map<Games, Games>(videogames, func(m) { if (m.id == id) { updateGame } else { m } });
        return true;
      };
    };
  };

  public func deleteGame(id : Nat) : async Bool {
    let Game = Array.find<Games>(videogames, func(Game) { Game.id == id });
    if (Game != null) {
      videogames := Array.filter<Games>(videogames, func(Game) { Game.id != id });
      return true;
    } else {
      return false;
    };
  };
};

