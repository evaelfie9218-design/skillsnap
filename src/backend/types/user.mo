import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;

  public type UserProfile = {
    userId : UserId;
    name : Text;
    var credits : Nat;
    var rating : Float;
    var ratingCount : Nat;
    languages : [Text];
    var creditsEarned : Nat;
    var skillCount : Nat;
    createdAt : CommonTypes.Timestamp;
  };

  // Shared (non-mutable) version for API boundary
  public type UserProfilePublic = {
    userId : UserId;
    name : Text;
    credits : Nat;
    rating : Float;
    languages : [Text];
    creditsEarned : Nat;
    skillCount : Nat;
    createdAt : CommonTypes.Timestamp;
  };

  public type LeaderboardEntry = {
    userId : UserId;
    name : Text;
    avgRating : Float;
    skillCount : Nat;
    creditsEarned : Nat;
  };

  public type LeaderboardSort = {
    #rating;
    #skillCount;
    #creditsEarned;
  };
};
