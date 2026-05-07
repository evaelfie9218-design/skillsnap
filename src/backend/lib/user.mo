import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Types "../types/user";
import CommonTypes "../types/common";
import Float "mo:core/Float";

module {
  public func ensureProfile(
    profiles : Map.Map<CommonTypes.UserId, Types.UserProfile>,
    userId : CommonTypes.UserId,
    name : Text,
  ) : Types.UserProfile {
    switch (profiles.get(userId)) {
      case (?p) { p };
      case null {
        let profile : Types.UserProfile = {
          userId;
          name;
          var credits = 30;
          var rating = 0.0;
          var ratingCount = 0;
          languages = ["English"];
          var creditsEarned = 0;
          var skillCount = 0;
          createdAt = Time.now();
        };
        profiles.add(userId, profile);
        profile;
      };
    };
  };

  public func getProfile(
    profiles : Map.Map<CommonTypes.UserId, Types.UserProfile>,
    userId : CommonTypes.UserId,
  ) : ?Types.UserProfilePublic {
    switch (profiles.get(userId)) {
      case (?p) { ?toPublic(p) };
      case null { null };
    };
  };

  public func getCredits(
    profiles : Map.Map<CommonTypes.UserId, Types.UserProfile>,
    userId : CommonTypes.UserId,
  ) : Nat {
    switch (profiles.get(userId)) {
      case (?p) { p.credits };
      case null { 0 };
    };
  };

  public func deductCredits(
    profiles : Map.Map<CommonTypes.UserId, Types.UserProfile>,
    userId : CommonTypes.UserId,
    amount : Nat,
  ) : CommonTypes.Result<(), Text> {
    switch (profiles.get(userId)) {
      case null { #err("Profile not found") };
      case (?p) {
        if (p.credits < amount) {
          #err("Insufficient credits");
        } else {
          p.credits -= amount;
          #ok(());
        };
      };
    };
  };

  public func addCreditsEarned(
    profiles : Map.Map<CommonTypes.UserId, Types.UserProfile>,
    userId : CommonTypes.UserId,
    amount : Nat,
  ) : () {
    switch (profiles.get(userId)) {
      case null {};
      case (?p) {
        p.credits += amount;
        p.creditsEarned += amount;
      };
    };
  };

  public func updateRating(
    profiles : Map.Map<CommonTypes.UserId, Types.UserProfile>,
    userId : CommonTypes.UserId,
    newRating : Float,
  ) : () {
    switch (profiles.get(userId)) {
      case null {};
      case (?p) {
        let oldCount = p.ratingCount;
        let oldSum = p.rating * oldCount.toFloat();
        p.ratingCount += 1;
        p.rating := (oldSum + newRating) / p.ratingCount.toFloat();
      };
    };
  };

  public func getLeaderboard(
    profiles : Map.Map<CommonTypes.UserId, Types.UserProfile>,
    sortBy : Types.LeaderboardSort,
    limit : Nat,
  ) : [Types.LeaderboardEntry] {
    let entries = profiles.entries().filterMap(
      func((_, p)) {
        if (p.skillCount >= 1) {
          ?{ userId = p.userId; name = p.name; avgRating = p.rating; skillCount = p.skillCount; creditsEarned = p.creditsEarned };
        } else { null };
      }
    ).toArray();
    let sorted = entries.sort(func(a : Types.LeaderboardEntry, b : Types.LeaderboardEntry) : { #less; #equal; #greater } {
      switch sortBy {
        case (#rating) {
          if (a.avgRating > b.avgRating) { #less }
          else if (a.avgRating < b.avgRating) { #greater }
          else { #equal };
        };
        case (#skillCount) {
          if (a.skillCount > b.skillCount) { #less }
          else if (a.skillCount < b.skillCount) { #greater }
          else { #equal };
        };
        case (#creditsEarned) {
          if (a.creditsEarned > b.creditsEarned) { #less }
          else if (a.creditsEarned < b.creditsEarned) { #greater }
          else { #equal };
        };
      };
    });
    if (sorted.size() <= limit) { sorted } else { sorted.sliceToArray(0, limit) };
  };

  public func toPublic(profile : Types.UserProfile) : Types.UserProfilePublic {
    {
      userId = profile.userId;
      name = profile.name;
      credits = profile.credits;
      rating = profile.rating;
      languages = profile.languages;
      creditsEarned = profile.creditsEarned;
      skillCount = profile.skillCount;
      createdAt = profile.createdAt;
    };
  };
};
